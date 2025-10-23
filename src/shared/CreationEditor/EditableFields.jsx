import { useState,useEffect } from "react";
import { FaPen, FaSave, FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function EditableFields({ data, path, onUpdate }) {
  const [detailsObject, setDetailsObject] = useState(data);
  const [editable, setEditable] = useState(false);
  const [open, setOpen] = useState(true);

  // 🔹 When parent `data` changes (like after API fetch)
  useEffect(() => {
    setDetailsObject(data);
  }, [data]);

  const handleChange = (key, value) => {
    setDetailsObject(prev => {
      const updated = { ...prev, [key]: { ...prev[key], value } };
      // 🔹 Send updates up to parent in real time
      if (onUpdate) onUpdate(updated);
      return updated;
    });
  };

  const handleSave = () => {
    localStorage.setItem(`${path}Data`, JSON.stringify(detailsObject));
    setEditable(false);
    if (onUpdate) onUpdate(detailsObject); // 🔹 ensure parent has latest
  };
  
console.log(detailsObject,"detailsObject in editable fields")
  return (
    <div className="w-[95%] min-h-[8vh] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-3">
        <h3 className="text-md font-bold m-0">Fields</h3>
        <div className="flex gap-3">
          <button onClick={() => setOpen(prev => !prev)}>
            {open ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          <button onClick={() => setEditable(prev => !prev)}>
            <FaPen />
          </button>
          {editable && (
            <button onClick={handleSave}>
              <FaSave />
            </button>
          )}
        </div>
      </div>

     {open && (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
    {[
      "Name",
      "From",
      "To",
      "Cc",
      "Type",
      "Subject",
      "Description"
    ].map((fieldKey) => {
      const key = Object.keys(detailsObject).find(
        k => k.toLowerCase() === fieldKey.toLowerCase()
      );
      if (!key) return null; // skip if not found in data
      const value = detailsObject[key];

      return (
        <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-1 m-0 p-0">
          <div className="flex items-center sm:min-w-[130px] justify-start sm:justify-end">
            <span className="text-gray-700 text-sm font-medium">
              {fieldKey}
            </span>
            <span className="ml-1">:</span>
          </div>

          <input
            className="flex-1 border-b border-gray-400 focus:border-blue-500 focus:outline-none p-1 text-sm w-full"
            value={value?.value || ""}
            disabled={!editable}
            onChange={(e) => handleChange(key, e.target.value)}
          />
        </div>
      );
    })}
  </div>
)}

    </div>
  );
}
