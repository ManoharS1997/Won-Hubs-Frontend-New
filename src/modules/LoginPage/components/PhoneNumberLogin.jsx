
import { useState } from "react";
import { FaEyeLowVision } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import styled from "styled-components";
import { ColorRing } from 'react-loader-spinner';
import Cookies from 'js-cookie'
import { RiVerifiedBadgeFill } from "react-icons/ri";
import OTPInput from "../../SignupPage/components/OTPinput";
import OtherOptionsList from "../../MFA/OtherOptionsList";

import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { IncreaseLoginCount } from "../../../utils/CheckAndExecuteFlows/CRUDoperations";

import {
    LoginForm, Title, Group,
    Input, Label, Bar, Highlight, VerifyBtn,
    TitleSpan, ShowPasswordIcon,
    MoreOptions, OtherOptionsContainer, OtherOptSpan,
    ButtonsContainer, LoginBtn
} from "../pages/StyledComponents";
import { MFAContainer, MFALoginForm } from "../../MFA/StyledMFA";

export default function PhoneNumberLogin({
    userName, setup, mfaType, setMfa
}) {
    const [phoneNumber, setphoneNumber] = useState('')
    const [phoneNumVerifyStatus, setPhoneNumVerifyStatus] = useState('otp_send')
    const [showEmailOtpSendingLoader, setShowEmailOtpSendingLoader] = useState(false)
    const [isEmailVerifyModalOpen, setIsEmailVerifyModalOpen] = useState(false)
    const [needOtherOptions, setNeedOtherOptions] = useState(false)
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [otpSent, setOtpSent] = useState(false)
    const [resendOTP, setResendOTP] = useState(false)
    const [isValid, setIsValid] = useState(true);

    const onResendOtp = () => {
        setResendOTP(true)
        setTimeout(() => {
            setResendOTP(false)
        }, 2 * 60000)
    }

    const handleSubmit = e => {
        e.preventDefault();

    }

    const verifyOtp = async () => {
        setPhoneNumVerifyStatus('otp_veryfying')
        const tempotp = Cookies.get('emailVerifyOtp')

        if (tempotp) {
            if (tempotp === otp.join('')) {
                setPhoneNumVerifyStatus('verified')
                // setIsOpen(false)
                Cookies.remove('emailVerifyOtp')

                // const username = await getUsername(userMail)

                // await sendEmail({
                //     from: "testmail@nowitservices.com",
                //     to: userMail,
                //     subject: "WONHUBS Username ",
                //     text: `Your Username is '${username?.username}'. Use this to loging to you wonhubs account.`,
                // })
                await IncreaseLoginCount()
            } else {
                setPhoneNumVerifyStatus('invalid')
                setOtp(new Array(6).fill(''))
            }
        }
    }

    const handleOtpChange = (otpValue) => {
        // console.log("Current OTP: ", otpValue);
    };

    function ValidatePhoneNumber(input) {
        var phoneRegex = /^\+?[1-9]\d{1,14}$/;

        if (input.match(phoneRegex)) {
            // document.registrationForm.otpFields.focus();
            return true;
        } else {
            alert("Invalid phone number!");
            // document.registrationForm.otpFields.focus();
            return false;
        }
    }

    const handlePhoneChange = (value) => {
        if (value) {
            setphoneNumber(value);

            // Check if phone number is valid for the selected country
            if (isValidPhoneNumber(value)) {
                setIsValid(true);
            } else {
                // document.registrationForm.otpFields.focus();
                setIsValid(false);
            }
        }
    }

    return (
        <MFAContainer>
            <MFALoginForm onSubmit={handleSubmit} name='forgotUsername'>
                <Title>
                    Hi <span style={{ marginLeft: '10px', color: '#4361ee' }}>{userName}</span>,
                    <TitleSpan>Please Enter Your <strong>Mobile Number</strong></TitleSpan>
                </Title>

                {phoneNumVerifyStatus !== 'verified' ?
                    <>
                        <FieldsContainer>
                            <Group style={{ width: '80%' }}>
                                <PhoneInput
                                    type="phone"
                                    name='phoneNumber'
                                    required
                                    value={phoneNumber}
                                    onChange={handlePhoneChange}
                                    error={
                                        phoneNumber && !isValid ? 'Invalid phone number' : undefined
                                    }
                                    defaultCountry='IN'
                                />

                                <Label
                                    style={{
                                        left: '0%',
                                        top: '0%',
                                        fontSize: '13px'
                                    }}
                                >
                                    Phone Number
                                </Label>
                                <Bar />
                                <Highlight />
                            </Group>

                            {
                                phoneNumVerifyStatus !== 'verified' ?
                                    <VerifyBtn
                                        type='button'
                                        onClick={() => {
                                            ValidatePhoneNumber(phoneNumber)
                                            setPhoneNumVerifyStatus('otp_sent')
                                        }}
                                    >
                                        Verify
                                    </VerifyBtn> :
                                    <>
                                        <RiVerifiedBadgeFill style={{ color: '#38b000' }} size={18} /><span>Verified</span>
                                    </>
                            }
                        </FieldsContainer>

                        {isEmailVerifyModalOpen &&
                            <>
                                <FieldsContainer>
                                    Enter OTP
                                    <OTPInput otp={otp} setOtp={setOtp} length={6} onChangeOTP={handleOtpChange} />
                                    <VerifyBtn type="button" onClick={verifyOtp} disabled={otp.join('').length < 6} >Verify</VerifyBtn>
                                </FieldsContainer>
                            </>
                        }
                    </> :
                    <p>Username has been send to
                        <span style={{ fontWeight: 'bold', margin: '0 5px' }}> '{phoneNumber}' </span>
                        address. Please check your mail.</p>
                }

                <MoreOptions>
                    Other Options
                </MoreOptions>


                <ButtonsContainer>
                    {/* {setup && <OtherOptionsList mfaType={mfaType} setmfaType={setMfa} />} */}

                    <LoginBtn type='submit'>Login </LoginBtn>
                </ButtonsContainer>
            </MFALoginForm>
        </MFAContainer>
    )
}

const FieldsContainer = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
`

const ResendOtp = styled(VerifyBtn)`
    background-color: transparent;
    color: blue;
    
    &:hover{
        background-color: blue;
        color: #fff;
    }
`

const BackBtn = styled.button`
    padding: 5px 10px;
    margin: 0;
    cursor: pointer;
    width: fit-content;
    background-color: transparent;
    outline: none;
    border: none;
    
    &:hover{
        background-color: aliceblue;
        text-decoration: underline;
    }
`