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
    border: none;
`;

export const Btn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    border: 2px solid #fcd5ce;
    text-align: center;
    height: 30px;
    width: fit-content;
    background: #fff;
    cursor: pointer;
`;

export const BtnGroup = styled.button`
    color: #4085f5;
    margin: 20px 5px 3px 3px;
`;

export const CreateGroupTableContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin:0;
    padding: 0;
`;

export const CustomSelect = styled.select`
    width: 30%;
    border: 1px solid #ccc;
`

export const FormContent = styled.div`
    border-radius: 15px;
    padding: 0.5rem;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    overflow:auto;
`;

export const GroupBtnsCon = styled.div`
    display: flex;
`;

export const GroupRecordsBtn = styled.button`
    border-bottom: 1px solid;
    border-radius: 5px;
    padding: 10px;
    position: relative;
    outline: none;
    width: 180px;
    cursor: pointer;
    background-color: #fff;
    color: #000;
    border-style: none;
    font-weight: 600;
    border-radius: 0;
    border-bottom: ${(props) => props.isactive === 'true' ? '2px solid #0c0d0d ' : '2px solid #969E97 '};
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        background-color: #f0f0f0;
        border-bottom: ${(props) => props.isactive === 'true' ? '2px solid #0c0d0d ' : '2px solid #969E97 '};
        cursor: pointer;
    }
`;

export const GroupRelatedRecordsCon = styled.div`
    width: 100%;
`;

export const GroupTableCon = styled.div`
    width: 100%;
    height: 93vh;
    overflow-y: auto;
    
    background-color: #e5e5e5;
`;

export const GroupTableForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction :column;
    gap: 1rem;
`;

export const HeaderContainer = styled.h1`
    display: flex;
    align-items: center;
`;

export const HeaderTag = styled.h1`
    font-size: 24px;
    margin: 0;
`;

export const Input = styled.input`
    width: 60%;
    border-radius: 3px;
    flex-grow: 1;
    border: 1px solid #ccc;
    background-color: #fff;
`;

export const InputCon = styled.div`
    margin: 5px;
    width: 50%;
    display: flex;
    align-items: center;
`;

export const Label = styled.label`
    width: 30%;
    text-align: right;
    margin-right: 20px;
    color: #000;
    font-weight: 500;
`;

export const SaveUpdateCon = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SideNavAndContentContainer = styled.div`
    width: 100vw;
    height: 93vh;
    /* background-color: #e5e5e5; */
    display: flex;
    margin-top: 7vh;
`;

export const TextArea = styled.textarea`
    width: 60%;
    border-radius: 4px;
    flex-grow: 1;
    padding: 5px;
    background-color: #fff;
    border: 1px solid #ccc;
`;

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