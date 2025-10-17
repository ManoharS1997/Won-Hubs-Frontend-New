import { useEffect, useState } from "react";
import { getRecordData } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";
import convertName from "../../../../utils/conevrtName";
import FormInput from "../../../../shared/UIElements/FormInput";
import PropTypes from "prop-types";
import axios from "axios";

const RECORD_TABS = [{ id: 1, name: "Details" }];

DetailedView.propTypes = {
  recordId: PropTypes.any.isRequired,
  tableName: PropTypes.any.isRequired,
  formData: PropTypes.any.isRequired,
};

export default function DetailedView({ recordId, tableName, formData }) {
  const [recordData, setRecordData] = useState(null);
  const [recordFields, setRecordFields] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("FORMDATA ===>", formData);

  // Fetch record details when recordId changes
  useEffect(() => {
    if (recordId) {
      fetchRecordDetails();
      setActiveTab(1);
    }
  }, [recordId]);

  const fetchRecordDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getRecordData(tableName, recordId);
      if (data?.[0]) {
        setRecordData(data[0]);
        setRecordFields(Object.keys(data[0]));
      } else {
        setError("No record found.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch record details.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle API Call Buttons
  const handleButtonClick = async (btn) => {
    try {
      let endpoint = btn.apiEndpoint?.replace(":id", recordId);
      const method = btn.apiMethod?.toUpperCase() || "GET";

      const res =
        method === "GET"
          ? await axios.get(endpoint)
          : method === "POST"
          ? await axios.post(endpoint, recordData)
          : method === "PUT"
          ? await axios.put(endpoint, recordData)
          : method === "DELETE"
          ? await axios.delete(endpoint)
          : null;

      alert(`${btn.label} successful!`);
      console.log("Response:", res?.data);
    } catch (error) {
      console.error("API call failed:", error);
      alert("API call failed!");
    }
  };

  // 🔹 Render Tab Content (form/table)
  const renderTabContent = (tab) => {
    if (tab.type === "form") {
      return (
        <div className="p-4 grid md:grid-cols-2 gap-4">
          {tab.fields?.length > 0 ? (
            tab.fields.map((field) => (
              <FormInput
                key={field._id}
                inputType={field.type}
                name={field.name}
                label={field.label}
                value={recordData?.[field.name] ?? ""}
                placeholder={`Enter ${field.label}`}
              />
            ))
          ) : (
            <div className="text-gray-400 col-span-2 text-center">
              No form fields
            </div>
          )}
        </div>
      );
    }

    if (tab.type === "table") {
      return (
        <div className="p-4 overflow-auto">
          {tab.tableCols?.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  {tab.tableCols.map((col) => (
                    <th
                      key={col._id}
                      className="border border-gray-300 p-2 text-left"
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Dummy table row — replace with backend data if available */}
                <tr>
                  {tab.tableCols.map((col) => (
                    <td key={col._id} className="border border-gray-300 p-2">
                      {recordData?.[col.name] ?? "-"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          ) : (
            <div className="text-gray-400 text-center">
              No table columns defined
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="text-gray-400 text-center p-6">
        Unsupported tab type: {tab.type}
      </div>
    );
  };

  const handleSave = () => {
    console.log("Save clicked");
  };

  const handleUpdate = () => {
    console.log("Update clicked");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[80vh] text-gray-500">
        Loading record details...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-[80vh] text-red-500">
        {error}
      </div>
    );

  // Combine default and backend tabs
  const combinedTabs = [
    ...RECORD_TABS,
    ...(formData?.tabs?.map((tab, index) => ({
      id: index + 2,
      name: tab.name,
      type: tab.type,
      fields: tab.fields,
      buttons: tab.buttons,
      tableCols: tab.tableCols,
    })) || []),
  ];

  return (
    <div className="w-full h-fit max-h-[82vh] overflow-hidden flex flex-col gap-2 p-0 rounded-[0.5rem] bg-[var(--background-color)] text-[var(--text-color)]">
      {/* 🔹 Tabs */}
      <div className="h-[5%]" style={{ background: `var(--primary-color)` }}>
        <ul className="h-[2rem] flex items-end gap-2 p-0 px-2 overflow-auto no-scrollbar">
          {combinedTabs.map((tab) => (
            <li
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1 rounded-t-[0.3rem] cursor-pointer text-nowrap font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-white text-[var(--primary-color)]"
                  : "text-white hover:bg-[#ccc] hover:text-black"
              }`}
            >
              {tab.name}
            </li>
          ))}
        </ul>
      </div>

      {/* 🔹 Top-Level Buttons */}
      <div className="w-full flex items-center justify-end gap-4 px-4">
        {formData?.formButtons?.map((btn) => (
          <button
            key={btn._id}
            type="button"
            onClick={() => handleButtonClick(btn)}
            className="py-2 px-4 !bg-blue-500 text-white !rounded-md hover:bg-blue-600"
          >
            {btn.label}
          </button>
        ))}
        <button
          type="button"
          onClick={handleSave}
          className="py-2 px-4 !bg-blue-500 text-white !rounded-md hover:bg-blue-600"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleUpdate}
          className="py-2 px-4 !bg-blue-500 text-white !rounded-md hover:bg-blue-600"
        >
          Update
        </button>
      </div>

      {/* 🔹 Tab Content */}
      <div className="grow overflow-auto rounded-b-[1rem]">
        {activeTab === 1 ? (
          // Default Details tab
          <ul className="grid md:grid-cols-2 gap-4 p-4 overflow-auto rounded-b-[1rem]">
            {recordFields.map((field) => (
              <li key={field} className="flex items-center gap-4">
                <FormInput
                  inputType="text"
                  name={convertName(field)}
                  label={convertName(field)}
                  value={recordData?.[field] ?? ""}
                  placeholder="Enter value"
                />
              </li>
            ))}
          </ul>
        ) : (
          combinedTabs
            .filter((tab) => tab.id === activeTab)
            .map((tab) => (
              <div key={tab.id}>
                {renderTabContent(tab)}
                {/* Render tab-specific buttons */}
                {tab.buttons?.length > 0 && (
                  <div className="flex justify-end gap-3 p-4">
                    {tab.buttons.map((btn) => (
                      <button
                        key={btn._id}
                        type="button"
                        onClick={() => handleButtonClick(btn)}
                        className="py-2 px-4 !bg-green-500 text-white rounded-md hover:bg-green-600"
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))
        )}
      </div>
    </div>
  );
}
