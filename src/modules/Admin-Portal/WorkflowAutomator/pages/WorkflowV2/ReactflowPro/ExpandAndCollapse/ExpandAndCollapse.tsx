import { useCallback, useState, useEffect, useRef } from 'react'
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  OnNodesChange,
  OnEdgesChange,
  NodeMouseHandler,
  Node,
  Edge,
  useReactFlow,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
} from 'reactflow'

// This is used to display a leva (https://github.com/pmndrs/leva) control panel for the example
import { useControls } from 'leva'

import TriggerNode from './NodeTypes/TriggerNode'
import ResponseNode from './NodeTypes/ResponseNode'
import ConfigureNode from './NodeTypes/ConfigureNode'
import ScheduleNode from './NodeTypes/ScheduleNode'
import ConnectNode from './NodeTypes/ConnectNode'
// import CustomEdge from '../WorkflowBuilder/EdgeTypes/WorkflowEdge'
import CustomEdge from './CustomEdge'

import useEdgeClick from '../WorkflowBuilder/hooks/useEdgeClick'

import {
  nodes as initialNodes,
  edges as initialEdges,
} from './initialElements'

import useAnimatedNodes from './useAnimatedNodes'
import useExpandCollapse from './useExpandCollapse'
import ContextMenu from './ContextMenu';
import WonContext from '../../../../../../../context/WonContext'

import 'reactflow/dist/style.css'
import styles from './styles.module.css'
import './index.css'

const proOptions = { account: 'paid-pro', hideAttribution: true }

const edgeTypes = {
  customEdge: CustomEdge,
}

interface Node {
  id: string,
  type: string,
  data: object,
  position: object
}

interface Edge {
  id: string,
  source: string,
  target: string,
  type: string

}

type ExpandCollapseExampleProps = {
  treeWidth?: number
  treeHeight?: number
  animationDuration?: number
  setIsDetailsOpen?: (value: boolean) => void
  nodeTypes?: object
  setSelectedFormData?: (newlySelectedNode) => void
  selectedFormData?: object
  setCustomLabel?: () => void
  setNodeDescription?: () => void
  triggerFlows?: boolean
  nodesAndEdges?: {
    activeNodes: Node[],
    activeEdges: Edge[]
  },
  flowData: object,
  setFlowData: () => void,
};

function ReactFlowPro({
  treeWidth = 220,
  treeHeight = 100,
  animationDuration = 300,
  setIsDetailsOpen,
  nodeTypes,
  setSelectedFormData,
  selectedFormData,
  setCustomLabel,
  setNodeDescription,
  triggerFlows,
  nodesAndEdges,
  flowData,
  setFlowData
}: ExpandCollapseExampleProps = {}) {
  const [nodes, setNodes] = useState(nodesAndEdges?.activeNodes || [])
  const [edges, setEdges] = useState(nodesAndEdges?.activeEdges || [])
  const [menu, setMenu] = useState(null);
  const ref = useRef(null)

  const { nodes: visibleNodes, edges: visibleEdges } = useExpandCollapse(
    nodes,
    edges,
    { treeWidth, treeHeight }
  )

  const { nodes: animatedNodes } = useAnimatedNodes(visibleNodes, {
    animationDuration,
  })

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  )

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  )

  const onNodeClick: NodeMouseHandler = useCallback(
    (event, node) => {
      if (event.target.nodeName !== 'svg' && event.target.nodeName !== 'path' && event.target.nodeName !== 'SPAN') {
        setNodes((nds) =>
          nds.map((n) => {
            if (n.id === node.id && node) {
              return {
                ...n,
                data: { ...n.data, expanded: !n.data.expanded },
              }
            }
            return n
          })
        );
      }

      else {
        // If event.target.id is 'actionBtn', set expanded to false
        setNodes((nds) =>
          nds.map((n) => {
            if (n.id === node.id && node) {
              return {
                ...n,
                // data: { ...n.data, expanded: false },
              }
            }
            return n
          })
        )
      }
    },
    [setNodes])

  const onNodesDelete = useCallback(
    (deleted) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, flowData.data.activeNodes, flowData.data.activeEdges);
          const outgoers = getOutgoers(node, flowData.data.activeNodes, flowData.data.activeEdges);
          const connectedEdges = getConnectedEdges([node], flowData.data.activeEdges);

          const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target }))
          );

          return [...remainingEdges, ...createdEdges];
        }, flowData.data.activeEdges)
      );
    },
    [flowData.data.activeNodes, flowData.data.activeEdges]
  );

  const onNodeContextMenu = useCallback(
    (event, node) => {
      // Prevent native context menu from showing
      event.preventDefault();

      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      const pane = ref.current.getBoundingClientRect();
      setMenu({
        id: node.id,
        top: event.clientY,
        // < pane.height - 200 && event.clientY,
        left: event.clientX,
        //  < pane.width - 200 && event.clientX,
        right: event.clientX,
        // >= pane.width - 200 && pane.width - event.clientX,
        bottom: event.clientY
        // >= pane.height - 200 && pane.height - event.clientY,
      });
    },
    [setMenu],
  );

  // Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  // console.log(nodes, edges)
  const setData = useCallback((activeFlowData) => {
    setNodes(activeFlowData.activeNodes)
    setEdges(activeFlowData.activeEdges)
  }, [nodes])

  const onSelectionChange = useCallback(({ nodes }) => {
    const newlySelectedNode = nodes && nodes.length > 0 ? nodes[0] : null;
    if (setSelectedFormData) {
      setSelectedFormData(newlySelectedNode);
    }

    if (newlySelectedNode !== selectedFormData) {
      setCustomLabel('');
      setNodeDescription('');
    }
  }, [setSelectedFormData, selectedFormData, setCustomLabel, setNodeDescription]);

  return (
    <WonContext.Consumer>
      {value => {
        const { activeFlowData } = value
        // { nodes.length < 1 ? setData(activeFlowData) : null }

        return (
          <ReactFlow
            fitView
            ref={ref}
            nodes={animatedNodes}
            edges={visibleEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            proOptions={proOptions}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            nodesDraggable={false}
            nodesConnectable={false}
            className={styles.viewport}
            zoomOnDoubleClick={false}
            // elementsSelectable={false}
            onPaneClick={onPaneClick}
            onNodeContextMenu={onNodeContextMenu}

            onSelectionChange={({ nodes }) => {
              const newlySelectedNode = nodes && nodes.length > 0 ? nodes[0] : null
              setSelectedFormData(newlySelectedNode)

              if (newlySelectedNode !== selectedFormData) {
                setCustomLabel('')
                setNodeDescription('')
              }
            }}
            onNodesDelete={onNodesDelete}
          >
            {menu &&
              <ContextMenu onClick={onPaneClick}
                flowData={flowData}
                setFlowData={setFlowData}
                {...menu}
              />}
            {/* <div className='w-fit !border !border-red-500 !shadow-lg'> */}
            <MiniMap
            className='!bottom-10 w-[135px]'
            />
            <Controls
              className='w-fit !flex-row'
              position='bottom-right'
            />
            {/* </div> */}
          </ReactFlow>
        )
      }}
    </WonContext.Consumer>
  )
}

interface Node {
  id: string,
  type: string,
  data: object,
  position: object
}

interface Edge {
  id: string,
  source: string,
  target: string,
  type: string,
}

type cProps = {
  setIsDetailsOpen: () => void,
  nodeTypes: object,
  setSelectedFormData: () => void,
  selectedFormData: object,
  setCustomLabel: () => void,
  setFlowData: () => void,
  setNodeDescription: () => void,
  triggerFlows: boolean,
  nodesAndEdges?: {
    actveNodes: Node[],
    activeEdges: Edge[]
  },
  flowData: object,
}

function ExpandAndCollapse({ setIsDetailsOpen, setSelectedFormData, selectedFormData, setCustomLabel, setFlowData, setNodeDescription, triggerFlows, nodesAndEdges, flowData }: cProps) {
  const nodeTypes = {
    trigger: (props) => {
      // console.log(props)
      return <TriggerNode setIsDetailsOpen={setIsDetailsOpen} flowData={flowData} setFlowData={setFlowData} {...props} />
    },
    configure: (props) => <ConfigureNode setIsDetailsOpen={setIsDetailsOpen} flowData={flowData} setFlowData={setFlowData}  {...props} />,
    response: (props) => <ResponseNode setIsDetailsOpen={setIsDetailsOpen} flowData={flowData} setFlowData={setFlowData}  {...props} />,
    schedule: (props) => <ScheduleNode setIsDetailsOpen={setIsDetailsOpen} flowData={flowData} setFlowData={setFlowData}  {...props} />,
    connect: (props) => <ConnectNode setIsDetailsOpen={setIsDetailsOpen} flowData={flowData} setFlowData={setFlowData}  {...props} />,
  }

  return (
    <ReactFlowProvider>
      <ReactFlowPro
        setIsDetailsOpen={setIsDetailsOpen}
        nodeTypes={nodeTypes}
        setSelectedFormData={setSelectedFormData}
        selectedFormData={selectedFormData}
        setCustomLabel={setCustomLabel}
        setNodeDescription={setNodeDescription}
        triggerFlows={triggerFlows}
        nodesAndEdges={nodesAndEdges}
        flowData={flowData}
        setFlowData={setFlowData}
      />
    </ReactFlowProvider>
  )
}

export default ExpandAndCollapse
