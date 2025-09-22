
import { useState } from "react";
import styled from "styled-components";
import Countdown from "react-countdown";
import OtherOptionsList from "./OtherOptionsList"
import Cookies from 'js-cookie'
import { Title, TitleSpan } from "../LoginPage/pages/StyledComponents";
import { MFAContainer, MFALoginForm } from "./StyledMFA";
import { IncreaseLoginCount } from "../../utils/CheckAndExecuteFlows/CRUDoperations";
const MethodTitle = styled.h3`
`
const PasskeyMFAContainer = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    padding: 2rem 1rem;
    box-shadow: 0 0 1rem 0.2rem #ccc;
    gap: 1.5rem;
    border-radius: 10px;
`

export default function PhoneCall({ mfaType, setMfa, setup }) {

    const [timerDuration, setTimerDuration] = useState(1 * 60 * 1000); // Start with 2 minutes
    const [isTimerActive, setTimerActive] = useState(true);
    const userName = Cookies.get('activeUsername')

    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            // Timer completed, enable resend button
            setTimerActive(false);
            return <span>You can Request call now</span>;
        } else {
            // Render countdown timer
            return (
                <span
                    style={{
                        textAlign: 'center'
                    }}
                >
                    Request Call again in {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </span>
            );
        }
    };
    const sendOtpHandler = async () => {
        // setOtpSending(true);
        try {
            const url = `/send-sms-otp`;
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ phoneNo: 'phoneNo' }),
            };
            const response = await fetch(url, options);
            if (response.ok) {
                await IncreaseLoginCount()
            }

            // Increment OTP count and double the timer duration
            // setOtpCount((prev) => prev + 1);
            setTimerDuration((prev) => (prev === 0 ? 5 * 60 * 1000 : prev * 2)); // Start with 5 mins after the first attempt
            setTimerActive(true); // Activate the timer
        } catch (err) {
            console.log(err);
        }
        // setOtpSending(false);
    }
    return (
        <MFAContainer>
            <MFALoginForm>
                <Title>
                    Hi <span style={{ marginLeft: '10px', color: '#4361ee' }}>{userName}</span>,
                    <TitleSpan>Please Enter Your <strong>Mobile Number</strong></TitleSpan>
                </Title>
                <MethodTitle>Phone Call</MethodTitle>
                {
                    <>
                        {isTimerActive && (
                            <Countdown
                                key={timerDuration} // Ensure the timer resets correctly
                                date={Date.now() + timerDuration}
                                renderer={renderer}
                            />
                        )}
                        {!isTimerActive && (
                            <button type="button" onClick={sendOtpHandler}>
                                Request Call
                            </button>
                        )}
                    </>
                }

                {/* {setup && <OtherOptionsList mfaType={mfaType} setmfaType={setMfa} />} */}
            </MFALoginForm>
        </MFAContainer>
    )
}