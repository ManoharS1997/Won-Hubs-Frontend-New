import { useState } from "react";
import PropTypes from "prop-types";
import AddFieldModal from "./AddFieldModal";
import renderIcons from "../../../../../shared/functions/renderIcons";
import AddButtonEventModal from "./AddButtonEventModal";
import AddTableEventModal from "./AddTableEventModal";
import AddTableActionEventModal from "./AddTableActionEventModal";
import { Table } from "lucide-react";

const PREDEFINED_TABS = ["History", "Settings"];

const PREDEFINED_FIELDS = [
  { type: "text", label: "Id" },
  { type: "text", label: "Name" },
  { type: "text", label: "Channel" },
  { type: "text", label: "Org Id" },
  { type: "text", label: "Action Plan" },
  { type: "text", label: "External Notes" },
  { type: "text", label: "Internal Notes" },
  { type: "text", label: "Label" },
  { type: "text", label: "On Behalf Of" },
];

const PREDEFINED_BUTTONS = [
  { type: "save", label: "Save" },
  { type: "update", label: "Update" },
  { type: "email", label: "Email" },
  { type: "export", label: "Export" },
];

const TABLE_ACTIONS = [
  { id: 1, label: 'Search' },
  { id: 2, label: 'Filter' },
  { id: 3, label: 'Add' },

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
  removeTab,
  // addCustomButton,
  toggleRequired,
  setTabs,
}) {



  const reorderTabFields = (tabIdx, fromIndex, toIndex) => {
    setTabs((prevTabs) => {
      const updatedTabs = [...prevTabs];
      const fields = [...updatedTabs[tabIdx].fields];

      const [moved] = fields.splice(fromIndex, 1);
      fields.splice(toIndex, 0, moved);

      updatedTabs[tabIdx] = {
        ...updatedTabs[tabIdx],
        fields,
      };

      return updatedTabs;
    });
  };

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
            {/* Predefined draggable fields */}
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

            {/* Responsive grid layout for dropped fields */}
            {tab.fields.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {tab.fields.map((field, idx) => (
                  <div
                    key={field.name}
                    className="flex justify-between items-center bg-white rounded px-4 py-2 shadow-sm hover:shadow-md transition"
                  >
                    <div>
                      <span className="font-medium">{field.label}</span>{" "}
                      <small className="text-indigo-500">({field.type})</small>
                      {field.required && (
                        <span className="text-red-500 text-sm ml-1">*</span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleRequired(tabIdx, idx)}
                        className={`text-sm font-semibold ${field.required ? "text-red-500" : "text-gray-400"
                          } hover:text-red-600 transition`}
                        title="Toggle required"
                      >
                        {field.required ? "Req" : "Opt"}
                      </button>

                      <button
                        onClick={() => removeField(tabIdx, idx)}
                        className="text-red-600 hover:text-red-800 rounded focus:outline-none"
                        aria-label="Remove field"
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
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
            {/* Predefined draggable buttons */}
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
              {/* <button
                onClick={() => {
                  addCustomButton(tabIdx);
                }}
                className="px-3 py-1 !bg-green-600 text-white rounded cursor-pointer hover:bg-green-700"
              >
                + Custom Button
              </button> */}
            </div>

            {/* Responsive grid layout for dropped buttons */}
            {tab.buttons.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {tab.buttons.map((button, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-white rounded px-4 py-2 shadow-sm hover:shadow-md transition"
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
                ))}
              </div>
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
            {/* Predefined draggable fields & table actions */}
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
                onClick={() => {
                  const label = prompt("Enter column label");
                  if (label) addTabColumn(tabIdx, { type: "custom", label });
                }}
                className="px-3 py-1 !bg-green-600 text-white rounded cursor-pointer hover:bg-green-700"
              >
                + Custom Column
              </button>
            </div>

            {/* Responsive grid layout for dropped columns */}
            {tab.tableCols.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {tab.tableCols.map((col, idx) => (
                  <div
                    key={col.name}
                    className="flex justify-between items-center bg-white rounded px-4 py-2 shadow-sm hover:shadow-md transition"
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
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 italic">
                Drop columns here
              </p>
            )}
          </div>
          {/* Filter elements section */}
          <div
            onDrop={(e) => onDrop(e, tabIdx, "column")}
            onDragOver={allowDrop}
            className="border-2 border-dashed border-indigo-400 p-4 rounded-lg mb-6 min-h-[10rem]"
          >
            {/* Predefined draggable fields & table actions */}
            <div className="flex flex-wrap gap-3 mb-4">
              {TABLE_ACTIONS.map((field) => (
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
            </div>

            {/* Responsive grid layout for dropped columns */}
            {TABLE_ACTIONS.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {tab.tableCols.map((col, idx) => (
                  <div
                    key={col.name}
                    className="flex justify-between items-center bg-white rounded px-4 py-2 shadow-sm hover:shadow-md transition"
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
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 italic">
                Drop columns here
              </p>
            )}
          </div>
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
                        width: `${100 /
                          (tab.tableCols.filter((c) => c.type !== "action")
                            .length +
                            1)
                          }%`,
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
                      width: `${100 /
                        (tab.tableCols.filter((c) => c.type !== "action")
                          .length +
                          1)
                        }%`,
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
                      className="border border-gray-300 px-4 py-2 truncate"
                      style={{
                        width: `${100 /
                          (tab.tableCols.filter((c) => c.type !== "action")
                            .length +
                            1)
                          }%`,
                      }}
                    >
                      {fieldSupportsOptions(col.type)
                        ? (col.options || []).join(", ")
                        : `${col.type}`}
                    </td>
                  ))}

                {/* Single Actions cell */}
                {tab.tableCols.some((col) => col.type === "action") && (
                  <td
                    className="border border-gray-300 px-4 py-2"
                    style={{
                      width: `${100 /
                        (tab.tableCols.filter((c) => c.type !== "action")
                          .length +
                          1)
                        }%`,
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
                                  `Trigger ${actionCol.label} API: ${actionCol.apiConfig.description}`
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
  addCustomButton: PropTypes.func.isRequired,
  toggleRequired: PropTypes.func.isRequired,
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
  // updateTabFilters,
  addCustomButton,
  toggleRequired,
  setTabs,
  
}) {
  const [showAllButtonFields, setShowAllButtonFields] = useState(false);
  const [updatedTabsList, setUpdatedTabsList] = useState(tabsList);
  const [draggedTabIndex, setDraggedTabIndex] = useState(null);

  const reorderTabs = (fromIndex, toIndex) => {
    setTabs((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  };

  return (
    <section className="bg-white rounded-lg  mx-auto mt-2 min-h-full">
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
              // updateTabFilters(
              //   PREDEFINED_TABS.filter((tab) =>
              //     tab.label.toLowerCase().includes(query)
              //   )
              // );
              const filteredTabs = tabsList.filter((item) =>
                item.toLowerCase().includes(query)
              );
              setUpdatedTabsList(filteredTabs);
            }}
          />
          {renderIcons("FaSearch", 15, "gray")}
        </div>
      </div>
      {/* Tabs Rendering */}
      <div className="flex flex-wrap gap-3 mb-6">
        {(showAllButtonFields
          ? updatedTabsList
          : updatedTabsList.slice(0, 4)
        ).map((t) => (
          <div
            key={t}
          >
            <DraggableButton
              key={t}
              item={t}
              category="tab"
              onDragStart={onDragStart}
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
          </div>
        ))}
      </div>

      <div className="flex w-full justify-between items-center mb-4">
        <button
          onClick={addCustomTab}
          className="px-3 py-2 rounded !bg-green-600 text-white hover:bg-green-700 shadow-sm"
          type="button"
        >
          + Custom
        </button>

        <button
          className="bg-transparent p-0 m-0 text-blue-600 font-medium hover:underline"
          onClick={() => setShowAllButtonFields((prev) => !prev)}
        >
          {showAllButtonFields ? "Show Less" : "+ More"}
        </button>
      </div>

      <div
        onDrop={onDropTab}
        onDragOver={allowDrop}
        className="border-2 !border-dashed !border-indigo-400 min-h-[15rem] p-4 !rounded"
      >
        {tabs.length === 0 ? (
          <p className="text-center text-gray-500 italic mt-10">
            Drag tabs here
          </p>
        ) : (
          <div className="flex-col items-center gap-5">
            {tabs.map((tab, idx) => (
              <div
                key={tab.name + idx}
                draggable
                onDragStart={() => setDraggedTabIndex(idx)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (
                    draggedTabIndex !== null &&
                    draggedTabIndex !== idx
                  ) {
                    reorderTabs(draggedTabIndex, idx);
                  }
                  setDraggedTabIndex(null);
                }}
                className="cursor-move select-none"
              >
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
                  addCustomButton={addCustomButton}
                  toggleRequired={toggleRequired}
                />
              </div>
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
  updateTabFilters: PropTypes.func.isRequired,
  tabsList: PropTypes.func.isRequired,
  addCustomButton: PropTypes.func.isRequired,
  toggleRequired: PropTypes.func.isRequired,
};

TabDesigner.propTypes = {
  tabs: PropTypes.any.isRequired,
  setTabs: PropTypes.any.isRequired,
  module: PropTypes.any.isRequired,
};

export default function TabDesigner({ tabs, setTabs, module }) {
  const [showAddFieldModal, setShowAddFieldModal] = useState(false);
  const [fieldModalTabIdx, setFieldModalTabIdx] = useState(null);
  const [openActionModal, setOpenActionModal] = useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState(null);
  const [selectedActionLabel, setSelectedActionLabel] = useState("");
  const [openTableEventModal, setOpenTableEventModal] = useState(false);
  const [filteredTabs, setFilteredTabs] = useState(PREDEFINED_TABS);
  const [addingButton, setAddingButton] = useState({
    open: false,
    tabIndex: null,
    buttonData: null,
    tabIdx: null,
  });

  const [buttonFilters,setButtonFilters] = useState(Table_ACTIONS);

  const onDragStart = (e, item, category) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ item, category })
    );
  };

  const handleAddButtonModalSubmit = ({
    eventType,
    apiCallData,
    labelFromModal,
  }) => {
    let label =
      labelFromModal || addingButton.buttonData?.label || "Custom Button";
    const currentTab = tabs[addingButton.tabIdx];
    if (!currentTab) return;

    const existingButton = currentTab.buttons?.find(
      (btn) => btn?.label?.toLowerCase().trim() === label?.toLowerCase().trim()
    );

    if (existingButton) {
      alert(`Button "${label}" already exists in ${currentTab?.name}.`);
      return;
    }

    const newButton = {
      label,
      type: "button",
      actionType: eventType,
      apiEndpoint: apiCallData ? apiCallData.endpoint : null,
      apiMethod: apiCallData ? apiCallData.method : null,
    };

    setTabs((prev) =>
      prev.map((tab, i) =>
        i === addingButton?.tabIdx
          ? { ...tab, buttons: [...tab.buttons, newButton] }
          : tab
      )
    );
    setAddingButton({
      open: false,
      tabIndex: null,
      buttonData: null,
      tabIdx: null,
    });
  };

  const allowDrop = (e) => e.preventDefault();

  const onDropTab = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("application/json"));
    if (
      data.category === "tab" &&
      !tabs.some((t) => t.name.toLowerCase() === data.item.toLowerCase())
    ) {
      setTabs((prev) => [
        ...prev,
        { name: data.item, type: "", fields: [], buttons: [], tableCols: [] },
      ]);
    }
  };

  const addCustomTab = () => {
    const name = prompt("Enter tab name");
    if (!name) return;
    if (name?.toLowerCase() === "details") {
      alert(`Can't use!! Tab "${name}" is a reserved name.`);
      return;
    }
    if (tabs.some((t) => t.name.toLowerCase() === name.toLowerCase())) {
      alert(`Tab "${name}" already exists.`);
      return;
    }
    setTabs((prev) => [
      ...prev,
      { name, type: "", fields: [], buttons: [], tableCols: [] },
    ]);
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
          setSelectedTabIndex(idx);
          setOpenTableEventModal(true);
          return { ...tab, type, fields: [], buttons: [], tableCols: [] };
        }

        return { ...tab, type };
      })
    );
  };

  const handleTableApiSubmit = ({ apiCallData }) => {
    if (!apiCallData || selectedTabIndex === null) return;
    setTabs((prev) =>
      prev.map((tab, i) =>
        i === selectedTabIndex
          ? {
            ...tab,
            apiConfig: {
              apiUrl: apiCallData.endpoint,
              method: apiCallData.method,
            },
          }
          : tab
      )
    );

    // close modal after setting
    setOpenTableEventModal(false);
    setSelectedTabIndex(null);
  };

  const handleActionApiSubmit = ({ actionLabel, apiCallData }) => {
    if (!apiCallData || selectedTabIndex === null) return;

    setTabs((prev) =>
      prev.map((tab, i) =>
        i === selectedTabIndex
          ? {
            ...tab,
            tableCols: [
              ...tab.tableCols,
              {
                type: "action",
                label: actionLabel,
                name: actionLabel.toLowerCase(),
                apiConfig: {
                  apiUrl: apiCallData.endpoint,
                  method: apiCallData.method,
                  description: apiCallData.description,
                },
              },
            ],
          }
          : tab
      )
    );

    setOpenActionModal(false);
    setSelectedTabIndex(null);
    setSelectedActionLabel("");
  };

  const addTabField = (idx, field) => {
    const toCamelCase = (str) =>
      str
        .trim()
        .replace(/[^a-zA-Z0-9 ]/g, " ")
        .split(/\s+/)
        .filter(Boolean)
        .map((word, index) =>
          index === 0
            ? word.toLowerCase()
            : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join("");

    const labelStr = field.label;
    const fieldName = toCamelCase(labelStr);

    const currentTab = tabs[idx];
    if (!currentTab) return;

    const isDuplicate = currentTab.fields.some(
      (f) => f.name.trim().toLowerCase() === fieldName.toLowerCase()
    );

    if (isDuplicate) {
      alert(`Field "${labelStr}" is already added in ${currentTab?.name}.`);
      return;
    }

    setTabs((prev) =>
      prev.map((tab, i) =>
        i === idx
          ? {
            ...tab,
            fields: [
              ...tab.fields,
              {
                ...field,
                required: !!field.required,
                name: fieldName,
              },
            ],
          }
          : tab
      )
    );
  };

  const toggleRequired = (tabIdx, fieldIdx) => {
    setTabs((prev) =>
      prev.map((tab, i) =>
        i === tabIdx
          ? {
            ...tab,
            fields: tab.fields.map((field, j) =>
              j === fieldIdx ? { ...field, required: !field.required } : field
            ),
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

  const addTabColumn = (idx, column) => {
    const currentTab = tabs[idx];
    if (!currentTab) return;

    const isDuplicate = currentTab.tableCols.some(
      (col) => col.label?.toLowerCase() === column.label?.toLowerCase()
    );

    if (isDuplicate) {
      alert(`Column "${column.label}" already exists in ${currentTab?.name}.`);
      return;
    }

    // ✅ If label is Edit / Update / Delete → open modal for API mapping
    if (["Edit", "View", "Delete"].includes(column.label)) {
      setSelectedTabIndex(idx);
      setSelectedActionLabel(column.label);
      setOpenActionModal(true);
    } else {
      // Add regular column
      setTabs((prev) =>
        prev.map((tab, i) =>
          i === idx
            ? {
              ...tab,
              tableCols: [
                ...tab.tableCols,
                { ...column, name: `${column.label}` },
              ],
            }
            : tab
        )
      );
    }
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

  const addCustomButton = (tabIdx) => {
    setAddingButton({
      open: true,
      tabIndex: null,
      buttonData: null,
      tabIdx: tabIdx,
    });
  };

  // Drop handlers
  const onDrop = (e, idx, type) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("application/json"));

    // ----------------------------
    // 1️⃣ FIELD DROP
    // ----------------------------
    if (type === "field" && data.category === "field") {
      addTabField(idx, data.item);
      return;
    }

    // ----------------------------
    // 2️⃣ BUTTON DROP
    // ----------------------------
    if (type === "button" && data.category === "button") {
      const currentTab = tabs[idx];
      if (!currentTab) return;

      const droppedButton = data.item;
      const label = droppedButton.label || "";
      const labelLower = label.toLowerCase().trim();

      // 2.1 Prevent duplicates
      if (
        currentTab.buttons?.some(
          (btn) => btn.label.toLowerCase().trim() === labelLower
        )
      ) {
        alert(`Button "${label}" already exists in ${currentTab.name}.`);
        return;
      }

      // ----------------------------
      // 2.2 SAVE / UPDATE BUTTON → DIRECT INSERT (NO MODAL)
      // ----------------------------
      if (labelLower === "save" || labelLower === "update") {
        const newButton = {
          label,
          type: "button",
          actionType: "API Call",
          apiEndpoint: "/api/form-designer/dynamic/save",
          apiMethod: "POST",
        };

        setTabs((prev) =>
          prev.map((tab, i) =>
            i === idx ? { ...tab, buttons: [...tab.buttons, newButton] } : tab
          )
        );

        return;
      }

      // ----------------------------
      // 2.3 EMAIL BUTTON → DIRECT INSERT
      // ----------------------------
      if (labelLower === "email") {
        const newButton = {
          label,
          type: "button",
          actionType: "email",
        };

        setTabs((prev) =>
          prev.map((tab, i) =>
            i === idx ? { ...tab, buttons: [...tab.buttons, newButton] } : tab
          )
        );

        return;
      }

      // ----------------------------
      // 2.4 EXPORT BUTTON → DIRECT INSERT
      // ----------------------------
      if (labelLower === "export") {
        const newButton = {
          label,
          type: "button",
          actionType: "export",
        };

        setTabs((prev) =>
          prev.map((tab, i) =>
            i === idx ? { ...tab, buttons: [...tab.buttons, newButton] } : tab
          )
        );

        return;
      }

      // ----------------------------
      // 2.5 OTHER BUTTONS → OPEN MODAL
      // ----------------------------
      setAddingButton({
        open: true,
        tabIndex: null,
        buttonData: droppedButton,
        tabIdx: idx,
      });

      return;
    }

    // ----------------------------
    // 3️⃣ COLUMN DROP (FIELD or ACTION)
    // ----------------------------
    if (
      type === "column" &&
      (data.category === "field" || data.category === "action")
    ) {
      addTabColumn(idx, data.item);
      return;
    }
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
        addCustomButton={addCustomButton}
        toggleRequired={toggleRequired}
        setTabs={setTabs}
      />
      <AddFieldModal
        open={showAddFieldModal}
        onClose={() => setShowAddFieldModal(false)}
        onSubmit={onAddFieldSubmit}
      />
      <AddButtonEventModal
        open={addingButton.open}
        onClose={() =>
          setAddingButton({
            open: false,
            tabIndex: null,
            buttonData: null,
            tabIdx: null,
          })
        }
        onSubmit={handleAddButtonModalSubmit}
        initialLabel={addingButton.buttonData?.label}
        moduleName={module}
      />

      <AddTableEventModal
        open={openTableEventModal}
        onClose={() => {
          setOpenTableEventModal(false);
          setSelectedTabIndex(null);
        }}
        onSubmit={handleTableApiSubmit}
        moduleName={module}
      />

      <AddTableActionEventModal
        open={openActionModal}
        onClose={() => setOpenActionModal(false)}
        onSubmit={handleActionApiSubmit}
        actionLabel={selectedActionLabel}
        moduleName={module}
      />
    </>
  );
}
