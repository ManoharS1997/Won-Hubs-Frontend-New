import React, { useState } from "react";
import renderIcons from "../functions/renderIcons";

const MultiOptionInput = ({ onChange, name, label, placeholder = "Enter value", isMandatory }) => {
    const [options, setOptions] = useState([""]);

    const handleChange = (index, value) => {
        const updated = [...options];
        updated[index] = value;
        setOptions(updated);
        onChange?.(updated);
    };

    const handleAdd = () => {
        setOptions([...options, ""]);
    };

    const handleRemove = (index) => {
        const updated = options.filter((_, i) => i !== index);
        setOptions(updated.length ? updated : [""]);
        onChange?.(updated);
    };

    const lastOption = options[options.length - 1];
    const canAdd = lastOption.trim() !== "";

    return (
        <div className="w-full flex gap-4">
            <label className="w-[30%] text-right !flex justify-end gap-2">
                {isMandatory && renderIcons("FaStarOfLife", 10, "#ff0000")}
                {label || "label"}
            </label>
            <div className="w-[70%] flex flex-col gap-2 border p-2 hover:shadow-[0_0_0.5rem_0.1rem_var(--primary-color)]">
                {options.map((option, index) => (
                    <div
                        key={index}
                        style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                    >
                        <input
                            type="text"
                            placeholder={placeholder}
                            value={option}
                            onChange={(e) => handleChange(index, e.target.value)}
                            style={{
                                flex: 1,
                                padding: "0.5rem",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="hover:!bg-red-500 text-red-500 hover:!text-white hover:cursor-pointer h-fit !rounded-full p-2"
                        >
                            {renderIcons("FaMinus", 10, "inherit")}
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAdd}
                    disabled={!canAdd}
                    style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: canAdd ? "#f0f0f0" : "#e0e0e0",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        cursor: canAdd ? "pointer" : "not-allowed",
                        opacity: canAdd ? 1 : 0.6,
                    }}
                >
                    + Add Option
                </button>
            </div>
        </div>
    );
};

export default MultiOptionInput;
