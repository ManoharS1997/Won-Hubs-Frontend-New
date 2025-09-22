import styled from "styled-components";

export const BackBtn = styled.button`
    height: 30px;
    width: 30px;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: left;
    align-items: center;
    background-color: transparent;
    margin-right: 10px;
    color: #000;
    border: none;
`;

export const BtnsCon = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 40px;
    margin-right: 20px;
`;

export const CreateLocationsContainer = styled.div`
    width: 100%;
    flex-grow: 1;
    height: 90vh;
    overflow-y: auto;
    padding: 10px;
    background-color: #e5e5e5;
`;

export const DeleteBtn = styled.button`
    margin-left: 2px;
    margin-right: 2px;
    background-color: #e5383b;
    color: #ffffff;
    height: 30px;
    width: fit-content;
    padding: 6px 10px 10px 10px;
    text-align: center;
`;

export const FieldsCon = styled.form`
    margin-top: 1%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: fit-content;
    flex-grow: 1;
    overflow-y: auto;
`;

export const FormContent = styled.div`
    border-radius: 15px;
    padding: 15px;
    background-color: #ffffff;
`;

export const HeaderNBtnCon = styled.div`
    height: fit-content;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    border-radius: 5px;
`;

export const HeaderTag = styled.h1`
    font-weight: bold;
    font-size: 20px;
    text-align: center;
    padding: 0;
    margin: 0;
`;

export const Heading = styled.div`
    display: flex;
    align-items: center;
`;

export const Input = styled.input`
    width: 30%;
    border-radius: 3px;
    border: 2px solid #ccc;
    background-color: #fff;
`;

export const InputCon = styled.div`
    display: flex;
    margin: 5px;
    height: 30px;
    width: auto;
    flex-grow: 1;
`;

export const Label = styled.label`
    width: 20%;
    text-align: right;
    margin-right: 20px;
`;

export const SaveBtn = styled.button`
    margin-left: 2px;
    margin-right: 2px;
    color: #000;
    border: 2px solid #fcd5ce;
    height: 30px;
    width: fit-content;
    padding: 6px 10px 10px 10px;
    text-align: center;
    background-color: inherit;
    color: #000;
`;

export const SideNavNContentContainer = styled.div`
    width: 100vw;
    height: 93vh;
    background-color: #e5e5e5;
    display: flex;
    margin-top: 7vh;
`;

export const UpdateAndSaveBtns = styled.div`
`;

export const UpdateBtn = styled.button`
    margin-left: 2px;
    margin-right: 2px;
    color: #000;
    border: 2px solid #fcd5ce;
    text-align: center;
    height: 30px;
    width: fit-content;
    background-color: #fff;
    padding: 6px 10px 10px 10px;
`;

export const CustomViewContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;