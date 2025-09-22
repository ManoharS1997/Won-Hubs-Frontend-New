import { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import LeftNav from '../../LeftNav/pages/LeftNav'
import axios from 'axios';

import WonContext from '../../../../context/WonContext'
import Chatbot from '../Chat/Chat'
import { ArticlesContent2 as ArticlesContent } from '../../../../DataFile/DefaultDataFile'
import { createNewRecordInTable } from '../../../../utils/CheckAndExecuteFlows/CRUDoperations'
import { useNavigate } from 'react-router-dom';

import { IoClose } from "react-icons/io5";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { PiShoppingCartLight } from "react-icons/pi";
import { RiSendPlaneFill } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import { RiArrowDownSLine } from "react-icons/ri";
import { MdCurrencyRupee } from "react-icons/md";

import {
    AddFileContainer, AddFileInput, ArticlesContainer, BackBtn,
    Btn, ButtonsContainer, Card, Cards, CheckOutContainer, CloseBtn,
    ContentContainer, CustomContainer, CustomInput, CustomInputField,
    CustomLabel, CustomOption, CustomSelect, CustomSpan, CustomTextfield,
    ErrMsg, Fields, FormTitle, ImgTag, MainContainer, OrderBtnsContainer,
    PTag, PopupContainer, QuantityBtns, QuantityContainer, RequestsContainer,
    ScheduleBtnContainer, ScheduleDropdownContainer, SpanTag, TemplateContainer,
    TicketContainer, TicketForm, TicketStatusText, Topcon
} from './StyledComponents'

const NewTicket = {
    name: '',
    // mode: 'user_portal',
    on_behalf_of: '',
    department: '',
    category: '',
    sub_category: '',
    service: '',
    status: '',
    approval_state: 'false',
    short_description: '',
    description: '',
    private_comments: '',
    public_comments: '',
    active: '',
    history: '',
    priority: '',
    requested_email: '',
    state: '',
    assigned_members: '',
    approved_by: '',
    requested_by: '',
    task_type: '',
    attachments: '',
    price_per_unit: '',
    quantity: ''
}

export default function RaiseTicketForm() {
    const { setUserCart } = useContext(WonContext)
    const location = useLocation()
    const navigate = useNavigate();
    const Department = location.state.department
    const Category = location.state.category
    const subCategory = location.state.subCategory

    const originFields = {
        Department: Department,
        Category: Category,
        'Sub Category': subCategory
    }

    const [loading, setLoading] = useState(false);
    const [fieldsData, setFieldsData] = useState()

    const [TicketStatus, setTicketStatus] = useState(false)
    const [openPopup, setOpenPopup] = useState(false)
    const [orderQuantity, setOrderQuantity] = useState(1)
    const [isScheduleBtnsDropDownActive, setScheduleBtnsDropDown] = useState(false)
    const [selectedOrderBtn, setSelectedOrderBtn] = useState('')
    const [price, setPrice] = useState(299)

    const [showErrMsg, setShowErrMsg] = useState(false)

    const [newTicketData, setNewticketData] = useState({
        ...NewTicket,
        department: Department,
        category: Category,
        sub_category: subCategory
    })

    useEffect(() => {                                        //GET THE DATA OF CATALOG FORM OF SPECIFIC DEPARTMENT, CATAGORY AND SUBCATEGORY
        const fetchFields = async () => {
            setLoading(true);
            const url = `${import.meta.env.VITE_HOSTED_API_URL}/raiseTicket/${subCategory}/${Category}/${Department}`
            const options = {
                method: 'GET'
            }

            try {
                const response = await fetch(url, options)
                const data = await response.json()
                setFieldsData(data.fields[0])
            } catch (error) {
                console.error('Error fetching fields:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchFields()

    }, [subCategory, Category, Department])

    const onChangeInputField = (fieldName, value) => {
        const snake_case = fieldName.replace(/ /g, '_')
        setNewticketData((prevState) => ({
            ...prevState,
            [snake_case]: value,
        }))
    }

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

    const getRandomFourDigitNumber = () => Math.floor(1000 + Math.random() * 9000)

    const OnClickQuantity = (type) => {
        if (type === 'plus') {
            setOrderQuantity((prevState) => prevState + 1)
        }
        if (type === 'minus') {
            setOrderQuantity((prevState) => prevState > 1 ? prevState - 1 : prevState)
        }
    }

    const OnAddToCart = () => {
        const ticketDetails = {
            ...newTicketData,
            ticketNo: getRandomFourDigitNumber(),
            service: null,
            status: 'Requested',
            active: 'true',
            requestedEmail: 'testuser@gmail.com',
            pricePerUnit: price,
            Quantity: orderQuantity
        }

        if (
            ticketDetails.name !== '' &&
            ticketDetails.onBehalfOf !== '' &&
            ticketDetails.category !== '' &&
            ticketDetails.subCategory !== '' &&
            ticketDetails.shortDescription !== '' &&
            ticketDetails.description !== '' &&
            ticketDetails.attachments !== null &&
            ticketDetails.status !== ''
        ) {
            setShowErrMsg(false)
            setUserCart(ticketDetails, 'Add')
        } else {
            showErr()
        }
    }

    const OnBack = () => navigate('/user-internal/RaiseTicketDepartment');

    return (
        <WonContext.Consumer>
            {value => {
                const { isChatBotOpen, activeUserData } = value
                const userData = JSON.parse(localStorage.getItem('activeUserData'))

                {/* console.log(userData) */ }
                const onSubmitRequest = async (event) => {
                    event.preventDefault()
                    const ticketDetails = {
                        ...newTicketData,
                        service: null,
                        status: 'Requested',
                        state: 'raised',
                        active: 'true',
                        requested_email: userData.email,
                        price_per_unit: price,
                        quantity: orderQuantity,
                        channel: 'user_portal',
                        priority: '1',
                        flows_stage: [],
                        internal_notes: 'null'
                    }

                    if (
                        ticketDetails.name !== '' &&
                        ticketDetails.on_behalf_of !== '' &&
                        ticketDetails.category !== '' &&
                        ticketDetails.sub_category !== '' &&
                        ticketDetails.short_description !== '' &&
                        ticketDetails.description !== '' &&
                        ticketDetails.attachments !== null &&
                        ticketDetails.status !== ''
                    ) {
                        const pageUrl = window.location.href;
                        const updatedPayload = {}
                        const newFields = (Object.keys(ticketDetails)).filter(item =>
                            item !== 'attachment').map(field => updatedPayload[field] = ticketDetails[field])


                        try {
                            const response = await createNewRecordInTable({ ...updatedPayload, assigned_members: ['8000001'] }, 'ticket', 'Raise A Ticket Form [user-portal]', pageUrl)
                            console.log('ticket posted successfully ', response)
                            onSetTicketStatus()

                        } catch (error) {
                            console.log(error)
                        }

                        setNewticketData({
                            ...NewTicket,
                            department: Department,
                            category: Category,
                            sub_category: subCategory
                        })
                    } else {
                        showErr()
                    }
                }

                return (
                    <MainContainer>
                        <CustomContainer>
                            <ContentContainer>
                                <RequestsContainer >
                                    <Topcon>
                                        <BackBtn onClick={OnBack}>
                                            <IoIosArrowBack size={26} />
                                        </BackBtn>
                                        <FormTitle>Raise a Ticket</FormTitle>

                                        <FormTitle
                                            style={{ marginLeft: '2rem', color: 'gray', fontSize: '1.3rem' }}
                                        >{Department}/{Category}/{subCategory}</FormTitle>
                                    </Topcon>

                                    <TicketContainer>
                                        <TicketForm onSubmit={onSubmitRequest}>
                                            <Fields>
                                                {fieldsData && fieldsData.map((field) => (
                                                    <>
                                                        {field.details.type === 'text' && (originFields[field.details.name] !== undefined ?
                                                            <CustomInputField key={field.id}>
                                                                <CustomLabel htmlFor={field.details.name}> {field.details.name} </CustomLabel>
                                                                <CustomInput
                                                                    readOnly
                                                                    type='text'
                                                                    id={field.details.name}
                                                                    placeholder={field.details.placeholder}
                                                                    value={originFields[field.details.name]}
                                                                />
                                                            </CustomInputField>

                                                            : <CustomInputField key={field.id}>
                                                                <CustomLabel htmlFor={field.details.name}> {field.details.name} </CustomLabel>

                                                                <CustomInput
                                                                    onChange={(e) => { onChangeInputField(field.details.name.toLowerCase(), e.target.value) }}
                                                                    type='text'
                                                                    id={field.details.name}
                                                                    placeholder={field.details.placeholder}
                                                                    value={newTicketData[field.details.name.toLowerCase()]}
                                                                />
                                                            </CustomInputField>
                                                        )}

                                                        {field.details.type === 'select' && (
                                                            <CustomInputField>
                                                                <CustomLabel htmlFor={field.details.name}> {field.details.name} </CustomLabel>
                                                                <CustomSelect
                                                                    onChange={(e) => { onChangeInputField(field.details.name.toLowerCase(), e.target.value) }}
                                                                    value={newTicketData[field.details.name.toLowerCase()]}
                                                                >
                                                                    {field.details.options.map(option => (
                                                                        <CustomOption key={option}> { } </CustomOption>
                                                                    ))}
                                                                    <CustomOption selected>-- select --</CustomOption>
                                                                    <CustomOption value='issue'>Issue</CustomOption>
                                                                    <CustomOption value='request'>Request</CustomOption>
                                                                    <CustomOption value='query'>Query</CustomOption>
                                                                </CustomSelect>
                                                            </CustomInputField>
                                                        )}

                                                        {field.details.type === 'TextArea' && (
                                                            <CustomInputField>
                                                                <CustomLabel htmlFor={field.details.name}> {field.details.name} </CustomLabel>
                                                                <CustomTextfield
                                                                    onChange={(e) => { onChangeInputField(field.details.name.toLowerCase(), e.target.value) }}
                                                                    cols='40' rows='4'
                                                                    id={field.details.name}
                                                                    placeholder={field.details.placeholder}
                                                                    value={newTicketData[field.details.name.toLowerCase()]}
                                                                ></CustomTextfield>
                                                            </CustomInputField>
                                                        )}

                                                        {field.details.type === 'File Attachment' && (
                                                            <CustomInputField >
                                                                <CustomLabel htmlFor={field.details.name} > {field.details.name} </CustomLabel>
                                                                <AddFileContainer>
                                                                    <AddFileInput htmlFor={field.details.name}>Add File</AddFileInput>
                                                                    <input
                                                                        onChange={(e) => { onChangeInputField(field.details.name.toLowerCase(), e.target.value) }}
                                                                        style={{ display: 'none' }}
                                                                        type="file"
                                                                        id={field.details.name}
                                                                        name="text file upload"
                                                                        accept=".txt"
                                                                    />
                                                                    <CustomSpan>{newTicketData[field.details.name.toLowerCase()]}</CustomSpan>
                                                                </AddFileContainer>
                                                            </CustomInputField>
                                                        )}
                                                    </>
                                                ))}
                                            </Fields>

                                            <ButtonsContainer>
                                                <Btn
                                                    type='submit'
                                                    style={{ background: '#72efdd', color: '#000' }}
                                                >Submit <RiSendPlaneFill size={14} style={{ marginLeft: '3px' }} />
                                                </Btn>
                                            </ButtonsContainer>

                                            {showErrMsg ? (<ErrMsg>* Please fill all the required Fields</ErrMsg>) : null}
                                        </TicketForm>

                                        <CheckOutContainer >
                                            <TemplateContainer>
                                                <ImgTag
                                                    src='https://res.cloudinary.com/dca9sij3n/image/upload/v1716629124/kgg9klpkwjbkxddkpxrs.jpg'
                                                    alt='serviceImg'
                                                />
                                            </TemplateContainer>

                                            <QuantityContainer >
                                                <PTag style={{
                                                    height: '100%',
                                                    margin: '0px',
                                                    padding: '0px',
                                                    fontSize: '1.2rem',
                                                    fontWeight: '500'
                                                }}>Quantity :</PTag>
                                                <QuantityBtns >
                                                    <Btn
                                                        onClick={() => OnClickQuantity('minus')}
                                                        style={{
                                                            background: '#ced4da',
                                                            color: '#fff',
                                                            padding: '0px',
                                                            height: '25px',
                                                            minWidth: '30px',
                                                            margin: '0px 3px 0px 3px'
                                                        }}><FiMinus size={20} /></Btn>
                                                    <PTag
                                                        style={{
                                                            fontSize: '1rem',
                                                            background: '#f5f3f4',
                                                            borderRadius: '50%',
                                                            height: '30px',
                                                            minWidth: '30px',
                                                            fontWeight: '500'
                                                        }}>{orderQuantity}</PTag>
                                                    <Btn
                                                        onClick={() => OnClickQuantity('plus')}
                                                        style={{
                                                            background: '#ced4da',
                                                            color: '#fff',
                                                            padding: '0px',
                                                            height: '25px',
                                                            minWidth: '30px',
                                                            margin: '0px 3px 0px 3px'
                                                        }}><FiPlus size={20} /></Btn>
                                                </QuantityBtns>
                                            </QuantityContainer>

                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginTop: '10px'
                                                }}>
                                                <PTag
                                                    style={{
                                                        height: '100%',
                                                        margin: '0px',
                                                        padding: '0px',
                                                        fontSize: '1.2rem',
                                                        fontWeight: '500'
                                                    }}>Price :</PTag>
                                                <MdCurrencyRupee />
                                                <span style={{ fontSize: '1.8rem', fontWeight: '500' }}>{price}</span>
                                            </div>

                                            <OrderBtnsContainer>
                                                <Btn style={{
                                                    background: 'rgba(6, 214, 160, 1)',
                                                    padding: '0px 8px 0px 8px',
                                                    margin: '5px 0px 0px 0px',
                                                    width: '50%'
                                                }}>
                                                    Proceed To Order
                                                    <FaArrowRight style={{ marginLeft: '3px' }} size={13} />
                                                </Btn>

                                                <ScheduleBtnContainer style={{ width: '50%' }}>
                                                    <Btn style={{
                                                        background: 'rgba(255, 134, 0, 1)',
                                                        padding: '0px 8px 0px 8px',
                                                        margin: '0px',
                                                        borderRadius: isScheduleBtnsDropDownActive ? '7px 0px 0px 0px' : '7px 0px 0px 7px', width: '80%'
                                                    }}>
                                                        {selectedOrderBtn ? selectedOrderBtn : 'Schedule Order'}
                                                    </Btn>
                                                    <button style={{
                                                        background: 'rgba(255, 134, 0, 0.7)',
                                                        margin: '0px',
                                                        padding: '3px',
                                                        color: '#000',
                                                        height: '30px',
                                                        borderRadius: isScheduleBtnsDropDownActive ? '0px 7px 0px 0px' : '0px 7px 7px 0px',
                                                        border: 'none', width: '20%'
                                                    }}
                                                        onClick={() => setScheduleBtnsDropDown(!isScheduleBtnsDropDownActive)}
                                                    >
                                                        <RiArrowDownSLine
                                                            size={18}
                                                            style={{
                                                                transform: isScheduleBtnsDropDownActive ? 'rotate(180deg)' : 'rotate(360deg)'
                                                            }} />
                                                    </button>

                                                    {isScheduleBtnsDropDownActive && (<ScheduleDropdownContainer>
                                                        <SpanTag onClick={() => {
                                                            setSelectedOrderBtn('Daily')
                                                            setScheduleBtnsDropDown(false)
                                                        }}>Daily</SpanTag>

                                                        <SpanTag onClick={() => {
                                                            setSelectedOrderBtn('Weekly')
                                                            setScheduleBtnsDropDown(false)
                                                        }}>Weekly</SpanTag>

                                                        <SpanTag onClick={() => {
                                                            setSelectedOrderBtn('Monthly')
                                                            setScheduleBtnsDropDown(false)
                                                        }}>Monthly</SpanTag>

                                                        <SpanTag onClick={() => {
                                                            setSelectedOrderBtn('Custom')
                                                            setScheduleBtnsDropDown(false)
                                                        }}>Custom</SpanTag>
                                                    </ScheduleDropdownContainer>)}
                                                </ScheduleBtnContainer>
                                                <Btn
                                                    type='button'
                                                    onClick={OnAddToCart}
                                                    style={{
                                                        background: '#f5cb5c',
                                                        color: '#000',
                                                        marginTop: '5px',
                                                        padding: '0px 8px 0px 8px',
                                                        width: '50%'
                                                    }}>Add To Cart
                                                    <PiShoppingCartLight size={14} style={{ marginLeft: '3px' }} />
                                                </Btn>
                                            </OrderBtnsContainer>
                                        </CheckOutContainer>
                                    </TicketContainer>

                                    {/* <ArticlesContainer>
                                        <span style={{ fontSize: '20px', fontWeight: '500', marginLeft: '8px' }}>Articles</span>
                                        <Cards>
                                            {Object.values(ArticlesContent).map((each) => (
                                                <Card key={each.id}>
                                                    <span>{each.name}</span>
                                                </Card>
                                            ))}
                                        </Cards>
                                    </ArticlesContainer> */}

                                    <PopupContainer id="popup" opened={openPopup}>
                                        <TicketStatusText success={TicketStatus}>
                                            <BsCheckCircleFill />
                                            Ticket #{uuid()} has been created successfully!
                                            <CloseBtn onClick={closePopup}><IoClose /> </CloseBtn>
                                        </TicketStatusText>
                                    </PopupContainer>
                                    {isChatBotOpen && <Chatbot />}
                                </RequestsContainer>
                            </ContentContainer>
                        </CustomContainer>
                    </MainContainer>
                )
            }}
        </WonContext.Consumer>
    )

}