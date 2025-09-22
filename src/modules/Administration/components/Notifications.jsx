
import renderIcons from "../../../shared/functions/renderIcons"
import { useNavigate } from "react-router-dom";

export default function Notifications() {
  const navigate = useNavigate()
  return (
    <div className="text-center p-4 rounded flex flex-col">
      <h4>Notifications</h4>
      <p>
        Notifications are messages that inform users about important events or updates in the system.
        They can be used to alert users about new messages, system updates, or other important information.
        Notifications can be displayed in various forms, such as pop-up alerts, banners, or notifications in the system interface.
      </p>
      <div className="flex flex-col md:flex-row items-center gap-8 self-center">
        <button
          type="button"
          onClick={() => navigate("/All Notifications")}
          className="shadow w-fit self-center py-2 px-4 !rounded-full flex gap-2 items-center hover:!bg-white !bg-linear-to-l from-[#f503f5] to-[#8a0b9b] text-white hover:!text-gray-900"
        >
          Go to Notifications {renderIcons("MdOutlineOpenInNew", 15, "inherit")}
        </button>
        <button
          type="button"
          onClick={() => navigate("/create/notification")}
          className="shadow w-fit self-center py-2 px-4 !rounded-full flex gap-2 items-center hover:!bg-white text-black hover:!text-gray-900"
        >
          Create Notification
          {renderIcons("IoAddOutline", 20, "inherit")}
        </button>
      </div>
      <ul className="grid md:grid-cols-2 gap-4 m-0 p-0 justify-center">
        <li className="flex flex-col md:flex-row w-[80%] m-auto items-center gap-2 text-left p-4 rounded">
          <span className=" rounded-full p-3">
            {renderIcons("IoKey", 35)}
          </span>
          <p>
            Create and manage notifications for users to keep them informed about important events or updates.
          </p>
        </li>
      </ul>
    </div>
  )
}