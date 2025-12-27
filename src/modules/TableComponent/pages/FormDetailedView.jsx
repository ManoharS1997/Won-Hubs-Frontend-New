import { useEffect, useState } from "react";
import { GetDesignerFields, GetDynamicRecordData, GetTabValues, SaveTabRecord, UpdateTabRecord } from "../../../utils/CheckAndExecuteFlows/CRUDoperations";
import EditableTable from "../components/DynamicTable";
import TableCompnent2 from "../components/TabTable2";
import Designtabs from "../../Admin-Portal/Design/components/DesignTabs";

export default function FormUIDemo({ recordId, tableName }) {
    // console.log(tableName, "tableName");
    const [activeTab, setActiveTab] = useState("Details");
    const [design, setDesign] = useState(null);
    const [activeButtons, setActiveButtons] = useState([]);
    const [formValues, setFormValues] = useState({})
    const [isTableTab, setIsTableTab] = useState(false);
    const designName = tableName
    const [tableObj, setTableObj] = useState({
        fields: [],
        values: []
    })
    // FETCH DESIGN DETAILS
    const fetchDesignDetails = async () => {
        try {
            const data = await GetDesignerFields(designName);
            // console.log("Design Loaded:", data);
            setDesign(data);
            console.log(data, "Deisgn data...")
        } catch (err) {
            console.error("Error loading design:", err);
        }
    };
    const fetchFieldsAndTabFields = async () => {
        if (recordId) {
            try {
                const response = await GetDynamicRecordData(designName, recordId)
                console.log(response, "data Heree To arrange Fields");
                // log statement is provided for below 
                if (response.success) {
                    const { data } = response
                    console.log(data, "data hereee")
                    setFormValues(data);
                }
            } catch (e) {
                console.log("", e);
            }
        }
    }
    const handleButtonAction = async (button) => {
        // console.log(button)
        // console.log(activeTab)
        // console.log(formValues, "formVale")
        // we can send the data as json then only we can access it 
        if ((button.apiMethod === "POST")) {
            // console.log("Triggering to show api call")
            const response = await SaveTabRecord(designName, formValues, recordId, activeTab);
            console.log(response, "");
        }
        if ((activeTab !== "Details") && (button.label === "Update")) {
            // console.log("Triggering to Update api call")
            const response = await UpdateTabRecord(designName, formValues, recordId, activeTab);
            console.log(response, "");
        }
        if ((activeTab === "Details") && (button.label === "Update")) {
            console.log("Triggering to Update api call in Details")
            // const response = await addDynamicaRecord(designName, formValues, recordId);
            // console.log(response, "");
        }
    }
    // to load data first tiem in the details view
    useEffect(() => {
        if (recordId) {
            fetchDesignDetails();
            fetchFieldsAndTabFields();
        }
    }, []);
    // onContinues switching from the tabs
    useEffect(() => {
        if (!design || !recordId) return;

        const loadTabValues = async () => {
            if (activeTab === "Details") {
                const response = await GetDynamicRecordData(designName, recordId);
                if (response.success) setFormValues(response.data || {});
                return;
            }
            console.log(activeTab, "active Tab here")
            const check_Is_Table = design.tabs.filter(tab => tab.name == activeTab)[0].type
            check_Is_Table === 'table' ? "" : setIsTableTab(false);

            const tabResponse = await GetTabValues(designName, activeTab, recordId);

            if (tabResponse.success && tabResponse.data) {
                setFormValues(tabResponse.data);
            } else {
                setFormValues({});
            }
        };

        loadTabValues();

    }, [activeTab, design, recordId]);


    // Set active buttons when tab/design changes
    useEffect(() => {
        if (!design) return;

        if (activeTab === "Details") {
            setActiveButtons(design.formButtons || []);
        } else {
            const tabObj = design.tabs.find((t) => t.name === activeTab);
            setActiveButtons(tabObj?.buttons || []);
            console.log(tabObj, "tab Object hereee");
            if (tabObj.type == "table") {
                setIsTableTab(true)
                setTableObj(prev => ({
                    ...prev,
                    fields: tabObj.tableCols
                }))
            }
        }
    }, [activeTab, design]);

    // LOADING STATE
    if (!design) {
        return (
            <div className="w-full h-screen flex justify-center items-center text-xl font-semibold">
                Loading Design...
            </div>
        );
    }
    //---------------------------
    // TABS
    //---------------------------
    const tabs = ["Details", ...design.tabs.map((t) => t.name)];
    //---------------------------
    // SELECT FIELDS BASED ON TAB
    //---------------------------
    let activeFields = [];
    if (activeTab === "Details") {
        activeFields = design.fields || [];
        // console.log(activeFields, "active Fields")
    } else {
        const tabObj = design.tabs.find((t) => t.name === activeTab);
        // console.log(tabObj, "TabObject")
        activeFields = tabObj?.fields || [];
        if (tabObj.type == "table") {
            activeFields = tabObj?.fields || [];
            console.log(activeFields, "Active heree")
        }
    }
    //---------------------------
    // FIELD RENDERER
    //---------------------------
    const normalizeKey = (str = "") =>
        str
            .replace(/([a-z0-9])([A-Z])/g, "$1_$2") // ParentGroup → Parent_Group
            .replace(/\s+/g, "_")                   // First Name → First_Name
            .toLowerCase();
    // → parent_group

    const assumedKeyStructure = (str = "") =>
        str
            .replace(/\s+/g, "_")                   // First Name → First_Name

    const renderField = (field) => {
        // console.log(formValues, field, "Form Values Here")
        // console.log(field.name.replace(/\s+/g, "_").toLowerCase())
        // console.log(field.name, "field.name ")
        // console.log(normalizeKey("A","here"))
        const key = tableName === "Companies" ? assumedKeyStructure(field.label) : normalizeKey(field.name);
        // console.log(key, "Key Hereee");
        const value = formValues?.[key] ?? "";

        const handleChange = (e) => {
            // console.log(formValues,"FormValues Hereee")
            setFormValues(prev => ({
                ...prev,
                // [field.name.replace(/\s+/g, "_").toLowerCase()]: e.target.value
                [key]: e.target.value,
            }));
        };
        const requiredStar = field.isMandatory ? <span className="text-red-500">*</span> : null;

        switch (field.type) {
            case "text":
            case "email":
            case "password":
            case "number":
            case "url":
                return (
                    <div>
                        <label className="block mb-1 font-medium">
                            {field.label} {requiredStar}
                        </label>
                        <input
                            type={field.type}
                            value={value}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                );

            case "phone":
                return (
                    <div>
                        <label className="block mb-1 font-medium">
                            {field.label} {requiredStar}
                        </label>
                        <div className="flex border rounded-lg px-3 py-2 items-center gap-2">
                            <span>🇮🇳 +91</span>
                            <input
                                value={value}
                                onChange={handleChange}
                                className="flex-1 outline-none"
                            />
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };
    const returnFilters = () => {
        const tabObj = design?.tabs.find((t) => t.name === activeTab);
        return tabObj?.filters || [];
    }

    // console.log(recordId, "recordId")
    // console.log(formValues, "formvalues @parent");
    // console.log(activeFields, "Active Fields @parent");
    return (
        <div className="w-full min-h-[90%] bg-white font-sans max-h-[90%] overflow-hidden p-0">
            {/* TABS */}
            <div className="flex !bg-[#01245c] text-white rounded-xl overflow-hidden mb-2 p-1 max-h-13">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 text-lg font-medium border-r border-[#03316c] last:border-none transition-all duration-30 ${activeTab === tab
                            ? "!bg-white text-[#01245c] !rounded-2xl"
                            : "!bg-[#01245c] hover:!bg-[#1245c] text-white border-none"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            {/* FORM CONTENT */}
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-h-[100%] overflow-auto" >
                {
                    !isTableTab &&
                    <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                        {activeFields.map((field, index) => (
                            <div key={index}>{renderField(field)}</div>
                        ))}
                    </div>
                }
                {
                    // isTableTab && <EditableTable tableObj={tableObj} recordId={recordId} activeTab={activeTab} designName={designName} formValues={formValues} />1
                    isTableTab && <TableCompnent2 tableObj={tableObj} recordId={recordId} activeTab={activeTab} designName={designName} formValues={formValues} allowedFilters={returnFilters()} />
                }
                {/* BUTTONS */}
                <div className="flex gap-4 mt-6 items-end justify-end">
                    {activeButtons.map((btn, i) => (
                        <button
                            key={i}
                            type="button"
                            className="!bg-[#01245c] text-white px-6 py-2 hover:!bg-[#023b8a] rounded"
                            onClick={() => handleButtonAction(btn)}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
