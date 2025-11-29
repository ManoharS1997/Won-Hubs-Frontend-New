import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import SourceForm from "../../Design/components/formDesigner/SourceForm";
import { getRecordData } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";

const RECORD_TABS = [{ id: 1, name: "Details" }];

DetailedView.propTypes = {
  recordId: PropTypes.any.isRequired,
  tableName: PropTypes.any.isRequired,
  formData: PropTypes.any.isRequired,
  activeTable: PropTypes.any.isRequired,
};

export default function DetailedView({
  recordId,
  tableName,
  formData,
  activeTable,
}) {
  const [recordData, setRecordData] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /** LOAD RECORD & INITIALIZE */
  useEffect(() => {
    if (recordId && formData) {
      fetchRecordDetails();
      setActiveTab(1);
    }
  }, [recordId, formData]);

  const fetchRecordDetails = async () => {
    try {
      setLoading(true);
      const { data } = await getRecordData(tableName, recordId);

      if (data?.[0]) setRecordData(data[0]);
      else setError("No record found.");
    } catch (e) {
      console.error(e);
      setError("Failed to fetch record.");
    } finally {
      setLoading(false);
    }
  };

  /** BUTTON API CALLS */
  const handleButtonClick = async (btn) => {
    try {
      const endpoint = btn.apiEndpoint?.replace(":id", recordId);
      if (!endpoint) return alert("❌ No API endpoint in button config");

      const method = btn.apiMethod?.toUpperCase() || "GET";

      if (method === "GET") await axios.get(endpoint);
      if (method === "POST") await axios.post(endpoint, recordData);
      if (method === "PUT") await axios.put(endpoint, recordData);
      if (method === "DELETE") await axios.delete(endpoint);

      alert(`${btn.label} successful!`);
    } catch (err) {
      console.error(err);
      alert("API failed!");
    }
  };

  /** TAB CONTENT */
  const renderTabContent = (tab) => {
    /** FORM TAB */
    if (tab.type === "form") {
      return (
        <SourceForm
          formFields={tab.fields}
          formButtons={tab.buttons}
          activeTable={activeTable}
          tabName={tab.name.toLowerCase()}
          existingValues={recordData}
        />
      );
    }

    /** TABLE TAB */
    if (tab.type === "table") {
      const cols = tab.tableCols || [];
      const dataCols = cols.filter((c) => c.type !== "action");
      const actionCols = cols.filter((c) => c.type === "action");

      return (
        <div className="p-4">
          {cols.length === 0 ? (
            <div className="text-gray-400 text-center">No table columns</div>
          ) : (
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  {dataCols.map((c) => (
                    <th key={c._id} className="border p-2">
                      {c.label}
                    </th>
                  ))}
                  {actionCols.length > 0 && (
                    <th className="border p-2">Actions</th>
                  )}
                </tr>
              </thead>

              <tbody>
                <tr>
                  {dataCols.map((c) => (
                    <td key={c._id} className="border p-2">
                      {recordData?.[c.name] ?? "-"}
                    </td>
                  ))}

                  {actionCols.length > 0 && (
                    <td className="border p-2 flex gap-2">
                      {actionCols.map((action) => (
                        <button
                          key={action._id}
                          className="px-3 py-1 bg-blue-600 text-white rounded"
                          onClick={() => console.log("Action:", action)}
                        >
                          {action.label}
                        </button>
                      ))}
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          )}
        </div>
      );
    }

    return <div className="text-gray-500 p-4">Unsupported tab type</div>;
  };

  /** LOADING & ERROR */
  if (loading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-[80vh] text-red-500">
        {error}
      </div>
    );

  /** FINAL TAB MERGE */
  const combinedTabs = [
    ...RECORD_TABS,
    ...(formData?.tabs?.map((tab, idx) => ({
      id: idx + 2,
      name: tab.name,
      type: tab.type,
      fields: tab.fields,
      buttons: tab.buttons,
      tableCols: tab.tableCols,
    })) || []),
  ];

  return (
    <div className="w-full max-h-[82vh] flex flex-col bg-white rounded-lg">
      {/* Tabs Header */}
      <div className="bg-[var(--primary-color)]">
        <ul className="flex gap-3 p-2">
          {combinedTabs.map((tab) => (
            <li
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1 rounded-t cursor-pointer font-semibold ${
                activeTab === tab.id
                  ? "bg-white text-[var(--primary-color)]"
                  : "text-white hover:bg-gray-300 hover:text-black"
              }`}
            >
              {tab.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div className="grow overflow-auto p-4">
        {activeTab === 1 ? (
          /** ⭐ DETAILS TAB => SHOW SAME SOURCEFORM */
          <SourceForm
            formFields={formData.formFields}
            formButtons={formData.formButtons}
            activeTable={activeTable}
            tabName="details"
            existingValues={recordData}
          />
        ) : (
          combinedTabs
            .filter((t) => t.id === activeTab)
            .map((tab) => (
              <div key={tab.id}>
                {renderTabContent(tab)}

                {tab.type !== "form" && tab.buttons?.length > 0 && (
                  <div className="flex justify-end gap-3 mt-4">
                    {tab.buttons.map((btn) => (
                      <button
                        key={btn._id}
                        className="py-2 px-4 bg-green-500 text-white rounded"
                        onClick={() => handleButtonClick(btn)}
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
