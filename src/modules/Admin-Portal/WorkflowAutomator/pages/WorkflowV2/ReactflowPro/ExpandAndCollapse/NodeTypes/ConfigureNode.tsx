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
import { IoMdAdd } from "react-icons/io";

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
  ConditionSelectBtn,

} from '../../../StyledComponents'

import styles from '../styles.module.css';

import { nodeOptions } from '../initialElements';

const iconStyles = {
  backgroundColor: '#fff',
  color: '#0cb344',
  position: 'absolute',
  right: '80%',
  width: '25px',
  height: '25px',
}

type GetLabelParams = {
  expanded: boolean;
  expandable: boolean;
  label: string;
};

// this function returns the label for the node based on the current state
function getLabel({ expanded, expandable, label }: GetLabelParams): string {
  if (!expandable) {
    return label;
  }
  return expanded ? label : 'Expand ▼';
}

export default function ConfigureNode({ data, id, xPos, yPos, type, setIsDetailsOpen, setFlowData, flowData }: NodeProps) {
  // console.log(data)
  const { addNodes, addEdges } = useReactFlow();
  const [conditionStatus, setConditionStatus] = useState('')
  const uniqueAddNodepopupId = uuid()
  const uniqueInfopopupId = uuid()
  const uniqueDeletepopupId = uuid()

  const addChildNode: MouseEventHandler = (evt, value, conditionIs) => {
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
      conditionIs,
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
          conditionIs,
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
        // const selectedNode = data.activeNodes.find(node => node.id === id)
        // if(selectedNode===undefined){
        //   return null
        // }

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
            <FaHubspot style={iconStyles} size={18} />
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
                    {/* <ActionNodeBtn type='button'  >
                      <TbTimelineEventPlus size={18} />Trigger
                      <ConditionSelectBtn type='button' onClick={(e) => addChildNode(e, 0, true)}  >Yes</ConditionSelectBtn>
                      <ConditionSelectBtn type='button' onClick={(e) => addChildNode(e, 0, false)}  >No</ConditionSelectBtn>
                    </ActionNodeBtn> */}

                    <ActionNodeBtn type='button' >
                      <FaHubspot size={18} />Configure
                      <ConditionSelectBtn type='button' onClick={(e) => addChildNode(e, 1, true)} >Yes</ConditionSelectBtn>
                      <ConditionSelectBtn type='button' onClick={(e) => addChildNode(e, 1, false)} >No</ConditionSelectBtn>
                    </ActionNodeBtn>

                    <ActionNodeBtn type='button'>
                      <RiExchangeFundsLine size={18} />Response
                      <ConditionSelectBtn type='button' onClick={(e) => addChildNode(e, 2, true)} >Yes</ConditionSelectBtn>
                      <ConditionSelectBtn type='button' onClick={(e) => addChildNode(e, 2, false)} >No</ConditionSelectBtn>
                    </ActionNodeBtn>

                    <ActionNodeBtn type='button'>
                      <LuTimerReset size={18} />Schedule
                      <ConditionSelectBtn type='button' onClick={(e) => addChildNode(e, 3, true)} >Yes</ConditionSelectBtn>
                      <ConditionSelectBtn type='button' onClick={(e) => addChildNode(e, 3, false)} >No</ConditionSelectBtn>
                    </ActionNodeBtn>

                    <ActionNodeBtn type='button' >
                      <PiPlugsConnectedBold size={18} />Connect
                      <ConditionSelectBtn type='button' onClick={(e) => addChildNode(e, 4, true)}  >Yes</ConditionSelectBtn>
                      <ConditionSelectBtn type='button' onClick={(e) => addChildNode(e, 4, false)}  >No</ConditionSelectBtn>
                    </ActionNodeBtn>
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
