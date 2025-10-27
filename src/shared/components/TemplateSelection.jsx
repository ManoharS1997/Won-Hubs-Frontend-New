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
            localStorage.setItem(`${tablename}Data`, JSON.stringify(configureData));
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
                            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm">
                                <div
                                    className="flex flex-col py-3 px-4 justify-between items-center bg-white rounded-lg gap-3 w-[400px] max-w-[90%]
                 max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500
                 scrollbar-thumb-rounded-md transition-all duration-300"
                                    style={{
                                        scrollbarWidth: "thin",
                                        scrollbarColor: "#9ca3af transparent", // ✅ no visible scrollbar track
                                    }}
                                >
                                    {/* Header */}
                                    <div className="relative w-full flex items-center justify-center">
                                        <h2 className="!text-md font-semibold text-center w-full text-gray-800">
                                            {title}
                                        </h2>
                                        <button
                                            type="button"
                                            onClick={() => setModalOpen(false)}
                                            className="absolute right-0 top-0 text-red-500 hover:!bg-red-500 hover:!rounded-full hover:text-white 
               rounded-full p-[2px] transition-all duration-300"
                                        >
                                            <IoIosClose size={18} />
                                        </button>
                                    </div>


                                    {/* Content */}
                                    <div
                                        className="w-full flex flex-col gap-2 overflow-y-auto max-h-[55vh] scrollbar-thin 
                   scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500 scroll-smooth pr-1"
                                        style={{
                                            scrollbarWidth: "thin",
                                            scrollbarColor: "#9ca3af transparent",
                                        }}
                                    >
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
                                            } else if (field.type === "textarea") {
                                                return (
                                                    <FormTextarea
                                                        key={index}
                                                        label={capitalize(field.label)}
                                                        name={field.name}
                                                        isMandatory={field.isMandatory}
                                                        onChangeHandler={onChangeInput}
                                                        placeholder={`Enter ${capitalize(field.label)}`}
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

                                    {/* Footer Button */}
                                    <button
                                        type="submit"
                                        disabled={!isCreateBtnActive}
                                        onClick={handleSave}
                                        className={`border w-full px-4 py-2 rounded transition-all duration-500 !text-white ${isCreateBtnActive
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
