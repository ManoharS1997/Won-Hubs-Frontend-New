import renderIcons from "../../../shared/functions/renderIcons"
import { useNavigate } from "react-router-dom";

export default function WorkfloAutomator() {
  const navigate = useNavigate()
  return (
    <div className="text-center p-4 rounded flex flex-col">
      <h4>Workflow Automator</h4>
      <p>
        Workflow Automator allows you to automate tasks and processes within
        your application. You can create workflows that trigger actions based on
        specific conditions or events. This can be useful for automating repetitive
        tasks, reducing manual effort, and improving efficiency.
      </p>
      <div className="flex flex-col md:flex-row items-center gap-8 self-center">
        <button
          type="button"
          onClick={() => navigate("/All Flows")}
          className="shadow w-fit self-center py-2 px-4 !rounded-full flex gap-2 items-center hover:!bg-white !bg-linear-to-l from-[#f5bd03] to-[#9b610b] text-white hover:!text-gray-900"
        >
          Go to Workflow Automator
          {renderIcons("MdOutlineOpenInNew", 15, "inherit")}
        </button>
        <button
          type="button"
          onClick={() => navigate("/create/workflows")}
          className="shadow w-fit self-center py-2 px-4 !rounded-full flex gap-2 items-center hover:!bg-white text-black hover:!text-gray-900"
        >
          Create Workflows
          {renderIcons("IoAddOutline", 20, "inherit")}
        </button>
      </div>
      <ul className="grid md:grid-cols-2 m-0 p-0 gap-4 justify-center">
        <li className="flex flex-col md:flex-row md:w-[80%] m-auto items-center gap-2 text-left p-4 rounded">
          <span className=" rounded-full p-3">
            {renderIcons("FcWorkflow", 35)}
          </span>
          <p>
            Create and manage workflows that automate tasks and processes within your application.
          </p>
        </li>
      </ul>
    </div>
  );
}