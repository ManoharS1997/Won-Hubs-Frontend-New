import React, { useState, useEffect } from "react";
import { Loader2, Check } from "lucide-react"; // icons
import FormInput from "../UIElements/FormInput";
import FormDropdown from "../UIElements/FormDropdown";
import FormTextarea from "../UIElements/FormTextarea";


export default function Fields({ title, data ,path}) {
    console.log(path,"path here")
    const defaultFields = {
        name: { value: " ", isMandatory: false, type: "text", label: "Name" },
        from: {
            value: " ",
            isMandatory: true,
            type: "text",
            label: "From",
            iconName: "TfiEmail",
        },
        to: {
            value: " ",
            isMandatory: true,
            type: "text",
            label: "To",
            iconName: "LuMailOpen",
        },
        cc: {
            value: " ",
            isMandatory: true,
            type: "text",
            label: "CC",
            iconName: "MdOutgoingMail",
        },
        subject: {
            value: "",
            isMandatory: true,
            type: "dropdown",
            label: "Subject",
            options: ["Feedback", "Complaint", "Request"],
        },
        description: {
            value: "",
            isMandatory: true,
            type: "textarea",
            label: "Description",
        },
    };

    const [FieldsState, setFieldsState] = useState(defaultFields);
    const [saveStatus, setSaveStatus] = useState("idle"); // idle | saving | saved
    const [isLoading, setIsLoading] = useState(true);

    // ✅ Restore from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem("formFields");
        if (savedData) {
            setFieldsState(JSON.parse(savedData));
        }
        setTimeout(() => setIsLoading(false), 200); // small delay for loader
    }, []);

    // ✅ Auto-save to localStorage + mock API
    useEffect(() => {
        if (!FieldsState || isLoading) return;
        setSaveStatus("saving");
        const timer = setTimeout(() => {
            localStorage.setItem(`${path}Data` ,JSON.stringify(FieldsState));
            // console.log("Auto-saving data...", FieldsState);
            setTimeout(() => {
                setSaveStatus("saved");
            }, 400);
        }, 800);

        return () => clearTimeout(timer);
    }, [FieldsState]);

    // ✅ Reset “Saved” indicator after 2s
    useEffect(() => {
        if (saveStatus === "saved") {
            const timer = setTimeout(() => setSaveStatus("idle"), 2000);
            return () => clearTimeout(timer);
        }
    }, [saveStatus]);

    const onChangeInput = (e) => {
        const { id, value } = e.target;
        setFieldsState((prev) => ({
            ...prev,
            [id]: { ...prev[id], value },
        }));
    };

    const onChangeDropdown = (e, id) => {
        setFieldsState((prev) => ({
            ...prev,
            [id]: { ...prev[id], value: e.target.value },
        }));
    };

    const capitalize = (str = "") =>
        str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    const renderField = (key, field) => {
        const fieldValue = data?.[key]?.value || field.value || "";

        if (field.type === "dropdown") {
            return (
                <FormDropdown
                    key={key}
                    label={capitalize(field.label || key)}
                    name={key}
                    options={field.options || []}
                    isMandatory={field.isMandatory}
                    placeholder={`Select ${capitalize(field.label || key)}`}
                    value={fieldValue}
                    onChangeHandler={(e) => onChangeDropdown(e, key)}
                    iconName={field.iconName}
                />
            );
        } else if (field.type === "textarea") {
            return (
                <FormTextarea
                    key={key}
                    label={capitalize(field.label || key)}
                    name={key}
                    isMandatory={field.isMandatory}
                    placeholder={`Enter ${capitalize(field.label || key)}`}
                    value={fieldValue}
                    onChangeHandler={onChangeInput}
                />
            );
        }

        return (
            <FormInput
                key={key}
                inputType={field.type || "text"}
                name={key}
                label={capitalize(field.label || key)}
                value={fieldValue}
                isMandatory={field.isMandatory}
                placeholder={`Enter ${capitalize(field.label || key)}`}
                onChangeHandler={onChangeInput}
                iconName={field.iconName}
            />
        );
    };

    const fieldEntries = Object.entries(FieldsState);

    return (
        <div className="w-full h-full flex justify-center items-start px-4 py-6">
            <div className="w-full md:w-[95%] lg:w-[90%] bg-white rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.1)] overflow-auto flex flex-col gap-2 pb-4 relative">
                {/* 🔹 Header Section with Title + Loader */}
                <div className="h-[10%] flex items-center justify-between px-6 py-3 border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>

                    {/* ✅ Fixed-width status area to avoid layout shift */}
                    <div className="flex items-center justify-end min-w-[150px]">
                        {isLoading ? (
                            <span className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                                {/* <Loader2 className="animate-spin w-4 h-4" />
                                <span className="inline-block w-[90px]"></span> */}
                            </span>
                        ) : saveStatus === "saving" ? (
                            <span className="flex items-center gap-2 text-blue-600 text-sm font-medium">
                                <Loader2 className="animate-spin w-4 h-4" />
                                <span className="inline-block w-[90px]">Auto-saving</span>
                            </span>
                        ) : saveStatus === "saved" ? (
                            <span className="flex items-center gap-2 text-green-600 text-sm font-medium">
                                {/* ✅ Bold check icon with subtle pulse */}
                                <Check className="w-5 h-5 font-bold animate-pulse" strokeWidth={5} />
                                {/* <span className="inline-block w-[90px] font-semibold">✓</span> */}
                            </span>
                        ) : (
                            // keeps the space even when nothing is shown
                            <span className="inline-block w-[90px]">&nbsp;</span>
                        )}
                    </div>
                </div>

                {/* 🔸 Form Fields */}
                {isLoading ? (
                    <div className="flex justify-center items-center min-h-[50vh] text-gray-500 text-lg">
                        <Loader2 className="animate-spin w-6 h-6 mr-2" />
                       
                    </div>
                ) : (
                    <div className="w-full h-fit md:h-[90%] flex flex-col md:flex-row justify-between self-center overflow-auto md:px-10 px-2 py-4">
                        {fieldEntries.length > 0 ? (
                            <>
                                <div className="w-full md:w-1/2 h-fit gap-4 flex flex-col p-2">
                                    {fieldEntries
                                        .filter((_, index) => index % 2 === 0)
                                        .map(([key, field]) => renderField(key, field))}
                                </div>

                                <div className="w-full md:w-1/2 h-fit gap-4 flex flex-col p-2">
                                    {fieldEntries
                                        .filter((_, index) => index % 2 !== 0)
                                        .map(([key, field]) => renderField(key, field))}
                                </div>
                            </>
                        ) : (
                            <div className="w-full h-full min-h-[50vh] flex items-center justify-center text-2xl text-gray-400 text-center">
                                <p>No Default Fields</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

}
