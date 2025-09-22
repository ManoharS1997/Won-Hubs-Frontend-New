
import styled from "styled-components";
import { useState, useContext } from "react"
import Swal from "sweetalert2"
import Cookies from 'js-cookie'
import WonContext from "../../context/WonContext";
import { VerifyLoginKey } from "../../utils/CheckAndExecuteFlows/CRUDoperations";
import MFAMethodVerification from "../../utils/functions/MFAMethodsVerify";
import { IncreaseLoginCount, updateTableData } from "../../utils/CheckAndExecuteFlows/CRUDoperations";

import {
  LoginForm, Title, TitleSpan, FieldsContainer,
  Group, Input, Label, ShowPasswordIcon, Bar, Highlight,
  MoreOptions, OtherOptionsContainer, OtherOptSpan, ButtonsContainer,
  LoginBtn
} from "../LoginPage/pages/StyledComponents"

const SuperAdminUserData = {
  "id": 80001001,
  "username": "Kartheek92",
  "role_id": 2,
  "first_name": "Kartheek",
  "last_name": "M",
  "title": "Mr",
  "department": "Technical",
  "active": "true",
  "selected_layout": "1",
  "dashboard_layouts": [
    { "id": 1, "name": "New Dash", "layouts": [{ "h": 4, "i": "1", "w": 12, "x": 0, "y": 0, "moved": false, "static": false }, { "h": 5, "i": "a", "w": 6, "x": 0, "y": 4, "moved": false, "static": false }, { "h": 9, "i": "b", "w": 12, "x": 0, "y": 9, "moved": false, "static": false }, { "h": 5, "i": "c", "w": 6, "x": 6, "y": 4, "moved": false, "static": false }, { "h": 11, "i": "d", "w": 8, "x": 0, "y": 18, "moved": false, "static": false }, { "h": 4, "i": "e", "w": 4, "x": 8, "y": 22, "moved": false, "static": false }, { "h": 4, "i": "f", "w": 4, "x": 8, "y": 18, "moved": false, "static": false }] },
    { "id": 2, "name": "dash 1", "layouts": [{ "h": 4, "i": "1", "w": 12, "x": 0, "y": 0 }, { "h": 5, "i": "a", "w": 6, "x": 0, "y": 1 }, { "h": 9, "i": "b", "w": 12, "x": 1, "y": 2 }, { "h": 5, "i": "c", "w": 6, "x": 1, "y": 1 }, { "h": 11, "i": "d", "w": 8, "x": 1, "y": 3 }, { "h": 4, "i": "e", "w": 4, "x": 1, "y": 4 }, { "h": 4, "i": "f", "w": 4, "x": 1, "y": 4 }] }, { "id": 3, "name": "dash 2", "layouts": [{ "h": 3, "i": "1", "w": 5, "x": 0, "y": 0, "moved": false, "static": false }, { "h": 6, "i": "a", "w": 5, "x": 0, "y": 3, "moved": false, "static": false }, { "h": 9, "i": "b", "w": 12, "x": 0, "y": 9, "moved": false, "static": false }, { "h": 5, "i": "c", "w": 6, "x": 5, "y": 0, "moved": false, "static": false }, { "h": 11, "i": "d", "w": 8, "x": 0, "y": 18, "moved": false, "static": false }, { "h": 4, "i": "e", "w": 4, "x": 8, "y": 18, "moved": false, "static": false }, { "h": 4, "i": "f", "w": 6, "x": 5, "y": 5, "moved": false, "static": false }] },
    { "id": 4, "name": "dhash 3", "layouts": [{ "h": 4, "i": "1", "w": 12, "x": 0, "y": 0 }, { "h": 5, "i": "a", "w": 6, "x": 0, "y": 1 }, { "h": 9, "i": "b", "w": 12, "x": 1, "y": 2 }, { "h": 5, "i": "c", "w": 6, "x": 1, "y": 1 }, { "h": 11, "i": "d", "w": 8, "x": 1, "y": 3 }, { "h": 4, "i": "e", "w": 4, "x": 1, "y": 4 }, { "h": 4, "i": "f", "w": 4, "x": 1, "y": 4 }] }
  ],
  "password": "NowitServices2023@",
  "reset_password": "false",
  "email": "kartheek.muppiri@nowitservices.com",
  "time_zone": "Asia/India",
  "phone_no": "5689421683",
  "location": null,
  "user_type": "admin"
}

import { useNavigate } from "react-router-dom";
import { MFAContainer, MFALoginForm } from "./StyledMFA";

export default function MFAKeyLogin({ mfaType, setMfa, setup, setClose }) {
  const [keyVerifyStatus, setKeyVerifyStatus] = useState('otp_send')
  const [LoginKey, setLoginKey] = useState('')
  const [confirmLoginKey, setConfirmLoginKey] = useState('')
  const { setActiveUserData } = useContext(WonContext)
  const [loginKeyErr, setLoginKeyErr] = useState(null)
  const navigate = useNavigate()

  const userName = Cookies.get('username')
  const userData = JSON.parse(localStorage.getItem('activeUserData'))

  // function to validate the login key
  function validateLoginKey(e) {
    const loginKey = e.target.value
    setLoginKey(loginKey)
    // const loginKeyRegex = /^[a-zA-Z0-9._]{4,20}$/;
    const loginKeyRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!loginKeyRegex.test(loginKey)) {
      return setLoginKeyErr('*Please Enter valid Login Key')
    } else {
      return setLoginKeyErr(null)
    }
  }
  function validateConfirmLoginKey(e) {
    const loginKey = e.target.value
    setConfirmLoginKey(loginKey)
    // const loginKeyRegex = /^[a-zA-Z0-9._]{4,20}$/;
    const loginKeyRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!loginKeyRegex.test(loginKey)) {
      return setLoginKeyErr('*Please Enter valid Login Key')
    } else if (loginKey !== LoginKey) {
      return setLoginKeyErr('*Login Key does not match')
    } else {
      return setLoginKeyErr(null)
    }
  }
  const renderSuccessAlert = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Passkey setup successfully",
      showConfirmButton: false,
      timer: 1500
    });
  }

  // function to respond on sumbiting the loginLkey
  const onSubmitLoginKey = async (e) => {
    e.preventDefault()
    if (setup) {
      if (LoginKey === confirmLoginKey) {
        setKeyVerifyStatus('verified')
        await updateTableData('users', userData.id, { mfa_type: mfaType, login_key: LoginKey }, 'passkey-setup', window.location.href)
        renderSuccessAlert()
        setClose(false)
      }
    } else {
      const isValid = await VerifyLoginKey(userName, LoginKey)

      if (isValid?.isLoginKeyVerified) {
        setKeyVerifyStatus('verified')
        // setIsOpen(false)
        Cookies.remove('loginStageOne')
        Cookies.remove('firstStageVerifiedWith')

        // setFirstSategeVerification('email')

        Cookies.set('isMFACleared', JSON.stringify({ success: true }))
        // setIsEmailVerifyModalOpen(false)
        // Cookies.set('activeUser', data.token)
        // localStorage.setItem('activeUserData', JSON.stringify(data.user))
        // setActiveUserData(data.user)

        Cookies.set('activeUser', 'bhe765789m86_tw65e65vq$^%&&*b')
        // localStorage.setItem('activeUserData', JSON.stringify(SuperAdminUserData))
        setActiveUserData(SuperAdminUserData)
        await IncreaseLoginCount()
        MFAMethodVerification('passkey')
        // return navigate('/Dashboard', { replace: true })
      }
    }
  }

  return (
    <MFAContainer>
      <MFALoginForm onSubmit={onSubmitLoginKey}>
        <Title>
          Hi <span style={{ marginLeft: '10px', color: '#4361ee' }}>{userName}</span>,
          <TitleSpan>Please Enter Your <strong>Login Key</strong></TitleSpan>
        </Title>

        <FieldsContainer>
          <div className="flex flex-col w-full gap-4">
            <Group>
              <Input type="password" required value={LoginKey} onChange={validateLoginKey} />
              <Label>Login Key</Label>
              <Bar />
              <Highlight />
            </Group>
            {setup && <Group>
              <Input type="password" required value={confirmLoginKey} onChange={validateConfirmLoginKey} />
              <Label>Confirm Login Key</Label>
              <Bar />
              <Highlight />
            </Group>}
          </div>
          <LoginKeyErr>{loginKeyErr ? loginKeyErr : ''}</LoginKeyErr>
        </FieldsContainer>
        <LoginBtn
          type='submit'
          style={{
            margin: 'auto'
          }}
        >
          Submit
        </LoginBtn>

        <ButtonsContainer>
          {/* {setup && <OtherOptionsList mfaType={mfaType} setmfaType={setMfa} />} */}
        </ButtonsContainer>
      </MFALoginForm>
    </MFAContainer>
  )
}

const LoginKeyErr = styled.p`
    font-size: 12px;
    color: red;
    margin: 0;
`