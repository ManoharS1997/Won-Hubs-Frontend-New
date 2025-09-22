import { useState } from 'react';
import { EdgeProps, getSmoothStepPath } from 'reactflow';
import { Tooltip } from 'react-tooltip';
import useEdgeClick from './hooks/useEdgeClick.js';
import styles from './EdgeTypes/EdgeTypes.module.css'
import { FaHubspot } from "react-icons/fa";
import { TbTimelineEventPlus } from "react-icons/tb";
import { RiExchangeFundsLine } from "react-icons/ri";
import { LuTimerReset } from "react-icons/lu";
import { AiOutlinePlus } from "react-icons/ai";

import {
    AddNodesPopupContainer,
    PopupNodesList,
    ActionNodeBtn
} from '../../StyledComponents.jsx';

export default function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style,
    markerEnd,
}: EdgeProps) {
    const [show, setShow] = useState(false);
    const onClick = useEdgeClick(id);
    const [edgePath, edgeCenterX, edgeCenterY] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const AddNodePopup = () => {
        return (
            <div style={{ width: '100px', height: '100px', backgroundColor: 'red', position: 'absolute', left: '50%', transform: 'translate(50%, 0px)', display: 'block' }}>
                <button type='button' onClick={onClick}>Trigger</button>
                <button type='button' onClick={onClick}>Configure</button>
                <button type='button' onClick={onClick}>Response</button>
            </div>
        );
    }

    return (
        <>
            <path
                id={id}
                style={{ ...style, stroke: '#000' }}
                className={styles.edgePath}
                d={edgePath}
                markerEnd={markerEnd}
            />
            <foreignObject x={edgeCenterX - 6.5} data-tooltip-id='addNode-tooltip' y={edgeCenterY - 11.5} width={13} height={18} >
                <AiOutlinePlus
                    
                    style={{
                        backgroundColor: '#fff',
                        border: '1px solid #1f1414',
                        borderRadius: '50%',
                        padding: '2px',
                    }}
                />

                <Tooltip
                    id='addNode-tooltip'
                    clickable
                    style={{
                        padding: '0',
                        borderRadius: '5px',
                        boxShadow: '0px 2px 10px 1px #ccc',
                        opacity: '1',
                        zIndex: '1000',
                        display: 'block',
                        left: `${edgeCenterX}`,
                        top: `${edgeCenterY}`,
                    }}
                    
                    noArrow={false}
                    arrowColor='#fff'
                    place='right'
                    offset={6}
                >
                    <AddNodesPopupContainer transform={`translate(${edgeCenterX}, ${edgeCenterY})`}>
                        <PopupNodesList>
                            <ActionNodeBtn type='button' onClick={onClick}><TbTimelineEventPlus id={'0'} size={18} />Discover</ActionNodeBtn>
                            <ActionNodeBtn type='button' onClick={onClick}><FaHubspot id={'1'} size={18} />Configure</ActionNodeBtn>
                            <ActionNodeBtn type='button' onClick={onClick}><RiExchangeFundsLine id={'2'} size={18} />Response</ActionNodeBtn>
                            <ActionNodeBtn type='button' onClick={onClick}><LuTimerReset id={'3'} size={18} />Schedule</ActionNodeBtn>
                        </PopupNodesList>
                    </AddNodesPopupContainer>
                </Tooltip>
            </foreignObject>

        </>
    );
}

