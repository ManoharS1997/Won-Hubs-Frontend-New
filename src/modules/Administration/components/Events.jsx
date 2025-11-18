import renderIcons from "../../../shared/functions/renderIcons"
import { useNavigate } from "react-router-dom";

export default function Events() {
  const navigate = useNavigate()

  return (
    <div className="text-center p-4 rounded flex flex-col">
      <h4>Events</h4>
      <p>
        Events are actions or occurrences that happen within a system or application. They can be triggered by user interactions, system changes, or external factors. Events can be used to initiate workflows, send notifications, or update data in real-time.
        Events can be categorized into different types, such as system events, user events, and application events. Each type of event can have its own set of properties and attributes that define its characteristics and behavior.
      </p>
      <div className="flex items-center justify-center gap-5">
      <button
        type="button"
        onClick={() => navigate("/All Events")}
        className="shadow w-fit self-center py-2 px-4 !rounded-full flex gap-2 items-center hover:!bg-white !bg-linear-to-l from-[#035e9b] to-[#7c1e02] text-white hover:!text-gray-900"
      >
        Go to Events
        {renderIcons("MdOutlineOpenInNew", 15, "inherit")}
      </button>
          <button
                type="button"
                onClick={() => navigate("/create/event/")}
                className="shadow w-fit self-center py-2 px-4 !rounded-full flex gap-2 items-center hover:!bg-white text-black hover:!text-gray-900"
              >
                Create Event
                {renderIcons("IoAddOutline", 20, "inherit")}
              </button>
              </div>
      <ul className="grid md:grid-cols-2 m-0 p-0 gap-4 justify-center">
        <li className="flex flex-col md:flex-row md:w-[80%] m-auto items-center gap-2 text-left p-4 rounded">
          <span className=" rounded-full p-3">
            {renderIcons("BsCalendar4Event", 35)}
          </span>
          <p>
            Event details will be displayed here.
            This is a placeholder for the event details.
            You can add more information about the event here, such as the event type, timestamp, and any relevant data associated with the event.
          </p>
        </li>
      </ul>
    </div>
  );
}
