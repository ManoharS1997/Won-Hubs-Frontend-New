
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Swal from "sweetalert2"
import BackButton from "../../../../shared/components/BackButton"
// import UpdateButton from "../components/UpdateBtn"
import { GetAddUserFormFields, getRecordData, updateTableData } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations"
import { MainContainer, ContentContainer, TopHeader, DetailedForm, TopTitle } from "./EventDetailedViewStyledComponents"
import renderIcons from "../../../../shared/functions/renderIcons"
import FormInput from "../../../../shared/UIElements/FormInput"
import FormDropdown from "../../../../shared/UIElements/FormDropdown"
import FormTextarea from "../../../../shared/UIElements/FormTextarea"
import FormPhoneInput from "../../../../shared/components/PhoneInput"

export default function EventDetailedView(props) {
    const [eventData, setEventData] = useState({})
    const [eventDataUpdated, setEventDataUpdated] = useState(false)
    const { id } = useParams()
    useEffect(() => {
        getEventData()
        getEventTableData()
    }, [])

    const getEventData = async () => {
        // const eventdata = await getRecordData('event_logs', id, 'Event Detailed View', window.location.href)
        // console.log(eventdata,"daa hereee")
        // !eventdata.error && setEventData(eventdata[0])

        const responseData = await GetAddUserFormFields('event_logs')
        console.log(responseData, "Response Data Hereee")
        setEventData(responseData?.data)
    }
    const getEventTableData = () => {

    }

    const updateEventData = async () => {
        await updateTableData('event_logs', eventData.id, { active: eventData.active }, 'Event Detailed View', window.location.href)
        setEventDataUpdated(false)
        return Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Event Updated Successfully",
            showConfirmButton: false,
            timer: 1500
        });
    }

    const changeActiveStatus = (updatedData) => {
        setEventDataUpdated(true)
        setEventData(updatedData)
    }
    const renderForField = (field) => {
        switch (field.type) {
            case "input":
                return (
                    <FormInput
                        type={field.contentType}
                        name={field.name}
                        label={field.label}
                        value={field.value}
                        placeholder={field.placeholder}
                        customstyles={field.customstyles}
                        isMandatory={field.isMandatory}
                        // onChangeHandler={onChangeInput}
                        iconName={field.iconName}
                    />
                );
            //   case "toggle":
            //     return (
            //       <div className="w-full flex gap-[1.5rem] justify-between items-center">
            //         <label
            //           htmlFor={field.name}
            //           className="md:w-[30%] text-right !flex justify-end gap-2"
            //         >
            //           {field.isMandatory === true && renderIcons('FaStarOfLife', 10, '#ff0000')}
            //           {field.label || 'label'}
            //         </label>
            //         <ToggleBtn
            //           className="w-[70%]"
            //           id={`active/deactive-${field.label}`}
            //           isChecked={field.value}
            //           handleCheckboxChange={(e) =>
            //             handleCheckboxChange(e, field.name)
            //           }
            //         />
            //       </div>
            //     );
            case "textarea":
                return (
                    <FormTextarea
                        type={field.type}
                        name={field.name}
                        label={field.label}
                        placeholder={field.placeholder}
                        customstyles={field.customstyles}
                        isMandatory={field.isMandatory}
                        // onChangeHandler={onChangeInput}
                        rows={field.rows}
                        cols={field.cols}
                    />
                );
            case "dropdown":
                return (
                    <FormDropdown
                        type={field.type}
                        name={field.name}
                        label={field.label}
                        options={field.options}
                        placeholder={field.placeholder}
                        customstyles={field.customstyles}
                        isMandatory={field.isMandatory}
                        apiData={field.api_data}
                        fieldData={field}
                        // onChangeHandler={(option) =>
                        //   onChangeDropdown(option.value, field.name)
                        // }
                        iconName={field.iconName}

                    />
                );
            case "multiVariables":
                return (
                    <KeyValueInput
                        type={field.type}
                        name={field.name}
                        label={field.label}
                        placeholder={field.placeholder}
                        customstyles={field.customstyles}
                        isMandatory={field.isMandatory}
                        onChange={(updatedPairs) =>
                            onChangeKeyValue(updatedPairs, field.name)
                        }
                        iconName={field.iconName}
                    />
                );
            case "singleOption":
                return (
                    <SingleOptionList
                        type={field.type}
                        name={field.name}
                        label={field.label}
                        placeholder={field.placeholder}
                        customstyles={field.customstyles}
                        isMandatory={field.isMandatory}
                        onChange={(updatedPairs) =>
                            onChangeKeyValue(updatedPairs, field.name)
                        }
                        iconName={field.iconName}
                    />
                );
            case "multiOptions":
                return (
                    <MultiOptionInput
                        type={field.type}
                        name={field.name}
                        label={field.label}
                        placeholder={field.placeholder}
                        customstyles={field.customstyles}
                        isMandatory={field.isMandatory}
                        onChange={(updatedOptions) =>
                            onChangeMultiOptions(updatedOptions, field.name)
                        }
                        iconName={field.iconName}
                    />
                );
            case "jsonEditor":
                return (
                    <FormJsonEditor
                        type={field.type}
                        name={field.name}
                        label={field.label}
                        placeholder={field.placeholder}
                        customstyles={field.customstyles}
                        isMandatory={field.isMandatory}
                        onChangeHandler={(value) => onChangeJsonEditor(value, field.name)}
                        iconName={field.iconName}
                    />
                );
            case "phone":
                return (
                    <FormPhoneInput
                        name={field.name}
                        label={field.label}
                        value={field.value}
                        placeholder={field.placeholder}
                        customstyles={field.customstyles}
                        isMandatory={field.isMandatory}
                        // onChangeHandler={onPhoneNumberChange}
                        iconName={field.iconName}
                    />
                )

            default:
                return null;
        }
    };

    const handleSubmit = () => {
        console.log("SUBMIT clicked")
    }

    console.log(eventData, "eventData Hereee")
    return (
        <MainContainer>

            <div className=" h-[10%] flex items-center gap-4 px-4">
                <button onClick={() => navigate(-1)} className="text-gray-700 hover:text-black !bg-transparent">
                    {renderIcons('IoIosArrowBack', 30)}
                </button>
                <h3 className="text-2xl font-semibold m-0">New Event</h3>
                <button
                    // onClick={handleSubmit}
                    className={`w-fit h-fit py-2 px-4 !rounded-full !ml-auto
             ${true ? '!bg-blue-600 text-white hover:!bg-blue-700' : '!bg-gray-300 text-gray-500 !cursor-not-allowed'}
          `}
                //                 disabled={!allRequiredFilled}
                >
                    ADD
                </button>
            </div>
            <form onSubmit={handleSubmit} className="w-full h-[90%] self-center gap-6 rounded-lg">
                <div className=" h-fit md:h-[90%] w-full flex flex-col md:flex-row justify-between
           self-center overflow-auto md:px-10 px-2 ">
                    {eventData.length>0? (
                        <>
                            <div className="w-full md:w-1/2 h-fit gap-4 flex flex-col p-2">
                                {eventData
                                    ?.filter((_, index) => index % 2 === 0) // Even index items
                                    .map((field) =>
                                        renderForField({
                                            ...field,
                                            value: eventData[field.name]?.value,
                                        })
                                    )}
                            </div>
                            <div className="w-full md:w-1/2 h-fit gap-4 flex flex-col p-2">
                                {eventData
                                    ?.filter((_, index) => index % 2 !== 0) // Odd index items
                                    .map((field) =>
                                        renderForField({
                                            ...field,
                                            value: eventData[field.name]?.value,
                                        })
                                    )}
                            </div>
                        </>
                    ) : (
                        <div className="w-full h-full min-h-[50vh] flex items-center justify-center text-2xl text-gray-400 text-center grow-1">
                            <p>No Defult Form</p>
                        </div>
                    )}
                </div>
            </form>

        </MainContainer>
    )
}