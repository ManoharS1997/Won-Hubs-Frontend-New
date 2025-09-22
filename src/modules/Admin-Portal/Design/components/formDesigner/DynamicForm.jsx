import React, { useState } from "react";
import PropTypes from "prop-types";

DynamicForm.propTypes = {
  formFields: PropTypes.any,
  formButtons: PropTypes.any,
};

export default function DynamicForm({ formFields, formButtons }) {
  // Manage values in a single object for all inputs
  const [values, setValues] = useState({});

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const renderField = (field) => {
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
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            value={values[field.name] || ""}
            onChange={e => handleChange(field.name, e.target.value)}
            placeholder={field.label}
            className="w-full p-2 mb-4 border rounded"
          />
        );
      case "textarea":
        return (
          <textarea
            key={field.name}
            name={field.name}
            value={values[field.name] || ""}
            onChange={e => handleChange(field.name, e.target.value)}
            placeholder={field.label}
            className="w-full p-2 mb-4 border rounded"
          />
        );
      case "dropdown":
      case "multi-select":
        return (
          <select
            key={field.name}
            name={field.name}
            multiple={field.type === "multi-select"}
            value={values[field.name] || (field.type === "multi-select" ? [] : "")}
            onChange={e => handleChange(field.name,
              field.type === "multi-select"
                ? Array.from(e.target.selectedOptions, o => o.value)
                : e.target.value
            )}
            className="w-full p-2 mb-4 border rounded"
          >
            {(field.options || []).map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );
      case "radio":
        return (
          <div key={field.name} className="mb-4">
            <div className="mb-1 font-medium">{field.label}</div>
            {(field.options || []).map(opt => (
              <label key={opt} className="mr-3">
                <input
                  type="radio"
                  name={field.name}
                  value={opt}
                  checked={values[field.name] === opt}
                  onChange={e => handleChange(field.name, opt)}
                /> {opt}
              </label>
            ))}
          </div>
        );
      case "checkbox":
      case "switch":
        return (
          <label key={field.name} className="block mb-4">
            <input
              type={field.type === "switch" ? "checkbox" : "checkbox"}
              name={field.name}
              checked={!!values[field.name]}
              onChange={e => handleChange(field.name, e.target.checked)}
            /> {field.label}
          </label>
        );
      case "file":
      case "image":
      case "signature":
        return (
          <label key={field.name} className="block mb-4">
            {field.label}
            <input
              type="file"
              name={field.name}
              onChange={e => handleChange(field.name, e.target.files)}
            />
          </label>
        );
      case "range":
        return (
          <label key={field.name} className="block mb-4">
            {field.label}
            <input
              type="range"
              name={field.name}
              value={values[field.name] || ""}
              onChange={e => handleChange(field.name, e.target.value)}
            />
          </label>
        );
      case "rating":
        // Example: custom star rating or simple number input
        return (
          <label key={field.name} className="block mb-4">
            {field.label}
            <input
              type="number"
              min={1}
              max={5}
              name={field.name}
              value={values[field.name] || ""}
              onChange={e => handleChange(field.name, e.target.value)}
            />
          </label>
        );
      case "captcha":
        return <div key={field.name} className="mb-4">{field.label}: [captcha here]</div>;
      case "hidden":
        return (
          <input
            key={field.name}
            type="hidden"
            name={field.name}
            value={values[field.name] || ""}
          />
        );
      default:
        return <div key={field.name} className="mb-4">Unsupported field type: {field.type}</div>;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg m-auto p-6 bg-white rounded-xl shadow">
      {formFields.map(renderField)}
      <div>
        {formButtons.map(btn =>
          <button
            key={btn.label}
            type={btn.type}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg mr-3"
          >
            {btn.label}
          </button>
        )}
      </div>
    </form>
  );
}
