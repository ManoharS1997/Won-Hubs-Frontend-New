import { useState, useEffect } from "react";

const DynamicRowForm = ({
    open,
    onClose,
    fields,
    initialValues,
    onSubmit,
}) => {
    const [formState, setFormState] = useState({});
    const [formValues, setFormValues] = useState({});

    useEffect(() => {
        setFormState(initialValues || {});
        setFormValues(initialValues || {});
    }, [initialValues]);

    const handleSubmit = () => {
        onSubmit([formValues]);
    };
    const normalizeKey = (str = "") =>
        str
            .replace(/([a-z0-9])([A-Z])/g, "$1_$2") // ParentGroup → Parent_Group
            .replace(/\s+/g, "_")                   // First Name → First_Name
            .toLowerCase();

    const renderField = (field) => {
        // console.log(formValues, field, "Form Values Here")
        // console.log(field.name.replace(/\s+/g, "_").toLowerCase())
        // console.log(normalizeKey("A","here"))
        const key = normalizeKey(field.name);
        const value = formValues?.[key] ?? "";
        const handleChange = (e) => {
            // console.log(formValues,"FormValues Hereee")
            setFormValues(prev => ({
                ...prev,
                // [field.name.replace(/\s+/g, "_").toLowerCase()]: e.target.value
                [key]: e.target.value,
            }));
        };
        const requiredStar = field.isMandatory ? <span className="text-red-500">*</span> : null;

        switch (field.type) {
            case "text":
            case "email":
            case "password":
            case "number":
            case "url":
            case "custom":
                return (
                    <div>
                        <label className="block mb-1 font-medium">
                            {field.label} {requiredStar}
                        </label>
                        <input
                            type={field.type}
                            value={value}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                );

            case "phone":
                return (
                    <div>
                        <label className="block mb-1 font-medium">
                            {field.label} {requiredStar}
                        </label>
                        <div className="flex border rounded-lg px-3 py-2 items-center gap-2">
                            <span>🇮🇳 +91</span>
                            <input
                                value={value}
                                onChange={handleChange}
                                className="flex-1 outline-none"
                            />
                        </div>
                    </div>
                );

            default:
                // console.log(FileReader, "field Hereeee");
                return <div>Unsupported field type: {field.type}</div>;
        }
    };
console.log(formValues, "Form Values Here Outside")

    return (
        <div>

            <div className="bg-white p-8 rounded-xl shadow-md w-full">
                <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                    {fields.map((field, index) => (
                        <div key={index}>{renderField(field)}</div>
                    ))}
                </div>
                {/* BUTTONS */}
                <div className="flex gap-4 mt-6 items-end justify-end">
                    <button className="bg-primary py-2 px-4 !bg-[#061464] text-white rounded
                    "
                        onClick={handleSubmit}
                        >Save</button>
                </div>
            </div>
        </div>
    );
};
export default DynamicRowForm;
