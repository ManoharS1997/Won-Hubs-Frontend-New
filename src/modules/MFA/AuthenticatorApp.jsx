
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom'
import OtherOptionsList from "./OtherOptionsList"
import { Title, TitleSpan } from "../LoginPage/pages/StyledComponents";
import Cookies from 'js-cookie'
import { MFAContainer, MFALoginForm } from "./StyledMFA";
import { IncreaseLoginCount } from "../../utils/CheckAndExecuteFlows/CRUDoperations";

const MethodTitle = styled.h3`
    color: #000;
    text-align: center;
`
const PasskeyMFAContainer = styled.div`
    width: 50%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    padding: 2rem 1rem;
    box-shadow: 0 0 1rem 0.2rem #ccc;
    gap: 1.5rem;
    color: #000;
    border-radius: 10px;
`
const GenerateBtn = styled.button`
    width: fit-content;
    height: fit-content;
    padding: 0.5rem;
    cursor: pointer;
    background-color: #0c87f3;
    color: #FFF;
    align-self: center;
    border-radius: 0.2rem;
`
const CustomInput = styled.input`
    padding: 0.3rem 0.5rem;
    width: 50%;
    height: 2.5rem;
    border-radius: 0.3rem;
    outline: none;

    &:focus {
        box-shadow: 0 0 0.2rem 0.1rem #1519f8;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    /* input[type=number]{
        -moz-appearance: textfield;
    } */
`

export default function AuthenticatorApp({ mfaType, setMfa, setup }) {
    const [qrCode, setQrCode] = useState(null);
    const [secret, setSecret] = useState(null);
    const [token, setToken] = useState("");
    const [validationResult, setValidationResult] = useState("");
    const Navigate = useNavigate()
    const userName = Cookies.get('activeUsername')

    const fetchQrCode = async () => {
        const response = await fetch(`${import.meta.env.VITE_HOSTED_API_URL}/generate`);
        const data = await response.json();
        setQrCode(data.qrCode);
        setSecret(data.secret);
    };
    const validateToken = async () => {
        const response = await fetch(`${import.meta.env.VITE_HOSTED_API_URL}/validate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, secret }),
        });

        if (response.ok) {
            setValidationResult("Token is valid!");
            await IncreaseLoginCount()
            Navigate('/Dashboard')
        } else {
            setValidationResult("Invalid token.");
        }
    };

    return (
        <MFAContainer>
            <MFALoginForm>
                <Title>
                    Hi <span style={{ marginLeft: '10px', color: '#4361ee' }}>{userName}</span>,
                    <TitleSpan>Please Authentiate with Your <strong>Google Authenticator</strong></TitleSpan>
                </Title>
                <MethodTitle>Authenticator App</MethodTitle>
                {qrCode ? (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1rem',
                            color: '#000'
                        }}
                    >
                        <p>Scan the QR code with your Google Authenticator app:</p>
                        <img src={qrCode} alt="QR Code" />
                        <CustomInput
                            type="number"
                            // inputMode="numeric"
                            placeholder="Enter the token from the app"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                        />
                        <GenerateBtn onClick={validateToken}>Validate Token</GenerateBtn>
                        <p style={{ color: 'red' }}>{validationResult}</p>
                    </div>
                ) : (
                    <GenerateBtn
                        type="button"
                        onClick={fetchQrCode}
                    >Generate QR Code</GenerateBtn>
                )}
                {/* {setup && <OtherOptionsList mfaType={mfaType} setmfaType={setMfa} />} */}

            </MFALoginForm>
        </MFAContainer>
    )
}