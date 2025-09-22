
import { useContext, useState } from "react";
import styled from "styled-components";
import { ColorRing } from 'react-loader-spinner';
import { sendEmailOtp, } from "../../../utils/CheckAndExecuteFlows/CRUDoperations";
import Cookies from 'js-cookie'
import { RiVerifiedBadgeFill } from "react-icons/ri";
import OTPInput from "../../SignupPage/components/OTPinput";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import WonContext from "../../../context/WonContext";
import { useAlert } from "../../../shared/hooks/alertHook";

import {
    LoginForm, Title, Group,
    Input, Label, Bar, Highlight, VerifyBtn,
    MoreOptions,
    ButtonsContainer, LoginBtn, TitleSpan,
} from "../pages/StyledComponents";

const FieldsContainer = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
`

export default function EmailLogin({
    setEmailToLogin, userName, onselectEmailLogin,
    onselectPhoneNoLogin, logintoadmin, onselectKeyLogin,
    onselectPasswordLogin, verifiedWith
}) {
    const [userMail, setUsermail] = useState('')
    const [emailVerifyStatus, setEmailVerifyStatus] = useState('otp_send')
    const [showEmailOtpSendingLoader, setShowEmailOtpSendingLoader] = useState(false)
    const [isEmailVerifyModalOpen, setIsEmailVerifyModalOpen] = useState(false)
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [otpSent, setOtpSent] = useState(false)
    const { addAlert } = useAlert()
    const navigate = useNavigate()

    // const onResendOtp = () => {
    //     setResendOTP(true)
    //     setTimeout(() => {
    //         setResendOTP(false)
    //     }, 2 * 60000)
    // }

    // sets the cookies for the first stage of login page completes
    const setFirstSategeVerification = (value) => {
        Cookies.set('loginStageOne', 'true')
        Cookies.set('firstStageVerifiedWith', value)
    }

    // functio to respons on sending email OTP if valid
    const verifyAndSendOTP = async () => {
        // Start showing the loader
        function ValidateEmail(input) {
            var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            if (input.match(validRegex)) {
                // addAlert("Valid email address!", 'success');
                document.forgotUsername.email.focus();
                return true;

            } else {
                addAlert("Invalid email address!", 'failure');
                document.forgotUsername.email.focus();
                return false;
            }
        }

        if (ValidateEmail(userMail)) {
            try {
                setShowEmailOtpSendingLoader(true)
                const emailOtp = await sendEmailOtp(userMail, 'Email Login Component', window.location.href, 'internal');
                if (emailOtp) {
                    // OTP successfully sent, store OTP in cookies and update verification status
                    Cookies.set("emailVerifyOtp", emailOtp.tempOtp);
                    setEmailVerifyStatus('otp_sent');
                    setIsEmailVerifyModalOpen(true)
                    setOtpSent(true)
                    addAlert(`OTP has been send to ${userMail}`, 'success')

                    setInterval(() => {
                        Cookies.remove('emailVerifyOtp')
                    }, 5 * 60000)
                }
            } catch (error) {
                console.error('Error sending OTP:', error);
                addAlert('Failed to send OTP. Please try again.', 'failure');
            } finally {
                // Hide loader regardless of success or failure
                setShowEmailOtpSendingLoader(false);
            }
        } else {
            // Invalid email case
            addAlert("Please enter a valid email address.", 'failure');
            setShowEmailOtpSendingLoader(false); // Ensure loader is hidden
        }
    }

    const handleSubmit = e => {
        e.preventDefault();

    }

    // function to verify the email OTP
    const verifyOtp = async () => {
        setEmailVerifyStatus('otp_veryfying')
        const tempotp = Cookies.get('emailVerifyOtp')

        if (tempotp) {
            if (tempotp === otp.join('')) {
                setEmailVerifyStatus('verified')
                // setIsOpen(false)
                Cookies.remove('emailVerifyOtp')

                Cookies.set('isMFACleared', JSON.stringify({ success: true }))
                setIsEmailVerifyModalOpen(false)
                addAlert('OTP Verified Successfully', 'success')

                // Cookies.set('activeUser', data.token)
                setFirstSategeVerification('email')
                // localStorage.setItem('activeUserData', JSON.stringify(data.user))
                // setActiveUserData(data.user)
                return navigate('/MFA', { replace: true })
            } else {
                setEmailVerifyStatus('invalid')
                addAlert('Invalid OTP', 'failure')
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
                Hi <span style={{ marginLeft: '10px', color: '#4361ee' }}>{userName}</span>,
                <TitleSpan>Please Enter Your <strong>Email</strong> Address</TitleSpan>
            </Title>

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
                                onClick={verifyAndSendOTP}
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

                </FieldsContainer>

                {isEmailVerifyModalOpen &&
                    <FieldsContainer>
                        Enter OTP
                        <OTPInput otp={otp} setOtp={setOtp} length={6} onChangeOTP={handleOtpChange} />
                        <VerifyBtn type="button" onClick={verifyOtp} disabled={otp.join('').length < 6} >Verify</VerifyBtn>
                    </FieldsContainer>
                }
            </>

            <MoreOptions>
                Other Options
            </MoreOptions>

            <ButtonsContainer>

                {/* <LoginBtn type='submit'>Login </LoginBtn> */}
            </ButtonsContainer>
        </LoginForm>
    )
}