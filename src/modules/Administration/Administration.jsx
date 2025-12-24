import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import renderIcons from "../../shared/functions/renderIcons"
import Notifications from "./components/Notifications";
import FormDesigner from "./components/Design";
import WorkfloAutomator from "./components/WorkflowAutomator";
import Templates from "./components/Templates";
import Relations from "./components/Relations";
import Feedbacks from "./components/Feedbacks";
import Alerts from "./components/Alerts";
import Events from "./components/Events";
import Integrations from "./components/Integrations";
import Reports from "./components/Reports";

const pageoptions = [
  { id: 12, name: 'Core Tables', icon: "ImTable2", path: 'tables' },
  { id: 1, name: 'Notifications', icon: "IoNotificationsOutline", path: 'notifications' },
  { id: 2, name: 'Feedbacks', icon: "MdOutlineFeedback", path: 'feedbacks' },
  { id: 3, name: 'Alerts', icon: "RiAlertFill", path: 'alerts' },
  { id: 4, name: 'Reports', icon: "TbReportAnalytics", path: 'reports' },
  { id: 5, name: 'Events', icon: "MdEventAvailable", path: 'events' },
  { id: 6, name: 'Integrations', icon: "PiPlugsConnected", path: 'integrations' },
  { id: 9, name: 'Form Designer', icon: "TbTemplate", path: 'form-designer' },
  { id: 10, name: 'Workflow Automator', icon: "TiFlowMerge", path: 'workflow-automator' },
  { id: 11, name: 'Templates', icon: "ImInsertTemplate", path: 'templates' },
  { id: 13, name: 'Relations', icon: "LuGitPullRequestCreateArrow", path: 'relations' },
  { id: 8, name: 'API Keys', icon: "IoKey", path: 'api-keys' },
  { id: 7, name: 'Webhooks', icon: "PiWebhooksLogoFill", path: 'webhooks' },
];

const Tables = [
  {
    id: uuid(),
    option: "Users",
    icon: "TbUsers",
    description: "Users are the people who use WON. They can be employees, contractors, or anyone else who uses WON.",
  },
  {
    id: uuid(),
    option: "Groups",
    icon: "PiUsersFourFill",
    description: "Groups are a way to organize users. They can be used to create custom roles and permissions for specific users or groups of users.",
  },
  {
    id: uuid(),
    option: "Companies",
    icon: "FaBuildingShield",
    description: "Companies are a way to organize users. They can be used to create custom roles and permissions for specific users or groups of users.",
  },
  {
    id: uuid(),
    option: "Roles",
    icon: "BsFillPersonVcardFill",
    description: "Roles are a way to organize users. They can be used to create custom roles and permissions for specific users or groups of users.",
  },
  {
    id: uuid(),
    option: "Locations",
    icon: "SlLocationPin",
    description: "Locations are a way to organize users. They can be used to create custom roles and permissions for specific users or groups of users.",
  },
  {
    id: uuid(),
    option: "Departments",
    icon: "FcDepartment",
    description: "Departments are a way to organize users. They can be used to create custom roles and permissions for specific users or groups of users.",
  },
  {
    id: uuid(),
    option: "CMDB",
    icon: "SiDatabricks",
    description: "CMDB is a way to organize users. They can be used to create custom roles and permissions for specific users or groups of users.",
  },
  {
    id: uuid(),
    option: "Connections",
    icon: "GrIntegration",
    description: "Connections are a way to organize users. They can be used to create custom roles and permissions for specific users or groups of users.",
  },
  // {
  //   id: uuid(),
  //   option: "Relations",
  //   icon: "TbTransform",
  //   description: "Relations are a way to organize users. They can be used to create relations between cmdb ci records and display in graphical representations.",
  // },
  // import { TbTransform } from "react-icons/tb";
 
];

export default function Administration() {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <div className="flex flex-col bg-inherit text-[var(--text-color)] w-full h-full 
    overflow-auto pb-4 pt-2 md:px-4 gap-4 ">
      <h2 className="m-0 text-center">Administration</h2>

      <div id="tables" className="flex flex-col shadow rounded p-4 pt-2 gap-2 ">
        <h4 className="grid grid-cols-2 md:grid-cols-3 items-center justify-between m-0">
          <span className="hidden md:block"></span>
          <span className="flex justify-center items-center">Core Tables</span>
          <button
            type="button"
            onClick={() => handleNavigation(`/create-table`)}
            className="w-fit !ml-auto !bg-inherit !text-nowrap !text-sm md:!text-[1rem] flex gap-2 items-center 
            !border-2 p-2 border-dashed !border-[#ccc] rounded hover:!bg-[#f0f0f0] 
            hover:!border-[#999]"
          >
            Create New Table
            {renderIcons("IoAddOutline", 15, "inherit")}
          </button>
        </h4>
        <ul className="grid md:grid-cols-3 gap-4 m-0 p-0">
          {Tables.map((table) => (
            <li
              key={table.id}
              onClick={() => handleNavigation(`/${table.option.toLowerCase()}`)}
              className="flex flex-col items-center gap-2 text-center inset-shadow-[0_0_13px_1px_#ccc]
               p-4 rounded-lg cursor-pointer hover:!inset-shadow-[0_0_13px_1px_var(--primary-color)] 
               transition-all duration-500 ease-in-out"
            >
              {renderIcons(table.icon, 35)}
              <span>{table.option}</span>
              <span className="text-[.8rem]">{table.description}</span>
            </li>
          ))}
        </ul>
      </div>

      <div id="notifications" className="shadow rounded">
        <Notifications />
      </div>
      <div id="feedbacks" className="shadow rounded">
        <Feedbacks />
      </div>
      <div id="alerts" className="shadow rounded">
        <Alerts />
      </div>
      <div id="reports" className="shadow rounded">
        <Reports />
      </div>
      <div id="events" className="shadow rounded">
        <Events />
      </div>
      <div id="integrations" className="shadow rounded">
        <Integrations />
      </div>
      <div id="form-designer" className="shadow rounded">
        <FormDesigner />
      </div>
      <div id="workflow-automator" className="shadow rounded">
        <WorkfloAutomator />
      </div>
      <div id="templates" className="shadow rounded">
        <Templates />
      </div>
      <div id="relations" className="shadow rounded">
        <Relations />
      </div>

      <div
        id="api-keys"
        className="text-center shadow p-4 rounded flex flex-col"
      >
        <h4>API Keys</h4>
        <p>
          API keys are used to authenticate requests made to the API. They are
          typically used for server-to-server communication.
        </p>
        <button
          type="button"
          onClick={() => handleNavigation("/api-keys")}
          className="shadow w-fit self-center py-2 px-4 !rounded flex gap-2 items-center hover:!bg-white !bg-linear-to-l from-[#3d61ff] to-[#60d6f3] text-white hover:!text-gray-900"
        >
          Go to API Keys {renderIcons("MdOutlineOpenInNew", 15, "inherit")}
        </button>
        <ul className="flex flex-col md:flex-row m-0 p-0 md:gap-4 justify-center">
          <li className="flex flex-col items-center gap-2 text-center p-4 rounded">
            <span className="shadow-[-2px_2px_1px_3px_#e756fa] p-3">
              {" "}
              {renderIcons("IoKey", 35)}
            </span>
            <p>
              Allow users to create and manage API keys for their applications.
            </p>
          </li>
          <li className="flex flex-col items-center gap-2 text-center p-4 rounded">
            <span className="shadow-[-2px_2px_1px_3px_#16a1d8] p-3">
              {" "}
              {renderIcons("MdAccessibilityNew", 35)}
            </span>
            <p>
              Let users set permissions for each API key, such as read, write,
              or delete access.
            </p>
          </li>
          <li className="flex flex-col items-center gap-2 text-center  p-4 rounded">
            <span className="shadow-[-2px_2px_1px_3px_#21ca0b] p-3">
              {renderIcons("TbHeartRateMonitor", 35)}
            </span>
            <p>
              Provide users with a dashboard to view and manage their API keys.
            </p>
          </li>
          <li className="flex flex-col items-center gap-2 text-center  p-4 rounded">
            <span className="shadow-[-2px_2px_1px_3px_#e40c0c] p-3">
              {renderIcons("LuFileClock", 35)}
            </span>
            <p>Provide users with a history of API key usage and activity.</p>
          </li>
        </ul>
      </div>

      <div
        id="webhooks"
        className="flex flex-col gap-2 text-center shadow p-4 rounded"
      >
        <h3>Webhooks</h3>
        <p>
          Webhooks are a way for an app to provide other applications with
          real-time information.
        </p>
        <ul className="w-full flex flex-col md:flex-row m-0 p-0 gap-4 justify-center">
          <li className="flex flex-col items-center gap-2 text-center border-2 border-[#FEBA17] p-4 rounded">
            {renderIcons("MdAddLink", 35)}
            <p>
              Allow users to select which events (e.g., user signup, order
              completed, payment failed) they want to receive webhooks for.
            </p>
          </li>
          <li className="flex flex-col items-center gap-2 text-center border-2 border-[#27548A] p-4 rounded">
            {renderIcons("SiTestcafe", 35)}
            <p>
              Let users send test events to validate their endpoints before
              going live.
            </p>
          </li>
          <li className="flex flex-col items-center gap-2 text-center border-2 border-[#D3E785] p-4 rounded">
            {renderIcons("LuFileClock", 35)}
            <p>
              Provide users with a dashboard to view past webhook attempts,
              including timestamps, response codes, payloads, and retry info.
            </p>
          </li>
        </ul>
        <button
          type="button"
          onClick={() => handleNavigation("/webhooks")}
          className="shadow w-fit self-center py-2 px-4 !rounded-full flex gap-2 items-center hover:!bg-linear-to-l from-[#3d61ff] to-[#60d6f3] hover:text-white"
        >
          Go to Subscription Webhooks{" "}
          {renderIcons("MdOutlineOpenInNew", 15, "inherit")}
        </button>
      </div>

      <ul className="fixed w-fit flex flex-col gap-2 m-0 p-0 bottom-5 right-2 md:right-5">
        {pageoptions.map((option) => (
          <li
            key={option.id}
            onClick={() => {
              const element = document.getElementById(option.path);
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
            className="cursor-pointer flex !p-1 md:!p-2 hover:gap-2 items-center group bg-white self-end border-
             border-[#FEBA17] inset-shadow-[0_0_3px_1px_#52df10] rounded-full transition-all duration-500 ease-in-out"
          >
            <div className="hidden md:flex overflow-hidden max-w-0 group-hover:max-w-[200px] transition-all duration-500 ease-in-out whitespace-nowrap p-0 m-0">
              {option.name}
            </div>
            <span className="hidden md:block">{renderIcons(option.icon, 20, "black")}</span>
            <span className="md:hidden block">{renderIcons(option.icon, 15, "black")}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
