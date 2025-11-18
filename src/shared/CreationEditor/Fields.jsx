import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Loader2, Check, BarChart2, PieChart, Circle } from "lucide-react";
// import FormInput from "./FormInput";
// import FormTextarea from "./FormTextarea";
// import FormDropdown from "./FormDropdown";
import FormInput from '../../shared/UIElements/FormInput';
import FormDropdown from '../../shared/UIElements/FormDropdown';
import FormTextarea from "../UIElements/FormTextarea";
import SelectWithIcon from "../components/SelectWithIcon";

const templateFields = {
  name: { value: "", isMandatory: true, type: "text", label: "ReportName" },
  view: { value: "", isMandatory: true, type: "text", label: "View" },
  type: {
    value: "",
    isMandatory: true,
    type: "dropdown",
    label: "GraphType",
    options: [
      {
        label: "Bar-Stacked",
        value: "bar-stacked",
        icon: <BarChart2 size={16} className="text-blue-600" />,
      },
      {
        label: "Pie",
        value: "pie",
        icon: <PieChart size={16} className="text-rose-500" />,
      },
      {
        label: "Doughnut",
        value: "doughnut",
        icon: <Circle size={16} className="text-green-500" />,
      },
    ],
  },
  visibility: {
    value: "",
    isMandatory: true,
    type: "dropdown",
    label: "Visibility",
    options: [
      { label: "Public", value: "public" },
      { label: "Private", value: "private" },
    ],
  },
  description: { value: "", isMandatory: true, type: "textarea", label: "Description" },
};

const FormDesignerFields = {
  name: { value: "", isMandatory: true, type: "text", label: "DesignName" },
  department: {
    value: "",
    isMandatory: true,
    type: "dropdown",
    label: "Department",
    options: [
      { label: "Engineering", value: "engineering" },
      { label: "Design", value: "Design" },
      { label: "Marketing", value: "Marketing" },
    ],
  },
  category: {
    value: "",
    isMandatory: true,
    type: "dropdown",
    label: "Category",
    options: [
      { label: "Software", value: "software" },
      { label: "Hardware", value: "hardware" },
      { label: "UI/UX", value: "UI/Ux" },
      { label: "Graphic", value: "graphic" },
      { label: "Digital", value: "digital" },
      { label: "Offline", value: "offline" },
    ],
  },
  subCategory: {
    value: "",
    isMandatory: true,
    type: "dropdown",
    label: "SubCategory",
    options: [
      { label: "Software", value: "software" },
      { label: "Hardware", value: "hardware" },
      { label: "UI/UX", value: "UI/Ux" },
      { label: "Graphic", value: "graphic" },
      { label: "Digital", value: "digital" },
      { label: "Offline", value: "offline" },
    ],
  },
  views: {
    value: "",
    isMandatory: true,
    type: "dropdown",
    label: "Views",
    options: [
      { label: "Software", value: "software" },
      { label: "Hardware", value: "hardware" },
      { label: "UI/UX", value: "UI/Ux" },
      { label: "Graphic", value: "graphic" },
      { label: "Digital", value: "digital" },
      { label: "Offline", value: "offline" },
    ],
  },
};

const WorkFlowFields = {
  name: { value: "", isMandatory: true, type: "text", label: "Name" },

  department: {
    value: "",
    isMandatory: true,
    type: "dropdown",
    label: "Department",
    options: [
      { label: "Engineering", value: "engineering" },
      { label: "Design", value: "Design" },
      { label: "Marketing", value: "Marketing" },
    ],
  },
  category: {
    value: "",
    isMandatory: true,
    type: "dropdown",
    label: "Category",
    options: [
      { label: "Software", value: "software" },
      { label: "Hardware", value: "hardware" },
      { label: "UI/UX", value: "UI/Ux" },
      { label: "Graphic", value: "graphic" },
      { label: "Digital", value: "digital" },
      { label: "Offline", value: "offline" },
    ],
  },
  subCategory: {
    value: "",
    isMandatory: true,
    type: "dropdown",
    label: "SubCategory",
    options: [
      { label: "Software", value: "software" },
      { label: "Hardware", value: "hardware" },
      { label: "UI/UX", value: "UI/Ux" },
      { label: "Graphic", value: "graphic" },
      { label: "Digital", value: "digital" },
      { label: "Offline", value: "offline" },
    ],
  },
  description: { value: "", isMandatory: true, type: "text", label: "Description" },


}

export default function Fields({ title, data, path }) {
  // console.log(path,"Path Heree..,")
  const defaultFields = {
    name: { value: "", isMandatory: false, type: "text", label: "Name" },
    from: { value: "", isMandatory: true, type: "text", label: "From", iconName: "TfiEmail" },
    to: { value: "", isMandatory: true, type: "text", label: "To", iconName: "LuMailOpen" },
    cc: { value: "", isMandatory: true, type: "text", label: "CC", iconName: "MdOutgoingMail" },
    subject: { value: "", isMandatory: true, type: "text", label: "Subject" },
    description: { value: "", isMandatory: true, type: "textarea", label: "Description" },
  };
  const [FieldsState, setFieldsState] = useState(defaultFields);
  const [saveStatus, setSaveStatus] = useState("idle");
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Unified effect for path-based fields and saved data
  useEffect(() => {
    // 1️⃣ Choose base fields based on path
    let baseFields = defaultFields;
    if (path === "flowreport") baseFields = templateFields;
    else if (path === "formDesigner") baseFields = FormDesignerFields;
    else if (path === 'workFlow') baseFields = WorkFlowFields;

    // 2️⃣ Load from localStorage if present
    const saved = localStorage.getItem(`${path}Data`);
    if (saved) {
      setFieldsState(JSON.parse(saved));
    } else if (data && Object.keys(data).length > 0) {
      const merged = { ...baseFields };
      Object.keys(baseFields).forEach((key) => {
        if (data[key]) merged[key].value = data[key]?.value ?? "";
      });
      setFieldsState(merged);
    } else {
      setFieldsState(baseFields);
    }

    // 3️⃣ Finish loading
    setTimeout(() => setIsLoading(false), 200);
  }, [data, path]);
  // ✅ Auto-save to localStorage when data changes
  useEffect(() => {
    if (isLoading) return;
    setSaveStatus("saving");
    const timer = setTimeout(() => {
      localStorage.setItem(`${path}Data`, JSON.stringify(FieldsState));
      setTimeout(() => setSaveStatus("saved"), 400);
    }, 800);
    return () => clearTimeout(timer);
  }, [FieldsState, path, isLoading]);
  // ✅ Reset save status after a while
  useEffect(() => {
    if (saveStatus === "saved") {
      const timer = setTimeout(() => setSaveStatus("idle"), 2000);
      return () => clearTimeout(timer);
    }
  }, [saveStatus]);
  const onChangeInput = (e) => {
    const { id, value } = e.target;
    setFieldsState((prev) => ({
      ...prev,
      [id]: { ...prev[id], value },
    }));
  };
  const onChangeDropdown = (e, id) => {
    setFieldsState((prev) => ({
      ...prev,
      [id]: { ...prev[id], value: e.value },
    }));
  };
  const capitalize = (str = "") =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  const renderField = (key, field) => {
    const value = field?.value || "";

    if (field.type === "dropdown") {
      
      if (field.label === "GraphType") {
       return ( <SelectWithIcon />)

      }
      return (
        <FormDropdown
          key={key}
          label={capitalize(field.label || key)}
          name={key}
          options={field.options || []}
          isMandatory={field.isMandatory}
          value={value}
          onChangeHandler={(e) => onChangeDropdown(e, key)}
          iconName={field.iconName}
        />
      );
    }

    if (field.type === "textarea") {
      return (
        <FormTextarea
          key={key}
          label={capitalize(field.label || key)}
          name={key}
          isMandatory={field.isMandatory}
          value={value}
          placeholder={`Enter ${capitalize(field.label || key)}`}
          onChangeHandler={onChangeInput}
        />
      );
    }

    return (
      <FormInput
        key={key}
        inputType={field.type || "text"}
        name={key}
        label={capitalize(field.label || key)}
        value={value}
        isMandatory={field.isMandatory}
        placeholder={`Enter ${capitalize(field.label || key)}`}
        onChangeHandler={onChangeInput}
      />
    );
  };
  const entries = Object.entries(FieldsState);
  // console.log(FieldsState,path)

  return (
    <div className="w-full h-[80vh] flex justify-center items-start px-4 py-6">
      <div className="md:w-[100%] lg:w-[100%] bg-white rounded-xl shadow overflow-auto flex flex-col gap-2 pb-4 relative h-[100%] w-full p-4">
        {/* Header */}
        <div className="h-[10%] flex items-center justify-between px-6 py-3 border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
          <div className="flex items-center justify-end min-w-[150px]">
            {isLoading ? (
              <span className="text-gray-600 text-sm">Loading...</span>
            ) : saveStatus === "saving" ? (
              <span className="flex items-center gap-2 text-blue-600 text-sm font-medium">
                <Loader2 className="animate-spin w-4 h-4" />
                Auto-saving
              </span>
            ) : saveStatus === "saved" ? (
              <span className="flex items-center gap-2 text-green-600 text-sm font-medium">
                <Check className="w-5 h-5 font-bold animate-pulse" />
              </span>
            ) : (
              <span className="inline-block w-[90px]">&nbsp;</span>
            )}
          </div>
        </div>

        {/* Fields */}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[50vh] text-gray-500 text-lg">
            <Loader2 className="animate-spin w-6 h-6 mr-2" /> Loading fields...
          </div>
        ) : entries.length > 0 ? (
          <div className="w-full flex flex-col gap-4 md:px-10 px-2 py-4">
            {entries
              .reduce((rows, [key, field], i) => {
                if (i % 2 === 0) {
                  const next = entries[i + 1];
                  rows.push([[key, field], next]);
                }
                return rows;
              }, [])
              .map((pair, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/2">
                    {renderField(pair[0][0], pair[0][1])}
                  </div>
                  {pair[1] && (
                    <div className="w-full md:w-1/2">
                      {renderField(pair[1][0], pair[1][1])}
                    </div>
                  )}
                </div>
              ))}
          </div>
        ) : (
          <div className="flex items-center justify-center text-2xl text-gray-400 min-h-[50vh]">
            No Default Fields
          </div>
        )}
      </div>
    </div>
  );
}
