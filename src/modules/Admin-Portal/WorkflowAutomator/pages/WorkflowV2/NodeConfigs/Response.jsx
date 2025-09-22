import { useState, useEffect, useRef } from "react";
import { FaAngleDown } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import Modal from 'react-modal'

import { pickBy, includes, toLower, find } from 'lodash';

import WonContext from "../../../../../../context/WonContext";
import dummyTableNames from "../TableDummyData";
import { getTableData } from "../../../../../../utils/CheckAndExecuteFlows/CRUDoperations";

import {
    CustomFieldContainer,
    H1Tag,
    InputTag,
    LabelTag,
    NodeConfigContainer,
    RightTabContent,
    SpanTag,
    TextAreaTag2,
    UiDropDown,
    CustomDropdownContainer,
    NewCustomDropDown,
    CustomDrpdownOptions,
    DropdownSearchBox,
    OptionsContainer,
    DropdownOptions,

    StyledDropDown,
    StyledItem,
    StyledMenu,
    StyledToggle,

    FilterContainer,
    ButtonsSection,
    Btn,
    ValueInput,
    ReactSelect,
    CustomPara,
} from '../StyledComponents'

import {
    CloseModalBtn, SectionContainer, SectionList, SectionTitle, SectionItem, OpenModalBtn,
    ModalInnerContentContainer, SelectedContentText, NoDataAvailableContainer
} from './StyledComponents'

const CoreActions = {
    'Ask For Approval': ["Ask For Approval Column1", "Ask For Approval Column2"],
    'Create or update Record': ["Create or Update Record Column1", "Create or Update Record Column2"],
    'Create Record': ["Create Record Column1", "Create Record Column2"],
    'Create Task': ["Create Task Column1", "Create Task Column2"],
    'Delete Record': ["Delete Record Column1", "Delete Record Column2"],
    'Get Email Header': ["Get Email Header Column1", "Get Email Header Column2"],
    'Get Latest Response Text From Email': ["Get Latest Response Text From Email Column1", "Get Latest Response Text From Email Column2"],
    'log': ["Log Column1", "Log Column2"],
    'lookup Email Attachments': ["Lookup Email Attachments Column1", "Lookup Email Attachments Column2"],
    'Lookup Record': ["Lookup Record Column1", "Lookup Record Column2"],
    'Lookup Records': ["Lookup Records Column1", "Lookup Records Column2"],
    'Get Notification Details': ["Get Notification Details Column1", "Get Notification Details Column2"],
    'Send Notification': ["Send Notification Column1", "Send Notification Column2"],
    'Send Email': ["Send Email Column1", "Send Email Column2"],
    'Update Record': ["Update Record Column1", "Update Record Column2"]
};

const SendActions = ['Send Notification', 'Send Email']

const FilterConditions = [
    'On',
    'Not On',
    'Contains',
    'Does Not Contains',
    'Is'
]

const DropdownBtnStyles1 = {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    color: '#000',
    padding: '0px',
}

const Response = ({
    activeRightTab,
    isRightPanalActive,
    selectedFormData,
    onChangeCustomLabel,
    onChangeDescriptionValue,
    nodes,
    edges,
    onChangeTriggerComments,
    onChangeCoreActionValue,
    onChangeActionResponseValue,
    setTable,
    flowData,
    setFlowData
}) => {

    //<<<<< STATE FOR CUSTOM SEARCH DROPDOWN
    const [isDropdownOpen, setDropdownOpen] = useState(false)
    const [isTableDropdownOpen, setTableDropdownOpen] = useState(false)
    const [isActionResponseDropdownOpen, setActionResponseDropdownOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchValueActionResponse, setsearchValueActionResponse] = useState('')
    const [isModalOpen, setModalOpen] = useState(false)
    const [notificationsData, setNotificationData] = useState([])
    const [templatesData, setTemplatesData] = useState([])
    const TableDropDownSearchCloseHandle = useRef(null)

    const TableSelectRef = useRef(null)
    const ActionResponseDropDownSearchCloseHandle = useRef(null)

    const filteredDropdownOptions = Object.keys(dummyTableNames).filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()))

    const handleDropDownToggle = () => setDropdownOpen(!isDropdownOpen)

    const handleActionResponseDropDownToggle = () => setActionResponseDropdownOpen(!isActionResponseDropdownOpen)

    const actionDropdownOptions = Object.keys(CoreActions).filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    )

    useEffect(() => {
        const handleOutSideClick = (event) => {
            if (TableDropDownSearchCloseHandle.current && !TableDropDownSearchCloseHandle.current.contains(event.target)) {
                setDropdownOpen(false)
            }
            if (ActionResponseDropDownSearchCloseHandle.current && !ActionResponseDropDownSearchCloseHandle.current.contains(event.target)) {
                setActionResponseDropdownOpen(false)
            }
            if (TableSelectRef.current && !TableSelectRef.current.contains(event.target)) {
                setTableDropdownOpen(false)
            }
        }
        document.addEventListener('click', handleOutSideClick)
        getAnyTableData()

        return () => {
            document.removeEventListener('click', handleOutSideClick)
        }
    }, [setDropdownOpen, setActionResponseDropdownOpen])
    ///STATE FOR CUSTOM SEARCH DROPDOWN >>>>>

    const getAnyTableData = async () => {
        const notifications = await getTableData('notifications')
        const templates = await getTableData('templates')
        setNotificationData(notifications.notifications ? notifications.notifications : [])
        setTemplatesData(templates.templates ? templates.templates : [])
    }

    const getNodeResponseValue = (NodeId) => {
        const selectedNode = flowData.data.activeNodes.find((node) => node.id === NodeId);
        return selectedNode && selectedNode.data.coreAction ? selectedNode.data.coreAction : 'Select Action...';
    };

    const options = [
        { label: "One", value: 1 },
        { label: "Two", value: 2 },
        { label: "Three", value: 3 },
        { label: "Four", value: 4 },
        { label: "Five", value: 5 },
        { label: "Six", value: 6 },
        { label: "Seven", value: 7 },
        { label: "Eight", value: 8 },
    ];

    const selectedValues = [];
    return (
        <WonContext.Consumer>
            {value => {
                const { setactiveFlowData } = value

                {/* const AFNodes = activeFlowData.activeNodes */ }
                const activeNode = flowData.data.activeNodes.filter(node => node.id === selectedFormData.id)[0]

                const selectedNode = flowData.data.activeNodes.find((each) => each.id === selectedFormData.id)
                {/* console.log(selectedNode) */ }

                const getNodeCustomLabel = (NodeId) => {
                    const selectedNode = flowData.data.activeNodes.find((node) => node.id === NodeId)
                    return selectedNode ? selectedNode.data.customLabel : ''
                }

                const updateCustomLabel = (e, nodeId) => {
                    setFlowData({
                        ...flowData,
                        data: {
                            activeNodes: flowData.data.activeNodes.map((each) =>
                                each.id === nodeId
                                    ? { ...each, data: { ...each.data, customLabel: e } }
                                    : each),
                            activeEdges: flowData.data.activeEdges
                        }
                    })
                }

                const getNodeComments = (NodeId) => {
                    const selectedNode = flowData.data.activeNodes.find((node) => node.id === NodeId)
                    return selectedNode ? selectedNode.data.comments : ''
                }

                const onChangeTriggerComments = (e, NodeId) => {
                    setFlowData({
                        ...flowData,
                        data: {
                            activeNodes: flowData.data.activeNodes.map((each) =>
                                each.id === NodeId
                                    ? { ...each, data: { ...each.data, comments: e } }
                                    : each),
                            activeEdges: flowData.data.activeEdges
                        }
                    })
                }

                const getNodeTriggerTable = (NodeId) => {
                    const selectedNode = flowData.data.activeNodes.find((node) => node.id === NodeId);
                    return selectedNode && selectedNode.data.table ? selectedNode.data.table : 'Select Table...';
                }

                const onChangeTriggerTable = (e, NodeId) => {
                    setTable(e)

                    setFlowData({
                        ...flowData,
                        data: {
                            activeNodes: flowData.data.activeNodes.map((each) =>
                                each.id === NodeId
                                    ? { ...each, data: { ...each.data, table: e } }
                                    : each),
                            activeEdges: flowData.data.activeEdges
                        }
                    })

                    setDropdownOpen(false)
                }

                const getConfigureNodeConditions = (NodeId, id, conditionType) => {
                    const selectedNode = flowData.data.activeNodes.find((node) => node.id === NodeId);
                    if (selectedNode && selectedNode.data.conditions) {
                        const condition = selectedNode.data.conditions.find((cond) => cond.id === id);

                        if (condition) {
                            switch (conditionType) {
                                case 'filter':
                                    return condition[conditionType] ? condition[conditionType] : { name: 'Choose Field...' };
                                case 'Operation':
                                    return condition[conditionType] ? condition[conditionType] : 'Operation...';
                                case 'Value':
                                    return condition[conditionType] ? condition[conditionType] : 'Value...';
                                default:
                                    return null; // Handle any other conditionType as needed
                            }
                        }
                    }
                }

                const onChangeConfigureConditions = (e, NodeId, conditionObjId, conditionType) => {
                    setFlowData({
                        ...flowData,
                        data: {
                            activeNodes: flowData.data.activeNodes.map(each =>
                                each.id === NodeId
                                    ? {
                                        ...each,
                                        data: {
                                            ...each.data,
                                            conditions: each.data.conditions.map(condition =>
                                                condition.id === conditionObjId
                                                    ? {
                                                        ...condition,
                                                        [conditionType]: e
                                                    }
                                                    : condition
                                            )
                                        }
                                    }
                                    : each),
                            activeEdges: flowData.data.activeEdges
                        }
                    })
                }

                const getFilerType = (filterId) => {
                    const type = (activeNode.data.conditions.find(condition => condition.id === filterId).filter.type)
                    switch (type) {
                        case 'int':
                            return <ValueInput type='number' placeholder="Enter value" />
                        case 'datetime':
                            return <ValueInput type='datetime-local' placeholder="Enter value" />
                        case 'varchar':
                            return <ValueInput type='text' placeholder="Enter value" />
                        case 'enum':
                            return <div style={{ width: '40%', borderRadius: '50px' }}>
                                <ReactSelect
                                    options={options}
                                    multi
                                    values={options.filter((data) => selectedValues.includes(data.label))}
                                    onChange={(value) => console.log(value)}
                                />
                            </div>
                        default:
                            return null
                    }
                }

                const OnTriggerLogicalOperators = (operator, NodeId, conditionObjId) => {
                    setFlowData({
                        ...flowData,
                        data: {
                            activeNodes: flowData.data.activeNodes.map(each => {
                                if (each.id === NodeId) {
                                    return {
                                        ...each,
                                        data: {
                                            ...each.data,
                                            conditions: [...each.data.conditions.map((con) => con.id === conditionObjId ? { ...con, logicalOperator: operator } : con),
                                            {
                                                id: (each.data.conditions.length + 1).toString(),
                                                filter: '',
                                                condition: '',
                                                event: '',
                                                logicalOperator: '',
                                            }]

                                        }
                                    }
                                }
                                return each
                            }),
                            activeEdges: flowData.data.activeEdges
                        }
                    })

                }

                const onChangeActionResponseValue = (e, NodeId) => {
                    setFlowData({
                        ...flowData,
                        data: {
                            activeNodes: flowData.data.activeNodes.map(each =>
                                each.id === NodeId
                                    ? {
                                        ...each,
                                        data: {
                                            ...each.data,
                                            actionResponse: e,
                                        }
                                    }
                                    : each),
                            activeEdges: flowData.data.activeEdges
                        }
                    })
                }

                const OnDeleteConditionSet = (NodeId, conditionObjId) => {
                    setFlowData({
                        ...flowData,
                        data: {
                            activeNodes: flowData.data.activeNodes.map(each =>
                                each.id === NodeId
                                    ? {
                                        ...each,
                                        data: {
                                            ...each.data,
                                            conditions: each.data.conditions.filter(condition => condition.id !== conditionObjId)
                                        }
                                    }
                                    : each
                            ).map(node => {
                                if (node.id === NodeId && node.data.conditions.length <= 1) {
                                    return {
                                        ...node,
                                        data: {
                                            ...node.data,
                                            conditions: node.data.conditions.map((condition, index) => ({
                                                ...condition,
                                                operator: index === node.data.conditions.length - 1 ? '' : condition.operator
                                            }))
                                        }
                                    };
                                }
                                return node;
                            }),
                            activeEdges: flowData.data.activeEdges
                        }
                    })
                }

                const HandleActionsTable = (option, selectedNode) => {
                    onChangeCoreActionValue(option, selectedNode)
                    setDropdownOpen(false)

                    setFlowData({
                        ...flowData,
                        data: {
                            activeNodes: flowData.data.activeNodes.map(each =>
                                each.id === selectedNode
                                    ? {
                                        ...each,
                                        data: {
                                            ...each.data,
                                            coreAction: option,
                                            actionResponse: 'Select Response...',
                                        }
                                    }
                                    : each),
                            activeEdges: flowData.data.activeEdges
                        }
                    })
                }

                const getActionResponseValue = (NodeId) => selectedNode.data.actionResponse !== undefined ? selectedNode.data.actionResponse : 'Select Response...';

                const HandleActionResponse = (option, selectedNode) => {
                    onChangeActionResponseValue(option, selectedNode)
                    setActionResponseDropdownOpen(false)
                }

                const getNodeDescription = (NodeId) => {
                    const selectedNode = flowData.data.activeNodes.find((node) => node.id === NodeId)
                    return selectedNode ? selectedNode.data.description : '';
                };

                const onChangeDescription = (e, selectedNode) => {
                    onChangeDescriptionValue(e, selectedNode)

                    setFlowData({
                        ...flowData,
                        data: {
                            activeNodes: flowData.data.activeNodes.map(each =>
                                each.id === selectedNode
                                    ? {
                                        ...each,
                                        data: {
                                            ...each.data,
                                            description: e.target.value
                                        }
                                    }
                                    : each),
                            activeEdges: flowData.data.activeEdges
                        }
                    })
                }

                const onSelectMailContent = (content) => {
                    setModalOpen(false)

                    setFlowData({
                        ...flowData,
                        data: {
                            activeNodes: flowData.data.activeNodes.map(each =>
                                each.id === selectedNode.id
                                    ? {
                                        ...each,
                                        data: {
                                            ...each.data,
                                            mailContent: content
                                        }
                                    }
                                    : each),
                            activeEdges: flowData.data.activeEdges
                        }
                    })
                }

                return (
                    <RightTabContent>

                        <H1Tag>Response Configuration</H1Tag>
                        <br />
                        {selectedFormData && typeof selectedFormData === 'object' && (
                            <NodeConfigContainer>
                                <CustomFieldContainer>
                                    <InputTag
                                        type="text"
                                        placeholder="Enter Custom Label..."
                                        value={getNodeCustomLabel(selectedFormData.id)}
                                        onChange={(e) => updateCustomLabel(e.target.value, selectedFormData.id)}
                                    />
                                </CustomFieldContainer>

                                <CustomFieldContainer >
                                    <CustomDropdownContainer isOpen={isDropdownOpen} ref={TableDropDownSearchCloseHandle}>
                                        <NewCustomDropDown onClick={handleDropDownToggle}>
                                            {getNodeResponseValue(selectedFormData.id)}
                                            <FaAngleDown style={{ transform: `rotate(${isDropdownOpen ? '180deg' : '0deg'})` }} />
                                        </NewCustomDropDown>

                                        {isDropdownOpen && (
                                            <CustomDrpdownOptions>
                                                <DropdownSearchBox
                                                    type="text"
                                                    placeholder="Search..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />

                                                <OptionsContainer>
                                                    {actionDropdownOptions.map(option => (
                                                        <DropdownOptions
                                                            key={option}
                                                            data-option-value={option}
                                                            onClick={() => HandleActionsTable(option, selectedFormData.id)}
                                                        >
                                                            {option}
                                                        </DropdownOptions>
                                                    ))}
                                                </OptionsContainer>
                                            </CustomDrpdownOptions>
                                        )}
                                    </CustomDropdownContainer>
                                </CustomFieldContainer>

                                {SendActions.includes(getNodeResponseValue(selectedFormData.id)) ?
                                    <CustomFieldContainer>
                                        {selectedNode.data.mailContent ? <>
                                            <SelectedContentText>Selected: {selectedNode.data.mailContent.name}</SelectedContentText>
                                            <OpenModalBtn type='button' onClick={() => setModalOpen(true)}>
                                                Change {getNodeResponseValue(selectedFormData.id).split(' ')[1]}
                                            </OpenModalBtn> </> :
                                            <OpenModalBtn type='button' onClick={() => setModalOpen(true)}>
                                                Select {getNodeResponseValue(selectedFormData.id).split(' ')[1]}
                                            </OpenModalBtn>
                                        }

                                        <Modal
                                            isOpen={isModalOpen}
                                            onRequestClose={() => setModalOpen(false)}
                                            style={{
                                                overlay: {
                                                    background: 'rgba(0, 0, 0, 0.8)'
                                                },
                                                content: {
                                                    top: '10%',
                                                    left: '10%',
                                                    right: 'auto',
                                                    bottom: 'auto',
                                                    width: '80vw',
                                                    height: '80vh',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    overflow: 'hidden',
                                                    borderRadius: '15px',
                                                    padding: '0px',
                                                }
                                            }}
                                        >
                                            <ModalInnerContentContainer>
                                                <CloseModalBtn type="button" onClick={() => setModalOpen(false)}><IoClose size={20} /></CloseModalBtn>

                                                <SectionContainer>
                                                    <SectionTitle>Notifications</SectionTitle>

                                                    <SectionList>
                                                        {notificationsData.length > 0 ? notificationsData.map(item => (
                                                            <SectionItem key={item.id} onClick={() => onSelectMailContent(item)}>{item.name}</SectionItem>
                                                        )) :
                                                            <NoDataAvailableContainer> No Notifications Data available</NoDataAvailableContainer>}
                                                    </SectionList>
                                                </SectionContainer>

                                                <SectionContainer>
                                                    <SectionTitle>Templates</SectionTitle>
                                                    {templatesData.length > 0 ?
                                                        <SectionList>
                                                            {templatesData.map(item => <SectionItem key={item.id}>{item.name}</SectionItem>)}
                                                        </SectionList> :
                                                        <NoDataAvailableContainer> No Templates Data available</NoDataAvailableContainer>}
                                                </SectionContainer>
                                            </ModalInnerContentContainer>
                                        </Modal>
                                    </CustomFieldContainer> : null
                                }

                                {selectedFormData.data.label === 'Response' &&
                                    <CustomFieldContainer >
                                        <CustomDropdownContainer isOpen={isTableDropdownOpen} ref={TableSelectRef}>
                                            <NewCustomDropDown onClick={() => setTableDropdownOpen(!isTableDropdownOpen)}>
                                                {getNodeTriggerTable(selectedFormData.id)}
                                                <FaAngleDown style={{ transform: `rotate(${isTableDropdownOpen ? '180deg' : '0deg'})` }} />
                                            </NewCustomDropDown>

                                            {isTableDropdownOpen && (
                                                <CustomDrpdownOptions>
                                                    <DropdownSearchBox
                                                        type="text"
                                                        placeholder="Search..."
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                    />
                                                    <OptionsContainer>
                                                        {filteredDropdownOptions.map(option => (
                                                            <DropdownOptions
                                                                key={option}
                                                                data-option-value={option}
                                                                onClick={() => {
                                                                    onChangeTriggerTable(option, selectedFormData.id)
                                                                    setTableDropdownOpen(false)
                                                                }}
                                                            >
                                                                {option}
                                                            </DropdownOptions>
                                                        ))}
                                                    </OptionsContainer>
                                                </CustomDrpdownOptions>
                                            )}
                                        </CustomDropdownContainer>
                                    </CustomFieldContainer>
                                }

                                {/* SUB FLOW LOGIC CONDITIONS */}

                                {selectedNode && selectedNode.data.conditions &&
                                    getNodeTriggerTable(selectedFormData.id) !== 'Select Table...' &&
                                    selectedNode.data.coreAction !== 'Create Record' && (
                                        <CustomFieldContainer style={{ flexDirection: 'column' }}>

                                            {selectedNode.data.conditions.map((each, index) => (
                                                <FilterContainer key={index} style={{ marginBottom: '0px' }}>

                                                    <StyledDropDown style={{ marginRight: '0px' }}>
                                                        <StyledToggle id="operator" style={DropdownBtnStyles1}>
                                                            <CustomPara>{getConfigureNodeConditions(selectedFormData.id, each.id, 'filter').name}</CustomPara>
                                                        </StyledToggle>

                                                        {selectedNode.flowLogic !== '' && (
                                                            <StyledMenu>
                                                                {dummyTableNames[getNodeTriggerTable(selectedFormData.id)].map(option => (
                                                                    <StyledItem
                                                                        key={option.name}
                                                                        value={option.name}
                                                                        onClick={() => onChangeConfigureConditions(option, selectedFormData.id, each.id, 'filter')}
                                                                    >
                                                                        {option.name}
                                                                    </StyledItem>
                                                                ))}
                                                            </StyledMenu>
                                                        )}
                                                    </StyledDropDown>

                                                    <StyledDropDown style={{ marginRight: '0px' }}>
                                                        <StyledToggle id="operator" style={DropdownBtnStyles1}>
                                                            <CustomPara>{getConfigureNodeConditions(selectedFormData.id, each.id, 'Operation')}</CustomPara>
                                                        </StyledToggle>

                                                        <StyledMenu>
                                                            {FilterConditions.map(option => (
                                                                <StyledItem key={option} value={option} onClick={() => onChangeConfigureConditions(option, selectedFormData.id, each.id, 'Operation')}>
                                                                    {option}
                                                                </StyledItem>
                                                            ))}
                                                        </StyledMenu>
                                                    </StyledDropDown>

                                                    {getFilerType(each.id)}

                                                    <ButtonsSection>
                                                        <Btn onClick={() => OnTriggerLogicalOperators('AND', selectedFormData.id, each.id)} style={{ background: each.logicalOperator === 'AND' ? '#efd3d7' : 'transparent' }}>&</Btn>
                                                        <Btn onClick={() => OnTriggerLogicalOperators('OR', selectedFormData.id, each.id)} style={{ background: each.logicalOperator === 'OR' ? '#efd3d7' : 'transparent' }}>||</Btn>
                                                        {each.id !== '1' ?
                                                            <Btn onClick={() => OnDeleteConditionSet(selectedFormData.id, each.id)}><MdClear /></Btn> : null
                                                        }
                                                    </ButtonsSection>
                                                </FilterContainer>
                                            ))}
                                        </CustomFieldContainer>
                                    )
                                }

                                {selectedFormData.data.coreAction ? (
                                    <CustomFieldContainer>
                                        <CustomDropdownContainer isOpen={isActionResponseDropdownOpen} ref={ActionResponseDropDownSearchCloseHandle}>
                                            <NewCustomDropDown onClick={handleActionResponseDropDownToggle}>
                                                {getActionResponseValue(selectedFormData.id)}
                                                <FaAngleDown style={{ transform: `rotate(${isDropdownOpen ? '180deg' : '0deg'})` }} />
                                            </NewCustomDropDown>

                                            {isActionResponseDropdownOpen && (
                                                <CustomDrpdownOptions>
                                                    <DropdownSearchBox
                                                        type="text"
                                                        placeholder="Search..."
                                                        value={searchValueActionResponse}
                                                        onChange={(e) => setsearchValueActionResponse(e.target.value)}
                                                    />
                                                    <OptionsContainer>
                                                        {CoreActions[selectedNode.data.coreAction].map(option => (
                                                            <DropdownOptions
                                                                key={option}
                                                                data-option-value={option} // Attach a custom attribute
                                                                onClick={() => HandleActionResponse(option, selectedFormData.id)}
                                                            >
                                                                {option}
                                                            </DropdownOptions>
                                                        ))}
                                                    </OptionsContainer>
                                                </CustomDrpdownOptions>
                                            )}
                                        </CustomDropdownContainer>
                                    </CustomFieldContainer>
                                ) : null}

                                <CustomFieldContainer>
                                    <InputTag
                                        type="text"
                                        maxLength="50"
                                        placeholder="Enter Description..."
                                        value={flowData.data.description}
                                        onChange={(e) => onChangeDescription(e.target.value, selectedFormData.id)}
                                    />
                                </CustomFieldContainer>

                                <CustomFieldContainer>
                                    <TextAreaTag2
                                        placeholder="Add Comments..."
                                        value={getNodeComments(selectedFormData.id)}
                                        onChange={(e) => onChangeTriggerComments(e.target.value, selectedFormData.id)}
                                    />
                                </CustomFieldContainer>
                            </NodeConfigContainer>
                        )}
                    </RightTabContent>
                )
            }}
        </WonContext.Consumer>
    )
}

export default Response