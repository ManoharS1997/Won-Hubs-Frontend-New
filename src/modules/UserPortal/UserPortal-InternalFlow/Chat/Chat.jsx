import { useState } from 'react';

import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

import {
    ChatBody,
    ChatCloseBtn,
    ChatFooter,
    ChatHeader,
    ChatIcon,
    ChatPopup,
    DefaultMsg,
    Input,
    MainContainer,
    OtherMessage,
    SendButton,
    UserMessage
} from './StyledComponents'

const Message = ({ text, sender }) => {
    {
        sender === 'user' ? <UserMessage>{text}</UserMessage> :
        <OtherMessage>{text}</OtherMessage>
    }
};

const ChatBot = () => {
    const [isChatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [defaultMsgOption, setDefaultMsg] = useState('')
    const [Questions, setQuestions] = useState({
        Request: { 'E mail ?': '', 'Mobile No ?': '', 'Name ?': '', 'Department ?': '', 'Sub-Department ?': '' },
        Issues: { 'E mail ?': '', 'Mobile No ?': '', 'Name': '', 'Department': '', 'Sub-Department': '' },
        Query: { 'E mail ?': '', 'Mobile No ?': '', 'Name': '', 'Department': '', 'Sub-Department': '' },
        Others: []
    })
    const [QuestionIndex, setQuestionIndex] = useState(0)
    const [currentKey, setCurrentKey] = useState('')

    const toggleChat = () => setChatOpen(!isChatOpen)

    const HandleDefaultMsgSelection = (e) => {
        setDefaultMsg(e.target.id)
        console.log(e.target.id)
    }

    const HandleQuestions = () => {
        const keys = Object.keys(Questions[defaultMsgOption]);
        const Q = keys[QuestionIndex];

        return (
            <OtherMessage>{Q}</OtherMessage>
        );
    };

    //assaign ans to questions 
    const UpdateQuestionsWithAns = (newMessage) => {
        setQuestions((prevQuestions) => ({
            ...prevQuestions,
            [defaultMsgOption]: {
                ...prevQuestions[defaultMsgOption],
                [currentKey]: newMessage
            }
        }));
    }
    const handleInputChange = (e) => setNewMessage(e.target.value)

    const handleSend = () => {
        const keys = Object.keys(Questions[defaultMsgOption]);
        const Q = keys[QuestionIndex];
        console.log(messages)

        if (newMessage.trim() === '') return;

        let isValid = true;

        // Validate email if the question is about email
        if (Q.toLowerCase().includes('mail')) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(newMessage.trim());
            if (!isValid) {
                alert('Invalid email format. Please enter a valid email address.');
            }
        }

        // Validate mobile number if the question is about a mobile number
        if (Q.toLowerCase().includes('mobile')) {
            const mobileRegex = /^\d{10}$/;
            isValid = mobileRegex.test(newMessage);
            if (!isValid) {
                alert('Invalid mobile number. Please enter a 10-digit mobile number.');
            }
        }

        if (!isValid) {
            // Do not proceed if the input is not valid
            return;
        }

        setMessages((prevMessages) => [
            ...prevMessages,
            { text: Q, sender: 'bot' },
            { text: newMessage, sender: 'user' }
        ]);

        if (defaultMsgOption !== '') {
            UpdateQuestionsWithAns(newMessage);
            setQuestionIndex(QuestionIndex + 1);
        }

        setNewMessage('');
    };

    return (
        <MainContainer>
            <ChatIcon onClick={toggleChat}>
                <IoChatbubbleEllipsesOutline size={35} />
            </ChatIcon>

            {isChatOpen && (
                <ChatPopup>
                    <ChatHeader>
                        <span>Chat</span>
                        <ChatCloseBtn onClick={toggleChat}><IoClose size={22} /></ChatCloseBtn>
                    </ChatHeader>
                    
                    <ChatBody>
                        <DefaultMsg id='Request' onClick={HandleDefaultMsgSelection}>Request</DefaultMsg>
                        <DefaultMsg id='Issues' onClick={HandleDefaultMsgSelection}>Issue</DefaultMsg>
                        <DefaultMsg id='Query' onClick={HandleDefaultMsgSelection}>Query</DefaultMsg>
                        <DefaultMsg id='Others' onClick={HandleDefaultMsgSelection}>Others</DefaultMsg>

                        {messages.map((message, index) => (
                            <Message key={index} {...message} />
                        ))}

                        {defaultMsgOption !== '' && QuestionIndex < Object.keys(Questions[defaultMsgOption]).length && (
                            <HandleQuestions />
                        )}

                    </ChatBody>
                    
                    <ChatFooter>
                        <Input
                            type="text"
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={handleInputChange}
                        />
                        <SendButton onClick={handleSend}>Send</SendButton>
                    </ChatFooter>
                </ChatPopup>
            )}
        </MainContainer>
    );
};

export default ChatBot;