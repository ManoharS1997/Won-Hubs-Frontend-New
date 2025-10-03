import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { IoIosArrowBack, IoIosClose } from "react-icons/io";
import Swal from "sweetalert2";

import WonContext from "../../context/WonContext";
import {
    BackBtn,
    CustomNotificationContainer,
    NotificationTemplateMainContainer,
    SideNavAndContentContainer,
    TitleContainer,
    TemplateTile,
    TemplateTilesContainer
} from "../../modules/Admin-Portal/Notifications/pages/StyledNotificationTemlates";


import FormInput from "../UIElements/FormInput";
import FormDropdown from "../UIElements/FormDropdown";
import FormTextarea from "../UIElements/FormTextarea";

const capitalize = (str = "") =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const TemplateSelection = ({ lists, configureFields, title, path, tablename }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState(lists?.[0]?.type ?? "");

    const [configureData, setConfigureData] = useState(
        configureFields.reduce((acc, field) => {
            acc[field.name] = { value: "", isMandatory: field.isMandatory || false };
            return acc;
        }, {})
    );

    const Navigate = useNavigate();

    const GoBack = () => Navigate(-1);

    const onChangeInput = (e) => {
        const { id, value } = e.target;
        // console.log(e.target.id,"target here")
        // console.log( name, "name and value Hereee")
        setConfigureData((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                value
            }
        }));
    };

    const onChangeDropDown = (fieldName, selected) => {
        setConfigureData((prev) => ({
            ...prev,
            [fieldName]: {
                ...prev[fieldName],
                value: selected?.value || ""
            }
        }));
    };

    // ✅ Check if all mandatory fields are filled
    const isCreateBtnActive = Object.keys(configureData).every(
        (field) =>
            !configureData[field].isMandatory ||
            configureData[field].value.trim() !== ""
    );

    const handleSave = (e) => {
        e.preventDefault();
        localStorage.clear()
        const emptyFields = Object.keys(configureData).filter(
            (field) =>
                configureData[field].isMandatory &&
                configureData[field].value.trim() === ""
        );

        if (emptyFields.length > 0) {
            return Swal.fire({
                title: "Missing Mandatory Fields!",
                text: `Please fill: ${emptyFields.map(capitalize).join(", ")}`,
                icon: "warning",
                confirmButtonColor: "#3085d6"
            });
        }

        try {
            if (tablename === "feedback") {
                // ✅ Build initialState format for feedback
                const feedbackContent = {
                    ...configureData,
                    image: "",
                    active: true,
                    dateOfSubmission: new Date().toISOString(),
                    responses: [],
                    sections: [
                        {
                            id: 1,
                            sectionTitle: configureData?.formTitle?.value || "",
                            sectionDescription: configureData?.formDescription?.value || "",
                            content: [
                                {
                                    id: uuidv4(),
                                    question: configureData?.question?.value || "",
                                    type: { datatype: "Short Text", data: [] },
                                    required: configureData?.required?.value === "true" || false,
                                },
                            ],
                        },
                    ],
                };

                // ✅ Store only one localStorage item
                localStorage.setItem("feedbackData", JSON.stringify(feedbackContent));
            } else {
                // default behavior for other tables
                localStorage.setItem(`${tablename}Data`, JSON.stringify(configureData));
            }
        } catch (error) {
            console.error("LocalStorage quota exceeded:", error);
            Swal.fire({
                title: "Storage Full!",
                text: "Unable to save data in localStorage. Try clearing browser storage.",
                icon: "error",
                confirmButtonColor: "#d33"
            });
            return;
        }

        Navigate(`/${path}/new`, { replace: true });
    };


    return (
        <WonContext.Consumer>
            {() => (
                <NotificationTemplateMainContainer>
                    <SideNavAndContentContainer>
                        <CustomNotificationContainer>
                            <TitleContainer className="flex items-center justify-between">
                                <BackBtn onClick={GoBack}>
                                    <IoIosArrowBack size={30} />
                                </BackBtn>

                                <div className="w-full flex items-center justify-center gap-4">
                                    {lists.map((list, index) => (
                                        <button
                                            key={index}
                                            className={`h-fit w-[100px] !border-b-2 transition-all duration-500 py-2 font-semibold
                                                bg-transparent
                        ${selectedTab === list.type
                                                    ? "!border-black"
                                                    : "!border-transparent"
                                                }`}
                                            onClick={() => setSelectedTab(list.type)}
                                        >
                                            {list.type}
                                        </button>
                                    ))}
                                </div>
                            </TitleContainer>

                            <TemplateTilesContainer className="h-full">
                                <ul className="grid md:grid-cols-4 gap-4 bg-[var(--background-color)] rounded-lg p-4 list-none w-full h-fit m-0 overflow-auto">
                                    {lists
                                        .find((l) => l.type === selectedTab)
                                        ?.records?.map((item, index) => (
                                            <TemplateTile
                                                key={index}
                                                style={{
                                                    backgroundImage: `url(${item.thumbnail || ""})`
                                                }}
                                            >
                                                {item.name}
                                            </TemplateTile>
                                        ))}

                                    <li
                                        onClick={() => setModalOpen(true)}
                                        className="w-full h-[200px] bg-gray-50 rounded flex items-center justify-center hover:shadow-lg border-2 !border-dashed cursor-pointer"
                                    >
                                        <p style={{ fontSize: "55px" }}>+</p>
                                    </li>
                                </ul>

                                {lists.find((l) => l.type === selectedTab)?.records?.length ===
                                    0 && (
                                        <div className="text-center text-gray-500 mt-4">
                                            No templates available for this selection
                                        </div>
                                    )}
                            </TemplateTilesContainer>
                        </CustomNotificationContainer>

                        {isModalOpen && (
                            <div className="fixed w-screen min-h-[80%] bg-black/50 top-0 left-0 flex items-center justify-center">
                                <div className="flex flex-col py-4 px-3 justify-between items-center bg-white rounded-lg gap-4 w-[600px] max-w-[80%]">
                                    <div className="relative w-full flex items-center justify-center m-0 p-0">
                                        <h2 className="text-xl font-semibold text-center w-full m-0 p-0">
                                            {title}
                                        </h2>
                                        <button
                                            type="button"
                                            onClick={() => setModalOpen(false)}
                                            className="absolute right-0 top-0 border rounded-full hover:bg-red-500 hover:text-white transition-all duration-500"
                                        >
                                            <IoIosClose size={20} />
                                        </button>
                                    </div>

                                    <div className="w-full flex flex-col gap-2">
                                        {configureFields.map((field, index) => {
                                            if (field.type === "dropdown") {
                                                return (
                                                    <FormDropdown
                                                        key={index}
                                                        label={capitalize(field.label)}
                                                        name={field.name}
                                                        options={field.options || []}
                                                        isMandatory={field.isMandatory}
                                                        onChangeHandler={(selected) =>
                                                            onChangeDropDown(field.name, selected)
                                                        }
                                                        placeholder={`Select ${capitalize(field.label)}`}
                                                    />
                                                );
                                            }
                                            else if (field.type === 'textarea') {
                                                return (
                                                    <FormTextarea
                                                        key={index}
                                                        label={capitalize(field.label)}
                                                        name={field.name}
                                                        isMandatory={field.isMandatory}
                                                        onChangeHandler={onChangeInput}
                                                        placeholder={`Select ${capitalize(field.label)}`}
                                                    />
                                                );
                                            }
                                            return (
                                                <FormInput
                                                    key={index}
                                                    inputType={field.type || "text"}
                                                    name={field.name}
                                                    label={capitalize(field.label)}
                                                    value={configureData?.[field.name]?.value}
                                                    isMandatory={field.isMandatory}
                                                    onChangeHandler={onChangeInput}
                                                    placeholder={`Enter ${capitalize(field.label)}`}
                                                />
                                            );
                                        })}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={!isCreateBtnActive}
                                        onClick={handleSave}
                                        className={`border w-full px-4 py-2 rounded transition-all duration-500 ${isCreateBtnActive
                                            ? "!bg-[var(--primary-color)] hover:text-[var(--background-color)] hover:!bg-[var(--primary-color)]/90"
                                            : "bg-gray-300 cursor-not-allowed opacity-50"
                                            }`}
                                    >
                                        Create
                                    </button>
                                </div>
                            </div>
                        )}
                    </SideNavAndContentContainer>
                </NotificationTemplateMainContainer>
            )}
        </WonContext.Consumer>
    );
};

export default TemplateSelection;
