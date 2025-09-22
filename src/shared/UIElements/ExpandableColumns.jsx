// import { useState } from "react";
import convertName from "../../utils/conevrtName";

const renderCollapsibleContent = (keyItem, value) => {
    const keyString = String(keyItem); // Ensure keyItem is always a string

    // console.log(keyItem, value);

    if (typeof value === 'object' && value !== null) {
        return (
            <div key={keyString} className="mb-2">
                <span
                    className={`bg-[var(--background-color)] px-1 text-[var(--text-color)] 
                        border rounded-[4px] !border-[var(--primary-color)] text-nowrap`}
                >{convertName(keyString)}</span>
                <div className="ml-4 border-l-2 border-gray-300 pl-2">
                    {Array.isArray(value) ? (
                        <ul>
                            {value.map((item, index) => (
                                <li key={index}>{renderCollapsibleContent(index, item)}</li>
                            ))}
                        </ul>
                    ) : (
                        Object.keys(value).map((subKey) => renderCollapsibleContent(subKey, value[subKey]))
                    )}
                </div>
            </div>
        );
    } else {
        return (
            <p key={keyString} className="flex items-center gap-2">
                <label className="bg-[#f3f1de] px-1 rounded text-[var(--primary-color)] text-nowrap">
                    {convertName(keyString)}:
                </label>
                <span>{value?.toString()}</span>
            </p>
        );
    }
};

export default function ExpandableContent(keyItem, value, expandedItems, toggleExpand) {
    const keyString = String(keyItem); // Ensure keyItem is always a string
    const isExpandable = typeof value === "object" && value !== null;
    const isExpanded = expandedItems.includes(keyString);

    return (
        <div key={keyString} className="mb-2">
            <div
                className={`cursor-pointer flex items-center justify-between bg-[var(--background-color)] px-1 text-[var(--text-color)]
                border rounded-[4px] !border-[var(--primary-color)] text-nowrap`}
                onClick={() => isExpandable && toggleExpand(keyString)}
            >
                <span>{convertName(keyString)}</span>
                {isExpandable && (
                    <span className="ml-2">{isExpanded ? "▲" : "▼"}</span> // Arrow indicator
                )}
            </div>

            {isExpanded && isExpandable && (
                <div className="ml-4 border-l-2 border-gray-300 pl-2">
                    {Array.isArray(value) ? (
                        <ul>
                            {value.map((item, index) => (
                                <li key={index}>
                                    {renderCollapsibleContent(index, item, expandedItems, toggleExpand)}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        Object.keys(value).map((subKey) =>
                            renderCollapsibleContent(subKey, value[subKey], expandedItems, toggleExpand)
                        )
                    )}
                </div>
            )}
        </div>
    );
}
