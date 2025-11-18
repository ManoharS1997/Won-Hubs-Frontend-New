import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoImageOutline } from "react-icons/io5";
import QuestionCard from "../../modules/Admin-Portal/Feedback/pages/QuestionCard";
import "./PreviewEditor.css";

// component Imports
import renderIcons from "../functions/renderIcons";
import { CreateNotificationFunction } from "../../utils/CheckAndExecuteFlows/CRUDoperations";

const PreviewEditor = (props) => {
    const Navigate = useNavigate();
    const {
        detailsObject,
        editorContent,
        path,
        isUpdate,
        recordId,
        feedbackImageUrl,
        tableName
    } = props;

    const [detailsData, setDetailsData] = useState({});
    const [showCC, setShowCC] = useState(false);
    const [showFields, setShowFields] = useState(false);
    const [displayContent, setDisplayContent] = useState(editorContent);
    // console.log(path,"path Hereeee")


    useEffect(() => {
        if (!path) return;

        const storageKey = `${path}Data`;
        const localData = localStorage.getItem(storageKey);

        // 1️⃣ Prefer localStorage data if present & valid
        if (localData) {
            try {
                const parsed = JSON.parse(localData);
                setDetailsData(parsed || {});
                return;
            } catch (err) {
                console.log("Invalid JSON in localStorage for", storageKey, err);
            }
        }

        // 2️⃣ Fallback to detailsObject (from props)
        if (detailsObject) {
            let parsedDetails = detailsObject;
            if (typeof detailsObject === "string") {
                try {
                    parsedDetails = JSON.parse(detailsObject);
                } catch (err) {
                    console.log("detailsObject is string but not valid JSON:", err);
                }
            }
            setDetailsData(parsedDetails || {});
        } else {
            setDetailsData({});
        }
    }, [path, detailsObject]);

    useEffect(() => {
        const contentInLocal = localStorage.getItem("editorContent");

        if (contentInLocal && contentInLocal !== editorContent) {
            setDisplayContent(contentInLocal);
        } else {
            setDisplayContent(editorContent || "");
        }
    }, [editorContent]);

    const getValue = (key) => detailsData?.[key]?.value || "";

    const onFinish = async () => {
        const formData = {
            ...detailsData,
            content: editorContent,
        };

        const response = await CreateNotificationFunction(
            tableName,
            formData,
            isUpdate,
            recordId
        );
        console.log("Response from preview editor:", response);

        // Cleanup if needed
        localStorage.removeItem("editorContent");
        localStorage.removeItem("questionsData");
        localStorage.removeItem(`${path}Data`)
        localStorage.removeItem("ImageUrl");

        const navigatedPath =
            path === "notifications"
                ? path.charAt(0).toUpperCase() + path.slice(1)
                : path.charAt(0).toUpperCase() + path.slice(1) + "s";

        // Uncomment when you want to navigate after save:
        Navigate(`/All ${navigatedPath}`, { replace: true });
    };

    // console.log(tableName,"Path Hereee")
    return (
        <div
            className={`h-[100%] w-[100%] px-2 py-0 ${showCC ? "overflow-y-auto custom-scrollbar" : "overflow-hidden"
                }`}
        >
            {/* 🔹 Header Section */}
            <div className="min-h-[2vh] flex justify-between mt-2">
                <div className="flex items-center gap-2">
                    <h1 className="!text-[20px] font-medium text-gray-800">Email Info</h1>
                    <button
                        className="bg-transparent p-0 m-0 flex items-center justify-center"
                        onClick={() => setShowFields((prev) => !prev)}
                    >
                        <span className="flex items-center">
                            {renderIcons("GoTriangleDown", 22, "black")}
                        </span>
                    </button>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={onFinish}
                        className="float-right px-4 py-2 !bg-[#150363] hover:bg-blue-700 text-white !rounded-lg ml-8"
                    >
                        {recordId ? "Update" : "Create"}
                    </button>
                    <button
                        onClick={onFinish}
                        className="float-right px-4 py-2 !bg-[#150363] hover:bg-blue-700 text-white !rounded-lg "
                    >
                        {recordId ? "Save" : "Cancel"}
                    </button>
                </div>
            </div>

            {/* 🔹 Email Details */}
            {showFields && (
                <>
                    <div className="flex justify-between mt-1 mb-0 pl-2">
                        <p className="text-[20px] font-bold m-0 px-4">
                            {getValue("name") || "No Title"}
                        </p>
                        <span className="text-gray-400 text-[15px] mt-2">
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
                                <button onClick={() => setShowCC((prev) => !prev)}>
                                    <span>
                                        {renderIcons("MdOutlineKeyboardArrowDown", 22, "grey")}
                                    </span>
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

                    {/* Subject + Description */}
                    <div className="p-2 ml-6">
                        <p className="text-[17px] font-bold m-0">
                            Subject: {getValue("subject") || "No Subject"}
                        </p>
                        <div className="ml-20 mt-2">
                            <p className="m-0 p-0 text-gray-600">
                                {getValue("description") ||
                                    "No description available for this message."}
                            </p>
                        </div>
                    </div>
                </>
            )}

            {/* 🔹 Main Email Content */}
            <div className="flex justify-center items-start bg-transparent h-[72vh] w-full md:w-[100%] mx-auto mt-2 md:h-[77vh]">
                {/* Non-feedback preview (HTML content) */}
                {tableName && tableName.toLowerCase() !== "feedback" && (
                    <div className="border-gray-300 m-2 p-5 w-full md:w-[100%] h-[100%] overflow-y-auto bg-white custom-scrollbar rounded-md shadow-sm border-2">
                        {(() => {
                            const pages = (displayContent || "").split(
                                /<div class="page-break"[\s\S]*?<\/div>/g
                            );
                            const pageSize = "A4";

                            return pages.map((pageHtml, index) => (
                                <div key={index}>
                                    <div
                                        className={`preview-page page-${pageSize}`}
                                        dangerouslySetInnerHTML={{
                                            __html: pageHtml.trim() || "<p></p>",
                                        }}
                                    />
                                    {index < pages.length - 1 && (
                                        <div
                                            className="page-break-line"
                                            title="Page Break — hover to remove"
                                        ></div>
                                    )}
                                </div>
                            ));
                        })()}
                    </div>
                )}

                {/* 🔹 Feedback Page */}
                {tableName && tableName.toLowerCase() === "feedback" && (
                    <div className="m-2 w-[100%] h-[100%] overflow-y-auto bg-white custom-scrollbar rounded-md shadow-md flex flex-col gap-2">
                        <div className="w-[80%] mx-auto p-0">
                            <div
                                className="w-full h-[200px] relative rounded-[15px] bg-gray-180 shadow bg-center bg-no-repeat bg-contain border-1 border-blue-800"
                                style={{ backgroundImage: `url(${feedbackImageUrl})` }}
                            >
                                <label
                                    htmlFor="templateImg"
                                    className="absolute bottom-[5px] right-[5px] p-[3px] rounded-full border border-gray-300 text-black cursor-pointer bg-white hover:bg-gray-200 transition"
                                >
                                    <IoImageOutline size={20} />
                                </label>
                                <input
                                    id="templateImg"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                />
                            </div>
                        </div>
                        <QuestionCard isPreview={true} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PreviewEditor;

