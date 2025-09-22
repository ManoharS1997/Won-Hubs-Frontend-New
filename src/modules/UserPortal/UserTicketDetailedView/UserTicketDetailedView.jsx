import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

import WonContext from "../../../context/WonContext";
import LeftNav from "../LeftNav/pages/LeftNav";
import { DummyTicketData as dummyData, UserTicketDetailData as Data } from "../../../DataFile/DefaultDataFile";
import InternalDiscussionPage from "../../Admin-Portal/TicketDetailsView/InternalDiscussionChat";

import { IoIosArrowBack } from "react-icons/io";
import { GrAttachment } from "react-icons/gr";
import { AiOutlineSend } from "react-icons/ai";
import { IoTicket } from "react-icons/io5";
import { BiSolidHourglass } from "react-icons/bi";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { BsExclamationTriangle } from "react-icons/bs";

import {
    BackBtn, BodyContainer, ChatContainer, Circle, Container,
    ContentContainer, CustomContainer, FieldContainer, FlexContainer,
    FormContainer, HeadContainer, InputContainer, InputTag,
    Label, Line, OnHold, Receriver, ReceiverMessage, Sender,
    SenderMessage, SendBtn, Span, StepContainer, TextAreaTag,
    TicketConvo, TicketDetailsContainer, TicketHistoryContainer
} from './StyledComponents'
import { updateTableData } from "../../../utils/CheckAndExecuteFlows/CRUDoperations";

const Steps = [
    {
        Title: 'New',
        icon: <IoTicket size={15} />,
        isActive: true,
    },
    {
        Title: 'In Progress',
        icon: <BiSolidHourglass size={15} />,
        isActive: false,
    },
    {
        Title: 'Solved',
        icon: <FaRegCheckCircle size={15} />,
        isActive: false,
    },
    {
        Title: 'Closed',
        icon: <IoMdCloseCircleOutline size={17} />,
        isActive: false,
    },
]

export default function UserTicketDetailedView() {
    const [ticketData, setTicketData] = useState({})
    const [steps, setSteps] = useState(Steps)
    const [ticketStatus, setTicketStatus] = useState('Solved')
    const [isOnHold, setOnHold] = useState(true)
    const history = useNavigate()
    const [chatData, setChatData] = useState(Data)
    const [msgInputData, setMsgInputData] = useState('')
    const { id } = useParams();

    const onBackBtn = () => history(-1)

    useEffect(() => {
        switch (ticketStatus) {
            case 'New':
                break;
            case 'In Progress': {
                const updatedSteps = steps.map(step => {
                    if (step.Title === 'In Progress') {
                        return { ...step, isActive: true };
                    } else {
                        return step;
                    }
                });
                setSteps(updatedSteps);
                break;
            }
            case 'Solved': {
                const updatedSteps = steps.map(step => {
                    if (step.Title === 'Solved' || step.Title === 'In Progress') {
                        return { ...step, isActive: true };
                    } else {
                        return step;
                    }
                });
                setSteps(updatedSteps);
                break;
            }
            case 'Closed': {
                const updatedSteps = steps.map(step => {
                    if (step.Title === 'Closed' || step.Title === 'In Progress' || step.Title === 'Solved') {
                        return { ...step, isActive: true }
                    } else {
                        return step
                    }
                })
                setSteps(updatedSteps)
                break
            }
            default:
        }
    }, [ticketStatus]);

    useEffect(() => {
        const fetchTicketsData = async () => {
            const url = `${import.meta.env.VITE_HOSTED_API_URL}/ticket/${id}`;
            try {
                const response = await fetch(url, { method: 'GET' });

                const data = await response.json()
                console.log(data.ticket);

                setTicketData(data.ticket);
            } catch (error) {
                console.error('Error fetching ticket data:', error);
            }
        };

        fetchTicketsData();
    }, []);

    const onSend = () => {
        setChatData((prevState) => ([
            ...prevState,
            {
                id: chatData.length + 1,
                from: 'sender',
                message: msgInputData
            }
        ]))

        setMsgInputData('')
    }

    const closeTicket = async () => {
        await updateTableData('ticket', ticketData.id, { state: 'closed' })
    }

    return (
        <WonContext.Consumer>
            {value => {
                const { sendMail, setOpenMail } = value
                
                return (
                    <TicketDetailsContainer>
                        <BodyContainer>
                            <CustomContainer>
                                <ContentContainer>
                                    <HeadContainer>
                                        <BackBtn onClick={onBackBtn}>
                                            <IoIosArrowBack size={25} />
                                        </BackBtn>

                                        <span style={{ fontSize: '20px', fontWeight: '500' }}>Ticket - {ticketData.id}  </span>
                                    </HeadContainer>

                                    <Container>
                                        {Object.values(steps).map((step, index) => (
                                            <StepContainer key={index} active={step.Title === ticketStatus}>
                                                <Circle style={{ background: step.Title === 'Closed' && ticketStatus === 'Closed' ? 'red' : '#' }} active={step.isActive}>
                                                    {step.icon}
                                                </Circle>
                                                <Span>{step.Title}</Span>

                                                {step.Title !== 'Closed' && (
                                                    <Line active={step.isActive}>
                                                        {isOnHold && ticketStatus === step.Title ? (<OnHold><BsExclamationTriangle size={15} /></OnHold>) : null}
                                                    </Line>
                                                )}
                                            </StepContainer>
                                        ))}
                                    </Container>

                                    <FlexContainer>
                                        <FormContainer>
                                            <FieldContainer>
                                                <Label htmlFor="name">Name</Label>
                                                <InputTag id="name" type="text" value={ticketData.name} />
                                            </FieldContainer>

                                            <FieldContainer>
                                                <Label htmlFor="onBehalfOf">On Behalf Of</Label>
                                                <InputTag id="onBehalfOf" type="text" value={ticketData.on_behalf_of} />
                                            </FieldContainer>

                                            <FieldContainer>
                                                <Label htmlFor="taskType">Task Type</Label>
                                                <InputTag id="taskType" type="text" value={ticketData.task_type} />
                                            </FieldContainer>

                                            <FieldContainer>
                                                <Label htmlFor="category">Category</Label>
                                                <InputTag id="category" type="text" value={ticketData.category} />
                                            </FieldContainer>

                                            <FieldContainer>
                                                <Label htmlFor="subCategory">Sub Category</Label>
                                                <InputTag id="subCategory" type="text" value={ticketData.sub_category} />
                                            </FieldContainer>

                                            <FieldContainer>
                                                <Label htmlFor="shortDescription">Short Description</Label>
                                                <InputTag id="shortDescription" type="text" value={ticketData.short_description} />
                                            </FieldContainer>

                                            <FieldContainer>
                                                <Label htmlFor="description">Description</Label>
                                                <TextAreaTag id="description" rows={3} value={ticketData.description} />
                                            </FieldContainer>

                                            <FieldContainer>
                                                <Label htmlFor="pricePerUnit">Price Per Unit</Label>
                                                <InputTag id="pricePerUnit" type="text" value={ticketData.price_per_unit} />
                                            </FieldContainer>

                                            <FieldContainer>
                                                <Label htmlFor="quantity">Quantity</Label>
                                                <InputTag id="quantity" type="text" value={ticketData.quantity} />
                                            </FieldContainer>

                                            <FieldContainer>
                                                <Label htmlFor="attachment">Attachments</Label>
                                            </FieldContainer>

                                            {ticketData.state === 'resolved' || ticketData.state === 'solved' ?
                                                <FieldContainer style={{ justifyContent: 'center' }}>
                                                    <button type="button" onClick={closeTicket} style={{
                                                        backgroundColor: '#4CAF50',
                                                        color: '#fff',
                                                        padding: '10px 20px',
                                                        cursor: 'pointer',
                                                    }}>Confirm Closing</button>
                                                </FieldContainer> : ticketData.state === 'closed' ?
                                                    <FieldContainer style={{ justifyContent: 'center' }}>
                                                        <p> Ticket has been closed</p>
                                                    </FieldContainer> : null
                                            }

                                        </FormContainer>

                                        {Object.keys(ticketData).length > 0 ?
                                            <TicketHistoryContainer>
                                                <InternalDiscussionPage details={ticketData} user={true} />
                                            </TicketHistoryContainer> : null
                                        }

                                        {/* <TicketHistoryContainer>
                                            <TicketConvo>
                                                <ChatContainer>
                                                    {chatData.map((each) => (
                                                        each.from === 'receiver' ? (<Receriver key={each.id}>
                                                            <ReceiverMessage> {each.message} </ReceiverMessage>
                                                        </Receriver>) :
                                                            (<Sender key={each.id}>
                                                                <SenderMessage> {each.message} </SenderMessage>
                                                            </Sender>)
                                                    ))}
                                                </ChatContainer>

                                                <InputContainer>
                                                    <div style={{ width: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <label htmlFor="AttachFile"><GrAttachment size={20} /></label>
                                                        <InputTag style={{ display: 'none' }} id="AttachFile" type="file" />
                                                    </div>
                                                    <InputTag style={{ height: '90%', width: '80%', borderRadius: '9px', background: '#cfd2cd', outline: 'none' }} type="text" onKeyDown={(e) => e.key === 'Enter' && onSend()} onChange={(e) => setMsgInputData(e.target.value)} value={msgInputData} />
                                                    <SendBtn onClick={onSend}><AiOutlineSend size={22} /></SendBtn>
                                                </InputContainer>
                                            </TicketConvo>
                                        </TicketHistoryContainer> */}
                                    </FlexContainer>
                                </ContentContainer>
                            </CustomContainer>
                        </BodyContainer>
                    </TicketDetailsContainer>
                )
            }}
        </WonContext.Consumer>
    )
}