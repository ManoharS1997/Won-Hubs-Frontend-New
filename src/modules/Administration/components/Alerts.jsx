import { useNavigate } from "react-router-dom";
import renderIcons from "../../../shared/functions/renderIcons"

export default function Alerts() {
  const navigate = useNavigate()
  return (
    <div className="text-center p-4 rounded flex flex-col">
      <h4>Alerts</h4>
      <p>
        Alerts are notifications that inform users about important events or changes in the system. They can be used to alert users about errors, warnings, or other significant events that require their attention.
        Alerts can be displayed in various formats, such as pop-ups, banners, or notifications, and can be customized to suit the needs of the application.
      </p>
      <div className="flex flex-col md:flex-row items-center gap-8 self-center">
        <button
          type="button"
          onClick={() => navigate("/All Alerts")}
          className="shadow w-fit self-center py-2 px-4 !rounded-full flex gap-2 items-center hover:!bg-white !bg-linear-to-l from-[#c2f7bd] to-[#819b0b] text-white hover:!text-gray-900"
        >
          Go to Alerts
          {renderIcons("MdOutlineOpenInNew", 15, "inherit")}
        </button>
        <button
          type="button"
          onClick={() => navigate("/create/alert")}
          className="shadow w-fit self-center py-2 px-4 !rounded-full flex gap-2 items-center hover:!bg-white text-black hover:!text-gray-900"
        >
          Create Alert
          {renderIcons("IoAddOutline", 20, "inherit")}
        </button>
      </div>
      <ul className="grid md:grid-cols-2 m-0 p-0 gap-4 justify-center">
        <li className="flex flex-col md:flex-row md:w-[80%] m-auto items-center gap-2 text-left p-4 rounded">
          <span className=" rounded-full p-3">
            {renderIcons("TbAlertTriangle", 35)}
          </span>
          <p>
            Alerts can be used to notify users about important events, such as system errors, warnings, or other significant changes that require their attention.
            Alerts can be displayed in various formats, such as pop-ups, banners, or notifications, and can be customized to suit the needs of the application.
            Alerts can be used to notify users about important events, such as system errors, warnings, or other significant changes that require their
          </p>
        </li>
      </ul>
    </div>
  );
}
