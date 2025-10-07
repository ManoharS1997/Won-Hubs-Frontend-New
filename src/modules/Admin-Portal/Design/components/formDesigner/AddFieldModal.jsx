import PropTypes from "prop-types";
import { useState } from "react";

const FIELD_TYPES = [
  { value: "text", label: "Text" },
  { value: "textarea", label: "Textarea" },
  { value: "email", label: "Email" },
  { value: "password", label: "Password" },
  { value: "number", label: "Number" },
  { value: "tel", label: "Phone" },
  { value: "url", label: "URL" },

  { value: "date", label: "Date" },
  { value: "time", label: "Time" },
  { value: "month", label: "Month" },
  { value: "week", label: "Week" },

  { value: "dropdown", label: "Dropdown (Select)" },
  { value: "radio", label: "Radio Buttons" },
  { value: "checkbox", label: "Checkbox" },
  { value: "switch", label: "Toggle Switch" },
  { value: "multi-select", label: "Multi-Select" },

  { value: "file", label: "File Upload" },
  { value: "image", label: "Image Upload" },
  { value: "signature", label: "Signature Pad" },
  { value: "color", label: "Color Picker" },
];

export default function AddFieldModal({ open, onClose, onSubmit }) {
  const [label, setLabel] = useState("");
  const [type, setType] = useState("text");
  const [options, setOptions] = useState([""]);
  const [maxRating, setMaxRating] = useState(5);

  const handleSubmit = () => {
    let fieldData = { label, type };

    if (
      ["dropdown", "radio", "multi-select", "switch", "checkbox"].includes(type)
    ) {
      fieldData.options = options.filter((opt) => opt.trim() !== "");
    }

    onSubmit(fieldData);
    setLabel("");
    setType("text");
    setOptions([""]);
    setMaxRating(5);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    if (type === "switch" && options.length >= 2) return; // Limit to two options
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    setOptions((prevOptions) => prevOptions.filter((_, i) => i !== index));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center !bg-black/50 z-50">
      <div className="!bg-white p-6 rounded-2xl shadow-lg w-[400px]">
        <h2 className="text-lg font-semibold text-indigo-600 mb-4">
          ➕ Add Custom Field
        </h2>

        {/* Field Label */}
        <label className="w-full mb-2 text-sm font-medium text-gray-700">
          Label
        </label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="Enter field label"
        />

        {/* Field Type */}
        <label className="w-full mb-2 text-sm font-medium text-gray-700">
          Type
        </label>
        <select
          value={type}
          style={{ width: "100%", height: 35 }}
          onChange={(e) => setType(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-2 mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          {FIELD_TYPES.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>

        {["dropdown", "radio", "multi-select", "switch", "checkbox"].includes(
          type
        ) && (
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Options
            </label>

            <div className="max-h-40 overflow-y-auto pr-1 space-y-2 no-scrollbar">
              {options.map((opt, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg p-2 outline-none"
                    placeholder={`Option ${index + 1}`}
                  />
                  {options.length > 1 && (
                    <button
                      onClick={() => removeOption(index)}
                      className="text-red-500 font-bold"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={addOption}
              className="text-indigo-600 text-sm font-medium mt-2 hover:underline"
            >
              + Add Option
            </button>
          </div>
        )}

        {type === "rating" && (
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Max Stars
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={maxRating}
              onChange={(e) => setMaxRating(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!label.trim()}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-50"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

AddFieldModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
