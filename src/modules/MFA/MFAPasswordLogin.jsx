
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { useContext, useState } from "react"
import { FaEyeLowVision } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import SelectLoginType from '../LoginPage/components/SelectLoginType';
import WonContext from '../../context/WonContext';
import { useAlert } from '../../shared/hooks/alertHook';

import {
    LoginForm, Title, TitleSpan, FieldsContainer,
    Group, Input, Label, ShowPasswordIcon, Bar, Highlight,
    MoreOptions, ButtonsContainer, LoginBtn
} from "../LoginPage/pages/StyledComponents"

const hostedUrl = import.meta.env.VITE_HOSTED_API_URL

export default function MFAPasswordLogin({ password, setPassword }) {
    const [ShowPassword, setShowPassword] = useState(false)
    const { setActiveUserData } = useContext(WonContext)
    const { addAlert } = useAlert()
    const navigate = useNavigate()

    const userName = Cookies.get('activeUsername') // getting the usename from cookies

    // function to handle the password login
    const passwordLogin = async (e) => {
        e.preventDefault()
        try {
            const url = `${hostedUrl}/wonhub/login`
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: userName, password: password })
            }

            const response = await fetch(url, options)
            const data = await response.json()

            if (response.ok) {
                if (data.token) {
                    Cookies.set('activeUser', data.token)
                    // setFirstSategeVerification('password')
                    Cookies.remove('emailVerifyOtp')

                    Cookies.remove('loginStageOne')

                    localStorage.setItem('activeUserData', JSON.stringify(data.user))
                    setActiveUserData(data.user)
                    return navigate('/Dashboard', { replace: true })
                } else {
                    addAlert(data.message, 'failure')
                }
            } else {
                addAlert(data.message, 'failure')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <LoginForm onSubmit={(e) => passwordLogin(e)}>
            <Title>
                Hi <span style={{ marginLeft: '10px', color: '#4361ee' }}>{userName}</span>,
                <TitleSpan>Please Enter Your <strong>Password</strong></TitleSpan>
            </Title>

            <FieldsContainer>
                <Group>
                    <Input type={ShowPassword ? 'text' : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Label>Password</Label>
                    <ShowPasswordIcon
                        type='button'
                        onClick={() => setShowPassword(!ShowPassword)}
                    >
                        {ShowPassword ?
                            <FaEyeLowVision size={15} />
                            : <FaEye size={15} />}
                    </ShowPasswordIcon>
                    <Bar />
                    <Highlight />
                </Group>
            </FieldsContainer>

            <MoreOptions>Forgot Password ?</MoreOptions>

            <MoreOptions>
                Other Options
            </MoreOptions>

            <ButtonsContainer>
                <LoginBtn type='submit'>Login </LoginBtn>
            </ButtonsContainer>
        </LoginForm>
    )
}