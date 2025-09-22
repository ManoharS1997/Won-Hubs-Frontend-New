
import { useState, useRef } from "react";

import {
    CustomDrpdownOptions,
    CustomDropdownContainer,
    CustomFieldContainer,
    DropdownOptions,
    DropdownSearchBox,
    InputTag,
    LabelTag,
    NewCustomDropDown,
    NodeConfigContainer,
    OptionsContainer,
    StyledDropDown,
    StyledItem,
    StyledMenu,
    StyledToggle
} from './StyledComponents'

import { FaAngleDown } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { CiFilter } from "react-icons/ci";

export default function RightPanalTabs({
    activeRightTab, isRightPanalActive, selectedFormData,
    conditionValue, onSetConditionValue,
    nodes, logicalOperatorOptions, setConditionValue

}) {
    const [filter, setFilter] = useState('')
    const [filterCondition, setFilterConditionValue] = useState('')
    const [filterCondition2, setFilterConditionValue2] = useState('')
    const [NodeDescription, setNodeDescription] = useState('')
    const [TicketType, setTicketType] = useState('')
    const [trigger, setTrigger] = useState('')
    const [table, setTable] = useState('')

    //<<<<< STATE FOR CUSTOM SEARCH DROPDOWN
    const [isDropdownOpen, setDropdownOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const TableDropDownSearchCloseHandle = useRef(null)

    const DropdownBtnStyles1 = {
        width: '95%',
        height: '100%',
        backgroundColor: '#fff',
        color: '#000',
        padding: '0px',
    }

    const TicketTypeOptions = [
        { value: "issue", label: "Issue" },
        { value: "request", label: "Request" },
        { value: "query", label: "Query" },
    ];

    const FilterColumnNames = [
        'user_id',
        'username',
        'email',
        'password',
        'first_name',
        'last_name',
        'date_of_birth',
        'created_at',
        'updated_at',
    ]

    const FilterConditions = [
        'On',
        'Not On',
        'Is',
        'Is Not'
    ]

    const FilterConditions2 = [
        'Not Yet Requested',
        'Requested',
        'Approved',
        'Rejected',
        'Cancelled',
        'No Longer Required',
        'Skipped'
    ]

    const dummyTableNames = [
        'users',
        'products',
        'orders',
        'customers',
        'employees',
        'departments',
        'invoices',
        'categories',
        'transactions',
        'addresses',
        'inventory',
        'suppliers',
        'shipments',
        'payments',
        'reviews',
        'messages',
        'notifications',
        'events',
        'attendees',
        'subscriptions',
        'blogs',
        'comments',
        'likes',
        'favorites',
        'polls',
        'surveys',
        'pollResponses',
        'appointments',
        'tasks',
        'settings'
    ];

    const onChangeDescriptionValue = (e, NodeId) => {
        setNodeDescription(e)

        setNodes((prevNodes) => prevNodes.map((each) =>
            each.id === NodeId
                ? { ...each, data: { ...each.data, description: e } }
                : each
        ));
    }

    const onChangeTicketTypeValue = (e, NodeId) => {
        setTicketType(e)
        setNodes((prevNodes) => prevNodes.map((each) =>
            each.id === NodeId
                ? { ...each, data: { ...each.data, TicketType: e } }
                : each
        ));
    }

    const handleDropDownToggle = () => setDropdownOpen(!isDropdownOpen)

    const HandleOperations = (operation, selectedNode) => onChangeTicketTypeValue(operation, selectedNode)

    const HandleTrigger = (operation, selectedNode) => onChangeTriggerValue(operation, selectedNode)

    const HandleTriggerTable = (operation, selectedNode) => {
        onChangeTriggerTable(operation, selectedNode)
        setDropdownOpen(false)
    }

    const getNodeTicketType = (NodeId) => {
        const selectedNode = nodes.find((node) => node.id === NodeId);
        return selectedNode && selectedNode.data && selectedNode.data.TicketType ? selectedNode.data.TicketType : 'Select Ticket Type...';
    };

    const getNodeTrigger = (NodeId) => {
        const selectedNode = nodes.find((node) => node.id === NodeId)
        return selectedNode && selectedNode.data.trigger ? selectedNode.data.trigger : 'Select Trigger...'
    }

    const getNodeTriggerTable = (NodeId) => {
        const selectedNode = nodes.find((node) => node.id === NodeId);
        return selectedNode && selectedNode.data.table ? selectedNode.data.table : 'Select Table...';
    };

    const getNodeCustomLabel = (NodeId) => {
        const selectedNode = nodes.find((node) => node.id === NodeId)
        return selectedNode ? selectedNode.data.customLabel : ''
    }

    const getNodeDescription = (NodeId) => {
        const selectedNode = nodes.find((node) => node.id === NodeId)
        return selectedNode ? selectedNode.data.description : ''
    }

    const onChangeDescription = (e, selectedNode) => onChangeDescriptionValue(e, selectedNode)

    const setFilterColumn = (value) => setFilter(value)

    const SetFilterCondition = (value) => setFilterConditionValue(value)

    const SetFilterCondition2 = (value) => setFilterConditionValue2(value)

    const onChangeTriggerValue = (e, NodeId) => {
        setTrigger(e)
        setNodes((prevNodes) => prevNodes.map((each) =>
            each.id === NodeId
                ? { ...each, data: { ...each.data, trigger: e } }
                : each
        ));
    }

    const filteredDropdownOptions = dummyTableNames.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <NodeConfigContainer>
            <CustomFieldContainer>
                <LabelTag htmlFor="operationType">Ticket Type : </LabelTag>
                
                <StyledDropDown>
                    <StyledToggle id="operationType" style={DropdownBtnStyles1}>
                        <p style={{ marginLeft: '5px', fontSize: '0.9rem' }}>{TicketType === '' ? 'Select Ticket Type...' : getNodeTicketType(selectedFormData !== undefined ? selectedFormData.id : null)}</p>
                    </StyledToggle>
                    
                    <StyledMenu>
                        {TicketTypeOptions.map((option) => (
                            <StyledItem key={option.value} value={option.value} onClick={() => HandleOperations(option.label, selectedFormData.id)}> {option.label}</StyledItem>
                        ))}
                    </StyledMenu>
                </StyledDropDown>
                
            </CustomFieldContainer>

            <CustomFieldContainer>
                <LabelTag>Trigger : </LabelTag>
                <StyledDropDown>
                    <StyledToggle id="operator" style={DropdownBtnStyles1}>
                        <p style={{ marginLeft: '5px', fontSize: '0.9rem' }}>{trigger === '' ? 'Select Trigger...' : getNodeTrigger(selectedFormData.id)}</p>
                    </StyledToggle>
                    <StyledMenu>
                        {logicalOperatorOptions.map((option) => (
                            <StyledItem key={option.value} value={option.value} onClick={() => HandleTrigger(option.label, selectedFormData.id)}> {option.label}</StyledItem>
                        ))}
                    </StyledMenu>
                </StyledDropDown>
            </CustomFieldContainer>

            <CustomFieldContainer >
                <LabelTag>Table :</LabelTag>

                <CustomDropdownContainer ref={TableDropDownSearchCloseHandle}>
                    <NewCustomDropDown onClick={handleDropDownToggle}>
                        {table !== '' ? table : getNodeTriggerTable('selectedFormData.id')}
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
                                {filteredDropdownOptions.map((option) => (
                                    <DropdownOptions
                                        key={option}
                                        data-option-value={option} // Attach a custom attribute
                                        onClick={() => HandleTriggerTable(option, selectedFormData.id)}
                                    >
                                        {option}
                                    </DropdownOptions>
                                ))}
                            </OptionsContainer>
                        </CustomDrpdownOptions>
                    )}
                </CustomDropdownContainer>

            </CustomFieldContainer>

            <CustomFieldContainer style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <LabelTag>Condition :</LabelTag>

                <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                    <CiFilter size={32} style={{ marginBottom: '1px' }} />

                    <StyledDropDown style={{ width: '38%', height: '25px', marginRight: '4px' }}>
                        <StyledToggle id="operator" style={DropdownBtnStyles1}>
                            <p style={{ marginLeft: '5px' }}>{filter ? filter : 'Filter'}</p>
                        </StyledToggle>
                        
                        <StyledMenu style={{ width: '60px', }}>
                            {FilterColumnNames.map((option) => (
                                <StyledItem key={option} value={option} onClick={() => setFilterColumn(option)}> {option}</StyledItem>
                            ))}
                        </StyledMenu>
                    </StyledDropDown>

                    <StyledDropDown style={{ width: '38%', height: '25px', marginRight: '4px' }}>
                        <StyledToggle id="operator" style={DropdownBtnStyles1}>
                            <p style={{ marginLeft: '5px' }}>{filterCondition ? filterCondition : 'Condition'}</p>
                        </StyledToggle>
                        
                        <StyledMenu>
                            {FilterConditions.map((option) => (
                                <StyledItem key={option} value={option} onClick={() => SetFilterCondition(option)}> {option}</StyledItem>
                            ))}
                        </StyledMenu>
                    </StyledDropDown>

                    <StyledDropDown style={{ width: '38%', height: '25px', marginRight: '4px' }}>
                        <StyledToggle id="operator" style={DropdownBtnStyles1}>
                            <p style={{ marginLeft: '5px' }}>{filterCondition2 ? filterCondition2 : 'Condition 2'}</p>
                        </StyledToggle>
                        
                        <StyledMenu>
                            {FilterConditions2.map((option) => (
                                <StyledItem key={option} value={option} onClick={() => SetFilterCondition2(option)}> {option}</StyledItem>
                            ))}
                        </StyledMenu>
                    </StyledDropDown>

                    <button style={{ height: '25px', width: 'fit-content', display: 'flex', alignItems: 'center', background: '#fff', color: '#000', border: '1px solid #ccc', marginRight: '4px', padding: '4px' }}>OR</button>
                    <button style={{ height: '25px', width: 'fit-content', display: 'flex', alignItems: 'center', background: '#fff', color: '#000', border: '1px solid #ccc', marginRight: '4px', padding: '4px' }}>AND</button>
                    <button style={{ height: '25px', width: 'fit-content', display: 'flex', alignItems: 'center', background: '#fff', color: 'red', border: '1px solid #ccc', padding: '4px', borderRadius: '50%' }}><MdClear /></button>
                </div>
            </CustomFieldContainer>

            <CustomFieldContainer>
                <LabelTag>Label :</LabelTag>
                <InputTag
                    type="text"
                    maxlength="15"
                    value={conditionValue !== "" ? conditionValue : getNodeCustomLabel('selectedFormData.id')}
                    onChange={(e) => setConditionValue(e.target.value, 'selectedFormData.id')}
                />
            </CustomFieldContainer>

            <CustomFieldContainer>
                <LabelTag>Description :</LabelTag>
                <InputTag
                    type="text"
                    maxLength="50"
                    value={NodeDescription || getNodeDescription('selectedFormData.id')}
                    onChange={(e) => onChangeDescription(e.target.value, selectedFormData.id)}
                />
            </CustomFieldContainer>
        </NodeConfigContainer>)
}