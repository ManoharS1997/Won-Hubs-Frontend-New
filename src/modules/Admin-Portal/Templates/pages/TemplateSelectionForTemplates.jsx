import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import TemplateSelection from "../../../../shared/components/TemplateSelection";
import WonContext from "../../../../context/WonContext";

const TemplateSelectionForTemplate = () => {
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
        { name: "title", label: "Title", type: "text", isMandatory: true }, // Main identifier
        { name: "from", label: "From", type: "text", isMandatory: true }, // Sender
        {
            name: "to", label: "To", type: "dropdown", isMandatory: true, options: [
                { label: "Users", value: "users" },
                { label: "Roles", value: "roles" },
            ],
        }, // Recipient
        { name: "cc", label: "CC", type: "text", isMandatory: true }, // CC field comes after To
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
        {
            name: "type",
            label: "Style",
            type: "dropdown",
            options: [
                // Feedback origin / Template Type
                { label: "Landscape", value: "landscape" },
                { label: "Portrait", value: "portrait" },
                { label: "Executive", value: "executive" },
                { label: "Envelope", value: "envelope" },
                { label: "A4", value: "a4" },
                { label: "A5", value: "a5" },
            ],

            isMandatory: true,
        }, // Type of notification
        { name: "description", label: "Description", type: "textarea", isMandatory: true } // Content at the end
    ];


    return (
        <WonContext.Consumer>
            {() => (
                <TemplateSelection
                    lists={templates}
                    configureFields={configureFields}
                    title="Create Template"
                    path="template"
                    tablename="template"
                />
            )}
        </WonContext.Consumer>
    );
};

export default TemplateSelectionForTemplate;
