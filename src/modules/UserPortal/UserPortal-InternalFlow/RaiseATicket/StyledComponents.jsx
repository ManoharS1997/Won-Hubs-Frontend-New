import styled from "styled-components";
import { Form, Field, ErrorMessage } from 'formik'

export const AddFileContainer = styled.p`
    display: flex;
    align-items: center;
    height: 80%;
    border: 1px solid #e6e3e3;
    text-align: center;
    color: #000 !important;
    min-width: 200px;
    max-width: fit-content;
    padding: 0px;
    margin: 0px;
    border-radius: 5px;
    font-weight: 700;
`

export const AddFileInput = styled.label`
    height: 100%;
    background-color: #e6e3e3;
    outline: none;
    border-radius: 5px;
    color: #000;
    cursor: pointer;
    padding: 7px;
    display: flex;
    align-items: center;
`

export const ArticlesContainer = styled.div`
    height: 27%;
    width: 100%;
    border-radius: 7px;
`

export const BackBtn = styled.button`
    background: transparent;
    color: #000;
    padding: 0px;
    display: flex;
    margin-right: 5px;
    border: none;
`

export const Btn = styled.button`
    background-color: #049bc4;
    color: #fff;
    font-weight: 500;
    min-width: 100px;
    height: 30px;
    margin: 0px 7px 0px 7px;
    cursor: pointer;
    padding: 7px;
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 6px;
`

export const ButtonsContainer = styled.div`
    display:flex;
    justify-content: flex-end;
    align-items: center;
    width: 60%;
    height: 9%;
    position: absolute;
    bottom: 0;
    right: 2%;
`

export const Card = styled.li`
    flex: 0 0 calc(33.33% - 7.5px);
    max-width: calc(33.33% - 7.5px);
    height: 50px;
    list-style-type: none;
    border-radius: 7px;
    background: #ece4db;
    display: flex;
    flex-direction: column;
    padding: 8px;
    margin: 0px;
`

export const Cards = styled.ul`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 83%;
    border-radius: 7px;
    column-gap: 10px;
    row-gap: 10px;
    max-height: 100%;
    width: 100%;
    overflow-y: auto;
    padding: 7px;
    background: #ffffff;
    margin-top: 4px;

    &::-webkit-scrollbar{
        width: 3px;
    }
    
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: transparent;
    }
    
    &:hover::-webkit-scrollbar-thumb {
        background-color: #ccc;
    }
`

export const CheckOutContainer = styled.div`
    width: 35%;
    height: 100%;
    padding: 5px;
    border-radius: 7px;
    position: relative;
`

export const CloseBtn = styled.button`
    background-color: transparent;
    color: #fff;
    border-style: none;
    cursor: pointer;
    padding: 10px;
`

export const ContentContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px;
    background-color: #d9d9d9;
    flex-grow: 1;
`

export const CustomA = styled.a``

export const CustomContainer = styled.div`
    display: flex;
    width: 100%;
`

export const CustomInput = styled.input`
    outline: none;
    padding: 7px;
    border: 1px solid #ccc;
    border-radius: 5px;
    color: #000;
    font-size: 12px;
    background-color: transparent;
    width: 60%;
`

export const CustomInputField = styled.div`
    width: 100%;
    min-height: 8%;
    display: flex;
    align-items: center;
    column-gap: 10px;
    margin: 7px 0px 0px 0px;
`

export const CustomLabel = styled.label`
    width: 20%;
    text-align: right;
    padding-right: 10px;
    font-size: 12px;
`

export const CustomLi = styled.li``


export const CustomOption = styled.option`
    padding: 10px !important;
    font-size: 12px;
`

export const CustomSelect = styled.select`
    background-color: transparent;
    padding: 7px;
    color: #000;
    border: 1px solid #ccc;
    border-radius: 5px;
    color: #000;
    outline: none;
    font-size: 12px;
    height: 100%;
    width: 60%;
`

export const CustomSpan = styled.span`
    height: 100%;
    width: fit-content;
    padding: 10px;
    display: flex;
    align-items: center;
    color: #000;
`

export const CustomTextfield = styled.textarea`
    padding: 10px;
    color: #000;
    background-color: #fff;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 12px;
    width: 60%;
    max-height: 100px;
`

export const CustomUl = styled.ul``


export const ErrMsg = styled.p`
    color: red;
    font-weight: 700;
    bottom: 0.2%;
    left: 30%;
    position: absolute;
`

export const Fields = styled.div`
    height: 95%;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 3px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: transparent;
        color: transparent;
    }

    &:hover::-webkit-scrollbar-thumb {
        background: #ccc;
        color: #fff; 
    }
`

export const FormTitle = styled.h1`
    font-size: 25px;
    margin: 0px;
`

export const Heading = styled.h1`
    font-size: 2rem;
    display: flex;
    height: 5vh;
`

export const ImgTag = styled.img`
    height: 100%;
    width: 80%;
    border-radius: 7px;
    border: 1px solid;
`

export const MainContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-grow: 1;
`

export const OrderBtnsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0px;
    height: fit-content;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0%);
`

export const PTag = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px;
    padding: 0px;
`

export const PopupContainer = styled.div`
    display: ${(props) => props.opened === true ? 'flex' : 'none'};
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

export const QuantityBtns = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

`

export const QuantityContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 7%;
`

export const RequestsContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 10px;
    box-sizing: border-box;
    background-color: #fff;
    overflow: auto;
    flex-grow: 1;
    border-radius: 10px;
`

export const ScheduleBtnContainer = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    margin: 5px 0px 0px 0px;
    width: fit-content;
`

export const ScheduleDropdownContainer = styled.div`
    display: flex;
    flex-direction: column;
    top: 100%;
    width: 100%;
    left: 0;
    position: absolute;
    z-index: 2;
    background: #fff;
    border-radius: 0px 0px 7px 7px;
    box-shadow: 
        2px 2px 4px rgba(206, 212, 218, 0.3),
        -2px -2px 4px rgba(206, 212, 218, 0.3),
        2px -2px 4px rgba(206, 212, 218, 0.3),
        -2px 2px 4px rgba(206, 212, 218, 0.3);
    padding: 5px;
`

export const SpanTag = styled.span`
    cursor: pointer;
`

export const StyledErrorMessage = styled(ErrorMessage)`
min-width: fit-content;
    max-width: 12%;
    font-size: 0.5rem;
    margin: 0px;
    padding: 0px;
    color: red;
`

export const StyledField = styled(Field)`
    outline: none;
    padding: 7px;
    border: 1px solid #ccc;
    border-radius: 5px;
    color: #000;
    font-size: 12px;
    background-color: transparent;
    width: 65%;
`

export const StyledForm = styled(Form)`
    min-height: fit-content;
    width: 60%;
    padding: 15px;
    border-radius: 7px;
    position: relative;
`

export const TemplateContainer = styled.div`
    height: 50%;
    display: flex;
    justify-content: center;
`

export const TicketContainer = styled.div`
    width: 100%;
    height: 65%;
    display: flex;
    justify-content: space-around;
    padding: 5px;
    border-radius: 7px;
`

export const TicketForm = styled.form`
    height: 90;
    width: 60%;
    padding: 5px;
    border-radius: 7px;
    position: relative;
`

export const TicketStatusText = styled.p`
    color: #fff;
    font-weight: 700;
    background-color: #3dad2b;
    padding: 10px;
    width: fit-content;
    border-radius: 10px;
`

export const Topcon = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 5%;
    width: 100%;
    margin-bottom: 20px;
`