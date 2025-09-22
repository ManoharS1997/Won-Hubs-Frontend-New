
import styled from "styled-components";
import { useState } from "react"
import Cookies from 'js-cookie'
import { FaEyeLowVision } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";

import { useAlert } from "../../../shared/hooks/alertHook";
import { VerifyLoginKey } from "../../../utils/CheckAndExecuteFlows/CRUDoperations";
import { IncreaseLoginCount } from "../../../utils/CheckAndExecuteFlows/CRUDoperations";

import {
    LoginForm, Title, TitleSpan, FieldsContainer,
    Group, Input, Label, ShowPasswordIcon, Bar, Highlight,
    MoreOptions, ButtonsContainer,
    LoginBtn
} from "../pages/StyledComponents"
import { useNavigate } from "react-router-dom";

export default function KeyLogin({
    userName,
    onselectEmailLogin,
    onselectPhoneNoLogin,
    onselectPasswordLogin,
    loginToAdmin,
    verifiedWith,
    setup
}) {
    const [needOtherOptions, setNeedOtherOptions] = useState(false)
    const [ShowLoginKey, setShowLoginKey] = useState(false)
    const [keyVerifyStatus, setKeyVerifyStatus] = useState('otp_send')
    const [LoginKey, setLoginKey] = useState('')
    const [loginKeyErr, setLoginKeyErr] = useState(null)
    const { addAlert } = useAlert()
    const navigate = useNavigate()

    // function to validate the LoginKey while typing
    function validateLoginKey(e) {
        const loginKey = e.target.value
        // const loginKeyRegex = /^[a-zA-Z0-9._]{4,20}$/;
        const loginKeyRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        setLoginKey(loginKey)

        if (!loginKeyRegex.test(loginKey)) {
            return setLoginKeyErr('*Please Enter valid Login Key')
        } else {
            return setLoginKeyErr(null)
        }
    }

    // sets the cookies for the first stage of login page completes
    const setFirstSategeVerification = (value) => {
        Cookies.set('loginStageOne', 'true')
        Cookies.set('firstStageVerifiedWith', value)
    }

    // function to verify the login key after click on login button
    const onSubmitLoginKey = async (e) => {
        e.preventDefault()

        const isValid = await VerifyLoginKey(userName, LoginKey)

        if (isValid?.isLoginKeyVerified) {
            setKeyVerifyStatus('verified')
            // setIsOpen(false)
            Cookies.remove('emailVerifyOtp')

            Cookies.set('isMFACleared', JSON.stringify({ success: true }))
            // setIsEmailVerifyModalOpen(false)

            // Cookies.set('activeUser', data.token)
            setFirstSategeVerification('loginKey')
            // localStorage.setItem('activeUserData', JSON.stringify(data.user))
            // setActiveUserData(data.user)
            await IncreaseLoginCount()
            return navigate('/dashboard', { replace: true })
        } else {
            addAlert("Key Doesn't match.", 'failure')
        }
    }

    return (
        <LoginForm onSubmit={onSubmitLoginKey}>
            <Title>
                Hi <span style={{ marginLeft: '10px', color: '#4361ee' }}>{userName}</span>,
                <TitleSpan>Please Enter Your <strong>Login Key</strong></TitleSpan>
            </Title>

            <FieldsContainer>
                <Group>
                    <Input type={ShowLoginKey ? 'text' : "password"} required value={LoginKey} onChange={validateLoginKey} />
                    <Label>Login Key</Label>
                    <ShowPasswordIcon
                        type='button'
                        onClick={() => setShowLoginKey(!ShowLoginKey)}
                    >
                        {ShowLoginKey ?
                            <FaEyeLowVision size={15} />
                            : <FaEye size={15} />}
                    </ShowPasswordIcon>
                    <Bar />
                    <Highlight />
                </Group>

                <LoginKeyErr>{loginKeyErr ? loginKeyErr : ''}</LoginKeyErr>
            </FieldsContainer>

            <MoreOptions>
                Other Options
            </MoreOptions>

            <ButtonsContainer>
                {/* <SelectLoginType
                    needOtherOptions={needOtherOptions}
                    onselectPasswordLogin={onselectPasswordLogin}
                    onselectPhoneNoLogin={onselectPhoneNoLogin}
                    onselectEmailLogin={onselectEmailLogin}
                    verifiedWith={verifiedWith}
                /> */}

                <LoginBtn type='submit'>Login </LoginBtn>
            </ButtonsContainer>
        </LoginForm>
    )
}

const LoginKeyErr = styled.p`
    font-size: 12px;
    color: red;
`