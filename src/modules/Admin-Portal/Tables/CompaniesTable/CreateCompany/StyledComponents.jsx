import styled, { keyframes } from "styled-components";

const scaleUp4 = keyframes`
    20% {
    background-color: #ffff;
    transform: scaleY(1.5);
    }
    40% {
    transform: scaleY(1);
    }
`;
export const BackBtn = styled.button`
    width: 25px;
    height: 25px;
    background-color: #FFFFFF;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px;
    margin: 0px;
    outline: none;
    border-style: none;
`;

export const CompanyForm = styled.form`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 15px;
    border-radius: 15px;
`;

export const CompanyFormDetailsContainer = styled.div`
    overflow: auto;
    width: fit-content;
    flex-grow: 1;
    border-radius: 15px;
    margin-right: 15px;
`;

export const CreateCompanyDetailsContainer = styled.div`
    width: 100vw;
    display: flex;
    height: 93vh;
    margin-top: 7vh;
    background-color: #fff;
`;

export const CreateTableContainer = styled.div`
    width: fit-content;
    height: 100%;
    flex-grow: 1;
    background-color: #fff;
    font-family: Arial, Helvetica, sans-serif;
    overflow-y: auto;
    background-color: #fff;
`;

export const CustomContainer = styled.div`
    width: 100%;
    flex-grow: 1;
    height: 93vh;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    background-color: #e5e5e5;
`;

export const CustomInput = styled.input`
    width: 40%;
    height: 100%;
    padding: 5px;
    background-color: #fff;
    outline: none;
    border: 1px solid #6e6f70;
    border-radius: 5px;
    color: #000;
    font-size: 12px;
`;

export const CustomLabel = styled.label`
    font-size: 12px;
    font-weight: 600;
    margin-right: 40px;
    width: 30%;
    text-align: right;
`;

export const CustomOption = styled.option`
    font-size: 12px;
`;

export const CustomSelect = styled.select`
    background-color: #fff;
    color: #000;
    min-width: 30%;
    height: 100%;
    padding: 5px;
    border-radius: 5px;
    outline: none;
    border: 1px solid #6e6f70;
    font-size: 12px;
`;

export const FormTitle = styled.h1`
    font-family: Arial, Helvetica, sans-serif;
    width: 100%;
    text-align: center;
    color: green;
`;

export const InputField = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin: 10px 0px;
`;

export const SubmitBtn = styled.button`
    background-color: green;
    color: #fff;
    padding: 10px;
    outline: none;
    border-radius: 8px;
    width: 100px;
    border-style: none;
    align-self: center;
    margin: 15px;
`;

export const TextAreaTag = styled.textarea`

`



// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Loader styles @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


export const Loader = styled.div`
    display: flex;
    align-items: center;
`;

export const Bar = styled.span`
    display: inline-block;
    width: 3px;
    height: 20px;
    background-color: rgba(255, 255, 255, .5);
    border-radius: 10px;
    animation: ${scaleUp4} 1s linear infinite;

    &:nth-child(2) {
        height: 35px;
        margin: 0 5px;
        animation-delay: .25s;
    }

    &:nth-child(3) {
        animation-delay: .5s;
    }
`;