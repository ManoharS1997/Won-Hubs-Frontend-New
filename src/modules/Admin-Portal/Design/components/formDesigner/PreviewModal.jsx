import PropTypes from "prop-types";
import { useState } from "react";

const fieldTypesWithOptions = ["dropdown", "radio", "checkbox"];
function fieldSupportsOptions(type) {
  return fieldTypesWithOptions.includes(type);
}

export default function PreviewModal({
  show,
  onClose,
  module,
  formFields,
  formButtons,
  tabs,
}) {
  const [values, setValues] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const baseInputClasses =
    "w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none";

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
          <div key={field.name} className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
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
          <div key={field.name} className="mb-5">
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
      case "multi-select":
        return (
          <div key={field.name} className="mb-5">
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
              className={baseInputClasses}
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
          <div key={field.name} className="mb-5">
            <div className="text-sm font-semibold text-gray-700 mb-2">
              {field.label}
            </div>
            <div className="flex flex-wrap gap-4">
              {(field.options || []).map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 text-gray-600"
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
          <div key={field.name} className="mb-5">
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                name={field.name}
                checked={!!values[field.name]}
                onChange={(e) => handleChange(field.name, e.target.checked)}
                className="accent-indigo-600"
              />
              {field.label}
            </label>
          </div>
        );
      case "file":
        return (
          <div key={field.name} className="mb-5">
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
          <div key={field.name} className="mb-4 text-red-500">
            Unsupported field: {field.type}
          </div>
        );
    }
  };

  if (!show) return null;

  const handleSave = async () => {
    try {
      setSaving(true);
      const payload = { module, formFields, formButtons, tabs };

      const res = await fetch("http://localhost:3001/api/form-designer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save form");
      const data = await res.json();
      alert("Form saved successfully!");
      console.log("Saved:", data);
    } catch (err) {
      alert("Error saving form");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6 overflow-auto">
      <div className="bg-white rounded-2xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative p-8 no-scrollbar">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-9 h-9 flex items-center justify-center text-lg hover:bg-red-600 transition"
          aria-label="Close preview"
          onClick={onClose}
        >
          ×
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 border-b pb-3">
          Preview: {module}
        </h2>

        {/* Main form */}
        <form className="max-w-3xl mx-auto">
          {formFields.map(renderField)}

          <div className="mt-6">
            {formButtons.map((btn) => (
              <button
                key={btn.label}
                type={btn.type}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg mr-3 shadow hover:bg-indigo-700 transition"
              >
                {btn.label}
              </button>
            ))}
          </div>
        </form>

        {/* Tabs Overview */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-indigo-700 mb-5">Tabs</h3>
          <div className="flex flex-wrap gap-6 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                className="bg-indigo-100 text-indigo-800 px-5 py-2 rounded shadow"
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Render each tab details */}
          {tabs.map((tab) => (
            <section key={tab.name} className="mb-12">
              <h4 className="text-lg font-bold text-indigo-600 mb-4">
                {tab.name} ({tab.type})
              </h4>

              {tab.type === "form" && (
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {tab.fields.map(renderField)}

                  <div className="col-span-2 flex gap-4">
                    {tab.buttons.map((btn, i) => (
                      <button
                        key={i}
                        type={btn.type}
                        className="px-5 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 transition"
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </form>
              )}

              {tab.type === "table" && (
                <table className="w-full text-center border border-gray-300 border-collapse mb-6">
                  <thead>
                    <tr className="bg-indigo-200">
                      {tab.tableCols.map((col) => (
                        <th
                          key={col.name}
                          className="border border-gray-300 p-2"
                        >
                          {col.label}
                        </th>
                      ))}
                      {tab.tableCols.some((c) => c.type === "action") && (
                        <th className="border border-gray-300 p-2">Actions</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {tab.tableCols
                        .filter((c) => c.type !== "action")
                        .map((col) => (
                          <td
                            key={col.name}
                            className="border border-gray-300 p-2"
                          >
                            {fieldSupportsOptions(col.type)
                              ? (col.options || []).join(", ")
                              : `[${col.type}]`}
                          </td>
                        ))}
                      {tab.tableCols.some((c) => c.type === "action") && (
                        <td className="border border-gray-300 p-2 space-x-2">
                          <button className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition">
                            Edit
                          </button>
                          <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">
                            Delete
                          </button>
                          <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">
                            Update
                          </button>
                        </td>
                      )}
                    </tr>
                  </tbody>
                </table>
              )}
            </section>
          ))}
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className={`px-6 py-2 rounded-lg shadow text-white transition ${
            saving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}

PreviewModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  module: PropTypes.string.isRequired,
  formFields: PropTypes.arrayOf(PropTypes.object).isRequired,
  formButtons: PropTypes.arrayOf(PropTypes.object).isRequired,
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
