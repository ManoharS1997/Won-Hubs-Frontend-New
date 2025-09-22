import { useState, useEffect, useRef } from "react";
import { FaAngleDown } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import { MdOutlineDevicesOther } from "react-icons/md";
import { TbSocial } from "react-icons/tb";
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
    DropdownOptions
} from '../StyledComponents'

const Connections = {
    'google': { label: 'Google', name: '', img: 'https://res.cloudinary.com/drtguvwir/image/upload/v1713344628/WON-Platform-Images/ahum8wgsmvgj7a7srdrh.jpg', status: 'Disconnected' },
    'linkedin': { label: 'LinkedIn', name: '', img: 'https://res.cloudinary.com/drtguvwir/image/upload/v1713344506/WON-Platform-Images/cskcqqk2gv43lvxkip5w.jpg', status: 'Disconnected' },
    'github': { label: 'GitHub', name: '', img: 'https://res.cloudinary.com/drtguvwir/image/upload/v1713344667/WON-Platform-Images/qv2toatvn62tkl7hupdq.png', status: 'Disconnected' },
    'microsoft': { label: 'Microsoft', name: '', img: 'https://res.cloudinary.com/drtguvwir/image/upload/v1713344686/WON-Platform-Images/yw3jgkop4s2peqrc5hg0.svg', status: 'Disconnected' },
    'facebook': { label: 'Facebook', name: '', img: 'https://res.cloudinary.com/drtguvwir/image/upload/v1713344728/WON-Platform-Images/hr6yeeorap7vquqfehls.png', status: 'Disconnected' },
    'instagram': { label: 'Instagram', name: '', img: 'https://res.cloudinary.com/drtguvwir/image/upload/v1713344765/WON-Platform-Images/dmyhjxie50twwykalkfu.png', status: 'Disconnected' },
}

const connectionTypes = {
    email: { id: '1', label: 'Email Type Connection', icon: <MdAttachEmail style={{ color: 'inherit' }} /> },
    thirdParty: { id: '2', label: 'Third-party Application', icon: <MdOutlineDevicesOther style={{ color: 'inherit' }} /> },
    socialMedia: { id: '3', label: 'Social Media Connection', icon: <TbSocial style={{ color: 'inherit' }} /> },
}

const Connect = ({
    activeRightTab,
    isRightPanalActive,
    selectedFormData,
    onChangeCustomLabel,
    nodes,
    onChangeTriggerComments,
    flowData,
    setFlowData
}) => {
    const [interatedApps, setintegratedApps] = useState(Connections)
    const [profile, setProfile] = useState(null)

    //<<<<< STATE FOR CUSTOM SEARCH DROPDOWN  -----------------------------------------------
    const [isDropdownOpen, setDropdownOpen] = useState(false)

    const [isconnectionTypeOpen, setIsconnectionTypeOpen] = useState(false)
    const ScheduleDropdownCloseHandle = useRef(null)
    const ConnectionTypeDropdownCloseHandle = useRef(null)

    const handleDropDownToggle = () => setDropdownOpen(!isDropdownOpen)

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

    useEffect(() => {
        if (profile !== null) {
            if (profile.graphDomain === 'facebook') {
                setintegratedApps((prevProps) => ({
                    ...prevProps,
                    'facebook': {
                        ...prevProps['facebook'],
                        label: profile.graphDomain,
                        name: profile.name,
                        img: profile.picture.data.url,
                        status: 'Integrated'
                    }
                }));
            }
        }
    }, [profile])

    return (
        <WonContext.Consumer>
            {value => {
                const { setactiveFlowData } = value

                const selectedNode = flowData.data.activeNodes.find((each) => each.id === selectedFormData.id)
                console.log(selectedNode.data)

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
                    const selectedNode = _.find(flowData.data.activeNodes, { id: NodeId });
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

                const onChangeSchedule = (e, NodeId) => {
                    setFlowData({
                        ...flowData,
                        data: {
                            activeNodes: flowData.data.activeNodes.map((each) =>
                                each.id === NodeId
                                    ? { ...each, data: { ...each.data, connectionName: e } }
                                    : each),
                            activeEdges: flowData.data.activeEdges
                        }
                    })
                }

                const HandleConnectionNameSelection = (option, selectedNode) => {
                    onChangeSchedule(option, selectedNode)
                    setDropdownOpen(false)
                }

                const onChangeConnectionType = (e, NodeId) => {
                    setFlowData({
                        ...flowData,
                        data: {
                            activeNodes: flowData.data.activeNodes.map((each) =>
                                each.id === NodeId
                                    ? { ...each, data: { ...each.data, connectionType: e } }
                                    : each),
                            activeEdges: flowData.data.activeEdges
                        }
                    })
                }

                const HandleConnectionTypeSelection = (option, selectedNode) => {
                    onChangeConnectionType(option, selectedNode)
                    setIsconnectionTypeOpen(false)
                }

                return (
                    <RightTabContent>

                        <H1Tag>Connect Configuration</H1Tag>
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
                                    <CustomDropdownContainer isOpen={isconnectionTypeOpen} ref={ConnectionTypeDropdownCloseHandle}>
                                        <NewCustomDropDown onClick={() => setIsconnectionTypeOpen(!isconnectionTypeOpen)}>
                                            {selectedNode.data.connectionType !== '' ? selectedNode.data.connectionType.label : 'Connection Type'}
                                            <FaAngleDown style={{ transform: `rotate(${isDropdownOpen ? '180deg' : '0deg'})` }} />
                                        </NewCustomDropDown>

                                        {isconnectionTypeOpen && (
                                            <CustomDrpdownOptions>
                                                {Object.values(connectionTypes).map(option => (
                                                    <DropdownOptions
                                                        style={{ columnGap: '10px', alignItems: 'center' }}
                                                        key={option.id}
                                                        onClick={() => HandleConnectionTypeSelection(option, selectedFormData.id)}
                                                    >
                                                        {option.icon !== undefined ? option.icon : null}
                                                        {option.label}
                                                    </DropdownOptions>
                                                ))}
                                            </CustomDrpdownOptions>
                                        )}
                                    </CustomDropdownContainer>
                                </CustomFieldContainer>

                                <CustomFieldContainer >
                                    <CustomDropdownContainer isOpen={isDropdownOpen} ref={ScheduleDropdownCloseHandle}>
                                        <NewCustomDropDown onClick={handleDropDownToggle}>
                                            {selectedNode.data.connectionName.img !== '' ? <span style={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
                                                <img style={{ width: '20px' }} src={selectedNode.data.connectionName.img} />
                                                <span>{selectedNode.data.connectionName.label} </span>
                                            </span> : 'Connection Name'}

                                            <FaAngleDown style={{ transform: `rotate(${isDropdownOpen ? '180deg' : '0deg'})` }} />
                                        </NewCustomDropDown>

                                        {isDropdownOpen && (
                                            <CustomDrpdownOptions>
                                                <OptionsContainer>
                                                    {Object.values(interatedApps).map(option => (
                                                        <DropdownOptions
                                                            style={{ columnGap: '10px', alignItems: 'center' }}
                                                            key={option.label}
                                                            data-option-value={option.label} // Attach a custom attribute
                                                            onClick={() => HandleConnectionNameSelection(option, selectedFormData.id)}
                                                        >
                                                            {option.img !== '' ? <img style={{ width: '20px' }} src={option.img} /> : null}
                                                            {option.label}
                                                            <p style={{ color: 'red', fontSize: '0.8rem', margin: '0 0 0 auto', }}>{option.status}</p>
                                                        </DropdownOptions>
                                                    ))}
                                                </OptionsContainer>
                                            </CustomDrpdownOptions>
                                        )}
                                    </CustomDropdownContainer>
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

export default Connect