
import renderIcons from "../../../shared/functions/renderIcons"
import { useNavigate } from "react-router-dom";

export default function Relations() {
  const navigate = useNavigate()
  return (
    <div className="text-center p-4 rounded flex flex-col">
      <h4>Relations</h4>
      <p>
        Relations are a way to organize users. They can be used to create
        relations between cmdb ci records and display in graphical
        representations. Relations can be used to create relations between users
        and display in graphical representations.
      </p>
      <div className="flex flex-col md:flex-row items-center gap-8 self-center">
        <button
          type="button"
          onClick={() => navigate("/all-relations")}
          className="shadow w-fit self-center py-2 px-4 !rounded-full flex gap-2 items-center hover:!bg-white !bg-linear-to-l from-[#2f02f7] to-[#bead4a] text-white hover:!text-gray-900"
        >
          Go to Relations
          {renderIcons("MdOutlineOpenInNew", 15, "inherit")}
        </button>
        <button
          type="button"
          onClick={() => navigate("/create/new-relation")}
          className="shadow w-fit self-center py-2 px-4 !rounded-full flex gap-2 items-center hover:!bg-white text-black hover:!text-gray-900"
        >
          Create Relation
          {renderIcons("IoAddOutline", 20, "inherit")}
        </button>
      </div>
      <ul className="grid md:grid-cols-2 m-0 p-0 gap-4 justify-center">
        <li className="flex flex-col md:flex-row md:w-[80%] m-auto items-center gap-2 text-left p-4 rounded">
          <span className=" rounded-full p-3">
            {renderIcons("LuGitPullRequestCreateArrow", 35)}
          </span>
          <p>
            Relations are a way to organize users. They can be used to create
            new documents, forms, or other items quickly and consistently. They
            provide a starting point for users, ensuring that the final product
            adheres to a specific design or layout.
          </p>
        </li>
      </ul>
    </div>
  );
}