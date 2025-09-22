import React, { useCallback } from 'react';
import {
  Background,
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Handle, Position } from '@xyflow/react';
import { getBezierPath, BaseEdge, getSmoothStepPath } from '@xyflow/react';
import convertName from '../../../../../utils/conevrtName'

const initialNodes = [
  {
    id: 'horizontal-1',
    sourcePosition: 'right',
    type: 'custom',
    data: { label: 'Working Desk' },
    position: { x: 0, y: 80 },
  },
  {
    id: 'horizontal-2',
    sourcePosition: 'right',
    targetPosition: 'left',
    type: 'custom',
    data: { label: 'Monitor' },
    position: { x: 250, y: 0 },
  },
  {
    id: 'horizontal-3',
    sourcePosition: 'right',
    targetPosition: 'left',
    type: 'custom',
    data: { label: 'PC' },
    position: { x: 250, y: 160 },
  },
  {
    id: 'horizontal-4',
    sourcePosition: 'right',
    targetPosition: 'left',
    type: 'custom',
    data: { label: 'Multi Connector' },
    position: { x: 500, y: 0 },
  },
  {
    id: 'horizontal-5',
    sourcePosition: 'top',
    targetPosition: 'bottom',
    type: 'custom',
    data: { label: 'HDMI Cable' },
    position: { x: 500, y: 100 },
  },
  {
    id: 'horizontal-6',
    sourcePosition: 'bottom',
    targetPosition: 'top',
    type: 'custom',
    data: { label: 'Keyboard' },
    position: { x: 500, y: 230 },
  },
  {
    id: 'horizontal-7',
    sourcePosition: 'right',
    targetPosition: 'left',
    type: 'custom',
    data: { label: 'Mouse pad' },
    position: { x: 750, y: 50 },
  },
  {
    id: 'horizontal-8',
    sourcePosition: 'right',
    targetPosition: 'left',
    type: 'custom',
    data: { label: 'Mouse' },
    position: { x: 750, y: 300 },
  },
];

const initialEdges = [
  {
    id: 'horizontal-e1-2',
    source: 'horizontal-1',
    type: 'smoothstep',
    target: 'horizontal-2',
    animated: true,
  },
  {
    id: 'horizontal-e1-3',
    source: 'horizontal-1',
    type: 'smoothstep',
    target: 'horizontal-3',
    animated: true,
  },
  {
    id: 'horizontal-e1-4',
    source: 'horizontal-2',
    type: 'smoothstep',
    target: 'horizontal-4',
    label: 'Connected with',
    animated: true,
  },
  {
    id: 'horizontal-e3-5',
    source: 'horizontal-3',
    type: 'smoothstep',
    target: 'horizontal-5',
    animated: true,
  },
  {
    id: 'horizontal-e3-6',
    source: 'horizontal-3',
    type: 'smoothstep',
    target: 'horizontal-6',
    animated: true,
  },
  {
    id: 'horizontal-e5-7',
    source: 'horizontal-5',
    type: 'smoothstep',
    target: 'horizontal-7',
    animated: true,
  },
  {
    id: 'horizontal-e6-8',
    source: 'horizontal-6',
    type: 'smoothstep',
    target: 'horizontal-8',
    animated: true,
  },
];

// Custom Node Component
const CustomNode = ({ data }) => (
  <div
    className={`p-2 !border text-[#1d5a27] !border-[2px_solid_#1d5a27] 
    rounded-md ${data?.isOrigin ? '!bg-[#38f1ba62]' : data?.isDescendant ? '!bg-[#f3eeee]' : '!bg-[#4639ff41]'} min-w-[100px] min-h-[50px] flex items-center 
    justify-center  `}
  >
    <Handle type="target" position={Position.Left} className='!left-3' />
    <div style={{ fontWeight: 'bold' }}>{convertName(data.label)}</div>
    <Handle type="source" position={Position.Right} className='!right-3' />
  </div>
);

// Custom Edge Component

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
  markerEnd,
}) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={'smoothstep'}
        style={{ stroke: '#007bff', strokeWidth: 2, ...style }}
        markerEnd={markerEnd}
      />
    </>
  );
};

// Node and Edge Types
const nodeTypes = { custom: CustomNode };
const edgeTypes = { custom: CustomEdge };

const HorizontalFlow = ({ data }) => {
  const [nodes, _, onNodesChange] = useNodesState(data?.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(data?.edges || []);
  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    [],
  );

  console.log('data: ', data);

  if (!data || !data.nodes || !data.edges) {
    return <div className="w-full h-full flex items-center justify-center">Loading...</div>;
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onConnect={onConnect}
      fitView
      draggable={false}
      attributionPosition="bottom-left"
    >
      <Background />
    </ReactFlow>
  );
};

export default HorizontalFlow;