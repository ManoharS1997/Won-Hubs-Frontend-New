import styled from "styled-components";

export const BodyContainer = styled.div`
    background-color: #fff;
`

export const BtnsContainer = styled.div`
    display: flex;
    flex-direction: row;
`

export const CancelBtn = styled.button`
    height: fit-content;
    text-align: center;
    width: fit-content;
    border-radius: 6px;
    margin: 0px 6px 0px 0px;
    padding: 4px 6px 4px 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    color: #e5383b;
    cursor: pointer;
    outline: none;
    border: 1px solid ;

`

export const CloseBtn = styled.button`
    color: #e5383b;
    border-radius: 50%;
    padding: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
        &:hover{
            color: #fff;
            background-color: #e5383b;
            
        }
`

export const FootarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    background-color: #fff;
    padding: 5px;
    border-radius: 4px;
`

export const FormContainer = styled.div`
    width: 50vw;
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fff;
`

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 6px;
    border-radius: 4px;
`

export const Heading = styled.h1`
    font-size: 15px;
    text-align: center;
    align-self: center;
    margin: 0px;
`

export const InputContainer = styled.div`
    display: flex;
    margin-top: 4px;
    margin-bottom: 3px;
`

export const InputTag = styled.input`
    flex-grow: 1;
    margin-left: 9px;
    border: 1px solid #ccc;
    border-radius: 3px;
    color: #000;
    background-color: #fff;
`

export const LabelTag = styled.label`
    width: 10%;
    text-align: right;
    align-self: center;
`

export const SendBtn = styled.button`
    height: fit-content;
    text-align: center;
    width: fit-content;
    border-radius: 6px;
    margin: 0px 6px 0px 0px;
    padding: 4px 6px 4px 6px;
    display: flex;
    align-items: center;
    background-color: #fff;
    color: #3498db;
    outline: none;
    border: 1px solid;
`

export const TextAreaTag = styled.textarea`
    width: 100%;
    min-height: 150px;
    max-height: 150px;
    margin-top: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 2px;
    overflow-y: auto;
    background-color: #fff;
    color: #000;
`

export const UploadBtn = styled.div`
    align-self: center;
    width: 100px;
    padding: 0px;
    border: 1px solid;
    border-radius: 3px;
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;    
`



