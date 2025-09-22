import { useState, useRef, useEffect } from "react";

import moment from 'moment-timezone';
import { getYear, getMonth, addMonths, subMonths, setYear, setMonth } from 'date-fns';
import _ from 'lodash'

import { FaAngleDown } from "react-icons/fa";
import { TbAmpersand } from "react-icons/tb";
import { FaGripLinesVertical } from "react-icons/fa";
import { MdOutlineRemoveCircle } from "react-icons/md";
import WonContext from "../../../../../../context/WonContext";
import CustomDatePicker from "./DateTimePicker/CustomDatePicker";
import DateTimePicker from "./DateTimePicker/DateTimePicker";
import { getAllTableNames, getTableColumnNames } from "../../../../../../utils/CheckAndExecuteFlows/CRUDoperations";

import {
    CustomDrpdownOptions, CustomDropdownContainer, CustomFieldContainer,
    CustomPara, DropdownOptions, DropdownSearchBox, H1Tag, ReactSelect,
    InputTag, NewCustomDropDown, NodeConfigContainer, OptionsContainer,
    RightTabContent, StyledDropDown, StyledItem, StyledMenu, StyledToggle,
    TextAreaTag2, FilterContainer, ButtonsSection, Btn, ValueInput,
} from '../StyledComponents'

import {
    DatepickersContainer, CustomSpan
} from './StyledComponents'

import "react-datepicker/dist/react-datepicker.css";

import dummyTableNames from '../TableDummyData'
import { filterConditionOperations } from '../ReactflowPro/ExpandAndCollapse/initialElements'

const DropdownBtnStyles1 = {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    color: '#000',
    padding: '0px',
}

const FlowLogicListForConfigure = [
    'If',
    'Else If',
    'Else',
    'For Each',
    'Do The following Until',
    'Do The following Inparallel',
    'Make A Decision',
    'Wait For A Duration Of Time',
    'Call A Workflow',
    'End Flow',
    'Dynamic Flow',
    'Get Flow Outputs',
    'Set Flow Variables',
    'Try'
]

const range = (start, end, step) => _.range(start, end + step, step);

const Configure = ({ selectedFormData, setTable, flowData, setFlowData }) => {

    const TableDropDownSearchCloseHandle = useRef(null)
    const [isDropdownOpen, setDropdownOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [tableNames, setTableNames] = useState([])
    const [tableColumns, setTableColumnNames] = useState([])
    const [startDate, setStartDate] = useState(new Date());

    // const [selectedDate, setSelectedDate] = useState(new Date());
    const [timezone, setTimezone] = useState(moment.tz.guess());
    const [isPickerOpen, setPickerOpen] = useState(false);
    const years = range(1990, getYear(new Date()) + 1, 1)

    useEffect(() => {
        getTableNames()
        getColumnNames()
    }, [])

    const getTableNames = async () => {
        const data = await getAllTableNames()
        setTableNames(data)
    }

    const getColumnNames = async () => {
        const tableName = flowData.data.activeNodes.filter(node => node.id === selectedFormData.id)[0].data.table
        const columns = await getTableColumnNames(tableName)
        // console.log(columns)
        setTableColumnNames(columns.columns)
    }

    const handleDropDownToggle = () => setDropdownOpen(!isDropdownOpen)

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

    // console.log(tableColumns)

    return (
        <WonContext.Consumer>
            {value => {
                const { setactiveFlowData } = value

                const activeNode = flowData.data.activeNodes.filter(node => node.id === selectedFormData.id)[0]

                const selectedNode = flowData.data.activeNodes.find((each) => each.id === selectedFormData.id)

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

                const OnTriggerLogicalOperators = (operator, NodeId, conditionObjId) => {
                    setFlowData({
                        ...flowData,
                        data: {
                            activeNodes: flowData.data.activeNodes.map(each => {
                                if (each.id === NodeId) {
                                    const newConditionData = {
                                        id: (each.data.flowLogicConditions.length + 1).toString(),
                                        filter: '',
                                        condition: '',
                                        event: '',
                                        logicalOperator: '',
                                    }

                                    const conditionsArray = each.data.flowLogicConditions.map((con) => {
                                        {/* console.log(con) */ }
                                        if (con.id === conditionObjId) {
                                            return { ...con, logicalOperator: operator }
                                        }
                                        return con
                                    })

                                    const index = each.data.flowLogicConditions.indexOf(each.data.flowLogicConditions.find(con => con.id === conditionObjId))

                                    const insertedData = conditionsArray.splice(index + 1, 0, newConditionData)

                                    console.log(conditionsArray)

                                    return {
                                        ...each,
                                        data: {
                                            ...each.data,
                                            flowLogicConditions: [...conditionsArray.splice(index + 1, 0, newConditionData)]

                                        }
                                    }
                                }
                                return each
                            }),
                            activeEdges: flowData.data.activeEdges
                        }
                    })

                }

                const getNodeTicketType = (NodeId) => {
                    const selectedNode = flowData.data.activeNodes.find((node) => node.id === NodeId);
                    return selectedNode && selectedNode.data && selectedNode.data.flowLogic ? selectedNode.data.flowLogic : 'Configure...';
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

                const onChangeFlowLogicValue = (e, NodeId) => {
                    setFlowData({
                        ...flowData,
                        data: {
                            activeNodes: flowData.data.activeNodes.map((each) =>
                                each.id === NodeId
                                    ? { ...each, data: { ...each.data, flowLogic: e } }
                                    : each),
                            activeEdges: flowData.data.activeEdges
                        }
                    })
                }

                const OnDeleteConditionSet = (NodeId, conditionObjId) => {
                    setFlowData({
                        activeNodes: flowData.data.activeNodes.map(each =>
                            each.id === NodeId
                                ? {
                                    ...each,
                                    data: {
                                        ...each.data,
                                        flowLogicConditions: each.data.flowLogicConditions.filter(condition => condition.id !== conditionObjId)
                                    }
                                }
                                : each
                        ).map(node => {
                            if (node.id === NodeId && node.data.flowLogicConditions.length <= 1) {
                                return {
                                    ...node,
                                    data: {
                                        ...node.data,
                                        flowLogicConditions: node.data.flowLogicConditions.map((condition, index) => ({
                                            ...condition,
                                            operator: index === node.data.flowLogicConditions.length - 1 ? '' : condition.operator
                                        }))
                                    }
                                };
                            }
                            return node;
                        }),
                        activeEdges: flowData.data.activeEdges
                    })
                }

                const getConfigureNodeConditions = (NodeId, id, conditionType) => {
                    const selectedNode = flowData.data.activeNodes.find((node) => node.id === NodeId);
                    if (selectedNode && selectedNode.data.flowLogicConditions) {
                        const condition = selectedNode.data.flowLogicConditions.find((cond) => cond.id === id);
                        {/* console.log(condition[conditionType]) */ }
                        if (condition) {
                            if (conditionType === 'filter') {
                                return condition[conditionType] ? condition[conditionType] : { name: 'Choose Field...' }
                            } else if (conditionType === 'operation') {
                                return condition[conditionType] ? condition[conditionType] : 'Operation...'
                            } else if (conditionType === 'Value') {
                                return condition[conditionType] ? condition[conditionType] : 'Value...'
                            }
                            console.log(condition[conditionType] || 'hey heyu')
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
                                            flowLogicConditions: each.data.flowLogicConditions.map(condition =>
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
                    }
                    )

                    setDropdownOpen(false)
                }

                const getFilterCondition = (id) => {
                    const filterCondition = activeNode.data.flowLogicConditions.find(condition => condition.id === id)
                    const type = filterCondition.filter.type
                    return filterCondition
                }

                const updateFitlerConditionValue = (value, id) => {
                    setFlowData({
                        ...flowData,
                        data: {
                            activeNodes: flowData.data.activeNodes.map((each) =>
                                each.id === activeNode.id
                                    ? {
                                        ...each, data: {
                                            ...each.data,
                                            flowLogicConditions: each.data.flowLogicConditions.map(item => item.id === id ? { ...item, value: value } : item)
                                        }
                                    }
                                    : each),
                            activeEdges: flowData.data.activeEdges
                        }
                    }
                    )
                }

                const getFilerType = (filterId) => {
                    const filterCondition = getFilterCondition(filterId)
                    const type = filterCondition.filter.type
                    const value = filterCondition.value

                    switch (type) {
                        case 'int':
                            return <ValueInput
                                type='number'
                                value={value}
                                placeholder="Enter value"
                                onChange={(e) => updateFitlerConditionValue(e.target.value, filterId)}
                            />
                        case 'datetime':
                            return (
                                filterCondition.operation !== 'Between' ?
                                    <div>
                                        <CustomDatePicker id='custom_picker1' />
                                    </div> :
                                    <DatepickersContainer>
                                        <CustomDatePicker id='custom_picker1' />
                                        <CustomSpan></CustomSpan>
                                        <DateTimePicker id='custom_picker2' />
                                    </DatepickersContainer>
                            )
                        case 'varchar':
                            return <ValueInput
                                type='text'
                                value={value}
                                placeholder="Enter value"
                                onChange={(e) => updateFitlerConditionValue(e.target.value, filterId)}
                            />
                        case 'enum':
                            return (
                                <div style={{ width: '40%', borderRadius: '50px' }}>
                                    <ReactSelect
                                        options={options}
                                        multi
                                        values={options.filter((data) => selectedValues.includes(data.label))}
                                        onChange={(value) => console.log(value)}
                                    />
                                </div>
                            )
                        case 'json':
                            return <ValueInput
                                type='text'
                                value={value}
                                placeholder="Enter value"
                                onChange={(e) => updateFitlerConditionValue(e.target.value, filterId)}
                            />
                        default:
                            return null
                    }
                }

                return (
                    <RightTabContent>
                        <H1Tag>Configure configuration</H1Tag>
                        <br />
                        {selectedFormData && typeof selectedFormData === 'object' && (

                            <NodeConfigContainer>
                                <CustomFieldContainer>
                                    <InputTag
                                        type="text"
                                        // maxlength="15"
                                        placeholder="Enter Label..."
                                        value={getNodeCustomLabel(selectedFormData.id)}
                                        onChange={(e) => updateCustomLabel(e.target.value, selectedFormData.id)}
                                    />
                                </CustomFieldContainer>

                                <CustomFieldContainer>
                                    <StyledDropDown>
                                        <StyledToggle id="operationType" style={DropdownBtnStyles1}>
                                            <CustomPara>{getNodeTicketType(selectedFormData.id)}</CustomPara>
                                        </StyledToggle>

                                        <StyledMenu>
                                            {FlowLogicListForConfigure.map((option) => (
                                                <StyledItem key={option}
                                                    value={option}
                                                    onClick={() => onChangeFlowLogicValue(option, selectedFormData.id)}
                                                >
                                                    {option}
                                                </StyledItem>
                                            ))}
                                        </StyledMenu>
                                    </StyledDropDown>
                                </CustomFieldContainer>

                                {selectedFormData.data.label === 'Configure' &&
                                    <CustomFieldContainer>
                                        <CustomDropdownContainer isOpen={isDropdownOpen} ref={TableDropDownSearchCloseHandle}>
                                            <NewCustomDropDown onClick={handleDropDownToggle}>
                                                {getNodeTriggerTable(selectedFormData.id)}
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
                                                        {tableNames.map(option => (
                                                            <DropdownOptions
                                                                key={option}
                                                                data-option-value={option} // Attach a custom attribute
                                                                isSelected={getNodeTriggerTable(selectedFormData.id) === option}
                                                                onClick={() => onChangeTriggerTable(option, selectedFormData.id)}
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

                                {selectedNode && selectedNode.data.flowLogicConditions && getNodeTriggerTable(selectedFormData.id) !== 'Select Table...' && (
                                    <CustomFieldContainer style={{ flexDirection: 'column' }}>
                                        {selectedNode.data.flowLogicConditions.map((each, index) => (
                                            <FilterContainer key={index} style={{ marginBottom: '0px' }}>
                                                <StyledDropDown style={{ marginRight: '0px' }}>
                                                    <StyledToggle id="operator" style={DropdownBtnStyles1}>
                                                        <CustomPara>
                                                            {getConfigureNodeConditions(selectedFormData.id, each.id, 'filter').name}
                                                        </CustomPara>
                                                    </StyledToggle>

                                                    {selectedNode.flowLogic !== '' && (
                                                        <StyledMenu>
                                                            {tableColumns ? tableColumns.map(option => (
                                                                <StyledItem
                                                                    key={option.name}
                                                                    value={option.name}
                                                                    onClick={() => onChangeConfigureConditions(option, selectedFormData.id, each.id, 'filter')}
                                                                >
                                                                    {option.name}
                                                                </StyledItem>
                                                            )) : null}
                                                        </StyledMenu>
                                                    )}
                                                </StyledDropDown>

                                                <StyledDropDown style={{ marginRight: '0px' }}>
                                                    <StyledToggle id="operator" style={DropdownBtnStyles1}>
                                                        <CustomPara>{getConfigureNodeConditions(selectedFormData.id, each.id, 'operation')}</CustomPara>
                                                    </StyledToggle>

                                                    <StyledMenu>
                                                        {filterConditionOperations.map(option => {
                                                            return (option.typeFor.split('/').includes(getFilterCondition(each.id).filter.type) ?
                                                                <StyledItem
                                                                    key={option.name}
                                                                    value={option.name}
                                                                    onClick={() => onChangeConfigureConditions(option.name, selectedFormData.id, each.id, 'operation')}
                                                                >
                                                                    {option.name}
                                                                </StyledItem>

                                                                : null)
                                                        }
                                                        )}
                                                    </StyledMenu>
                                                </StyledDropDown>

                                                {getFilerType(each.id)}

                                                <ButtonsSection>
                                                    <Btn
                                                        onClick={() => OnTriggerLogicalOperators('AND', selectedFormData.id, each.id)}
                                                        style={{ background: each.logicalOperator === 'AND' ? '#90e0ef' : 'transparent' }}
                                                    >
                                                        <TbAmpersand />
                                                    </Btn>

                                                    <Btn
                                                        onClick={() => OnTriggerLogicalOperators('OR', selectedFormData.id, each.id)}
                                                        style={{ background: each.logicalOperator === 'OR' ? '#90e0ef' : 'transparent' }}
                                                    >
                                                        <FaGripLinesVertical />
                                                    </Btn>

                                                    {each.id !== '1' ?
                                                        <Btn
                                                            deleteIcon
                                                            onClick={() => OnDeleteConditionSet(selectedFormData.id, each.id)}
                                                        >
                                                            <MdOutlineRemoveCircle size={15} />
                                                        </Btn>
                                                        : null
                                                    }
                                                </ButtonsSection>
                                            </FilterContainer>
                                        ))}
                                    </CustomFieldContainer>
                                )}

                                {/* SUB FLOW LOGIC CONDITIONS */}

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

export default Configure