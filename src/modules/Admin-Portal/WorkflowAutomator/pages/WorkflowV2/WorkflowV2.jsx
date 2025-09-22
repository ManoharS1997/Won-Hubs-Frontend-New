import { useCallback, useState, useMemo, useEffect, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from 'js-cookie'
import {
  ClipLoader, BarLoader, BeatLoader, BounceLoader, CircleLoader, ClimbingBoxLoader, ClockLoader, DotLoader, FadeLoader,
  MoonLoader, PacmanLoader, PropagateLoader, PulseLoader, RingLoader, RotateLoader, GridLoader, HashLoader, PuffLoader, RiseLoader,
  ScaleLoader, SquareLoader, SyncLoader
} from "react-spinners";

import { Tooltip } from 'react-tooltip'
import { useNavigate } from "react-router-dom";
import { getFlowData } from "../../../../../utils/CheckAndExecuteFlows/CRUDoperations";
import Swal from "sweetalert2";

import "reactflow/dist/style.css";
import _ from 'lodash'

import { AiOutlineMergeCells } from "react-icons/ai";
import { MdNotifications } from "react-icons/md";
import { GrDocumentConfig, GrDocumentUpdate } from "react-icons/gr";
import { TbAlertSquareRoundedFilled } from "react-icons/tb";
import { PiSpeakerHighBold } from "react-icons/pi";
import { HiOutlineTemplate } from "react-icons/hi";
import { VscFeedback } from "react-icons/vsc";
import { IoChevronBackOutline, IoSettings } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdArrowBackIosNew } from "react-icons/md";
import { BsCloudArrowUp } from "react-icons/bs";

import ConfigureNode from "./ConfigureNode";
import InputNode from "./InputNode";
import OutputNode from "./OutputNode";
import DefaultNode from "./DefaultNode";
import TimerNode from "./TimerNode";
import WonContext from "../../../../../context/WonContext";
import CircularProgressBar from "../../../../../ProgressBars/CustomProgressBar/CircularProgressBar";

import Configure from './NodeConfigs/Configure'
import Trigger from './NodeConfigs/Trigger'
import Connect from './NodeConfigs/Connect'
import Response from './NodeConfigs/Response'
import Schedule from './NodeConfigs/Schedule'

import ExpandAndCollapse from "./ReactflowPro/ExpandAndCollapse/ExpandAndCollapse";

import './index.css'

import {
  initialNodes,
  initialEdges,
  departmentsData,
  modeTypes,
  accessMembersList,
  fieldInitialNodes,
  operationTypeOptions,
  logicalOperatorOptions,
} from './DataFile'

import {
  MainContainer, BodyContainer, WorkflowContainer, FieldsAndFlowArea, FieldsContainer,
  ReactFlowArea, FieldDetailsContainer, FieldItem, FormDetailsTitle, SelectedFieldName,
  FieldInputContainer, SelectedType, CustomSelect, CustomOption, CustomInput, TabsContainer,
  TabItem, FieldsList, IntegrationsTab, RightFieldsContainer, ReactflowHeader, BackBtn,
  Group, Input, Label, Bar, Highlight, DropDownContainer, DropdownBtn, DropdownUl,
  NodeRightConfiguration, HideBtn, RightTabsContainer, SubmitBtn, ToggleContainer, FlowActivateLabel,
  SwitchContainer, Knob, SaveBtn
} from './StyledComponents'

const nodeStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '160px',
  columnGap: '10px',
  padding: '0px',
  height: '50px',
  margin: '0px',
  fontSize: '12px',
  border: '1px solid #ccc',
  outline: 'none',
  boxShadow: '0px 0px 16x 6px #ccc',
}

const handleStyles = {
  backgroundColor: 'transparent !important',
  color: 'transparent',
  width: '0px',
  height: '0px',
  borderRadius: '50%',
  cursor: 'pointer',
  zIndex: '0',
  opacity: '0',
  margin: '0px'
}

const iconStyles = {
  backgroundColor: '#fff',
  color: '#000',
  position: 'absolute',
  right: '80%',
  width: '25px',
  height: '25px',
}

const onSuccessfulSubmit = (titleText) => {
  return Swal.fire({
    position: "top-end",
    icon: "success",
    title: titleText,
    showConfirmButton: false,
    timer: 1500
  });
}

export default function WorkflowComponent(props) {
  const [nodes, setNodes] = useState([])
  // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isFetchingData, setIsFetchingData] = useState(false)
  const [selectedFormData, setSelectedFormData] = useState({
    id: "A",
    position: { x: 0, y: 0 },
    data: {
      label: 'Email Recieved to HR Department',
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
  })

  const [selectedActionBtnData, setSelectedActionBtnData] = useState({ label: "hello" });
  const [isDepartmentOpen, setDepartmentOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(true)
  const [flowName, setFlowName] = useState('')
  const [selectedDept, setSelectedDept] = useState('')
  const [selectedSubDept, setSelectedSubDept] = useState('')
  const [flowDescription, setFlowDescription] = useState('')
  const [activeLeftTab, setActiveLeftTab] = useState('automator')
  const [activeRightTab, setActiveRighttab] = useState('Properties')
  const [NodeDescription, setNodeDescription] = useState('')

  const [isRightPanalActive, setRightPanalActive] = useState(true)
  const [CustomLabel, setCustomLabel] = useState("");
  const [table, setTable] = useState('')
  const [flowData, setFlowData] = useState({})
  const [showFlowUpdateteStatus, setShowFlowUpdateStatus] = useState(false)
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  const navigator = useNavigate()
  const { id } = useParams()

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  useEffect(() => {
    const fetchColumns = async () => {
      const url = 'http://localhost:3001/table/columns/flows'
      const options = {
        method: 'get',
      }

      const response = await fetch(url, options)
      const data = await response.json()
    }

    const fetchFlowdata = async () => {
      setIsFetchingData(true)
      const totalDataSize = 100; // Assume 100 units of data
      let loadedData = 0;

      const interval = setInterval(() => {
        loadedData += 10; // Simulate loading 10 units at a time
        setLoadingPercentage((loadedData / totalDataSize) * 100);

        if (loadedData >= totalDataSize) {
          clearInterval(interval);
        }
      }, 500); // Simulate delay of 500ms between loading units

      const data = await getFlowData(id)
      const NewFlowData = {
        id: '1',
        active: 'false',
        flow_name: '',
        category: '',
        created: '',
        created_by: '',
        description: '',
        department: '',
        data: {
          activeNodes: [{
            id: 'A',
            position: { x: 0, y: 0 },
            type: 'trigger',
            data: {
              TicketType: '',
              comments: '',
              conditions: [{
                filter: '',
                id: '1',
                logicalOperator: '',
                operation: '',
                value: ''
              }],
              customLabel: '',
              description: '',
              expanded: true,
              label: 'Trigger',
              table: '',
              trigger: '',
              whoCanAccess: ''
            }
          }],
          activeEdges: []
        },
        mode: '',
        service: '',
        sub_category: '',
        trigger_name: '',
        updated: '',
        updated_by: '',
      }
      setFlowData(data.error ? NewFlowData : data.record)
      setIsFetchingData(false)
      setNodes(data.error ? {} : data.record.data.activeNodes)
    }

    fetchColumns()
    fetchFlowdata()
  }, [setFlowData])

  const updateFlowData = async () => {
    // console.log( flowData.data)
    const url = `${import.meta.env.VITE_HOSTED_API_URL}/updateRecord/flows/${id}`
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('accessToken')}`
      },

      body: JSON.stringify({ recordData: { ...flowData, assigned_members: flowData.assigned_member } })
    }
    const response = await fetch(url, options)
    if (response.ok) {
      setShowFlowUpdateStatus(true)
      setTimeout(() => {
        setShowFlowUpdateStatus(false)
        // window.location.reload()
      }, 1000)
    }
    // console.log(response.ok)
  }

  { showFlowUpdateteStatus ? onSuccessfulSubmit("Flow Updated Successfully") : null }

  // const nodeTypes = useMemo(() => ({
  //     configureNode: (props) => <ConfigureNode
  //         fieldInitialNodes={fieldInitialNodes}
  //         nodeStyles={nodeStyles}
  //         iconStyles={iconStyles}
  //         handleStyles={handleStyles}
  //         setIsDetailsOpen={setIsDetailsOpen}
  //         {...props}
  //     />,
  //     inputNode: (props) => <InputNode
  //         nodeStyles={nodeStyles}
  //         fieldInitialNodes={fieldInitialNodes}
  //         handleStyles={handleStyles}
  //         setIsDetailsOpen={setIsDetailsOpen}
  //         {...props}
  //     />,
  //     outputNode: (props) => <OutputNode
  //         nodeStyles={nodeStyles}
  //         fieldInitialNodes={fieldInitialNodes}
  //         handleStyles={handleStyles}
  //         iconStyles={iconStyles}
  //         setIsDetailsOpen={setIsDetailsOpen}
  //         {...props}
  //     />,
  //     defaultNode: (props) => <DefaultNode
  //         nodeStyles={nodeStyles}
  //         fieldInitialNodes={fieldInitialNodes}
  //         handleStyles={handleStyles}
  //         iconStyles={iconStyles}
  //         setIsDetailsOpen={setIsDetailsOpen}
  //         {...props}
  //     />,
  //     timerNode: (props) => <TimerNode
  //         nodeStyles={nodeStyles}
  //         fieldInitialNodes={fieldInitialNodes}
  //         handleStyles={handleStyles}
  //         iconStyles={iconStyles}
  //         setIsDetailsOpen={setIsDetailsOpen}
  //         {...props}
  //     />,
  // }), [])

  // const rightTabsData = [
  //     {
  //         name: 'notification',
  //         icon: <MdNotifications size={18} onClick={() => UpdateRightActiveTab('notification')} />
  //     },
  //     {
  //         name: 'alerts',
  //         icon: <TbAlertSquareRoundedFilled size={18} onClick={() => UpdateRightActiveTab('alerts')} />
  //     },
  //     {
  //         name: 'announcements',
  //         icon: <PiSpeakerHighBold size={18} onClick={() => UpdateRightActiveTab('announcements')} />
  //     },
  //     {
  //         name: 'Templates',
  //         icon: <HiOutlineTemplate size={18} onClick={() => UpdateRightActiveTab('Templates')} />
  //     },
  //     {
  //         name: 'feedbacks',
  //         icon: <VscFeedback size={18} onClick={() => UpdateRightActiveTab('feedbacks')} />
  //     },
  //     {
  //         name: 'configurations',
  //         icon: <GrDocumentConfig size={18} onClick={() => UpdateRightActiveTab('configurations')} />
  //     },
  // ]

  const onChangeCustomLabel = (e, selectedNode) => {
    setCustomLabel(e)

    setNodes((prevNodes) => prevNodes.map((each) =>
      each.id === selectedNode
        ? { ...each, data: { ...each.data, customLabel: e } }
        : each
    ));
  }

  const onChangeDescriptionValue = (e, NodeId) => {
    setNodeDescription(e)

    setNodes((prevNodes) => prevNodes.map((each) =>
      each.id === NodeId
        ? { ...each, data: { ...each.data, description: e } }
        : each
    ));
  }

  const onChangeTriggerComments = (e, NodeId) => {
    setNodes((prevNodes) => prevNodes.map((each) =>
      each.id === NodeId
        ? { ...each, data: { ...each.data, comments: e } }
        : each
    ));
  }

  const onChangeTicketTypeValue = (e, NodeId) => {
    setNodes((prevNodes) => prevNodes.map((each) =>
      each.id === NodeId
        ? { ...each, data: { ...each.data, TicketType: e } }
        : each
    ));
  }

  const onChangeTriggerValue = (e, NodeId) => {
    setNodes((prevNodes) => prevNodes.map((each) =>
      each.id === NodeId
        ? { ...each, data: { ...each.data, trigger: e } }
        : each
    ));
  }

  const onChangeTriggerTable = (e, NodeId) => {
    setTable(e)
    setNodes((prevNodes) => prevNodes.map((each) =>
      each.id === NodeId
        ? { ...each, data: { ...each.data, table: e } }
        : each
    ));
  }

  const onChangeTriggerConditions = (e, NodeId, conditionObjId, conditionType) => {
    setNodes(prevNodes =>
      prevNodes.map(each =>
        each.id === NodeId
          ? {
            ...each,
            data: {
              ...each.data,
              conditions: each.data.conditions.map(condition =>
                condition.id === conditionObjId
                  ? {
                    ...condition,
                    [conditionType]: e
                  }
                  : condition
              )
            }
          }
          : each
      )
    );
  }

  const OnTriggerLogicalOperators = (NodeId) => {
    setNodes(prevNodes =>
      prevNodes.map(each =>
        each.id === NodeId
          ? {
            ...each,
            data: {
              ...each.data,
              conditions: [...each.data.conditions,
              {
                id: (each.data.conditions.length + 1).toString(),
                filter: '',
                condition: '',
                event: '',
                operator: ''
              }]

            }
          }
          : each
      )
    );
  }

  const writeOperator = (operator, NodeId, conditionObjId) => {
    setNodes(prevNodes =>
      prevNodes.map(each =>
        each.id === NodeId
          ? {
            ...each,
            data: {
              ...each.data,
              conditions: each.data.conditions.map((con) => con.id === conditionObjId ? { ...con, operator: operator } : con)

            }
          }
          : each
      )
    );
  }

  const OnDeleteConditionSet = (NodeId, conditionObjId) => {
    setNodes(prevNodes =>
      prevNodes.map(each =>
        each.id === NodeId
          ? {
            ...each,
            data: {
              ...each.data,
              conditions: each.data.conditions.filter(condition => condition.id !== conditionObjId)
            }
          }
          : each
      ).map(node => {
        if (node.id === NodeId && node.data.conditions.length <= 1) {
          return {
            ...node,
            data: {
              ...node.data,
              conditions: node.data.conditions.map((condition, index) => ({
                ...condition,
                operator: index === node.data.conditions.length - 1 ? '' : condition.operator
              }))
            }
          };
        }
        return node;
      })
    );
  };

  const WhoCanAccessTrigger = (e, NodeId) => {
    setNodes((prevNodes) => prevNodes.map((each) =>
      each.id === NodeId
        ? { ...each, data: { ...each.data, whoCanAccess: e } }
        : each
    ))
  }

  //TRIGGER UPDATION FUNCTIONS//                <<<<<<<<<<<<<<<<<<<<    1

  //------------------------------------------------------------------------------------------------------------------------------------------------------//

  //CONFIGURE UPDATION FUNCTIONS//              >>>>>>>>>>>>>>>>>>>>    2

  const onChangeFlowLogicValue = (e, NodeId) => {
    setNodes((prevNodes) => prevNodes.map((each) =>
      each.id === NodeId
        ? { ...each, data: { ...each.data, flowLogic: e } }
        : each
    ));
  }

  const onChangeConfigureConditions = (e, NodeId, conditionObjId, conditionType) => {
    setNodes(prevNodes =>
      prevNodes.map(each =>
        each.id === NodeId
          ? {
            ...each,
            data: {
              ...each.data,
              flowLogicConditions: each.data.flowLogicConditions.map(condition =>
                condition.id === conditionObjId
                  ? {
                    ...condition,
                    [conditionType]: e
                  }
                  : condition
              )
            }
          }
          : each
      )
    );
  };

  const OnConfigureLogicalOperators = (NodeId) => {
    setNodes(prevNodes =>
      prevNodes.map(each =>
        each.id === NodeId
          ? {
            ...each,
            data: {
              ...each.data,
              flowLogicConditions: [...each.data.flowLogicConditions,
              {
                id: (each.data.flowLogicConditions.length + 1).toString(),
                filter: '',
                condition: '',
                event: '',
                operator: ''
              }]

            }
          }
          : each
      )
    );
  }

  const ConfigurewriteOperator = (operator, NodeId, conditionObjId) => {
    setNodes(prevNodes =>
      prevNodes.map(each =>
        each.id === NodeId
          ? {
            ...each,
            data: {
              ...each.data,
              flowLogicConditions: each.data.flowLogicConditions.map((con) => con.id === conditionObjId ? { ...con, operator: operator } : con)

            }
          }
          : each
      )
    );
  }

  const ConfigureOnDeleteConditionSet = (NodeId, conditionObjId) => {
    setNodes(prevNodes =>
      prevNodes.map(each =>
        each.id === NodeId
          ? {
            ...each,
            data: {
              ...each.data,
              flowLogicConditions: each.data.flowLogicConditions.filter(condition => condition.id !== conditionObjId)
            }
          }
          : each
      ).map(node => {
        if (node.id === NodeId && node.data.flowLogicConditions.length <= 1) {
          return {
            ...node,
            data: {
              ...node.data,
              flowLogicConditions: node.data.flowLogicConditions.map((condition, index) => ({
                ...condition,
                operator: index === node.data.flowLogicConditions.length - 1 ? '' : condition.operator
              }))
            }
          };
        }
        return node;
      })
    );
  };

  //CONFIGURE UPDATION FUNCTIONS//              <<<<<<<<<<<<<<<<<<<<    2

  //------------------------------------------------------------------------------------------------------------------------------------------------------//

  //RESPONSE UPDATION FUNCTIONS//               >>>>>>>>>>>>>>>>>>>>    3

  const onChangeCoreActionValue = (e, NodeId) => {
    setNodes((prevNodes) => prevNodes.map((each) =>
      each.id === NodeId
        ? { ...each, data: { ...each.data, coreAction: e } }
        : each
    ))
  }

  const onChangeActionResponseValue = (e, NodeId) => {
    setNodes((prevNodes) => prevNodes.map((each) =>
      each.id === NodeId ?
        { ...each, data: { ...each.data, actionResponse: e } }
        : each
    ))
  }

  //RESPONSE UPDATION FUNCTIONS//               <<<<<<<<<<<<<<<<<<<<    3

  //------------------------------------------------------------------------------------------------------------------------------------------------------//

  //SCHEDULE UPDATION FUNCTIONS//               >>>>>>>>>>>>>>>>>>>>    4

  const onChangeSchedule = (e, NodeId) => {
    setNodes((prevNodes) => prevNodes.map((each) =>
      each.id === NodeId
        ? { ...each, data: { ...each.data, schedule: e } }
        : each
    ))
  }

  const nodeColor = (node) => {
    switch (node.type) {
      case 'outputNode':
        return '#ff0072';
      case 'inputNode':
        return '#6865A5';
      case 'defaultNode':
        return 'lightgreen';
      default:
        return '#fff';
    }
  };

  const UpdateRightActiveTab = (id) => setActiveRighttab(id)

  const updateDepartment = (value) => {
    setSelectedDept(value)
    setSelectedSubDept('')
  }

  const toggleDetailsContainer = () => setIsDetailsOpen(prevstate => !prevstate)

  const setAutomatorFields = (data) => {
    UpdateRightActiveTab('action-button-data')
    setSelectedActionBtnData(data)
  }

  const onEditorClick = () => {
    UpdateRightActiveTab('Properties')
    setIsDetailsOpen(false)
  }

  const onActionBtnClick = (node) => {
    setAutomatorFields(node.data)
    setIsDetailsOpen(false)
  }

  const renderAppropriateRightTab = () => {
    let TabToRender;
    if (activeRightTab === 'Properties' && flowData.data !== undefined) {
      if (selectedFormData && typeof selectedFormData === 'object') {
        if (selectedFormData.type === 'trigger') {
          TabToRender = <Trigger
            activeRightTab={activeRightTab}
            isRightPanalActive={isRightPanalActive}
            selectedFormData={selectedFormData}
            onChangeCustomLabel={onChangeCustomLabel}
            onChangeDescriptionValue={onChangeDescriptionValue}
            onChangeTicketTypeValue={onChangeTicketTypeValue}
            onChangeTriggerValue={onChangeTriggerValue}
            table={table}
            setTable={setTable}
            onChangeTriggerTable={onChangeTriggerTable}
            onChangeTriggerComments={onChangeTriggerComments}
            onChangeTriggerConditions={onChangeTriggerConditions}
            OnTriggerLogicalOperators={OnTriggerLogicalOperators}
            writeOperator={writeOperator}
            OnDeleteConditionSet={OnDeleteConditionSet}
            WhoCanAccessTrigger={WhoCanAccessTrigger}
            nodes={nodes}
            edges={flowData.data ? flowData.data.activeEdges : []}
            flowData={flowData}
            setFlowData={setFlowData}
          />
        } else if (selectedFormData.type === 'configure') {
          TabToRender = <Configure
            activeRightTab={activeRightTab}
            isRightPanalActive={isRightPanalActive}
            selectedFormData={selectedFormData}
            onChangeCustomLabel={onChangeCustomLabel}
            onChangeDescriptionValue={onChangeDescriptionValue}
            onChangeFlowLogicValue={onChangeFlowLogicValue}
            onChangeTriggerComments={onChangeTriggerComments}
            onChangeConfigureConditions={onChangeConfigureConditions}
            OnConfigureLogicalOperators={OnConfigureLogicalOperators}
            ConfigurewriteOperator={ConfigurewriteOperator}
            ConfigureOnDeleteConditionSet={ConfigureOnDeleteConditionSet}
            nodes={nodes}
            edges={flowData.data ? flowData.data.activeEdges : []}
            setTable={setTable}
            onChangeTriggerTable={onChangeTriggerTable}
            flowData={flowData}
            setFlowData={setFlowData}
          />
        } else if (selectedFormData.type === 'response') {
          TabToRender = <Response
            activeRightTab={activeRightTab}
            isRightPanalActive={isRightPanalActive}
            selectedFormData={selectedFormData}
            onChangeCustomLabel={onChangeCustomLabel}
            onChangeDescriptionValue={onChangeDescriptionValue}
            onChangeTriggerComments={onChangeTriggerComments}
            onChangeCoreActionValue={onChangeCoreActionValue}
            onChangeActionResponseValue={onChangeActionResponseValue}
            nodes={nodes}
            edges={flowData.data ? flowData.data.activeEdges : []}
            setTable={setTable}
            onChangeTriggerTable={onChangeTriggerTable}
            flowData={flowData}
            setFlowData={setFlowData}
          />
        } else if (selectedFormData.type === 'schedule') {
          TabToRender = <Schedule
            activeRightTab={activeRightTab}
            isRightPanalActive={isRightPanalActive}
            selectedFormData={selectedFormData}
            onChangeCustomLabel={onChangeCustomLabel}
            onChangeTriggerComments={onChangeTriggerComments}
            onChangeSchedule={onChangeSchedule}
            nodes={nodes}
            flowData={flowData}
            setFlowData={setFlowData}
          />
        } else if (selectedFormData.type === 'connect') {
          TabToRender = <Connect
            activeRightTab={activeRightTab}
            isRightPanalActive={isRightPanalActive}
            selectedFormData={selectedFormData}
            onChangeCustomLabel={onChangeCustomLabel}
            onChangeDescriptionValue={onChangeDescriptionValue}
            onChangeTriggerComments={onChangeTriggerComments}
            nodes={nodes}
            flowData={flowData}
            setFlowData={setFlowData}
          />
        }
      }
    }
    return TabToRender;
  };

  const setNodesData = (activeFlowData) => setNodes([...nodes.activeNodes])

  function formatDateToMySQL(date) {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');

    let microseconds = (date.getMilliseconds() * 1000).toString().padStart(6, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${microseconds}`;
  }

  const onIncompleteSubmission = () => Swal.fire("Please Fill All The Required Fields");

  // console.log('data :', flowData)
  return (
    <WonContext.Consumer>
      {value => {
        const { triggerFlows, setactiveFlowData, activeFlowData } = value
        {/* { nodes.length > 1 ? setactiveFlowData(flowData.data) : null } */ }
        {/* console.log(activeFlowData) */ }

        const onAddFlow = async (e) => {
          e.preventDefault()
          if (flowData.flowName === '' || flowData.category === '' || flowData.subcategory === '' || flowData.description === '') {
            return onIncompleteSubmission()
          }
          console.log(flowData)

          const newFlowData = {
            ...flowData,
            flowName: flowData.flow_name,
            subCategory: flowData.sub_category,
            service: '',
            createdBy: 'Kartheek',
            triggerName: 'Email recieved to by the User',
            created: formatDateToMySQL(new Date()),
            data: JSON.stringify(flowData.data)
          }

          const url = 'http://localhost:3001/flows/newFlow'
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFlowData)
          }

          const response = await fetch(url, options)
          if (response.ok) {
            onSuccessfulSubmit("Flow Submitted Successfully")
            navigator('/All Flows')
          }
          console.log(response.ok)
        }

        return (
          <MainContainer>
            <BodyContainer>
              <ReactflowHeader>
                <BackBtn type="button" title="Back" onClick={() => navigator(-1)}> <IoChevronBackOutline size={28} /> </BackBtn>

                <Group>
                  <Input
                    type="text"
                    required
                    value={flowData ? flowData.flow_name : ''}
                    onChange={(e) => setFlowData({ ...flowData, flow_name: e.target.value })}
                  />
                  <Label>Flow Name</Label>
                  <Bar />
                  <Highlight />
                </Group>

                <DropDownContainer isOpen={isDepartmentOpen}>
                  <DropdownBtn type="button" >
                    {flowData ?
                      flowData.category !== null ? flowData.category :
                        <span style={{ color: '#c0c0c0', fontWeight: 'normal' }}>Category</span> :
                      null}
                    <IoMdArrowDropdown />
                  </DropdownBtn>

                  <DropdownUl id='dropdown' className="dropdown" isopen={isDepartmentOpen}>
                    {Object.keys(departmentsData).map(department => (
                      <li key={department}
                        onClick={() => setFlowData({ ...flowData, category: department })}>
                        <a href="#" onClick={() => setFlowData({ ...flowData, category: department })}>{department}</a>
                      </li>
                    ))}
                  </DropdownUl>
                </DropDownContainer>

                <DropDownContainer isOpen={isDepartmentOpen}>
                  <DropdownBtn type="button" >{flowData ? flowData.sub_category !== null ? flowData.sub_category : <span style={{ color: '#c0c0c0', fontWeight: 'normal' }}>Sub Category</span> : null} <IoMdArrowDropdown /> </DropdownBtn>

                  <DropdownUl id='dropdown' className="dropdown" isopen={isDepartmentOpen}>
                    {flowData.category && flowData.category !== '' ? departmentsData[flowData.category].map(department => (
                      <li key={department.id}
                        onClick={() => setFlowData({ ...flowData, sub_category: department.name })}
                      >
                        <a href="#"
                          onClick={() => setFlowData({ ...flowData, sub_category: department.name })}
                        >
                          {department.name}
                        </a>
                      </li>
                    )) : null}
                  </DropdownUl>
                </DropDownContainer>

                <Group style={{ width: '350px' }}>
                  <Input
                    type="text"
                    required
                    value={flowData ? flowData.description : ''}
                    onChange={(e) => setFlowData({ ...flowData, description: e.target.value })}
                  />
                  <Label>Description</Label>
                  <Bar />
                  <Highlight />
                </Group>

                <DropDownContainer isOpen={isDepartmentOpen}>
                  <DropdownBtn type="button" >
                    {
                      flowData ? flowData.mode !== 'null' ? flowData.mode :
                        <span style={{ color: '#c0c0c0', fontWeight: 'normal' }}>Mode</span> :
                        null
                    }
                    <IoMdArrowDropdown />
                  </DropdownBtn>

                  <DropdownUl id='dropdown' className="dropdown" isopen={isDepartmentOpen}>
                    {modeTypes.map(mode => (
                      <li key={mode.id}
                        onClick={() => setFlowData({ ...flowData, mode: mode.name })}
                      >
                        <a href="#"
                          onClick={() => setFlowData({ ...flowData, mode: mode.name })}
                        >
                          {mode.name}
                        </a>
                      </li>
                    ))}
                  </DropdownUl>
                </DropDownContainer>

                <ToggleContainer>
                  <FlowActivateLabel>Activate </FlowActivateLabel>
                  <SwitchContainer active={flowData ? flowData.active == 'true' : false} >
                    <Knob active={flowData ? flowData.active == 'true' : false} onClick={() => setFlowData({ ...flowData, active: flowData.active === 'true' ? 'false' : 'true' })}>
                      <IoSettings size={10} />
                    </Knob>
                  </SwitchContainer>
                </ToggleContainer>

                {id !== 'new' ?
                  <SaveBtn className="p-2 !px-3" type='button' onClick={async () => await updateFlowData()} >
                    Save <BsCloudArrowUp size={20} />
                  </SaveBtn> :
                  <SubmitBtn type="button" onClick={onAddFlow}> Submit <GrDocumentUpdate /></SubmitBtn>
                }
              </ReactflowHeader>

              <WorkflowContainer>
                <FieldsAndFlowArea>
                  <FieldsContainer>
                    <FieldsList active={false}>
                      {_.map(fieldInitialNodes, (node) =>
                        <FieldItem
                          className="p-2"
                          key={node.id}
                          id={JSON.stringify(node)}
                          onClick={() => onActionBtnClick(node)}
                        >
                          {node.icon} {node.data.label}
                        </FieldItem>
                      )}
                    </FieldsList>
                  </FieldsContainer>

                  {isFetchingData ?
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', flexWrap: 'wrap', columnGap: '100px', padding: '2%' }}>
                      {/* <BarLoader color={'green'} loading={isFetchingData} cssOverride={override} size={20} aria-label="Loading Spinner" data-testid="loader" />
                                            <BeatLoader color={'green'} loading={isFetchingData} cssOverride={override} size={20} aria-label="Loading Spinner" data-testid="loader" />
                                            <BounceLoader color={'green'} loading={isFetchingData} cssOverride={override} size={50} aria-label="Loading Spinner" data-testid="loader" />
                                            <CircleLoader color={'green'} loading={isFetchingData} cssOverride={override} size={50} aria-label="Loading Spinner" data-testid="loader" />
                                            <ClimbingBoxLoader color={'green'} loading={isFetchingData} cssOverride={override} size={20} aria-label="Loading Spinner" data-testid="loader" />
                                            <ClipLoader color={'green'} loading={isFetchingData} cssOverride={override} size={50} aria-label="Loading Spinner" data-testid="loader" />
                                            <ClockLoader color={'green'} loading={isFetchingData} cssOverride={override} size={40} aria-label="Loading Spinner" data-testid="loader" />
                                            <DotLoader color={'#4361ee'} loading={isFetchingData} cssOverride={override} size={50} aria-label="Loading Spinner" data-testid="loader" />
                                            <FadeLoader color={'green'} loading={isFetchingData} cssOverride={override} size={20} aria-label="Loading Spinner" data-testid="loader" />
                                            <GridLoader color={'green'} loading={isFetchingData} cssOverride={override} size={20} aria-label="Loading Spinner" data-testid="loader" />
                                            <HashLoader color={'green'} loading={isFetchingData} cssOverride={override} size={50} aria-label="Loading Spinner" data-testid="loader" />
                                            <MoonLoader color={'green'} loading={isFetchingData} cssOverride={override} size={50} aria-label="Loading Spinner" data-testid="loader" />
                                            <PacmanLoader color={'green'} loading={isFetchingData} cssOverride={override} size={20} aria-label="Loading Spinner" data-testid="loader" />
                                            <PuffLoader color={'green'} loading={isFetchingData} cssOverride={override} size={50} aria-label="Loading Spinner" data-testid="loader" />
                                            <PulseLoader color={'green'} loading={isFetchingData} cssOverride={override} size={20} aria-label="Loading Spinner" data-testid="loader" />
                                            <RingLoader color={'green'} loading={isFetchingData} cssOverride={override} size={50} aria-label="Loading Spinner" data-testid="loader" />
                                            <RiseLoader color={'green'} loading={isFetchingData} cssOverride={override} size={20} aria-label="Loading Spinner" data-testid="loader" />
                                            <RotateLoader color={'green'} loading={isFetchingData} cssOverride={override} size={20} aria-label="Loading Spinner" data-testid="loader" />
                                            <ScaleLoader color={'green'} loading={isFetchingData} cssOverride={override} size={20} aria-label="Loading Spinner" data-testid="loader" />
                                            <PropagateLoader color={'green'} loading={isFetchingData} cssOverride={override} size={20} aria-label="Loading Spinner" data-testid="loader" />
                                            <SyncLoader color={'green'} loading={isFetchingData} cssOverride={override} size={20} aria-label="Loading Spinner" data-testid="loader" /> */}

                      <CircularProgressBar loadingPercentage={loadingPercentage} type='circular' />
                    </div> :
                    <ReactFlowArea>
                      {
                        flowData.data ?
                          <ExpandAndCollapse
                            setIsDetailsOpen={onEditorClick}
                            setSelectedFormData={setSelectedFormData}
                            selectedFormData={selectedFormData}
                            setCustomLabel={setCustomLabel}
                            setNodeDescription={setNodeDescription}
                            nodesAndEdges={flowData.data}
                            triggerFlows={triggerFlows}
                            setFlowData={setFlowData}
                            flowData={flowData}
                          />
                          : null}
                      {/* <ExpandAndCollapse
                                                    setIsDetailsOpen={onEditorClick}
                                                    setSelectedFormData={setSelectedFormData}
                                                    selectedFormData={selectedFormData}
                                                    setCustomLabel={setCustomLabel}
                                                    setNodeDescription={setNodeDescription}
                                                    nodesAndEdges={flowData.data}
                                                    triggerFlows={triggerFlows}
                                                    setFlowData={setFlowData}
                                                    flowData={flowData}
                                                />
                                        } */}
                    </ReactFlowArea>}
                </FieldsAndFlowArea>

                <FieldDetailsContainer isOpened={isDetailsOpen}>
                  <HideBtn data-tooltip-id="my-tooltip" data-tooltip-content="Open / Hide" type="button" isOpen={isDetailsOpen} onClick={toggleDetailsContainer}><MdArrowBackIosNew size={18} /> </HideBtn>
                  <Tooltip id="my-tooltip" />

                  <NodeRightConfiguration >
                    {activeRightTab === 'Properties' ?

                      renderAppropriateRightTab()
                      :
                      activeRightTab === 'action-button-data' ? (
                        <FieldsList>
                          <FormDetailsTitle>Action Button Data</FormDetailsTitle>
                          <SelectedFieldName>Selected Action Button Data
                            <SelectedType type='text' value={selectedActionBtnData !== undefined ? selectedActionBtnData.label : null} />
                          </SelectedFieldName>
                        </FieldsList>
                      ) : <RightFieldsContainer active={activeRightTab !== 'form-data'} firstTab={activeRightTab === 'notification'}></RightFieldsContainer>}
                  </NodeRightConfiguration>

                </FieldDetailsContainer>
              </WorkflowContainer>
            </BodyContainer>
          </MainContainer>
        )
      }}
    </WonContext.Consumer>
  );
}
