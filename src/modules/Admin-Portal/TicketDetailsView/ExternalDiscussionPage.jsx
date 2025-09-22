import React, { useState } from 'react';
import styled from 'styled-components';


import { IoSend } from "react-icons/io5";

// Styled components
const ChatContainer = styled.div`
  width: fit-content;
  flex-grow: 1;
  margin-left: 2%;
  padding: 5px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const ChatBox = styled.div`
  max-height: 300px;
  overflow-y: auto;
  padding: 5px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  /* margin-bottom: 20px; */
`;

const Message = styled.div`
  background-color: ${(props) => (props.isUser ? '#daf8da' : '#e8e8e8')};
  padding: 5px 10px;
  border-radius: 0px 8px 8px 0px;
  margin-bottom: 10px;
  max-width: 70%;
  align-self: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Input = styled.input`
  flex: 1;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 40px;
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const SendButton = styled.button`
  padding: 8px;
  background-color: transparent;
  color: #007bff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;

  &:hover {
    color: #fff;
    background-color: #0056b3;
  }
`;

const ExternalDiscussionPage = ({ details, updateTicket }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      updateTicket({
        ...details,
        external_notes: [...details.external_notes, { text: messageInput, isUser: true }]
      });
      setMessageInput('');
    }
  };

  // console.log(details.internal_notes)

  return (
    <ChatContainer>

      {details.external_notes.length > 0 ?
        <ChatBox>
          {details.external_notes.map((message, index) => (
            <Message key={index} isUser={message.isUser}>
              {message.text}
            </Message>
          ))}

        </ChatBox>
        : null}

      <Form onSubmit={handleSendMessage}>
        <Input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your Note..."
        />
        <SendButton type="submit">
          <IoSend size={15} />
        </SendButton>
      </Form>
    </ChatContainer>
  );
};

export default ExternalDiscussionPage;
