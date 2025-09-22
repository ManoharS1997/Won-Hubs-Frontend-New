
import { UpdateBtn } from "./StyledEventFieldsList"

export default function UpdateButton(props) {
    return (
        <UpdateBtn type={props.type} style={props.style} show={props.display} onClick={props.onClick}>
            {props.children}
        </UpdateBtn>
    )
}