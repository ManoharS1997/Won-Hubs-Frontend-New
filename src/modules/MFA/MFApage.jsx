
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import PhoneNumberLogin from '../LoginPage/components/PhoneNumberLogin'
import MFAEmailLogin from './MFAEmailLogin'
import MFAKeyLogin from './MFAKeyLogin'
import AuthenticatorApp from './AuthenticatorApp'
import BiometricAuth from './BiometricAuth'
import PhoneCall from './PhoneCall'

import { MdEmail } from "react-icons/md";
import { MdTextsms } from "react-icons/md";
import { FaKey } from "react-icons/fa6";
import { SiAuthelia } from "react-icons/si";
import { PiPhoneCallFill } from "react-icons/pi";
import { PiFingerprintFill } from "react-icons/pi";
import { updateTableData } from '../../utils/CheckAndExecuteFlows/CRUDoperations'

import {
    MFAMainContainer, FormContainer, ChooseMFAContainer,
    ChooseCardContainer, CardsContainer, ChooseMethodTitle,
} from "./MFAStyledComponents"

export default function MFA() {
    const [selectedLoginMethod, setSelectedLoginMethod] = useState(null)
    const verifiedWith = Cookies.get('firstStageVerifiedWith')
    const username = JSON.parse(localStorage.getItem('activeUserData'))?.username || '';
    const userId = JSON.parse(localStorage.getItem('activeUserData'))?.id || '';
    const navigate = useNavigate()

    const mfaOptions = [
        { icon: <MdEmail size={22} />, name: 'email' },
        { icon: <FaKey size={22} />, name: 'passkey' },
        { icon: <MdTextsms size={22} />, name: 'sms' },
        { icon: <SiAuthelia size={22} />, name: 'authenticator' },
        { icon: <PiPhoneCallFill size={22} />, name: 'call' },
        { icon: <PiFingerprintFill size={22} />, name: 'biometric' },
    ]

    // function to respond on select Password method login
    const onselectPasswordLogin = () => {
        setSelectedLoginMethod('password')
    }

    // function to respond on select Email method login
    const onselectEmailLogin = () => {
        setSelectedLoginMethod('email')
    }

    // function to respond on select SMS method login
    const onselectPhoneNoLogin = () => {
        setSelectedLoginMethod('phoneNo')
    }

    // function to respond on select Key method login
    const onselectKeyLogin = () => {
        setSelectedLoginMethod('loginKey')
    }

    // function to switch the MFA methods
    const switchMethods = () => {
        switch (selectedLoginMethod || verifiedWith) {
            case 'email':
                return <MFAEmailLogin
                    onselectPhoneNoLogin={onselectPhoneNoLogin}
                    onselectKeyLogin={onselectKeyLogin}
                    onselectPasswordLogin={onselectPasswordLogin}
                    verifiedWith={verifiedWith}
                    userName={username}
                    mfaType={selectedLoginMethod}
                    setMfa={setSelectedLoginMethod}
                />
            case 'passkey':
                return <MFAKeyLogin
                    onselectEmailLogin={onselectEmailLogin}
                    onselectPasswordLogin={onselectPasswordLogin}
                    onselectPhoneNoLogin={onselectPhoneNoLogin}
                    verifiedWith={verifiedWith}
                    userName={username}
                    mfaType={selectedLoginMethod}
                    setMfa={setSelectedLoginMethod}
                />
            case 'sms':
                return <PhoneNumberLogin
                    onselectEmailLogin={onselectEmailLogin}
                    onselectPasswordLogin={onselectPasswordLogin}
                    onselectKeyLogin={onselectKeyLogin}
                    verifiedWith={verifiedWith}
                    userName={username}
                    mfaType={selectedLoginMethod}
                    setMfa={setSelectedLoginMethod}
                />
            case 'authenticator':
                return <AuthenticatorApp
                    mfaType={selectedLoginMethod}
                    setMfa={setSelectedLoginMethod}
                />
            case 'biometric':
                return <BiometricAuth
                    mfaType={selectedLoginMethod}
                    setMfa={setSelectedLoginMethod}
                />
            case 'call':
                return <PhoneCall
                    mfaType={selectedLoginMethod}
                    setMfa={setSelectedLoginMethod}
                />
            default:
                return <div>Invalid verification method</div>
        }
    }

    const skipBtnHandler = async () => {
        try {
            const response = await updateTableData('users', userId, { login_count: 1 }, 'MFA', window.location.href)
            console.log(response)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <MFAMainContainer>
            {!selectedLoginMethod ?
                <ChooseMFAContainer>
                    <ChooseMethodTitle>Choose MFA </ChooseMethodTitle>

                    <CardsContainer>
                        {mfaOptions.map(item =>
                            <ChooseCardContainer
                                key={item.name}
                                onClick={() => navigate(`/${item.name}-MFA`)}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </ChooseCardContainer>
                        )}
                    </CardsContainer>
                    <a href='/dashboard' onClick={skipBtnHandler} >Skip for now</a>
                </ChooseMFAContainer>
                :
                <FormContainer>
                    {switchMethods(selectedLoginMethod)}
                </FormContainer>}
        </MFAMainContainer>
    )
}