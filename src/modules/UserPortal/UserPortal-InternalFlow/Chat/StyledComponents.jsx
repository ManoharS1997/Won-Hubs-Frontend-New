import styled from 'styled-components';

export const ChatBody = styled.div`
    padding: 3px;
    height: 200px;
    overflow-y: scroll;

    /* Webkit browsers (Chrome, Safari) */
    &::-webkit-scrollbar {
        width: 5px; /* Set the width of the scrollbar */
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background-color: #808080; /* Color of the scrollbar handle */
        border-radius: 4px; /* Rounded corners of the handle */
    }

    /* Track */
    &::-webkit-scrollbar-track {
        background-color: #f1f1f1; /* Color of the scrollbar track */
    }
`;

export const ChatCloseBtn = styled.button`
    height: fit-content;
    width: fit-content;
    padding: 0;
    margin: 0;
    color: #e5383b;
    border: none;
    outline: none;
    background-color: transparent;
`;

export const ChatFooter = styled.div`
    display: flex;
    padding: 10px;
`;

export const ChatHeader = styled.div`
    padding: 7px;
    background-color: #343a40;
    color: white;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px 8px 0px 0px;
    outline: none;
`;

export const ChatIcon = styled.div`
    position: fixed;
    bottom: 40px;
    right: 50px;
    cursor: pointer;
    background-color: transparent;
    color: #000;
    width: 35px;
    height: 35px;
`;

export const ChatPopup = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 310px;
    background-color: #f1f1f1;
    border: 1px solid #343a40;
    border-radius: 8px;
`;

export const DefaultMsg = styled.div`
    background-color: #403d39;
    color: white;
    padding: 1px 1px 1px 10px;
    height: fit-content;
    min-width: 70px;
    width: max;
    border-radius: 12px;
    font-size: 12px;
    text-align: center;
    display: block;
    clear: both; //Clear the float property
    margin-right: auto; //Push OtherMessage to the left side
`;

export const Input = styled.input`
    flex: 1;
    padding: 5px;
    border-radius: 8px;
    border: 1px solid #353535;
`;

export const MainContainer = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 310px;
    background-color: transparent;
    border-radius: 8px;
    z-index: 999; // Ensure the chat popup is on top of other elements
    max-height: 80vh; // Set a maximum height for the chat popup

    @media screen and (max-width: 600px) {
        width: 100%;
        right: 0;
        bottom: 0;
        border-radius: 0;
    }
`;

export const MessageContainer = styled.div`
    padding: 8px;
    margin: 5px;
    border-radius: 10px;
    border: none;
    outline: none;
`;

export const OtherMessage = styled.div`
    background-color: #403d39;
    color: white;
    padding: 1px 5px 1px 5px;
    min-width: 22px;
    width: fit-content;
    border-radius: 11px;
    display: block; 
    clear: both;
    margin-right: auto; 
    font-size: 12px;
    height: fit-content;
`;

export const SendButton = styled.button`
    padding: 5px 10px;
    margin-left: 10px;
    background-color: #8a817c;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    border-radius: 8px;
`;

export const UserMessage = styled.div`
    background-color: #8a4fff;
    color: white;
    padding: 1px 5px 1px 5px;
    min-width: 22px;
    width: fit-content;
    border-radius: 11px;
    display: block; 
    clear: both; 
    margin-left: auto; 
    font-size: 12px;
    height: fit-content;
`;