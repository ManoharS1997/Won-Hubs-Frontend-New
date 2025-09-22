import styled from "styled-components";

export const BackBtn = styled.button`
    border-radius: 8px;
    height: 30px;
    width: 30px;
    padding: 0;
    outline: none;
    display: flex;
    justify-content: left;
    align-items: center;
    background-color: transparent;
    margin-right: 10px;
    color: #353535;
`;

export const Btn = styled.button`
    margin-left: 2px;
    margin-right: 2px;
    color: #000;
    border: 2px solid #ccc;
    text-align: center;
    height: 30px;
    width: fit-content;
    background-color: #fff;
    padding: 6px 10px 10px 10px;
`;

export const BtnGroup = styled.button`
    color: #4085f5;
    margin: 20px 5px 3px 3px;
`;

export const Button = styled.button`
    height: auto;
    width: auto;
    margin: 3px;
    background-color: #fff;
`;

export const CustomContainer = styled.div`
    width: 100%;
    flex-grow: 1;
    height: 93vh;
    overflow-y: auto;
    padding: 0.5rem;
    background-color: #e5e5e5;
`;

export const CustomViewContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const FormContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 10px;
    border-radius: 15px;
    min-height: 87vh;
`;

export const GroupBtnsCon = styled.div`
    display: flex;
`;

export const GroupRelatedRecordsCon = styled.div`
    width: 100%;
`;

export const GroupTableForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-top: 5px;
`;

export const HeaderContainer = styled.h1`
    display: flex;
    align-items: center;
    margin: 0px 0px 2px 0px;
`;

export const HeaderTag = styled.h1`
    font-size: 24px;
    margin: 0;
`;

export const Heading = styled.h1`
    border: 1px solid;
`;

export const Input = styled.input`
    width: 95%;
    border-radius: 3px;
    flex-grow: 1;
    border-style: none;
    padding: 4px;
    background: #fff;
`;

export const InputAndIconCon = styled.div`
    width: 40%;
    height: fit-content;
    border: 2px solid #ccc;
    display: flex;
    justify-content: space-between;
    border-radius: 4px;
`;

export const InputCon = styled.div`
    margin: 5px;
    width: 100%;
    display: flex;
    align-items: center;
`;

export const Label = styled.label`
    width: 20%;
    text-align: right;
    margin-right: 20px;
`;

export const OptionTag = styled.option`
    margin-top: 50px;
    padding: 10px;
`;

export const SaveUpdateCon = styled.div`
    width: 30%;
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
`;

export const SelectTag = styled.select`
    width: 40%;
    padding: 4px;
    border-radius: 5px;
    border: 2px solid #ccc;
`;

export const SideNavAndContentContainer = styled.div`
    width: 100%;
    height: fit-content;
    background-color: #e5e5e5;
    display: flex;
`;

export const TextArea = styled.textarea`
    width: 100%;
    border-radius: 4px;
    border: none;
    padding: 4px;
    background: #fff;
`;
