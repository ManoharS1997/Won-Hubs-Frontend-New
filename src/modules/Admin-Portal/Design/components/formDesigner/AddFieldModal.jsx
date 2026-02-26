import PropTypes from "prop-types";
import { useState, useEffect, useReducer } from "react";
import Select from 'react-select';
import { IoMdClose } from "react-icons/io";
import AddIconComponent from "../../../../../shared/CreationEditor/AddIcon";
const FIELD_TYPES = [
  { value: "text", label: "Text" },
  { value: "textarea", label: "Textarea" },
  { value: "email", label: "Email" },
  { value: "password", label: "Password" },
  { value: "number", label: "Number" },
  { value: "tel", label: "Phone" },
  { value: "url", label: "URL" },
  { value: "date", label: "Date" },
  { value: "time", label: "Time" },
  { value: "month", label: "Month" },
  { value: "week", label: "Week" },
  { value: "dropdown", label: "Dropdown (Select)" },
  { value: "radio", label: "Radio Buttons" },
  { value: "checkbox", label: "Checkbox" },
  { value: "switch", label: "Toggle Switch" },
  { value: "multi-select", label: "Multi-Select" },
  { value: "file", label: "File Upload" },
  { value: "signature", label: "Signature Pad" },
  { value: "color", label: "Color Picker" },
];

export default function AddFieldModal({ open, onClose, onSubmit, fieldToEdit }) {
  const [label, setLabel] = useState("");
  const [type, setType] = useState("text");
  const [options, setOptions] = useState([""]);
  const [maxRating, setMaxRating] = useState(5);
  const [required, setRequired] = useState(false);
  const [draggedOptionIndex, setDraggedOptionIndex] = useState(null);
  const [description, setDescription] = useState("");
  // Detect whether modal is opened for a button
  const isButtonItem = fieldToEdit?.isButton === true;
  const initialFieldState = {
    id: null,
    tableName: "",
    label: "",
    key: "",
    type: "text",
    placeholder: "",
    description: "",
    required: false,
    minLength: null,
    labelVisibility: "show",
    options: [""],
    maxRating: 5,
    isCustom: true,
    icon: ""
  };

  function fieldReducer(state, action) {
    switch (action.type) {
      case "SET_FIELD":
        console.log(action, "action Here")
        return {
          ...state,
          [action.name]: action.value,
        };

      case "SET_MULTIPLE_FIELDS":
        return {
          ...state,
          ...action.payload,
        };

      case "RESET":
        return initialFieldState;

      default:
        return state;
    }

  }

  const [fieldState, dispatch] = useReducer(fieldReducer, initialFieldState)
  // PREFILL WHEN EDITING
  useEffect(() => {
    if (fieldToEdit) {
      setLabel(fieldToEdit.label || "");

      if (!isButtonItem) {
        // Field edit mode
        setType(fieldToEdit.type || "text");
        setOptions(fieldToEdit.options || [""]);
        setRequired(!!fieldToEdit.required);
      } else {
        // Button view-only mode
        setType("button");
        setOptions([]);
        setRequired(false);
      }
    } else {
      // Reset modal when adding new field
      setLabel("");
      setType("text");
      setOptions([""]);
      setRequired(false);
    }
  }, [fieldToEdit]);

  const handleSubmit = () => {
    // If a button is clicked, we DO NOT allow saving / editing
    if (isButtonItem) {
      onClose();
      return;
    }

    let fieldData = {
      label,
      type,
      required,
    };

    if (["dropdown", "radio", "multi-select", "switch", "checkbox"].includes(type)) {
      fieldData.options = options.filter((opt) => opt.trim() !== "");
    }

    if (type === "rating") {
      fieldData.maxRating = maxRating;
    }

    if (fieldToEdit) {
      fieldData.isEdit = true;
      fieldData.originalLabel = fieldToEdit.label;
    }

    onSubmit(fieldData);
    onClose();
  };

  if (!open) return null;

  // return (
  //   <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
  //     <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px]">
  //       <button
  //         onClick={onClose}
  //         className="rounded !text-red-500  top-2 right-2 w-8 h-8 flex items-center self-end"
  //       >
  //         X
  //       </button>

  //       <h2 className="text-lg font-semibold text-indigo-600 mb-4 p-0">
  //         {isButtonItem
  //           ? "Button Details"
  //           : fieldToEdit
  //             ? "Edit Field"
  //             : "➕ Add Custom Field"}
  //       </h2>

  //       {/* Label */}
  //       <div className="flex gap-2">
  //         <label className="text-sm font-medium text-gray-700 mb-1 block">Label</label>
  //         <input
  //           type="text"
  //           value={label}
  //           onChange={(e) => !isButtonItem && setLabel(e.target.value)}
  //           disabled={isButtonItem}
  //           className={`w-[60%] border border-gray-300 rounded-lg p-2 mb-4 ${isButtonItem ? "bg-gray-100" : ""
  //             }`}
  //         />
  //       </div>

  //       {/* Field Type */}
  //       {!isButtonItem && (
  //         <div className="flex">
  //           <label className="text-sm font-medium text-gray-700 mb-1 block">
  //             Type
  //           </label>
  //           <select
  //             value={type}
  //             onChange={(e) => setType(e.target.value)}
  //             className="w-[50%] border border-gray-300 rounded-lg px-2 mb-4"
  //           >
  //             {FIELD_TYPES.map((f) => (
  //               <option key={f.value} value={f.value}>
  //                 {f.label}
  //               </option>
  //             ))}
  //           </select>
  //         </div>
  //       )}

  //       {/* Options (only for fields, not buttons) */}
  //       {!isButtonItem &&
  //         ["dropdown", "radio", "multi-select", "switch", "checkbox"].includes(type) && (
  //           <div className="mb-4">
  //             <label className="text-sm font-medium text-gray-700 block mb-2">
  //               Options
  //             </label>

  //             {options.map((opt, index) => (
  //               <div key={index} className="flex items-center gap-2 mb-1">
  //                 <input
  //                   type="text"
  //                   value={opt}
  //                   onChange={(e) => {
  //                     const arr = [...options];
  //                     arr[index] = e.target.value;
  //                     setOptions(arr);
  //                   }}
  //                   className="flex-1 border border-gray-300 rounded-lg p-2"
  //                 />
  //                 {options.length > 1 && (
  //                   <button
  //                     onClick={() =>
  //                       setOptions(options.filter((_, i) => i !== index))
  //                     }
  //                     className="text-red-500 font-bold"
  //                   >
  //                     ×
  //                   </button>
  //                 )}
  //               </div>
  //             ))}

  //             <button
  //               onClick={() => setOptions([...options, ""])}
  //               className="text-indigo-600 text-sm mt-2"
  //             >
  //               + Add Option
  //             </button>
  //           </div>
  //         )}

  //       {/* Required Toggle (fields only) */}
  //       {!isButtonItem && (
  //         <div className="flex items-center gap-2 mb-4">
  //           <input
  //             type="checkbox"
  //             checked={required}
  //             onChange={(e) => setRequired(e.target.checked)}
  //             className="w-4 h-4"
  //           />
  //           <label className="text-sm font-medium text-gray-700">
  //             Mark as required
  //           </label>
  //         </div>
  //       )}

  //       {/* Buttons */}
  //       <div className="flex justify-end gap-3">
  //         <button
  //           onClick={onClose}
  //           className="px-4 py-2 rounded !bg-red-500  text-white "
  //         >
  //           Close
  //         </button>

  //         {!isButtonItem && (
  //           <button
  //             onClick={handleSubmit}
  //             disabled={!label.trim()}
  //             className="px-4 py-2 rounded !bg-indigo-600 text-white disabled:opacity-50"
  //           >
  //             {fieldToEdit ? "Save" : "Add"}
  //           </button>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );




  // second return statement by me
  // return (
  //   <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
  //     <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px]">

  //       {/* Header */}
  //       <div className="flex items-center justify-between mb-4">
  //         <h2 className="text-lg font-semibold text-indigo-600 p-0">
  //           {isButtonItem
  //             ? "Button Details"
  //             : fieldToEdit
  //               ? "Edit Field"
  //               : "➕ Add Custom Field"}
  //         </h2>

  //         {/* Cancel (Top-Right) */}
  //         <button
  //           onClick={onClose}
  //           className="text-sm text-gray-500 hover:!text-red-500 transition"
  //         >
  //           X
  //         </button>
  //       </div>

  //       {/* Meta Tag */}
  //       <div className="grid grid-cols-[90px_1fr] items-center gap-4 mb-4">
  //         <label className="text-sm font-medium text-gray-700">
  //           Meta Tag
  //         </label>

  //         <input
  //           type="text"
  //           value={label}
  //           onChange={(e) => !isButtonItem && setLabel(e.target.value)}
  //           disabled={isButtonItem}
  //           className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${isButtonItem ? "bg-gray-100" : ""
  //             }`}
  //         />
  //       </div>
  //       {/* Label */}
  //       <div className="grid grid-cols-[90px_1fr] items-center gap-4 mb-4">
  //         <label className="text-sm font-medium text-gray-700">
  //           Label
  //         </label>

  //         <input
  //           type="text"
  //           value={label}
  //           onChange={(e) => !isButtonItem && setLabel(e.target.value)}
  //           disabled={isButtonItem}
  //           className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${isButtonItem ? "bg-gray-100" : ""
  //             }`}
  //         />
  //       </div>

  //       {/* placeHolder */}
  //       <div className="grid grid-cols-[90px_1fr] items-center gap-4 mb-4">
  //         <label className="text-sm font-medium text-gray-700">
  //           PlaceHolder
  //         </label>

  //         <input
  //           type="text"
  //           value={label}
  //           onChange={(e) => !isButtonItem && setLabel(e.target.value)}
  //           disabled={isButtonItem}
  //           className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${isButtonItem ? "bg-gray-100" : ""
  //             }`}
  //         />
  //       </div>

  //       {/* Field Type */}
  //       {!isButtonItem && (
  //         <div className="grid grid-cols-[90px_1fr] items-center gap-4 mb-4">
  //           <label className="text-sm font-medium text-gray-700">
  //             Type
  //           </label>

  //           <select
  //             value={type}
  //             onChange={(e) => setType(e.target.value)}
  //             className="w-full border border-gray-300 rounded-lg px-3"
  //           >
  //             {FIELD_TYPES.map((f) => (
  //               <option key={f.value} value={f.value}>
  //                 {f.label}
  //               </option>
  //             ))}
  //           </select>
  //         </div>
  //       )}
  //       {/* Options */}
  //       {!isButtonItem &&
  //         ["dropdown", "radio", "multi-select", "switch", "checkbox"].includes(type) && (
  //           <div className="mb-6">
  //             <label className="text-sm font-medium text-gray-700 block mb-3">
  //               Options
  //             </label>

  //             <div className="grid grid-cols-2 gap-3">
  //               {options.map((opt, index) => (
  //                 <div
  //                   key={index}
  //                   draggable
  //                   onDragStart={() => setDraggedOptionIndex(index)}
  //                   onDragOver={(e) => e.preventDefault()}
  //                   onDrop={() => {
  //                     if (
  //                       draggedOptionIndex === null ||
  //                       draggedOptionIndex === index
  //                     )
  //                       return;

  //                     const updated = [...options];
  //                     const [moved] = updated.splice(draggedOptionIndex, 1);
  //                     updated.splice(index, 0, moved);

  //                     setOptions(updated);
  //                     setDraggedOptionIndex(null);
  //                   }}
  //                   className="relative flex items-center border border-gray-300 rounded-lg
  //                      px-2 py-1.5 bg-white hover:shadow-sm cursor-move"
  //                 >
  //                   {/* Drag handle */}
  //                   <span className="text-gray-400 mr-2 select-none">☰</span>

  //                   {/* Input */}
  //                   <input
  //                     type="text"
  //                     value={opt}
  //                     onChange={(e) => {
  //                       const arr = [...options];
  //                       arr[index] = e.target.value;
  //                       setOptions(arr);
  //                     }}
  //                     className="flex-1 min-w-0 outline-none text-sm pr-6"
  //                   />

  //                   {/* Cancel (fixed position) */}
  //                   {options.length > 1 && (
  //                     <button
  //                       onClick={() =>
  //                         setOptions(options.filter((_, i) => i !== index))
  //                       }
  //                       className="absolute right-2 text-red-500 font-bold text-sm"
  //                     >
  //                       ×
  //                     </button>
  //                   )}
  //                 </div>
  //               ))}
  //             </div>

  //             <button
  //               onClick={() => setOptions([...options, ""])}
  //               className="text-indigo-600 text-sm mt-3"
  //             >
  //               + Add Option
  //             </button>
  //           </div>
  //         )}

  //       {/* Description */}
  //       {/* Description */}
  //       <div className="grid grid-cols-[90px_1fr] items-start gap-4 mb-4">
  //         <label className="text-sm font-medium text-gray-700">
  //           Description
  //         </label>

  //         <textarea
  //           value={description}
  //           onChange={(e) => !isButtonItem && setDescription(e.target.value)}
  //           disabled={isButtonItem}
  //           rows={3}
  //           className={`w-full border border-gray-300 rounded-lg px-3 py-2 resize-none ${isButtonItem ? "bg-gray-100" : ""
  //             }`}
  //         />
  //       </div>



  //       {/* Required Toggle */}
  //       {!isButtonItem && (
  //         <div className="flex  gap-10">
  //           <div className="flex items-center gap-2">
  //             <input
  //               type="checkbox"
  //               checked={required}
  //               onChange={(e) => setRequired(e.target.checked)}
  //               className="w-4 h-4"
  //             />
  //             <label className="text-sm font-medium text-gray-700">
  //               Required
  //             </label>
  //           </div>

  //           {/* // her we have to render select el to select length of the field that should be 50,100,150,200 or can we mention like <50 characters likr that */}
  //           <Select
  //             options={[
  //               { value: '50', label: 'Max 50 characters' },
  //               { value: '100', label: 'Max 100 characters' },
  //               { value: '150', label: 'Max 150 characters' },
  //               { value: '200', label: 'Max 200 characters' },
  //             ]}
  //             placeholder="Max Length"
  //             className="w-40"
  //           />

  //         </div>
  //       )}

  //       {/* Footer */}
  //       {!isButtonItem && (
  //         <div className="flex justify-end">
  //           <button
  //             onClick={handleSubmit}
  //             disabled={!label.trim()}
  //             className="px-4 py-2 rounded !bg-indigo-600 text-white disabled:opacity-50"
  //           >
  //             {fieldToEdit ? "Save" : "Add"}
  //           </button>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );


  console.log(fieldState, "fieldStateee...")

  const onSaveIcon = (val) => {
    dispatch({
      type: "SET_FIELD",
      name: "icon",
      value: val
    }
    )
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="
    bg-white
    p-6
    rounded-2xl
    shadow-[0_20px_60px_rgba(0,0,0,0.15)]
    border border-gray-200
    w-[90vw] max-w-3xl
    animate-scaleIn"
      >

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-indigo-600 m-0 p-0">
            {isButtonItem
              ? "Button Details"
              : fieldToEdit
                ? "Edit Field"
                : "➕ Add Custom Field"}
          </h2>

          <button onClick={onClose}>
            <IoMdClose color="red" size={20} />
          </button>
        </div>

        {/* FORM BODY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">

          {/* Table Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Table Name</label>
            <input
              type="text"
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Enter table name"
            />
          </div>

          {/* Label */}
          <div>
            <label className="text-sm font-medium text-gray-700">Label</label>
            <input
              type="text"
              value={label}
              onChange={(e) =>
                !isButtonItem &&
                dispatch({
                  type: "SET_FIELD",
                  name: "label",
                  value: e.target.value,
                })
              }
              disabled={isButtonItem}
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Type */}
          {!isButtonItem && (
            <div>
              <label className="text-sm font-medium text-gray-700">Type</label>
              <Select
                options={FIELD_TYPES.map((f) => ({
                  value: f.value,
                  label: f.label,
                }))}
                value={FIELD_TYPES
                  .map((f) => ({ value: f.value, label: f.label }))
                  .find((opt) => opt.value === fieldState.value)}
                onChange={(selected) =>
                  dispatch({
                    type: "SET_FIELD",
                    name: "type",
                    value: selected.value,
                  })
                }
                className="mt-1"
              />
            </div>
          )}

          {/* Min Length */}
          {!isButtonItem && (
            <div>
              <label className="text-sm font-medium text-gray-700">
                Minimum Length
              </label>
              <Select
                options={[
                  { value: "5", label: "Min 5" },
                  { value: "10", label: "Min 10" },
                  { value: "20", label: "Min 20" },
                ]}
                placeholder="Select Min Length"
                className="mt-1"
                onChange={(selected) =>
                  dispatch({
                    type: "SET_FIELD",
                    name: "minLength",
                    value: selected.value,
                  })
                }
              />
            </div>
          )}

          {/* Label Visibility */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Label Visibility
            </label>
            <Select
              options={[
                { value: "show", label: "Show" },
                { value: "hide", label: "Hide" },
              ]}
              placeholder="Select visibility"
              className="mt-1"
              onChange={(selected) =>
                dispatch({
                  type: "SET_FIELD",
                  name: "labelVisibility",
                  value: selected.value,
                })
              }
            />
          </div>

          {/* Placeholder */}
          <div>
            <label className="text-sm font-medium text-gray-700">Placeholder</label>
            <input
              type="text"
              value={fieldState.placeholder}
              disabled={isButtonItem}
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  name: "placeholder",
                  value: e.target.value,
                })
              }

            />
          </div>
          {/* Required (Checkbox Only, Last Row) */}
          {!isButtonItem && (
            <>
              <div>
                <AddIconComponent onSaveIcon={onSaveIcon} />
              </div>
              {/* Required */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Required
                </label>

                <div
                  className="
      mt-1
      flex items-center gap-3
      h-[40px]
      border border-gray-300
      rounded-lg
      px-3
      bg-white
    "
                >
                  <input
                    type="checkbox"
                    checked={fieldState.required}
                    // onChange={(e) => setRequired(e.target.checked)}
                    className="w-4 h-4 accent-indigo-600"
                    onChange={(e) =>
                      dispatch({
                        type: "SET_FIELD",
                        name: "required",
                        value: e.target.checked,
                      })
                    }

                  />

                  <span className="text-sm font-small text-gray-700">
                    Mark  This  Field As Required
                  </span>
                </div>
              </div>


            </>
          )}

          {/* Description (Full Width) */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={fieldState?.description}
              // onChange={(e) => !isButtonItem && setDescription(e.target.value)}
              disabled={isButtonItem}
              rows={3}
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 resize-none"
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  name: "description",
                  value: e.target.value,
                })}

            />
          </div>

        </div>

        {/* Footer */}
        {
          !isButtonItem && (
            <div className="flex justify-end mt-6">
              <button
                onClick={handleSubmit}
                disabled={!label.trim()}
                className="px-6 py-2 rounded !bg-indigo-600 text-white disabled:opacity-50"
              >
                {fieldToEdit ? "Save" : "Add"}
              </button>
            </div>
          )
        }

      </div >
    </div >
  );


}

AddFieldModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
