import { useState, useEffect, useRef } from "react";
import { FaAngleDown } from "react-icons/fa";
import 'react-calendar/dist/Calendar.css';
import _ from 'lodash'

import WonContext from "../../../../../../context/WonContext";

import {
    CustomFieldContainer,
    H1Tag,
    InputTag,
    NodeConfigContainer,
    RightTabContent,
    TextAreaTag2,
    CustomDropdownContainer,
    NewCustomDropDown,
    CustomDrpdownOptions,
    OptionsContainer,
    DropdownOptions,

} from '../StyledComponents'

import { MyCalenderContainer, StyledCalender, PTag, CustomDateBtn, CustomDateContainer, CalenderContainer } from './StyledComponents'

const scheduleOptions = [
    'Daily',
    'Weekly',
    'Monthly',
    'Custom'
]

const Schedule = ({
    activeRightTab,
    isRightPanalActive,
    selectedFormData,
    onChangeCustomLabel,
    nodes,
    onChangeTriggerComments,
    onChangeSchedule,
    flowData,
    setFlowData
}) => {

    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = date => {
        setSelectedDate(date);
        // toggleCalendar();
    };

    //<<<<< STATE FOR CUSTOM SEARCH DROPDOWN  -----------------------------------------------
    const [isDropdownOpen, setDropdownOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const ScheduleDropdownCloseHandle = useRef(null)

    const handleDropDownToggle = () => setDropdownOpen(!isDropdownOpen)

    const scheduleDropdownOptions = scheduleOptions.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()))

    useEffect(() => {
        const handleOutSideClick = (event) => {
            if (ScheduleDropdownCloseHandle.current && !ScheduleDropdownCloseHandle.current.contains(event.target)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('click', handleOutSideClick)

        return () => {
            document.removeEventListener('click', handleOutSideClick)
        }
    }, [setDropdownOpen])
    /// STATE FOR CUSTOM SEARCH DROPDOWN >>>>> ---------------------------------------------------

    // console.log(showCalendar)

    return (
        <WonContext.Consumer>
            {value => {
                const { setactiveFlowData } = value

                {/* const AFNodes = activeFlowData.activeNodes */ }

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

                const scheduleResponse = (NodeId) => {
                    const selectedNode = flowData.data.activeNodes.find((node) => node.id === NodeId);
                    return selectedNode && selectedNode.data.schedule ? selectedNode.data.schedule : 'Schedule...';
                };

                const onChangeSchedule = (e, NodeId) => {
                    setFlowData({
                        ...flowData,
                        data: {
                            activeNodes: flowData.data.activeNodes.map((each) =>
                                each.id === NodeId
                                    ? { ...each, data: { ...each.data, schedule: e } }
                                    : each),
                            activeEdges: flowData.data.activeEdges
                        }
                    })
                }

                const HandleScheduleSelection = (option, selectedNodeId) => {
                    onChangeSchedule(option, selectedNodeId)
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


                return (
                    <RightTabContent>

                        <H1Tag>Schedule Configuration</H1Tag>
                        <br />
                        {selectedFormData && typeof selectedFormData === 'object' && (

                            <NodeConfigContainer>
                                <CustomFieldContainer>
                                    <InputTag
                                        type="text"
                                        placeholder="Enter Label..."
                                        value={getNodeCustomLabel(selectedFormData.id)}
                                        onChange={(e) => updateCustomLabel(e.target.value, selectedFormData.id)}
                                    />
                                </CustomFieldContainer>

                                <CustomFieldContainer >
                                    <CustomDropdownContainer isOpen={isDropdownOpen} ref={ScheduleDropdownCloseHandle}>
                                        <NewCustomDropDown onClick={handleDropDownToggle}>
                                            {scheduleResponse(selectedFormData.id)}
                                            <FaAngleDown style={{ transform: `rotate(${isDropdownOpen ? '180deg' : '0deg'})` }} />
                                        </NewCustomDropDown>

                                        {isDropdownOpen && (
                                            <CustomDrpdownOptions>
                                                {/* <DropdownSearchBox
                                                    type="text"
                                                    placeholder="Search..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                /> */}

                                                <OptionsContainer>
                                                    {scheduleDropdownOptions.map(option => (
                                                        <DropdownOptions
                                                            key={option}
                                                            data-option-value={option} // Attach a custom attribute
                                                            onClick={() => HandleScheduleSelection(option, selectedFormData.id)}
                                                        >
                                                            {option}
                                                        </DropdownOptions>
                                                    ))}
                                                </OptionsContainer>
                                            </CustomDrpdownOptions>
                                        )}
                                    </CustomDropdownContainer>

                                </CustomFieldContainer>

                                {scheduleResponse(selectedFormData.id) === 'Custom' ?
                                    (<CustomFieldContainer>
                                        <CustomDateContainer isOpen={true}>
                                            <PTag>Selected Date: {selectedDate.toLocaleDateString()}</PTag>
                                            <CustomDateBtn onClick={() => setShowCalendar(!showCalendar)}>
                                                {showCalendar ? 'Close' : 'Select Date'}
                                            </CustomDateBtn>

                                            <CalenderContainer>
                                                {showCalendar && (
                                                    <MyCalenderContainer>
                                                        <StyledCalender
                                                            onChange={handleDateChange}
                                                            value={selectedDate}
                                                        />
                                                    </MyCalenderContainer>
                                                )}
                                            </CalenderContainer>
                                        </CustomDateContainer>
                                    </CustomFieldContainer>) : null
                                }

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

export default Schedule