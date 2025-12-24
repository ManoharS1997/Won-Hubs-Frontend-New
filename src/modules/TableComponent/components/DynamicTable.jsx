import { useState, useEffect } from "react";
import { SaveTabRecord } from "../../../utils/CheckAndExecuteFlows/CRUDoperations";

export default function EditableTable({ initialRows = [], tableObj, recordId, activeTab, designName, formValues }) {
    const [persistedRows, setPersistedRows] = useState([]); // READ-ONLY
    const [draftRows, setDraftRows] = useState([]);
    const [EditedRows, setEditedRows] = useState(persistedRows);   
          // EDITABLE

    function createEmptyRow(columns = []) {
        const row = {};
        columns.forEach(col => {
            row[col.key] = "";
        });
        return row;
    }
    // Sync rows when data arrives
    useEffect(() => {
        if (formValues) {
            setPersistedRows(formValues);
            setEditedRows(formValues);
        } else {
            setPersistedRows([]);
            setDraftRows([]);
        }
    }, [formValues]);

    useEffect(() => {
        if (draftRows.length === 0 && columns.length > 0) {
            setDraftRows([createEmptyRow(columns)]);
        }
    }, []);


    if (!tableObj || !Array.isArray(tableObj.fields)) {
        return <div>No table definition found</div>;
    }

    const columns = [...tableObj.fields].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0)
    );

    const addRow = () => {
        setDraftRows(prev => [...prev, createEmptyRow(columns)]);
    };

    const isNonEmptyRow = (row) =>
        Object.values(row).some(
            val => val !== null && val !== undefined && String(val).trim() !== ""
        );


    const saveRows = async () => {
        // if (draftRows.length === 0) return;
        const validDraftRows = draftRows.filter(isNonEmptyRow);

        // 2️⃣ Stop if nothing meaningful
        if (validDraftRows.length === 0) {
            console.log("No draft rows with data. Skipping save.");
            // return;
        }

        // 3️⃣ Merge persisted + new rows
        const allRows = [...EditedRows, ...validDraftRows];
        const response = await SaveTabRecord(
            designName,
            allRows,   // ✅ THIS IS THE SOURCE OF TRUTH
            recordId,
            activeTab,
            true
        );

        if (response?.success) {
            // reset editor

            setPersistedRows(prev => [
                ...prev,
                ...draftRows
            ]);

            // ✅ Clear editor (no empty row)
            setDraftRows([]);
            // setDraftRows([createEmptyRow(columns)]);
        }
    };

    // console.log(persistedRows, "persistedRows");
    // console.log(EditedRows, "EditedRows");
    // console.log(draftRows, "draftRows");
    return (
        <>
            <table className="w-full border border-gray-300">
                {/* ---------- HEADER ---------- */}
                <thead className=" bg-[#08107D] text-white font-bold">
                    <tr>
                        {columns.map(col => (
                            <th key={col.key} className="border px-3 py-2 text-left">
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* ---------- BODY ---------- */}
                <tbody>
                    {/* 🔒 PERSISTED ROWS (READ-ONLY) */}
                    {EditedRows.length > 0 && EditedRows?.map((row, rowIndex) => (
                        <tr key={`persisted-${row.sys_id || rowIndex}`} className="bg-gray-100">
                            {columns.map(col => (
                                <td
                                    key={col.key}
                                    className="border px-3 py-2 text-gray-600"

                                >
                                    {renderCell(
                                        col,
                                        row[col.key],
                                        value =>
                                            setEditedRows(prev =>
                                                prev.map((r, i) =>
                                                    i === rowIndex
                                                        ? { ...r, [col.key]: value }
                                                        : r
                                                )
                                            )
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}

                    {/* ✏️ DRAFT ROWS (EDITABLE) */}
                    {draftRows?.map((row, rowIndex) => (
                        <tr key={`draft-${rowIndex}`}>
                            {columns.map(col => (
                                <td key={col.key} className="border px-3 py-2">
                                    {renderCell(
                                        col,
                                        row[col.key],
                                        value =>
                                            setDraftRows(prev =>
                                                prev.map((r, i) =>
                                                    i === rowIndex
                                                        ? { ...r, [col.key]: value }
                                                        : r
                                                )
                                            )
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>

            </table>
            <div className="flex justify-end gap-2 mt-4">
                <button onClick={addRow} className="!bg-[#08107D] rounded p-2 !text-white">+ Add Row</button>
                <button onClick={saveRows} className="!bg-[#08107D] rounded p-3 !text-white">Save</button>
            </div>
        </>

    );
}

/* ---------- CELL RENDERER ---------- */
function renderCell(col, value, onChange) {
    switch (col.type) {
        case "select":
            return (
                <select
                    value={value ?? ""}
                    onChange={e => onChange(e.target.value)}
                    className="w-full border px-2 py-1"
                >
                    {(col.options || []).map(opt => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            );

        default:
            return (
                <input
                    type={col.type || "text"}
                    value={value ?? ""}
                    onChange={e => onChange(e.target.value)}
                    className="w-full border px-2 py-1"
                />
            );
    }
}
