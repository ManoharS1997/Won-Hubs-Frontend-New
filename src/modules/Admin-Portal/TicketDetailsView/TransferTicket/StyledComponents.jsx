import styled from "styled-components";

export const TransferTicketContainer = styled.div`
    width: 50vw;
    height: 45vh;
`

export const TransferTicketHeader = styled.div`
    height: 10%;
    width: 100%;
    display: flex;

`
export const Header = styled.p`
    width: 97%;
    font-size: 1.5rem;
`
export const CloseBtn = styled.button`
    width: 25px;
    height: 25px;
    background: #f1f1f1;
    color: red;
    padding: 0px;
    border-radius: 50%;
`
export const BodyContainer = styled.div`
    height: 90%;
    width: 100%;

`
export const Field = styled.div`
    width: 50%;
    height: 30px;
    display: flex;
    align-items: center;
`
export const LabelTag = styled.label`
    width: 30%;
    height: 25px;
`


//DROPDOWN STYLES CUSTOM
export const CustomDropdownContainer = styled.div`
    position: relative;
    width: 70%;
    height: 25px;
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    padding: 2px;
`

export const NewCustomDropDown = styled.div`
    width: 100%;
    height: 100%;
    padding: 5px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0px 0px 0px 0px;
    background-color: #fff;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
`

export const CustomDrpdownOptions = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    padding: 1px;
    margin: 0px;
    background: #fff;
    min-height: fit-content;
    max-height: 150px;
    display: flex;
    flex-direction: column;
    margin-top: 1px;
    border-radius: 5px;
    z-index: 1;
`

export const DropdownSearchBox = styled.input`
    background-color: #fff;
    border: 1px solid #6c757d;
    height: 9%;
    width: 100%;
    border-radius: 5px;
    color: #000;
    outline: none;
    padding: 1px 5px 1px 6px;
    margin: 1px 1px 1px 0px;
`

export const DropDownOptionsContainer = styled.div`
    
`

export const OptionsContainer = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    min-height: fit-content;
    max-height: 80%;
    display: flex;
    flex-direction: column;
    column-gap: 0;
    border-radius: 5px;
    padding: 2px;

    border: 1px solid #ccc;

    &::-webkit-scrollbar{
        width: 3px;
    }

    &::-webkit-scrollbar-track{
        background-color: transparent;
    }
`

export const DropdownOptions = styled.div`
    padding: 2px 8px 2px 8px;
    border-radius: 5px;
    display: flex;
    cursor: pointer;
    &:hover{
        background-color: #b8dbd9;
    }
`

export const CustomContainer = styled.div`
    width: 100%;
    height: 12%;
    display: flex;
    align-items: center;
`

export const TextAreaTag = styled.textarea`
    width: 100%;
    min-height: 80%;
    max-height: 100%;
    margin-top: 15px;
    background: #f1f1f1;
    border: 1px solid #ccc;
    border-radius: 5px;
    color: #000;
    outline: none;
    padding: 5px;
`

export const BtnsContainer = styled.div`
    width: 100%;
    height: 25%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    /* border: 1px solid; */
`
export const Btn = styled.button`
    background: #1dd3b0;
    color: #000;
    border-radius: 5px;
    margin: 4px;
    padding: 5px;
`