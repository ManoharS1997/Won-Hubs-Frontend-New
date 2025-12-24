import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import FormInput from "../../../shared/UIElements/FormInput";
import { IoIosArrowBack } from "react-icons/io";
import { addDynamicaRecord, GetDesignerFields } from "../../../utils/CheckAndExecuteFlows/CRUDoperations";
import WONLoader from "../../../shared/components/loader";
import FormDropdown from "../../../shared/UIElements/FormDropdown";
import Swal from "sweetalert2";


const FormDesignerTesting = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formFields, setFormFields] = useState({});
    const [groupFormFields, setGroupFormFields] = useState([]);

    useEffect(() => {
        const getCompanyFormFields = async () => {
            setLoading(true);
            try {
                const data = await GetDesignerFields("Dummy_Test");
                // console.log("data from response",data);
                if (data?.success === true) {
                    // console.log("Triggering inside")
                    setGroupFormFields(data.fields);

                    setFormFields(data.fields);
                } else {
                    // alert("No Group Form Fields Found.");
                }
            } catch (error) {
                // set
                console.log("Error fetching group fields:", error);
            } finally {
                setLoading(false);
            }
        };
        getCompanyFormFields();
    }, []);

    const onChangeInput = (e) => {
        setFormFields((prevState) => {
            // console.log(prevState, e.target.id)
            return {
                ...prevState,
                [e.target.id]: {
                    // isMandatory: prevState[e.target.id].isMandatory,
                    value: e.target.value,
                },
            };
        });
    };

    const onChangeDropdown = (value, field) => {
        setFormFields((prev) => ({
            ...prev,
            [field]: {
                isMandatory: prev[field].isMandatory,
                value: value,
            },
        }));
    };

    const onPhoneNumberChange = (phoneNumber, name) => {
        let value = phoneNumber || "";
        const maxLen = 15;
        const digits = value.replace(/\D/g, "");
        if (digits.length > maxLen) {
            value = value.slice(0, maxLen + (value.startsWith("+") ? 1 : 0));
        }
        setFormFields((prev) => ({
            ...prev,
            [name]: {
                isMandatory: prev[name].isMandatory,
                value,
            },
        }));
    };

    const convertToDBData = (fields) => {
        const output = {};

        Object.entries(fields).forEach(([key, val]) => {

            if (!isNaN(key)) return;

            if (key.toLowerCase() === "id") return;

            if (!val || typeof val !== "object" || val.value === undefined) return;

            const cleanKey = key.replace(/\s+/g, "_").toLowerCase();

            output[cleanKey] = val.value;
        });

        return output;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // console.log("Triggering TryBlock")
            setLoading(true);

            const emptyFields = Object.keys(formFields).filter(
                (field) =>
                    formFields[field].isMandatory && formFields[field].value === ""
            );
            if (emptyFields.length > 0) {
                setLoading(false);
                return Swal.fire({
                    title: "Missing Mandatory Fields!",
                    text: emptyFields.join(", "),
                    icon: "warning",
                    confirmButtonColor: "#3085d6",
                });
            }

            //   const url = "http://localhost:3001/groups/newGroup";
            const cleaned_data = convertToDBData(formFields)
            const response = await addDynamicaRecord("Dummy_Test", cleaned_data)
            console.log(response, "response")


            if (!response.success) {
                const errorText = await response.text();
                throw new Error(`Network error: ${errorText}`);
            }


            console.log("Group created successfully:", response);
            navigate(`/locations`);
        } catch (err) {
            console.log(err, "err")
            console.error("Error creating group:", err);
        } finally {
            setLoading(false);
        }
    };

    const renderForField = (field) => {
        console.log(field, "field");
        switch (field.type) {
            case "input":
            case "text":
                return (
                    <FormInput
                        type={field.contentType}
                        name={field.name}
                        label={field.label}
                        value={formFields[field.name]?.value || ""}
                        placeholder={field.placeholder}
                        customstyles={field.customstyles}
                        // isMandatory={field.isMandatory}
                        onChangeHandler={onChangeInput}
                        iconName={field.iconName}
                    />
                );


            case "dropdown":
                return (
                    <FormDropdown
                        name={field.name}
                        label={field.label}
                        options={field.options}
                        placeholder={field.placeholder}
                        value={formFields[field.name]?.value || ""}
                        customstyles={field.customstyles}
                        isMandatory={field.isMandatory}
                        apiData={field.api_data}
                        fieldData={field}
                        onChangeHandler={(option) =>
                            onChangeDropdown(option.value, field.name)
                        }
                    />
                );


            case "phone":
                return (
                    <FormPhoneInput
                        name={field.name}
                        label={field.label}
                        value={formFields[field.name]?.value || ""}
                        placeholder={field.placeholder}
                        onChangeHandler={onPhoneNumberChange}
                        iconName={field.iconName}
                    />
                );

            default:
                return null;
        }
    };
    const allRequiredFilled = Object.keys(formFields).every(
        (field) =>
            !formFields[field].isMandatory || formFields[field].value !== ""
    );
    console.log(groupFormFields, "group Fields here")
    console.log(formFields, "Form Fields")
    return (
        <div className="w-full h-full overflow-auto flex flex-col gap-2 pb-4">
            <div className="h-[10%] flex items-center gap-4 px-4">
                <button
                    onClick={() => navigate(-1)}
                    className="text-gray-700 hover:text-black bg-transparent"
                >
                    <IoIosArrowBack size={30} />
                </button>
                <h3 className="text-2xl font-semibold m-0">New
                    Testing
                </h3>
                <button
                    onClick={handleSubmit}
                    className={`w-fit h-fit py-2 px-4 !rounded-full !ml-auto
            ${allRequiredFilled ? '!bg-blue-600 text-white hover:!bg-blue-700' : '!bg-gray-300 text-gray-500 !cursor-not-allowed'}
          `}
                    disabled={!allRequiredFilled}
                >
                    ADD
                </button>
            </div>

            {loading ? (
                <WONLoader />
            ) : (
                <form
                    // onSubmit={handleSubmit}
                    className="w-full h-[90%] self-center gap-6 rounded-lg"
                >
                    <div className="h-fit md:h-[90%] w-full flex flex-col md:flex-row justify-between self-center overflow-auto md:px-10 px-2">
                        {groupFormFields?.length > 0 ? (
                            <>
                                <div className="w-full md:w-1/2 h-fit gap-4 flex flex-col p-2">
                                    {groupFormFields
                                        .filter((_, i) => i % 2 === 0)
                                        .map((field) =>
                                            renderForField({
                                                ...field,
                                                value: formFields[field.name]?.value,
                                            })
                                        )}
                                </div>
                                <div className="w-full md:w-1/2 h-fit gap-4 flex flex-col p-2">
                                    {groupFormFields
                                        .filter((_, i) => i % 2 !== 0)
                                        .map((field) =>
                                            renderForField({
                                                ...field,
                                                value: formFields[field.name]?.value,
                                            })
                                        )}
                                </div>
                            </>
                        ) : (
                            <div className="w-full h-full min-h-[50vh] flex items-center justify-center text-2xl text-gray-400 text-center">
                                <p>No Group Form</p>
                            </div>
                        )}
                    </div>
                </form>
            )}
        </div>
    );
};

export default FormDesignerTesting;