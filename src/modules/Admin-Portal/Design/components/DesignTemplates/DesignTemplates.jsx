import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import renderIcons from "../../../../../shared/functions/renderIcons";
import { ReactSelect } from "../StyledComponents";
import FormInput from "../../../../../shared/UIElements/FormInput";
import WonContext from "../../../../../context/WonContext";
import FormDesignerPage from "../../../form/formDesignerPage";

const dummyData = [
  {
    name: "Catalog Form",
    category: "IT",
    mode: "Desktop",
    widgetname: "Catelogform",
    path: "/create/new/design/CatalogForm",
  },
  {
    name: "Admin Portal Forms",
    category: "HR",
    mode: "Mobile",
    widgetname: "AdminPortalForms",
    path: "/create/new/design/AdminPortalForms",
  },
  {
    name: "Widget 3",
    category: "IT",
    mode: "Tab",
    widgetname: "",
    path: "/create/new/design/Widget3",
  },
  {
    name: "Widget 4",
    category: "HR",
    mode: "Mobile",
    widgetname: "",
    path: "/create/new/design/Widget4",
  },
  {
    name: "Widget 5",
    category: "Sales",
    mode: "Desktop",
    widgetname: "",
    path: "/create/new/design/Widget5",
  },
  {
    name: "Widget 6",
    category: "Agent",
    mode: "Tab",
    widgetname: "",
    path: "/create/new/design/Widget6",
  },
  // More dummy data
  {
    name: "User Profile",
    category: "User",
    mode: "Desktop",
    widgetname: "UserProfile",
    path: "/create/new/design/UserProfile",
  },
  {
    name: "Sales Dashboard",
    category: "Sales",
    mode: "Tab",
    widgetname: "SalesDashboard",
    path: "/create/new/design/SalesDashboard",
  },
  {
    name: "HR Onboarding",
    category: "HR",
    mode: "Desktop",
    widgetname: "HROnboarding",
    path: "/create/new/design/HROnboarding",
  },
  {
    name: "Agent Tracker",
    category: "Agent",
    mode: "Mobile",
    widgetname: "AgentTracker",
    path: "/create/new/design/AgentTracker",
  },
  {
    name: "IT Support",
    category: "IT",
    mode: "Mobile",
    widgetname: "ITSupport",
    path: "/create/new/design/ITSupport",
  },
  {
    name: "User Feedback",
    category: "User",
    mode: "Tab",
    widgetname: "UserFeedback",
    path: "/create/new/design/UserFeedback",
  },
  {
    name: "Sales Report",
    category: "Sales",
    mode: "Mobile",
    widgetname: "SalesReport",
    path: "/create/new/design/SalesReport",
  },
  {
    name: "Admin Dashboard",
    category: "HR",
    mode: "Tab",
    widgetname: "AdminDashboard",
    path: "/create/new/design/AdminDashboard",
  },
  {
    name: "Agent Portal",
    category: "Agent",
    mode: "Desktop",
    widgetname: "AgentPortal",
    path: "/create/new/design/AgentPortal",
  },
  {
    name: "IT Inventory",
    category: "IT",
    mode: "Tab",
    widgetname: "ITInventory",
    path: "/create/new/design/ITInventory",
  },
  {
    name: "User Settings",
    category: "User",
    mode: "Mobile",
    widgetname: "UserSettings",
    path: "/create/new/design/UserSettings",
  },
];

const departmentDummyData = {
  Engineering: {
    Software: ["Frontend", "Backend", "DevOps"],
    Hardware: ["PCB Design", "Embedded Systems"],
  },
  Design: {
    "UI/UX": ["Wireframes", "Prototypes"],
    Graphic: ["Branding", "Illustration"],
  },
  Marketing: {
    Digital: ["SEO", "Content Writing"],
    Offline: ["Events", "Print Media"],
  },
}; //sanju

export default function DesignTemplates() {
  const CatalogDepartment = location.state ? location.state.department : "";
  const CatalogCategory = location.state ? location.state.category : "";
  const CatalogSubcategory = location.state ? location.state.subCategory : "";
  const [templatesData, setTemplatesData] = useState(dummyData);
  const [selectedTab, setSelectedtab] = useState("Desktop");
  const [category, setCategory] = useState("IT");
  const [openConfigure, setOpenConfigure] = useState(false);
  // const [departmentData, setDepartmentData] = useState(null)// commented by sandhya
  const [selectedDepartments, setSelectedDepartments] = useState({
    department: CatalogDepartment || "",
    category: CatalogCategory || "",
    sub_category: CatalogSubcategory || "",
  });
  const [views, setViews] = useState([
    "Super Admin",
    "Admin",
    "Designer Admin",
    "Agent",
    "Internal User",
    "External User",
  ]);
  const [selectedViews, setSelectedViews] = useState([]);
  const [departmentName, setDepartmentName] = useState("");
  // const { setSelectedDesign } = useContext(WonContext);
  // const [DesignName, setDesignName] = useState(""); // by sandhya
  const [departmentData, setDepartmentData] = useState(departmentDummyData);
  // const [openExistRecord, setOpenExistRecord] = useState(false);
  // const [recordId, setRecordId] = useState("");
  useEffect(() => {
    fetchConnectionsData();
  }, []);

  const fetchConnectionsData = async () => {
    try {
      const url = `${import.meta.env.VITE_HOSTED_API_URL}/api/form-designer`;
      const data = await fetch(url);
      // console.log(data,"It is response")
      const data2 = await data.json();
      // console.log(data2,"Respon.json")
      if (data2?.data.length > 0) {
        setTemplatesData(data2.data);
      }
    } catch {
      console.log("Error fetching Design Data");
    }
  };
  const Navigate = useNavigate();

  console.log(selectedDepartments, selectedViews, departmentName, category);

  const getDropdownOptions = (key) => {
    if (!departmentData) {
      return [];
    }
    switch (key) {
      case "department":
        return Object.keys(departmentData).map((dept) => ({
          label: dept,
          value: dept,
        }));
      case "category":
        return selectedDepartments.department &&
          departmentData[selectedDepartments.department]
          ? Object.keys(departmentData[selectedDepartments.department]).map(
              (cat) => ({
                label: cat,
                value: cat,
              })
            )
          : [];
      case "sub_category":
        return selectedDepartments.category &&
          departmentData[selectedDepartments.department]?.[
            selectedDepartments.category
          ]
          ? departmentData[selectedDepartments.department][
              selectedDepartments.category
            ].map((subCat) => ({
              label: subCat,
              value: subCat,
            }))
          : [];
      default:
        return [];
    }
  };

  const updateDepartments = (value) => {
    const N = value[0];
    setSelectedDepartments({
      department: N.value,
      category: "",
      sub_category: "",
    });
  };

  const updateCategory = (value) => {
    const N = value[0];
    setSelectedDepartments((prev) => ({
      ...prev,
      category: N.value,
      sub_category: "",
    }));
  };

  const updateSubcategory = async (value) => {
    try {
      const N = value[0];
      setSelectedDepartments((prevState) => ({
        ...prevState,
        sub_category: N.value,
      }));

      // const { department, category } = selectedDepartments;
    } catch (error) {
      console.error("Error updating subcategory:", error);
      // Optionally, you can set an error state here to inform the user.
    }
  };

  const onClickView = (selected) => {
    setSelectedViews(selected.map((item) => item.value));
  };

  const onChangeInputField = (e) => {
    console.log(e.target.value, "tRGET FORM NAME");
    setDepartmentName(e.target.value);
    // setDesignName(e.target.value); // by sandhya
  };
  console.log(templatesData, "Here");

  return (
    <div className="w-full h-full flex flex-col overflow-auto">
      <div className="w-full h-full flex flex-col p-4">
        <div className="w-full grid grid-cols-3 ">
          <span></span>
          <div className="w-full flex items-center justify-center gap-4">
            {["Desktop", "Tab", "Mobile"].map((item, index) => (
              <button
                key={index}
                className={`h-fit w-[100px] !border-b-2 transition-all duration-500 py-2 font-semibold
                 ${
                   selectedTab === item
                     ? "!border-black"
                     : "!border-transparent"
                 }`}
                onClick={() => setSelectedtab(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <select
            className="!ml-auto !mr-2 min-w-[150px] border "
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="IT">IT </option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
            <option value="Agent">Agent</option>
            <option value="User">User</option>
          </select>
        </div>

        <div className="w-full h-fit">
          <ul
            className="grid md:grid-cols-4 gap-4 bg-[var(--background-color)] rounded-lg p-4 list-none 
                  w-full h-fit m-0 overflow-auto"
          >
            {/* {templatesData.filter(
              (template) =>
                template.category === category && template.mode === selectedTab
            ).length > 0 && ( */}
            <li
              onClick={() => {
                // setOpenConfigure(true);
                 Navigate("/form-designer", {
                  state: {
                    widgetname: selectedTab,
                    selectedDepartments,
                    selectedViews,
                    departmentName,
                    category,
                  },
                })
              }}
              className="w-full h-[200px] bg-gray-50 rounded flex items-center justify-center hover:shadow-lg border-2 !border-dashed "
              to={{
                pathname: `/form-designer`,
                state: {
                  widgetname: selectedTab,
                  selectedDepartments,
                  selectedViews,
                  departmentName,
                  category,
                },
              }}
            >
              <p style={{ fontSize: "55px" }}>+</p>
            </li>
            {/* // )} */}
            {templatesData.filter(
              (template) =>
                template.category === category ||
                template.widgetname === selectedTab
              // template.category === category && template.mode === selectedTab by kartheek
            ).length > 0 ? (
              templatesData
                .filter(
                  (template) =>
                    // template.category === category &&
                    // template.mode === selectedTab by kartheek
                    template.widgetname === selectedTab
                )
                .map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      Navigate("/form-designer", {
                        state: { recordId: item._id, widgetname: selectedTab },
                      });
                    }}
                    className="w-full h-[200px] bg-gray-100 -2 rounded flex items-center justify-center hover:shadow-lg "
                  >
                    <p className="m-0 !text-blue">{item?.module}</p>
                  </div>
                ))
            ) : (
              <p className="text-center text-gray-500">
                No templates available for this selection
              </p>
            )}
          </ul>
        </div>
      </div>

      {openConfigure && (
        <div className="fixed w-screen min-h-screen bg-black/50 top-0 left-0 flex items-center justify-center">
          <div className="flex flex-col justify-between items-center w-fit bg-white py-4 px-8 rounded-lg gap-4">
            <button
              type="button"
              onClick={() => setOpenConfigure(false)}
              className="self-end border !rounded-full hover:!bg-red-500 hover:text-white transition-all duration-500"
            >
              {renderIcons("IoIosClose", 20, "inherit")}
            </button>

            <div className="w-full">
              <FormInput
                inputType={"text"}
                name={"name"}
                label={"Name"}
                value={departmentName}
                placeholder={"Enter Design Name"}
                isMandatory={true}
                onChangeHandler={onChangeInputField}
                iconName={"MdPassword"}
              />
            </div>

            <div className="w-[280px] mx-1 border rounded">
              <ReactSelect
                options={getDropdownOptions("department")}
                value={selectedDepartments.department}
                onChange={(value) => updateDepartments(value)}
                placeholder="Select Department"
              />
            </div>

            <div className="w-[280px] mx-1 border rounded">
              <ReactSelect
                options={getDropdownOptions("category")}
                value={selectedDepartments.category}
                onChange={(value) => updateCategory(value)}
                placeholder="Select Category"
                isDisabled={!selectedDepartments.department}
              />
            </div>

            <div className="w-[280px] mx-1 border rounded">
              <ReactSelect
                options={getDropdownOptions("sub_category")}
                value={selectedDepartments.sub_category}
                onChange={(value) => updateSubcategory(value)}
                placeholder="Select Sub-Category"
                isDisabled={!selectedDepartments.category}
              />
            </div>

            <div className="w-[280px] mx-1 border rounded">
              <ReactSelect
                options={views.map((view) => ({ label: view, value: view }))}
                values={views
                  .filter((view) => selectedViews.includes(view))
                  .map((view) => ({ label: view, value: view }))}
                onChange={onClickView}
                multi
                placeholder="Select Views"
              />
            </div>

            <button
              type="submit"
              onClick={() =>
                Navigate("/form-designer", {
                  state: {
                    widgetname: selectedTab,
                    selectedDepartments,
                    selectedViews,
                    departmentName,
                    category,
                  },
                })
              }
              className="border w-full px-4 py-2 rounded !bg-[var(--primary-color)]/20 hover:!bg-[var(--primary-color)] hover:text-[var(--background-color)] transition-all duration-500 "
            >
              Start Design
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
