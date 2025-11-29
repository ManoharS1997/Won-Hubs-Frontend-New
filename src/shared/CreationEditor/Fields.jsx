// import React, { useState, useEffect } from "react";
// import Select from "react-select";
// import { Loader2, Check, BarChart2, PieChart, Circle } from "lucide-react";
// // import FormInput from "./FormInput";
// // import FormTextarea from "./FormTextarea";
// // import FormDropdown from "./FormDropdown";
// import FormInput from '../../shared/UIElements/FormInput';
// import FormDropdown from '../../shared/UIElements/FormDropdown';
// import FormTextarea from "../UIElements/FormTextarea";
// import SelectWithIcon from "../components/SelectWithIcon";

// const templateFields = {
//   name: { value: "", isMandatory: true, type: "text", label: "ReportName" },
//   view: { value: "", isMandatory: true, type: "text", label: "View" },
//   type: {
//     value: "",
//     isMandatory: true,
//     type: "dropdown",
//     label: "GraphType",
//     options: [
//       {
//         label: "Bar-Stacked",
//         value: "bar-stacked",
//         icon: <BarChart2 size={16} className="text-blue-600" />,
//       },
//       {
//         label: "Pie",
//         value: "pie",
//         icon: <PieChart size={16} className="text-rose-500" />,
//       },
//       {
//         label: "Doughnut",
//         value: "doughnut",
//         icon: <Circle size={16} className="text-green-500" />,
//       },
//     ],
//   },
//   visibility: {
//     value: "",
//     isMandatory: true,
//     type: "dropdown",
//     label: "Visibility",
//     options: [
//       { label: "Public", value: "public" },
//       { label: "Private", value: "private" },
//     ],
//   },
//   description: { value: "", isMandatory: true, type: "textarea", label: "Description" },
// };

// const FormDesignerFields = {
//   name: { value: "", isMandatory: true, type: "text", label: "DesignName" },
//   department: {
//     value: "",
//     isMandatory: true,
//     type: "dropdown",
//     label: "Department",
//     options: [
//       {label:'Research&Development',value:'Research&Development'},
//       {label:"Human Resources",value:"Human Resources"},
//       {label:"IT",value:"IT"},
//       {label:"Finance",value:"Finance"},
//       {label:"Operations",value:"Operations"},
//       {label:"Global",value:"Global"},
//     ],
//   },
//   category: {
//     value: "",
//     isMandatory: true,
//     type: "dropdown",
//     label: "Category",
//     options: [
//       { label: "Software", value: "software" },
//       { label: "Hardware", value: "hardware" },
//       { label: "UI/UX", value: "UI/Ux" },
//       { label: "Graphic", value: "graphic" },
//       { label: "Digital", value: "digital" },
//       { label: "Offline", value: "offline" },
//     ],
//   },
//   subCategory: {
//     value: "",
//     isMandatory: true,
//     type: "dropdown",
//     label: "SubCategory",
//     options: [
//       { label: "Software", value: "software" },
//       { label: "Hardware", value: "hardware" },
//       { label: "UI/UX", value: "UI/Ux" },
//       { label: "Graphic", value: "graphic" },
//       { label: "Digital", value: "digital" },
//       { label: "Offline", value: "offline" },
//     ],
//   },
//   views: {
//     value: "",
//     isMandatory: true,
//     type: "dropdown",
//     label: "Views",
//     options: [
//       { label: "Software", value: "software" },
//       { label: "Hardware", value: "hardware" },
//       { label: "UI/UX", value: "UI/Ux" },
//       { label: "Graphic", value: "graphic" },
//       { label: "Digital", value: "digital" },
//       { label: "Offline", value: "offline" },
//     ],
//   },
// };

// const WorkFlowFields = {
//   name: { value: "", isMandatory: true, type: "text", label: "Name" },

//   department: {
//     value: "",
//     isMandatory: true,
//     type: "dropdown",
//     label: "Department",
//     options: [
//       { label: "Engineering", value: "engineering" },
//       { label: "Design", value: "Design" },
//       { label: "Marketing", value: "Marketing" },
//     ],
//   },
//   category: {
//     value: "",
//     isMandatory: true,
//     type: "dropdown",
//     label: "Category",
//     options: [
//       { label: "Software", value: "software" },
//       { label: "Hardware", value: "hardware" },
//       { label: "UI/UX", value: "UI/Ux" },
//       { label: "Graphic", value: "graphic" },
//       { label: "Digital", value: "digital" },
//       { label: "Offline", value: "offline" },
//     ],
//   },
//   subCategory: {
//     value: "",
//     isMandatory: true,
//     type: "dropdown",
//     label: "SubCategory",
//     options: [
//       { label: "Software", value: "software" },
//       { label: "Hardware", value: "hardware" },
//       { label: "UI/UX", value: "UI/Ux" },
//       { label: "Graphic", value: "graphic" },
//       { label: "Digital", value: "digital" },
//       { label: "Offline", value: "offline" },
//     ],
//   },
//   description: { value: "", isMandatory: true, type: "text", label: "Description" },


// }

// export default function Fields({ title, data, path }) {
//   console.log(path,"Path Heree..,")
//   const defaultFields = {
//     name: { value: "", isMandatory: false, type: "text", label: "Name" },
//     from: { value: "", isMandatory: true, type: "text", label: "From", iconName: "TfiEmail" },
//     to: { value: "", isMandatory: true, type: "text", label: "To", iconName: "LuMailOpen" },
//     cc: { value: "", isMandatory: true, type: "text", label: "CC", iconName: "MdOutgoingMail" },
//     subject: { value: "", isMandatory: true, type: "text", label: "Subject" },
//     description: { value: "", isMandatory: true, type: "textarea", label: "Description" },
//   };
//   const [FieldsState, setFieldsState] = useState(defaultFields);
//   const [saveStatus, setSaveStatus] = useState("idle");
//   const [isLoading, setIsLoading] = useState(true);

//   // ✅ Unified effect for path-based fields and saved data
//   useEffect(() => {
//     // 1️⃣ Choose base fields based on path
//     let baseFields = defaultFields;
//     if (path === "flowreport") baseFields = templateFields;
//     else if (path === "formDesigner") baseFields = FormDesignerFields;
//     else if (path === 'workFlow') baseFields = WorkFlowFields;

//     // 2️⃣ Load from localStorage if present
//     const saved = localStorage.getItem(`${path}Data`);
//     if (saved) {
//       console.log("Triggering in saved data...");
//       console.log(saved,"Saved Data....")
//       setFieldsState(JSON.parse(saved));// iam getting the problem here ,on reloading every time it is taking the local storage data

//     } else if (data && Object.keys(data).length > 0) {
//       const merged = { ...baseFields };
//       Object.keys(baseFields).forEach((key) => {
//         if (data[key]) merged[key].value = data[key]?.value ?? "";
//       });
//       console.log(merged,"Merged Data....")
//       setFieldsState(merged);
//     } else {
//       setFieldsState(baseFields);
//     }

//     // 3️⃣ Finish loading
//     setTimeout(() => setIsLoading(false), 200);
//   }, [data, path]);
//   // ✅ Auto-save to localStorage when data changes
//   useEffect(() => {
//     if (isLoading) return;
//     setSaveStatus("saving");
//     const timer = setTimeout(() => {
//       localStorage.setItem(`${path}Data`, JSON.stringify(FieldsState));
//       setTimeout(() => setSaveStatus("saved"), 400);
//     }, 800);
//     return () => clearTimeout(timer);
//   }, [FieldsState, path, isLoading]);
//   // ✅ Reset save status after a while
//   useEffect(() => {
//     if (saveStatus === "saved") {
//       const timer = setTimeout(() => setSaveStatus("idle"), 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [saveStatus]);
//   const onChangeInput = (e) => {
//     const { id, value } = e.target;
//     setFieldsState((prev) => ({
//       ...prev,
//       [id]: { ...prev[id], value },
//     }));
//   };
//   const onChangeDropdown = (e, id) => {
//     setFieldsState((prev) => ({
//       ...prev,
//       [id]: { ...prev[id], value: e.value },
//     }));
//   };
//   const capitalize = (str = "") =>
//     str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
//   const renderField = (key, field) => {
//     const value = field?.value || "";

//     if (field.type === "dropdown") {

//       if (field.label === "GraphType") {
//        return ( <SelectWithIcon />)

//       }
//       return (
//         <FormDropdown
//           key={key}
//           label={capitalize(field.label || key)}
//           name={key}
//           options={field.options || []}
//           isMandatory={field.isMandatory}
//           value={value}
//           onChangeHandler={(e) => onChangeDropdown(e, key)}
//           iconName={field.iconName}
//         />
//       );
//     }

//     if (field.type === "textarea") {
//       return (
//         <FormTextarea
//           key={key}
//           label={capitalize(field.label || key)}
//           name={key}
//           isMandatory={field.isMandatory}
//           value={value}
//           placeholder={`Enter ${capitalize(field.label || key)}`}
//           onChangeHandler={onChangeInput}
//         />
//       );
//     }

//     return (
//       <FormInput
//         key={key}
//         inputType={field.type || "text"}
//         name={key}
//         label={capitalize(field.label || key)}
//         value={value}
//         isMandatory={field.isMandatory}
//         placeholder={`Enter ${capitalize(field.label || key)}`}
//         onChangeHandler={onChangeInput}
//       />
//     );
//   };
//   const entries = Object.entries(FieldsState);

//   // console.log(FieldsState,"FieldsState FieldsState")

//   return (
//     <div className="w-full h-[80vh] flex justify-center items-start px-4 py-6">
//       <div className="md:w-[100%] lg:w-[100%] bg-white rounded-xl shadow overflow-auto flex flex-col gap-2 pb-4 relative h-[100%] w-full p-4">
//         {/* Header */}
//         <div className="h-[10%] flex items-center justify-between px-6 py-3 border-gray-200">
//           <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
//           <div className="flex items-center justify-end min-w-[150px]">
//             {isLoading ? (
//               <span className="text-gray-600 text-sm">Loading...</span>
//             ) : saveStatus === "saving" ? (
//               <span className="flex items-center gap-2 text-blue-600 text-sm font-medium">
//                 <Loader2 className="animate-spin w-4 h-4" />
//                 Auto-saving
//               </span>
//             ) : saveStatus === "saved" ? (
//               <span className="flex items-center gap-2 text-green-600 text-sm font-medium">
//                 <Check className="w-5 h-5 font-bold animate-pulse" />
//               </span>
//             ) : (
//               <span className="inline-block w-[90px]">&nbsp;</span>
//             )}
//           </div>
//         </div>

//         {/* Fields */}
//         {isLoading ? (
//           <div className="flex justify-center items-center min-h-[50vh] text-gray-500 text-lg">
//             <Loader2 className="animate-spin w-6 h-6 mr-2" /> Loading fields...
//           </div>
//         ) : entries.length > 0 ? (
//           <div className="w-full flex flex-col gap-4 md:px-10 px-2 py-4">
//             {entries
//               .reduce((rows, [key, field], i) => {
//                 if (i % 2 === 0) {
//                   const next = entries[i + 1];
//                   rows.push([[key, field], next]);
//                 }
//                 return rows;
//               }, [])
//               .map((pair, index) => (
//                 <div key={index} className="flex flex-col md:flex-row gap-4">
//                   <div className="w-full md:w-1/2">
//                     {renderField(pair[0][0], pair[0][1])}
//                   </div>
//                   {pair[1] && (
//                     <div className="w-full md:w-1/2">
//                       {renderField(pair[1][0], pair[1][1])}
//                     </div>
//                   )}
//                 </div>
//               ))}
//           </div>
//         ) : (
//           <div className="flex items-center justify-center text-2xl text-gray-400 min-h-[50vh]">
//             No Default Fields
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";

import { Loader2, Check, BarChart2, PieChart, Circle } from "lucide-react";

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
      { label: "Research&Development", value: "Research&Development" },
      { label: "Human Resources", value: "Human Resources" },
      { label: "IT", value: "IT" },
      { label: "Finance", value: "Finance" },
      { label: "Operations", value: "Operations" },
      { label: "Global", value: "Global" },
      { label: 'Technical', value: 'Technical' }
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
      { label: "IT", value: "IT" },

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
      { label: "Offline", value: "offline" },
      { label: "Frontend", value: "Frontend" },

    ],
  },
  views: {
    value: "",
    isMandatory: true,
    type: "dropdown",
    label: "Views",
    options: [
      { label: "Admin", value: "admin" },
      { label: "Super Admin", value: "Super Admin" },
      { label: "User", value: "user" },
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
};

export default function Fields({ title, data, path }) {
  const defaultFields = {
    name: { value: "", isMandatory: false, type: "text", label: "Name" },
    from: { value: "", isMandatory: true, type: "text", label: "From", iconName: "TfiEmail" },
    to: { value: "", isMandatory: true, type: "text", label: "To", iconName: "LuMailOpen" },
    cc: { value: "", isMandatory: true, type: "text", label: "CC", iconName: "MdOutgoingMail" },
    subject: { value: "", isMandatory: true, type: "text", label: "Subject" },
    description: { value: "", isMandatory: true, type: "textarea", label: "Description" },
  };
  const [FieldsState, setFieldsState] = useState(defaultFields);
  const [isLoading, setIsLoading] = useState(true);
  // console.log(data, "Data Hereeee");

  useEffect(() => {
    let baseFields = defaultFields;
    if (path === "flowreport") baseFields = templateFields;
    else if (path === "formDesigner") baseFields = FormDesignerFields;
    else if (path === "workFlow") baseFields = WorkFlowFields;

    const saved = JSON.parse(localStorage.getItem(`${path}Data`));

    // CASE 1: If data is passed (EDIT mode)
    if (data) {
      const merged = {};

      Object.keys(baseFields).forEach((key) => {
        const incomingValue = data[key];

        const hasValue =
          incomingValue !== undefined &&
          incomingValue !== null &&
          incomingValue !== "";

        merged[key] = {
          ...baseFields[key],   // preserve label, type, options, isMandatory
          value: hasValue
            ? incomingValue     // override ONLY if value exists
            : baseFields[key].value, // otherwise keep default
        };
      });

      setFieldsState(merged);
      // console.log(data, "In use Effect");
      setIsLoading(false);
      return;
    }
    // CASE 2: If localStorage exists
    if (saved) {
      const merged = {};
      Object.keys(baseFields).forEach((key) => {
        merged[key] = {
          ...baseFields[key],
          value: saved[key]?.value ?? "",
        };
      });
      // console.log(FieldsState, "Fields Stateeee")
      setFieldsState(merged);
      setIsLoading(false);
      return;
    }

    // CASE 3: Default schema
    setFieldsState(baseFields);
    setIsLoading(false);
  }, [path, data]);

  const saveToLocalStorage = () => {
    localStorage.setItem(`${path}Data`, JSON.stringify(FieldsState));
  };
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
      // console.log(field.options,"Field Options Here....")
      // console.log(value,"value")  
      // console.log(field,"field Hereeee")
      const normalizedValue = Array.isArray(value)
        ? value[0]
        : Array.isArray(field.value)
          ? field.value[0]
          : value ?? field.value;


      if (field.label === "GraphType") {
        return <SelectWithIcon />;
      }
      // console.log(value,"value")
      return (
        <FormDropdown
          key={key}
          label={capitalize(field.label || key)}
          name={key}
          options={field.options}
          isMandatory={field.isMandatory}
          value={normalizedValue || field.value}
          // value={field.value}
          onChangeHandler={(e) => onChangeDropdown(e, key)}
          defaultValue={normalizedValue}// if the value is  a list pass the list [0] here
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
        inputType={field.type}
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

  // console.log(data, "Data Here")
  // console.log(FieldsState, "FieldsState Here....")
  // console.log(entries, "Entries Hereee")

  return (
    <div className="w-full h-[100vh] flex justify-center items-start px-4 py-6">
      <div className="w-full bg-white rounded-xl shadow overflow-auto flex flex-col p-4">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>

          <button
            onClick={saveToLocalStorage}
            className="px-4 py-2 !bg-blue-600 text-white !rounded-lg shadow hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>

        {/* Fields */}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[50vh] text-gray-500 text-lg">
            <Loader2 className="animate-spin w-6 h-6 mr-2" /> Loading fields...
          </div>
        ) : (
          <div className="w-full flex flex-col gap-4 md:px-10 px-2 py-4">
            {entries.reduce((rows, [key, field], i) => {
              if (i % 2 === 0) {
                const next = entries[i + 1];
                rows.push([[key, field], next]);
              }
              return rows;
            }, [])
              .map((pair, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/2">{renderField(pair[0][0], pair[0][1])}</div>

                  {pair[1] && (
                    <div className="w-full md:w-1/2">
                      {renderField(pair[1][0], pair[1][1])}
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

