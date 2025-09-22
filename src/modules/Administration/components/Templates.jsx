import renderIcons from "../../../shared/functions/renderIcons"
import { useNavigate } from "react-router-dom";

export default function Templates() {
  const navigate = useNavigate()
  return (
    <div className="text-center p-4 rounded flex flex-col">
      <h4>Templates</h4>
      <p>
        Templates are pre-defined structures or formats that can be used to create new documents, forms, or other items quickly and consistently. They provide a starting point for users, ensuring that the final product adheres to a specific design or layout.
        Templates can be used in various applications, such as word processors, spreadsheets, and web forms, to streamline the creation process and maintain consistency across multiple items.
        Templates can be customized to fit specific needs or preferences, allowing users to create documents that meet their unique requirements.
        Templates can be shared and collaborated on by multiple users, ensuring that everyone is working from the same starting point and maintaining consistency across the organization.
      </p>
      <div className="flex flex-col md:flex-row items-center gap-8 self-center">
        <button
          type="button"
          onClick={() => navigate("/All Templates")}
          className="shadow w-fit self-center py-2 px-4 !rounded-full flex gap-2 items-center hover:!bg-white !bg-linear-to-l from-[#03f5b9] to-[#0b9b88] text-white hover:!text-gray-900"
        >
          Go to Templates
          {renderIcons("MdOutlineOpenInNew", 15, "inherit")}
        </button>
        <button
          type="button"
          onClick={() => navigate("/create/template")}
          className="shadow w-fit self-center py-2 px-4 !rounded-full flex gap-2 items-center hover:!bg-white text-black hover:!text-gray-900"
        >
          Create Template
          {renderIcons("IoAddOutline", 20, "inherit")}
        </button>
      </div>
      <ul className="grid md:grid-cols-2 m-0 p-0 gap-4 justify-center">
        <li className="flex flex-col md:flex-row md:w-[80%] m-auto items-center gap-2 text-left p-4 rounded">
          <span className=" rounded-full p-3">
            {renderIcons("GoProjectTemplate", 35)}
          </span>
          <p>
            Templates can be used to create new documents, forms, or other items quickly and consistently.
            They provide a starting point for users, ensuring that the final product adheres to a specific design or layout.
          </p>
        </li>
      </ul>
    </div>
  );
}