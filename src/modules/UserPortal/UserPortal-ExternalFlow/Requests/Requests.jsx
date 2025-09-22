import { useState } from 'react'

import { v4 as uuid } from 'uuid'

import { IoClose } from "react-icons/io5";
import { BsCheckCircleFill } from "react-icons/bs";

import {
    AddFileContainer,
    AddFileInput,
    CloseBtn,
    CustomInput,
    CustomInputField,
    CustomLabel,
    CustomOption,
    CustomSelect,
    CustomSpan,
    CustomTextfield,
    ErrMsg,
    PopupContainer,
    RequestsContainer,
    SubmitBtn,
    TicketStatusText,

} from './StyledComponents'

export default function Requests() {
    const [TicketStatus, setTicketStatus] = useState(false)
    const [openPopup, setOpenPopup] = useState(false)
    const [name, setName] = useState('')
    const [onBehalfOf, setOnBehalfOf] = useState('')
    const [category, setCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [shortDescription, setShortDescription] = useState('')
    const [description, setDescription] = useState('')
    const [attachment, addAttachment] = useState(null)
    const [showErrMsg, setShowErrMsg] = useState(false)
    const showErr = () => setShowErrMsg(true)

    const closeTicketStatusPopup = () => {
        setTimeout(() => {
            setTicketStatus(false)
            closePopup()
        }, 3000)
    }

    const onSetTicketStatus = () => {
        setShowErrMsg(false)
        setTimeout(() => {
            setTicketStatus(true)
            onOpenPopup()
            closeTicketStatusPopup()
        }, 1000)
    }

    const onOpenPopup = () => setOpenPopup(true)

    const closePopup = () => setOpenPopup(false)

    const onSetName = event => setName(event.target.value)

    const onSetOnBehalfOf = event => setOnBehalfOf(event.target.value)

    const onSetCategory = event => setCategory(event.target.value)

    const onSetSubCategory = event => setSubCategory(event.target.value)

    const onSetShortDescription = event => setShortDescription(event.target.value)

    const onSetDescription = event => setDescription(event.target.value)

    const onSetAttachments = event => addAttachment(event.target.files)

    const onSubmitRequest = (event) => {
        event.preventDefault()
        // console.log(name !== '' && onBehalfOf!== ''&&category!==''&&subCategory!==''&&shortDescription!==''&&description!==''&&attachment!==null)
        if (name !== '' && onBehalfOf !== '' && category !== '' && subCategory !== '' && shortDescription !== '' && description !== '' && attachment !== null && TicketStatus === false) {
            onSetTicketStatus()
            const ticketDetails = {
                name,
                onBehalfOf,
                category,
                subCategory,
                shortDescription,
                description,
                attachment,
            }

            console.log(ticketDetails)

            setName('')
            setOnBehalfOf('')
            setCategory('')
            setSubCategory('')
            setShortDescription('')
            setDescription('')
            onSetAttachments('')
        } else {
            showErr()
        }
    }

    return (
        <RequestsContainer onSubmit={onSubmitRequest}>
            <CustomInputField>
                <CustomLabel htmlFor='name'>Name </CustomLabel>
                <CustomInput onChange={onSetName} type='text' id='name' placeholder='Name... ' value={name} />
            </CustomInputField>
            <CustomInputField>
                <CustomLabel htmlFor='on-behalf-of'>On Behalf Of </CustomLabel>
                <CustomInput onChange={onSetOnBehalfOf} type='text' id='on-behalf-of' placeholder='Placeholder' value={onBehalfOf} />
            </CustomInputField>

            <CustomInputField>
                <CustomLabel htmlFor='category' placeholder='Category' >Category </CustomLabel>
                <CustomSelect onChange={onSetCategory} value={category}>
                    <CustomOption selected>-- select --</CustomOption>
                    <CustomOption>Technical</CustomOption>
                    <CustomOption>HR</CustomOption>
                    <CustomOption>Pay role</CustomOption>
                </CustomSelect>
            </CustomInputField>
            <CustomInputField>
                <CustomLabel htmlFor='sub-category' placeholder='Sub Category' >Sub Category </CustomLabel>
                <CustomSelect id='sub-category' onChange={onSetSubCategory} value={subCategory}>
                    <CustomOption selected>-- select --</CustomOption>
                    <CustomOption>Technical</CustomOption>
                    <CustomOption>HR</CustomOption>
                    <CustomOption>Pay role</CustomOption>
                </CustomSelect>
            </CustomInputField>

            <CustomInputField>
                <CustomLabel htmlFor='short-description'>Short Description </CustomLabel>
                <CustomInput onChange={onSetShortDescription} type='text' id='short-description' placeholder='Short Description' value={shortDescription} />
            </CustomInputField>
            <CustomInputField>
                <CustomLabel htmlFor='description'>Description </CustomLabel>
                <CustomTextfield onChange={onSetDescription} cols='40' rows='5' id='description' placeholder='Description' value={description}></CustomTextfield>
            </CustomInputField>

            <CustomInputField >
                <CustomLabel htmlFor='attachment'>Attachment </CustomLabel>
                <AddFileContainer>
                    <AddFileInput htmlFor='attachment'>Add File</AddFileInput>
                    <CustomSpan><input onChange={onSetAttachments} style={{ display: 'none' }} type="file" id="attachment" name="text file upload" accept=".txt" /> file name.txt</CustomSpan>
                </AddFileContainer>
            </CustomInputField>

            <SubmitBtn type='submit' >Submit</SubmitBtn>

            {showErrMsg ? (<ErrMsg>*Please fill all the required Fields</ErrMsg>) : null}

            <PopupContainer id="popup" opened={openPopup}>
                <TicketStatusText success={TicketStatus}>
                    <BsCheckCircleFill />
                    Ticket #{uuid()} has been created successfully!
                    <CloseBtn onClick={closePopup}><IoClose /> </CloseBtn>
                </TicketStatusText>
            </PopupContainer>
        </RequestsContainer>
    )
}