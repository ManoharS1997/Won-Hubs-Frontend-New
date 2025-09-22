import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import WonContext from "../../../context/WonContext";
import EmailModel from "../SendEmail/pages/EmailModal";
import TransferTicket from './TransferTicket/TransferTicket'
import { updateTableData, getRecordData } from "../../../utils/CheckAndExecuteFlows/CRUDoperations";
import Swal from "sweetalert2";
import TodoList from "./TodoList";
import ExternalDiscussionPage from "./ExternalDiscussionPage";
import InternalDiscussionPage from "./InternalDiscussionChat";
import { useAlert } from "../../../shared/hooks/alertHook";

import { IoMdMail, IoMdAdd } from "react-icons/io";
import { FiSave } from "react-icons/fi";
import { GrDocumentUpdate } from "react-icons/gr";
import { RiFolderTransferLine } from "react-icons/ri";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaTriangleExclamation } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

import {
    ActionBtn, ActionButtonsContainer, ActionsContainer, BodyContainer,
    CustomContainer, CustomInput, CustomLabel, CustomOption,
    CustomPara, CustomSelect, CustomTextArea, DetailsAndActionsContainer,
    DetailsContainer, HeaderContainer, TicketDetailsComponent, TicketDetailsContainer,
    TicketNumber, TicketNotFoundView, NotFoundText, TabsList, TabItem, TabsContainer,
    TicketTabsList, TicketTab, TabCloseBtn
} from './StyledComponents'

const priorityType = (details) => {
    switch (details.priority ? details.priority.toString() : '4') {
        case '1':
            return '1 - Very High'
        case '2':
            return '2 - High'
        case '3':
            return '3 - Medium'
        case '4':
            return '4 - Low'
        default:
            return null
    }
}

export default function TicketDetailsView() {
    const [details, updateTicket] = useState({})
    const [description, setDescription] = useState('')
    const [ticketNotFound, setTicketNotFound] = useState(false)
    const [isTicketUpdated, setIsTicketUpdated] = useState(false)
    const [activeTab, setActiveTab] = useState('1')
    const { addAlert } = useAlert()
    const navigate = useNavigate()
    const { id } = useParams();

    useEffect(() => {
        getTicketdetails()
    }, [])

    const getTicketdetails = async () => {
        const pageUrl = window.location.href;
        const data = await getRecordData('ticket', id, 'Ticket detailed view', pageUrl)
        // console.log(data[0])
        data.error ? setTicketNotFound(true) : updateTicket(data[0])
    }

    const updateDescription = (e) => setDescription(e.target.value)

    const onSaveBtn = () => {
        // alert('Saved Successfully')
        addAlert('Ticket Details successfully saved', 'success')
    }

    const onBackBtn = () => navigate(-1)

    const updateDetails = async () => {
        const updatedDetails = {
            state: details.state,
            internal_notes: details.internal_notes,
            action_plan: details.action_plan,
            external_notes: details.external_notes,
            priority: details.priority,
            approval_state: details.approval_state
        }

        await updateTableData('ticket', id, updatedDetails)
        setIsTicketUpdated(true)
        setTimeout(() => setIsTicketUpdated(false), 3000)
    }

    isTicketUpdated ? (
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Ticket Updated Successfully",
            showConfirmButton: false,
            timer: 1500
        })
    ) : null

    // console.log(details)

    return (
        <WonContext.Consumer>
            {value => {
                const { sendMail, istransferTicketOpen, setOpenMail, setTransferTicketOpen } = value
                return (
                    <TicketDetailsContainer>
                        <BodyContainer>
                            <CustomContainer>
                                <TicketTabsList>
                                    <TicketTab>
                                        <span>#{details.id}</span>

                                        <TabCloseBtn>
                                            <IoCloseSharp />
                                        </TabCloseBtn>
                                    </TicketTab>

                                    <TicketTab>
                                        <IoMdAdd size={15} />
                                    </TicketTab>
                                </TicketTabsList>

                                {ticketNotFound ?
                                    <TicketDetailsComponent>
                                        <IoChevronBackOutline size={26} style={{ marginRight: '8px' }} onClick={onBackBtn} />

                                        <TicketNotFoundView>
                                            <FaTriangleExclamation size={100} style={{ color: 'red' }} />
                                            <NotFoundText> {`The Ticket #${id} is Not found in database. `}</NotFoundText>
                                        </TicketNotFoundView>
                                    </TicketDetailsComponent> :

                                    <TicketDetailsComponent>
                                        <TabsContainer>
                                            <TabsList>
                                                <TabItem active={activeTab === '1'} id='1' onClick={() => setActiveTab('1')}>Details</TabItem>
                                                <TabItem active={activeTab === '2'} id='2' onClick={() => setActiveTab('2')}>History</TabItem>
                                                <TabItem active={activeTab === '3'} id='3' onClick={() => setActiveTab('3')}>Related Recortds</TabItem>
                                                <TabItem active={activeTab === '4'} id='4' onClick={() => setActiveTab('4')}>Attachments</TabItem>
                                                <TabItem active={activeTab === '5'} id='5' onClick={() => setActiveTab('5')}>Child Details</TabItem>
                                            </TabsList>
                                        </TabsContainer>

                                        {activeTab === '1' && details.id ?
                                            <DetailsAndActionsContainer>
                                                <HeaderContainer>
                                                    {/* <TicketNumber> */}
                                                    <IoChevronBackOutline size={26} style={{ marginRight: '8px' }} onClick={onBackBtn} />
                                                    {/* Ticket #{id}</TicketNumber> */}

                                                    <ActionButtonsContainer>
                                                        <ActionBtn type="button" onClick={setOpenMail}>
                                                            <IoMdMail style={{ marginRight: '10px', height: '100%', width: 'fit-content' }} /> Email
                                                        </ActionBtn>

                                                        {sendMail ? <EmailModel /> : null}

                                                        <ActionBtn type="button" onClick={onSaveBtn}>
                                                            <FiSave style={{ marginRight: '10px', height: '100%', width: 'fit-content' }} /> Save
                                                        </ActionBtn>

                                                        <ActionBtn onClick={updateDetails} type="button">
                                                            <GrDocumentUpdate style={{ marginRight: '10px', height: '100%', width: 'fit-content' }} /> Update
                                                        </ActionBtn>

                                                        <ActionBtn type="button" onClick={setTransferTicketOpen}>
                                                            <RiFolderTransferLine style={{ marginRight: '10px', height: '100%', width: 'fit-content' }} />
                                                            Transfer Ticket
                                                        </ActionBtn>

                                                        {istransferTicketOpen ? <TransferTicket /> : null}
                                                    </ActionButtonsContainer>
                                                </HeaderContainer>

                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    width: '100%'
                                                }}>
                                                    <DetailsContainer>
                                                        <CustomPara>
                                                            <CustomLabel>Ticket No. </CustomLabel>
                                                            <CustomInput type="text" value={details.id} />
                                                        </CustomPara>

                                                        <CustomPara>
                                                            <CustomLabel>Priority </CustomLabel>

                                                            <CustomSelect onChange={e => updateTicket({ ...details, priority: e.target.value })}>
                                                                <CustomOption>
                                                                    {priorityType(details)} {`(default)`}
                                                                </CustomOption>

                                                                <CustomOption value={'1'}> 1 - Very High </CustomOption>

                                                                <CustomOption value={'2'}> 2  - High </CustomOption>

                                                                <CustomOption value={'3'}>3 - Medium</CustomOption>

                                                                <CustomOption value={'4'}> 4 - Low  </CustomOption>
                                                            </CustomSelect>
                                                        </CustomPara>

                                                        <CustomPara><CustomLabel>Location </CustomLabel>
                                                            <CustomSelect>
                                                                <CustomOption>{details.location ? details.location : '--'}</CustomOption>
                                                            </CustomSelect>
                                                        </CustomPara>

                                                        <CustomPara><CustomLabel>Approval State </CustomLabel>
                                                            <CustomSelect onChange={e => updateTicket({ ...details, approval_state: e.target.value })}>
                                                                <CustomOption selected={details.approval_state === 'true'} value={'true'}>Approved</CustomOption>
                                                                <CustomOption selected={details.approval_state === 'false'} value={'false'}>Rejected</CustomOption>
                                                            </CustomSelect>
                                                        </CustomPara>

                                                        <CustomPara>
                                                            <CustomLabel>Requester Email </CustomLabel>
                                                            <CustomInput type="text" placeholder={details.requested_email} />
                                                        </CustomPara>

                                                        <CustomPara>
                                                            <CustomLabel> State </CustomLabel>

                                                            <CustomSelect onChange={(e) => updateTicket({ ...details, state: e.target.value })}>
                                                                <CustomOption selected={details.state === 'hold'} value={'hold'}>Hold</CustomOption>
                                                                <CustomOption selected={details.state === 'in_progress'} value={'in_progress'}>In Progress</CustomOption>
                                                                <CustomOption selected={details.state === 'solved'} value={'solved'}>Solved</CustomOption>
                                                                <CustomOption selected={details.state === 'cancelled'} value={'cancelled'}>Cancelled</CustomOption>
                                                            </CustomSelect>
                                                        </CustomPara>

                                                        <CustomPara><CustomLabel>Department </CustomLabel>
                                                            <CustomSelect>
                                                                <CustomOption>{details.category}</CustomOption>
                                                            </CustomSelect>
                                                        </CustomPara>

                                                        <CustomPara><CustomLabel>Sub-Department </CustomLabel>
                                                            <CustomSelect>
                                                                <CustomOption>{details.sub_category}</CustomOption>
                                                            </CustomSelect>
                                                        </CustomPara>

                                                        <CustomPara>
                                                            <CustomLabel>Status</CustomLabel>
                                                            <CustomInput type="text" placeholder={details.status} />
                                                        </CustomPara>

                                                        <CustomPara><CustomLabel>Assigned Group</CustomLabel>
                                                            <CustomSelect>
                                                                <CustomOption>{details.assigned_group}</CustomOption>
                                                            </CustomSelect>
                                                        </CustomPara>

                                                        <CustomPara>
                                                            <CustomLabel>Assigned Member  </CustomLabel>
                                                            <CustomInput type="text" placeholder={details.assigned_member_mail} />
                                                        </CustomPara>

                                                        <CustomPara><CustomLabel>Created By </CustomLabel>
                                                            <CustomSelect>
                                                                <CustomOption>{details.created_by}</CustomOption>
                                                            </CustomSelect>
                                                        </CustomPara>
                                                    </DetailsContainer>

                                                    <DetailsContainer>
                                                        <CustomPara><CustomLabel>Solution Due Date  </CustomLabel>
                                                            <CustomInput type="text" placeholder={details.solution_due} />
                                                        </CustomPara>

                                                        <CustomPara>
                                                            <CustomLabel>Subject
                                                            </CustomLabel> <CustomInput type="text" placeholder={details.short_description} />
                                                        </CustomPara>

                                                        <CustomPara>
                                                            <CustomLabel>Internal Notes</CustomLabel>

                                                            {/* <CustomInput type="text" placeholder={details.internalNotes} onChange={updateDescription} value={description} /> */}
                                                            <InternalDiscussionPage updateTicket={updateTicket} details={{ ...details, internal_notes: typeof details.internal_notes === 'object' && details.internal_notes !== null ? details.internal_notes : details.internal_notes !== null ? JSON.parse(details.internal_notes) : [] }} />
                                                        </CustomPara>

                                                        <CustomPara>
                                                            <CustomLabel>External Notes</CustomLabel>

                                                            {/* <CustomInput type="text" placeholder={details.external_notes} /> */}
                                                            <ExternalDiscussionPage updateTicket={updateTicket} details={{ ...details, external_notes: typeof details.external_notes === 'object' && details.external_notes !== null ? details.external_notes : details.external_notes !== null ? JSON.parse(details.external_notes) : [] }} />
                                                        </CustomPara>

                                                        <CustomPara>
                                                            <CustomLabel>Action Plan </CustomLabel>

                                                            {/* <CustomTextArea cols='20' rows='3' value={details.action_plan} readOnly>{details.action_plan}</CustomTextArea> */}
                                                            <TodoList updateTicket={updateTicket} details={details} />
                                                        </CustomPara>
                                                    </DetailsContainer>
                                                </div>

                                            </DetailsAndActionsContainer> :

                                            <DetailsAndActionsContainer>--</DetailsAndActionsContainer>
                                        }

                                        {/* <TicketDedtailTabs style={{ width: '100%', height: '30%' }} /> */}
                                    </TicketDetailsComponent>
                                }
                            </CustomContainer>
                        </BodyContainer>
                    </TicketDetailsContainer>
                )
            }}
        </WonContext.Consumer>
    )
}