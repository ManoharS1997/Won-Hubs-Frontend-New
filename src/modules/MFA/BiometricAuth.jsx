// src/components/Register.js
import { useState } from "react";
import { registerUser } from "../../utils/WebAuthn"
import { useNavigate } from "react-router-dom";
import { IoIosFingerPrint } from "react-icons/io";
import Cookies from 'js-cookie'

import OtherOptionsList from "./OtherOptionsList"
import { Title, TitleSpan } from "../LoginPage/pages/StyledComponents";
import { MFAContainer, MFALoginForm } from "./StyledMFA";
import { IncreaseLoginCount } from "../../utils/CheckAndExecuteFlows/CRUDoperations";

const BiometricAuth = ({ mfaType, setMfa, setup }) => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate()
    const userName = Cookies.get('activeUsername')

    const handleRegister = async () => {
        const result = await registerUser();
        setMessage(result);
        await IncreaseLoginCount()
        navigate('/Dashboard')
    };

    return (
        <MFAContainer>
            <MFALoginForm
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    background: '#fff',
                    padding: '2rem',
                    gap: '1rem',
                    boxShadow: '0 0 1rem 0.1rem #ccc',
                    borderRadius: '1rem'
                }}
            >
                <Title>
                    Hi <span style={{ marginLeft: '10px', color: '#4361ee' }}>{userName}</span>,
                    <TitleSpan>Please authenticate with <strong>Biometric</strong></TitleSpan>
                </Title>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem'
                    }}
                >
                    <IoIosFingerPrint size={50} />
                    <button
                        onClick={handleRegister}
                        type="button"
                        style={{
                            backgroundColor: '#ccc'
                        }}
                    >Set / Authenticate Biometric</button>
                </div>
                <p>{message}</p>
                {/* {setup && <OtherOptionsList mfaType={mfaType} setmfaType={setMfa} />} */}

            </MFALoginForm>
        </MFAContainer>
    );
};

export default BiometricAuth;
