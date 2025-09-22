
import { useState } from "react";
import styled from "styled-components";
import { ColorRing } from 'react-loader-spinner';
import { sendEmailOtp, sendEmail, getUsername } from "../../../utils/CheckAndExecuteFlows/CRUDoperations";
import Cookies from 'js-cookie'
import { RiVerifiedBadgeFill } from "react-icons/ri";
import VerificationModal from "../../SignupPage/components/VerificationModal";
import Countdown from 'react-countdown';
import OTPInput from "../../SignupPage/components/OTPinput";
import { HiOutlineMail } from "react-icons/hi";
import { MdEmail } from "react-icons/md";

import {
    LoginForm, Title, Group,
    Input, Label, Bar, Highlight, VerifyBtn
} from "../pages/StyledComponents";

export default function ForgotUsernameForm({ setUserForgotUsername }) {
    const [userMail, setUsermail] = useState('')
    const [emailVerifyStatus, setEmailVerifyStatus] = useState('otp_send')
    const [showEmailOtpSendingLoader, setShowEmailOtpSendingLoader] = useState(false)
    const [isEmailVerifyModalOpen, setIsEmailVerifyModalOpen] = useState(false)
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [otpSent, setOtpSent] = useState(false)
    const [resendOTP, setResendOTP] = useState(false)

    const onResendOtp = () => {
        setResendOTP(true)
        setTimeout(() => {
            setResendOTP(false)
        }, 2 * 60000)
    }

    const onEmailVerification = async () => {
        // Start showing the loader

        function ValidateEmail(input) {
            // console.log(input)
            var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            if (input.match(validRegex)) {
                // alert("Valid email address!");
                document.forgotUsername.email.focus();
                return true;

            } else {
                // alert("Invalid email address!");
                document.forgotUsername.email.focus();
                return false;
            }
        }


        // console.log(ValidateEmail(userMail))

        if (ValidateEmail(userMail)) {
            try {
                setShowEmailOtpSendingLoader(true)
                const emailOtp = await sendEmailOtp(userMail);
                if (emailOtp) {
                    // OTP successfully sent, store OTP in cookies and update verification status
                    Cookies.set("emailVerifyOtp", emailOtp.tempOtp);
                    setEmailVerifyStatus('otp_sent');
                    setIsEmailVerifyModalOpen(true)
                    setOtpSent(true)

                    setInterval(() => {
                        Cookies.remove('tempOtp')
                    }, 5 * 60000)
                }
            } catch (error) {
                console.error('Error sending OTP:', error);
                alert('Failed to send OTP. Please try again.');
            } finally {
                // Hide loader regardless of success or failure
                setShowEmailOtpSendingLoader(false);
            }
        } else {
            // Invalid email case
            alert("Please enter a valid email address.");
            setShowEmailOtpSendingLoader(false); // Ensure loader is hidden
        }
    }

    const handleSubmit = e => {
        e.preventDefault();

    }

    const verifyOtp = async () => {
        setEmailVerifyStatus('otp_veryfying')
        const tempotp = Cookies.get('emailVerifyOtp')

        if (tempotp) {
            if (tempotp === otp.join('')) {
                setEmailVerifyStatus('verified')
                // setIsOpen(false)
                Cookies.remove('emailVerifyOtp')

                const username = await getUsername(userMail)

                await sendEmail({
                    from: "testmail@nowitservices.com",
                    to: userMail,
                    subject: "WONHUBS Username ",
                    text: `Your Username is '${username?.username}'. Use this to loging to you wonhubs account.`,
                })
            } else {
                setEmailVerifyStatus('invalid')
                setOtp(new Array(6).fill(''))
            }
        }
    }

    const handleOtpChange = (otpValue) => {
        // console.log("Current OTP: ", otpValue);
    };

    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            // Render a complete state
            return <span>Time's up!</span>;
        } else {
            // Render countdown
            return (
                <span>
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </span>
            );
        }
    };

    return (
        <LoginForm onSubmit={handleSubmit} name='forgotUsername'>
            <Title>
                <h3>Forgot Username</h3>
            </Title>
            Please Enter Registered Email

            {emailVerifyStatus !== 'verified' ?
                <>
                    <FieldsContainer>
                        <Group>
                            <Input
                                type="email"
                                name='email'
                                required
                                value={userMail}
                                onChange={(e) => setUsermail(e.target.value)}
                            />
                            <Label><MdEmail size={20} /></Label>
                            <Bar />
                            <Highlight />
                        </Group>

                        {emailVerifyStatus !== 'verified' ? (
                            showEmailOtpSendingLoader ? (
                                <ColorRing
                                    visible={true}
                                    height="30"
                                    width="30"
                                    ariaLabel="color-ring-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="color-ring-wrapper"
                                    colors={['#52b788', '#52b788', '#52b788', '#52b788', '#52b788', '#52b788']}
                                />
                            ) : (
                                <VerifyBtn
                                    type='button'
                                    disabled={false}
                                    onClick={onEmailVerification}
                                >
                                    {otpSent ? 'Resend OTP' : 'Send OTP'}
                                </VerifyBtn>
                            )
                        ) : (
                            <>
                                <RiVerifiedBadgeFill style={{ color: '#38b000' }} size={18} />
                                <span>Verified</span>
                            </>
                        )}


                        {/* <VerificationModal
                    isOpen={isEmailVerifyModalOpen}
                    setIsOpen={setIsEmailVerifyModalOpen}
                    emailVerifyStatus={emailVerifyStatus}
                    setEmailVerifyStatus={setEmailVerifyStatus}
                    // phoneNumVerifyStatus={phoneNumVerifyStatus}
                    // setPhoneNumVerifyStatus={setPhoneNumVerifyStatus}
                    email={true}
                    formData={{ email: userMail }}
                /> */}
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
                    <span style={{ fontWeight: 'bold', margin: '0 5px' }}> '{userMail}' </span>
                    address. Please check your mail.</p>
            }

            <BackBtn type="button" onClick={() => setUserForgotUsername(false)} >
                Back
            </BackBtn>
        </LoginForm>
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