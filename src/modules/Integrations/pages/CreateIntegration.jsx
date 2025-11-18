import { useState, useCallback, useEffect } from "react";
import Swal from "sweetalert2";
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MiniMap,
  Controls,
  Background,
  Handle,
  Position,
  getStraightPath
} from "reactflow";
import { IoMdAdd } from "react-icons/io";
// import { RiDragMoveFill } from "react-icons/ri";
import IntegrationEditorheader from "../components/IntegrationHeader";
import IntegrationSidePanel from "../components/SidePanel";
import convertName from "../../../utils/conevrtName";
import WONLoader from "../../../shared/components/loader";

import "reactflow/dist/style.css";
import { createNewRecordInTable, getRecordData, updateTableData } from "../../../utils/CheckAndExecuteFlows/CRUDoperations";
import { useNavigate, useParams } from "react-router-dom";

const initialNodes = [
  {
    id: "1",
    type: "customNode",
    data: {
      label: "Source (e.g., New Ticket in WONHUBS)",
      type: 'trigger',
      formData: {
        app: "",
        event: "",
      },
    },
    position: { x: 100, y: 100 },
    draggable: false,
    style: {
      backgroundColor: "var(--primary-color)",
      color: '#fff',
      borderRadius: '5px',
      border: '2px dashed #ccc',
      width: '250px' // Set initial width for trigger node
    }
  },
];

const initialEdges = [];

// Custom straight edge component
const StraightEdge = ({ id, source, target, sourceX, sourceY, targetX, targetY, style = {} }) => {
  const edgePath = `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;

  return (
    <path
      id={id}
      className="react-flow__edge-path"
      d={edgePath}
      style={{
        stroke: 'var(--primary-color)',
        strokeWidth: 1,
        ...style
      }}
    />
  );
};

const edgeTypes = {
  straight: StraightEdge,
};

const CustomNode = ({ data, id }) => {
  return (
    <div
      className="bg-inherit shadow-md p-2 relative "
      onClick={() => data.showPanelHandler({ ...data, id })}
      style={{ width: '100%', minHeight: '3rem', borderRadius: '0.3rem' }}
    >
      {/* <span className={`absolute transform translate-x-[-200%] translate-y-2 
            text-[var(--primary-color)] self-center flex items-center justify-center
             shadow-gray-600 `}>
                <RiDragMoveFill size={15} />
            </span> */}
      {/* Top Handle (upward) */}
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-blue-500" />
      <div className="text-center font-medium">{data.label}</div>
      {/* Bottom Handle (downward) */}
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-blue-500" />
      {/* Add Node Button - at the bottom */}
      <button
        className={`absolute bottom-[-22px] left-1/2 transform
                     -translate-x-1/2 bg-inherit text-[var(--text-color)] 
                     p-[3px] text-xs !rounded-[50%] z-10`}
        onClick={(e) => { e.stopPropagation(); data.addNode(id); }}
        title="Add New Node"
      >
        <div className="!bg-green-500 w-full h-full !rounded-[50%]">
          <IoMdAdd className="text-white" />
        </div>
      </button>
    </div>
  );
};

const nodeTypes = { customNode: CustomNode };

const FlowEditor = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [triggerNodeWidth, setTriggerNodeWidth] = useState(250); // Default width
  const [showpanel, setShowPanel] = useState(false)
  const [selectedNodeData, setSelectedNodeData] = useState(null)
  const [isFlowActive, setFlowActive] = useState(false)
  const [title, setTitle] = useState('Untitled ')
  const [type, setType] = useState('Internal')
  const [loading, setLoading] = useState(false)
  const [isNewIntegration, setIsNewIntegration] = useState(true)

  const Navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    getIntegrationFlowData()
  }, [])
  // Get the width of the trigger node after mounting
  useEffect(() => {
    if (nodes.length > 0) {
      const triggerNode = document.querySelector('.react-flow__node');
      if (triggerNode) {
        const width = triggerNode.offsetWidth;
        setTriggerNodeWidth(width);
      }
    }
  }, []);

  const getIntegrationFlowData = async () => {
    setLoading(true)
    try {
      if (parseInt(id)) {
        const response = await getRecordData('integrations', id, 'integration-editor', window.location.href)
        const data = response[0]
        // console.log(response);
        if (data) {
          setIsNewIntegration(false)
          setNodes(data.flow.nodes)
          setEdges(data.flow.edges)
          setFlowActive(data.active === 'true')
          setTitle(data.title)
          setType(data.type)
        }
      }
    } catch (err) {
      console.log('error getting integration flow data: ', err);
    }
    setLoading(false)
  }

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => {
      return setEdges((eds) =>
        addEdge({
          ...params,
          type: 'straight',
          style: { stroke: '#555', strokeWidth: 2 }
        }, eds)
      );
    },
    []
  );

  // Helper function to reposition nodes in vertical sequence
  const repositionNodes = (updatedNodes, startIndex, spacing = 100) => {
    // Get the X position (should be the same for all nodes in the sequence)
    const xPosition = updatedNodes[0].position.x;

    // Start with the Y position of the insertion point
    let currentY = updatedNodes[startIndex].position.y;

    // Reposition all nodes below the insertion point
    for (let i = startIndex; i < updatedNodes.length; i++) {
      updatedNodes[i].position.y = currentY;
      currentY += spacing; // Increment Y for next node
    }

    return updatedNodes;
  };
  const showPanelHandler = (data) => {
    setShowPanel(true)
    setSelectedNodeData(data)
  }

  const addNode = (parentId) => {
    setNodes((nds) => {
      const parent = nds.find(node => node.id === parentId);
      if (!parent) return nds;

      // Get the index of the parent node
      const parentIndex = nds.findIndex(node => node.id === parentId);

      // Create a new node that will appear directly below the parent
      const newNode = {
        id: `${nds.length + 1}`,
        type: "customNode",
        data: {
          label: `Action ${nds.length + 1}`,
          type: 'action', addNode, showPanelHandler,
          formData: {
            app: "",
            event: "",
          },
        },
        position: { x: parent.position.x, y: parent.position.y + 120 },
        draggable: false,
        style: {
          backgroundColor: "#fff",
          borderRadius: '0.3rem',
          border: '1px dashed #ccc',
          width: `${triggerNodeWidth}px` // Set same width as trigger node
        }
      };

      // Insert the new node after the parent
      const updatedNodes = [...nds];
      updatedNodes.splice(parentIndex + 1, 0, newNode);

      // Reposition all nodes to maintain straight vertical alignment with proper spacing
      return repositionNodes(updatedNodes, parentIndex + 1);
    });

    // Handle edge connections
    setNodes((currentNodes) => {
      const parentIndex = currentNodes.findIndex(node => node.id === parentId);
      if (parentIndex === -1 || parentIndex >= currentNodes.length - 1) return currentNodes;

      const newNodeId = currentNodes[parentIndex + 1].id;
      const existingEdges = [...edges];

      // Remove any existing edges from parent to nodes that were below it
      const edgesToRemove = existingEdges.filter(edge =>
        edge.source === parentId && edge.target !== newNodeId
      );

      // Create a new array without the edges to remove
      const remainingEdges = existingEdges.filter(edge =>
        !edgesToRemove.some(e => e.id === edge.id)
      );

      // Add edge from parent to new node (with straight type)
      const newEdge = {
        id: `e${parentId}-${newNodeId}`,
        source: parentId,
        target: newNodeId,
        type: 'straight',
        style: { stroke: '#555', strokeWidth: 1.5 }
      };

      // If there's a node below the new node, connect to it
      if (parentIndex + 2 < currentNodes.length) {
        const childNodeId = currentNodes[parentIndex + 2].id;
        const newChildEdge = {
          id: `e${newNodeId}-${childNodeId}`,
          source: newNodeId,
          target: childNodeId,
          type: 'straight',
          style: { stroke: '#555', strokeWidth: 2 }
        };

        setEdges([...remainingEdges, newEdge, newChildEdge]);
      } else {
        setEdges([...remainingEdges, newEdge]);
      }

      return currentNodes;
    });
  };

  const saveIntegrationHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    const emptyFields = []
    title === 'Untitled ' && emptyFields.push('Title')
    if (emptyFields.length > 0) {
      setLoading(false)

      Swal.fire({
        title: "Missing Mandatory Fields!",
        text: `${emptyFields.map(field => convertName(field)).join(', ')}`,
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok"
      });
    } else {
      try {
        await createNewRecordInTable({
          title,
          flow: JSON.stringify({ nodes, edges }),
          active: `${isFlowActive}`,
          type: type,
          status: 'saved'
        }, 'integrations', 'Create-integration', window.location.href)
        Navigate('/All Integrations')
        Swal.fire({
          title: "Integration Saved Successfully!",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok"
        });
      } catch (err) {
        console.log('error saving integration', err)
      }
    }
    setLoading(false)
  }
  const updateIntegrationHandler = async (e) => {
    e.preventDefault()
    try {
      let updatedRecord = {
        flow: { nodes, edges },
        active: `${isFlowActive}`,
        title: title,
        type: type
      }
      const responseData = await updateTableData(
        'integrations',
        id,
        updatedRecord,
        'integration-editor',
        window.location.href
      )
      console.log(responseData);
      Navigate('/All Integrations')
      Swal.fire({
        title: "Integration Saved Successfully!",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok"
      });
    } catch (err) {
      console.log('error updating the integration record: ', err);
    }
  }
  // Update all nodes to have the same width as the trigger
  useEffect(() => {
    if (triggerNodeWidth && triggerNodeWidth !== 250) {
      setNodes(nds =>
        nds.map(node => ({
          ...node,
          style: {
            ...node.style,
            width: `${triggerNodeWidth}px`
          }
        }))
      );
    }
  }, [triggerNodeWidth]);

  // console.log(nodes)

  return (
    <div className="w-full !h-[81vh] bg-[var(--background-color)] flex flex-col items-center">
      {/* <IntegrationEditorheader
        title={title}
        isFlowActive={isFlowActive}
        setFlowActive={setFlowActive}
        setTitle={setTitle}
        type={type}
        setType={setType}
        onSave={saveIntegrationHandler}
        onUpdate={updateIntegrationHandler}
        isNewIntegration={isNewIntegration}
      /> */}
      <div className="w-full h-[98%] flex border-2 border-gray-300 rounded-lg shadow-xl overflow-hidden">
        <ReactFlow
          nodes={nodes.map((node) => ({ ...node, data: { ...node.data, addNode, showPanelHandler } }))}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          defaultEdgeOptions={{
            type: 'straight',
            style: { stroke: '#555', strokeWidth: 2 }
          }}
          fitView
          style={{
            backgroundColor: 'var(--background-color)'
          }}
        >
          <MiniMap
            className="!bg-[var(--background-color)] shadow-md w-fit"
          />
          <Controls className="w-fit !right-0 !left-[90%] !flex flex-row" />
          <Background
            gap={8}
            color={'#ccc'}
          />
        </ReactFlow>
        {showpanel &&
          <IntegrationSidePanel
            nodeData={nodes.find(node => node.id === selectedNodeData.id)}
            setNodes={setNodes}
            closePanel={() => setShowPanel(false)}
          />}
      </div>
      {loading && <WONLoader opacity={0.8} />}
    </div>
  );
};

export default FlowEditor;