import { useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import renderIcons from "../../../../../shared/functions/renderIcons";

import ConnnetionTypeApps from "../components/ConnectionTypeApps";

const typesList = [
  { id: 1, type: 'rest', name: 'REST API', icon: renderIcons('TbApi', 50), description: 'Web Service Integration. Supports OAuth, JWT, Basic Auth.' },
  { id: 2, type: 'soap', name: 'SOAP API', icon: renderIcons('GrShieldSecurity', 50), description: 'Web Service Integration. Supports OAuth, JWT, Basic Auth.' },
  { id: 3, type: 'webhook', name: 'Webhooks', icon: renderIcons('PiWebhooksLogoFill', 50), description: 'On-prem Integration. Secure bridge for local systems.' },
  // { id: 4, type: 'hub', name: 'Integrations Hub', icon: <MdOutlineHub size={50} />, description: 'Low-code integration. Spokes for third-party services.' },
  { id: 5, type: 'data-source', name: 'Data Sources', icon: renderIcons('GrResources', 50), description: 'Importing data. Supports JDBC, FTP, HTTP.' },
  // { id: 6, type: 'email', name: 'Email SMTP', icon: <SiAmazonsimpleemailservice size={50} />, description: 'Notifications & Email Processing. Create/update records from emails.' },
  // { id: 7, type: 'ldap', name: 'LDAP', icon: <MdSecurity size={50} />, description: 'User Authentication & Sync, Requires MID Server for on-prem.' },
]

export default function ChooseConnectionType() {
  const [connectionType, setConnectionType] = useState('')

  return (
    <div className="w-full h-full p-2 flex flex-col items-center gap-4 bg-[var(--background-color)] text-[var(--text-color)] overflow-auto" >
      {connectionType === '' && <h1>New Connection</h1>}
      {!connectionType ?
        <ul className="w-full m-0 h-fit grid md:grid-cols-3 justify-between gap-4 p-4">
          {typesList.map(type => (
            <li
              key={type.id}
              className={`w-full h-[200px] p-4 rounded-lg flex flex-col items-center
                        gap-2 bg-[var(--background-color)] cursor-pointer hover:bg-[#ecf8fd] 
                        transition-all duration-300 ease-in-out
                     `}
              style={{ border: '2px solid #02acd6' }}
              onClick={() => setConnectionType(type.type)}
            >
              {type.icon}
              <p className="font-bold text-[1rem] m-0">{type.name}</p>
              <p className="text-center">{type.description}</p>
            </li>
          ))}
        </ul> :
        <div className="w-full h-full">
          <button
            type="button"
            onClick={() => setConnectionType('')}
            className="w-fit h-[5%] self-start cursor-pointer !bg-[var(--background-color)]"
          >
            <MdArrowBackIosNew size={25} />
          </button>
          <ConnnetionTypeApps type={connectionType} />
        </div>}
    </div>
  )
}