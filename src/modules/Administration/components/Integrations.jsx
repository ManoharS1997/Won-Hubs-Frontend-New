
import renderIcons from "../../../shared/functions/renderIcons"
import { useNavigate } from "react-router-dom";

export default function Integrations() {
  const navigate = useNavigate()

  return (
    <div className="text-center p-4 rounded flex flex-col">
      <h4>Integrations</h4>
      <p>
        Integrations are connections between different systems or applications that allow them to work together.
        They enable data exchange and communication between different platforms.
      </p>
      <div className="flex flex-col md:flex-row items-center gap-8 self-center">
        <button
          type="button"
          onClick={() => navigate("/All Integrations")}
          className="shadow w-fit self-center py-2 px-4 !rounded-full flex gap-2 items-center hover:!bg-white !bg-linear-to-l from-[#4c027e] to-[#8d3ef5] text-white hover:!text-gray-900"
        >
          Go to Integrations
          {renderIcons("MdOutlineOpenInNew", 15, "inherit")}
        </button>
        <button
          type="button"
          onClick={() => navigate("/create/new-integration")}
          className="shadow w-fit self-center py-2 px-4 !rounded-full flex gap-2 items-center hover:!bg-white text-black hover:!text-gray-900"
        >
          Create Integration
          {renderIcons("IoAddOutline", 20, "inherit")}
        </button>
      </div>
      <ul className="grid md:grid-cols-2 m-0 p-0 gap-4 justify-center">
        <li className="flex flex-col md:flex-row md:w-[80%] m-auto items-center gap-2 text-left p-4 rounded">
          <span className=" rounded-full p-3">
            {renderIcons("PiPlugsConnected", 35)}
          </span>
          <p>
            Integrations are connections between different systems or applications that allow them to work together.
            They enable data exchange and communication between different platforms.
          </p>
        </li>
      </ul>
    </div>
  );
}
