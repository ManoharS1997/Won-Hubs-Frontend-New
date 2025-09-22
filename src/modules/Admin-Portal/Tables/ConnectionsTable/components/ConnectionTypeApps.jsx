import { useEffect, useState } from "react";

import { SiSlack, SiJira, SiTrello, SiZendesk, SiSap, SiOracle, SiPaypal } from "react-icons/si";
import { BiSolidZap } from "react-icons/bi";
import { BsMicrosoftTeams, BsMicrosoft } from "react-icons/bs";
import { FaSalesforce } from "react-icons/fa6";

import CreateConnection from "../pages/CreateConnection";
import { useNavigate } from "react-router-dom";
import convertName from "../../../../../utils/conevrtName";
const appsList = [
  { id: 1, type: 'rest', name: 'Slack', label: 'Slack', icon: <SiSlack size={20} />, description: '' },
  { id: 2, type: 'rest', name: 'Zapier', label: 'Zapier', icon: <BiSolidZap size={20} />, description: '' },
  { id: 3, type: 'rest', name: 'Jira', label: 'Jira', icon: <SiJira size={20} />, description: '' },
  { id: 4, type: 'rest', name: 'Microsoft Teams', label: 'Microsoft Teams', icon: <BsMicrosoftTeams size={20} />, description: '' },
  { id: 5, type: 'rest', name: 'Zen-Desk', label: 'Zen-Desk', icon: <SiZendesk size={20} />, description: '' },
  { id: 6, type: 'rest', name: 'Trello', label: 'Trello', icon: <SiTrello size={20} />, description: '' },

  { id: 11, type: 'soap', name: 'Soap', label: 'Salesforce', icon: <FaSalesforce size={20} />, description: '' },
  { id: 9, type: 'soap', name: 'Soap', label: 'SAP', icon: <SiSap size={20} />, description: '' },
  { id: 12, type: 'soap', name: 'Soap', label: 'Oracle', icon: <SiOracle size={20} />, description: '' },
  { id: 8, type: 'soap', name: 'Soap', label: 'Microsoft', icon: <BsMicrosoft size={20} />, description: '' },
  { id: 10, type: 'soap', name: 'Soap', label: 'IBM', icon: <SiPaypal size={20} />, description: '' },
  { id: 7, type: 'soap', name: 'Soap', label: 'Paypal', icon: <SiPaypal size={20} />, description: '' },
]

export default function ConnnetionTypeApps({ type }) {
  const [isSelected, setselected] = useState(false)
  const filteredTypeList = appsList.filter(item => item.type === type)
  const navigate = useNavigate()

  useEffect(() => {
    const directConnections = ['soap', 'webhook']
    if (directConnections.includes(type)) {
      navigate(`/new/connection/${type}/${convertName(type)}/${convertName(type)}/external`);
    }
  }, [type])

  return (
    <>
      {!isSelected && filteredTypeList.length > 0 ?
        <ul className="w-full flex flex-col md:flex-row  py-4 px-8 m-0 gap-4 overflow-auto">
          {filteredTypeList.map(app => (
            <li
              key={app.id}
              onClick={() => navigate(`/new/connection/${type}/${app.name}/${app.label}/external`)}
              className="min-w-[5rem] border p-2 flex flex-col items-center gap-2 hover:!border-[var(--primary-color)] cursor-pointer"
            >
              <span>{app.icon}</span>
              {app.label}
            </li>
          ))
          }
        </ul> :
        !isSelected ?
          <div className="w-full h-[95%] p-4 flex items-center justify-center text-[#ccc] text-center text-xl">
            Oops! No Connection Types Available!
          </div>
          :
          <CreateConnection type={isSelected} connectionType={type} />
      }
    </>
  )
}