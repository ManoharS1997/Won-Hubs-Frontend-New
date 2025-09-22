import FormInput from "../../../../../shared/UIElements/FormInput";
import FormTextarea from "../../../../../shared/UIElements/FormTextarea";
import FormDropdown from "../../../../../shared/UIElements/FormDropdown";
import ToggleBtn from "../../../../../shared/UIElements/ToggleBtn";
import PropTypes from "prop-types";

const ItemCheck = (field) => {
  switch (field?.type) {
    case "text":
    case "email":
    case "password":
    case "number":
    case "tel":
    case "url":
    case "date":
    case "time":
    case "month":
    case "week":
    case "color":
      return (
        <FormInput type={field?.type} name={field?.name} label={field?.label} />
      );
    case "textarea":
      return <FormTextarea name={field?.name} label={field?.label} />;
    case "dropdown":
      return (
        <FormDropdown
          name={field?.name}
          label={field?.label}
          options={field?.options || []}
        />
      );
    case "radio":
      return (
        <fieldset>
          <label className="w-full !flex gap-2 mb-1">
            <span>{field?.label || "label"}</span>
          </label>
          <div className="flex items-center flex-wrap gap-4">
            {field?.options?.map((option, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 mb-1 cursor-pointer"
              >
                <input
                  type="radio"
                  name={field?.name}
                  value={typeof option === "string" ? option : option.value}
                  className="form-radio"
                />
                <span>
                  {typeof option === "string" ? option : option.label}
                </span>
              </div>
            ))}
          </div>
        </fieldset>
      );
    case "checkbox":
      return (
        <fieldset>
          <label className="w-full !flex gap-2 mb-1">
            <span>{field?.label || "label"}</span>
          </label>
          <div className="flex flex-wrap gap-4">
            {field?.options && field.options.length > 0 ? (
              field.options.map((option, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 mb-1 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name={field?.name}
                    value={typeof option === "string" ? option : option.value}
                    className="form-checkbox"
                  />
                  <span>
                    {typeof option === "string" ? option : option.label}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex justify-start items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name={field?.name}
                  className="form-checkbox"
                />
                <span>{field?.label}</span>
              </div>
            )}
          </div>
        </fieldset>
      );
    case "switch":
      return <ToggleBtn id={field?.name} label={field?.label} />;
    case "multi-select":
      return (
        <FormDropdown
          name={field?.name}
          label={field?.label}
          options={field?.options || []}
          multiple={true}
        />
      );
    case "file":
      return <FormInput type="file" name={field?.name} label={field?.label} />;
    case "image":
      return <FormInput type="file" name={field?.name} label={field?.label} />;
    case "signature":
      return <div>Signature Pad Placeholder</div>;
    default:
      return null;
  }
};

const SourceForm = ({ formFields = [], formButtons = [] }) => (
  <div className="h-[90%] w-full bg-white p-6 overflow-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {formFields.map((item, idx) => (
        <div
          key={item?.name || idx}
          className={idx % 2 === 0 ? "md:col-start-1" : "md:col-start-2"}
        >
          {ItemCheck(item)}
        </div>
      ))}
    </div>
    <div className="w-full flex mt-8 gap-4 flex-wrap justify-end">
      {formButtons.map((btn, idx) => (
        <button
          key={btn.label + idx}
          type={btn.type || "button"}
          className="px-6 py-2 text-white bg-blue-600 rounded"
        >
          {btn.label}
        </button>
      ))}
    </div>
  </div>
);

SourceForm.propTypes = {
  formFields: PropTypes.array.isRequired,
  formButtons: PropTypes.array.isRequired,
};

export default SourceForm;
