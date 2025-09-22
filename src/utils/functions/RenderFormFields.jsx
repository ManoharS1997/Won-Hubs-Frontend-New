

import PropTypes from "prop-types"
import FormInput from "../../shared/UIElements/FormInput";
import ToggleBtn from "../../shared/UIElements/ToggleBtn";
import FormTextarea from "../../shared/UIElements/FormTextarea";
import FormDropdown from "../../shared/UIElements/FormDropdown";
import KeyValueInput from "../../shared/UIElements/MultiVariables";
import SingleOptionList from "../../shared/UIElements/SingleOptionList";
import MultiOptionInput from "../../shared/UIElements/MultiOptionInput";
import FormJsonEditor from "../../shared/UIElements/FormJsonEditor";
import FormPhoneInput from "../../shared/components/PhoneInput";
import TimezoneSelectDropdown from "../../shared/components/TimezoneSelect";
import renderIcons from "../../shared/functions/renderIcons";

export default function RenderFormFields({
  field, onChangeInput, onChangeToggle, onChangeTextarea, onChangeDropdown,
  onChangeMultiVariable, onChangeSingOption, onChangeMultiOptions, onChangeJsonEditor,
  setFormFields, onPhoneNumberChange, onTimezoneChange, formFields
}) {
  // console.log(field)
  const onChangeInputField = (e) => {
    setFormFields((prevState) => {
      // console.log(prevState, e.target.id)
      return {
        ...prevState,
        [e.target.id]: {
          isMandatory: prevState[e.target.id].isMandatory,
          value: e.target.value,
        },
      };
    });
  };

  const handleCheckboxChange = (e, name) => {
    // console.log(e.target)
    setFormFields((prevState) => {
      return {
        ...prevState,
        [name]: {
          isMandatory: prevState[name].isMandatory,
          value: e.target.checked,
        },
      };
    });
  };

  const onChangeDropdownField = (option) => {
    // console.log(field.name, option.value)
    setFormFields((prevState) => {
      return {
        ...prevState,
        [field.name]: {
          isMandatory: prevState[field.name].isMandatory,
          value: option.value,
        },
      };
    });
  };

  const onChangeKeyValue = (newPairs, name) => {
    setFormFields((prevState) => {
      return {
        ...prevState,
        [name]: {
          isMandatory: prevState[name].isMandatory,
          value: newPairs,
        },
      };
    });
  };

  const onChangeMultiOptionsField = (newOptions, name) => {
    setFormFields((prevState) => {
      return {
        ...prevState,
        [name]: {
          isMandatory: prevState[name].isMandatory,
          value: newOptions,
        },
      };
    });
  };

  const onChangeJsonEditorField = (newJsonValue, name) => {
    setFormFields((prevState) => {
      return {
        ...prevState,
        [name]: {
          isMandatory: prevState[name].isMandatory,
          value: newJsonValue,
        },
      };
    });
  };


  const onPhoneNumberFieldChange = (phoneNumber, name) => {
    // Limit input length based on country
    let value = phoneNumber || '';
    const country = 'IN'; // or dynamically detect from input if needed
    const maxLen = 15;
    const digits = value.replace(/\D/g, '');
    if (digits.length > maxLen) {
      value = value.slice(0, maxLen + (value.startsWith('+') ? 1 : 0));
    }
    setFormFields((prevState) => {
      return {
        ...prevState,
        [name]: {
          isMandatory: prevState[name].isMandatory,
          value: value,
        },
      };
    });
  };
  const onTimezoneFieldChange = (value, name) => {
    setFormFields((prevState) => {
      return {
        ...prevState,
        [name]: {
          isMandatory: prevState[name].isMandatory,
          value: value,
        },
      };
    });
  }

  const onChangeSingleOptionField = (updatedPairs) => onChangeKeyValue(updatedPairs, field.name)

  switch (field?.type) {
    case "input":
      return (
        <FormInput
          type={field.contentType}
          inputType={field.inputType}
          name={field.name}
          label={field.label}
          value={field.value}
          placeholder={field.placeholder}
          customstyles={field.customstyles}
          isMandatory={field.isMandatory}
          onChangeHandler={onChangeInput || onChangeInputField}
          iconName={field.iconName}
        />
      );
    case "toggle":
      return (
        <div className="w-full flex gap-[1.5rem] justify-between items-center">
          <label
            htmlFor={field.name}
            className="w-fit !flex gap-2"
          >
            {field.label || 'label'}
            {field.isMandatory === true && renderIcons('FaStarOfLife', 5, '#ff0000')}
            {field.iconName && <span className="border !border-[#ccc] rounded-[2px] ml-auto flex items-center justify-center p-[2px]">
              {renderIcons(field.iconName, 15, 'inherit')}
            </span>}
          </label>
          <ToggleBtn
            className="w-[70%]"
            id={`active/deactive-${field.label}`}
            isChecked={field.value}
            handleCheckboxChange={(e) =>
              handleCheckboxChange(e, field.name)
            }
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
          value={formFields?.[field.name]?.value}
          customstyles={field.customstyles}
          isMandatory={field.isMandatory}
          onChangeHandler={onChangeTextarea || onChangeInputField}
          rows={field.rows}
          cols={field.cols}
          resize={field.resize}
          iconName={field.iconName}
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
          defaultValue={formFields?.[field.name] ?
            { label: formFields?.[field?.name]?.label, value: formFields?.[field?.name]?.value }
            : { label: 'Please Select', value: 'select' }}
          onChangeHandler={onChangeDropdown || onChangeDropdownField}
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
          onChange={onChangeMultiVariable || onChangeKeyValue}
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
          onChange={onChangeSingOption || onChangeSingleOptionField}
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
          onChange={onChangeMultiOptions || onChangeMultiOptionsField}
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
          onChangeHandler={onChangeJsonEditor || onChangeJsonEditorField}
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
          onChangeHandler={onPhoneNumberChange || onPhoneNumberFieldChange}
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
          onChangeHandler={onTimezoneChange || onTimezoneFieldChange}
          iconName={field.iconName}
        />
      )
    default:
      return null;
  }
}

RenderFormFields.propTypes = {
  field: PropTypes.object.isRequired,
  onChangeInput: PropTypes.func,
  onChangeToggle: PropTypes.func,
  onChangeTextarea: PropTypes.func,
  onChangeDropdown: PropTypes.func,
  onChangeMultiVariable: PropTypes.func,
  onChangeSingOption: PropTypes.func,
  onChangeMultiOptions: PropTypes.func,
  onChangeJsonEditor: PropTypes.func,
  setFormFields: PropTypes.func,
  onPhoneNumberChange: PropTypes.func,
  onTimezoneChange: PropTypes.func,
  formFields: PropTypes.object,
}
