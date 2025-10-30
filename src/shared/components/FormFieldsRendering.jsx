import FormInput from "../UIElements/FormInput";
import FormTextarea from "../UIElements/FormTextarea";
import FormDropdown from "../UIElements/FormDropdown";
// import KeyValueInput from "../UIElements/KeyValueInput";
import MultiOptionInput from "../UIElements/MultiOptionInput";
import FormJsonEditor from "../UIElements/FormJsonEditor";
import FormPhoneInput from "../components/PhoneInput";
import TimezoneSelectDropdown from "../components/TimezoneSelect";
import ToggleBtn from "../UIElements/ToggleBtn";
import renderIcons from "../functions/renderIcons";




const RenderForField = (field) => {
    // console.log(field, "in render field")
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
        case "toggle":
            return (
                <div className="w-full flex gap-[1.5rem] justify-between items-center">
                    <label
                        htmlFor={field.name}
                        className="md:w-[30%] text-right !flex justify-end gap-2"
                    >
                        {field.isMandatory === true && renderIcons('FaStarOfLife', 10, '#ff0000')}
                        {field.label || 'label'}
                    </label>
                    <ToggleBtn
                        className="w-[70%]"
                        id={`active/deactive-${field.label}`}
                        isChecked={field.value}
                    // handleCheckboxChange={(e) =>
                    //     handleCheckboxChange(e, field.name)
                    // }
                    />
                </div>
            );
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
                    fieldData={field.value}
                    // onChangeHandler={(option) =>
                    //     onChangeDropdown(option.value, field.name)
                    // }
                    iconName={field.iconName}
                    value={field.value}
                    onDetailedView={true}

                />
            );
        // case "multiVariables":
        //     return (
        //         <KeyValueInput
        //             type={field.type}
        //             name={field.name}
        //             label={field.label}
        //             placeholder={field.placeholder}
        //             customstyles={field.customstyles}
        //             isMandatory={field.isMandatory}
        //             onChange={(updatedPairs) =>
        //                 onChangeKeyValue(updatedPairs, field.name)
        //             }
        //             iconName={field.iconName}
        //         />
        //     );
        case "singleOption":
            return (
                <SingleOptionList
                    type={field.type}
                    name={field.name}
                    label={field.label}
                    placeholder={field.placeholder}
                    customstyles={field.customstyles}
                    isMandatory={field.isMandatory}
                    // onChange={(updatedPairs) =>
                    //     // onChangeKeyValue(updatedPairs, field.name)
                    // }
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
                    // onChange={(updatedOptions) =>
                    //     onChangeMultiOptions(updatedOptions, field.name)
                    // }
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
                    // onChangeHandler={(value) => onChangeJsonEditor(value, field.name)}
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
        case 'timezone':
            return (
                <TimezoneSelectDropdown
                    name={field.name}
                    label={field.label}
                    value={field.value}
                    placeholder={field.placeholder}
                    customstyles={field.customstyles}
                    isMandatory={field.isMandatory}
                    // onChangeHandler={onTimezoneChange}
                    iconName={field.iconName}
                />
            )
        default:
            return null;
    }
};

export default RenderForField;