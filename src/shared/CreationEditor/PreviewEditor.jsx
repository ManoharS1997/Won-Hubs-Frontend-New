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
        <div className="overflow-hidden">
            <div className="h-[100%] w-[100%] ">
                <div className="mt-3 mb-2  min-h-[5vh]  px-3">
                    <button className="mt-10">{renderIcons("IoIosArrowBack", 25)}</button>
                    <button onClick={onFinish} className="float-right px-4 py-2 !bg-[#150363] hover:bg-blue-700 text-white !rounded-lg ml-8">Finish</button>
                </div>

                
                <div className="flex justify-between px-4 mb-1">
                    <h4 className='mb-1'>Title Displays Here</h4>
                    <span className=" text-gray-400 text-[15px]">{data.timestamp}</span>
                </div>
                <div className="flex justify-between w-[98%]">
                    {/* subject Container */}
                    <div className="ml-5 px-3">
                        <div className="flex gap-2">
                            <span className="text-[15px] font-bold mb-1">from@gmail.com</span>
                            <button onClick={() => setShowCC(!showCC)}> <span>{renderIcons("GoTriangleDown", 22, "grey")}</span></button>
                        </div>
                        {showCC && <p className="text-gray-500 mb-0 p-0 m-0">cc1@example.com, cc2@example.com,cc3@example.com</p>}
                    </div>
                    <div>
                        <span className="text-blue-700 text-[15px] font-bold">toemail@gmail.com</span>
                    </div>
                </div>
                <div className="p-2 ml-6">
                    <p className="text-[17px] font-bold mb-1">Subject  :   Diwali Wishes</p>
                    <div className="ml-20 mt-2">
                        <p className='m-0 p-0 text-gray-600'>Subject Description Displays Here Subject Description Displays Here Subject Description Displays Here Subject Description Displays Here </p>
                    </div>
                </div>
                {/* Content Container */}
                <div className="flex min-h-[66vh] mt-0">
                    <div className="border border-gray-300 rounded-md m-5 p-5 min-h-[90%] w-[96%]">
                        <p>Content Displays Here</p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PreviewEditor;
