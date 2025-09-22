import React, { useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';
import { GrValidate } from "react-icons/gr";
import { BsPatchExclamationFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md"
import CustomInput from "../../../shared/UIElements/CustomInput"
import convertName from "../../../utils/conevrtName";
import CustomTextarea from "../../../shared/UIElements/CustomTextarea";
import CustomMultiDropdown from "../../../shared/UIElements/CustomMultiDropdown";
import CustomDropdown from "../../../shared/UIElements/CustomDropdown"
import CustomDatePicker from "../../../shared/UIElements/CustomDatePicker";
import ChecklistInput from "../../../shared/UIElements/CustomListInput";
import { actionsData } from "../../../shared/Data/connectionFormsData";
import ToggleBtn from "../../../shared/UIElements/ToggleBtn";
import FieldMapping from "../../../shared/components/FieldMapping";
import { callTestFunction } from "../../../utils/functions/ConnectionTestCalls";

const steps = [
  { id: 1, label: "Setup" },
  { id: 2, label: "Configure" },
  { id: 3, label: "Execute" },
];

const ActionForm = ({ appsData, connectionsSources, formData, setFormData, nodeData, setNodes, changeEvent }) => {
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [triggerEvents, setTriggerEvents] = useState([])
  const [isTesting, setIsTesting] = useState(false)
  const [fieldMappings, setFieldMappings] = useState({});
  const [expandedItems, setExpandedItems] = useState([]);

  useEffect(() => {
    formData.app && setTriggerEvents(actionsData[formData.app])
    if (changeEvent !== formData.event) {
      setCompletedSteps(nodeData.data.formData?.completedSteps || [])
      setCurrentStep(nodeData.data.formData?.currentStep || 0)
    }
  }, [formData])

  useEffect(() => {
    if (formData.event !== '' && formData.app !== '' && actionsData[formData.app][formData.event]) {
      if (formData.event !== '' && formData.app !== '' && !nodeData.data.formData.configure && !nodeData.data.formData.test || changeEvent !== formData.event) {
        setFormData(prev => {
          return {
            ...prev,
            configure: actionsData[formData.app][formData.event]?.configure,
            test: actionsData[formData.app][formData.event]?.test
          }
        })
        setCompletedSteps(nodeData.data.formData?.completedSteps ? nodeData.data.formData.completedSteps : [])
        setCurrentStep(nodeData.data.formData?.currentStep ? nodeData.data.formData.currentStep : 0)
        setNodes(prev => {
          return prev.map(node => {
            if (node.id === nodeData.id) {

              if (formData.app !== '' || formData.event !== '') {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    formData: {
                      ...node.data.formData,
                      configure: actionsData[formData.app][formData.event]?.configure,
                      test: actionsData[formData.app][formData.event]?.test
                    }
                  }
                }
              }
              return {
                ...node,
                data: {
                  ...node.data,
                  formData: {
                    ...node.data.formData
                  }
                }
              }
            }
            return node
          })
        })

      }
      if (nodeData.data.formData?.completedSteps && nodeData.data.formData?.currentStep) {
        setCompletedSteps(nodeData.data.formData.completedSteps)
        setCurrentStep(nodeData.data.formData.currentStep)
      }
      if (changeEvent !== formData.event) {
        setCompletedSteps(nodeData.data.formData?.completedSteps || [])
        setCurrentStep(nodeData.data.formData?.currentStep || 0)
      }
    }
  }, [formData.event])

  const validateSetup = () => {
    const newErrors = {};
    if (!formData.app) newErrors.app = "Please select an app";
    if (!formData.event) newErrors.event = "Please select an action";
    return newErrors;
  }

  const validateConfigure = () => {
    const newErrors = {};
    const requiredFields = {};

    // Iterate over each field in the requiredFields object
    for (const [field, errorMessage] of Object.entries(requiredFields)) {
      // console.log(!formData.configure[field]?.trim())
      if (!formData.configure[field]?.trim()) {
        newErrors[field] = errorMessage;
      }
    }

    return newErrors;
  };

  const validateTest = async () => {
    const newErrors = {};
    const requiredFields = {}
    // console.log('submitting form');
    for (const [field, errorMessage] of Object.entries(requiredFields)) {
      if (!formData.test[field]?.trim()) {
        newErrors[field] = errorMessage;
      }
    }
    if (formData.test) {
      await callTestFunction(formData.test.testingFunction, formData, setFormData, setIsTesting, setNodes, nodeData)
    }
    return newErrors;
  };

  const handleOptionChange = (field, section) => (option) => {
    // console.log(option)
    setFormData((prev) => {
      if (section) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: {
              ...prev[section][field],
              value: option.option
            },
          },
        };
      } else {
        return { ...prev, [field]: option.option };
      }
    });
    setNodes((prev) => {
      return prev.map(node => node.id === nodeData.id ?
        section ? ({
          ...node,
          data: {
            ...node.data,
            formData: {
              ...node.data.formData,
              [section]: {
                ...node.data.formData[section],
                [field]: {
                  ...node.data.formData[section][field],
                  value: option.option
                },
              },
            }
          }
        }) :
          ({
            ...node, data: {
              ...node.data,
              formData: {
                ...node.data.formData,
                [field]: option.option
              }
            }
          })
        : node)
    });
    // Clear errors for the changed field
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };
  const handleMultiOptionChange = (field, section) => (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData((prev) => {
      if (section) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: {
              ...prev[section][field],
              value: selectedValues,
            },
          },
        };
      } else {
        return { ...prev, [field]: selectedValues };
      }
    });
    setNodes((prev) => {
      return prev.map((node) => node.id === nodeData.id ?
        section ? ({
          ...node,
          data: {
            ...node.data,
            formData: {
              ...node.data.formData,
              [section]: {
                ...node.data.formData[section],
                [field]: {
                  ...node.data.formData[section][field],
                  value: selectedValues,
                },
              },
            }
          }
        }) :
          ({
            ...node, data: {
              ...node.data,
              formData: {
                ...node.data.formData,
                [field]: selectedValues
              }
            }
          })
        : node)
    });
    // Clear errors for the changed field
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };
  const handleChecklistChange = (field, section) => (updatedItems) => {
    setFormData((prev) => {
      if (section) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: {
              ...prev[section][field],
              value: updatedItems,  // Store the updated checklist array
            },
          },
        };
      } else {
        return { ...prev, [field]: updatedItems };
      }
    });

    setNodes((prev) => {
      return prev.map(node =>
        node.id === nodeData.id
          ? section
            ? {
              ...node,
              data: {
                ...node.data,
                formData: {
                  ...node.data.formData,
                  [section]: {
                    ...node.data.formData[section],
                    [field]: {
                      ...node.data.formData[section][field],
                      value: updatedItems,  // Update checklist
                    },
                  },
                }
              }
            }
            : {
              ...node,
              data: {
                ...node.data,
                formData: {
                  ...node.data.formData,
                  [field]: updatedItems,  // Direct update if no section
                }
              }
            }
          : node
      );
    });

    // Clear errors for the changed field
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };


  const handleInputChange = useCallback((field, section = "configure") => (e) => {
    // console.log('changing input data:', e.target.value)
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: {
          ...prev[section][field],
          value: value
        },
      },
    }));
    setNodes((prev) => {
      return prev.map(node => node.id === nodeData.id ?
        ({
          ...node,
          data: {
            ...node.data,
            formData: {
              ...node.data.formData,
              [section]: {
                ...node.data.formData[section],
                [field]: {
                  ...node.data.formData[section][field],
                  value: value
                },
              },
            }
          }
        })
        : node)
    });
    // Clear errors for the changed field
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  }, []);
  const handleDateTimeChange = useCallback((field, section = "configure") => (timestamp) => {
    // console.log('timestamp:', timestamp)
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: {
          ...prev[section][field],
          value: timestamp
        },
      },
    }));
    setNodes((prev) => {
      return prev.map(node => node.id === nodeData.id ?
        ({
          ...node,
          data: {
            ...node.data,
            formData: {
              ...node.data.formData,
              [section]: {
                ...node.data.formData[section],
                [field]: {
                  ...node.data.formData[section][field],
                  value: timestamp
                },
              },
            }
          }
        })
        : node)
    });
    // Clear errors for the changed field
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  }, []);

  const handleCheckboxChange = (field, section = "configure") => (e) => {
    const { checked } = e.target; // Get the checked state of the checkbox
    // console.log('changing checkbox data:', checked);

    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: {
          ...prev[section][field],
          value: checked // Update the value to reflect the checkbox state
        },
      },
    }));

    setNodes((prev) => {
      return prev.map(node => node.id === nodeData.id ?
        ({
          ...node,
          data: {
            ...node.data,
            formData: {
              ...node.data.formData,
              [section]: {
                ...node.data.formData[section],
                [field]: {
                  ...node.data.formData[section][field],
                  value: checked
                },
              },
            }
          }
        })
        : node)
    });
    // Clear errors for the changed field
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };
  const handleNext = () => {
    let stepErrors = {};

    // Validate current step
    switch (currentStep) {
      case 0:
        stepErrors = validateSetup();
        break;
      case 1:
        stepErrors = validateConfigure();
        break;
      case 2:
        stepErrors = validateTest();
        break;
      default:
        break;
    }
    // console.log(stepErrors)

    // Check if there are any validation errors
    if (Object.keys(stepErrors).length === 0) {
      // Clear errors for this step
      setErrors({});
      // Mark current step as completed
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps((prev) => [...prev, currentStep]);
        setNodes(prev => prev.map(node => node.id === nodeData.id ? {
          ...node,
          data: {
            ...node.data,
            formData: {
              ...node.data.formData,
              completedSteps: [...completedSteps, currentStep],
              currentStep: currentStep
            }
          }
        } : node))
      }
      // Move to next step if not on last step
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      // Set validation errors
      setErrors(stepErrors);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setNodes(prev => prev.map(node => node.id === nodeData.id ? {
      ...node,
      data: {
        ...node.data,
        formData: {
          ...node.data.formData,
          test: {
            ...node.data.formData.test,
            testResult: {}
          }
        }
      }
    } : node))
    const stepErrors = validateTest();

    if (Object.keys(stepErrors).length === 0) {
      // Clear errors
      setErrors({});
      // Mark final step as completed
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps((prev) => [...prev, currentStep]);
        setNodes(prev => prev.map(node => node.id === nodeData.id ? {
          ...node,
          data: {
            ...node.data,
            formData: {
              ...node.data.formData,
              completedSteps: [...completedSteps, currentStep],
              currentStep: currentStep
            }
          }
        } : node))
      }
      // console.log("Form submitted:", formData);
      // Add your submission logic here
    } else {
      setErrors(stepErrors);
    }

    // setIsTesting(false)
  };
  const handleMappingChange = (mappings) => {
    // Ensure each targetField is mapped only once by keeping the last assigned mapping
    // console.log(mappings)
    // const uniqueMappings = Object.fromEntries(
    //     Object.entries(mappings).reverse().filter(([importedField, targetField], index, self) =>
    //         self.findIndex(([, value]) => value === targetField) === index
    //     )
    // );
    // console.log(mappings)
    setFieldMappings(mappings);
  };

  const renderField = (field, label, section) => {
    // console.log(field.value)
    switch (field.type) {
      case 'input':
        return <CustomInput
          label={label}
          type={field.type}
          placeholder={`Enter ${label}`}
          value={field.value}
          onChangeHandler={handleInputChange(label, section)}
          error={errors[label]}
        />
      case 'dropdown':
        return <CustomDropdown
          label={label}
          onOptionChange={handleOptionChange(label, section)}
          defaultValue={field.value || 'Select...'}
          error={errors[label]}
          api_data={field.api_data}
          options={field.options}
          dependent={field.dependent}
          formData={formData}
          section={section}
        />
      case 'multi-dropdown':
        return <CustomMultiDropdown
          label={label}
          type={field.type}
          options={field.options}
          onOptionChange={handleMultiOptionChange(label, section)}
          defaultValue={field.value}
          api_data={field.api_data}
          dependent={field.dependent}
          formData={formData}
          section={section}
          selectmultiple={field.selectmultiple}
          customOptions={field.customOptions}
        />
      case 'toggle':
        return <div className="w-full flex justify-between items-center">
          <label>
            {label}:
          </label>
          <ToggleBtn
            id={`active/deactive-${label}`}
            isChecked={formData[section][label].value}
            handleCheckboxChange={handleCheckboxChange(label)}
          // showTick
          // customStyles={{
          //     ball: {
          //         width: '3rem',
          //         height: '1.5rem',
          //     },
          //     slider: {
          //         width: '1.2rem',
          //         height: '1.2rem',
          //         transform: isActive ? 'translateX(30%)' : ''
          //     }
          // }}
          />
        </div>
      case 'button':
        return <button
          type="button"
          onClick={() => { }}
          className={`w-fit p-2 rounded !bg-[var(--primary-color)] 
                        text-[#fff] self-center border !border-[var(--primary-color)]
                         hover:!bg-[#fff] hover:!text-[var(--primary-color)] cursor-pointer`}
        >{label}</button>
      case 'para':
        return <p className="m-0">{field.content}</p>
      case 'textarea':
        return <CustomTextarea
          label={label}
          type={field.type}
          placeholder={`Enter ${label}`}
          value={field.value}
          onChangeHandler={handleInputChange(label, section)}
          error={errors[label]}
        />
      case 'datetime':
        return <CustomDatePicker
          label={label}
          type={field.type}
          placeholder={`Enter ${label}`}
          value={field.value}
          onChangeHandler={handleDateTimeChange(label, section)}
          error={errors[label]}
          showTime={field.showTime}
        />
      case 'custom-list':
        return <ChecklistInput
          label="Checklist Items"
          checklistItems={field.checklist}
          onChange={handleChecklistChange(label, section)}
        />
      default:
        return null
    }
  }
  const renderCollapsibleContent = (keyItem, value) => {
    const keyString = String(keyItem); // Ensure keyItem is always a string

    // console.log(keyItem, value);

    if (typeof value === 'object' && value !== null) {
      return (
        <div key={keyString} className="mb-2 flex flex-col gap-2">
          <span
            className={`w-fit bg-[var(--background-color)] px-1 text-[var(--text-color)] 
                        border rounded-[4px] !border-[var(--primary-color)] text-nowrap`}
          >{convertName(keyString)}</span>
          <div className="ml-4 border-l-2 border-gray-300 pl-2 flex flex-col gap-2">
            {Array.isArray(value) ? (
              <ul className="p-0 flex flex-col gap-2">
                {value.map((item, index) => (
                  <li key={index}>{renderCollapsibleContent(index, item)}</li>
                ))}
              </ul>
            ) : (
              Object.keys(value).map((subKey) => renderCollapsibleContent(subKey, value[subKey]))
            )}
          </div>
        </div>
      );
    } else {
      return (
        <p key={keyString} className="flex items-center gap-2 m-0">
          <label className="bg-[#f3f1de] px-1 rounded text-[var(--primary-color)] text-nowrap">
            {convertName(keyString)}:
          </label>
          <span>{value?.toString()}</span>
        </p>
      );
    }
  };

  const toggleExpand = (key) => {
    setExpandedItems((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };
  // console.log(formData?.test?.testResult?.data?.isArray(), 'test result data')
  return (
    <div className="h-[95%] flex flex-col overflow-auto">
      <div className="w-full h-5% px-2 flex items-center gap-2">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <span
              onClick={() => setCurrentStep(index)}
              className={`flex items-center gap-2 hover:opacity-70 
                                ${currentStep === index ? "text-blue-500" : ""}
                                ${completedSteps.includes(index) ? "text-green-500" : ""}
                                cursor-pointer`}
            >
              {step.label}
              {completedSteps.includes(index) ? (
                <GrValidate className="text-green-500" />
              ) : (
                <BsPatchExclamationFill className="text-yellow-500" />
              )}
            </span>
            {index < steps.length - 1 && <MdOutlineKeyboardDoubleArrowRight size={25} />}
          </React.Fragment>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="w-full h-[95%] overflow-auto flex flex-col !gap-4 px-[5%] pb-4">
        {currentStep === 0 && (
          <>
            <CustomDropdown
              label="Source"
              onOptionChange={handleOptionChange("app")}
              defaultValue={formData.app || 'Select...'}
              error={errors.app}
              options={[
                {
                  label: "Apps",
                  options: appsData
                    ? [
                      ...appsData.map((app) => ({
                        label: app.name,
                        option: app.name,
                      })),
                    ]
                    : [],
                },
                {
                  label: "SOAP",
                  options: connectionsSources
                    ? [
                      ...connectionsSources.map((source) => ({
                        label: source.app,
                        option: source.method,
                      })),
                    ]
                    : [],
                },
                {
                  label: "Webhooks",
                  options: [{
                    label: 'Webhook',
                    option: 'webhook',
                  }
                  ]
                },
              ]}
            />
            <CustomDropdown
              label="Event"
              onOptionChange={handleOptionChange("event")}
              defaultValue={formData.event || 'Select...'}
              error={errors.event}
              options={triggerEvents ? Object.keys(triggerEvents).map(event => ({ label: event, option: event })) : []}
            />
          </>
        )}

        {currentStep === 1 && (
          <>
            {formData?.configure && Object.keys(formData.configure).map(field => renderField(formData.configure[field], field, 'configure'))}
          </>
        )}

        {currentStep === 2 && (
          <>
            {formData?.test && Object.keys(formData.test).map(field => renderField(formData.test[field], field, 'test'))}
            {formData?.test?.testResult?.data && Array.isArray(formData?.test?.testResult?.data)
              ? (
                <ul className="p-0 flex flex-col gap-2">
                  <p className=" font-semibold px-2">Pulled {formData?.test?.testResult?.data.length} Records.</p>
                  {formData?.test?.testResult?.data.map((item, index) => {
                    return <div key={index} className=" p-2 flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => toggleExpand(index)}
                        className={`flex items-center justify-between gap-2 hover:opacity-70 w-full
                                                 bg-white p-2 rounded shadow-[0_0_0.2rem_0.1rem_var(--primary-color)] 
                                                 text-[var(--primary-color)] `}
                      >
                        <span> Record {index + 1}</span>
                        <IoIosArrowDown className={`${expandedItems.includes(index) ? '-rotate-180 duration-300 ease-linear' : '-rotate-0 duration-300 ease-linear'}`} />
                      </button>
                      <div className={`flex flex-col gap-2 ml-4 border-l-2 border-gray-300 pl-2 ${expandedItems.includes(index) ? 'block' : 'hidden'}`}>
                        {Object.keys(item).map((keyItem) => renderCollapsibleContent(keyItem, item[keyItem]))}
                      </div>
                    </div>
                  })}
                  {formData.configure['Import to Core Table']?.value && formData?.test?.testResult?.data.length > 0 &&
                    <FieldMapping
                      importedFields={formData?.test?.testResult?.data}
                      targetFields={[]}
                      onMappingChange={handleMappingChange}
                    />}
                </ul>
              ) :
              formData?.test?.testResult?.data && typeof formData?.test?.testResult?.data === 'object' ?
                <div className="p-2 flex flex-col gap-2">
                  {Object.keys(formData?.test?.testResult?.data).map((keyItem) => renderCollapsibleContent(keyItem, formData?.test?.testResult?.data[keyItem]))}
                </div>
                :
                (
                  <div className="w-full h-full flex items-center justify-center">
                    {!isTesting
                      ? <span> No Pulled Records</span>
                      : <div className="absolute w-12 h-12 bg-[#ffffffb9] rounded-full animate-[skLinRotate_1s_ease-in-out_infinite_alternate] 
                                            before:content-[''] before:absolute before:inset-1 before:border-[5px] before:border-transparent 
                                            before:border-t-[var(--primary-color)] before:rounded-full">
                      </div>}
                  </div>
                )}
          </>
        )}

        <button
          type="button"
          onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
          className={`self-end mt-auto !bg-[var(--background-color)] 
                                text-[var(--text-color)] font-bold px-3 py-2 rounded-full
                                flex items-center gap-2 border !border-gray-200`}
        >
          {currentStep === steps.length - 1 ? "Test" : "Next"}
          <MdOutlineKeyboardDoubleArrowRight size={20} />
        </button>
      </form>
    </div>
  );
};

ActionForm.propTypes = {
  appsData: PropTypes.array.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nodeData: PropTypes.object.isRequired,
  setNodes: PropTypes.func.isRequired,
  changeEvent: PropTypes.string.isRequired
};

export default ActionForm;