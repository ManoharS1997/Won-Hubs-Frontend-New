import { MouseEventHandler, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { Handle, NodeProps, Position, useReactFlow } from 'reactflow';

import { FaHubspot } from "react-icons/fa";
import { TbTimelineEventPlus } from "react-icons/tb";
import { RiExchangeFundsLine } from "react-icons/ri";
import { LuTimerReset } from "react-icons/lu";
import { FaPlus } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";
import { PiPlugsConnectedBold } from "react-icons/pi";


import { v4 as uuid } from 'uuid'
import WonContext from '../../../../../../../../context/WonContext';

import {
  Strip,
  StripItem,
  AddNodesPopupContainer,
  PopupNodesList,
  ActionNodeBtn,
  HelpContentContainer,
  HelpContainerHeader,
  NodeHelpPopupContainer,
} from '../../../StyledComponents'

import { nodeOptions } from '../initialElements';

import styles from '../styles.module.css';

const iconStyles = {
  backgroundColor: '#fff',
  color: '#665cfa',
  // borderRadius: '50%',
  // padding: '2px',
  position: 'absolute',
  right: '80%',
  width: '25px',
  height: '25px',
  // border: '1px solid #ccc',
}

type GetLabelParams = {
  expanded: boolean;
  expandable: boolean;
  label: string;
};

// this function returns the label for the node based on the current state
function getLabel({ expanded, expandable, label }: GetLabelParams): string {
  // console.log(label)
  if (!expandable) {
    return label;
  }

  return expanded ? label : 'Expand ▼';
}

export default function ResponseNode({ data, id, xPos, yPos, type, setIsDetailsOpen, setFlowData, flowData }: NodeProps) {
  // console.log('triger node rendered')
  const { addNodes, addEdges } = useReactFlow();
  const uniqueAddNodepopupId = uuid()
  const uniqueInfopopupId = uuid()
  const uniqueDeletepopupId = uuid()

  const addChildNode: MouseEventHandler = (evt, value,) => {
    // prevent the expand/collapse behaviour when a new node is added while the
    // node is expanded
    if (data.expanded) {
      evt.preventDefault();
      evt.stopPropagation();
    }

    const newNodeId = `${id}__${new Date().getTime()}`;

    // the edge between the clicked node and the child node is created
    addNodes({
      ...nodeOptions[value],
      id: newNodeId,
      position: { x: xPos, y: yPos + 150 },
    });
    addEdges({ id: `${id}->${newNodeId}`, source: id, target: newNodeId, type: 'customEdge' });
    console.log(flowData)
    setFlowData({
      ...flowData,
      data: {
        activeNodes: [...flowData.data.activeNodes, {
          ...nodeOptions[value],
          id: newNodeId,
          position: { x: xPos, y: yPos + 150 },
        }],

        activeEdges: [...flowData.data.activeEdges, { id: `${id}->${newNodeId}`, source: id, target: newNodeId, type: 'customEdge' }]
      }
    })
  };

  // based on the state of the node, we show the label accordingly
  const label = getLabel(data);

  return (
    <WonContext.Consumer>
      {value => {
        const { setactiveFlowData } = value

        return (
          <div className={styles.node}>
            <textarea
              className={styles.label}
              id='node'
              maxLength={27}
              style={{ width: '70%', height: '100%', overflow: 'hidden', border: 'none', outline: 'none' }}
              value={
                data.customLabel === '' ? label : data.customLabel.length > 27
                  ? data.customLabel.slice(0, 27) + '...' : data.customLabel
              }
            ></textarea>
            <RiExchangeFundsLine style={iconStyles} size={18} />
            <Handle position={Position.Top} type="target" />
            <Handle position={Position.Bottom} type="source" />
            <div className={styles.button} >

              <Strip id='node'>
                <StripItem
                  // onClick={() => setShow(!show)}
                  data-tooltip-id={uniqueAddNodepopupId}
                  id='actionBtn'
                >
                  <FaPlus size={10} />
                </StripItem>

                {/* <StripItem data-tooltip-id={uniqueDeletepopupId} data-tooltip-place='right'><MdDeleteOutline size={10} /></StripItem> */}
                <StripItem data-tooltip-id={uniqueInfopopupId} id='actionBtn' onClick={setIsDetailsOpen} data-tooltip-place='right'><FaInfo size={10} /></StripItem>
              </Strip>

              <Tooltip
                id={uniqueAddNodepopupId}
                clickable
                style={{ padding: '0', borderRadius: '5px', boxShadow: '0px 2px 10px 1px #ccc', opacity: 1, left: '0' }}
                noArrow={false}
                arrowColor='#fff'
                place='right'
                offset={6}
              // openOnClick={true}
              >
                <AddNodesPopupContainer>
                  <PopupNodesList>
                    {/* <ActionNodeBtn type='button' onClick={(e) => addChildNode(e, 0)}><TbTimelineEventPlus onClick={(e) => addChildNode(e, 0)} size={18} />Trigger</ActionNodeBtn> */}
                    <ActionNodeBtn type='button' onClick={(e) => addChildNode(e, 1)}><FaHubspot onClick={(e) => addChildNode(e, 1)} size={18} />Configure</ActionNodeBtn>
                    <ActionNodeBtn type='button' onClick={(e) => addChildNode(e, 2)}> <RiExchangeFundsLine onClick={(e) => addChildNode(e, 2)} size={18} />Response</ActionNodeBtn>
                    <ActionNodeBtn type='button' onClick={(e) => addChildNode(e, 3)}> <LuTimerReset onClick={(e) => addChildNode(e, 3)} size={18} />Schedule</ActionNodeBtn>
                    <ActionNodeBtn type='button' onClick={(e) => addChildNode(e, 4)}> <PiPlugsConnectedBold onClick={(e) => addChildNode(e, 4)} size={18} />Connect</ActionNodeBtn>
                  </PopupNodesList>
                </AddNodesPopupContainer>
              </Tooltip>

              <Tooltip
                id={uniqueInfopopupId}
                // clickable
                style={{ padding: '0', backgroundColor: '#fff', color: '#000', boxShadow: '0px 2px 10px 1px #ccc', opacity: 1, borderRadius: '5px' }}
                noArrow={false}
                arrowColor='#fff'
                place='right'
                offset={6}
              >
                <NodeHelpPopupContainer >
                  <HelpContainerHeader >Information / Help</HelpContainerHeader>
                  <HelpContentContainer>{'Description: ' + data.description}</HelpContentContainer>
                  <HelpContentContainer>{'Description: ' + data.description}</HelpContentContainer>
                  <HelpContentContainer>{'Description: ' + data.description}</HelpContentContainer>
                </NodeHelpPopupContainer>
              </Tooltip>

              <Tooltip
                id={uniqueDeletepopupId}
                clickable
                style={{ padding: '0', backgroundColor: '#fff', color: '#000', boxShadow: '0px 2px 10px 1px #ccc', opacity: 1, borderRadius: '5px' }}
                noArrow={false}
                arrowColor='#fff'
                place='right'
                offset={6}
              >
                <div style={{ width: '100px', height: 'fit-content', padding: '5px' }}>Delete Node</div>
              </Tooltip>
            </div>
          </div>
        )
      }}
    </WonContext.Consumer>
  );
}
