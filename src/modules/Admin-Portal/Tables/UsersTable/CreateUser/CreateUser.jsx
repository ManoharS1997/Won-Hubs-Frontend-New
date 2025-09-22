import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import WONLoader from '../../../../../shared/components/loader';
import renderIcons from '../../../../../shared/functions/renderIcons';
import FormInput from '../../../../../shared/UIElements/FormInput';
import ToggleBtn from '../../../../../shared/UIElements/ToggleBtn';
import FormTextarea from '../../../../../shared/UIElements/FormTextarea';
import FormDropdown from '../../../../../shared/UIElements/FormDropdown';
import KeyValueInput from '../../../../../shared/UIElements/MultiVariables';
import SingleOptionList from '../../../../../shared/UIElements/SingleOptionList';
import MultiOptionInput from '../../../../../shared/UIElements/MultiOptionInput';
import FormJsonEditor from '../../../../../shared/UIElements/FormJsonEditor';
import { GetAddUserFormFields, CreateNewUser } from '../../../../../utils/CheckAndExecuteFlows/CRUDoperations';
import FormPhoneInput from '../../../../../shared/components/PhoneInput';
import TimezoneSelectDropdown from '../../../../../shared/components/TimezoneSelect';
import convertName from '../../../../../utils/conevrtName';


export default function CreateUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formFields, setFormFields] = useState([]);
  const [userFormFields, setUserFormFields] = useState([]);

  useEffect(() => {
    const getUserFormFields = async () => {
      setLoading(true);
      try {
        // const response = await fetch('http://localhost:3001/AdminPortalForms/User%20Form/Core%20Forms/Global');
        const data = await GetAddUserFormFields();
        if (data?.success === true) {
          setUserFormFields(data.data)

          let updatedFields = {};
          const mapFields = () =>
            data.data.map((field) => {
              return (updatedFields = {
                ...updatedFields,
                [field.name]: {
                  value: "",
                  isMandatory: field.isMandatory,
                },
              });
            });
          mapFields();
          setFormFields(updatedFields);
        } else {
          alert('No CI Form Fiedls Found.')
        }
      } catch (error) {
        console.error('Error fetching fields:', error);
      } finally {
        setLoading(false);
      }
    };

    getUserFormFields();
  }, []);

  const onChangeInput = (e) => {

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

  const onChangeDropdown = (value, field) => {
    // console.log(e.target)

    setFormFields((prevState) => {
      return {
        ...prevState,
        [field]: {
          isMandatory: prevState[field].isMandatory,
          value: value,
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

  const onChangeMultiOptions = (newOptions, name) => {
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

  const onChangeJsonEditor = (newJsonValue, name) => {
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
  const onPhoneNumberChange = (phoneNumber, name) => {
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
  const onTimezoneChange = (value, name) => {
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const emptyFields = Object.keys(formFields).filter(
        (field) => formFields[field].isMandatory && formFields[field].value === ""
      );
      if (emptyFields.length > 0) {
        setLoading(false);

        return Swal.fire({
          title: "Missing Mandatory Fields!",
          text: `${emptyFields.map((field) => convertName(field)).join(", ")}`,
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      } else {
        const response = await CreateNewUser(formFields)
        if (response.success === true) {
          navigate('/users')
        } else {
          console.log("error creating ci record", response)
          alert("error creating ci record");
        }
      }
    } catch (err) {
      console.log("error creating ci record", err);
    } finally {
      setLoading(false)
    }
  };
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
            onChangeHandler={onChangeInput}
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
            customstyles={field.customstyles}
            isMandatory={field.isMandatory}
            onChangeHandler={onChangeInput}
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
            onChangeHandler={(option) =>
              onChangeDropdown(option.value, field.name)
            }
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
            onChangeHandler={onPhoneNumberChange}
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
            onChangeHandler={onTimezoneChange}
            iconName={field.iconName}
          />
        )
      default:
        return null;
    }
  };

  // Check if all required fields are filled
  const allRequiredFilled = Object.keys(formFields).every(
    (field) => !formFields[field].isMandatory || formFields[field].value !== ""
  );

  return (
    <div className="w-full h-full overflow-auto flex flex-col gap-2 pb-4">
      <div className=" h-[10%] flex items-center gap-4 px-4">
        <button onClick={() => navigate(-1)} className="text-gray-700 hover:text-black !bg-transparent">
          {renderIcons('IoIosArrowBack', 30)}
        </button>
        <h3 className="text-2xl font-semibold m-0">New User</h3>
        <button
          type="submit"
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
        <form onSubmit={handleSubmit} className="w-full h-[90%] self-center gap-6 rounded-lg">
          <div className=" h-fit md:h-[90%] w-full flex flex-col md:flex-row justify-between
           self-center overflow-auto md:px-10 px-2 ">
            {userFormFields ? (
              <>
                <div className="w-full md:w-1/2 h-fit gap-4 flex flex-col p-2">
                  {userFormFields
                    .filter((_, index) => index % 2 === 0) // Even index items
                    .map((field) =>
                      renderForField({
                        ...field,
                        value: formFields[field.name]?.value,
                      })
                    )}
                </div>
                <div className="w-full md:w-1/2 h-fit gap-4 flex flex-col p-2">
                  {userFormFields
                    .filter((_, index) => index % 2 !== 0) // Odd index items
                    .map((field) =>
                      renderForField({
                        ...field,
                        value: formFields[field.name]?.value,
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
      )}
    </div>
  );
}
