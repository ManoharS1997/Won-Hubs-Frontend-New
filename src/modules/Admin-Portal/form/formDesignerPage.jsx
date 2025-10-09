import React, { useState } from "react";
import FormBuilder from "../Design/components/formDesigner/formBuilder";
import PreviewModal from "../Design/components/formDesigner/PreviewModal";
import TabDesigner from "../Design/components/formDesigner/TabDesigner";
import { useLocation } from "react-router-dom";
import AddButtonEventModal from "../Design/components/formDesigner/AddButtonEventModal";
import { TabsContainer, TabItem } from "../MyTickets/pages/StyledComponents";

export default function FormDesignerPage() {
  const { state } = useLocation();
  const [module, setModule] = React.useState("");
  const [formFields, setFormFields] = React.useState([]);
  const [formButtons, setFormButtons] = React.useState([]);
  const [showPreview, setShowPreview] = React.useState(false);
  const [showTabs, setShowTabs] = React.useState(false);
  const [tabs, setTabs] = React.useState([]);

  const titleOptions = ["Users", "Admin", "Tickets", "My Items"];
  const [addingButton, setAddingButton] = useState({
    open: false,
    tabIndex: null,
    buttonData: null,
  });

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
    if (data.category === "field") {
      setFormFields((prev) => [
        ...prev,
        { ...data.item, name: `${data.item.label}-${prev.length}` },
      ]);
    }
  };

  // IMPORTANT: open modal on button drop
  const onDropButton = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("application/json"));
    if (data.category === "button") {
      setAddingButton({ open: true, tabIndex: null, buttonData: data.item });
    }
  };

  // Open modal on custom button add
  const addCustomButton = () => {
    setAddingButton({ open: true, tabIndex: null, buttonData: null });
  };

  // Submit modal data: add button to formButtons
  const handleAddButtonModalSubmit = ({
    eventType,
    apiCallData,
    labelFromModal,
  }) => {
    let label =
      labelFromModal || addingButton.buttonData?.label || "Custom Button";
    const newButton = {
      label,
      type: "button",
      actionType: eventType,
      apiEndpoint: apiCallData ? apiCallData.endpoint : null,
      apiMethod: apiCallData ? apiCallData.method : null,
    };
    setFormButtons((prev) => [...prev, newButton]);
    setAddingButton({ open: false, tabIndex: null, buttonData: null });
  };

  const removeField = (i) =>
    setFormFields((prev) => prev.filter((_, idx) => idx !== i));
  const removeButton = (i) =>
    setFormButtons((prev) => prev.filter((_, idx) => idx !== i));

  // return (
  //   <>
  //     <div className="h-[92vh] overflow-y-auto p-8 no-scrollbar">
  //       <div className="max-w-7xl mx-auto">
  //         {/* Header */}
  //         {/* <header className="flex justify-between items-center w-full mb-10">
  //           <h1
  //             style={{ color: "#022052", fontSize: 30, fontWeight: "bolder" }}
  //           >
  //             Form Designer
  //           </h1>
  //           <div className="flex items-center gap-3">
  //             <input
  //               type="text"
  //               placeholder="Title"
  //               className="border-b-2 border-black outline-none"
  //               onChange={(e) => setModule(e.target.value)}
  //             />
  //             <PreviewBtn
  //               // style={{ borderRadius: 8 }}
  //               // className="px-6 py-2 !bg-green-600 text-white rounded-lg"
  //               onClick={() => setShowTabs((v) => !v)}
  //               type="button"
  //               className="flex gap-2"
  //             >
  //               {showTabs ? "Hide Tabs" : "Configure Tabs"}
  //               {renderIcons("TiTabsOutline", 25, "inherit")}
  //             </PreviewBtn>

  //             <PreviewBtn
  //               // style={{ borderRadius: 8 }}
  //               type="button"
  //               // className="px-6 py-2 !bg-indigo-600 !text-white rounded-lg"
  //               onClick={() => {
  //                 if (module.length > 0) setShowPreview((v) => !v);
  //                 else alert("Please enter a title for the form");
  //               }}
  //             >
  //               {showPreview ? "Hide Preview" : "Show Preview"}
  //               {renderIcons("MdDoubleArrow", 25, "inherit")}
  //             </PreviewBtn>
  //           </div>
  //         </header> */}
  //         <header className="flex justify-center items-center w-full mb-10 gap-4">
  //         <TabsContainer style={{marginBottom:20}}>
  //           <TabItem type="button" active={true} >Form Designer</TabItem>
  //           <TabItem type="button" active={showTabs} onClick={() => {setShowTabs(true),setShowPreview(false)}}>Tab Designer</TabItem>
  //           <TabItem type="button" active={showPreview} onClick={() => {setShowPreview(true),setShowTabs(false)}}>Preview</TabItem>
  //         </TabsContainer>
  //         </header>

  //         <div className="grid grid-cols-1 gap-8">
  //           <FormBuilder
  //             formFields={formFields}
  //             formButtons={formButtons}
  //             addCustomButton={addCustomButton}
  //             onDragStart={onDragStart}
  //             onDropField={onDropField}
  //             onDropButton={onDropButton}
  //             allowDrop={allowDrop}
  //             removeField={removeField}
  //             removeButton={removeButton}
  //             setFormFields={setFormFields}
  //           />
  //         </div>
  //       </div>
  //     </div>

  //     {showPreview && (
  //       <PreviewModal
  //         show={showPreview}
  //         onClose={() => setShowPreview(false)}
  //         module={module}
  //         formFields={formFields}
  //         formButtons={formButtons}
  //         tabs={tabs}
  //         state={state}
  //       />
  //     )}

  //     {showTabs && (
  //       <div className="fixed inset-0 z-40" onClick={() => setShowTabs(false)}>
  //         {/* Backdrop */}
  //         <div className="absolute inset-0 bg-black/30"></div>
  //         {/* Panel */}
  //         <div
  //           className={`absolute top-0 right-0 h-full w-1/2 bg-white shadow-2xl transform transition-transform duration-300 ${
  //             showTabs ? "translate-x-0" : "translate-x-full"
  //           }`}
  //           onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
  //         >
  //           <div className="flex justify-between items-center p-4 border-b">
  //             <h1
  //               style={{ color: "#022052", fontSize: 30, fontWeight: "bolder" }}
  //             >
  //               Tab Designer
  //             </h1>

  //             <button
  //               className="text-red-500 font-semibold bg-transparent"
  //               onClick={() => setShowTabs(false)}
  //             >
  //               ✕
  //             </button>
  //           </div>
  //           <div className="px-2.5 overflow-y-auto h-[90%] no-scrollbar">
  //             <TabDesigner setTabs={setTabs} tabs={tabs} />
  //           </div>
  //         </div>
  //       </div>
  //     )}

  //     <AddButtonEventModal
  //       open={addingButton.open}
  //       onClose={() =>
  //         setAddingButton({ open: false, tabIndex: null, buttonData: null })
  //       }
  //       onSubmit={handleAddButtonModalSubmit}
  //       initialLabel={addingButton.buttonData?.label}
  //     />
  //   </>
  // );
  return (
    <>
      <div className="h-[92vh] overflow-y-auto p-8 no-scrollbar">
        <div className="max-w-7xl mx-auto">
          {/* Header Tabs */}
          <div>
            <div className="flex items-center w-full justify-between mb-2">
              <h3 className="font-semibold !text-blue-800 !text-[22px]">
                Form Designer
              </h3>
              {/* Center: Tab Buttons */}
              <div className="flex-1 flex justify-center">
                <TabsContainer style={{ marginBottom: 20 }}>
                  <TabItem
                    type="button"
                    active={!showTabs && !showPreview}
                    onClick={() => {
                      setShowTabs(false);
                      setShowPreview(false);
                    }}
                  >
                    Fields
                  </TabItem>
                  <TabItem
                    type="button"
                    active={showTabs}
                    onClick={() => {
                      setShowTabs(true);
                      setShowPreview(false);
                    }}
                  >
                    Tab Designer
                  </TabItem>
                  <TabItem
                    type="button"
                    active={showPreview}
                    onClick={() => {
                      setShowPreview(true);
                      setShowTabs(false);
                    }}
                  >
                    Preview
                  </TabItem>
                </TabsContainer>
              </div>
              <div className="relative">
                <select
                  value={module}
                  onChange={(e) => setModule(e.target.value)}
                  className="w-48 p-2 border rounded"
                  placeholder="Select Title"
                >
                  <option value="">Select Title</option>
                  {titleOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Conditional Screens */}
          <div className="grid grid-cols-1 gap-8">
            {/* Form Designer */}
            {!showTabs && !showPreview && (
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
            )}

            {/* Tab Designer */}
            {showTabs && (
              <section className="bg-white p-4 rounded-2xl shadow-lg border border-indigo-100 flex-grow min-w-[320px] transition">
                <TabDesigner
                  setTabs={setTabs}
                  tabs={tabs}
                  module={module?.replace(/\s+/g, "").toLowerCase()}
                />
              </section>
            )}

            {/* Preview Screen */}
            {showPreview && (
              <section className="bg-white p-4 rounded-2xl shadow-lg border border-indigo-100 flex-grow min-w-[320px] transition">
                <PreviewModal
                  show={showPreview}
                  onClose={() => setShowPreview(false)}
                  module={module}
                  formFields={formFields}
                  formButtons={formButtons}
                  tabs={tabs}
                  state={state}
                />
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Button Event Modal */}
      <AddButtonEventModal
        open={addingButton.open}
        onClose={() =>
          setAddingButton({ open: false, tabIndex: null, buttonData: null })
        }
        onSubmit={handleAddButtonModalSubmit}
        initialLabel={addingButton.buttonData?.label}
        moduleName={module?.replace(/\s+/g, "").toLowerCase()}
      />
    </>
  );
}
