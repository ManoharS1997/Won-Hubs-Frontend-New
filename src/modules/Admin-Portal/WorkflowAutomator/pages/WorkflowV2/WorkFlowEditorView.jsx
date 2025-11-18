// This component is created by sandhya to adjust the lay out

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Fields from '../../../../../shared/CreationEditor/Fields';
import WorkflowComponent from "./WorkflowV2";


const WorkFlowComponent = ({ recordId, path }) => {
    const location = useLocation()
    const [flowStep, setFlowStep] = useState(0)
    const [templates, setTemplates] = useState([]);
    const [selectedTab, setSelectedTab] = useState('Fields')
    const [data, setData] = useState(
        JSON.parse(localStorage.getItem(`${path}Data`)) || {}
    );
    const [UrlPath, setPath] = useState("workFlow")
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
                        { type: "Generator", records: [] },
                        { type: "Preview", records: [] },
                    ];
                }

                setTemplates(formattedLists);
            } catch (error) {
                console.error("Error fetching templates:", error);
                setTemplates([
                    { type: "Fields", records: [] },
                    { type: "Editor", records: [] },
                    { type: "Preview", records: [] },
                ]);
            }
        };
        // if (location) {
        //     // console.log(location,"Location")
        //     if (location.state) {
        //         const { path } = location.state
        //         // console.log(path,"Path in Fields")
        //         setPath(path)
        //     }
        // }
        fetchTemplates();
    }, []);
    // const getRecordData = async () => {
    //     // console.log("Triggering Here @getRecordData")
    //     console.log(recordId, "recordId Here")
    //     const response = await GetAnyRecordFromAnyTable(path, recordId)

    //     console.log(response, "Response Here @template")
    //     const { cc, subject, to_address, from_address, name, short_description, content } = response.data[0]
    //     const obj = {
    //         cc: { value: cc },
    //         subject: { value: subject },
    //         to: { value: to_address },
    //         from: { value: from_address },
    //         description: { value: short_description },
    //         name: { value: name }
    //     }
    //     setData(obj)
    //     // setEditorContent(content)

    //     if (path === 'notifications') {
    //         const { email_body } = response.data[0]
    //         setEditorContent(email_body)
    //     }
    // }
    // useEffect(() => {
    //     if (recordId) {
    //         getRecordData()
    //     }
    //     const setLocalData = localStorage.getItem(
    //         (`${path}Data`)
    //     )
    //     console.log(setLocalData,"Set")
    //     if (JSON.parse(setLocalData) !== data) {
    //         setData(setLocalData)
    //     }
    // }, [])

    // console.log(UrlPath, "Path ")
    // console.log(data, "data here")

    return (

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
            <div className="bg-white  max-h-[100%] max-w-[100%] overflow-y-auto px-2">
                {selectedTab === "Fields" && <Fields data={data} path={UrlPath} />}
                {selectedTab === 'Editor' && <WorkflowComponent />}
                {/* {selectedTab === "Preview" && (
                    <PreviewEditor
                        path={UrlPath}
                        detailsObject={data}
                        editorContent={editorContent}
                        recordId={recordId}
                        isUpdate={!!recordId}
                        feedbackImageUrl={FeedBackImageURl}
                    />
                )}  */}
                {/* <p>Hello Passionate Devoloper</p> */}
            </div>
        </div>

    )

}
export default WorkFlowComponent