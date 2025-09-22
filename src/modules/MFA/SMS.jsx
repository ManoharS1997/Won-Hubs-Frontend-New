
import { useState } from "react";
import Countdown from "react-countdown";
import OtherOptionsList from "./OtherOptionsList"
import OTPInput from "../../../../shared/UIElements/OTPinput";

import { PasskeyMFAContainer, MethodTitle, SubmitBtn } from "./StyledComponents"

export default function SMSmfa({ mfaType, setmfaType }) {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [isOtpSending, setOtpSending] = useState(false);
    const [otpCount, setOtpCount] = useState(0);
    const [timerDuration, setTimerDuration] = useState(1 * 60 * 1000); // Start with 2 minutes
    const [isTimerActive, setTimerActive] = useState(true);

    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            // Timer completed, enable resend button
            setTimerActive(false);
            return <span>You can Resend the OTP now</span>;
        } else {
            // Render countdown timer
            return (
                <span
                    style={{
                        textAlign: 'center'
                    }}
                >
                    Resend OTP in {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </span>
            );
        }
    };

    const sendOtpHandler = async () => {
        setOtpSending(true);
        try {
            const url = `/send-sms-otp`;
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ phoneNo: 'phoneNo' }),
            };
            await fetch(url, options);

            // Increment OTP count and double the timer duration
            setOtpCount((prev) => prev + 1);
            setTimerDuration((prev) => (prev === 0 ? 5 * 60 * 1000 : prev * 2)); // Start with 5 mins after the first attempt
            setTimerActive(true); // Activate the timer
        } catch (err) {
            console.log(err);
        }
        setOtpSending(false);
    }

    return (
        <PasskeyMFAContainer>
            <MethodTitle>SMS</MethodTitle>
            <div>Enter OTP</div>
            <OTPInput otp={otp} setOtp={setOtp} length={6} />
            {
                <>
                    <SubmitBtn type="button">Submit</SubmitBtn>
                    {isTimerActive && (
                        <Countdown
                            key={timerDuration} // Ensure the timer resets correctly
                            date={Date.now() + timerDuration}
                            renderer={renderer}
                        />
                    )}
                    {!isTimerActive && (
                        <button type="button" onClick={sendOtpHandler}>
                            Resend OTP
                        </button>
                    )}
                </>
            }

            <OtherOptionsList mfaType={mfaType} setmfaType={setmfaType} />
        </PasskeyMFAContainer>
    )
}