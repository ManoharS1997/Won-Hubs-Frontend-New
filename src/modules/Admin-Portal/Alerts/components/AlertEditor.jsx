
import styled from "styled-components"
import BackBtn from "../../../../shared/UIElements/BackBtn"
import QuillEditor from "../../../../shared/components/QuillEditor"

const EditorContainer = styled.div`
    width: 100%;
    height: 100%;
    display: ${({ show }) => show ? 'flex' : 'none'};
    flex-direction: column;
    gap: 1rem;
    
`

export default function AlertEditor({ show, onClick }) {
    return (
        <EditorContainer show={show} >
            <BackBtn show={show} onClick={onClick} />
            <QuillEditor />
        </EditorContainer>
    )
} 