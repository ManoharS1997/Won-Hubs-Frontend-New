import { useState } from "react";
import { FaPen, FaSave, FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function EditableFields() {
    const [detailsObject, setDetailsObject] = useState(
        JSON.parse(localStorage.getItem("notificationData")) || {}
    );

    const [editable, setEditable] = useState(false);
    const [open, setOpen] = useState(true);

    const handleChange = (key, value) => {
        setDetailsObject(prev => {
            const updated = { ...prev, [key]: { ...prev[key], value } };
            return updated;
        });
    };

    const handleSave = () => {
        localStorage.setItem("notificationData", JSON.stringify(detailsObject));
        setEditable(false);
    };

    return (
        <div className="w-[95%] min-h-[10vh] mx-auto">
            <div className="flex  items-center mb-2 gap-3">
                <h3 className="text-md font-bold m-0">Fields</h3>
                <div className="flex items-center gap-3">
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
                <div className="grid grid-cols-3 gap-x-8 gap-y-4 mt-4">
                    {Object.entries(detailsObject).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-1">
                            {/* Label and colon aligned */}
                            <div className="flex items-center min-w-[130px] justify-end pr-2">
                                <div className="min-w-20">
                                <span className="text-gray-700 text-sm font-medium">
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </span>
                                </div>
                                <span className="ml-1">:</span>
                            </div>

                            {/* Input field */}
                            <input
                                className="flex-1 min-w-[200px] border-b border-gray-400 focus:border-blue-500 focus:outline-none p-1 text-sm transition-all duration-150"
                                value={value?.value || ""}
                                disabled={!editable}
                                onChange={(e) => handleChange(key, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}
