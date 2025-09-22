import React, { useState } from 'react';
import ReactFlow, { Controls } from 'react-flow-renderer';

const MyFlowComponent = () => {
  const [elements, setElements] = useState([
    { id: '1', type: 'default', data: { label: 'Node 1' }, position: { x: 100, y: 100 }, draggable: true },
    { id: '2', type: 'default', data: { label: 'Node 2' }, position: { x: 200, y: 200 }, draggable: true },
  ]);
  const [placeholderPosition, setPlaceholderPosition] = useState(null);

  const onNodeDrag = (event, node) => {
    const newNodePosition = { x: event.clientX, y: event.clientY };
    setPlaceholderPosition(newNodePosition);
  };

  const onNodeDrop = (event, node) => {
    if (placeholderPosition) {
      const newElements = [
        ...elements,
        {
          id: 'edge-' + elements.length,
          source: node.id,
          targetPosition: 'left',
          target: 'placeholder',
          type: 'smoothstep',
        },
        {
          id: 'placeholder',
          position: placeholderPosition,
          data: { label: 'Placeholder' },
          style: { visibility: 'hidden' },
        },
      ];
      setElements(newElements);
      setPlaceholderPosition(null);
    }
  };

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <ReactFlow
        elements={elements}
        onNodeDrag={onNodeDrag}
        onNodeDrop={onNodeDrop}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default MyFlowComponent;
