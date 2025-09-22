
import renderIcons from "../../../shared/functions/renderIcons"
import { useNavigate } from "react-router-dom";

export default function Feedbacks() {
  const navigate = useNavigate()
  return (
    <div className="text-center p-4 rounded flex flex-col">
      <h4>Feedbacks</h4>
      <p>
        Feedbacks are essential for understanding user experience and improving the product. They can be collected through various channels such as surveys, forms, or direct communication.
        <br />
        Collecting feedback is a crucial step in the product development process. It helps identify areas for improvement, gather user opinions, and make informed decisions.
        <br />
        Feedbacks can be used to enhance user satisfaction, address pain points, and drive product innovation.
      </p>
      <div className="flex flex-col md:flex-row items-center gap-8 self-center">
        <button
          type="button"
          onClick={() => navigate("/All Feedbacks")}
          className="shadow w-fit self-center py-2 px-4 !rounded-full flex gap-2 items-center hover:!bg-white !bg-linear-to-l from-[#03e5f5] to-[#0b859b] text-white hover:!text-gray-900"
        >
          Go to Feedbacks
          {renderIcons("MdOutlineOpenInNew", 15, "inherit")}
        </button>
        <button
          type="button"
          onClick={() => navigate("/create/feedback")}
          className="shadow w-fit self-center py-2 px-4 !rounded-full flex gap-2 items-center hover:!bg-white text-black hover:!text-gray-900"
        >
          Create Feedback
          {renderIcons("RiFeedbackLine", 20, "inherit")}
        </button>
      </div>
      <ul className="grid md:grid-cols-2 m-0 p-0 gap-4 justify-center">
        <li className="flex flex-col md:flex-row w-[80%] m-auto items-center gap-2 text-left p-4 rounded">
          <span className=" rounded-full p-3">
            {renderIcons("MdOutlineFeedback", 35)}
          </span>
          <p>
            This section allows users to manage their project templates effectively.
            <br />
            Users can create, edit, and delete templates as per their requirements.
          </p>
        </li>
      </ul>
    </div>
  );
}