import React from "react";

// Dummy icons/components—you should import actual icons/components as per your project.
const renderIcons = (name, size, color) => <span />;

// Example placeholder: Custom Preview, Tab designer, and Form Builder modals.
const PreviewModal = ({ show, onClose, module, formFields, formButtons, tabs, state }) => null;
const TabDesigner = ({ setTabs, tabs }) => null;

// Main FormDesignerPage component
export default function FormDesignerPage() {
  const [module, setModule] = React.useState("");
  const [formFields, setFormFields] = React.useState([]);
  const [formButtons, setFormButtons] = React.useState([]);
  const [showPreview, setShowPreview] = React.useState(false);
  const [showTabs, setShowTabs] = React.useState(false);
  const [tabs, setTabs] = React.useState([]);

  // Sidebar drag start
  const onDragStart = (e, item, category) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ item, category })
    );
  };

  const allowDrop = (e) => e.preventDefault();

  // Central drop zones
  const onDropField = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("application/json"));
    if (data.category === "field")
      setFormFields((prev) => [
        ...prev,
        { ...data.item, name: `${data.item.label}-${prev.length}` },
      ]);
  };

  // Add custom fields/buttons logic
  const addCustomButton = () => {
    const label = prompt("Enter button label:");
    if (!label) return;
    setFormButtons((prev) => [...prev, { type: "button", label }]);
  };

  const removeField = (i) =>
    setFormFields((prev) => prev.filter((_, idx) => idx !== i));

  // Main render
  return (
    <div className="min-h-screen bg-[#f8f8fa] flex flex-col font-sans">
      {/* Top Navigation/Header */}
      <div className="flex items-center justify-between px-8 py-4 shadow-sm bg-white">
        {/* Left: Breadcrumb/navigate */}
        <div className="flex items-center space-x-3">
          <button className="text-2xl px-2 rounded hover:bg-gray-200 transition">&#8592;</button>
          <span className="text-lg font-medium text-[#022052]">Catalog Form</span>
        </div>
        {/* Right: Page Toggle/Preview */}
        <div className="flex items-center space-x-4">
          <span className="text-lg font-medium bg-[#fff] border border-gray-300 px-4 py-2 rounded-full">1</span>
          <button
            className="bg-black text-white px-6 py-2 rounded-full flex items-center gap-2 font-semibold text-base shadow"
            onClick={() => setShowPreview(v => !v)}
          >
            {showPreview ? "Hide Preview" : "Preview"}
            {renderIcons('MdDoubleArrow', 22, 'white')}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="bg-white w-[240px] p-5 border-r flex flex-col gap-6 rounded-tr-3xl rounded-br-3xl mt-4 ml-4 shadow-lg h-[88vh]">
          <div className="mb-2 font-semibold text-xl text-gray-700 ml-1">Fields</div>
          {/* Example fixed fields from image */}
          <div
            className="py-3 px-6 bg-[#FFEBCC] border rounded-lg shadow cursor-pointer text-lg font-medium flex items-center mb-1 hover:bg-[#ffe2a5] transition"
            draggable
            onDragStart={e => onDragStart(e, { label: "Department" }, "field")}
          >
            Department
          </div>
          <div
            className="py-3 px-6 bg-[#FFEBCC] border rounded-lg shadow cursor-pointer text-lg font-medium flex items-center mb-1 hover:bg-[#ffe2a5] transition"
            draggable
            onDragStart={e => onDragStart(e, { label: "Organisation" }, "field")}
          >
            Organisation
          </div>
          <div
            className="py-3 px-6 bg-[#FFEBCC] border rounded-lg shadow cursor-pointer text-lg font-medium flex items-center mb-1 hover:bg-[#ffe2a5] transition"
            draggable
            onDragStart={e => onDragStart(e, { label: "Contact Details" }, "field")}
          >
            Contact Details
          </div>
        </aside>

        {/* Central Form Card */}
        <main className="flex-1 flex justify-center items-start py-10 overflow-y-auto">
          <div
            className="bg-white rounded-2xl shadow-xl border w-[650px] p-8 min-h-[85vh] flex flex-col items-center"
            onDrop={onDropField}
            onDragOver={allowDrop}
          >
            {/* Form field list area */}
            {(formFields.length > 0 ?
              formFields :
              [
                { label: "Name" },
                { label: "On Behalf Of" },
                { label: "Category" },
                { label: "Sub Category" },
                { label: "Short Description" },
                { label: "Description" },
                { label: "Attachment" },
                { label: "Task Type" }
              ]
            ).map((field, idx) => (
              <div
                key={idx}
                className="w-full py-4 px-8 bg-[#FFEBCC] border rounded-lg shadow text-lg font-semibold mb-4 flex items-center justify-between"
              >
                <span>{field.label}</span>
                <button
                  className="ml-3 text-gray-500 hover:text-red-600 transition text-xl"
                  onClick={() => removeField(idx)}
                  tabIndex={-1}
                  title="Remove field"
                  style={{ visibility: formFields.length > 0 ? "visible" : "hidden" }}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Add tab/preview modals if needed */}
      {showPreview && (
        <PreviewModal
          show={showPreview}
          onClose={() => setShowPreview(false)}
          module={module}
          formFields={formFields}
          formButtons={formButtons}
          tabs={tabs}
          state={{}}
        />
      )}
      {showTabs && (
        <div className="fixed inset-0 z-40" onClick={() => setShowTabs(false)}>
          <div className="absolute inset-0 bg-black/30"></div>
          <div
            className="absolute top-0 right-0 h-full w-1/2 bg-white shadow-2xl transform transition-transform duration-300"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h1 className="text-2xl font-bold text-[#022052]">Tab Designer</h1>
              <button
                className="text-red-500 font-semibold bg-transparent"
                onClick={() => setShowTabs(false)}
              >✕</button>
            </div>
            <div className="px-2.5 overflow-y-auto h-[90%] no-scrollbar">
              <TabDesigner setTabs={setTabs} tabs={tabs} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
