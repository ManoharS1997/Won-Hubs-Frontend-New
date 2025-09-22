
import { useState, useEffect } from 'react'
import styled from 'styled-components';
import Modal from 'react-modal'
import OTPInput from './OTPinput';
import Countdown from 'react-countdown';
import Cookies from 'js-cookie'

import { VerifyBtn } from '../pages/RegisterStyledComponents';
import { RiVerifiedBadgeFill } from "react-icons/ri";

export default function VerificationModal({
    email, isOpen, setIsOpen, onClose,
    onVerify, phoneNumVerifyStatus,
    setPhoneNumVerifyStatus,
    emailVerifyStatus, setEmailVerifyStatus,
    formData
}) {
    const [resendOTP, setResendOTP] = useState(false)
    const [otp, setOtp] = useState(new Array(6).fill(''));

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: '5'
        },
        content: {
            top: '25%',
            left: '40%',
            right: '40%',
            bottom: '25%',
            width: '20vw',
            height: '40vh',
            textAlign: 'center',
            borderRadius: '15px',
            zIndex: '1000'
        }
    }

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

    const onResendSendOtp = () => {
        setResendOTP(true)
        setTimeout(() => {
            setResendOTP(false)
        }, 2 * 60000)
    }

    const verifyOtp = () => {
        setEmailVerifyStatus('otp_veryfying')
        const tempotp = Cookies.get('tempOtp')
        if (tempotp) {
            if (tempotp === otp.join('')) {
                setEmailVerifyStatus('verified')
                setIsOpen(false)
                Cookies.remove('tempOtp')
            } else {
                setEmailVerifyStatus('invalid')
                setOtp(new Array(6).fill(''))
            }
        }
    }

    const handleOtpChange = (otpValue) => {
        // console.log("Current OTP: ", otpValue);
    };



    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            style={customStyles}
        >
            <ModalContainer>
                {email ?
                    <>
                        <span style={{ fontSize: '12px', width: 'fit-content' }}>Enter OTP sent to '{formData?.email}'</span>

                        <OTPInput otp={otp} setOtp={setOtp} length={6} onChangeOTP={handleOtpChange} />

                        <VerifyBtn type='button' onClick={verifyOtp}>Validate</VerifyBtn>
                        {resendOTP ?
                            <p>
                                <span>Resend OTP In </span>
                                <Countdown
                                    date={Date.now() + 120000}  // 2 minutes = 120000 milliseconds
                                    renderer={renderer}
                                /> <span> min</span>
                            </p>
                            :
                            <>
                                <ResendOtp type='button' onClick={onResendSendOtp} >Resend OTP</ResendOtp>
                                {emailVerifyStatus === 'invalid' && <p style={{ color: 'red' }}>Invalid OTP!</p>}
                            </>
                        }
                        <CancleBtn
                            type='button'
                            onClick={() => setIsOpen(false)}

                        >cancle</CancleBtn>
                    </>
                    :
                    phoneNumVerifyStatus === 'otp_sent' ?
                        <>
                            <span style={{ fontSize: '12px', width: 'fit-content' }}>Enter OTP</span>
                            <OTPInput name='otpFields' />
                            <VerifyBtn type='button' onClick={() => setPhoneNumVerifyStatus('otp_veryfying')}>Validate</VerifyBtn>
                        </>
                        : null}
            </ModalContainer>
        </Modal>
    )
}


const ModalContainer = styled.div`
    width: 100%; 
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

const ResendOtp = styled(VerifyBtn)`
    background-color: transparent;
    color: blue;
    
    &:hover{
        background-color: blue;
        color: #fff;
    }
`

const CancleBtn = styled(VerifyBtn)`
    background-color: transparent;
    color: red;
    border-color: transparent;
    text-transform: capitalize;
    text-decoration: underline;
    
    &:hover{
        background-color: transparent;
        color: #000;
        border-color: transparent;
    }
`