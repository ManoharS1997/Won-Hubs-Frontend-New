import React, { useCallback } from 'react';
import { useReactFlow } from 'reactflow';

import { MdDeleteOutline } from "react-icons/md";
import { HiDuplicate } from "react-icons/hi";

export default function ContextMenu({
    id,
    top,
    left,
    right,
    bottom,
    flowData,
    setFlowData,
    ...props
}) {
    const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
    console.log({
        ...flowData.data,
    })

    const topDistance = top !== false ? top - 100 : top

    const duplicateNode = useCallback(() => {
        const node = getNode(id);
        const position = {
            x: node.position.x + 150,
            y: node.position.y,
        };
        const duplicatedNode = {
            ...node,
            selected: false,
            dragging: false,
            id: `${node.id}-copy`,
            position,
        }

        addNodes(duplicatedNode);
    }, [id, getNode, addNodes]);

    const deleteNode = () => {
        setFlowData({
            ...flowData,
            data: {
                activeNodes: flowData.data.activeNodes.filter((node) => node.id !== id),
                activeEdges: flowData.data.activeEdges.filter((edge) => edge.source !== id)
            }
        })
    }

    return (
        <div
            style={{ top: topDistance, left: left - 230, right }}
            className="context-menu"
            {...props}
        >
            <p style={{ margin: '0rem' }}>
                <strong>Node: {getNode(id).type.slice(0, 1).toUpperCase() + getNode(id).type.slice(1,)}</strong>
            </p>
            <button onClick={duplicateNode}>  <HiDuplicate size={18} /> Duplicate</button>
            <button onClick={deleteNode}>  <MdDeleteOutline size={18} /> Delete</button>
        </div>
    );
}
