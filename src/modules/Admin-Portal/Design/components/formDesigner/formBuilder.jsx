import PropTypes from "prop-types";
import DraggableButton from "./DraggableButton";
import AddFieldModal from "./AddFieldModal";
import { useState } from "react";
import renderIcons from "../../../../../shared/functions/renderIcons";

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
  { type: "update", label: "Update" },
  { type: "cancel", label: "Cancel" },
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
  const [filteredFields, setFilteredFields] = useState(PREDEFINED_FIELDS);
  const [filteredButtons, setFilteredButtons] = useState(PREDEFINED_BUTTONS);

  return (
    <section className="bg-white p-4 rounded-2xl shadow-lg border border-indigo-100 flex-grow min-w-[320px] transition">
      <div className="mb-8">
        {/* Header */}
        <div className="flex justify-between mt-0">
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
          {/* Search Bar */}
          <div
            className="flex items-center border-1 border-[#ccc] rounded-md px-2 py-1 gap-2
        mb-2"
          >
            <input
              type="search"
              placeholder="Search Fields"
              className=" outline-none px-2 py-1"
              onChange={(e) => {
                const query = e.target.value.toLowerCase();
                setFilteredFields(
                  PREDEFINED_FIELDS.filter((field) =>
                    field.label.toLowerCase().includes(query)
                  )
                );
              }}
            />
            {renderIcons("FaSearch", 15, "gray")}
          </div>
        </div>
        {/* Predefined Fields Section */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {filteredFields.map((f) => (
            <DraggableButton
              key={f.label}
              item={f}
              category="field"
              onDragStart={onDragStart}
              className="
                bg-gradient-to-r from-blue-500 via-blue-500 to-cyan-500
                border border-blue-600/40
                text-white 
                font-medium 
                rounded-md 
                px-5 py-2.5 
                shadow-sm 
                transition-all 
                duration-300
                hover:from-blue-700 hover:via-blue-900 hover:to-blue-500
                hover:shadow-md 
                active:scale-95
                whitespace-nowrap
              "
            >
              {f.label}
            </DraggableButton>
          ))}
          <div className="flex justify-between w-[97%] items-center">
            <button
              style={{ borderRadius: 6 }}
              //           className="
              //   px-4 py-2
              //   rounded-md
              //   bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600
              //   border border-blue-600/40
              //   text-white
              //   text-sm
              //   font-medium
              //   shadow-sm
              //   hover:from-blue-700 hover:via-blue-600 hover:to-blue-500
              //   hover:shadow-md
              //   active:scale-95
              //   transition-all
              //   duration-300
              // "
              className="!bg-green-500 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-green-600 active:scale-95 transition whitespace-nowrap"
              onClick={() => setShowAddFieldModal(true)}
            >
              + Custom
            </button>

            <button className="bg-transparent m-0 p-0 text-blue-500">
              +more
            </button>

            <AddFieldModal
              open={showAddFieldModal}
              onClose={() => setShowAddFieldModal(false)}
              onSubmit={onAddFieldModalSubmit}
            />
          </div>
        </div>

        {/* Drop Zone for Fields */}
        <div
          className="border-2 border-dashed border-indigo-300 rounded-xl h-44 overflow-auto p-4 bg-indigo-50/30 hover:bg-indigo-50 transition"
          onDrop={onDropField}
          onDragOver={allowDrop}
        >
          {formFields.length === 0 && (
            <p className="text-gray-400 italic text-center mt-12">
              Drag & drop fields here
            </p>
          )}

          {/* Responsive grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {formFields.map((field, i) => (
              <div
                key={field.name}
                className="flex justify-between items-center bg-white border border-indigo-100 rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition"
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
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col">
        <div className="flex justify-between mt-0 mb-2">
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
          <div
            className="flex items-center border-1 border-[#ccc] rounded-md px-2 py-1 gap-2
        mb-2"
          >
            <input
              type="search"
              placeholder="Search Fields"
              className="outline-none px-2 py-1"
              onChange={(e) => {
                const query = e.target.value.toLowerCase();
                setFilteredButtons(
                  PREDEFINED_BUTTONS.filter((button) =>
                    button.label.toLowerCase().includes(query)
                  )
                );
              }}
            />
            {renderIcons("FaSearch", 15, "gray")}
          </div>
        </div>
        {/* Predefined Buttons Section */}
        <div className="flex flex-wrap items-center gap-3 mb-2">
          {filteredButtons.map((b) => (
            <DraggableButton
              key={b.label}
              item={b}
              category="button"
              onDragStart={onDragStart}
              className="
        bg-gradient-to-r from-blue-500 via-blue-500 to-cyan-500
        border border-blue-600/40
        text-white 
        font-medium 
        rounded-md
        px-5 py-2.5 
        shadow-sm 
        transition-all 
        duration-300
        hover:from-blue-700 hover:via-blue-900 hover:to-blue-500
        hover:shadow-md 
        active:scale-95
        whitespace-nowrap
      "
            >
              {b.label}
            </DraggableButton>
          ))}
        </div>

        {/* Separate row for "+ Custom" and "+more" buttons */}
        <div className="flex justify-between items-center w-full mt-2 mb-4">
          <button
            style={{ borderRadius: 8 }}
            onClick={addCustomButton}
            className="!bg-green-500 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-green-600 active:scale-95 transition whitespace-nowrap"
          >
            + Custom
          </button>
          <button className="bg-transparent m-0 p-0 text-blue-500 whitespace-nowrap">
            +more
          </button>
        </div>

        {/* Drop Zone for Buttons */}
        <div
          className="border-2 border-dashed border-indigo-300 rounded-xl h-32 overflow-auto p-4 bg-indigo-50/30 hover:bg-indigo-50 transition"
          onDrop={onDropButton}
          onDragOver={allowDrop}
        >
          {formButtons.length === 0 && (
            <p className="text-gray-400 italic text-center mt-6">
              Drag & drop buttons here
            </p>
          )}

          {/* Responsive grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {formButtons.map((btn, i) => (
              <div
                key={`${btn.label}-${i}`}
                className="flex justify-between items-center bg-white border border-indigo-100 rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition"
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
