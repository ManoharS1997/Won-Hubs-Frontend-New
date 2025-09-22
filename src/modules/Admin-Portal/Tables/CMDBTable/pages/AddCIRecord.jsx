import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { GiFamilyTree } from "react-icons/gi";
import { PiTreeStructure } from "react-icons/pi";
import { GiCheckboxTree } from "react-icons/gi";

import Swal from 'sweetalert2';
import axios from 'axios';
import convertName from '../../../../../utils/conevrtName';
import renderIcons from '../../../../../shared/functions/renderIcons';
import FormInput from '../../../../../shared/UIElements/FormInput';
import ToggleBtn from '../../../../../shared/UIElements/ToggleBtn';
import FormTextarea from '../../../../../shared/UIElements/FormTextarea';
import FormDropdown from '../../../../../shared/UIElements/FormDropdown';
import KeyValueInput from '../../../../../shared/UIElements/MultiVariables';
import MultiOptionInput from '../../../../../shared/UIElements/MultiOptionInput';
import SingleOptionList from '../../../../../shared/UIElements/SingleOptionList';
import FormJsonEditor from '../../../../../shared/UIElements/FormJsonEditor';
import WONLoader from '../../../../../shared/components/loader';
import { CreateCmdbRecord } from '../../../../../utils/CheckAndExecuteFlows/CRUDoperations';

const CIRecordForm = ({ mode = 'add', ciId = null }) => {
  const [formFields, setFormFields] = useState({});
  const [loading, setLoading] = useState(false);
  const [ciFormFields, setCiFormFields] = useState([]);
  const Navigate = useNavigate()
  const { type } = useParams()
  const isViewMode = mode === 'view';

  useEffect(() => {
    const fetchFormFields = async () => {
      try {
        setLoading(true)
        const url = `${import.meta.env.VITE_HOSTED_API_URL}/api/CI-form-fields/${type}`
        const results = await axios.get(url)
        if (results.data?.success === true) {
          setCiFormFields(results.data.data)

          let updatedFields = {};
          const mapFields = () =>
            results.data.data.map((field) => {
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
      } catch (err) {
        console.error('error getting ci form fields: ', err)
        alert('Error getting CI form fields.')
      } finally {
        setLoading(false)
      }
    }

    fetchFormFields()
  }, [mode, ciId]);

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
        const response = await CreateCmdbRecord(formFields)
        if (response.success === true) {
          Navigate('/cmdb')
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
  // function to render formfields
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
          />
        );
      case "toggle":
        return (
          <div className="w-full flex gap-[1.5rem] justify-between items-center">
            <label className="w-[30%] text-right">{field.label}</label>
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
          />
        );
      default:
        return null;
    }
  };
  // console.log('ciFormFields', ciFormFields);

  return (
    <div className="w-full h-full overflow-auto ">
      {loading && <WONLoader />}

      <form onSubmit={handleSubmit} className="h-full flex flex-col gap-4 ">
        <h2 className="!text-sm text-nowra md:!text-2xl w-full overflow-auto h-[10%] 
        m-0 px-1 md:px-4 flex items-center md:gap-4 col-span-full font-bold">
          <button
            type="button"
            className="!bg-inherit !mr-2 md:!m-0"
            onClick={() => Navigate(-1)}
          >
            <span className='hidden md:flex'>{renderIcons("IoChevronBack", 30)}</span>
            <span className='flex md:hidden'>{renderIcons("IoChevronBack", 22)}</span>
          </button>

          {isViewMode ? "CI Record Details" : `New ${convertName(type)} CI Record`}

          {!isViewMode && (
            <div className="w-fit h-full text-[14px] ml-auto px-4 flex gap-4 items-center">
              <button
                type="submit"
                className="w-fit h-fit py-2 px-4 !bg-blue-600 text-white !rounded-full hover:!bg-blue-700"
              >
                ADD
              </button>
              <button
                type="button"
                onClick={() => Navigate(-1)}
                className="hidden md:flex w-fit h-fit py-2 px-4 !bg-inherit text-red-600 font-semibold 
                !rounded-full hover:!bg-red-600 hover:text-white border !border-red-200"
              >
                CANCEL
              </button>
            </div>
          )}
        </h2>

        <div className="h-[90%] w-full flex flex-col md:flex-row justify-between self-center overflow-auto px-2 md:px-10 ">
          {ciFormFields ? (
            <>
              <div className="w-full md:w-1/2 h-fit gap-4 flex flex-col p-2">
                {ciFormFields
                  .filter((_, index) => index % 2 === 0) // Even index items
                  .map((field) =>
                    renderForField({
                      ...field,
                      value: formFields[field.name]?.value,
                    })
                  )}
              </div>
              <div className="w-full md:w-1/2 h-fit gap-4 flex flex-col p-2">
                {ciFormFields
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
    </div>
  );
};

export default CIRecordForm;
