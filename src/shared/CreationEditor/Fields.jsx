import React, { useState } from 'react';
import FormInput from '../UIElements/FormInput';
import FormDropdown from '../UIElements/FormDropdown';
import FormTextarea from '../UIElements/FormTextarea';

const Fields = ({ title, configureFields, configureData, data }) => {
    const [displayFields, setDisplayFields] = useState(configureFields || []);

    const capitalize = (str = "") =>
        str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    console.log(configureFields, "configure Fields");
    console.log(data, "data Hereee");

    const renderField = (field) => {
        const fieldValue = data?.[field.name]?.value || ""; 
        // console.log(fieldValue)// ✅ show data values

        if (field.type === "dropdown") {
            return (
                <FormDropdown
                    key={field.name}
                    label={capitalize(field.label)}
                    name={field.name}
                    options={field.options || []}
                    isMandatory={field.isMandatory}
                    placeholder={`Select ${capitalize(field.label)}`}
                    value={fieldValue}
                />
            );
        } else if (field.type === "textarea") {
            return (
                <FormTextarea
                    key={field.name}
                    label={capitalize(field.label)}
                    name={field.name}
                    isMandatory={field.isMandatory}
                    placeholder={`Enter ${capitalize(field.label)}`}
                    value={fieldValue}
                />
            );
        }

        return (
            <FormInput
                key={field.name}
                inputType={field.type || "text"}
                name={field.name}
                label={capitalize(field.label)}
                value={fieldValue}
                isMandatory={field.isMandatory}
                placeholder={`Enter ${capitalize(field.label)}`}
            />
        );
    };

    return (
        <div className="w-full h-full flex justify-center items-start px-4 py-6">
            <div className="w-full md:w-[95%] lg:w-[90%] bg-white rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.1)] overflow-auto flex flex-col gap-2 pb-4">
                <div className="h-[10%] flex items-center justify-center px-4 py-2">
                    <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
                </div>

                <div className="w-full h-fit md:h-[90%] flex flex-col md:flex-row justify-between self-center overflow-auto md:px-10 px-2 py-4">
                    {displayFields?.length ? (
                        <>
                            <div className="w-full md:w-1/2 h-fit gap-4 flex flex-col p-2">
                                {displayFields
                                    .filter((_, index) => index % 2 === 0)
                                    .map((field) => renderField(field))}
                            </div>

                            <div className="w-full md:w-1/2 h-fit gap-4 flex flex-col p-2">
                                {displayFields
                                    .filter((_, index) => index % 2 !== 0)
                                    .map((field) => renderField(field))}
                            </div>
                        </>
                    ) : (
                        <div className="w-full h-full min-h-[50vh] flex items-center justify-center text-2xl text-gray-400 text-center">
                            <p>No Default Fields</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Fields;
