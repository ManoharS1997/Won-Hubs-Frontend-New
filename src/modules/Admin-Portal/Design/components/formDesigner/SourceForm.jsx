// import FormInput from "../../shared/UIElements/FormInput";
import FormInput from "../../../../../shared/UIElements/FormInput";
import FormTextarea from "../../../../../shared/UIElements/FormTextarea";
import ToggleBtn from "../../../../../shared/UIElements/ToggleBtn";
import FormDropdown from "../../../../../shared/UIElements/FormDropdown";
import KeyValueInput from "../../../../../shared/UIElements/MultiVariables";
import MultiOptionInput from "../../../../../shared/UIElements/MultiOptionInput";
import SingleOptionList from "../../../../../shared/UIElements/SingleOptionList";
import FormJsonEditor from "../../../../../shared/UIElements/FormJsonEditor";
import FormPhoneInput from "../../../../../shared/components/PhoneInput";
import TimezoneSelectDropdown from "../../../../../shared/components/TimezoneSelect";
// import
const AddUserFormFields = [
  {
    id: 1,
    type: "input",
    name: "text_field",
    label: "Text Field",
    contentType: "text",
    placeholder: "Enter text",
    isMandatory: true,
  },

  {
    id: 3,
    type: "input",
    name: "email_field",
    label: "Email Field",
    contentType: "email",
    placeholder: "Enter email",
    isMandatory: true,
  },
  {
    id: 4,
    type: "input",
    name: "password_field",
    label: "Password Field",
    contentType: "password",
    placeholder: "Enter password",
    isMandatory: true,
  },
  {
    id: 5,
    type: "input",
    name: "number_field",
    label: "Number Field",
    contentType: "number",
    placeholder: "Enter number",
    isMandatory: false,
  },
  {
    id: 6,
    type: "phone",
    name: "phone_field",
    label: "Phone Field",
    placeholder: "Enter phone number",
    isMandatory: true,
  },
  {
    id: 7,
    type: "input",
    name: "url_field",
    label: "URL Field",
    contentType: "url",
    placeholder: "Enter URL",
    isMandatory: false,
  },

  {
    id: 8,
    type: "input",
    name: "date_field",
    label: "Date Field",
    contentType: "date",
    placeholder: "Select date",
    isMandatory: false,
  },
  {
    id: 9,
    type: "input",
    name: "time_field",
    label: "Time Field",
    contentType: "time",
    placeholder: "Select time",
    isMandatory: false,
  },
  {
    id: 10,
    type: "input",
    name: "month_field",
    label: "Month Field",
    contentType: "month",
    placeholder: "Select month",
    isMandatory: false,
  },
  {
    id: 11,
    type: "input",
    name: "week_field",
    label: "Week Field",
    contentType: "week",
    placeholder: "Select week",
    isMandatory: false,
  },

  {
    id: 12,
    type: "dropdown",
    name: "dropdown_field",
    label: "Dropdown Field",
    contentType: "string",
    placeholder: "Select option",
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
    ],
    isMandatory: true,
  },
  {
    id: 13,
    type: "input",
    name: "radio_field",
    contentType: "radio",
    label: "Radio Buttons",
    options: [
      { label: "Option A", value: "a" },
      { label: "Option B", value: "b" },
    ],
    isMandatory: false,
  },
  {
    id: 14,
    type: "input",
    name: "checkbox_field",
    label: "Checkbox Field",
    contentType: 'checkbox',
    options: [
      { label: "Check 1", value: "check1" },
      { label: "Check 2", value: "check2" },
    ],
    isMandatory: false,
  },
  {
    id: 15,
    type: "toggle",
    name: "switch_field",
    label: "Toggle Switch",
    isMandatory: false,
  },

  {
    id: 17,
    type: "input",
    name: "file_field",
    label: "File Upload",
    contentType: "file",
    isMandatory: false,
  },
  {
    id: 18,
    type: "input",
    name: "image_field",
    label: "Image Upload",
    contentType: "file",
    isMandatory: false,
  },
  {
    id: 19,
    type: "signature",
    name: "signature_field",
    label: "Signature Pad",
    isMandatory: false,
  },
  {
    id: 2,
    type: "textarea",
    name: "textarea_field",
    label: "Textarea Field",
    placeholder: "Enter detailed text",
    isMandatory: false,
  },
];


const ItemCheck = (field) => {
  switch (field?.type) {
    case "input":
      return (
        <FormInput
          type={field?.contentType}
          name={field?.name}
          label={field?.label}
          value={field?.value}
          placeholder={field?.placeholder}
          customstyles={field?.customstyles}
          isMandatory={field?.isMandatory}
          // onChangeHandler={onChangeInput}
          iconName={field?.iconName}
          options={field?.options}
        />
      );

    case "toggle":
      return (
        <div className="w-full flex  justify-between items-center ">
          <label
            htmlFor={field?.name}
            className="md:w-[30%]  !flexgap-2"
          >
            {field?.label || "label"}
          </label>
          <ToggleBtn
            className="w-[70%]"
            id={`active/deactive-${field?.label}`}
            isChecked={field?.value}
          />
        </div>
      );

    case "textarea":
      return (
        <FormTextarea
          type={field?.type}
          name={field?.name}
          label={field?.label}
          placeholder={field?.placeholder}
          customstyles={field?.customstyles}
          isMandatory={field?.isMandatory}
          rows={field?.rows}
          cols={field?.cols}
        />
      );

    case "dropdown":
      return (
        <FormDropdown
          type={field?.type}
          name={field?.name}
          label={field?.label}
          options={field?.options}
          placeholder={field?.placeholder}
          customstyles={field?.customstyles}
          isMandatory={field?.isMandatory}
          apiData={field?.api_data}
          fieldData={field}
          iconName={field?.iconName}
        />
      );

    case "multiVariables":
      return (
        <KeyValueInput
          type={field?.type}
          name={field?.name}
          label={field?.label}
          placeholder={field?.placeholder}
          customstyles={field?.customstyles}
          isMandatory={field?.isMandatory}
          iconName={field?.iconName}
        />
      );

    case "singleOption":
      return (
        <SingleOptionList
          type={field?.type}
          name={field?.name}
          label={field?.label}
          placeholder={field?.placeholder}
          customstyles={field?.customstyles}
          isMandatory={field?.isMandatory}
          iconName={field?.iconName}
        />
      );

    case "multiOptions":
      return (
        <MultiOptionInput
          type={field?.type}
          name={field?.name}
          label={field?.label}
          placeholder={field?.placeholder}
          customstyles={field?.customstyles}
          isMandatory={field?.isMandatory}
          iconName={field?.iconName}
        />
      );

    case "jsonEditor":
      return (
        <FormJsonEditor
          type={field?.type}
          name={field?.name}
          label={field?.label}
          placeholder={field?.placeholder}
          customstyles={field?.customstyles}
          isMandatory={field?.isMandatory}
          iconName={field?.iconName}
        />
      );

    case "phone":
      return (
        <FormPhoneInput
          name={field?.name}
          label={field?.label}
          value={field?.value}
          placeholder={field?.placeholder}
          customstyles={field?.customstyles}
          isMandatory={field?.isMandatory}
          iconName={field?.iconName}
        />
      );

    case "timezone":
      return (
        <TimezoneSelectDropdown
          name={field?.name}
          label={field?.label}
          value={field?.value}
          placeholder={field?.placeholder}
          customstyles={field?.customstyles}
          isMandatory={field?.isMandatory}
          iconName={field?.iconName}
        />
      );

    default:
      return null;
  }
};

const SourceForm = () => {
  return (
    <div className="h-[90%] w-full bg-white p-6 overflow-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {AddUserFormFields.map((item, idx) => (
          <div
            key={item?.name || idx}
            className={idx % 2 === 0 ? "md:col-start-1" : "md:col-start-2"}
          >
            {ItemCheck(item)}
          </div>
        ))}
      </div>
    </div>
  );
};


export default SourceForm 