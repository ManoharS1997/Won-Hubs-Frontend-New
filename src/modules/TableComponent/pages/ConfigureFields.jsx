import { useState, useMemo, useEffect } from "react";
import Modal from "react-modal";

import { GetConfigureFields, GetSaveConfigFields, SaveConfigureFields } from "../../../utils/CheckAndExecuteFlows/CRUDoperations";
import SaveButton from "../components/SaveButton";

const customStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        zIndex: 100,
    },
    content: {
        inset: 70,
        padding: 20,
        border: "none",
        borderRadius: 20,
        overflow: "hidden",
    },
};

export default function ConfigureFieldsComponent({ tableData, schema, data, tableName, selectedColumns }) {
    const [search, setSearch] = useState("");
    const [dragIndex, setDragIndex] = useState(null);
    const [isOpen, setIsOpen] = useState(true);
    const [orderedFields, setOrderedFields] = useState([]);
    const [completeInformation, setCompleteData] = useState([])
    const [completeSchema, setCompleteSchema] = useState([])
    //props assignng 
    useEffect(() => {
        if (tableName) {
            getFieldsData()
        }
        // if (schema?.length > 0) {
        //     // CASE 2: restore saved schema
        //     setOrderedFields(schema);
        // } else if (tableData?.length > 0) {
        //     // CASE 1: first time — select first 5
        //     setOrderedFields(
        //         tableData.map((col, index) => ({
        //             id: index + 1,               // ORDER
        //             key: col.name,               // DB KEY
        //             name: col.name.replace(/_/g, " "),
        //             type: col.type,
        //             checked: index < 5,
        //         }))
        //     );
        // }

    }, [schema, tableData]);


    const getFieldsData = async () => {
        const data = await GetConfigureFields(tableName);

        if (data.success) {
            const { completeData, tableSchema } = data;

            setCompleteData(completeData);

            const mappedData = tableSchema.map((each, index) => ({
                id: index + 1,
                name: each.Field?.trim(),
                type: each.Type,
                checked: Array.isArray(selectedColumns)
                    ? selectedColumns.includes(each.Field?.trim())
                    : false,
            }));

            setOrderedFields(mappedData);
        }
    };

    const getSavedColumns = async () => {
        const data = await GetSaveConfigFields(tableName);
        console.log(data, "From ")
    }

    const filteredFields = useMemo(
        () =>
            orderedFields.filter((f) =>
                f.name.toLowerCase().includes(search.toLowerCase())
            ),
        [search, orderedFields]
    );

    const visibleColumns = orderedFields.filter((f) => f.checked);
    const onDragStart = (index) => setDragIndex(index);
    const onDrop = (dropIndex) => {
        if (dragIndex === null || dragIndex === dropIndex) return;
        // console.log(dragIndex,dropIndex,"Drag and drop Hereeeee")
        setOrderedFields((prev) => {
            const updated = [...prev];
            const [moved] = updated.splice(dragIndex, 1);
            updated.splice(dropIndex, 0, moved);

            // 🔑 Reassign order ids
            return updated.map((col, idx) => ({
                ...col,
                id: idx + 1,
            }));
        });

        setDragIndex(null);
    };
    // console.log(orderedFields, "ordered Here")
    // console.log(tableData, "tableData");
    // console.log(visibleColumns, "vismibleColumn names")
    // console.log(completeInformation,"completeInformation")
    // console.log(tableName, "tableName")

    const saveFunction = async () => {
        try {
            const data = await SaveConfigureFields(tableName, visibleColumns)
            // console.log(data, "DATA HERE")

            if (data.success) {
                alert("Update or created succssfully")
                setIsOpen(false)
            }
        }
        catch (e) {
            console.log(e)
            setIsOpen(false)
        }
    }
    const closeFunction = () => {
        setIsOpen(false);
    }
    // console.log(selectedColumns,"Selected Columns Hereee @config fieldd")
    // console.log(filteredFields,"filtered Fieldssss")
    return (
        <Modal isOpen={isOpen} style={customStyles} ariaHideApp={false}>
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
                <h4 className="text-lg font-semibold">Configure Fields</h4>
                <div className="flex !gap-3">
                    <SaveButton onClickFunction={saveFunction} />
                    {/* <button
                    className="text-red-500 text-xl"
                    onClick={() => setIsOpen(false)}
                >
                    <IoClose />
                </button> */}
                    <SaveButton isCancel={true} onClickFunction={closeFunction} />
                </div>
            </div>

            <div className="flex h-full gap-4">
                {/* LEFT PANEL */}
                <div className="w-[20%] overflow-auto custom-scrollbar">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full mb-3 p-2 border rounded"
                    />

                    <ul className="space-y-2 !p-0">
                        {filteredFields.map((field) => {
                            const realIndex = orderedFields.findIndex(
                                (f) => f.name === field.name
                            );
                            return (
                                <li
                                    key={field.name}
                                    draggable
                                    onDragStart={() => onDragStart(realIndex)}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={() => onDrop(realIndex)}
                                    onClick={() =>
                                        setOrderedFields((prev) =>
                                            prev.map((f) =>
                                                f.name === field.name
                                                    ? { ...f, checked: !f.checked }
                                                    : f
                                            )
                                        )
                                    }
                                    className={`flex items-center gap-3 px-2 py-1.5 rounded cursor-move
                    ${field.checked ? "!bg-blue-900 text-white" : "border"}
                  `}
                                >
                                    <input type="checkbox" checked={field.checked} readOnly />
                                    {field.name}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* RIGHT PANEL */}
                <div className="w-[80%] overflow-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-blue-900 text-white">
                                {visibleColumns.map((col) => (
                                    <th key={col.id} className="p-2 text-left">
                                        {col.name}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {completeInformation?.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {visibleColumns?.map((column, colIndex) => {
                                        const cellValue = row?.[column.name];

                                        if (column.type === "json") {
                                            // If JSON is an array → join with commas
                                            if (Array.isArray(cellValue)) {
                                                return (
                                                    <td key={colIndex}>
                                                        {cellValue.map(item => item.name).join(", ")}
                                                    </td>
                                                );
                                            }

                                            // If JSON is an object → extract values
                                            if (cellValue !== null) {
                                                console.log(cellValue, "cell Value Heree..")
                                                return (
                                                    <td key={colIndex}>
                                                        {Object.values(cellValue).join(", ")}
                                                    </td>
                                                );
                                            }

                                            return <td key={colIndex}>-</td>;
                                        }

                                        // ✅ Normal (non-JSON) column
                                        return (
                                            <td key={colIndex}>
                                                {cellValue ?? "-"}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>


                    </table>
                </div>
            </div>
        </Modal>
    );
}
