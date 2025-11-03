import { useState, useEffect } from "react"
import Cookies from "js-cookie";
import EditorRichUI from "../../../../shared/CreationEditor/WorkingEditor";
import PreviewEditor from "../../../../shared/CreationEditor/PreviewEditor";
import Fields from "../../../../shared/CreationEditor/Fields";
import { GetAnyRecordFromAnyTable } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";
import { useLocation } from "react-router-dom";

const FlowStepComponent = ({ recordId, path }) => {
    const location = useLocation()
    const [flowStep, setFlowStep] = useState(0)
    const [templates, setTemplates] = useState([]);
    const [selectedTab, setSelectedTab] = useState('Fields')
    const [data, setData] = useState(JSON.parse(localStorage.getItem('templateData')) || {})
    const [UrlPath, setPath] = useState(path)
    const [editorContent, setEditorContent] = useState("")

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
                const { path } = location.state
                setPath(path)
            }
        }
        fetchTemplates();
    }, []);



    const getRecordData = async () => {
        // console.log("Triggering Here @getRecordData")
        console.log(recordId, "recordId Here")
        const response = await GetAnyRecordFromAnyTable(path, recordId)

        console.log(response, "Response Here @template")
        const { cc, subject, to_address, from_address, name, short_description, content } = response.data[0]
        const obj = {
            cc: { value: cc },
            subject: { value: subject },
            to: { value: to_address },
            from: { value: from_address },
            description: { value: short_description },
            name: { value: name }
        }
        setData(obj)
        // setEditorContent(content)

        if (path === 'notifications') {
            const { email_body } = response.data[0]
            setEditorContent(email_body)
        }
    }

    useEffect(() => {
        if (recordId) {
            getRecordData()
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


console.log(editorContent,"HEreee")
console.log(path,"path")
    return (
        <div className="w-full h-full gap-2">
            <div className="w-full flex items-center justify-center gap-4">
                {templates.map((list, index) => (
                    <button
                        key={index}
                        className={`h-fit w-[100px] !border-b-2 transition-all duration-500 py-2 font-semibold
                                                bg-transparent
                        ${selectedTab === list.type
                                ? "!border-black"
                                : "!border-transparent"
                            }`}
                        onClick={() => setSelectedTab(list.type)}
                    >
                        {list.type}
                    </button>
                ))}
            </div>
            <div className="h-[90%]">


                {
                    selectedTab === "Fields" && <Fields data={data} path={UrlPath} />
                }
                {
                    selectedTab === "Editor" && <EditorRichUI path={UrlPath} content={editorContent} />
                }
                {
                    selectedTab === "Preview" && <PreviewEditor path={UrlPath} detailsObject={data} editorContent={editorContent} recordId={recordId} isUpdate={recordId?true:false} />
                }


            </div>
        </div>
    )

}
export default FlowStepComponent