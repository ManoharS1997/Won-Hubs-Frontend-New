
import { useState } from 'react'
import { Tooltip } from 'react-tooltip';
import { Handle } from 'reactflow'

import { FaHubspot } from "react-icons/fa";
import { TbTimelineEventPlus } from "react-icons/tb";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RxInfoCircled } from "react-icons/rx";
import { RiExchangeFundsLine } from "react-icons/ri";
import { LuTimerReset } from "react-icons/lu";

import WonContext from '../../../../../context/WonContext';

import {
    NodeLabel,
    Strip,
    StripItem,
    AddNodesPopupContainer,
    PopupNodesList,
    ActionNodeBtn
} from './StyledComponents'


export default function TimerNode(props) {
    const { data, fieldInitialNodes, nodeStyles, handleStyles, iconStyles, xPos, yPos, id, sourcePosition, targetPosition, type } = props
    const [show, setShow] = useState(false)
    
    return (
        <WonContext.Consumer>
            {value => {
                const { addNode, nodes } = value

                const OnSelectNode = (e) => {
                    const CurrentNode = {
                        xPos,
                        yPos,
                        id,
                        sourcePosition,
                        targetPosition,
                        type
                    }
                    const node = fieldInitialNodes[e.target.id]
                    addNode(node, nodes, CurrentNode, props)
                    setShow(false)
                }
                
                return(
                    <div style={{ ...nodeStyles }} id='node'>
                        <LuTimerReset size={20} style={{ ...iconStyles}} id='node' />
                        <NodeLabel id='node'>{data.label}</NodeLabel>
                        <Handle type="source" position={'bottom'} id="c" style={{ ...handleStyles, backgroundColor: '#000', }} />
                        <Handle type="target" position={'top'} id="c" style={{ ...handleStyles, backgroundColor: '#000', }} />
                        
                        <Strip id='node'>
                            <StripItem
                                onClick={() => setShow(!show)}
                                data-tooltip-id='addNode-tooltip'
                            >
                                <IoIosAddCircleOutline size={18} />
                            </StripItem>
                            <StripItem><RxInfoCircled size={18} /></StripItem>
                        </Strip>
                        
                        <Tooltip
                            id='addNode-tooltip'
                            clickable
                            style={{ padding: '0', borderRadius: '5px' }}
                            noArrow={false}
                            arrowColor='#fff'
                            place='right'
                            offset={6}
                        >
                            <AddNodesPopupContainer>
                                <PopupNodesList>
                                    <ActionNodeBtn type='button' id={0} onClick={OnSelectNode}><TbTimelineEventPlus id={0} size={18} />Discover</ActionNodeBtn>
                                    <ActionNodeBtn type='button' id={1} onClick={OnSelectNode}><FaHubspot id={1} size={18} />Configure</ActionNodeBtn>
                                    <ActionNodeBtn type='button' id={2} onClick={OnSelectNode}> <RiExchangeFundsLine id={2} size={18} />Response</ActionNodeBtn>
                                    <ActionNodeBtn type='button' id={3} onClick={OnSelectNode}> <LuTimerReset id={3} size={18} />Schedule</ActionNodeBtn>
                                </PopupNodesList>
                            </AddNodesPopupContainer>
                        </Tooltip>
                    </div>
                )
            }}
        </WonContext.Consumer>
    )
    
}