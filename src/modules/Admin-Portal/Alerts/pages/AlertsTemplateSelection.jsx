import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import TemplateSelection from "../../../../shared/components/TemplateSelection";
import WonContext from "../../../../context/WonContext";

const AlertTemplateView = () => {
  // const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const url = `${import.meta.env.VITE_HOSTED_API_URL}/table/alerts`;
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
    { name: "title", label: "Title", type: "text", isMandatory: true },
    { name: "from", label: "From", type: "text", isMandatory: true },
    { name: "to", label: "To", type: "text", isMandatory: true },
    { name: "cc", label: "CC", type: "text", isMandatory: true },
    {
      name: "type",
      label: "Type",
      type: "dropdown",
      options: [
        { label: "Emergency", value: "emergency" },
        { label: "Normal", value: "normal" },
      ],
      isMandatory: true,
    },
    { name: "description", label: "Description", type: "textarea", isMandatory: true }, // Content at the end

  ];

  return (
    <WonContext.Consumer>
      {() => (
        <TemplateSelection
          lists={templates}
          configureFields={configureFields}
          title="Create Alert"
          path='alert'
          tablename="alert"
        />
      )}
    </WonContext.Consumer>
  );
};

export default AlertTemplateView;
