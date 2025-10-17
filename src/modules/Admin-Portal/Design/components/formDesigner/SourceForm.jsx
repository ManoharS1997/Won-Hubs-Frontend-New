import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";

// ✅ Simplified field renderer using only built-in HTML elements
function ItemCheck({ field, formValues, handleChange }) {
  const handleButtonClick = async () => {
    if (field?.actionType === "API Call" && field?.apiEndpoint) {
      try {
        const method = (field?.apiMethod || "POST").toUpperCase();
        const response = await axios({
          method,
          url: field.apiEndpoint,
          data: formValues,
        });
        console.log("✅ API Response:", response.data);
        alert(`${field?.label || "API"} call successful!`);
      } catch (error) {
        console.error("❌ API call failed:", error);
        alert("API call failed! Check console for details.");
      }
    } else {
      console.log("Button clicked:", field?.label);
    }
  };

  switch (field?.type) {
    // 📘 Standard Input Fields
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
        <div className="flex flex-col gap-1">
          <label className="font-medium">{field?.label}</label>
          <input
            type={field?.type}
            name={field?.name}
            value={formValues?.[field?.name] || ""}
            onChange={(e) => handleChange(field?.name, e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-blue-500"
          />
        </div>
      );

    case "textarea":
      return (
        <div className="flex flex-col gap-1">
          <label className="font-medium">{field?.label}</label>
          <textarea
            name={field?.name}
            value={formValues?.[field?.name] || ""}
            onChange={(e) => handleChange(field?.name, e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-blue-500"
          />
        </div>
      );

    case "dropdown":
      return (
        <div className="flex flex-col gap-1">
          <label className="font-medium">{field?.label}</label>
          <select
            name={field?.name}
            value={formValues?.[field?.name] || ""}
            onChange={(e) => handleChange(field?.name, e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-blue-500"
          >
            <option value="">Select...</option>
            {field?.options?.map((opt, idx) => {
              const val = typeof opt === "string" ? opt : opt.value;
              const label = typeof opt === "string" ? opt : opt.label;
              return (
                <option key={idx} value={val}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>
      );

    case "radio":
      return (
        <fieldset className="flex flex-col gap-2">
          <legend className="font-medium">{field?.label}</legend>
          <div className="flex flex-wrap gap-4">
            {field?.options?.map((option, idx) => {
              const val = typeof option === "string" ? option : option.value;
              const label = typeof option === "string" ? option : option.label;
              return (
                <label key={idx} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={field?.name}
                    value={val}
                    checked={formValues?.[field?.name] === val}
                    onChange={(e) => handleChange(field?.name, e.target.value)}
                  />
                  <span>{label}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      );

    case "checkbox":
      return (
        <fieldset className="flex flex-col gap-2">
          <legend className="font-medium">{field?.label}</legend>
          <div className="flex flex-wrap gap-4">
            {field?.options?.length > 0 ? (
              field.options.map((option, idx) => {
                const val = typeof option === "string" ? option : option.value;
                const label = typeof option === "string" ? option : option.label;
                const checked = formValues?.[field?.name]?.includes(val);
                return (
                  <label key={idx} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name={field?.name}
                      value={val}
                      checked={!!checked}
                      onChange={(e) => {
                        const prev = formValues?.[field?.name] || [];
                        const updated = e.target.checked
                          ? [...prev, val]
                          : prev.filter((v) => v !== val);
                        handleChange(field?.name, updated);
                      }}
                    />
                    <span>{label}</span>
                  </label>
                );
              })
            ) : (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name={field?.name}
                  checked={!!formValues?.[field?.name]}
                  onChange={(e) => handleChange(field?.name, e.target.checked)}
                />
                <span>{field?.label}</span>
              </label>
            )}
          </div>
        </fieldset>
      );

    case "file":
    case "image":
      return (
        <div className="flex flex-col gap-1">
          <label className="font-medium">{field?.label}</label>
          <input
            type="file"
            name={field?.name}
            onChange={(e) => handleChange(field?.name, e.target.files[0])}
            className="border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
      );

    // ✅ API button
    case "button":
      return (
        <button
          type="button"
          onClick={handleButtonClick}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          {field?.label || "Submit"}
        </button>
      );

    default:
      return null;
  }
}

// ✅ Parent form with all logic intact
export default function SourceForm({ formFields = [], formButtons = [] }) {
  const [formValues, setFormValues] = useState({});
  const [loadingBtn, setLoadingBtn] = useState(null);

  const handleChange = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleButtonClick = async (btn) => {
    if (btn.actionType !== "API Call" || !btn.apiEndpoint) return;
    try {
      setLoadingBtn(btn._id);
      const method = btn.apiMethod?.toUpperCase() || "POST";
      const endpoint = btn.apiEndpoint;
      let response;

      if (method === "GET") response = await axios.get(endpoint);
      else if (method === "POST") response = await axios.post(endpoint, formValues);
      else if (method === "PUT") response = await axios.put(endpoint, formValues);
      else if (method === "DELETE") response = await axios.delete(endpoint);

      alert(`${btn.label} successful!`);
      console.log("✅ API Response:", response?.data);
    } catch (error) {
      console.error("❌ API Error:", error);
      alert("API call failed. Check console for details.");
    } finally {
      setLoadingBtn(null);
    }
  };

  return (
    <div className="w-full h-fit bg-white p-6 overflow-y-auto rounded-b-[0.5rem]">
      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formFields.map((field, idx) => (
          <div key={field?.name || idx}>
            <ItemCheck field={field} formValues={formValues} handleChange={handleChange} />
          </div>
        ))}
      </div>

      {/* Form Buttons */}
      {formButtons.length > 0 && (
        <div className="w-full flex mt-8 gap-4 flex-wrap justify-end">
          {formButtons.map((btn, idx) => (
            <button
              key={btn._id || idx}
              type={btn.type || "button"}
              onClick={() => handleButtonClick(btn)}
              disabled={loadingBtn === btn._id}
              className={`px-6 py-2 text-white rounded transition-all ${
                loadingBtn === btn._id
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loadingBtn === btn._id ? "Processing..." : btn.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

SourceForm.propTypes = {
  formFields: PropTypes.array.isRequired,
  formButtons: PropTypes.array.isRequired,
};

ItemCheck.propTypes = {
  field: PropTypes.any.isRequired,
  formValues: PropTypes.any.isRequired,
  handleChange: PropTypes.any.isRequired,
};
