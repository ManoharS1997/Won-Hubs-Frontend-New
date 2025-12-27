import PropTypes from "prop-types";
import { useState, useEffect } from "react";

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
  { value: "signature", label: "Signature Pad" },
  { value: "color", label: "Color Picker" },
];

export default function AddFieldModal({ open, onClose, onSubmit, fieldToEdit }) {
  const [label, setLabel] = useState("");
  const [type, setType] = useState("text");
  const [options, setOptions] = useState([""]);
  const [maxRating, setMaxRating] = useState(5);
  const [required, setRequired] = useState(false);

  // Detect whether modal is opened for a button
  const isButtonItem = fieldToEdit?.isButton === true;

  // PREFILL WHEN EDITING
  useEffect(() => {
    if (fieldToEdit) {
      setLabel(fieldToEdit.label || "");

      if (!isButtonItem) {
        // Field edit mode
        setType(fieldToEdit.type || "text");
        setOptions(fieldToEdit.options || [""]);
        setRequired(!!fieldToEdit.required);
      } else {
        // Button view-only mode
        setType("button");
        setOptions([]);
        setRequired(false);
      }
    } else {
      // Reset modal when adding new field
      setLabel("");
      setType("text");
      setOptions([""]);
      setRequired(false);
    }
  }, [fieldToEdit]);

  const handleSubmit = () => {
    // If a button is clicked, we DO NOT allow saving / editing
    if (isButtonItem) {
      onClose();
      return;
    }

    let fieldData = {
      label,
      type,
      required,
    };

    if (["dropdown", "radio", "multi-select", "switch", "checkbox"].includes(type)) {
      fieldData.options = options.filter((opt) => opt.trim() !== "");
    }

    if (type === "rating") {
      fieldData.maxRating = maxRating;
    }

    if (fieldToEdit) {
      fieldData.isEdit = true;
      fieldData.originalLabel = fieldToEdit.label;
    }

    onSubmit(fieldData);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px]">
        <button
          onClick={onClose}
          className="rounded !text-red-500  top-2 right-2 w-8 h-8 flex items-center self-end"
        >
          X
        </button>

        <h2 className="text-lg font-semibold text-indigo-600 mb-4 p-0">
          {isButtonItem
            ? "Button Details"
            : fieldToEdit
              ? "Edit Field"
              : "➕ Add Custom Field"}
        </h2>

        {/* Label */}
        <div className="flex gap-2">
          <label className="text-sm font-medium text-gray-700 mb-1 block">Label</label>
          <input
            type="text"
            value={label}
            onChange={(e) => !isButtonItem && setLabel(e.target.value)}
            disabled={isButtonItem}
            className={`w-[60%] border border-gray-300 rounded-lg p-2 mb-4 ${isButtonItem ? "bg-gray-100" : ""
              }`}
          />
        </div>

        {/* Field Type */}
        {!isButtonItem && (
          <div className="flex">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-[50%] border border-gray-300 rounded-lg px-2 mb-4"
            >
              {FIELD_TYPES.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Options (only for fields, not buttons) */}
        {!isButtonItem &&
          ["dropdown", "radio", "multi-select", "switch", "checkbox"].includes(type) && (
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Options
              </label>

              {options.map((opt, index) => (
                <div key={index} className="flex items-center gap-2 mb-1">
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => {
                      const arr = [...options];
                      arr[index] = e.target.value;
                      setOptions(arr);
                    }}
                    className="flex-1 border border-gray-300 rounded-lg p-2"
                  />
                  {options.length > 1 && (
                    <button
                      onClick={() =>
                        setOptions(options.filter((_, i) => i !== index))
                      }
                      className="text-red-500 font-bold"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}

              <button
                onClick={() => setOptions([...options, ""])}
                className="text-indigo-600 text-sm mt-2"
              >
                + Add Option
              </button>
            </div>
          )}

        {/* Required Toggle (fields only) */}
        {!isButtonItem && (
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={required}
              onChange={(e) => setRequired(e.target.checked)}
              className="w-4 h-4"
            />
            <label className="text-sm font-medium text-gray-700">
              Mark as required
            </label>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded !bg-red-500  text-white "
          >
            Close
          </button>

          {!isButtonItem && (
            <button
              onClick={handleSubmit}
              disabled={!label.trim()}
              className="px-4 py-2 rounded !bg-indigo-600 text-white disabled:opacity-50"
            >
              {fieldToEdit ? "Save" : "Add"}
            </button>
          )}
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
