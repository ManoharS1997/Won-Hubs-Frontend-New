import renderIcons from "../../../shared/functions/renderIcons"
import { useNavigate } from "react-router-dom";

export default function Reports() {
  const navigate = useNavigate()
  return (
    <div className="text-center p-4 rounded flex flex-col">
      <h4>Reports</h4>
      <p>
        Reports provide insights into the system's performance and user activities. They can be generated based on various criteria and can help in decision-making processes.
        <br /><br />
        The reports can be generated in different formats such as PDF, Excel, and CSV. They can also be customized to include specific metrics and data points.
      </p>
      <div className="flex flex-col md:flex-row items-center gap-8 self-center">
        <button
          type="button"
          onClick={() => navigate("/All Reports")}
          className="shadow w-fit self-center py-2 px-4 !rounded-full flex gap-2 items-center hover:!bg-white !bg-linear-to-l from-[#02ccf0] to-[#fc7289] text-white hover:!text-gray-900"
        >
          Go to Reports
          {renderIcons("MdOutlineOpenInNew", 15, "inherit")}
        </button>
        <button
          type="button"
          onClick={() => navigate("/create/report")}
          className="shadow w-fit self-center py-2 px-4 !rounded-full flex gap-2 items-center hover:!bg-white text-black hover:!text-gray-900"
        >
          Generate Report
          {renderIcons("RiBarChartBoxAiLine", 20, "inherit")}
        </button>
      </div>
      <ul className="grid md:grid-cols-2 m-0 p-0 gap-4 justify-center">
        <li className="flex flex-col md:flex-row md:w-[80%] m-auto items-center gap-2 text-left p-4 rounded">
          <span className=" rounded-full p-3">
            {renderIcons("ImFileText2", 35)}
          </span>
          <p>
            Reports can be used to notify users about important events, such as system errors, warnings, or other significant changes that require their attention.
            <br /><br />
            Reports can be displayed in various formats, such as pop-ups, banners, or notifications, and can be customized to suit the needs of the application.
          </p>
        </li>
      </ul>
    </div>
  );
}
