// import { emailFlow } from './initialElements';
import { Node, Edge } from "reactflow";

export const nodes: Node[] = [
  {
    id: "A",
    position: { x: 0, y: 0 },
    data: { label: 'Trigger', expanded: true },
    type: 'trigger',
  },
  // {
  //   id: "B",
  //   position: { x: 0, y: 0 },
  //   data: { label: 'Configure', expanded: true },
  //   type: 'configure',
  // },

  // {
  //   id: "C",
  //   position: { x: 0, y: 0 },
  //   data: { label: 'Response', expanded: true },
  //   type: 'response',
  // },
  // {
  //   id: "D",
  //   position: { x: 0, y: 0 },
  //   data: { label: '3', expanded: true },
  // },
  // {
  //   id: "E",
  //   position: { x: 0, y: 0 },
  //   data: { label: '4', expanded: true },
  // },
];

export const edges: Edge[] = [
  // {
  //   id: "A->B",
  //   source: "A",
  //   target: "B",
  //   type: 'customEdge',
  // },
  // {
  //   id: "B->C",
  //   source: "B",
  //   target: "C",
  //   type: 'customEdge',
  // },
  // {
  //   id: "C->D",
  //   source: "C",
  //   target: "D",
  //   type: 'customEdge',
  // },
  // {
  //   id: "C->E",
  //   source: "C",
  //   target: "E",
  //   type: 'customEdge',
  // },
];

// email flow data

export const emailFlowNodes: Node[] = [
  {
    id: "A",
    position: { x: 0, y: 0 },
    data: {
      label: 'Trigger',
      expanded: true,
      customLabel: 'Email Recieved to HR Department',
      description: '',
      TicketType: '',
      trigger: 'On Creation',
      table: 'emailLog',
      comments: 'This trigger will be active  when there is any new record created in emailLog table',
      conditions: [{ id: '1', filter: '', operation: '', value: '', logicalOperator: '' }],
      whoCanAccess: []
    },
    type: 'trigger',
    // comments: ['']
  },

  {
    id: "B",
    position: { x: 0, y: 150 },
    data: {
      label: 'Configure',
      expanded: true,
      customLabel: 'User Exists ?',
      description: '',
      TicketType: '',
      trigger: '',
      table: 'email_log',
      comments: 'This wll check if the user exists in the platform or not.',
      conditions: [{ id: '1', filter: '', operation: '', value: '', logicalOperator: '' }],
      flowLogic: 'If',
      flowLogicConditions: [{ id: '1', filter: { name: 'last_updated', type: 'datetime' }, operation: 'Between', value: 123, logicalOperator: '' }],
      whoCanAccess: []
    },
    type: 'configure',
  },

  {
    id: "C",
    position: { x: 0, y: 300 },
    data: {
      label: 'Response',
      expanded: true,
      customLabel: 'Create Ticket',
      description: 'This will create a new Ticket in the tickets table. ',
      TicketType: '',
      trigger: '',
      table: 'users',
      coreAction: 'Create Record',
      actionResponse: 'Create New Ticket',
      comments: '',
      conditions: [{ id: '1', filter: '', operation: '', value: '', logicalOperator: '' }],
      whoCanAccess: []
    },
    type: 'response',
  },

  // {
  //   id: "D",
  //   position: { x: 0, y: 450 },
  //   data: {
  //     label: 'Response',
  //     expanded: true,
  //     customLabel: 'Assign to Department',
  //     description: '',
  //     TicketType: '',
  //     trigger: '',
  //     table: '',
  //     comments: '',
  //     conditions: [{ id: '1', filter: '', operation: '', value: '', logicalOperator: '' }],
  //     whoCanAccess: []
  //   },
  //   type: 'response',
  // },
  // {
  //   id: "E",
  //   position: { x: 0, y: 450 },
  //   data: {
  //     label: 'Response',
  //     expanded: true,
  //     customLabel: 'Send Registration Form',
  //     description: '',
  //     TicketType: '',
  //     trigger: '',
  //     table: '',
  //     comments: '',
  //     conditions: [{ id: '1', filter: '', operation: '', value: '', logicalOperator: '' }],
  //     whoCanAccess: []
  //   },
  //   type: 'response',
  // },
  // {
  //   id: "F",
  //   position: { x: 0, y: 600 },
  //   data: {
  //     label: 'Response',
  //     expanded: true,
  //     customLabel: 'Send User  Ticket ceation and assigned Notification',
  //     description: '',
  //     TicketType: '',
  //     trigger: '',
  //     table: '',
  //     comments: '',
  //     conditions: [{ id: '1', filter: '', operation: '', value: '', logicalOperator: '' }],
  //     whoCanAccess: []
  //   },
  //   type: 'response',
  // },
  // {
  //   id: "G",
  //   position: { x: 0, y: 750 },
  //   data: {
  //     label: 'Configure',
  //     expanded: true,
  //     customLabel: 'If Status On-Hold',
  //     description: '',
  //     TicketType: '',
  //     trigger: '',
  //     table: '',
  //     comments: '',
  //     conditions: [{ id: '1', filter: '', operation: '', value: '', logicalOperator: '' }],
  //     whoCanAccess: []
  //   },
  //   type: 'configure',
  // },

  // {
  //   id: "I",
  //   position: { x: 0, y: 900 },
  //   data: {
  //     label: 'Response',
  //     expanded: true,
  //     customLabel: 'Send User ticket status ON-Hold Notification',
  //     description: '',
  //     TicketType: '',
  //     trigger: '',
  //     table: '',
  //     comments: '',
  //     conditions: [{ id: '1', filter: '', operation: '', value: '', logicalOperator: '' }],
  //     whoCanAccess: []
  //   },
  //   type: 'response',
  // },
  // {
  //   id: "J",
  //   position: { x: 0, y: 900 },
  //   data: {
  //     label: 'Connect',
  //     expanded: true,
  //     customLabel: 'Connect to WON-Platform',
  //     description: '',
  //     TicketType: '',
  //     trigger: '',
  //     table: '',
  //     comments: '',
  //     conditions: [{ id: '1', filter: '', operation: '', value: '', logicalOperator: '' }],
  //     whoCanAccess: []
  //   },
  //   type: 'connect',
  // },

]

export const emailFlowEges: Edge[] = [
  {
    id: "A->B",
    source: "A",
    target: "B",
    type: 'customEdge',
  },
  {
    id: "B->C",
    source: "B",
    target: "C",
    type: 'customEdge',
  },

  // {
  //   id: "C->D",
  //   source: "C",
  //   target: "D",
  //   type: 'customEdge',
  // },
  // {
  //   id: "B->E",
  //   source: "B",
  //   target: "E",
  //   type: 'customEdge',
  // },
  // {
  //   id: "C->F",
  //   source: "C",
  //   target: "F",
  //   type: 'customEdge',
  // },
  // {
  //   id: "D->G",
  //   source: "D",
  //   target: "G",
  //   type: 'customEdge',
  // },
  // {
  //   id: "G->I",
  //   source: "G",
  //   target: "I",
  //   type: 'customEdge',
  // },
  // {
  //   id: "E->J",
  //   source: "E",
  //   target: "J",
  //   type: 'customEdge',
  // },
];

export const emailFlow: (Node[] | Edge[])[] = [emailFlowNodes, emailFlowEges]

export const nodeOptions: Node[] = [
  {
    id: "A",
    position: { x: 0, y: 0 },
    data: {
      label: 'Trigger',
      expanded: true,
      customLabel: '',
      description: '',
      TicketType: '',
      trigger: '',
      table: '',
      comments: '',
      conditions: [{ id: '1', filter: '', operation: '', value: '', logicalOperator: '' }],
      whoCanAccess: []
    },
    type: 'trigger',
    // comments: ['']
  },
  {
    id: "B",
    position: { x: 0, y: 150 },
    data: {
      label: 'Configure',
      expanded: true,
      customLabel: '',
      description: '',
      TicketType: '',
      trigger: '',
      table: '',
      comments: '',
      conditions: [{ id: '1', filter: '', operation: '', value: '', logicalOperator: '' }],
      flowLogicConditions: [{ id: '1', filter: '', condition: '', event: '', logicalOperator: '' }],
      whoCanAccess: []
    },
    type: 'configure',
  },

  {
    id: "C",
    position: { x: 0, y: 300 },
    data: {
      label: 'Response',
      expanded: true,
      customLabel: '',
      description: '',
      TicketType: '',
      trigger: '',
      table: '',
      comments: '',
      conditions: [{ id: '1', filter: '', operation: '', value: '', logicalOperator: '' }],
      whoCanAccess: []
    },
    type: 'response',
  },
  {
    id: "D",
    position: { x: 0, y: 0 },
    data: {
      label: 'Schedule',
      expanded: true,
      customLabel: '',
      description: '',
      TicketType: '',
      trigger: '',
      table: '',
      comments: '',
      conditions: [{ id: '1', filter: '', operation: '', value: '', logicalOperator: '' }],
      whoCanAccess: []
    },
    type: 'schedule',
  },
  {
    id: "E",
    position: { x: 0, y: 900 },
    data: {
      label: 'Connect',
      expanded: true,
      customLabel: '',
      description: '',
      TicketType: '',
      trigger: '',
      table: '',
      comments: '',
      conditions: [{ id: '1', filter: '', operation: '', value: '', logicalOperator: '' }],
      whoCanAccess: [],
      connectionType: '',
      connectionName: { img: '', label: '' }
    },
    type: 'connect',
  }
];


// filter condition operations data

export const filterConditionOperations = [
  { name: 'On', typeFor: 'varchar/boolean/enum/datetime' },
  { name: 'Not On', typeFor: 'varchar//datetimeenum' },
  { name: 'Contains', typeFor: 'varchar/datetime/enum/int' },
  { name: 'Does Not Contains', typeFor: 'varchar/datetime/enum/int' },
  { name: 'Is', typeFor: 'varchar/datetime/enum/int' },
  { name: 'Is Not', typeFor: 'varchar/datetime/enum/int' },
  { name: 'Starts With', typeFor: 'varchar/datetime/enum/int' },
  { name: 'Ends With', typeFor: 'varchar/datetime/enum/int' },
  { name: 'Is Empty', typeFor: 'varchar/datetime/enum' },
  { name: 'Is Not Empty', typeFor: 'varchar/datetime/enum' },
  { name: 'Is Anything', typeFor: 'varchar/datetime/enum' },
  { name: 'Is One Of', typeFor: 'varchar/datetime/enum/int' },
  { name: 'Is Empty String', typeFor: 'varchar/datetime/enum' },
  { name: 'Less That Or Is', typeFor: 'varchar/datetime/enum/int' },
  { name: 'Greater Than Or Is', typeFor: 'varchar/datetime/enum/int' },
  { name: 'Between', typeFor: 'varchar/datetime/enum/int' },
  { name: 'Is Same', typeFor: 'varchar/datetime/enum/int' },
  { name: 'Is Different', typeFor: 'varchar/datetime/enum/int' },

  { name: 'Not On', typeFor: 'boolean' },
  { name: 'before', typeFor: 'boolean' },
  { name: 'after', typeFor: 'boolean' },
  { name: 'at or after', typeFor: 'boolean' },
  { name: 'between', typeFor: 'boolean' },
  { name: 'trend', typeFor: 'boolean' },
  { name: 'relative', typeFor: 'boolean' },
  { name: 'is empty', typeFor: 'boolean' },
  { name: 'is not empty', typeFor: 'boolean' },
  { name: 'is anything', typeFor: 'boolean' },
  { name: 'is same', typeFor: 'boolean' },
  { name: 'is different', typeFor: 'boolean' },
  { name: 'is more than', typeFor: 'boolean' },
  { name: 'is less than', typeFor: 'boolean' },
]
