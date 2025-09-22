import { useEffect, useState } from "react";
import CustomDropdown from "../UIElements/CustomDropdown";
import { BiError } from "react-icons/bi";
import { SiTicktick } from "react-icons/si";
import { MdOutlineSwapHoriz } from "react-icons/md";
import { getAllTableNames, getTableColumnNames, TestRecordData } from "../../utils/CheckAndExecuteFlows/CRUDoperations";
import convertName from "../../utils/conevrtName";
import CustomTooltip from "../UIElements/MappingTooltip";
import { flattenObject } from "../../utils/functions/flattenObject";
import InlineLoader from "../UIElements/InlineLoader";

export default function FieldMapping({ importedFields, targetFields, onMappingChange }) {
    const [mappings, setMappings] = useState({});
    const [errors, setErrors] = useState({});
    const [tableFields, setTableFields] = useState([]);
    const [testImportErrors, setTestImportErrors] = useState({})
    const [formData, setFormData] = useState({
        target_table: "",
        dependent: false,
        options: [],
    });

    useEffect(() => {
        const getTableNames = async () => {
            const data = await getAllTableNames();
            setFormData((prevState) => ({
                ...prevState,
                options: data.map((item) => ({ label: convertName(item), option: item })),
            }));
        };
        getTableNames();
    }, []);

    useEffect(() => {
        if (formData.target_table !== "") {
            const getTableFields = async () => {
                const data = await getTableColumnNames(formData.target_table);
                setTableFields(data.columns.map(field => ({ ...field, fieldType: 'select' })) || []);
                setMappings({})
            };
            getTableFields();
        }
    }, [formData.target_table]);

    const handleMappingChange = (importedField, targetField) => {
        // console.log(importedField, targetField);

        setMappings((prevMappings) => {
            const updatedMappings = prevMappings ?
                { ...prevMappings, [importedField]: targetField }
                : { importedField: targetField }
            onMappingChange(updatedMappings); // Pass to Parent
            return updatedMappings;
        });
    };

    const handleOptionChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            target_table: e.option,
        }));
    };

    const fieldTypeChange = (fieldType) => {
        // console.log(fieldType);

        setTableFields((prevFields) => {
            return prevFields.map((field) => {
                // console.log(field.name, fieldType.name);
                if (field.name === fieldType.name) {
                    return { ...field, fieldType: fieldType.fieldType };
                }
                return field;
            });
        });
    }

    const handleTestImport = async () => {
        if (Object.keys(mappings).length !== tableFields.length - 1) {
            console.warn("Please map all required fields before testing import.");
            return;
        }

        let errors = {};
        const testData = importedFields.map((item) => {
            const flattenedItem = flattenObject(item);
            // console.log("Flattened Data:", flattenedItem); // Debugging: Check flattened data

            let mappedData = {};

            Object.entries(mappings).forEach(([targetField, importedField]) => {
                const targetFieldType = tableFields.find((field) => field.name === targetField)?.type;
                const importedValue = flattenedItem[importedField];

                // Check if the value type matches the expected field type
                if (importedValue !== undefined && !isTypeMatch(importedValue, targetFieldType)) {
                    errors[targetField] = `Type mismatch for ${targetField}: expected ${targetFieldType}, got ${typeof importedValue}`;
                    mappedData[targetField] = null;
                } else {
                    mappedData[targetField] = importedValue ?? importedField;
                }
            });

            return mappedData;
        });

        // console.log("Test Import Data:", testData);
        if (Object.keys(errors).length > 0) {
            return console.error("Field Mapping Errors:", errors);
        }
        const data = await TestRecordData(testData[0], formData.target_table)
        // console.log('test validation report: ', data)
        if (data.errors) {
            setTestImportErrors({ error: [...data.errors] })
        } else {
            setTestImportErrors({ success: data.success, message: data.message })
        }
    };

    // Utility function to check type match
    const isTypeMatch = (value, expectedType) => {
        // console.log(value, expectedType)
        switch (expectedType) {
            case "string":
                return typeof value === "string";
            case "number":
                return typeof value === "number" && !isNaN(value);
            case "boolean":
                return typeof value === "boolean";
            case "date":
                return !isNaN(Date.parse(value)); // Checks if value is a valid date
            default:
                return true; // If no strict type checking is needed
        }
    };

    // console.log(mappings);
    const flattenedImportedFields = importedFields.length > 0 ? flattenObject(importedFields[0]) : {};

    return (
        <div className="p-4 bg-white rounded shadow-md flex flex-col gap-4">
            <h2 className="text-lg text-center text-black font-semibold mb-3">Field Mapping</h2>

            <CustomDropdown
                label="Target Table"
                onOptionChange={handleOptionChange}
                defaultValue={convertName(formData.target_table) || "Select..."}
                error={errors}
                options={formData.options || []}
                dependent={formData.dependent}
                formData={formData}
            />

            <div className="space-y-3 flex flex-col gap-2">
                {tableFields.length > 0 &&
                    tableFields.map((importedField) => (
                        importedField.name !== "id" && (
                            <div key={importedField.name} className="w-full flex items-center self-center gap-8">
                                <span className="text-gray-700 text-right w-[40%]">{importedField.name}:</span>
                                {importedField.fieldType === 'select' ?
                                    <select
                                        className="border border-gray-300 !rounded-none !w-[60%]"
                                        onChange={(e) => handleMappingChange(importedField.name, e.target.value)}
                                    >
                                        <option value="" disabled selected>
                                            -- Select --
                                        </option>
                                        {Object.keys(flattenedImportedFields).map((targetField) => (
                                            <option key={targetField} value={targetField}>
                                                {targetField}
                                            </option>
                                        ))}

                                    </select> :
                                    importedField.fieldType === 'number' ?
                                        <input
                                            type="number"
                                            className="border border-gray-300 w-[60%] px-2 py-1 text-black"
                                            placeholder="Enter Your Custom Value"
                                            onChange={(e) => handleMappingChange(importedField.name, e.target.value)}
                                        />
                                        : <input
                                            type="text"
                                            className="border border-gray-300 w-[60%] px-2 py-1 text-black"
                                            placeholder="Enter Your Custom Value"
                                            onChange={(e) => handleMappingChange(importedField.name, e.target.value)}
                                        />}
                                <span
                                    className={`text-gray-700 border h-fit rounded-[50%] 
                                            flex items-center justify-center w-fit hover:bg-gray-200
                                            cursor-pointer p-1`}
                                    data-tooltip-id={importedField.name + 'field_change'}
                                    title="Swap Field"
                                >
                                    {/* <HiDotsVertical /> */}
                                    <MdOutlineSwapHoriz size={16} />
                                </span>
                                <CustomTooltip
                                    optionId={importedField.name + 'field_change'}
                                    position={"right"}
                                    offset={10}
                                    openOnClick={true}
                                    noArrow={false}
                                    optionsList={{
                                        options: [
                                            { id: 1, name: "Custom Text Input", option: { ...importedField, fieldType: 'input' } },
                                            { id: 2, name: "Data Fields Dropdown", option: { ...importedField, fieldType: 'select' } },
                                            { id: 3, name: "Custom Number Input", option: { ...importedField, fieldType: 'number' } },
                                        ],
                                    }}
                                    onSelectOptionHandler={fieldTypeChange}
                                />
                            </div>
                        )
                    ))}
                <button
                    type="button"
                    className={`w-fit self-center ${Object.keys(mappings).length !== (tableFields.length - 1)
                        ? "!bg-[#ccc] !cursor-not-allowed"
                        : "!bg-[var(--primary-color)] hover:!bg-blue-700 text-white"
                        }  font-bold py-2 px-4 rounded`}
                    onClick={handleTestImport}
                    disabled={Object.keys(mappings).length !== (tableFields.length - 1)}
                >
                    Test Import
                </button>
                <InlineLoader />
                {testImportErrors.error && testImportErrors.error.map(error => (
                    <p
                        key={error}
                        className={`text-red-500 px-2 py-1 bg-red-100 rounded flex items-center gap-2`}
                    >
                        <BiError size={20} />*{error}
                    </p>
                ))}
                {testImportErrors.success &&
                    <p
                        className={`text-green-500 px-2 py-1 bg-green-100 rounded flex items-center gap-2`}
                    >
                        <SiTicktick size={20} />{testImportErrors.message}
                    </p>
                }
            </div>
        </div>
    );
}
