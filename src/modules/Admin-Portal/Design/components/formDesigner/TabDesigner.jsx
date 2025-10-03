import { useState } from "react";
import PropTypes from "prop-types";
import AddFieldModal from "./AddFieldModal";
import renderIcons from "../../../../../shared/functions/renderIcons";

const PREDEFINED_TABS = ["History", "Settings"];

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

const TABLE_ACTIONS = [
  { type: "edit", label: "Edit" },
  { type: "delete", label: "Delete" },
  { type: "update", label: "Update" },
];

const fieldTypesWithOptions = ["dropdown", "radio", "checkbox"];
function fieldSupportsOptions(type) {
  return fieldTypesWithOptions.includes(type);
}

function DraggableButton({ item, category, onDragStart, children, className }) {
  return (
    <button
      type="button"
      draggable
      onDragStart={(e) => onDragStart(e, item, category)}
      className={className}
    >
      {children}
    </button>
  );
}
DraggableButton.propTypes = {
  item: PropTypes.any.isRequired,
  category: PropTypes.string.isRequired,
  onDragStart: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

function RenderFieldInput({ field }) {
  switch (field.type) {
    case "text":
    case "email":
    case "number":
    case "date":
    case "time":
      return (
        <input
          type={field.type}
          readOnly
          className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      );
    case "dropdown":
      return (
        <select
          disabled
          className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          {(field.options || []).map((opt, i) => (
            <option key={i}>{opt}</option>
          ))}
        </select>
      );
    case "radio":
      return (
        <div className="flex flex-wrap gap-4">
          {(field.options || []).map((opt, i) => (
            <label
              key={i}
              className="flex items-center space-x-2 cursor-not-allowed text-gray-600"
            >
              <input type="radio" disabled className="accent-indigo-600" />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      );
    case "checkbox":
      return (
        <div className="flex flex-wrap gap-4">
          {(field.options || []).map((opt, i) => (
            <label
              key={i}
              className="flex items-center space-x-2 cursor-not-allowed text-gray-600"
            >
              <input type="checkbox" disabled className="accent-indigo-600" />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      );
    default:
      return (
        <input
          type="text"
          readOnly
          className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      );
  }
}
RenderFieldInput.propTypes = {
  field: PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

function Tab({
  tab,
  tabIdx,
  setTabType,
  removeField,
  removeButton,
  removeColumn,
  onDragStart,
  onDrop,
  allowDrop,
  openAddFieldModal,
  addTabColumn,
  addTabButton,
  removeTab,
}) {
  return (
    <section className="bg-indigo-50 rounded-lg p-6 shadow-md w-full mb-2.5">
      <header className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold text-indigo-700">{tab.name}</h3>
        </div>
        <div className="flex flex-row items-center gap-5">
          <div className="inline-flex rounded-xl shadow-sm overflow-hidden">
            <button
              onClick={() => setTabType(tabIdx, "form")}
              className={`px-5 py-2 text-sm font-medium transition-all duration-200
      ${tab.type === "form"
                  ? "bg-gradient-to-r from-indigo-700 to-indigo-400 text-white shadow-md"
                  : "bg-slate-100 text-indigo-700 hover:bg-slate-200 border"
                }
      rounded-l-md
    `}
            >
              Form
            </button>
            <button
              onClick={() => setTabType(tabIdx, "table")}
              className={`px-5 py-2 text-sm font-medium transition-all duration-200
      ${tab.type === "table"
                  ? "bg-gradient-to-r from-indigo-700 to-indigo-400 text-white shadow-md"
                  : "bg-slate-100 text-indigo-700 hover:bg-slate-200 border"
                }
      rounded-r-md
    `}
            >
              Table
            </button>
          </div>

          <button
            onClick={() => removeTab(tabIdx)}
            className="ml-2 text-red-500 hover:text-red-700 rounded focus:outline-none bg-transparent"
            aria-label="Remove Tab"
            title="Remove Tab"
            style={{ fontSize: 30 }}
          >
            &times;
          </button>
        </div>
      </header>

      {tab.type === "form" && (
        <>
          <div
            onDrop={(e) => onDrop(e, tabIdx, "field")}
            onDragOver={allowDrop}
            className="border-2 border-dashed border-indigo-400 p-4 rounded-lg mb-6 min-h-[10rem]"
          >
            <div className="flex flex-wrap gap-3 mb-4">
              {PREDEFINED_FIELDS.map((field) => (
                <DraggableButton
                  key={field.label}
                  item={field}
                  category="field"
                  onDragStart={onDragStart}
                  className="px-3 py-1 bg-white border border-indigo-300 rounded cursor-grab text-sm text-indigo-700 shadow-sm"
                >
                  {field.label}
                </DraggableButton>
              ))}
              <button
                onClick={() => openAddFieldModal(tabIdx)}
                className="px-3 py-1 !bg-green-600 text-white rounded cursor-pointer hover:bg-green-700"
              >
                + Custom Field
              </button>
            </div>
            {tab.fields.length > 0 ? (
              tab.fields.map((field, idx) => (
                <div
                  key={field.name}
                  className="flex justify-between items-center bg-white rounded px-4 py-2 mb-2 shadow-sm"
                >
                  <span>
                    {field.label}{" "}
                    <small className="text-indigo-500">({field.type})</small>
                  </span>
                  <button
                    onClick={() => removeField(tabIdx, idx)}
                    className="text-red-600 hover:text-red-800 rounded focus:outline-none"
                    aria-label="Remove field"
                  >
                    &times;
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 italic">
                Drop fields here
              </p>
            )}
          </div>

          <div
            onDrop={(e) => onDrop(e, tabIdx, "button")}
            onDragOver={allowDrop}
            className="border-2 border-dashed border-indigo-400 p-4 rounded-lg min-h-[6rem]"
          >
            <div className="flex flex-wrap gap-3 mb-4">
              {PREDEFINED_BUTTONS.map((button) => (
                <DraggableButton
                  key={button.label}
                  item={button}
                  category="button"
                  onDragStart={onDragStart}
                  className="px-3 py-1 bg-white border border-indigo-300 rounded cursor-grab text-sm text-indigo-700 shadow-sm"
                >
                  {button.label}
                </DraggableButton>
              ))}
              <button
                onClick={() => {
                  const label = prompt("Enter button label");
                  if (label) addTabButton(tabIdx, { type: "custom", label });
                }}
                className="px-3 py-1 !bg-green-600 text-white rounded cursor-pointer hover:bg-green-700"
              >
                + Custom Button
              </button>
            </div>
            {tab.buttons.length > 0 ? (
              tab.buttons.map((button, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-white rounded px-4 py-2 mb-2 shadow-sm"
                >
                  <span>{button.label}</span>
                  <button
                    onClick={() => removeButton(tabIdx, idx)}
                    className="text-red-600 hover:text-red-800 rounded focus:outline-none"
                    aria-label="Remove button"
                  >
                    &times;
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 italic">
                Drop buttons here
              </p>
            )}
          </div>
        </>
      )}

      {tab.type === "table" && (
        <>
          <div
            onDrop={(e) => onDrop(e, tabIdx, "column")}
            onDragOver={allowDrop}
            className="border-2 border-dashed border-indigo-400 p-4 rounded-lg mb-6 min-h-[10rem]"
          >
            <div className="flex flex-wrap gap-3 mb-4">
              {PREDEFINED_FIELDS.map((field) => (
                <DraggableButton
                  key={field.label}
                  item={field}
                  category="field"
                  onDragStart={onDragStart}
                  className="px-3 py-1 bg-white border border-indigo-300 rounded cursor-grab text-sm text-indigo-700 shadow-sm"
                >
                  {field.label}
                </DraggableButton>
              ))}
              {TABLE_ACTIONS.map((action) => (
                <DraggableButton
                  key={action.type}
                  item={action}
                  category="action"
                  onDragStart={onDragStart}
                  className="px-3 py-1 bg-blue-500 text-white rounded cursor-grab text-sm shadow-sm"
                >
                  {action.label}
                </DraggableButton>
              ))}
              <button
                onClick={() => {
                  const label = prompt("Enter column label");
                  if (label) addTabColumn(tabIdx, { type: "custom", label });
                }}
                className="px-3 py-1 bg-green-600 text-white rounded cursor-pointer hover:bg-green-700"
              >
                + Custom Column
              </button>
            </div>
            {tab.tableCols.length > 0 ? (
              tab.tableCols.map((col, idx) => (
                <div
                  key={col.name}
                  className="flex justify-between items-center bg-white rounded px-4 py-2 mb-2 shadow-sm"
                >
                  <span>
                    {col.label}{" "}
                    <small className="text-indigo-500">({col.type})</small>
                  </span>
                  <button
                    onClick={() => removeColumn(tabIdx, idx)}
                    className="text-red-600 hover:text-red-800 rounded focus:outline-none"
                    aria-label="Remove column"
                  >
                    &times;
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 italic">
                Drop columns here
              </p>
            )}
          </div>

          <table className="w-full table-auto border border-gray-300 rounded-md text-center shadow-sm">
            <thead className="bg-indigo-200 text-indigo-700 font-semibold">
              <tr>
                {tab.tableCols.map((col) => (
                  <th
                    key={col.name}
                    className="border border-gray-300 px-4 py-2"
                  >
                    {col.label}
                  </th>
                ))}
                {tab.tableCols.some((c) => c.type === "action") && (
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
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
                      className="border border-gray-300 px-4 py-2"
                    >
                      {fieldSupportsOptions(col.type)
                        ? (col.options || []).join(", ")
                        : `[${col.type}]`}
                    </td>
                  ))}
                {tab.tableCols.some((c) => c.type === "action") && (
                  <td className="border border-gray-300 px-4 py-2 space-x-2">
                    <button className="bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700 transition">
                      Edit
                    </button>
                    <button className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition">
                      Delete
                    </button>
                    <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition">
                      Update
                    </button>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </>
      )}
    </section>
  );
}

Tab.propTypes = {
  tab: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["", "form", "table"]).isRequired,
    fields: PropTypes.array.isRequired,
    buttons: PropTypes.array.isRequired,
    tableCols: PropTypes.array.isRequired,
  }).isRequired,
  tabIdx: PropTypes.number.isRequired,
  setTabType: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired,
  removeButton: PropTypes.func.isRequired,
  removeColumn: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  allowDrop: PropTypes.func.isRequired,
  openAddFieldModal: PropTypes.func.isRequired,
  addTabColumn: PropTypes.func.isRequired,
  addTabButton: PropTypes.func.isRequired,
  removeTab: PropTypes.func.isRequired,
};

function TabsDesigner({
  tabsList,
  tabs,
  addCustomTab,
  setTabType,
  addTabField,
  addTabButton,
  addTabColumn,
  addCustomField,
  removeField,
  removeButton,
  removeColumn,
  onDragStart,
  onDropTab,
  onDrop,
  allowDrop,
  removeTab,
  updateTabFilters
}) {

  return (
    <section className="bg-white rounded-lg p-6 shadow-lg mx-auto mt-6">
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
          Tabs
        </h3>
        <div className="flex items-center border-1 border-[#ccc] rounded-md px-2 py-1 gap-2
              mb-2">
          <input
            type="search"
            placeholder="Search Fields"
            className="outline-none px-2 py-1"
            onChange={(e) => {
              const query = e.target.value.toLowerCase();
              updateTabFilters(
                PREDEFINED_TABS.filter(tab =>
                  tab.label.toLowerCase().includes(query)
                )
              );
            }}
          />

          {renderIcons('FaSearch', 15, 'gray')}
        </div>
      </div>
      <div className="flex flex-wrap gap-3 mb-6">
        {tabsList.map((t) => (
          <DraggableButton
            // style={{ borderRadius: '8px' }}
            key={t}
            item={t}
            category="tab"
            onDragStart={onDragStart}
            // className="px-3 py-1 rounded bg-indigo-100 text-indigo-700 cursor-grab shadow-sm"
            className="
        bg-gradient-to-r from-blue-500 via-blue-500 to-cyan-500
        border border-blue-600/40
        text-white 
        font-medium 
        !rounded-md
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
            {t}
          </DraggableButton>
        ))}
      </div>
      <div className='flex w-full justify-between items-center mb-4'>
        <button
          onClick={addCustomTab}
          className="px-3 py-2  rounded !bg-green-600 text-white hover:bg-green-700 shadow-sm"
          type="button"
        >
          + Custom
        </button>
        <button className="bg-transparent p-0 m-0 text-blue-500">+more</button>
      </div>
      <div
        onDrop={onDropTab}
        onDragOver={allowDrop}
        className="border border-dashed border-indigo-400 min-h-[15rem] p-4 rounded"
      >
        {tabs.length === 0 ? (
          <p className="text-center text-gray-500 italic mt-10">
            Drag tabs here
          </p>
        ) : (
          <div className="flex-col items-center gap-5">
            {tabs.map((tab, idx) => (
              <Tab
                key={tab.name + idx}
                tab={tab}
                tabIdx={idx}
                setTabType={setTabType}
                removeField={removeField}
                removeButton={removeButton}
                removeColumn={removeColumn}
                onDragStart={onDragStart}
                onDrop={onDrop}
                allowDrop={allowDrop}
                addTabField={addTabField}
                addTabButton={addTabButton}
                addTabColumn={addTabColumn}
                addCustomField={addCustomField}
                openAddFieldModal={addCustomField}
                removeTab={removeTab}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

TabsDesigner.propTypes = {
  tabs: PropTypes.array.isRequired,
  addCustomTab: PropTypes.func.isRequired,
  setTabType: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired,
  removeButton: PropTypes.func.isRequired,
  removeColumn: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDropTab: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  allowDrop: PropTypes.func.isRequired,
  addTabField: PropTypes.func.isRequired,
  addTabButton: PropTypes.func.isRequired,
  addTabColumn: PropTypes.func.isRequired,
  addCustomField: PropTypes.func.isRequired,
  removeTab: PropTypes.func.isRequired,
};

TabDesigner.propTypes = {
  tabs: PropTypes.any.isRequired,
  setTabs: PropTypes.any.isRequired,
};

export default function TabDesigner({ tabs, setTabs }) {
  const [showAddFieldModal, setShowAddFieldModal] = useState(false);
  const [fieldModalTabIdx, setFieldModalTabIdx] = useState(null);
  const [activeTab, setActiveTab] = useState('')
  const [filteredTabs, setFilteredTabs] = useState(PREDEFINED_TABS);

  const onDragStart = (e, item, category) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ item, category })
    );
  };

  const allowDrop = (e) => e.preventDefault();

  const onDropTab = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("application/json"));
    if (data.category === "tab" && !tabs.find((t) => t.name === data.item)) {
      setTabs((prev) => [
        ...prev,
        { name: data.item, type: "", fields: [], buttons: [], tableCols: [] },
      ]);
    }
  };

  const addCustomTab = () => {
    const name = prompt("Enter tab name");
    if (name && !tabs.find((t) => t.name === name)) {
      setTabs((prev) => [
        ...prev,
        { name, type: "", fields: [], buttons: [], tableCols: [] },
      ]);
    }
  };

  const removeTab = (tabIdx) => {
    setTabs((prev) => prev.filter((_, idx) => idx !== tabIdx));
  };

  const setTabType = (idx, type) => {
    setTabs((prev) =>
      prev.map((tab, i) => {
        if (i !== idx) return tab;

        if (type === "form") {
          return { ...tab, type, fields: [], buttons: [], tableCols: [] };
        }
        if (type === "table") {
          return { ...tab, type, fields: [], buttons: [], tableCols: [] };
        }
        return { ...tab, type };
      })
    );
  };

  const addTabField = (idx, field) => {
    setTabs((prev) =>
      prev.map((tab, i) =>
        i === idx
          ? {
            ...tab,
            fields: [
              ...tab.fields,
              { ...field, name: `${field.label}-${tab.fields.length}` },
            ],
          }
          : tab
      )
    );
  };

  const addCustomField = (idx) => {
    setFieldModalTabIdx(idx);
    setShowAddFieldModal(true);
  };

  const removeField = (tabIdx, fieldIdx) => {
    setTabs((prev) =>
      prev.map((tab, i) =>
        i === tabIdx
          ? { ...tab, fields: tab.fields.filter((_, idx) => idx !== fieldIdx) }
          : tab
      )
    );
  };

  // Buttons
  const addTabButton = (idx, button) => {
    setTabs((prev) =>
      prev.map((tab, i) =>
        i === idx ? { ...tab, buttons: [...tab.buttons, button] } : tab
      )
    );
  };

  const removeButton = (tabIdx, buttonIdx) => {
    setTabs((prev) =>
      prev.map((tab, i) =>
        i === tabIdx
          ? {
            ...tab,
            buttons: tab.buttons.filter((_, idx) => idx !== buttonIdx),
          }
          : tab
      )
    );
  };

  // Columns
  const addTabColumn = (idx, column) => {
    setTabs((prev) =>
      prev.map((tab, i) =>
        i === idx
          ? {
            ...tab,
            tableCols: [
              ...tab.tableCols,
              { ...column, name: `${column.label}-${tab.tableCols.length}` },
            ],
          }
          : tab
      )
    );
  };

  const removeColumn = (tabIdx, colIdx) => {
    setTabs((prev) =>
      prev.map((tab, i) =>
        i === tabIdx
          ? {
            ...tab,
            tableCols: tab.tableCols.filter((_, idx) => idx !== colIdx),
          }
          : tab
      )
    );
  };

  // Drop handlers
  const onDrop = (e, idx, type) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("application/json"));
    if (type === "field" && data.category === "field")
      addTabField(idx, data.item);
    if (type === "button" && data.category === "button")
      addTabButton(idx, data.item);
    if (
      type === "column" &&
      (data.category === "field" || data.category === "action")
    )
      addTabColumn(idx, data.item);
  };

  // Modal submit
  const onAddFieldSubmit = (fieldData) => {
    if (fieldModalTabIdx !== null) {
      addTabField(fieldModalTabIdx, fieldData);
      setShowAddFieldModal(false);
      setFieldModalTabIdx(null);
    }
  };
  const updateTabFilters = (tabs) => {
    setFilteredTabs(tabs);
    console.log(tabs, 'tabs');
  };

  return (
    <>
      <TabsDesigner
        tabsList={filteredTabs}
        tabs={tabs}
        addCustomTab={addCustomTab}
        setTabType={setTabType}
        addTabField={addTabField}
        addTabButton={addTabButton}
        addTabColumn={addTabColumn}
        addCustomField={addCustomField}
        removeField={removeField}
        removeButton={removeButton}
        removeColumn={removeColumn}
        onDragStart={onDragStart}
        onDropTab={onDropTab}
        onDrop={(e, idx, type) => onDrop(e, idx, type)}
        allowDrop={allowDrop}
        removeTab={removeTab}
        updateTabFilters={updateTabFilters}
      />
      <AddFieldModal
        open={showAddFieldModal}
        onClose={() => setShowAddFieldModal(false)}
        onSubmit={onAddFieldSubmit}
      />
    </>
  );
}
