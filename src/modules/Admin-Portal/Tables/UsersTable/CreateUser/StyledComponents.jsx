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

export const AdditionalDetailsContainer = styled.div`
    width: 100%;
    height: fit-content;
    background-color: #c7ffc4;
    display: flex;
    flex-direction: column;
    padding: 3%;
`;

export const AdditionalHeading = styled.h2`
    font-size: x-large;
    text-align: left;
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

export const CreateTableContainer = styled.div`
    width: fit-content;
    height: 100%;
    flex-grow: 1;
    background-color: #fff;
    font-family: Arial, Helvetica, sans-serif;
    overflow-y: auto;
    background-color: #fff;
`;

export const CreateUserDetailsContainer = styled.div`
    width: 100vw;
    display: flex;
    height: 93vh;
    margin-top: 7vh;
    background-color: #fff;
`;

export const CustomContainer = styled.div`
    width: 83vw;
    flex-grow: 1;
    height: 93vh;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    background-color: #e5e5e5;
`;

export const CustomInput = styled.input`
    min-width: 170px;
    max-width: fit-content;
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
    width: 20%;
    text-align: right;
`;

export const CustomOption = styled.option`
    font-size: 12px;
`;

export const CustomSelect = styled.select`
    background-color: #fff;
    color: #000;
    min-width: 170px;
    max-width: fit-content;
    height: 100%;
    padding: 5px;
    border-radius: 5px;
    outline: none;
    border: 1px solid #6e6f70;
    font-size: 12px;
`;

export const CustomSpan = styled.span`
    margin-left: 10px;
    font-size: 12px;
    height: 100%;
    width: fit-content;
`;

export const FormTitle = styled.h1`
    font-family: Arial, Helvetica, sans-serif;
    width: 20%;
    text-align: right;
    font-size: 2.5rem;
    color: green;
    padding: 0px;
    margin: 0px 0px 0px 0px;
`;

export const InputField = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin: 10px 0px;
`;

export const InputsCon = styled.div`
    display: flex;
    flex-direction: column;
    height: 90%;
    overflow: auto;

    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
`;

export const Output = styled.div`
    font-size: 12px;
    margin-left: 10px;
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

export const UserForm = styled.form`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: #fff;
`;

export const UserFormDetailsContainer = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 15px;
    /* overflow: hidden; */
    background-color: #fff;
    padding: 15px;
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