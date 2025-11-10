import { useEffect, useState } from "react";
import { Loader2, Check } from "lucide-react";
import FormInput from "../UIElements/FormInput";
import FormTextarea from "../UIElements/FormTextarea";
import FormDropdown from "../UIElements/FormDropdown";
const templateFields = {
  name: { value: "", isMandatory: true, type: "text", label: "ReportName" },
  view: { value: "", isMandatory: true, type: "text", label: "View" },
  type: {
    value: "",
    isMandatory: true,
    type: "dropdown",
    label: "GraphType",
    options: [
      { label: "Bar-Stacked", value: "Bar-Stacked" },
      { label: "Pie", value: "Pie" },
      { label: "Doughnut", value: "Doughnut" },
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


export default function Fields({ title, data, path }) {
  // console.log()
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

  useEffect(() => {
    const saved = localStorage.getItem(`${path}Data`);
    if (saved) {
            setFieldsState(JSON.parse(saved));
    } else if (data && Object.keys(data).length > 0) {

      const merged = { ...defaultFields };
      console.log(merged, "Here")
      Object.keys(defaultFields).forEach((key) => {
        if (data[key]) {
          merged[key].value = data[key]?.value ?? "";
        }
      });
      setFieldsState(merged);
    }
    setTimeout(() => setIsLoading(false), 200);
  }, [data, path]);

 
  useEffect(() => {
    if (isLoading) return;
    setSaveStatus("saving");
    const timer = setTimeout(() => {
      localStorage.setItem(`${path}Data`, JSON.stringify(FieldsState));
      setTimeout(() => setSaveStatus("saved"), 400);
    }, 800);
    return () => clearTimeout(timer);
  }, [FieldsState, path, isLoading]);

  // ✅ Reset save indicator
  useEffect(() => {
    if (saveStatus === "saved") {
      const timer = setTimeout(() => setSaveStatus("idle"), 2000);
      return () => clearTimeout(timer);
    }
  }, [saveStatus]);

  useEffect(()=>{
    if(path==="flowreport"){
      setFieldsState(templateFields)
    }
  },[path])



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
      [id]: { ...prev[id], value: e.target.value },
    }));
  };

  const capitalize = (str = "") =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const renderField = (key, field) => {
    const value = field?.value || "";

    if (field.type === "dropdown") {
      console.log("Triggering in dropdown in render Field")
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
    } else if (field.type === "textarea") {
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
      // iconName={field.iconName}
      />
    );
  };

  const entries = Object.entries(FieldsState);

  return (
    <div className="w-full h-full flex justify-center items-start px-4 py-6">
      <div className="w-full md:w-[100%] lg:w-[90%] bg-white rounded-xl shadow overflow-auto flex flex-col gap-2 pb-4 relative">
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
            {entries.reduce((rows, [key, field], i) => {
              if (i % 2 === 0) {
                const next = entries[i + 1];
                rows.push([[key, field], next]);
              }
              return rows;
            }, []).map((pair, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">{renderField(pair[0][0], pair[0][1])}</div>
                {pair[1] && <div className="w-full md:w-1/2">{renderField(pair[1][0], pair[1][1])}</div>}
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
