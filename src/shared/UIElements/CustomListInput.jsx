import { useState } from "react";
import { X } from "lucide-react";

export default function ChecklistInput({ label, checklistItems = [], onChange }) {
    const [items, setItems] = useState(checklistItems);
    const [inputValue, setInputValue] = useState("");

    // Handle adding a new item
    const handleAddItem = (e) => {
        if (e.key === "Enter" && inputValue.trim()) {
            const newItems = [...items, inputValue.trim()];
            setItems(newItems);
            onChange(newItems); // Pass updated list to parent
            setInputValue(""); // Clear input
        }
    };

    // Handle removing an item
    const handleRemoveItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
        onChange(newItems); // Pass updated list to parent
    };

    return (
        <div className="w-full flex flex-col gap-2">
            {label && <label className="text-sm font-medium">{label}</label>}

            <div className="flex flex-wrap gap-2 border p-2 rounded-md">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center bg-gray-200 text-black px-3 py-1 rounded-md">
                        <span className="mr-2">{item}</span>
                        <X
                            className="w-4 h-4 cursor-pointer text-gray-600 hover:text-red-500"
                            onClick={() => handleRemoveItem(index)}
                        />
                    </div>
                ))}

                <input
                    type="text"
                    placeholder="Add item & press Enter"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleAddItem}
                    className="outline-none flex-1 min-w-[120px] p-1"
                />
            </div>
        </div>
    );
}
