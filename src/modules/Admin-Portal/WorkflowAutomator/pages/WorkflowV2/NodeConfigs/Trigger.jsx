import { useState, useEffect, useRef } from "react";

import {
    CustomDrpdownOptions, CustomDropdownContainer, CustomFieldContainer, DropdownOptions,
    DropdownSearchBox, H1Tag, InputTag, NewCustomDropDown, NodeConfigContainer,
    OptionsContainer, RightTabContent, StyledDropDown, StyledItem, StyledMenu,
    StyledToggle, TextAreaTag2, CustomPara,
} from '../StyledComponents'

import dummyTableNames from '../TableDummyData'
import { getAllTableNames } from "../../../../../../utils/CheckAndExecuteFlows/CRUDoperations";
import _ from 'lodash';

import { FaAngleDown } from "react-icons/fa";

import WonContext from "../../../../../../context/WonContext";
import { BsJustify } from "react-icons/bs";

const DropdownBtnStyles1 = {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    color: '#000',
    padding: '0px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
}

const logicalOperatorOptions = [
    {
        value: "created",
        label: "On Creation",
    },
    {
        value: "updated",
        label: "On Updation",
    },
    {
        value: "deletion",
        label: "On Deletion",
    },
    {
        value: "create or update",
        label: "On Creation/Updation",
    },
]

const WhoCanAccessList = [
    'Admin',
    'Super Admin',
    'User',
    'External User'
]

const Trigger = ({ selectedFormData, setTable, setFlowData, flowData }) => {
    const [access, setAccess] = useState()

    //<<<<< STATE FOR CUSTOM SEARCH DROPDOWN
    const [isDropdownOpen, setDropdownOpen] = useState(false)
    const [accessDropDown, setAccessDropdown] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [tableNames, setTableNames] = useState([])
    const TableDropDownSearchCloseHandle = useRef(null)
    const WhoCanAccessOutsideClose = useRef(null)

    const handleDropDownToggle = () => setDropdownOpen(!isDropdownOpen)

    const handlewhoCanAccessDropdown = () => setAccessDropdown(!accessDropDown)

    useEffect(() => {
        getTableNames()
        const handleOutSideClick = (event) => {
            if (TableDropDownSearchCloseHandle.current && !TableDropDownSearchCloseHandle.current.contains(event.target)) {
                setDropdownOpen(false)
            } if (WhoCanAccessOutsideClose.current && !WhoCanAccessOutsideClose.current.contains(event.target)) {
                setAccessDropdown(false)
            }
        }
        document.addEventListener('click', handleOutSideClick)

        return () => {
            document.removeEventListener('click', handleOutSideClick)
        }

    }, [setDropdownOpen])

    const getTableNames = async () => {
        const data = await getAllTableNames()
        setTableNames(data)
    }

    return (
        <WonContext.Consumer>
            {value => {
                const { setactiveFlowData } = value

                const selectedNode = flowData.data.activeNodes.find((each) => each.id === selectedFormData.id)

                const Access = selectedNode && selectedNode.data.whoCanAccess ? selectedNode.data.whoCanAccess : null;
                setAccess(access)

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
                    }
                    )
                }

                const onChangeTriggerValue = (e, NodeId) => {
                    setFlowData({
                        ...flowData,
                        data: {
                            activeNodes: flowData.data.activeNodes.map((each) =>
                                each.id === NodeId
                                    ? { ...each, data: { ...each.data, trigger: e } }
                                    : each),
                            activeEdges: flowData.data.activeEdges
                        }
                    })
                }

                const getNodeTrigger = (NodeId) => {
                    const selectedNode = flowData.data.activeNodes.find((node) => node.id === NodeId)
                    return selectedNode && selectedNode.data.trigger ? selectedNode.data.trigger : 'Select Trigger...'
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

                const WhoCanAccessTrigger = (e, NodeId) => {
                    flowData({
                        ...flowData,
                        data: {
                            activeNodes: flowData.data.activeNodes.map((each) =>
                                each.id === NodeId
                                    ? { ...each, data: { ...each.data, whoCanAccess: e } }
                                    : each),
                            activeEdges: flowData.data.activeEdges
                        }
                    })
                }

                ///STATE FOR CUSTOM SEARCH DROPDOWN >>>>>

                const handleAccessCheckBox = (accessOption, selectedNode) => {
                    const x = _.xor(access, [accessOption])
                    setAccess(_.xor(access, [accessOption]));
                    WhoCanAccessTrigger(x, selectedNode)
                }

                return (
                    <RightTabContent>
                        <H1Tag>Trigger Configuration</H1Tag><br />

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

                                <CustomFieldContainer>
                                    <StyledDropDown >
                                        <StyledToggle id="operator" style={DropdownBtnStyles1}>
                                            <CustomPara>{getNodeTrigger(selectedFormData.id)}</CustomPara>
                                        </StyledToggle>

                                        <StyledMenu>
                                            {logicalOperatorOptions.map((option) => (
                                                <StyledItem key={option.value}
                                                    value={option.value}
                                                    onClick={() => onChangeTriggerValue(option.label, selectedFormData.id)}
                                                >
                                                    {option.label}
                                                </StyledItem>
                                            ))}
                                        </StyledMenu>
                                    </StyledDropDown>
                                </CustomFieldContainer>

                                {selectedFormData.data.label === 'Trigger' &&
                                    <CustomFieldContainer >
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
                                                                data-option-value={option}
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

                                <CustomFieldContainer>
                                    <TextAreaTag2
                                        placeholder="Add Comments..."
                                        value={getNodeComments(selectedFormData.id)}
                                        onChange={(e) => onChangeTriggerComments(e.target.value, selectedFormData.id)}
                                    />
                                </CustomFieldContainer>

                                <CustomFieldContainer>
                                    <CustomDropdownContainer isOpen={accessDropDown} ref={WhoCanAccessOutsideClose}>
                                        <NewCustomDropDown onClick={handlewhoCanAccessDropdown}>
                                            who can access
                                            <FaAngleDown style={{ transform: `rotate(${accessDropDown ? '180deg' : '0deg'})` }} />
                                        </NewCustomDropDown>

                                        {accessDropDown && (
                                            <CustomDrpdownOptions>
                                                <OptionsContainer>
                                                    {WhoCanAccessList.map(option => (
                                                        <DropdownOptions
                                                            key={option}
                                                        >
                                                            <input id={option} type="checkbox" style={{ marginLeft: '3px' }}
                                                                checked={Access ? Access.includes(option) : null}
                                                                onChange={() => handleAccessCheckBox(option, selectedFormData.id)} />
                                                            <label htmlFor={option} style={{ marginLeft: '10px' }}>{option}</label>
                                                        </DropdownOptions>
                                                    ))}
                                                </OptionsContainer>
                                            </CustomDrpdownOptions>
                                        )}
                                    </CustomDropdownContainer>
                                </CustomFieldContainer>
                            </NodeConfigContainer>
                        )}
                    </RightTabContent>
                )
            }}
        </WonContext.Consumer>
    )
}

export default Trigger