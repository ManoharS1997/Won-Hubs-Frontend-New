import { useNavigate } from "react-router-dom";
import renderIcons from "../../../shared/functions/renderIcons"

export default function FormDesigner() {
  const navigate = useNavigate()
  return (
    <div className="text-center p-4 rounded flex flex-col">
      <h4>Form Designer</h4>
      <p>
        Manage and customize forms to collect data from users.
        <br />
        Form Designer allows you to create and manage forms for your
        application.
        You can customize the fields, layout, and design of the forms to suit
        your needs.
        <br />
        Form Designer is a powerful tool that can help you streamline your
        workflows and improve the user experience of your application.
      </p>
      <div className="flex flex-col md:flex-row items-center gap-8 self-center">
        <button
          type="button"
          onClick={() => navigate("/All Designs")}
          className="shadow w-fit self-center py-2 px-4 !rounded-full flex gap-2 items-center hover:!bg-white !bg-linear-to-l from-[#03f52b] to-[#0b9b47] text-white hover:!text-gray-900"
        >
          Go to Form Designer
          {renderIcons("MdOutlineOpenInNew", 15, "inherit")}
        </button>
        <button
          type="button"
          onClick={() => navigate("/create/new/design")}
          className="shadow w-fit self-center py-2 px-4 !rounded-full flex gap-2 items-center hover:!bg-white text-black hover:!text-gray-900"
        >
          Create New Design
          {renderIcons("IoAddOutline", 20, "inherit")}
        </button>
      </div>
      <ul className="grid md:grid-cols-2 m-0 p-0 gap-4 justify-center">
        <li className="flex flex-col md:flex-row md:w-[80%] m-auto items-center gap-2 text-left p-4 rounded">
          <span className=" rounded-full p-3">
            {renderIcons("MdOutlineEditNote", 35)}
          </span>
          <p>
            Form Designer allows you to create and manage forms for your
            application.
          </p>
        </li>
      </ul>
    </div>
  );
}