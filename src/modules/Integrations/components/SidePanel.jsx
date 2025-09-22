import { useState, useEffect } from "react";

import { IoMdClose } from "react-icons/io"
import { HiMiniArrowsPointingIn, HiMiniArrowsPointingOut } from "react-icons/hi2";
import { RiEditFill } from "react-icons/ri";
import TriggerForm from "./TriggerForm"
import ActionForm from "./ActionForm";
import { getTableData } from "../../../utils/CheckAndExecuteFlows/CRUDoperations";

export default function IntegrationSidePanel({ nodeData, setNodes, closePanel }) {
  const [maxView, setMaxView] = useState(false)
  const [appsData, setAppsData] = useState([])
  const [connectionsSources, setConnectionSources] = useState([])
  const [formData, setFormData] = useState({
    app: "",
    event: "",
  });
  const [changeEvent, setChangeEvent] = useState('')

  useEffect(() => {
    // console.log('node data:', nodeData)
    if (nodeData.data.formData) {
      setFormData(nodeData.data.formData)
    }
    getSourcesData()
  }, [nodeData])

  useEffect(() => {
    setChangeEvent(formData.event)
  }, [formData.event])

  const getSourcesData = async () => {
    try {
      const data = await getTableData('apps')
      const conectionsData = await getTableData("connections");
      // console.log(data.apps)
      const filteredApps = data.apps.filter(app => app.connections > 0)
      const filteredConnections = conectionsData.connections.filter((connection) => connection.method === 'soap').map(connection => (
        {
          id: connection.id,
          app: connection.app_name,
          action: connection.connection_parameter,
          method: connection.method,
          wsdlUrl: connection.source_path,
        }
      ))
      setAppsData(filteredApps)
      setConnectionSources(filteredConnections)
    } catch (err) {
      console.log('error getting apps data.', err)
    }
  }

  const editLabelHandler = (e) => {
    setNodes(prev => prev.map(node => node.id === nodeData.id
      ? { ...node, data: { ...nodeData.data, label: e.target.value } }
      : node))
  }

  const renderNodeForm = () => {
    switch (nodeData.data.type) {
      case 'trigger':
        return <TriggerForm
          appsData={appsData}
          connectionsSources={connectionsSources}
          formData={formData}
          setFormData={setFormData}
          nodeData={nodeData}
          setNodes={setNodes}
          changeEvent={changeEvent}
        />
      case 'action':
        return <ActionForm
          appsData={appsData}
          connectionsSources={connectionsSources}
          formData={formData}
          setFormData={setFormData}
          nodeData={nodeData}
          setNodes={setNodes}
          changeEvent={changeEvent}
        />
      default:
        return null
    }
  }
  // console.log(nodeData)
  return (
    <div
      className={`absolute
                    ${!maxView ? 'flex-none w-[25vw] h-[80vh] right-0' : 'block w-full h-full  top-0 left-0 z-0 bg-[rgba(0,0,0,0.7)]'}
                    flex justify-center items-center`}
    >
      <div
        className={`absolute w-[25vw] h-[80vh] right-2 z-1
                        bg-[var(--background-color)] text-[var(--text-color)]
                        p-0 rounded shadow-2xl border-4 !border-[var(--primary-color)]
                        flex flex-col gap-2
                        ${maxView && 'right-[20%] left-[20%] w-[60%]'} `}
      >
        <header
          className="w-full h-[5%] m-0 px-2 flex gap-4 justify-between items-center border-b border-[#ccc]"
        >
          <div className="flex items-center gap-2 w-fit grow-1">
            <input
              value={nodeData.data.label}
              type="text"
              onChange={editLabelHandler}
              className="w-fit grow-1 px-1"
            />
          </div>
          <div className="text-[var(--primary-color)] h-fit flex items-center gap-4 !bg-inherit">
            <button
              type="button"
              onClick={() => setMaxView(!maxView)}
              className="text-[var(--text-color)] h-fit !bg-[var(--background-color)]"
            >
              {!maxView ? <HiMiniArrowsPointingOut size={18} /> : <HiMiniArrowsPointingIn size={18} />}
            </button>
            <button
              type="button"
              onClick={closePanel}
              className="text-[var(--text-color)] h-fit rounded-[50%] p-[2px] !bg-[var(--background-color)]"
            >
              <IoMdClose size={18} />
            </button>
          </div>
        </header>
        {/* <hr /> */}
        {renderNodeForm()}
      </div>
    </div>

  )
}