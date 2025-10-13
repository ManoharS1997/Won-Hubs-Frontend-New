import React, { useState ,useEffect} from "react";
import FormBuilder from "../Design/components/formDesigner/formBuilder";
import PreviewModal from "../Design/components/formDesigner/PreviewModal";
import TabDesigner from "../Design/components/formDesigner/TabDesigner";
import { useLocation } from "react-router-dom";
import AddButtonEventModal from "../Design/components/formDesigner/AddButtonEventModal";
import { TabsContainer, TabItem } from "../MyTickets/pages/StyledComponents";

export default function FormDesignerPage({recordId}) {
  console.log(recordId,"RecordId Heree")
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
    if (module?.length > 0) {
      const data = JSON.parse(e.dataTransfer.getData("application/json"));
      if (data.category === "button") {
        setAddingButton({ open: true, tabIndex: null, buttonData: data.item });
      }
    } else {
      alert("Select module");
    }
  };

  // Open modal on custom button add
  const addCustomButton = () => {
    if (module?.length > 0) {
      setAddingButton({ open: true, tabIndex: null, buttonData: null });
    } else {
      alert("Select module");
    }
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


 
  const getRecordDetails=async()=>{
    const url=`${import.meta.env.VITE_HOSTED_API_URL}/api/form-designer/${recordId}`
    const response=await fetch(url)
    // console.log(response,"Record Response");
    const dbResponse=await response.json()
    console.log(dbResponse,"DbResponse Hereee")
    if(dbResponse.data){
    const {formFields,formButtons,tabs,module}=dbResponse.data
    setFormFields(formFields)
    setFormButtons(formButtons)
    setTabs(tabs)
    setModule(module)
    }
  }
  
  useEffect(()=>{
    if(recordId){
      getRecordDetails()
    }
  },[])
  
  
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
                      if (module?.length > 0) {
                        setShowTabs(true);
                        setShowPreview(false);
                      } else {
                        alert("Select module");
                      }
                    }}
                  >
                    Tab Designer
                  </TabItem>
                  <TabItem
                    type="button"
                    active={showPreview}
                    onClick={() => {
                      if (module?.length > 0) {
                        setShowPreview(true);
                        setShowTabs(false);
                      } else {
                        alert("Select module");
                      }
                    }}
                  >
                    Preview
                  </TabItem>
                </TabsContainer>
              </div>
              <div className="relative">
                <select
                  value={module}
                  style={{ height: 40, width: 200 }}
                  onChange={(e) => setModule(e.target.value)}
                  className="w-48 h-20 p-2 border rounded"
                  placeholder="Select Module"
                >
                  <option value="">Select Module</option>
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
                  recordId={recordId}
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
