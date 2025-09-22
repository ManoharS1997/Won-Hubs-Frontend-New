import { MarkerType } from 'reactflow'


import { TbTimelineEventPlus } from "react-icons/tb";
import { FaHubspot } from "react-icons/fa";
import { RiExchangeFundsLine } from "react-icons/ri";
import { LuTimerReset } from "react-icons/lu";
import { PiPlugsConnectedBold } from "react-icons/pi";


export const fieldInitialNodes = [
    {
        id: "1",
        position: { x: 275, y: 200 },
        data: { label: "Trigger" },
        type: "defaultNode",
        sourcePosition: "right",
        targetPosition: 'left',
        icon: <TbTimelineEventPlus size={18} />,
        style: { backgroundColor: '#fff', color: '#000', height: '50px', width: '150px', boxShadow: '0px 0px 10px 4px #ccc', borderRadius: '5px', },
        draggable: false,
    },
    {
        id: "2",
        position: { x: 275, y: 350 },
        data: { label: "Configure", shape: "diamond", icon: <FaHubspot size={18} /> },
        type: "configureNode",
        icon: <FaHubspot size={18} />,
        style: { backgroundColor: '#fff', color: '#000', width: '150px', height: '50px', boxShadow: '0px 0px 10px 4px #ccc', padding: '10px', borderRadius: '5px' },
        draggable: false,
    },
    {
        id: "3",
        position: { x: 500, y: 600 },
        data: { label: "Response" },
        type: "outputNode",
        sourcePosition: "right",
        targetPosition: "left",
        icon: <RiExchangeFundsLine size={18} />,
        style: { backgroundColor: '#fff', color: '#000', zIndex: 0, height: '50px', width: '150px', boxShadow: '0px 0px 10x 4px #ccc', borderRadius: '5px' },
        draggable: false,
    },
    {
        id: "4",
        position: { x: 450, y: 250 },
        data: { label: "Schedule" },
        type: "timerNode",
        sourcePosition: "bottom",
        targetPosition: "top",
        icon: <LuTimerReset size={18} />,
        style: { backgroundColor: '#fff', color: '#000', height: '50px', width: '150px', boxShadow: '0px 0px 10px 4px #ccc', borderRadius: '5px' },
    },
    {
        id: "5",
        position: { x: 450, y: 250 },
        data: { label: "Connect" },
        type: "connectNode",
        sourcePosition: "bottom",
        targetPosition: "top",
        icon: <PiPlugsConnectedBold size={18} />,
        style: { backgroundColor: '#fff', color: '#000', height: '50px', width: '150px', boxShadow: '0px 0px 10px 4px #ccc', borderRadius: '5px' },
    },
]

export const initialNodes = [
    {
        id: "0",
        position: { x: 275, y: 0 },
        data: { label: "Start", customLabel: '', description: '', TicketType: '', trigger: '', table: '' },
        type: "inputNode",
        sourcePosition: "bottom",
        icon: <TbTimelineEventPlus size={18} />,
        style: { backgroundColor: '#fff', color: '#000', height: '50px', boxShadow: '0px 0px 10px 4px #ccc', width: '150px', borderRadius: '5px', },
        draggable: false,
    },
]

export const initialEdges = [
    {
        id: "e1-0",
        source: "0",
        target: "1",
        data: { label: 'Intial Edge' },
        animated: false,
        labelStyle: { fill: 'red' },
        labelBgStyle: { fill: 'yellow', fillOpacity: 0.9 },
        type: 'custom-edge',
        style: { stroke: '#000', strokeWidth: '1', },

        markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
        id: "e1-1",
        source: "1",
        target: "2",
        data: { label: 'Intial Edge' },
        animated: false,
        labelStyle: { fill: 'red' },
        labelBgStyle: { fill: 'yellow', fillOpacity: 0.9 },
        targetHandle: 'b',
        type: 'custom-edge',
        style: { stroke: '#000', strokeWidth: '1', },
        markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
        id: "e1-2",
        source: "2",
        target: "3",
        animated: false,
        label: 'No',
        labelStyle: { fill: 'white' },
        labelBgStyle: { fill: 'red', fillOpacity: 0.9 },
        type: 'custom-edge',
        sourceHandle: 'c',
        style: { stroke: 'red', strokeWidth: '1' },
        markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
        id: "e1-3",
        source: "2",
        target: "4",
        animated: false,
        label: 'Yes',
        type: 'custom-edge',
        sourceHandle: 'a',
        style: { stroke: 'green', strokeWidth: '1' },
        markerEnd: { type: MarkerType.ArrowClosed },
    },
]

export const departmentsData = {
    HR: [
        {
            id: '1',
            name: 'Recruitment'
        },
        {
            id: '2',
            name: 'Employment relation'
        },
        {
            id: '3',
            name: 'Training'
        },
    ],
    IT: [
        {
            id: '1',
            name: 'Software Development'
        },
        {
            id: '2',
            name: 'IT support'
        },
        {
            id: '3',
            name: 'Training'
        },
    ],
    Marketing: [
        {
            id: '1',
            name: 'Digital Marketing'
        },
        {
            id: '2',
            name: 'Traditional Marketing'
        },
        {
            id: '3',
            name: 'PR'
        },
    ],
    'Digital Marketing': [
        {
            id: '1',
            name: 'Software Development'
        },
        {
            id: '2',
            name: 'IT Support'
        },
        {
            id: '3',
            name: 'Network Admin'
        },
    ],
}

export const modeTypes = [
    { id: '1', name: 'Desktop' },
    { id: '2', name: 'Mobile' },
    { id: '3', name: 'Tab' },
]

export const accessMembersList = [
    {
        id: '1',
        name: 'Admin',
        selected: false,
    },
    {
        id: '2',
        name: 'Super Admin',
        selected: false,
    },
    {
        id: '3',
        name: 'User',
        selected: false,
    },
    {
        id: '4',
        name: 'External User',
        selected: false,
    },
]

export const operationTypeOptions = [
    { value: "arithmetic", label: "Arithmetic" },
    { value: "logical", label: "Logical" },
];

export const logicalOperatorOptions = [
    {
        value: "equal",
        label: "= (equals to)",
    },
    {
        value: "not equal",
        label: "≠ (not equals to)",
    },
    {
        value: "greater than",
        label: "> (greater than)",
    },
    {
        value: "less than",
        label: "< (less than)",
    },
]

export const tableColumnConditions = [
    'is not empty',
    'starts with',
    'ends with',
    'contains',
    'does not contain',
    'is anything',
    'is same as',
    'is different from',
    'is empty string',
    'greater than field',
    'less than field',
    'greater than or is field',
    'less than or is field',
    'on',
    'not on',
    'before',
    'at or before',
    'after',
    'at or after',
    'between',
    'trend',
    'relative',
    'is empty',
    'is same',
    'is different',
    'is more than',
    'is less than',
    'is',
    'is not',
    'is one of',
    'is not one of',
    'have',
    'does not have',
    'excluding',
    'greater than or is',
    'less than or is',
    'on not on',
    'less than',
    'greater than',
    'are',
    'is a'
]
