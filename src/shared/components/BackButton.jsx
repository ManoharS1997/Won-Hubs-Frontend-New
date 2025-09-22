
import { useNavigate } from "react-router-dom"
import { BackBtn } from "./BackBtnStyledComponents"
import { IoIosArrowBack } from 'react-icons/io'

export default function BackButton({ goBackPath }) {
    const navigate = useNavigate()
    const onBack = () => {
        navigate(goBackPath ? goBackPath : -1)
    }

    return (
        <BackBtn type="button" onClick={onBack}>
            <IoIosArrowBack size={25} />
        </BackBtn>
    )
}