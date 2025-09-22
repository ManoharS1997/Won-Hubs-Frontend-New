import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import styled from "styled-components";
import { ColorRing } from "react-loader-spinner";
import { sendEmailOtp } from "../../utils/CheckAndExecuteFlows/CRUDoperations";
import Cookies from "js-cookie";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import OTPInput from "../SignupPage/components/OTPinput";
import { MdEmail } from "react-icons/md";
import WonContext from "../../context/WonContext";
import { useAlert } from "../../shared/hooks/alertHook";

import { IncreaseLoginCount, updateTableData } from "../../utils/CheckAndExecuteFlows/CRUDoperations";
import Timer from "../../shared/UIElements/Timer";
import MFAMethodVerification from "../../utils/functions/MFAMethodsVerify";

import {
    LoginForm, Title, Group, Input, Label, Bar,
    Highlight, VerifyBtn, MoreOptions, ButtonsContainer,
    LoginBtn, TitleSpan,
} from "../LoginPage/pages/StyledComponents";
import { MFAContainer, MFALoginForm } from "./StyledMFA";

const SuperAdminUserData = {
    id: 80001001,
    username: "Kartheek92",
    role_id: 2,
    first_name: "Kartheek",
    last_name: "M",
    title: "Mr",
    department: "Technical",
    active: "true",
    selected_layout: "1",
    dashboard_layouts: [
        {
            id: 1,
            name: "New Dash",
            layouts: [
                { h: 4, i: "1", w: 12, x: 0, y: 0, moved: false, static: false },
                { h: 5, i: "a", w: 6, x: 0, y: 4, moved: false, static: false },
                { h: 9, i: "b", w: 12, x: 0, y: 9, moved: false, static: false },
                { h: 5, i: "c", w: 6, x: 6, y: 4, moved: false, static: false },
                { h: 11, i: "d", w: 8, x: 0, y: 18, moved: false, static: false },
                { h: 4, i: "e", w: 4, x: 8, y: 22, moved: false, static: false },
                { h: 4, i: "f", w: 4, x: 8, y: 18, moved: false, static: false },
            ],
        },
        {
            id: 2,
            name: "dash 1",
            layouts: [
                { h: 4, i: "1", w: 12, x: 0, y: 0 },
                { h: 5, i: "a", w: 6, x: 0, y: 1 },
                { h: 9, i: "b", w: 12, x: 1, y: 2 },
                { h: 5, i: "c", w: 6, x: 1, y: 1 },
                { h: 11, i: "d", w: 8, x: 1, y: 3 },
                { h: 4, i: "e", w: 4, x: 1, y: 4 },
                { h: 4, i: "f", w: 4, x: 1, y: 4 },
            ],
        },
        {
            id: 3,
            name: "dash 2",
            layouts: [
                { h: 3, i: "1", w: 5, x: 0, y: 0, moved: false, static: false },
                { h: 6, i: "a", w: 5, x: 0, y: 3, moved: false, static: false },
                { h: 9, i: "b", w: 12, x: 0, y: 9, moved: false, static: false },
                { h: 5, i: "c", w: 6, x: 5, y: 0, moved: false, static: false },
                { h: 11, i: "d", w: 8, x: 0, y: 18, moved: false, static: false },
                { h: 4, i: "e", w: 4, x: 8, y: 18, moved: false, static: false },
                { h: 4, i: "f", w: 6, x: 5, y: 5, moved: false, static: false },
            ],
        },
        {
            id: 4,
            name: "dhash 3",
            layouts: [
                { h: 4, i: "1", w: 12, x: 0, y: 0 },
                { h: 5, i: "a", w: 6, x: 0, y: 1 },
                { h: 9, i: "b", w: 12, x: 1, y: 2 },
                { h: 5, i: "c", w: 6, x: 1, y: 1 },
                { h: 11, i: "d", w: 8, x: 1, y: 3 },
                { h: 4, i: "e", w: 4, x: 1, y: 4 },
                { h: 4, i: "f", w: 4, x: 1, y: 4 },
            ],
        },
    ],
    password: "NowitServices2023@",
    reset_password: "false",
    email: "kartheek.muppiri@nowitservices.com",
    time_zone: "Asia/India",
    phone_no: "5689421683",
    location: null,
    user_type: "admin",
};

export default function MFAEmailLogin({ userName, mfaType, setMfa, setup, setClose }) {
    const [userMail, setUsermail] = useState("");
    const [emailVerifyStatus, setEmailVerifyStatus] = useState("otp_send");
    const [showEmailOtpSendingLoader, setShowEmailOtpSendingLoader] = useState(false);
    const [isEmailVerifyModalOpen, setIsEmailVerifyModalOpen] = useState(false);
    const { setActiveUserData } = useContext(WonContext);
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [attemptsCount, setAttemptsCount] = useState(false);
    const [showTimer, setShowTimer] = useState(false)
    const { addAlert } = useAlert();
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('activeUserData'))

    const onResendOtp = () => {
        setResendOTP(true);
        setTimeout(() => {
            setResendOTP(false);
        }, 2 * 60000);
    };

    // function to respond on email verification and send an email OTP
    const onEmailVerification = async () => {
        // Start showing the loader

        function ValidateEmail(input) {
            var validRegex =
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            if (input.match(validRegex)) {
                // alert("Valid email address!");
                document.forgotUsername.email.focus();
                return true;
            } else {
                // alert("Invalid email address!");
                addAlert("Invalid email address!", "failure");
                document.forgotUsername.email.focus();
                return false;
            }
        }

        if (ValidateEmail(userMail)) {
            try {
                setShowEmailOtpSendingLoader(true);
                const emailOtp = await sendEmailOtp(
                    userMail,
                    "Email MFA Page",
                    window.location.href,
                    "internal"
                );
                if (emailOtp) {
                    // OTP successfully sent, store OTP in cookies and update verification status
                    Cookies.set("emailVerifyOtp", emailOtp.tempOtp);
                    setEmailVerifyStatus("otp_sent");
                    setIsEmailVerifyModalOpen(true);
                    setAttemptsCount(true);
                    setShowTimer(true);

                    addAlert(`OTP has been send to ${userMail}`, "success");
                    setInterval(() => {
                        Cookies.remove("tempOtp");
                    }, 5 * 60000);
                }
            } catch (error) {
                console.error("Error sending OTP:", error);
                addAlert(`Failed to send OTP.${error}.`, "failure");
            } finally {
                // Hide loader regardless of success or failure
                setShowEmailOtpSendingLoader(false);
            }
        } else {
            // Invalid email case
            addAlert("Please enter a valid email address.", "critical");
            setShowEmailOtpSendingLoader(false); // Ensure loader is hidden
        }
    };

    // function to handle the submit
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    // function to handle the OTP verification
    const verifyOtp = async () => {
        setEmailVerifyStatus("otp_veryfying");
        const tempotp = Cookies.get("emailVerifyOtp");

        if (tempotp) {
            if (tempotp === otp.join("")) {
                if (setup) {
                    await updateTableData('users', userData.id, { mfa_type: mfaType }, 'email-otp-setup', window.location.href)
                    return setClose(false)
                }
                setEmailVerifyStatus("verified");
                // setIsOpen(false)
                Cookies.remove("emailVerifyOtp");
                Cookies.remove("loginStageOne");
                Cookies.remove("firstStageVerifiedWith");

                // setFirstSategeVerification('email')
                // if (!response.ok) {
                //     if (password === 'Super-admin-2@nowitservices') {
                Cookies.set("activeUser", "bhe765789m86_tw65e65vq$^%&&*b");
                localStorage.setItem(
                    "activeUserData",
                    JSON.stringify(SuperAdminUserData)
                );
                setActiveUserData(SuperAdminUserData);
                // }

                Cookies.set("isMFACleared", JSON.stringify({ success: true }));
                setIsEmailVerifyModalOpen(false);
                await IncreaseLoginCount()
                MFAMethodVerification('email')
                // return navigate("/Dashboard", { replace: true });
            } else {
                setEmailVerifyStatus("invalid");
                setOtp(new Array(6).fill(""));
            }
        }
    };

    const handleOtpChange = (otpValue) => {
        // console.log("Current OTP: ", otpValue);
    };

    return (
        <MFAContainer>
            <MFALoginForm onSubmit={handleSubmit} name="forgotUsername">
                <Title>
                    Hi{" "}
                    <span
                        style={{ marginLeft: "10px", color: "#4361ee" }}
                    >{userName}</span>
                    ,
                    <TitleSpan>
                        Please Enter Your <strong>Email</strong> Address
                    </TitleSpan>
                </Title>

                <>
                    <FieldsContainer>
                        <Group>
                            <Input
                                type="email"
                                name="email"
                                required
                                value={userMail}
                                onChange={(e) => setUsermail(e.target.value)}
                            />
                            <Label>
                                <MdEmail size={20} />
                            </Label>
                            <Bar />
                            <Highlight />
                        </Group>

                        {emailVerifyStatus !== "verified" ? (
                            showEmailOtpSendingLoader ? (
                                <ColorRing
                                    visible={true}
                                    height="30"
                                    width="30"
                                    ariaLabel="color-ring-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="color-ring-wrapper"
                                    colors={[
                                        "#021ab5",
                                        "#021ab5",
                                        "#021ab5",
                                        "#021ab5",
                                        "#021ab5",
                                        "#021ab5",
                                    ]}
                                />
                            ) : showTimer ? (
                                <Timer
                                    initialMinutes={0}
                                    initialSeconds={30}
                                    onComplete={() => setShowTimer(false)}
                                />
                            ) : (
                                <VerifyBtn
                                    type="button"
                                    disabled={false}
                                    onClick={onEmailVerification}
                                >
                                    {attemptsCount > 0 ? "Resend OTP" : "Send OTP"}
                                </VerifyBtn>
                            )
                        ) : (
                            <>
                                <RiVerifiedBadgeFill style={{ color: "#38b000" }} size={18} />
                                <span>Verified</span>
                            </>
                        )}
                    </FieldsContainer>

                    {isEmailVerifyModalOpen && (
                        <>
                            <FieldsContainer>
                                Enter OTP
                                <OTPInput
                                    otp={otp}
                                    setOtp={setOtp}
                                    length={6}
                                    onChangeOTP={handleOtpChange}
                                />
                                <VerifyBtn
                                    type="button"
                                    onClick={verifyOtp}
                                    disabled={otp.join("").length < 6}
                                >
                                    Verify
                                </VerifyBtn>
                            </FieldsContainer>
                        </>
                    )}
                    <p></p>
                </>

                <MoreOptions>Other Options</MoreOptions>

                <ButtonsContainer>
                    {/* {setup && <OtherOptionsList mfaType={mfaType} setmfaType={setMfa} />} */}


                    {/* <LoginBtn type='submit'>Login </LoginBtn> */}
                </ButtonsContainer>
            </MFALoginForm>
        </MFAContainer>
    );
}

const FieldsContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;

const ResendOtp = styled(VerifyBtn)`
  background-color: transparent;
  color: blue;

  &:hover {
    background-color: blue;
    color: #fff;
  }
`;

const BackBtn = styled.button`
  padding: 5px 10px;
  margin: 0;
  cursor: pointer;
  width: fit-content;
  background-color: transparent;
  outline: none;
  border: none;

  &:hover {
    background-color: aliceblue;
    text-decoration: underline;
  }
`;
