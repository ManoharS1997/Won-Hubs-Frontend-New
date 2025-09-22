

import { useState } from "react"
import { FaEyeLowVision } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import { useAlert } from "../../../shared/hooks/alertHook";

import {
    LoginForm, Title, TitleSpan, FieldsContainer,
    Group, Input, Label, ShowPasswordIcon, Bar, Highlight,
    MoreOptions, ButtonsContainer, LoginBtn
} from "../pages/StyledComponents"

export default function PasswordLoginForm({
    userName, onselectEmailLogin,
    onselectPhoneNoLogin, logintoadmin,
    onselectKeyLogin, password,
    setPassword, verifiedWith
}) {
    const [ShowPassword, setShowPassword] = useState(false)
    const [needOtherOptions, setNeedOtherOptions] = useState(false)
    const { addAlert } = useAlert()

    return (
        <LoginForm onSubmit={(e) => logintoadmin(e)}>
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


            <ButtonsContainer>
                <LoginBtn type='submit'>Login </LoginBtn>
            </ButtonsContainer>
        </LoginForm>
    )
}