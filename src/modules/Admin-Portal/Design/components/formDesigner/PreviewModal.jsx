import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { AiOutlineSwap } from "react-icons/ai"; // or MdSwapHoriz / HiOutlineSwitchHorizontal
import { useNavigate } from "react-router-dom";
import FormDropdown from "../../../../../shared/UIElements/FormDropdown";
import Select from "react-dropdown-select";

export default function PreviewModal({
  show,
  module,
  formFields,
  formButtons,
  tabs,
  state,
  recordId,
  previousFieldsData,
  widgetname,
}) {
  const navigation = useNavigate();
  const [values, setValues] = useState({});
  const [saving, setSaving] = useState(false);
  const [twoColumn, setTwoColumn] = useState(true);
  // console.log(previousFieldsData, "previous Data")
  const [FieldData, setFieldData] = useState(previousFieldsData);
  // console.log(FieldData, "Field Data Heree")
  // console.log(formButtons)
  if (!show) return null;

  useEffect(() => {
    const apiData = previousFieldsData || {};
    const localData = JSON.parse(localStorage.getItem("formDesignerData")) || null;

    // CASE 1 → No local data → use API data
    if (!localData) {
      setFieldData(apiData);
      return;
    }

    // CASE 2 → Local exists → compare & update
    const merged = {};

    Object.keys({ ...apiData, ...localData }).forEach((key) => {
      const apiValue = apiData[key];
      const localValue =
        typeof localData[key] === "object" && "value" in localData[key]
          ? localData[key].value
          : localData[key];

      // If API and local both exist and NOT same → override with local
      if (localValue !== undefined && localValue !== apiValue) {
        merged[key] = localValue;
      }
      // If local missing → fallback to API
      else {
        merged[key] = apiValue;
      }
    });

    setFieldData(merged);
  }, [previousFieldsData]);


  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const baseInputClasses =
    "w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none";

  const renderField = (field) => {
    const wrapperClasses = `
      mb-3 w-full 
      ${twoColumn && field.fullWidth ? "md:col-span-2" : ""}
    `;
    switch (field.type) {
      case "text":
      case "email":
      case "password":
      case "number":
      case "tel":
      case "url":
      case "date":
      case "time":
      case "month":
      case "week":
      case "color":
        return (
          <div key={field.name} className={wrapperClasses}>
            <label className="block text-sm font-semibold text-gray-700">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={values[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder || field.label}
              className={baseInputClasses}
            />
          </div>
        );

      case "textarea":
        return (
          <div key={field.name} className={wrapperClasses}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {field.label}
            </label>
            <textarea
              name={field.name}
              value={values[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder || field.label}
              className={`${baseInputClasses} min-h-[100px]`}
            />
          </div>
        );

      case "dropdown":
        //  return  <FormDropdown />
        return (
          <div key={field.name} className="">
            <label className=""> {field.label}</label>
            <Select />
          </div>
        )
      case "multi-select":
        return (
          <div key={field.name} className={wrapperClasses}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {field.label}
            </label>
            <select
              name={field.name}
              multiple={field.type === "multi-select"}
              value={
                values[field.name] || (field.type === "multi-select" ? [] : "")
              }
              onChange={(e) =>
                handleChange(
                  field.name,
                  field.type === "multi-select"
                    ? Array.from(e.target.selectedOptions, (o) => o.value)
                    : e.target.value
                )
              }
              className={`${baseInputClasses} appearance-none pr-10 cursor-pointer`}
            >
              {(field.options || []).map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        );

      case "radio":
        return (
          <div key={field.name} className={`${wrapperClasses}`}>
            <div className="text-sm font-semibold text-gray-700 mb-2">
              {field.label}
            </div>
            <div className="flex flex-wrap gap-4">
              {(field.options || []).map((opt) => (
                <label
                  key={opt}
                  className="flex gap-2 items-center text-gray-600"
                >
                  <input
                    type="radio"
                    name={field.name}
                    value={opt}
                    checked={values[field.name] === opt}
                    onChange={() => handleChange(field.name, opt)}
                    className="accent-indigo-600"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        );

      case "checkbox":
        return (
          <div key={field.name} className={wrapperClasses}>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <input
                type="checkbox"
                checked={!!values[field.name]}
                onChange={(e) => handleChange(field.name, e.target.checked)}
                className="w-4 h-4 accent-indigo-600 border-gray-300 rounded"
              />
              {field.label}
            </label>
          </div>
        );

      case "file":
        return (
          <div key={field.name} className={wrapperClasses}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {field.label}
            </label>
            <input
              type="file"
              name={field.name}
              onChange={(e) => handleChange(field.name, e.target.files)}
              className="block text-sm text-gray-600"
            />
          </div>
        );

      default:
        return (
          <div key={field.name} className={`${wrapperClasses} text-red-500`}>
            Unsupported field: {field.type}
          </div>
        );
    }
  };

  const getValue = (obj, key) => {
    if (!obj || !key) return "";
    // Case 1: schema format
    if (obj[key] && typeof obj[key] === "object" && "value" in obj[key]) {
      return obj[key].value;
    }
    // Case 2: flat format
    return obj[key] ?? "";
  };

  //  by praveen
  const handleSave = async () => {
    let Method = recordId ? "PUT" : "POST";
    try {
      setSaving(true);
      const payload = {
        module,
        formFields,
        formButtons,
        tabs,
        column: twoColumn,
        departmentName: getValue(FieldData, "department"),
        category: getValue(FieldData, "category"),
        selectedViews: [getValue(FieldData, "views")],
        widgetname: "Desktop",
        subCategory: getValue(FieldData, "subCategory"),
        designName: getValue(FieldData, "name")
      };

      // console.log(payload, "Payload Here");
      // console.log(previousFieldsData, "Previous Field Data")

      const url = recordId
        ? `${import.meta.env.VITE_HOSTED_API_URL}/api/form-designer/${recordId}`
        : `${import.meta.env.VITE_HOSTED_API_URL}/api/form-designer`;

      // console.log(url, "Url here")
      const res = await fetch(url, {
        method: Method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log(res, "Response Here");
      if (!res.ok) throw new Error("Failed to save form");
      await res.json();
      alert("Form saved successfully!");
      localStorage.removeItem("formDesignerData");
      navigation("/create/new/design");
    } catch (err) {
      console.log(err, "Error Heree");
      alert("Error saving form");
    } finally {
      setSaving(false);
    }
  };

  //by sandhya
  const handleSave2 = async () => {
    let Method = recordId ? "PUT" : "POST";
    try {
      // setSaving(true);
      const payload = {
        module,
        formFields,
        formButtons,
        tabs,
        column: twoColumn,
        departmentName: getValue(FieldData, "department"),
        category: getValue(FieldData, "category"),
        selectedViews: [getValue(FieldData, "views")],
        widgetname: "Desktop",
        subCategory: getValue(FieldData, "subCategory"),
        designName: getValue(FieldData, "name")
      }
      const url = `${import.meta.env.VITE_HOSTED_API_URL}/dynamic/related/`;
      // console.log(url, "Url here")
      const res = await fetch(url, {
        method: Method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      console.log(res, "response Here @form")
      // localStorage.removeItem("formDesignerData");

    } catch (e) {
      console.log(e, "e response heree")
    }

  }

  return (
    <div className="bg-white rounded-xl p-2 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-700 text-centerm align-center">
          {module}
        </h2>
        <button
          type="button"
          onClick={() => setTwoColumn(!twoColumn)}
          className="w-10 h-10 flex items-center justify-center !rounded-full border !border-blue-500 shadow hover:bg-gray-100 transition"
        >
          <AiOutlineSwap className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Form preview */}
      <form
        className={`mx-auto w-full ${twoColumn
          ? "grid grid-cols-1 md:grid-cols-2 gap-4"
          : "grid grid-cols-1"
          }`}
      >
        {formFields.map(renderField)}

        <div
          className={`mt-4 flex gap-4 ${twoColumn ? "col-span-2 justify-start" : ""
            }`}
        >
          {formButtons.map((btn) => (
            <button
              key={btn.label}
              type={btn.type}
              className="!bg-indigo-600 text-white px-6 py-2 !rounded-md shadow hover:bg-indigo-700 transition"
            >
              {btn.label}
            </button>
          ))}
        </div>
      </form>

      {/* Tabs preview */}
      {tabs.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-indigo-700 mb-4">Tabs</h3>
          <div className="flex flex-wrap gap-3 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                className="!bg-indigo-100 text-indigo-800 px-5 py-2 !rounded shadow"
              >
                {tab.name}
              </button>
            ))}
          </div>

          {tabs.map((tab) => (
            <section key={tab.name} className="mb-10">
              <h4 className="text-lg font-bold text-indigo-600 mb-4">
                {tab.name} ({tab.type})
              </h4>

              {tab.type === "form" && (
                <form
                  className={`mx-auto w-full ${twoColumn
                    ? "grid grid-cols-1 md:grid-cols-2 gap-2"
                    : "grid grid-cols-1"
                    }`}
                >
                  {tab.fields.map(renderField)}
                  <div className="col-span-2 flex gap-4">
                    {tab.buttons.map((btn, i) => (
                      <button
                        key={i}
                        type={btn.type}
                        className="px-5 py-2 !bg-indigo-600 text-white !rounded shadow hover:bg-indigo-700 transition"
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </form>
              )}

              {tab.type === "table" && (
                <table className="w-full table-fixed border border-gray-300 rounded-md text-center shadow-sm">
                  <thead className="bg-indigo-200 text-indigo-700 font-semibold">
                    <tr>
                      {/* Non-action headers */}
                      {tab.tableCols
                        .filter((col) => col.type !== "action")
                        .map((col) => (
                          <th
                            key={col.name}
                            className="border border-gray-300 px-4 py-2"
                            style={{
                              width: `${100 / (tab.tableCols.filter((c) => c.type !== "action").length + 1)}%`,
                            }}
                          >
                            {col.label}
                          </th>
                        ))}

                      {/* Single "Actions" header */}
                      {tab.tableCols.some((col) => col.type === "action") && (
                        <th
                          className="border border-gray-300 px-4 py-2"
                          style={{
                            width: `${100 / (tab.tableCols.filter((c) => c.type !== "action").length + 1)}%`,
                          }}
                        >
                          Actions
                        </th>
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      {/* Non-action data cells */}
                      {tab.tableCols
                        .filter((col) => col.type !== "action")
                        .map((col) => (
                          <td
                            key={col.name}
                            className="border border-gray-300 px-4 py-2 truncate text-gray-700"
                            style={{
                              width: `${100 / (tab.tableCols.filter((c) => c.type !== "action").length + 1)}%`,
                            }}
                          >
                            {col.options && col.options.length > 0
                              ? col.options.join(", ")
                              : `[${col.type}]`}
                          </td>
                        ))}

                      {/* Single Actions cell */}
                      {tab.tableCols.some((col) => col.type === "action") && (
                        <td
                          className="border border-gray-300 px-4 py-2"
                          style={{
                            width: `${100 / (tab.tableCols.filter((c) => c.type !== "action").length + 1)}%`,
                          }}
                        >
                          <div className="flex justify-center gap-2">
                            {tab.tableCols
                              .filter((col) => col.type === "action")
                              .map((actionCol) => {
                                let btnStyle =
                                  actionCol.label.toLowerCase() === "edit"
                                    ? "!bg-indigo-600 hover:bg-indigo-700"
                                    : actionCol.label.toLowerCase() === "delete"
                                      ? "!bg-red-600 hover:bg-red-700"
                                      : actionCol.label.toLowerCase() === "view"
                                        ? "!bg-yellow-500 hover:bg-yellow-600"
                                        : "!bg-gray-500 hover:bg-gray-600";

                                return (
                                  <button
                                    key={actionCol.name}
                                    className={`${btnStyle} text-white px-3 py-1 rounded transition text-sm`}
                                    onClick={() =>
                                      alert(
                                        `Trigger ${actionCol.label} API: ${actionCol.apiConfig?.description || "N/A"}`
                                      )
                                    }
                                  >
                                    {actionCol.label}
                                  </button>
                                );
                              })}
                          </div>
                        </td>
                      )}
                    </tr>
                  </tbody>
                </table>
              )}

            </section>
          ))}
        </div>
      )}

      {/* Save button */}
      <div className="mt-6">
        <button
          type="button"
          // onClick={handleSave} by praveen
          onClick={handleSave2}
          disabled={saving}
          className={`px-6 py-2 !rounded-lg shadow text-white transition ${saving
            ? "!bg-gray-400 cursor-not-allowed"
            : "!bg-green-600 hover:bg-green-700"
            }`}
        >
          {saving
            ? recordId
              ? "Updating..."
              : "Saving..."
            : recordId
              ? "Update"
              : "Save"}
        </button>
      </div>
    </div>
  );
}

// Helper needed for table rendering (assumed external or define if needed)
// function fieldSupportsOptions(type) {
//   // Simplified check; adjust as required for all option types
//   const optionTypes = ["dropdown", "multi-select", "radio"];
//   return optionTypes.includes(type);
// }

PreviewModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  module: PropTypes.string.isRequired,
  formFields: PropTypes.arrayOf(PropTypes.object).isRequired,
  formButtons: PropTypes.arrayOf(PropTypes.object).isRequired,
  state: PropTypes.any.isRequired,
  recordId: PropTypes.any.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["form", "table", ""]).isRequired,
      fields: PropTypes.arrayOf(PropTypes.object),
      buttons: PropTypes.arrayOf(PropTypes.object),
      tableCols: PropTypes.arrayOf(PropTypes.object),
    })
  ).isRequired,
};
