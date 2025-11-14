
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TemplateSelection from "../../../../../shared/components/TemplateSelection";
import WonContext from "../../../../../context/WonContext";
import { getTableData } from "../../../../../utils/CheckAndExecuteFlows/CRUDoperations";

const WorkFlowTemplateView = () => {
    const navigate = useNavigate();
    const [templates, setTemplates] = useState([]);

    const fetchTemplates = async () => {
        try {

            const response = await getTableData('flows');
            // console.log(response, "response Here")
            let formattedLists;
            if (response.success) {
                const data = response.flows

                // if (data.flows && data.flows.length > 0){
                //     const groupedByType = data.notifications.reduce((acc, item) => {
                //         const type = item.type || "Other";
                //         if (!acc[type]) acc[type] = [];
                //         acc[type].push(item);
                //         return acc;
                //     }, {});

                //     formattedLists = Object.keys(groupedByType).map((type) => ({
                //         type,
                //         records: groupedByType[type],
                //     }));
                if (data) {
                    formattedLists = [
                        { type: "Desktop", records: data },
                        { type: "Tab", records: data },
                        { type: "Mobile", records: data },
                    ];
                }

            } else {
                console.log("TRIGGERING", "catch")

                // Fallback if no notifications returned
                formattedLists = [
                    { type: "Desktop", records: [] },
                    { type: "Tab", records: [] },
                    { type: "Mobile", records: [] },
                ];
            }

            setTemplates(formattedLists);
        } catch (error) {
            console.log("Error fetching templates:", error);
            setTemplates([
                { type: "Desktop", records: [] },
                { type: "Tab", records: [] },
                { type: "Mobile", records: [] },
            ]);
        }
    };

    useEffect(() => {
        fetchTemplates()
    }, [templates])

    const configureFields = [
        { name: "name", label: "Name", type: "text", isMandatory: true },
        { name: "from", label: "From", type: "text", isMandatory: true },
        { name: "to", label: "To", type: "text", isMandatory: true },
        { name: "cc", label: "CC", type: "text", isMandatory: true },
        {
            name: "type",
            label: "Type",
            type: "dropdown",
            options: [
                { label: "Global", value: "global" },
                { label: "Local", value: "local" },
            ],
            isMandatory: true,
        },
        { name: "subject", label: "Subject", type: "text", isMandatory: true },
        { name: "description", label: "Description", type: "text", isMandatory: true },
    ];

    return (
        <WonContext.Consumer>
            {() => (
                <TemplateSelection
                    lists={templates}
                    configureFields={configureFields}
                    title="Create Flows"
                    path='flows'
                    tablename="notification"
                />
            )}
        </WonContext.Consumer>
    );
};

export default WorkFlowTemplateView;