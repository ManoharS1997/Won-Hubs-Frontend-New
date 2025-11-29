import React, { useState, useEffect } from "react";
import FormBuilder from "../Design/components/formDesigner/formBuilder";
import PreviewModal from "../Design/components/formDesigner/PreviewModal";
import TabDesigner from "../Design/components/formDesigner/TabDesigner";
import { useNavigate, useLocation } from "react-router-dom";
import AddButtonEventModal from "../Design/components/formDesigner/AddButtonEventModal";
import { TabsContainer, TabItem } from "../MyTickets/pages/StyledComponents";
import { set } from "date-fns";
import renderIcons from "../../../shared/functions/renderIcons";
import PropTypes from "prop-types";
import Fields from "../../../shared/CreationEditor/Fields";

FormDesignerPage.propTypes = {
  recordId: PropTypes.any.isRequired,
};

export default function FormDesignerPage({ recordId: propRecordId }) {
  const { state } = useLocation();
  // console.log(state, "Here state");
  const recordId = propRecordId || state?.recordId;
  const [module, setModule] = React.useState("");
  const [formFields, setFormFields] = React.useState([]);
  const [formButtons, setFormButtons] = React.useState([]);
  const [showPreview, setShowPreview] = React.useState(false);
  const [showTabs, setShowTabs] = React.useState(false);
  const [tabs, setTabs] = React.useState([]);
  const [titleObj, setTitleObj] = useState({
    title: "",
    hovered: "",
    open: false,
  });
  const [showCreate, setShowCreate] = useState(true)
  const [previousFieldsData, setPreviousFieldsData] = useState(JSON.parse(localStorage.getItem("formDesignerData")))
  const Navigate = useNavigate()

  // const [recordId,setRecordId]=useState(recordId)

  const titleOptions = [
    {
      name: "My Items",
      subModules: ["Tickets", "Tasks", "Approvals"],
    },
    {
      name: "Users",
      subModules: [],
    },
    {
      name: "Groups",
      subModules: [],
    },
    {
      name: "Locations",
      subModules: [],
    },

    {
      name: "Departments",
      subModules: [],
    },
    {
      name: "Companies",
      subModules: [],
    },
    {
      name: "Notifications",
      subModules: [],
    },
    {
      name: "Feedbacks",
      subModules: [],
    },
    {
      name: "Alerts",
      subModules: [],
    },
  ];
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
      if (
        formFields.some(
          (field) => field.label.toLowerCase() === data.item.label.toLowerCase()
        )
      ) {
        alert(`Field "${data.item.label}" already added.`);
        return;
      }
      setFormFields((prev) => [
        ...prev,
        { ...data.item, name: `${data.item.label}` },
      ]);
    }
  };

  const onDropButton = (e) => {
    e.preventDefault();

    if (!module || module.length === 0) {
      alert("Select module");
      return;
    }

    const data = JSON.parse(e.dataTransfer.getData("application/json"));
    if (data.category !== "button") return;

    const button = data.item;
    const label = button.label;
    const labelLower = label.toLowerCase();

    // 1️⃣ Prevent duplicates
    if (formButtons.some((btn) => btn.label.toLowerCase() === labelLower)) {
      alert(`Button "${label}" already added.`);
      return;
    }

    // 2️⃣ SAVE / UPDATE → direct assign API endpoint
    if (labelLower === "save" || labelLower === "update") {
      setFormButtons((prev) => [
        ...prev,
        {
          label,
          type: "button",
          actionType: "API Call",
          apiEndpoint: "/api/form-designer/dynamic/save",
          apiMethod: "POST",
        },
      ]);
      return;
    }

    // 3️⃣ EMAIL → actionType: "email"
    if (labelLower === "email") {
      setFormButtons((prev) => [
        ...prev,
        {
          label,
          type: "button",
          actionType: "email",
        },
      ]);
      return;
    }

    // 4️⃣ EXPORT → actionType: "export"
    if (labelLower === "export") {
      setFormButtons((prev) => [
        ...prev,
        {
          label,
          type: "button",
          actionType: "export",
        },
      ]);
      return;
    }

    // 5️⃣ Other buttons → OPEN MODAL
    setAddingButton({
      open: true,
      tabIndex: null,
      buttonData: button,
    });
  };

  console.log(formButtons)

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
    if (
      formButtons.some((btn) => btn.label.toLowerCase() === label.toLowerCase())
    ) {
      alert(`Field "${label}" already added.`);
      return;
    }
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

  const getRecordDetails = async () => {
    if (!recordId) return;
    const url = `${import.meta.env.VITE_HOSTED_API_URL
      }/api/form-designer/${recordId}`;
    const response = await fetch(url);
    // console.log(response,"Record Response");
    const dbResponse = await response.json();
    console.log(dbResponse, "DbResponse Hereee");
    if (dbResponse.data) {
      const { formFields, formButtons, tabs, module, category, subCategory, widgetname, views, departmentName,designName} = dbResponse.data;
      setFormFields(formFields);
      setFormButtons(formButtons);
      setTabs(tabs);
      setModule(module);
      const previousData = {
        category: category || null,
        subCategory: subCategory || null,
        widgetname: widgetname || null,
        views: views || null,
        department: departmentName || null,
        name:designName||null
      }
      setPreviousFieldsData(previousData)
    }
  };

  useEffect(() => {
    if (recordId) {
      getRecordDetails();
    }
  }, []);

  return (
    <>
      <div className="h-[92vh] overflow-y-auto p-8 no-scrollbar">
        <div className="max-w-7xl mx-auto">
          {/* Header Tabs */}
          <div>
            <div className="flex items-center w-full justify-between mb-2">
              <h3 className="font-semibold !text-blue-800 !text-[22px] flex items-center gap-2">
                <button
                  className="m-0 p-0 bg-transparent flex items-center justify-center"
                  onClick={() => {
                    Navigate("/create/new/design");
                  }}
                >
                  {renderIcons("IoIosArrowBack", 30, "#08107D")}
                </button>
                <span>Form Designer</span>
              </h3>

              {/* Center: Tab Buttons */}
              <div className="flex-1 flex justify-center">
                <TabsContainer style={{ marginBottom: 20 }}>
                  <TabItem
                    type="button"
                    active={showCreate && !showTabs && !showPreview}
                    onClick={() => {
                      setShowCreate(true);
                      setShowTabs(false);
                      setShowPreview(false);
                    }}

                  >
                    Create
                  </TabItem>

                  <TabItem
                    type="button"
                    active={!showTabs && !showPreview && !showCreate}
                    onClick={() => {
                      setShowTabs(false);
                      setShowPreview(false);
                      setShowCreate(false)
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
                    Tabs
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

              <div className="relative inline-block w-48">
                <button
                  onClick={() => {
                    setTitleObj((prev) => ({ ...prev, open: !prev.open }));
                  }}
                  className="w-full h-10 border rounded px-3 text-left bg-white flex items-center justify-between"
                >
                  {module || "Select Module"}
                  <span className="text-gray-500">▾</span>
                </button>

                {titleObj.open && (
                  <div className="absolute left-0 mt-1 w-full bg-white border rounded shadow-md z-10">
                    {titleOptions.map((option) => (
                      <div
                        key={option.name}
                        className="relative group px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        onMouseEnter={() =>
                          setTitleObj((prev) => ({
                            ...prev,
                            hovered: option.name,
                          }))
                        }
                        onMouseLeave={() =>
                          setTitleObj((prev) => ({ ...prev, hovered: "" }))
                        }
                      >
                        <div
                          className="flex justify-between items-center"
                          onClick={() => {
                            if (!option.subModules.length) {
                              setTitleObj((prev) => ({
                                ...prev,
                                title: option.name,
                                open: false,
                              }));
                              setModule(option.name);
                            }
                          }}
                        >
                          <span>{option.name}</span>
                          {option.subModules.length > 0 && (
                            <span className="text-gray-400">‹</span> // now points left
                          )}
                        </div>

                        {/* Submodules - now shown to the LEFT */}
                        {option.subModules.length > 0 &&
                          titleObj.hovered === option.name && (
                            <div
                              className="absolute right-full top-0 mr-1 w-40 bg-white border rounded shadow-md z-20"
                              onMouseEnter={() =>
                                setTitleObj((prev) => ({
                                  ...prev,
                                  hovered: option.name,
                                }))
                              }
                              onMouseLeave={() =>
                                setTitleObj((prev) => ({
                                  ...prev,
                                  hovered: "",
                                }))
                              }
                            >
                              {option.subModules.map((sub) => (
                                <div
                                  key={sub}
                                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                  onClick={() => {
                                    setTitleObj((prev) => ({
                                      ...prev,
                                      title: sub,
                                      open: false,
                                    }));
                                    setModule(sub);
                                  }}
                                >
                                  {sub}
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Conditional Screens */}
          <div className="grid grid-cols-1 gap-8">
            {/* Form Designer */}
            {!showTabs && !showPreview && !showCreate && (
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
                  previousFieldsData={previousFieldsData}
                  widgetName="Desktop"
                />
              </section>
            )}

            {(showCreate && !showPreview && !showTabs) && (<Fields path="formDesigner" data={previousFieldsData} />)}
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
