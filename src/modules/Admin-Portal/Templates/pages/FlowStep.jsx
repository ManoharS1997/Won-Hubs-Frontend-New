import { useState, useEffect } from "react"
import Cookies from "js-cookie";
import EditorRichUI from "../../../../shared/CreationEditor/WorkingEditor";
import PreviewEditor from "../../../../shared/CreationEditor/PreviewEditor";
import Fields from "../../../../shared/CreationEditor/Fields";
import { GetAnyRecordFromAnyTable } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";
import { useLocation } from "react-router-dom";
import CreateFeedBack2 from "../../Feedback/pages/CreateFeedBack2";

const FlowStepComponent = ({ recordId, path, }) => {
    const location = useLocation()
    const [flowStep, setFlowStep] = useState(0)
    const [templates, setTemplates] = useState([]);
    const [selectedTab, setSelectedTab] = useState('Fields')
    const [tableName, setTableName] = useState('')
    const [data, setData] = useState(
        JSON.parse(localStorage.getItem(`${path}Data`)) || {}
    );
    const [UrlPath, setPath] = useState(path)
    const [editorContent, setEditorContent] = useState("")
    const [FeedBackImageURl, setFeedBackImageURl] = useState(localStorage.getItem("ImageUrl"))
    const [Questions, setQuestions] = useState("")
    // console.log(path,"IN flowCheckFor feedBacks")

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const url = `${import.meta.env.VITE_HOSTED_API_URL}/table/feedbacks`;
                const options = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${Cookies.get("accessToken")}`,
                    },
                };

                const response = await fetch(url, options);
                let formattedLists;

                if (response.ok) {
                    const data = await response.json();

                    if (data.notifications && data.notifications.length > 0) {
                        const groupedByType = data.notifications.reduce((acc, item) => {
                            const type = item.type || "Other";
                            if (!acc[type]) acc[type] = [];
                            acc[type].push(item);
                            return acc;
                        }, {});

                        formattedLists = Object.keys(groupedByType).map((type) => ({
                            type,
                            records: groupedByType[type],
                        }));
                    } else {
                        // Fallback if no notifications returned
                        formattedLists = [
                            { type: "Desktop", records: [] },
                            { type: "Tab", records: [] },
                            { type: "Mobile", records: [] },
                        ];
                    }
                } else {
                    // Fallback if API call fails
                    formattedLists = [
                        { type: "Fields", records: [] },
                        { type: "Editor", records: [] },
                        { type: "Preview", records: [] },
                    ];
                }

                setTemplates(formattedLists);
            } catch (error) {
                console.error("Error fetching templates:", error);
                setTemplates([
                    { type: "Fields", records: [] },
                    { type: "Editor", records: [] },
                    { type: "Mobile", records: [] },
                ]);
            }
        };
        if (location) {
            // console.log(location,"Location")
            if (location.state) {
                const { path, tablename } = location.state
                // console.log(path,"Path in Fields")
                setPath(path)
                setTableName(tablename)
            }
        }
        fetchTemplates();
    }, []);

    const getRecordData = async () => {
        console.log(recordId, "recordId Here")
        const response = await GetAnyRecordFromAnyTable(path, recordId)
        console.log(response, "Response Here @alert")
        const { cc, subject, to_address, from_address, name, short_description, content, description } = response.data[0]
        const obj = {
            cc: { value: cc },
            subject: { value: subject },
            to: { value: to_address },
            from: { value: from_address },
            description: { value: short_description },
            name: { value: name }
        }
        setData(obj)
        setTableName(path)
        // console.log(path, "Here..,@get")
        if (path === "alerts") {
            setEditorContent(content)

        }
        if (path === 'notifications') {
            const { email_body } = response.data[0]
            setEditorContent(email_body)
        }
        if (path === 'feedback') {
            const { questions, image_file } = response.data[0]
            setQuestions(questions)
            localStorage.setItem("ImageUrl", JSON.stringify(image_file))
        }

    }

    useEffect(() => {
        if (recordId) {
            getRecordData()
        }
        const setLocalData = localStorage.getItem(
            (`${path}Data`)
        )
        console.log(setLocalData, "Set")
        if (JSON.parse(setLocalData) !== data) {
            setData(setLocalData)
        }
    }, [])
    const configureFields = [
        { name: "name", label: "Name", type: "text", isMandatory: true }, // Main identifier
        { name: "from", label: "From", type: "text", isMandatory: true }, // Sender
        {
            name: "to", label: "To", type: "text", isMandatory: true,
        }, // Recipient
        { name: "cc", label: "CC", type: "text", isMandatory: true },
        { name: "subject", label: "Subject", type: "text", isMandatory: true }, // CC field comes after To
        {
            name: "type",
            label: "Type",
            type: "dropdown",
            options: [
                // Feedback origin
                { label: "User Feedback", value: "user_feedback" },
                { label: "Internal Team", value: "internal_team" },
                { label: "Management/Stakeholder", value: "management_feedback" }
            ],
            isMandatory: true,
        },
        // Type of notification
        { name: "description", label: "Description", type: "textarea", isMandatory: true } // Content at the end
    ];
    //    console.log(tableName,"TableName Herre")
    //    console.log(UrlPath,"path")
    // console.log(editorContent, "EditorContent HEree..,")
    return (
        // <div className={` ${recordId?`w-[83vw]`:`w-[95vw]`}  flex flex-col
        //  ${recordId?`max-h-[83vh]`:`max-h-[90vh]`} border-2 ${recordId?`max-w-[100%]`:`max-w-[100%]`} flex-shrink-0`}>
        <div
            className={`
    ${recordId ? "w-[95vw]" : "w-[95vw]"} 
    ${recordId ? `h-[83vh]` : `h-[93vh]`}              
    flex flex-col 
    max-h-[97vh] 
    max-w-full
    grow-0                  
  `}
        >
            {/* Tabs Section */}
            <div className={`flex justify-center items-center gap-6  bg-transparent p-0 m-0 ${recordId ? 'p-0' : 'py-4'}`}>
                {templates.map((list, index) => (
                    <button
                        key={index}
                        className={`w-[100px] border-b-2 transition-all duration-500 py-2 font-semibold bg-transparent
                    ${selectedTab === list.type
                                ? "border-black text-black"
                                : "border-transparent text-gray-500 hover:text-black"
                            }`}
                        onClick={() => setSelectedTab(list.type)}
                    >
                        {list.type}
                    </button>
                ))}
            </div>

            {/* Dynamic Content Area */}
            <div className="bg-white  max-h-[100%] max-w-[100%] overflow-y-auto">
                {selectedTab === "Fields" && <Fields data={data} path={UrlPath} />}
                {(selectedTab === "Editor" && ((UrlPath !== "feedback" && tableName !== "feedback"))) && <EditorRichUI path={UrlPath} content={editorContent} />}
                {(selectedTab === "Editor" && (UrlPath == "feedback" || tableName == 'feedback')) && <CreateFeedBack2 feedbackImageUrl={FeedBackImageURl} questions={Questions} />}
                {selectedTab === "Preview" && (
                    <PreviewEditor
                        path={UrlPath}
                        detailsObject={data}
                        editorContent={editorContent}
                        recordId={recordId}
                        isUpdate={!!recordId}
                        feedbackImageUrl={FeedBackImageURl}
                        tableName={tableName}
                    />
                )}
            </div>
        </div>

    )

}
export default FlowStepComponent