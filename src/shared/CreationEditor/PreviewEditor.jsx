import { render } from "react-dom";
import renderIcons from "../functions/renderIcons";
import { GoTriangleDown } from "react-icons/go";
import { useState } from "react";

const PreviewEditor = ({ formData, onFinish }) => {
    const data = formData || {
        name: "Hospital Notice",
        from: "admin@wonpulse.com",
        to: "doctor@wonpulse.com",
        cc: "staff@wonpulse.com",
        subject: "Monthly Summary Report",
        type: "Global",
        description: "This is a dummy preview email for demonstration purposes.",
        content: `
      <p>Dear Team,</p>
      <p>
        Please find attached the monthly summary report for all departments.<br>
        Review the data and submit your feedback by the end of the week.
      </p>
      <p>
        Regards,<br/>
        <strong>Won Pulse Admin</strong>
      </p>
    `,
        timestamp: "Sat, 18 Oct 2025 11:13 AM"
    };
    const [showCC, setShowCC] = useState(false);

    return (
        // <div className="min-h-screen bg-[#f6f8fc] p-6 flex justify-center items-start">
        //   <div className="w-full max-w-2xl bg-white rounded-md shadow-md">
        //     {/* Top Bar with Subject and Finish Button */}
        //     <div className="flex justify-between items-center border-b px-6 py-4">
        //       <h2 className="text-lg font-bold text-gray-800">{data.subject}</h2>
        //       <button
        //         onClick={onFinish}
        //         className="!bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
        //       >
        //         Finish
        //       </button>
        //     </div>

        //     {/* Email Header Info */}
        //     <div className="px-6 py-4 border-b text-[15px] bg-[#f5f5f5]">
        //       <div className="mb-1">
        //         <span className="font-medium text-gray-600">From: </span>
        //         <span className="text-gray-900">{data.from}</span>
        //       </div>
        //       <div className="mb-1">
        //         <span className="font-medium text-gray-600">To: </span>
        //         <span className="text-gray-900">{data.to}</span>
        //       </div>
        //       {data.cc && (
        //         <div className="mb-1">
        //           <span className="font-medium text-gray-600">Cc: </span>
        //           <span className="text-gray-900">{data.cc}</span>
        //         </div>
        //       )}
        //       <div className="mb-1">
        //         <span className="font-medium text-gray-600">Type: </span>
        //         <span className="text-gray-900">{data.type}</span>
        //       </div>
        //       <div className="mb-1">
        //         <span className="font-medium text-gray-600">Description: </span>
        //         <span className="text-gray-900">{data.description}</span>
        //       </div>
        //       <div>
        //         <span className="font-medium text-gray-600">Date: </span>
        //         <span className="text-gray-900">{data.timestamp}</span>
        //       </div>
        //     </div>

        //     {/* Email Body */}
        //     <div className="px-6 py-6 text-gray-900 leading-relaxed email-body" style={{ fontFamily: "Segoe UI, Arial, sans-serif" }}
        //       dangerouslySetInnerHTML={{ __html: data.content }}
        //     ></div>
        //   </div>
        // </div>
        <div>
            <div className="h-[100%] w-100%">
                <div className="flex justify-between p-2">
                    <div className="mt-10 flex">
                        <button>{renderIcons("IoIosArrowBack")}</button>
                        <h4>Title Displays Here</h4>
                    </div>
                    <div className="mt-10 ">
                        <span className=" text-gray-400">{data.timestamp}</span>
                    </div>
                </div>
                <div className="flex justify-between w-[98%]">
                    {/* subject Container */}
                <div className="ml-5 px-3">
                    <div className="flex gap-2">
                    <span>From Email Displays here</span>
                  <button onClick={() => setShowCC(!showCC)}> <span>{renderIcons("GoTriangleDown",22,"grey")}</span></button>
                  </div>
                {showCC && <p className="text-gray-500">cc1@example.com, cc2@example.com,cc3@example.com</p>}
                </div>
                <div>
                    <span className="text-blue-700">toemail@gmail.com</span>
                </div>
                </div>
                <div className="p-2 ml-6">
                <h4 className='m-0 p-0 mb-1'>Subject Displays Here : Diwali Wishes</h4>
                <p className='m-0 p-0 text-gray-800 ml-3'>Subject Description Displays Here if it extends line 1 line 333ghgrfhgb</p>
                </div>
                {/* Content Container */}
                <div className="flex min-h-[70vh]">
                <div className="border border-gray-300 rounded-md m-5 p-5 min-h-full w-[80%]">
                    <p>Content Displays Here</p>
                </div>
                </div>
            </div>
        </div>

    );
};

export default PreviewEditor;
