import styled from "styled-components";

export const ActionButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 35px;
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

export const CompanyDetailsContainer = styled.div`
    width: 100vw;
    display: flex;
    height: 93vh;
    margin-top: 7vh;
    background-color: #e5e5e5;
`;

export const CompanyForm = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 15px;
    border-radius: 15px;
`;

export const CompanyTableDetailedViewContainer = styled.div`
    width: 100vw;
    height: fit-content;
    flex-grow: 1;
    background-color: #fff;
    border-radius: 15px;
    font-family: Arial, Helvetica, sans-serif;
    overflow-y: auto;
    background-color: #fff;
`;

export const CustomContainer = styled.div`
    width: 100%;
    flex-grow: 1;
    height: 93vh;
    overflow: hidden;
    padding: 15px;
    background-color: #e5e5e5;
    display: flex;
    justify-content: space-between;
`;

export const CustomInput = styled.input`
    width: 400px;
    height: 100%;
    padding: 8px;
    background-color: #fff;
    outline: none;
    border: 1px solid #6e6f70;
    border-radius: 5px;
    color: #000;
    font-size: 12px;
`;

export const CustomLabel = styled.label`
    font-size: 14px;
    font-weight: 600;
    margin-right: 20px;
    width: 25%;
    text-align: right;
`;

export const FormTitle = styled.h1`
    font-family: Arial, Helvetica, sans-serif;
    width: 80%;
    text-align: center;
    color: green;
`;

export const InputField = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin: 10px 0px;
`;

export const UpdateBtn = styled.button`
    background-color: #000;
    color: #fff;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    width: 100px;
    align-self: center;
`;
