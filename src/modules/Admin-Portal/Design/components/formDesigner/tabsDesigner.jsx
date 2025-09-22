import PropTypes from "prop-types";
import DraggableButton from "./DraggableButton";
import AddFieldModal from "./AddFieldModal";
import { useState } from "react";

const fieldTypesWithOptions = ["dropdown", "radio", "checkbox"];
function fieldSupportsOptions(type) {
  return fieldTypesWithOptions.includes(type);
}

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

const PREDEFINED_TABS = ["History", "Settings"];

const TABLE_ACTIONS = [
  { type: "edit", label: "Edit" },
  { type: "delete", label: "Delete" },
  { type: "update", label: "Update" },
];

function Tab({
  tab,
  tabIdx,
  setTabType,
  addCustomField,
  removeField,
  addCustomButton,
  removeButton,
  addCustomColumn,
  removeColumn,
  onDragStart,
  onDropField,
  onDropButton,
  onDropColumn,
  allowDrop,
  setFormFields
}) {
  const [showAddFieldModal, setShowAddFieldModal] = useState(false);
    const onAddFieldModalSubmit = ({ label, type }) => {
      setFormFields((prev) => [
        ...prev,
        { label, type, name: `${label}-${prev.length}` },
      ]);
      setShowAddFieldModal(false);
    };
  return (
    <section className="bg-white rounded-xl p-5 w-full shadow-md border border-gray-200 hover:shadow-lg transition">
      {/* Header */}
      <header className="flex-1 justify-between items-center mb-4">
        <h3 className="font-bold text-indigo-700 text-lg">{tab.name}</h3>
        {!tab.type && (
          <div className="gap-x-2">
            <button
              className="px-3 py-1.5 rounded-lg bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition"
              onClick={() => setTabType(tabIdx, "form")}
            >
              Form
            </button>
            <button
              className="px-3 py-1.5 rounded-lg bg-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-400 transition"
              onClick={() => setTabType(tabIdx, "table")}
            >
              Table
            </button>
          </div>
        )}
      </header>

      {/* Form Builder */}
      {tab.type === "form" && (
        <>
          {/* Fields */}
          <div
            className="border-2 border-dashed border-indigo-300 rounded-lg p-4 mb-5 min-h-28 bg-indigo-50/30 hover:bg-indigo-50 transition"
            onDrop={(e) => onDropField(e, tabIdx)}
            onDragOver={allowDrop}
          >
            <h4
              style={{
                fontSize: 18,
                color: "#4f39f6",
                fontWeight: "semibold",
                marginBottom: 18,
              }}
            >
              Fields
            </h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {PREDEFINED_FIELDS.map((f) => (
                <DraggableButton
                  key={f.label}
                  item={f}
                  category="field"
                  onDragStart={onDragStart}
                  className="px-3 py-1.5 rounded-md bg-indigo-100 text-indigo-700 text-sm font-medium shadow-sm cursor-grab hover:bg-indigo-200 transition"
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
            {tab.fields.length === 0 && (
              <p className="italic text-gray-400 text-center">
                Drop fields here
              </p>
            )}
            {tab.fields.map((field, i) => (
              <div
                key={field.name}
                className="flex justify-between items-center rounded-md bg-white border border-gray-200 p-2 mb-2 shadow-sm hover:shadow transition"
              >
                <div>
                  {field.label}{" "}
                  <span className="text-gray-400 text-sm">({field.type})</span>
                </div>
                <button
                  onClick={() => removeField(tabIdx, i)}
                  className="text-red-500 hover:text-red-700 font-bold"
                  aria-label="Remove field"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div
            className="border-2 border-dashed border-indigo-300 rounded-lg p-4 min-h-20 bg-indigo-50/30 hover:bg-indigo-50 transition"
            onDrop={(e) => onDropButton(e, tabIdx)}
            onDragOver={allowDrop}
          >
            <h4
              style={{
                fontSize: 18,
                color: "#4f39f6",
                fontWeight: "semibold",
                marginBottom: 18,
              }}
            >
              Buttons
            </h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {PREDEFINED_BUTTONS.map((b) => (
                <DraggableButton
                  key={b.label}
                  item={b}
                  category="button"
                  onDragStart={onDragStart}
                  className="px-3 py-1.5 rounded-md bg-indigo-100 text-indigo-700 text-sm font-medium shadow-sm cursor-grab hover:bg-indigo-200 transition"
                >
                  {b.label}
                </DraggableButton>
              ))}
              <button style={{borderRadius:8}}
                className="px-3 py-1.5 rounded-md bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition"
                onClick={() => addCustomButton(tabIdx)}
              >
                + Custom
              </button>
            </div>
            {tab.buttons.length === 0 && (
              <p className="italic text-gray-400 text-center">
                Drop buttons here
              </p>
            )}
            {tab.buttons.map((btn, i) => (
              <div
                key={`${btn.label}-${i}`}
                className="flex justify-between items-center rounded-md bg-white border border-gray-200 p-2 mb-2 shadow-sm hover:shadow transition"
              >
                <div>{btn.label}</div>
                <button
                  onClick={() => removeButton(tabIdx, i)}
                  className="text-red-500 hover:text-red-700 font-bold"
                  aria-label="Remove button"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Table Builder */}
      {tab.type === "table" && (
        <>
          {/* Columns */}
          <div
            className="border-2 border-dashed border-indigo-300 rounded-lg p-4 mb-5 min-h-28 bg-indigo-50/30 hover:bg-indigo-50 transition"
            onDrop={(e) => onDropColumn(e, tabIdx)}
            onDragOver={allowDrop}
          >
            <h4
              style={{
                fontSize: 18,
                color: "#4f39f6",
                fontWeight: "semibold",
                marginBottom: 18,
              }}
            >
              Columns
            </h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {PREDEFINED_FIELDS.map((f) => (
                <DraggableButton
                  key={f.label}
                  item={f}
                  category="field"
                  onDragStart={onDragStart}
                  className="px-3 py-1.5 rounded-md bg-indigo-100 text-indigo-700 text-sm font-medium shadow-sm cursor-grab hover:bg-indigo-200 transition"
                >
                  {f.label}
                </DraggableButton>
              ))}
              {TABLE_ACTIONS.map((act) => (
                <DraggableButton
                  key={act.type}
                  item={act}
                  category="action"
                  onDragStart={onDragStart}
                  className="px-3 py-1.5 rounded-md bg-blue-100 text-blue-700 text-sm font-medium shadow-sm cursor-grab hover:bg-blue-200 transition"
                >
                  {act.label}
                </DraggableButton>
              ))}
              <button
                style={{ backgroundColor: "#fb2c36" }}
                className="px-3 py-1.5 rounded-md bg-red-500 text-white text-sm font-medium hover:bg-green-600 transition"
                onClick={() => addCustomColumn(tabIdx)}
              >
                + Custom
              </button>
            </div>
            {tab.tableCols.length === 0 && (
              <p className="italic text-gray-400 text-center">
                Drop columns here
              </p>
            )}
            {tab.tableCols.map((col, i) => (
              <div
                key={col.name}
                className="flex justify-between items-center rounded-md bg-white border border-gray-200 p-2 mb-2 shadow-sm hover:shadow transition"
              >
                <div>
                  {col.label}{" "}
                  <span className="text-gray-400 text-sm">({col.type})</span>
                </div>
                <button
                  onClick={() => removeColumn(tabIdx, i)}
                  className="text-red-500 hover:text-red-700 font-bold"
                  aria-label="Remove column"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Table Preview */}
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg text-sm text-center shadow-sm">
              <thead>
                <tr className="bg-indigo-100 text-indigo-800">
                  {tab.tableCols.map((col) => (
                    <th key={col.name} className="border p-2 font-medium">
                      {col.label}
                    </th>
                  ))}
                  {tab.tableCols.some((c) => c.type === "action") && (
                    <th className="border p-2 font-medium">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  {tab.tableCols
                    .filter((c) => c.type !== "action")
                    .map((col) => (
                      <td key={col.name} className="border p-2">
                        {fieldSupportsOptions(col.type)
                          ? (col.options || []).join(", ")
                          : `[${col.type}]`}
                      </td>
                    ))}
                  {tab.tableCols.some((c) => c.type === "action") && (
                    <td className="border p-2 space-x-2">
                      <button className="px-2 py-1 rounded bg-indigo-500 text-white text-xs hover:bg-indigo-600 transition">
                        Edit
                      </button>
                      <button className="px-2 py-1 rounded bg-red-500 text-white text-xs hover:bg-red-600 transition">
                        Delete
                      </button>
                      <button className="px-2 py-1 rounded bg-yellow-500 text-white text-xs hover:bg-yellow-600 transition">
                        Update
                      </button>
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}

export default function TabsDesigner(props) {
  return (
    <section className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-100 flex-grow min-w-[320px] transition">
      <h2
        style={{
          fontSize: 24,
          color: "#022052",
          fontWeight: "bold",
          marginBottom: 24,
        }}
      >
        🗂️ Tabs Designer
      </h2>

      {/* Tab Options */}
      <div className="flex flex-wrap gap-3 mb-6">
        {PREDEFINED_TABS.map((t) => (
          <DraggableButton
            key={t}
            item={t}
            category="tab"
            onDragStart={props.onDragStart}
            className="px-3 py-1.5 rounded-md bg-indigo-100 text-indigo-700 text-sm font-medium shadow-sm cursor-grab hover:bg-indigo-200 transition"
          >
            {t}
          </DraggableButton>
        ))}
        <button style={{borderRadius:8}}
          className="px-3 py-1.5 rounded-md bg-green-500 text-white text-sm font-medium shadow hover:bg-green-600 transition"
          onClick={props.addCustomTab}
        >
          + Add Tab
        </button>
      </div>

      <div
        className="border-2 border-dashed border-indigo-300 rounded-lg min-h-[150px] p-4 bg-indigo-50/30 hover:bg-indigo-50 transition"
        onDrop={props.onDropTab}
        onDragOver={props.allowDrop}
      >
        {props.tabs.length === 0 && (
          <p className="italic text-gray-400 text-center mt-12">
            Drag tabs here
          </p>
        )}
        <div className="flex-1 gap-6">
          {props.tabs.map((tab, i) => (
            <Tab key={tab.name + i} {...props} tab={tab} tabIdx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

TabsDesigner.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  addCustomTab: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
  addField: PropTypes.func.isRequired,
  addCustomField: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired,
  addButton: PropTypes.func.isRequired,
  addCustomButton: PropTypes.func.isRequired,
  removeButton: PropTypes.func.isRequired,
  addColumn: PropTypes.func.isRequired,
  addCustomColumn: PropTypes.func.isRequired,
  removeColumn: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onDropField: PropTypes.func.isRequired,
  onDropButton: PropTypes.func.isRequired,
  onDropColumn: PropTypes.func.isRequired,
  allowDrop: PropTypes.func.isRequired,
  onDropTab: PropTypes.any.isRequired,
};
Tab.propTypes = {
  tab: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["", "form", "table"]),
    fields: PropTypes.arrayOf(PropTypes.object),
    buttons: PropTypes.arrayOf(PropTypes.object),
    tableCols: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  tabIdx: PropTypes.number.isRequired,
  setType: PropTypes.func.isRequired,
  addField: PropTypes.func.isRequired,
  addCustomField: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired,
  addButton: PropTypes.func.isRequired,
  addCustomButton: PropTypes.func.isRequired,
  removeButton: PropTypes.func.isRequired,
  addColumn: PropTypes.func.isRequired,
  addCustomColumn: PropTypes.func.isRequired,
  removeColumn: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDropField: PropTypes.func.isRequired,
  onDropButton: PropTypes.func.isRequired,
  onDropColumn: PropTypes.func.isRequired,
  allowDrop: PropTypes.func.isRequired,
  setTabType: PropTypes.any.isRequired,
  setFormFields: PropTypes.any.isRequired,
};
