import styled from "styled-components";

export const AdditionalDetailsContainer = styled.div `
    width: 100%;
    height: fit-content;
    background-color: #c7ffc4;
    display: flex;
    flex-direction: column;
    padding: 3%;
`

export const AdditionalHeading = styled.h2 `
    font-size: x-large;
    text-align: left;
`

export const BackBtn = styled.button `
    width: 25px;
    height: 25px;
    background-color: #FFFFFF;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px;
    margin: 5px;
    outline: none;
    border-style: none;
`

export const CompanyForm = styled.form `
    width: 100%;
    height: 98%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 5px;
`

export const CompanyFormDetailsContainer = styled.div `
    width: 100%;
    height: 100%;
    border-radius: 15px;
    padding: 10px;
    background: #fff;
    overflow: hidden;
`

export const ConnectionFieldsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: fit-content;
    width: 100%;
    overflow: auto;

    &::-webkit-scrollbar{
        width: 4px;
    }
    
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: transparent;
    }
    
    &:hover::-webkit-scrollbar-thumb {
        background-color: #d9d9d9;
    }
`;

export const CreateCompanyDetailsContainer = styled.div `
    width: 100vw;
    display: flex;
    height: 93vh;
    margin-top: 7vh;
    background-color: #fff;
`

export const CreateTableContainer = styled.div `
    width: 100vw;
    height: 100vh;
    flex-grow: 1;
    background-color: #fff;
    font-family: Arial, Helvetica, sans-serif;
    overflow-y: auto;
    background-color: #fff;
`

export const CustomContainer = styled.div `
    width: 83vw;
    height: 93vh;
    padding: 10px;
    display: flex;
    background-color: #e5e5e5;
`

export const CustomInput = styled.input `
    min-width: 50%;
    max-width: fit-content;
    height: 100%;
    padding: 5px;
    background-color: #fff;
    outline: none;
    border: 1px solid #6e6f70;
    border-radius: 5px;
    color: #000;
    font-size: 12px;
`

export const CustomLabel = styled.label `
    font-size: 12px;
    font-weight: 600;
    margin-right: 30px;
    width: 35%;
    text-align: right;
`

export const CustomOption = styled.option `
    font-size: 12px;
`

export const CustomSelect = styled.select `
    background-color: #fff;
    color: #000;
    min-width: 40%;
    max-width: fit-content;
    height: 100%;
    padding: 5px;
    border-radius: 5px;
    outline: none;
    border: 1px solid #6e6f70;
    font-size: 12px;
`

export const CustomSpan = styled.span `
    margin-left: 10px;
    font-size: 12px;
    height: 100%;
    width: fit-content;
`

export const CustomTextArea = styled.textarea`
    min-width: 50%;
    max-width: fit-content;
    height: 100%;
    padding: 5px;
    background-color: #fff;
    outline: none;
    border: 1px solid #6e6f70;
    border-radius: 5px;
    color: #000;
    font-size: 12px;
`

export const FieldsContainer = styled.div`
    width: 50%;
    height: fit-content;
`

export const FormTitle = styled.h1 `
    font-family: Arial, Helvetica, sans-serif;
    font-size: 2rem;
    width: 100%;
    text-align: center;
    color: #6c757d;
    margin: 0;
`

export const InputField = styled.div `
    width: 100%;
    display: flex;
    align-items: center;
    margin: 8px 0px;
`

export const Output = styled.div`
    font-size: 12px;
    margin-left: 10px;
`

export const SubmitBtn = styled.button `
    background-color: rgba(0, 0, 255);
    color: #fff;
    padding: 5px;
    outline: none;
    border-radius: 8px;
    width: 100px;
    align-self: center;
    margin: 15px;
    border: 1px solid #ccc;
`

export const TestBtn = styled.button`
    background-color: #70e000;
    padding: 5px;
    outline: none;
    border-radius: 8px;
    width: fit-content;
    height: 30px;
    align-self: center;
    margin: 0px 15px 0px 15px;
    border: 1px solid #ccc;
`
