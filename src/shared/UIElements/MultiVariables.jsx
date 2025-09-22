import React, { useState } from "react";
import renderIcons from "../functions/renderIcons";

const KeyValueInput = ({ onChange, type, name, label, placeholder, customStyles, isMandatory }) => {
  const [pairs, setPairs] = useState([{ key: "", value: "" }]);

  const handleChange = (index, field, value) => {
    const updated = [...pairs];
    updated[index][field] = value;
    setPairs(updated);
    onChange?.(updated);
  };

  const handleAdd = () => {
    setPairs([...pairs, { key: "", value: "" }]);
  };

  const handleRemove = (index) => {
    const updated = pairs.filter((_, i) => i !== index);
    setPairs(updated.length ? updated : [{ key: "", value: "" }]);
    onChange?.(updated);
  };

  const lastPair = pairs[pairs.length - 1];
  const canAdd = lastPair.key.trim() !== "" && lastPair.value.trim() !== "";

  return (
    <div className={`w-full flex gap-4 ${customStyles?.container}`}>
      <label
        className={`w-[30%] text-right !flex justify-end gap-2 ${customStyles?.label}`}
      >
        {isMandatory === true && renderIcons("FaStarOfLife", 10, "#ff0000")}
        {label || "label"}
      </label>
      <div
        className={`w-[70%] flex flex-col gap-2 border p-2 hover:shadow-[0_0_0.5rem_0.1rem_var(--primary-color)] ${customStyles?.inputFields}`}
      >
        {pairs.map((pair, index) => (
          <div
            key={index}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <input
              type="text"
              placeholder="Key"
              value={pair.key}
              onChange={(e) => handleChange(index, "key", e.target.value)}
              className="w-1/2"
              style={{
                flex: 1,
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="text"
              placeholder="Value"
              value={pair.value}
              className="w-1/2"
              onChange={(e) => handleChange(index, "value", e.target.value)}
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
          + Add
        </button>
      </div>
    </div>
  );
};

export default KeyValueInput;
