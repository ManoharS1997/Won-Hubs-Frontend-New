import { useEffect, useState } from "react";
import {
  GetAddUserFormFields,
  getRecordData,
} from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";
import convertName from "../../../../utils/conevrtName";
import FormInput from "../../../../shared/UIElements/FormInput";
import PropTypes from "prop-types";
import axios from "axios";
import SourceForm from "../../Design/components/formDesigner/SourceForm";
import RenderFields from "../../../../shared/components/FormFieldsRendering";

const RECORD_TABS = [{ id: 1, name: "Details" }];

DetailedView.propTypes = {
  recordId: PropTypes.any.isRequired,
  tableName: PropTypes.any.isRequired,
  formData: PropTypes.any.isRequired,
};

export default function DetailedView({
  recordId,
  tableName,
  formData,
  activeTable,
}) {
  // console.log(tableName, "Here..,")
  // console.log(formData,"Form Data NO1")
  const [recordData, setRecordData] = useState(null);
  const [recordFields, setRecordFields] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formFieldsWithtypes, setFormFieldsWithtypes] = useState([]);

  // console.log("FORMDATA ===>", formData);

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
      const recordFieldsResponse = await GetAddUserFormFields(tableName);
      setFormFieldsWithtypes(recordFieldsResponse.data);

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
    console.log(tab, "tab here");
    if (tab.type === "form") {
      // console.log(tab, "ppppp");
      return (
        <div>
          {tab.fields?.length > 0 ? (
            // tab.fields.map((field) => (
            //   <FormInput
            //     key={field._id}
            //     inputType={field.type}
            //     name={field.name}
            //     label={field.label}
            //     value={recordData?.[field.name] ?? ""}
            //     placeholder={`Enter ${field.label}`}
            //   />
            // ))
            <SourceForm
              formFields={tab.fields}
              formButtons={tab.buttons}
              activeTable={activeTable}
              tabName={tab?.name?.toLowerCase()}
            />
          ) : (
            <div className="text-gray-400 col-span-2 text-center">
              No form fields
            </div>
          )}
        </div>
      );
    }

    if (tab.type === "table") {
      const columns = tab.tableCols || [];
      // Separate data and action columns
      const dataColumns = columns.filter((col) => col.type !== "action");
      const actionColumns = columns.filter((col) => col.type === "action");
      const totalCols = [...dataColumns, ...(actionColumns.length ? [{ label: "Actions" }] : [])];
      const colWidth = `${100 / totalCols.length}%`; // Equal width percentage
      return (
        <div className="p-4 overflow-auto">
          {columns.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300 text-sm table-fixed">
              <thead className="bg-gray-100">
                <tr>
                  {dataColumns.map((col) => (
                    <th
                      key={col._id}
                      className="border border-gray-300 p-2 text-left font-semibold"
                      style={{ width: colWidth }}
                    >
                      {col.label}
                    </th>
                  ))}
                  {actionColumns.length > 0 && (
                    <th
                      className="border border-gray-300 p-2 text-left font-semibold"
                      style={{ width: colWidth }}
                    >
                      Actions
                    </th>
                  )}
                </tr>
              </thead>

              <tbody>
                <tr>
                  {dataColumns.map((col) => (
                    <td
                      key={col._id}
                      className="border border-gray-300 p-2 text-left"
                      style={{ width: colWidth }}
                    >
                      {recordData?.[col.name] ?? "-"}
                    </td>
                  ))}
                  {actionColumns.length > 0 && (
                    <td
                      className=" p-2 flex items-center justify-start gap-2"
                      style={{ width: colWidth }}
                    >
                      {actionColumns.map((action) => {
                        const { name, label } = action;
                        let btnColor = "";
                        if (name === "edit") btnColor = "!bg-blue-600 hover:bg-blue-700";
                        else if (name === "delete") btnColor = "!bg-red-600 hover:bg-red-700";
                        else if (name === "view") btnColor = "!bg-yellow-500 hover:bg-yellow-600";
                        return (
                          <button
                            key={action._id}
                            className={`${btnColor} text-white px-3 py-1 rounded text-xs`}
                            onClick={() => handleActionClick(action)}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          ) : (
            <div className="text-gray-400 text-center">No table columns defined</div>
          )}
        </div>
      );
    }

    // Example Action Handler
    const handleActionClick = (action) => {
      console.log("Clicked:", action.label);
      console.log("API Config:", action.apiConfig);
    };


    return (
      <div className="text-gray-400 text-center p-6">
        Unsupported tab type: {tab.type}
      </div>
    );
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
      {/* <div className="w-full flex items-center justify-end gap-4 px-4">
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
      </div> */}

      {/* 🔹 Tab Content */}
      <div className="grow overflow-auto rounded-b-[1rem]">
        {activeTab === 1 ? (
          // Default Details tab
          <ul className="grid md:grid-cols-2 gap-4 p-4 overflow-auto rounded-b-[1rem]">
            {/* {recordFields.map((field) => (
              <li key={field} className="flex items-center gap-4">
                <FormInput
                  inputType="text"
                  name={convertName(field)}
                  label={convertName(field)}
                  value={recordData?.[field] ?? ""}
                  placeholder="Enter value"
                />
              </li>
            ))} */}
            {formFieldsWithtypes.length > 0 &&
              formFieldsWithtypes.map((field) => (
                <li key={field} className="flex items-center gap-4">
                  <>
                    {/* <div className="w-full md:w-1/2 h-fit gap-4 flex flex-col p-2">
                  {formFieldsWithtypes
                    .filter((_, index) => index % 2 === 0) // Even index items
                    .map((field) =>
                      RenderFields({
                        ...field,
                        // value: formFields[field.name]?.value,
                      })
                    )}
                </div> */}

                    {RenderFields({
                      ...field,
                      // value: formFields[field.name]?.value,
                      value: recordData?.[field.name],
                    })}
                    {/* </div> */}
                  </>
                </li>
              ))}
          </ul>
        ) : (
          combinedTabs
            .filter((tab) => tab.id === activeTab)
            .map((tab) => (
              <div key={tab.id}>
                {renderTabContent(tab)}

                {/* ✅ Only show buttons if NOT a form tab */}
                {tab.type !== "form" && tab.buttons?.length > 0 && (
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
