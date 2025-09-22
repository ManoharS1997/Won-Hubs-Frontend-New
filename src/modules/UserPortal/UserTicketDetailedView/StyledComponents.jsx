import styled from "styled-components";

export const TicketDetailsContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin: 0px;
    background-color: #fff;
`
export const BodyContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    border-radius: 0px !important;
`
export const CustomContainer = styled.div`
    width: fit-content;
    height: 100%;
    flex-grow: 1;
    padding: 10px;
    background-color: #e5e5e5;
`
export const HeadContainer = styled.div`
    height: 5%;
    width: 100%;
    display: flex;
    align-items: center;
    /* border: 1px solid; */
`
export const BackBtn = styled.button`
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    background: transparent;
    margin: 0px;
    padding: 0px;
    border: none;
`
export const ContentContainer = styled.div`
    height: 100%;
    width: 100%;
    border-radius: 10px;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ccc;

`
export const FlexContainer = styled.div`
    height: 88%;
    width: 100%;
    display: flex;
    margin-top: 2%;
    padding: 10px;
`
export const FormContainer = styled.div`
    height: 100%;
    width: 70%;
    /* border: 1px solid red; */
`
export const FieldContainer = styled.div`
    height: fit-content;
    width: 100%;
    margin: 9px;
    display: flex;
    align-items: center;

    /* border: 1px solid; */
`
export const Label = styled.label`
    width: 30%;
    text-align: right;
    padding-right: 10px;
`
export const InputTag = styled.input`
    width: 65%;
    height: 30px;
    border-radius: 5px;
    padding: 10px;
    border: 1px solid #ccc;
`
export const TextAreaTag = styled.textarea`
    width: 65%;
    min-height: 80px;
    max-height: 80px;
    border-radius: 5px;
    padding: 2px 2px 2px 5px;
    border: 1px solid #ccc;
`
export const TicketHistoryContainer = styled.div`
    width: 30%;
    height: fit-content;
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    /* align-items: center; */
    position: relative;
    align-self: flex-end;
    margin-bottom: 10%;

    /* border: 1px solid red; */
`
export const TicketConvo = styled.div`
    height: 85%;
    width: 90%;
    border-radius: 15px;
    margin: 8px 0px 0px 0px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    border: 2px solid #ccc;
`
export const InputContainer = styled.div`
    /* position: absolute; */
    height: 7%;
    width: 100%;
    bottom: 0px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
`
export const SendBtn = styled.button`
    background: transparent;
    height: 90%;
    width: 10%;
    padding: 0px;
    border:none;
`
export const UpdateBtn = styled.button`
    position: absolute;
    bottom: 10%;
    right: 10%;
    height: 30px;
    width: 100px;
    background: #4361ee;
    padding: 0px;
`
export const Container = styled.div`
    display: flex;
    justify-content: center;
    height: 7%;
    width: 50%;
    padding: 0px;
    margin: 0px;
    /* border: 1px solid red; */
`;
export const StepContainer = styled.div`
    /* flex: 1; */
    height: 45px;
    width: 25%;
    padding: 0px 0px 15px 0px;
    margin: 0px;
    text-align: center;
    cursor: pointer;
    background-color: #fff;
    color: ${props => props.active ? '#fff' : '#000'};
    /* border: 1px solid red; */
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
`;
export const Circle = styled.div`
    height: 30px;
    width: 30px;
    background-color: ${props => props.active ? '#007bff' : '#ced4da'};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px;
    transition: background-color 8.3s ease; /* Added transition */
`;
export const Line = styled.div`
    background: ${props => props.active ? 'green' : '#adb5bd'};
    height: 2px;
    width: 76%;
    margin-left: 2px;
    position: relative;
    transition: width 8.3s ease, background 8.3s ease; /* Added transition */
    
`;
export const Span = styled.span`
    color: #000;
    position: absolute;
    bottom: 0px;
    left: 2px;
    font-size: 10px;

    /* border: 1px solid; */
`
export const OnHold = styled.span`
    position: absolute;
    color: red;
    right: 45%;
    top: 5px;

    /* background: red; */
`
export const ChatContainer = styled.div`
    height: 93%;
    width: 100%;
    display: flex;
    flex-direction: column;
    /* border: 1px solid red; */
`
export const Receriver = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    margin: 5px 0px 5px 0px; 
    
    /* border: 1px solid red; */
`
export const Sender = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin: 5px 0px 5px 0px;
`
export const SenderMessage = styled.p`
    background: #a4c3b2;
    padding: 5px;
    margin: 0px;
    min-width: fit-content;
    max-width: 95%;
    height: fit-content;
    border-radius: 10px 10px 0px 10px;
    color: #fff;
`
export const ReceiverMessage = styled.p`
    background: #6c757d;
    padding: 5px;
    margin: 0px;
    min-width: fit-content;
    max-width: 95%;
    height: fit-content; 
    border-radius: 0px 10px 10px 10px;
    color: #fff;
`