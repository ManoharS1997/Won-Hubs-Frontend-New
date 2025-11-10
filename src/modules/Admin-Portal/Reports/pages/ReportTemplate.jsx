import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import TemplateSelection from "../../../../shared/components/TemplateSelection";
import WonContext from "../../../../context/WonContext";
// import FlowStepComponent from './FlowStep'

const TemplateSelectionForReports = () => {
    // const navigate = useNavigate();
    const [templates, setTemplates] = useState([]);

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
                        { type: "Desktop", records: [] },
                        { type: "Tab", records: [] },
                        { type: "Mobile", records: [] },
                    ];
                }

                setTemplates(formattedLists);
            } catch (error) {
                console.error("Error fetching templates:", error);
                setTemplates([
                    { type: "Desktop", records: [] },
                    { type: "Tab", records: [] },
                    { type: "Mobile", records: [] },
                ]);
            }
        };

        fetchTemplates();
    }, []);

    const configureFields = [
        { name: "name", label: "ReportName", type: "text", isMandatory: true }, // Main identifier
        { name: "description", label: "Description", type: "textarea", isMandatory: true },
        { name: "view", label: "View", type: "text", isMandatory: true },// tab or any thing


        {
            name: "type",
            label: "GraphType",
            type: "dropdown",
            options: [
                // Feedback origin
                { label: "Bar-Stacked", value: "Bar-Stacked" },
                { label: "Pie", value: "Pie" },
                { label: "Doughnut", value: "Doughnut" }
            ],
            isMandatory: true,
        },
        {
            name: "visibility",
            label: "Visibility",
            type: "dropdown",
            options: [
                // Feedback origin
                { label: "Public", value: "public" },
                { label: "Private", value: "private" },
            ],
            isMandatory: true,
        },

    ];


    return (
        <WonContext.Consumer>
            {() => (
                <TemplateSelection
                    lists={templates}
                    configureFields={configureFields}
                    title="Create Template"
                    path="flowreport"
                    tablename="template"
                />
            )}
        </WonContext.Consumer>
    );
};

export default TemplateSelectionForReports;
