import { useState } from 'react';
import emailjs from '@emailjs/browser';

import WonContext from '../../../../context/WonContext';

import Modal from 'react-modal'

//ICON IMPORTS
import { CgClose } from "react-icons/cg";
import { HiUpload } from "react-icons/hi";


import {
  BodyContainer,
  BtnsContainer,
  CancelBtn,
  CloseBtn,
  FootarContainer,
  FormContainer,
  HeaderContainer,
  Heading,
  InputContainer,
  InputTag,
  LabelTag,
  SendBtn,
  TextAreaTag,
  UploadBtn
} from '../StyledComponents'


const EmailModel = () => {
  const [formData, setFormData] = useState({ fromEmail: '', Toemail: '', Cc: '', subject: '', Body: '', selected: '', Name: '' })

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '15px',
      display: 'flex',
      padding: '10px'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', /* Adjust the last value (0.5) for transparency */
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevValues) => ({ ...prevValues, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault()

    const serviceId = 'service_b9ddi88';
    const templateId = 'template_xoh3wuk'
    const publicKey = 'S591V-RZwJFAYplMD'

    const templateParams = {
      from_name: formData.Name,
      from_email: formData.fromEmail,
      to_name: 'won testing Team',
      message: formData.Body
    }
    // Add your email submission logic here
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        alert("Email Sent Successfully!")
        console.log('Email sent successfully!', response);
        setFormData({ fromEmail: '', Toemail: '', Cc: '', subject: '', Body: '', selected: '', Name: '' })
      })
      .catch((error) => {
        console.log('Error sending  email:', error)
      })
  };



  return (
    <WonContext.Consumer>
      {value => {
        const { sendMail, setOpenMail } = value
        return (
          <Modal style={customStyles} isOpen={sendMail}>
            <form onSubmit={handleSubmit}>
              <FormContainer >
                <HeaderContainer>
                  <Heading >Send Email</Heading>
                  <CloseBtn onClick={setOpenMail} ><CgClose size={18} /></CloseBtn>
                </HeaderContainer>


                <InputContainer >
                  <LabelTag >Name:</LabelTag>
                  <InputTag type='text' onChange={handleInputChange} name='Name' value={formData.Name} />
                </InputContainer>

                <BodyContainer>

                  <InputContainer>
                    <LabelTag>From :</LabelTag>
                    <InputTag type='email' onChange={handleInputChange} name='fromEmail' value={formData.fromEmail} />
                  </InputContainer>

                  <TextAreaTag onChange={handleInputChange} name='Body' value={formData.Body} rows="5" />
                </BodyContainer>

                <FootarContainer >
                  <UploadBtn >
                    <label htmlFor="upload" className="ui icon button custom-label" style={{ padding: '2px', backgroundColor: '#fff', color: '#000', margin: '0px' }}>
                      <HiUpload size={16} /> Upload
                    </label>
                    <InputTag
                      id="upload"
                      type="file"
                      name="attachment"
                      onChange={handleInputChange}
                      style={{ display: 'none' }}
                    />
                  </UploadBtn>

                  <BtnsContainer >
                    <CancelBtn onClick={setOpenMail}>cancel</CancelBtn>
                    <SendBtn type='submit'>send</SendBtn>
                  </BtnsContainer>
                </FootarContainer>
              </FormContainer>
            </form>
          </Modal>
        )
      }}
    </WonContext.Consumer>
  );
};

export default EmailModel;