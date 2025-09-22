import styled from "styled-components";

export const RequestsContainer = styled.form `
    width: 100vw;
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    padding: 5%;
    box-sizing: border-box;
`

export const CustomInputField = styled.p `
    width: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
`

export const CustomLabel = styled.label `
    width: 20%;
    text-align: right;
    padding-right: 2%;
`

export const CustomInput = styled.input `
    outline: none;
    padding: 10px;
    border: 1px solid grey;
    border-radius: 5px;
    color: #000;
    background-color: transparent;
`

export const CustomSelect = styled.select `
    background-color: transparent;
    padding: 10px;
    color: #000;
    border: 1px solid grey;
    border-radius: 5px;
    color: #000;
    outline: none;
`

export const CustomOption = styled.option `
    padding: 5px;
    background-color: aquamarine;
`

export const CustomTextfield = styled.textarea `
    padding: 10px;
    color: #000;
    background-color: #fff;
    outline: none;
    border: 1px solid grey;
    border-radius: 5px;
`

export const AddFileContainer = styled.p `
    display: flex;
    align-items: center;
    height: 100%;
    border: 1px solid #e6e3e3;
    text-align: center;
    color: #000 !important;
    min-width: 200px;
    padding: 0px;
    margin: 0px;
    border-radius: 5px;
    font-weight: 700;
`

export const AddFileInput = styled.label `
    height: 100%;
    background-color: #e6e3e3;
    outline: none;
    border-radius: 5px;
    color: #000;
    cursor: pointer;
    padding: 10px;
`

export const CustomSpan = styled.span `
    height: 100%;
    width: fit-content;
    padding: 10px;
    display: flex;
`

export const SubmitBtn = styled.button`
    background-color: #049bc4;
    color: #fff;
    font-weight: 700;
    width: 150px;
    margin-left: 20%;
`

//  popup ticket status styled elements
export const PopupContainer = styled.div `
    display: ${(props) => props.opened===true ? 'flex' : 'none'};
    position: fixed;
    top: 80;
    left: 75;
    right: 0;
    bottom: 0;
    align-items: center;
    width: 25%;
    height: fit-content;
    padding: 10px;
    justify-content: flex-end;
`

export const TicketStatusText = styled.p `
    color: #fff;
    font-weight: 700;
    background-color: #3dad2b;
    padding: 10px;
    width: fit-content;
    border-radius: 10px;
`

export const CloseBtn = styled.button `
    background-color: transparent;
    color: #fff;
    border-style: none;
    cursor: pointer;
    padding: 10px;
`

export const ErrMsg = styled.p `
    color: red;
    font-weight: 700;
    margin-left: 15%;
    padding: 2%;
`