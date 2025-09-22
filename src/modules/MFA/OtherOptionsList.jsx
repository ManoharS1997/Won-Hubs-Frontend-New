import styled from "styled-components";
import { PiPhoneCallFill } from "react-icons/pi";
// import { GoPasskeyFill } from "react-icons/go";
import { SiAuthelia } from "react-icons/si";
// import { PiPhoneCallFill } from "react-icons/pi";
import { PiFingerprintFill } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { MdTextsms } from "react-icons/md";
import { FaKey } from "react-icons/fa6";
import MFATooltip from "../LoginPage/components/MFATootltip";
import { useNavigate } from "react-router-dom";

const OptionsList = styled.ul`
    padding: 0;
    margin: 0;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
`
const MethodSwitch = styled.button`
    padding: 0.5rem 1rem;
    outline: none;
    cursor: pointer;
    text-align: center;
    border-radius: 500px;
    background-color: #0c87f3;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s all ease;

    &:hover {
        background-color: #FFFFFF;
        color: #0c87f3;
    }
`

export default function OtherOptionsList({ mfaType, setmfaType }) {
    const navigate = useNavigate()
    const options = [
        { icon: <MdEmail size={30} />, name: 'email' },
        { icon: <FaKey size={30} />, name: 'passkey' },
        { icon: <MdTextsms size={30} />, name: 'sms' },
        { icon: <SiAuthelia size={30} />, name: 'authenticator' },
        { icon: <PiPhoneCallFill size={30} />, name: 'call' },
        { icon: <PiFingerprintFill size={30} />, name: 'biometric' },
    ]

    return (
        <OptionsList>
            {options.map(option => option.name !== window.location.pathname.split('/').join('').split('-')?.[0] &&
                <MethodSwitch
                    key={option.id}
                    type="button"
                    onClick={() => navigate(`/${option.name}-MFA`)}
                    data-tooltip-id={option.name}
                >
                    {option.icon}
                    <MFATooltip id={option.name} label={option.name} />
                </MethodSwitch>
            )}
        </OptionsList>
    )
}