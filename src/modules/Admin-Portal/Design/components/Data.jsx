import { v4 as uuidv4 } from "uuid"

export const CustomSettings = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  content: {
    top: '15%',
    bottom: '15%',
    left: '20%',
    right: '20%',
    color: '#fff',
    borderRadius: '15px',
    overflowY: 'auto',
    padding: '0px',
    maxHeight: '80%',
    background: '#fff',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(6.2px)',
    border: '1px solid rgba(255, 255, 255, 0.11)',
  }
}

export const backendReferenceTables = [
  {
    id: uuidv4(),
    name: 'Users',
    selected: false,
  },
  {
    id: uuidv4(),
    name: 'Groups',
    selected: false,
  },
  {
    id: uuidv4(),
    name: 'Tickets',
    selected: false,
  },
  {
    id: uuidv4(),
    name: 'CMDB',
    selected: false,
  },
  {
    id: uuidv4(),
    name: 'Locations',
    selected: false,
  },
  {
    id: uuidv4(),
    name: 'Companies',
    selected: false,
  },
  {
    id: uuidv4(),
    name: 'Roles',
    selected: false,
  },
  {
    id: uuidv4(),
    name: 'Departments',
    selected: false,
  },
  {
    id: uuidv4(),
    name: 'Notifications',
    selected: false,
  },
]

export const backendFilter = [
  {
    id: uuidv4(),
    name: 'userId',
    referenceTable: 'user',
    selected: false,
  },
  {
    id: uuidv4(),
    name: 'departmentId',
    referenceTable: 'roles',
    selected: false,
  },
  {
    id: uuidv4(),
    name: 'priority',
    referenceTable: 'ticket',
    selected: false,
  },
  {
    id: uuidv4(),
    name: 'state',
    referenceTable: 'user',
    selected: false,
  },
  {
    id: uuidv4(),
    name: 'city',
    referenceTable: 'notification',
    selected: false,
  },
  {
    id: uuidv4(),
    name: 'age',
    referenceTable: 'department',
    selected: false,
  },
  {
    id: uuidv4(),
    name: 'name',
    referenceTable: 'cmdb',
    selected: false,
  },
  {
    id: uuidv4(),
    name: 'managerName',
    referenceTable: 'user',
    selected: false,
  },
  {
    id: uuidv4(),
    name: 'parentGroup',
    referenceTable: 'groups',
    selected: false,
  },
]

export const backendConfigureFields = [
  {
    id: uuidv4(),
    name: 'userId',
    referenceTable: 'user',
    selected: false,
  },
  {
    id: uuidv4(),
    name: 'departmentId',
    referenceTable: 'roles',
    selected: false,
  },
  {
    id: uuidv4(),
    name: 'priority',
    referenceTable: 'ticket',
    selected: false,
  },
  {
    id: uuidv4(),
    name: 'state',
    referenceTable: 'user',
    selected: false,
  },
  {
    id: uuidv4(),
    name: 'city',
    referenceTable: 'notification',
    selected: false,
  },
  {
    id: uuidv4(),
    name: 'age',
    referenceTable: 'department',
    selected: false,
  },
  {
    id: uuidv4(),
    name: 'name',
    referenceTable: 'cmdb',
    selected: false,
  },
  {
    id: uuidv4(),
    name: 'managerName',
    referenceTable: 'user',
    selected: false,
  },
  {
    id: uuidv4(),
    name: 'parentGroup',
    referenceTable: 'groups',
    selected: false,
  },
]


export const DropStyles = {        //DROP STYLES
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  background: '#fff',
  width: '100%',
  borderRadius: '10px',
  padding: '15px',
  flexGrow: '1',
  margin: '0px',
  // boxShadow: '0 0 4px 2px #ccc'
}

export const TabsDropStyles = {    //DROP TABS STYLES
  maxHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: '#fff',
  width: '80%',
  borderRadius: '10px',
  padding: '15px',
  flexGrow: '1',
  margin: '0px 10px 10px 10px'
}


export const columnOptions = [
  { label: '1 column', value: '1' },
  { label: '2 columns', value: '2' }
];

export const alignmentOptions = [
  { label: 'Above Fields', value: 'top' },
  { label: 'Below Fields', value: 'below-fields' }
];