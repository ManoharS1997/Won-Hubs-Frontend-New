import React, { useState } from "react";
import { replace, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//component Imports

import renderIcons from "../functions/renderIcons";
import { CreateNotificationFunction } from "../../utils/CheckAndExecuteFlows/CRUDoperations";

const PreviewEditor = () => {
    const location = useLocation();
    const Navigate = useNavigate();
    const { detailsObject, editorContent,path,isUpdate,recordId } = location.state || {};
    // console.log(detailsObject,"detailsObject in preview editor");
    // console.log(editorContent,"editorContent in preview editor");
    // console.log(path,"path in preview editor");


    const getValue = (key) => detailsObject?.[key]?.value || "";

    const [showCC, setShowCC] = useState(false);
    const onFinish = async () => {
        // Implement finish logic here
        const formData={
            ...detailsObject,
            content:editorContent
        }
        const  response = await CreateNotificationFunction(path,formData,isUpdate,recordId);
        console.log(response,"response From preview editor")
        localStorage.removeItem("editorContent");
        const navigatedPath=path.charAt(0).toUpperCase() + path.slice(1);
        // navigate(`All ${navigatedPath}s`,{ replace: true });
    }

    return (
        <div className="h-[100%] w-[100%] overflow-hidden">
            {/* Top Bar */}
            <div className="mt-3 mb-2 min-h-[5vh] px-3">
                <button className="mt-10" onClick={() => Navigate(-1)}>{renderIcons("IoIosArrowBack", 25)}</button>
                <button
                    onClick={onFinish}
                    className="float-right px-4 py-2 !bg-[#150363] hover:bg-blue-700 text-white !rounded-lg ml-8"
                >
                   {recordId ? "Update" : "Create"} 
                </button>
            </div>

            {/* Header */}
            <div className="flex justify-between px-4 mb-1">
                <h4 className="mb-1">{getValue("name") || "No Title"}</h4>
                <span className="text-gray-400 text-[15px]">
                    {new Date().toLocaleString()}
                </span>
            </div>

            {/* From / To / CC */}
            <div className="flex justify-between w-[98%]">
                <div className="ml-5 px-3">
                    <div className="flex gap-2">
                        <span className="text-[15px] font-bold mb-1">
                            {getValue("to") || "to@example.com"}
                        </span>
                        <button onClick={() => setShowCC(!showCC)}>
                            <span>{renderIcons("GoTriangleDown", 22, "grey")}</span>
                        </button>
                    </div>
                    {showCC && (
                        <p className="text-gray-500 mb-0 p-0 m-0">
                            {getValue("cc") || "cc@example.com"}
                        </p>
                    )}
                </div>

                <div>
                    <span className="text-blue-700 text-[15px] font-bold">
                        {getValue("from") || "from@example.com"}
                    </span>
                </div>
            </div>

            {/* Subject and Description */}
            <div className="p-2 ml-6">
                <p className="text-[17px] font-bold mb-1">
                    Subject: {getValue("subject") || "No Subject"}
                </p>
                <div className="ml-20 mt-2">
                    <p className="m-0 p-0 text-gray-600">
                        {getValue("description") ||
                            "No description available for this message."}
                    </p>
                </div>
            </div>

            {/* Email Content */}
            <div className="flex justify-center items-start  bg-transparent h-[65vh] w-full md:w-[95%] mx-auto  overflow-hidden p-0 mt-2">

                <div className=" border-gray-300  m-2 p-5 w-full md:w-[96%] h-[100%] overflow-y-auto bg-white custom-scrollbar rounded-md shadow-sm border-2">
                    <div
                        className="text-gray-800 leading-relaxed text-[15px]"
                        style={{ fontFamily: "Segoe UI, Arial, sans-serif" }}
                        dangerouslySetInnerHTML={{
                            __html: editorContent || "<p>No content available</p>",
                        }}
                    ></div>
                </div>
            </div>

        </div>

    );
};

export default PreviewEditor;

