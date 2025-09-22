
import { useNavigate } from "react-router-dom";
import styled from "styled-components"

import { MdOutlineArrowBackIosNew } from "react-icons/md";

const BackButton = styled.button`
    padding: 0.2rem;
    display: ${({ show }) => show ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
    width: fit-content;
    border-radius: 50%;
    outline: none;
    border: none;
`

export default function BackBtn({ show, onClick }) {
    const Navigatem = useNavigate()

    return (
        <BackButton
            type="button"
            onClick={onClick ? onClick : () => Navigatem(-1)}
            show={show}
        >
            <MdOutlineArrowBackIosNew size={25} />
        </BackButton>
    )
}