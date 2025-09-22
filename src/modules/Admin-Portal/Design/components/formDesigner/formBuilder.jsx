import PropTypes from "prop-types";
import DraggableButton from "./DraggableButton";
import AddFieldModal from "./AddFieldModal";
import { useState } from "react";

const PREDEFINED_FIELDS = [
  { type: "text", label: "Text" },
  { type: "email", label: "Email" },
  { type: "number", label: "Number" },
  { type: "date", label: "Date" },
  { type: "time", label: "Time" },
  {
    type: "dropdown",
    label: "Dropdown",
    options: ["Option 1", "Option 2", "Option 3"],
  },
  { type: "radio", label: "Radio", options: ["Option A", "Option B"] },
  { type: "checkbox", label: "Checkbox", options: ["Check 1", "Check 2"] },
];

const PREDEFINED_BUTTONS = [
  { type: "submit", label: "Submit" },
  { type: "reset", label: "Reset" },
];

export default function FormBuilder({
  formFields,
  formButtons,
  addCustomButton,
  onDragStart,
  onDropField,
  onDropButton,
  allowDrop,
  removeField,
  removeButton,
  setFormFields,
}) {
  const [showAddFieldModal, setShowAddFieldModal] = useState(false);
  const onAddFieldModalSubmit = ({ label, type, options }) => {
    setFormFields((prev) => [
      ...prev,
      {
        label,
        type,
        name: `${label}-${prev.length}`,
        ...(options ? { options } : {}),
      },
    ]);
    setShowAddFieldModal(false);
  };

  return (
    <section className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-100 flex-grow min-w-[320px] transition">
      <div className="mb-8">
        <h3
          style={{
            fontSize: 18,
            color: "#4f39f6",
            fontWeight: "semibold",
            marginBottom: 18,
          }}
        >
          Fields
        </h3>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {PREDEFINED_FIELDS.map((f) => (
            <DraggableButton
              key={f.label}
              item={f}
              category="field"
              onDragStart={onDragStart}
              className="bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800 font-medium rounded-lg px-4 py-2 cursor-grab hover:from-indigo-200 hover:to-indigo-300 active:scale-95 shadow-sm transition whitespace-nowrap"
            >
              {f.label}
            </DraggableButton>
          ))}
          <button
            style={{ borderRadius: 8 }}
            className="px-3 py-1.5 rounded-md bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition"
            onClick={() => setShowAddFieldModal(true)}
          >
            + Custom
          </button>
          <AddFieldModal
            open={showAddFieldModal}
            onClose={() => setShowAddFieldModal(false)}
            onSubmit={onAddFieldModalSubmit}
          />
        </div>

        {/* Drop Zone for Fields */}
        <div
          className="border-2 border-dashed border-indigo-300 rounded-xl h-44 overflow-auto p-4 flex flex-col justify-start bg-indigo-50/30 hover:bg-indigo-50 transition"
          onDrop={onDropField}
          onDragOver={allowDrop}
        >
          {formFields.length === 0 && (
            <p className="text-gray-400 italic text-center mt-12">
              Drag & drop fields here
            </p>
          )}
          {formFields.map((field, i) => (
            <div
              key={field.name}
              className="flex justify-between items-center bg-white border border-indigo-100 rounded-lg px-4 py-2 mb-2 shadow-sm hover:shadow-md transition"
            >
              <div>
                <span className="font-medium">{field.label}</span>{" "}
                <span className="text-gray-500 italic text-sm">
                  ({field.type})
                </span>
              </div>
              <button
                style={{ borderRadius: 8 }}
                onClick={() => removeField(i)}
                className="text-red-500 hover:text-red-700 text-lg font-bold transition"
                type="button"
                aria-label="Remove field"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons Section */}
      <div>
        <h3
          style={{
            fontSize: 18,
            color: "#4f39f6",
            fontWeight: "semibold",
            marginBottom: 18,
          }}
          className="font-semibold text-indigo-600 mb-3 text-lg"
        >
          Buttons
        </h3>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {PREDEFINED_BUTTONS.map((b) => (
            <DraggableButton
              key={b.label}
              item={b}
              category="button"
              onDragStart={onDragStart}
              className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-medium rounded-lg px-4 py-2 cursor-grab hover:from-gray-200 hover:to-gray-300 active:scale-95 shadow-sm transition whitespace-nowrap"
            >
              {b.label}
            </DraggableButton>
          ))}
          <button
            style={{ borderRadius: 8 }}
            onClick={addCustomButton}
            className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-green-600 active:scale-95 transition whitespace-nowrap"
          >
            + Custom
          </button>
        </div>

        {/* Drop Zone for Buttons */}
        <div
          className="border-2 border-dashed border-indigo-300 rounded-xl h-32 overflow-auto p-4 flex flex-col justify-start bg-indigo-50/30 hover:bg-indigo-50 transition"
          onDrop={onDropButton}
          onDragOver={allowDrop}
        >
          {formButtons.length === 0 && (
            <p className="text-gray-400 italic text-center mt-6">
              Drag & drop buttons here
            </p>
          )}
          {formButtons.map((btn, i) => (
            <div
              key={`${btn.label}-${i}`}
              className="flex justify-between items-center bg-white border border-indigo-100 rounded-lg px-4 py-2 mb-2 shadow-sm hover:shadow-md transition"
            >
              <div className="font-medium">{btn.label}</div>
              <button
                onClick={() => removeButton(i)}
                className="text-red-500 hover:text-red-700 text-lg font-bold transition"
                type="button"
                aria-label="Remove button"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

FormBuilder.propTypes = {
  formFields: PropTypes.arrayOf(PropTypes.object).isRequired,
  formButtons: PropTypes.arrayOf(PropTypes.object).isRequired,
  addCustomField: PropTypes.func.isRequired,
  addCustomButton: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  allowDrop: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired,
  removeButton: PropTypes.func.isRequired,

  // Separate handlers
  onDropButton: PropTypes.func,
  onDropField: PropTypes.func,
  setFormFields: PropTypes.setFormFields,
};
