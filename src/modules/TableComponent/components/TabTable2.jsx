import { useState, useEffect, useRef, useMemo } from "react"
import { DataGrid } from "@mui/x-data-grid";
import { FaSearch } from "react-icons/fa";
import { useGridApiContext } from "@mui/x-data-grid";
import { FaFilter } from "react-icons/fa";
import {  FiTool } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { SaveTabRecord } from "../../../utils/CheckAndExecuteFlows/CRUDoperations";
import DynamicRowForm from "./TabForm";
import renderIcons from "../../../shared/functions/renderIcons";

const intial_columns = [
    { key: "name", label: "Name" },
    { key: "channel", label: "Channel" },
    { key: "label", label: "Label" },
];
const initialRows = [
    {
        sys_id: "1",
        name: "fhgdfjhg",
        channel: "ihjkjrgnekjqi",
        label: "bjfghbdf",
    },
    {
        sys_id: "2",
        name: "check",
        channel: "check",
        label: "check",
    },
];
const initial_buttons = [
    { key: "save", label: "Save" },
]

const SearchInput = ({
    searchText,
    setSearchText,
    onBlur,
}) => {
    return (
        <div
            className="
        flex items-center gap-2
        h-9
        px-4
        bg-white
        border border-[#b6c3e6]
        rounded-full
        shadow-sm
        focus-within:border-[#08107D]
        focus-within:ring-1
        focus-within:ring-[#08107D]
        transition
      "
        >
            {/* Search Icon */}
            <FaSearch size={14} className="text-[#08107D]" />

            {/* Input */}
            <input
                autoFocus
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onBlur={onBlur}
                placeholder="Search"
                className="
          w-52
          text-sm
          text-gray-700
          placeholder-gray-400
          bg-transparent
          outline-none
        "
            />
        </div>
    );
};
const CustomToolbar = ({ searchText, setSearchText, onAddRow }) => {
    const apiRef = useGridApiContext();


    return (
        <div className="p-2 flex items-center gap-3 justify-end">
            <button
                className={`p-1 !rounded-[50%] !bg-[var(--primary-color)] 
                          text-[var(--secondary-color)] hover:!bg-gray-200 
                          border !border-[var(--primary-color)]
                          hover:text-[var(--text-color)]`}
                onClick={onAddRow}
                title="Add New Record"
            >

                {renderIcons('GoPlus', 20, "#ffffff")}
            </button>

            {/* 📊 Columns */}
            <button className="bg-transparent"
                onClick={() => apiRef.current.showPreferences("columns")}
                title="Manage Columns"
            >
                <FiTool size={16} />
            </button>

            {/* 🔽 Filters */}
            <button className="bg-transparent"
                onClick={() => apiRef.current.showPreferences("filters")}
                title="Manage Filters"
            >
                <FaFilter size={14} />
            </button>

            {/* ⬇ Export
            <CircleIconButton
                onClick={() => apiRef.current.exportDataAsCsv()}
            >
                <FiDownload size={16} />
            </CircleIconButton> */}

            {/* 🔍 Search */}
            <div className="bg-[#08107D]  text-center
                 flex items-center justify-center  rounded-full border
                   ">

                <input
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setSearchText(e.target.value)}
                    value={searchText}
                    className="h-full hidden  md:flex shadow-lg !bg-white
                    px-2 py-2 rounded-full outline-none border color-[#140202ccc]"
                />

                <FiSearch
                    size={20}
                    //   onClick={onChangeSearchText}
                    style={{ cursor: "pointer" }}
                    className="m-1 !text-white"
                />
            </div>
        </div>
    );
};
const TableCompnent2 = ({ tableObj, formValues, recordId, activeTab, designName }) => {
    const [columns, setColumnns] = useState(intial_columns);
    const [persistedRows, setPersistedRows] = useState(initialRows); // READ-ONLY
    const [draftRows, setDraftRows] = useState([]);
    const [EditedRows, setEditedRows] = useState(
        Array.isArray(initialRows) ? initialRows : []
    );
    const [searchText, setSearchText] = useState("");
    const [filteredRows, setFilteredRows] = useState(EditedRows);
    const [filters, setFilters] = useState({});
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const rowClickRef = useRef(false);
    const [dirtyRowIds, setDirtyRowIds] = useState(new Set());
    // maintaining changes for Add Form
    const [openForm, setOpenForm] = useState(false);
    const [editingRow, setEditingRow] = useState(null); // null = add mode

    const gridColumns = useMemo(() => {
        if (!tableObj?.fields) return [];

        return [...tableObj.fields]
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .map(field => ({
                field: field.key,
                headerName: field.label,
                flex: 1,
                editable: field.type !== "custom", // 🔒 system fields non-editable
                renderCell: (params) => {
                    // Optional: custom rendering
                    if (field.type === "custom") {
                        return params.value
                            ? new Date(params.value).toLocaleString()
                            : "";
                    }
                    return params.value;
                },
            }));
    }, [tableObj]);

    useEffect(() => {
        // console.log("Triggering in searchText useEffect");
        if (searchText === "") {
            setFilteredRows(EditedRows); setSearchText("");
        } else {
            const filtered = EditedRows.filter(row =>
                Object.values(row).some(value =>
                    value.toString().toLowerCase().includes(searchText.toLowerCase())
                )
            );
            setFilteredRows(filtered);
        }
    }, [searchText, EditedRows]);

    useEffect(() => {
        if (Array.isArray(formValues)) {
            setPersistedRows(formValues);
            setEditedRows(formValues);
        } else {
            setPersistedRows([]);
            setEditedRows([]);
        }
    }, [formValues]);

    const handleAddRow = () => {
        // setDraftRows(prev => [...prev, createEmptyRow()]);
        setOpenForm(true);
    };
    const rowsForGrid = [
        ...EditedRows,
        ...draftRows.map((row, index) => ({
            ...row,
            sys_id: `draft-${index}`,
            __isDraft: true,
        })),
    ];

    const handleButtonClick = async (rows) => {
        // const newRows = draftRows.map(row => {
        //     const filteredRow = {};
        //     Object.keys(row).forEach(key => {
        //         if (key !== "sys_id" && key !== "__isDraft") {
        //             filteredRow[key] = row[key];
        //         }
        //     });
        //     return filteredRow;
        // });
        // console.log("New Rows:", newRows);
        // const allRows = [...EditedRows, ...newRows];
        const allRows = [...EditedRows, ...rows];
        const response = await SaveTabRecord(
            designName,
            allRows,   // ✅ THIS IS THE SOURCE OF TRUTH
            recordId,
            activeTab,
            true
        );
        console.log(response, "response after saving");
        console.log(rows, "Rows on Button Click");

    }
    const filteredRowsForGrid = useMemo(() => {
        if (!searchText) return rowsForGrid;

        const lower = searchText.toLowerCase();

        return rowsForGrid.filter(row =>
            Object.values(row).some(value =>
                value !== null &&
                value !== undefined &&
                String(value).toLowerCase().includes(lower)
            )
        );
    }, [searchText, rowsForGrid]);

    const handleRowClick = (params) => {
        console.log(params, "Row Click Params");
        setEditingRow(params.row);
        setOpenForm(true);
    }


    return (
        <div>
            {!openForm &&
                <>            <DataGrid
                    // rows={filteredRows}
                    rows={filteredRowsForGrid}
                    columns={gridColumns}
                    getRowId={(row) => row.sys_id}
                    onRowClick={handleRowClick}
                    checkboxSelection
                    disableRowSelectionOnClick
                    slots={{
                        toolbar: CustomToolbar,
                        noRowsOverlay: () => (
                            <div className="w-full h-full flex items-center justify-center bg-white">
                                <span className="text-gray-500 text-sm">No rows</span>
                            </div>
                        ),
                    }}
                    slotProps={{
                        toolbar: {
                            onAddRow: handleAddRow,
                            searchText,
                            setSearchText,
                        },
                        panel: {
                            sx: {
                                right: 16,
                                left: "auto",
                                top: 56,
                            },
                        }
                    }}

                    pageSizeOptions={[5, 10]}
                    processRowUpdate={(newRow) => {
                        if (newRow.__isDraft) {
                            setDraftRows(prev =>
                                prev.map((r, i) =>
                                    `draft-${i}` === newRow.sys_id ? newRow : r
                                )
                            );
                            return newRow;
                        }

                        setDirtyRowIds(prev => new Set(prev).add(newRow.sys_id));
                        setEditedRows(prev =>
                            prev.map(r =>
                                r.sys_id === newRow.sys_id ? newRow : r
                            )
                        );
                        return newRow;
                    }}
                    sx={{
                        "--DataGrid-containerBackground": "#050c6b",
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "#08107D",
                        },
                        "& .MuiDataGrid-columnHeaderTitle": {
                            color: "#ffffff",
                            fontWeight: 600,
                        },
                        "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-checkboxInput": {
                            display: "none",
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            justifyContent: "flex-end",
                        },
                        "& .MuiTablePagination-toolbar": {
                            minHeight: "40px",
                        },
                    }}
                />
                    <div className="flex justify-end mt-2 gap-3">
                        {initial_buttons.map((button) => (
                            <button
                                key={button.key}
                                className="!bg-[#01245c] text-white px-6 py-2 hover:!bg-[#023b8a] rounded"

                                onClick={() => handleButtonClick(button.key)}
                            >
                                {button.label}
                            </button>
                        ))}
                    </div>
                </>


            }
            {openForm &&
                <DynamicRowForm
                    open={openForm}
                    onClose={() => setOpenForm(false)}
                    fields={tableObj.fields}
                    initialValues={editingRow}
                    onSubmit={handleButtonClick}
                />
            }
        </div>
    );

}

export default TableCompnent2;