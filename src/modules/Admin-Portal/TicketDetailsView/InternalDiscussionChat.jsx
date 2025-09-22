import React, { useState } from 'react';
import styled from 'styled-components';


import { IoSend } from "react-icons/io5";
import { IoMdAttach } from "react-icons/io";
import { IoIosRemove } from "react-icons/io";
import { updateTableData } from '../../../utils/CheckAndExecuteFlows/CRUDoperations';

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

const AttachmentBtn = styled.input`
  padding: 5px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  cursor: pointer;
  display: none;
`

const AttachmentLabel = styled.label`
  cursor: pointer;
`

const AttachmentRemoveBtn = styled.button`
  height: fit-content;
  width: fit-content;
  padding: 0px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  cursor: pointer;
  background-color: red;
  color: #fff;
  border: none;
  position: relative;
  transform: translate(30%, -30%);
`

const ImageContainer = styled.div`
  background-image: url(${({ showAttachment }) => showAttachment ? showAttachment : 'none'});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: flex-end;
  box-shadow: 0px 0px 4px 1px #ccc;
  border-radius: 8px;
`

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

const InternalDiscussionPage = ({ details, updateTicket, user }) => {
  const [messageInput, setMessageInput] = useState('');
  const [attachment, setAttachment] = useState(null)
  const [showAttachment, setShowAttachment] = useState(null)

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim() || attachment !== null) {
      updateTicket({
        ...details,
        internal_notes: [...details.internal_notes, attachment !== null ? { attachmentName: attachment.name } : { text: messageInput, isUser: true }]
      });

      updateTableData('ticket', details.id, {
        internal_notes: [...details.internal_notes, attachment !== null ? { attachmentName: attachment.name } : { text: messageInput, isUser: true }]
      }, 'Ticket Detailed View [Admin]', window.location.href);
      setMessageInput('');
    }
  };

  const updatePrivateCahat = async () => {
    await updateTableData('ticket', details.id, {
      internal_notes: [...details.internal_notes, { text: messageInput, isUser: false }]
    }, 'Intenal Nodes [Admin]', window.location.href)
  }

  const updateAttachment = (e) => {
    const file = e.target.files[0]
    setAttachment(file)

    if (file && file.type === 'text/plain' || file.type.startsWith('image/')) {
      const reader = new FileReader()

      reader.onloadend = () => {
        setShowAttachment(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setShowAttachment(null)
    }
  }

  // console.log(showAttachment ? showAttachment : null)

  // console.log(attachment)

  return (
    <ChatContainer style={{ width: user ? '100%' : '40%' }}>
      {details.internal_notes !== null && details.internal_notes.length > 0 ?
        <ChatBox>
          {details.internal_notes.map((message, index) => (
            <Message key={index} isUser={message.isUser}>
              {message.text}
            </Message>
          ))}
        </ChatBox>
        : null}

      <Form onSubmit={user ? updatePrivateCahat : handleSendMessage}>
        <AttachmentBtn type="file" id='attachment_btn' value={''} onChange={updateAttachment} />

        <AttachmentLabel htmlFor='attachment_btn'>
          <IoMdAttach size={20} />
        </AttachmentLabel>

        {attachment ?
          <div style={{ width: '100%' }} >
            {attachment.type.startsWith('image/') ?
              <ImageContainer showAttachment={showAttachment}>
                <AttachmentRemoveBtn type='button' title='Remove' onClick={() => {
                  setAttachment(null)
                  setShowAttachment(null)
                }}>
                  <IoIosRemove size={20} />
                </AttachmentRemoveBtn>
              </ImageContainer>

              : null}
            <p>{attachment && attachment.name}</p>
            {/* } */}
          </div>
          :
          <Input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type your Note..."
          />}

        <SendButton type="submit">
          <IoSend size={15} />
        </SendButton>
      </Form>
    </ChatContainer>
  );
};

export default InternalDiscussionPage;
