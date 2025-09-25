import React from "react";
import FormBuilder from "../Design/components/formDesigner/formBuilder";
import PreviewModal from "../Design/components/formDesigner/PreviewModal";
import ModulesSidebar from "../Design/components/formDesigner/ModuleSidebar";
import TabDesigner from "../Design/components/formDesigner/TabDesigner";
import SourceForm from "../Design/components/formDesigner/SourceForm";

export default function FormDesignerPage() {
  const [module, setModule] = React.useState("");
  const [formFields, setFormFields] = React.useState([]);
  const [formButtons, setFormButtons] = React.useState([]);
  const [showPreview, setShowPreview] = React.useState(false);
  const [showTabs, setShowTabs] = React.useState(false); // ✅ new state
  const [tabs, setTabs] = React.useState([]);

  const onDragStart = (e, item, category) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ item, category })
    );
  };

  const allowDrop = (e) => e.preventDefault();

  const onDropField = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("application/json"));
    if (data.category === "field")
      setFormFields((prev) => [
        ...prev,
        { ...data.item, name: `${data.item.label}-${prev.length}` },
      ]);
  };

  const onDropButton = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("application/json"));
    if (data.category === "button")
      setFormButtons((prev) => [...prev, data.item]);
  };

  const addCustomButton = () => {
    const label = prompt("Enter button label:");
    if (!label) return;
    setFormButtons((prev) => [...prev, { type: "button", label }]);
  };

  const removeField = (i) =>
    setFormFields((prev) => prev.filter((_, idx) => idx !== i));
  const removeButton = (i) =>
    setFormButtons((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <>
      <div className="h-[92vh] overflow-y-auto p-8 no-scrollbar">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="flex justify-between items-center w-full mb-10">
            <h1
              style={{ color: "#022052", fontSize: 30, fontWeight: "bolder" }}
            >
              Form Designer
            </h1>
            <div className="flex items-center gap-3">
              <ModulesSidebar module={module} setModule={setModule} />
              <button
                style={{ borderRadius: 8 }}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
                onClick={() => setShowPreview((v) => !v)}
                type="button"
              >
                {showPreview ? "Hide Preview" : "Show Preview"}
              </button>

              <button
                style={{ borderRadius: 8 }}
                className="px-6 py-2 bg-green-600 text-white rounded-lg"
                onClick={() => setShowTabs((v) => !v)}
                type="button"
              >
                {showTabs ? "Hide Tabs" : "Show Tabs"}
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-8">
            <FormBuilder
              formFields={formFields}
              formButtons={formButtons}
              addCustomButton={addCustomButton}
              onDragStart={onDragStart}
              onDropField={onDropField}
              onDropButton={onDropButton}
              allowDrop={allowDrop}
              removeField={removeField}
              removeButton={removeButton}
              setFormFields={setFormFields}
            />
          </div>

          <SourceForm
            formFields={[
              {
                type: "radio",
                label: "Radio",
                options: ["Option A", "Option B"],
                name: "Radio-4",
              },
              {
                type: "text",
                label: "Text",
                name: "Text-0",
              },
              {
                type: "email",
                label: "Email",
                name: "Email-1",
              },
              {
                type: "number",
                label: "Number",
                name: "Number-2",
              },
              {
                type: "date",
                label: "Date",
                name: "Date-3",
              },
              {
                type: "checkbox",
                label: "Checkbox",
                options: ["Check 1", "Check 2"],
                name: "Checkbox-5",
              },
              {
                label: "gender",
                type: "radio",
                name: "gender-6",
                options: ["man", "women"],
              },
              {
                label: "hell",
                type: "checkbox",
                name: "hell-7",
                options: ["nope", "yes"],
              },
            ]}
          />
        </div>
      </div>

      {showPreview && (
        <PreviewModal
          show={showPreview}
          onClose={() => setShowPreview(false)}
          module={module}
          formFields={formFields}
          formButtons={formButtons}
          tabs={tabs}
        />
      )}

      {showTabs && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowTabs(false)} // click outside closes
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Panel */}
          <div
            className={`absolute top-0 right-0 h-full w-1/2 bg-white shadow-2xl transform transition-transform duration-300 ${
              showTabs ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h1
                style={{ color: "#022052", fontSize: 30, fontWeight: "bolder" }}
              >
                Tab Designer
              </h1>
              <button
                className="text-red-500 font-semibold"
                onClick={() => setShowTabs(false)}
              >
                ✕
              </button>
            </div>
            <div className="px-2.5 overflow-y-auto h-[90%] no-scrollbar">
              <TabDesigner setTabs={setTabs} tabs={tabs} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
