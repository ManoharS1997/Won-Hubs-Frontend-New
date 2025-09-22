import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { CreateNewUser, GetAddUserFormFields } from "../../../../../utils/CheckAndExecuteFlows/CRUDoperations";
import FormInput from "../../../../../shared/UIElements/FormInput";
import FormDropdown from "../../../../../shared/UIElements/FormDropdown";
import Swal from 'sweetalert2';



// const GroupTableCreateView = () => {
//     const navigate = useNavigate()
//     const [loading, setLoading] = useState(false)
//     const [formFields, setFormFields] = useState('')
//     const [newGroupData, setNewGroupData] = useState({})

//     const [formData, SetFormData] = useState({
//         groupName: '',
//         groupId: getRandomFourDigitNumber(),
//         manager: '',
//         email: '',
//         parentGroup: '',
//         groupTypeDescription: '',
//         groupType: '',
//         region: '',
//         additionalManagers: '',
//         ownership: '',
//     })

//     // useEffect(() => {
//     //     const getUserFormFields = async (department, category, subCategory) => {
//     //         setLoading(true);
//     //         let data
//     //         // const url = `http://localhost:3001/AdminPortalForms/${subCategory}/${category}/${department}`
//     //         const url=""
//     //         const options = {
//     //             method: 'GET'
//     //         }

//     //         try {
//     //             const response = await fetch(url, options)
//     //             data = await response.json()
//     //             setFormFields(data.AdminFormsData[0].fields)
//     //             // console.log('heyy', data.AdminFormsData[0].fields)
//     //         } catch (error) {
//     //             console.error('Error fetching fields:', error);
//     //         } finally {
//     //             setLoading(false);
//     //         }

//     //         return data.AdminFormsData
//     //     }

//     //     getUserFormFields('Global', 'Core Forms', 'Groups Form')
//     // }, [])
//       useEffect(() => {
//         const getUserFormFields = async () => {
//           setLoading(true);
//           try {
//             const data = await GetAddUserFormFields('groups');
//             console.log(data,"response")
//             if (data?.success === true) {
//               console.log("group Form Fields:", data.data);
//               setNewGroupData(data.data)

//               let updatedFields = {};
//               const mapFields = () =>
//                 data.data.map((field) => {
//                   return (updatedFields = {
//                     ...updatedFields,
//                     [field.name]: {
//                       value: "",
//                       isMandatory: field.isMandatory,
//                     },
//                   });
//                 });
//               mapFields();
//               setFormFields(updatedFields);
//             } else {
//               alert('No Grop Form Fiedls Found.')
//             }
//           } catch (error) {
//             console.error('Error fetching fields:', error);
//           } finally {
//             setLoading(false);
//           }
//         };

//         getUserFormFields();
//       }, []);


//     const onChangeInputField = (fieldName, value) => {
//         const snake_case = fieldName.replace(/ /g, '_')
//         setNewGroupData((prevState) => ({
//             ...prevState,
//             [snake_case]: value,
//         }))
//     }

//     const addGroup = async (e) => {
//         e.preventDefault()
//         console.log(formData,"form Data Hereee")

//         const url = 'http://localhost:3001/groups/newGroup'
//         const options = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'authorization': `Bearer ${Cookies.get('accessToken')}`
//             },
//             body: JSON.stringify(newGroupData)
//         }

//         try {
//             const response = await fetch(url, options)

//             if (!response.ok) {
//                 const errorText = await response.text();
//                 throw new Error(`Network response was not ok: ${errorText}`);
//             }
//             const result = await response.json();
//             console.log('User added successfully:', result);
//         }
//         catch (error) {
//             console.error('error adding Group', error)
//         }

//         SetFormData({})
//     }

//     const OnBack = () => navigate(-1)
//     console.log(formFields, "formFields hereee")
//     console.log(newGroupData, "newGroupData hereee")
//     console.log(formData,"form Data Hereee")

//     return (
//         <CreateGroupTableContainer >
//             <SideNavAndContentContainer>
//                 <GroupTableCon>
//                     <FormContent >
//                         <HeaderContainer>
//                             <BackBtn onClick={OnBack}>
//                                 <IoIosArrowBack size={35} />
//                             </BackBtn>
//                             <HeaderTag>Create Group</HeaderTag>
//                         </HeaderContainer>

//                         {loading ?
//                             (<Loader>
//                                 <Bar />
//                                 <Bar />
//                                 <Bar />
//                             </Loader>)
//                             :
//                             (<GroupTableForm onSubmit={addGroup} >
//                                 {formFields && formFields.map(each => (
//                                     <div key={each.id}>

//                                         {each.details.type === 'text' &&
//                                             (<InputCon >
//                                                 <Label>{each.details.name}</Label>
//                                                 <Input
//                                                     type='text'
//                                                     placeholder={each.details.placeholder}
//                                                     value={newGroupData[each.details.name.toLowerCase().replace(/ /g, '_')]}
//                                                     onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
//                                                 />
//                                             </InputCon>)
//                                         }

//                                         {each.details.type === 'select' &&
//                                             (<InputCon >
//                                                 <Label>{each.details.name}</Label>
//                                                 <CustomSelect
//                                                     onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
//                                                     value={newGroupData[each.details.name.toLowerCase().replace(/ /g, '_')]}
//                                                 >
//                                                     {each.details.options.map(opt => (
//                                                         <option key={opt} value={opt}>{opt}</option>
//                                                     ))}

//                                                 </CustomSelect>
//                                             </InputCon>)
//                                         }

//                                         {each.details.type === 'textarea' &&
//                                             (<InputCon >
//                                                 <Label>{each.details.name}</Label>
//                                                 <TextArea
//                                                     placeholder={each.details.placeholder}
//                                                     onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
//                                                     value={newGroupData[each.details.name.toLowerCase().replace(/ /g, '_')]}
//                                                 />
//                                             </InputCon>)
//                                         }

//                                         {each.details.type === 'File Attachment' &&
//                                             (<InputCon >
//                                                 <Label>{each.details.name}</Label>
//                                                 <Input
//                                                     type='file'
//                                                     placeholder={each.details.placeholder}
//                                                     value={newGroupData[each.details.name.toLowerCase().replace(/ /g, '_')]}
//                                                     onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
//                                                 />
//                                             </InputCon>)
//                                         }
//                                     </div>
//                                 ))}

//                                 <SaveUpdateCon>
//                                     <Btn type="submit">ADD</Btn>
//                                 </SaveUpdateCon>
//                             </GroupTableForm>)
//                         }

//                     </FormContent>
//                 </GroupTableCon>
//             </SideNavAndContentContainer>
//         </CreateGroupTableContainer>
//     )
// }


import WONLoader from "../../../../../shared/components/loader";// <-- adjust path

const GroupTableCreateView = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formFields, setFormFields] = useState({});
  const [groupFormFields, setGroupFormFields] = useState([]);

  useEffect(() => {
    const getGroupFormFields = async () => {
      setLoading(true);
      try {
        const data = await GetAddUserFormFields("groups");
        console.log("Group Form Fields:", data?.data);
        if (data?.success === true) {
          setGroupFormFields(data.data);
          let updatedFields = {};
          data.data.forEach((field) => {
            updatedFields[field.name] = {
              value: "",
              isMandatory: field.isMandatory,
            };
          });
          console.log(updatedFields,"updated Fields")
          setFormFields(updatedFields);
        } else {
          alert("No Group Form Fields Found.");
        }
      } catch (error) {
        console.error("Error fetching group fields:", error);
      } finally {
        setLoading(false);
      }
    };
    getGroupFormFields();
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
    setFormFields((prev) => ({
      ...prev,
      [name]: {
        isMandatory: prev[name].isMandatory,
        value: e.target.checked,
      },
    }));
  };

  const onChangeDropdown = (value, field) => {
    setFormFields((prev) => ({
      ...prev,
      [field]: {
        isMandatory: prev[field].isMandatory,
        value: value,
      },
    }));
  };

  const onChangeKeyValue = (newPairs, name) => {
    setFormFields((prev) => ({
      ...prev,
      [name]: {
        isMandatory: prev[name].isMandatory,
        value: newPairs,
      },
    }));
  };

  const onChangeMultiOptions = (newOptions, name) => {
    setFormFields((prev) => ({
      ...prev,
      [name]: {
        isMandatory: prev[name].isMandatory,
        value: newOptions,
      },
    }));
  };

  const onChangeJsonEditor = (newJsonValue, name) => {
    setFormFields((prev) => ({
      ...prev,
      [name]: {
        isMandatory: prev[name].isMandatory,
        value: newJsonValue,
      },
    }));
  };

  const onPhoneNumberChange = (phoneNumber, name) => {
    let value = phoneNumber || "";
    const maxLen = 15;
    const digits = value.replace(/\D/g, "");
    if (digits.length > maxLen) {
      value = value.slice(0, maxLen + (value.startsWith("+") ? 1 : 0));
    }
    setFormFields((prev) => ({
      ...prev,
      [name]: {
        isMandatory: prev[name].isMandatory,
        value,
      },
    }));
  };

  const onTimezoneChange = (value, name) => {
    setFormFields((prev) => ({
      ...prev,
      [name]: {
        isMandatory: prev[name].isMandatory,
        value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("Triggering TryBlock")
      setLoading(true);
      const emptyFields = Object.keys(formFields).filter(
        (field) =>
          formFields[field].isMandatory && formFields[field].value === ""
      );
      if (emptyFields.length > 0) {
        setLoading(false);
        return Swal.fire({
          title: "Missing Mandatory Fields!",
          text: emptyFields.join(", "),
          icon: "warning",
          confirmButtonColor: "#3085d6",
        });
      }
      const response = await CreateNewUser("groups", formFields)
      console.log(response, "response")
      if (!response?.success) {
        const errorText = await response.text();
        throw new Error(`Network error: ${errorText}`);
      }

 
      console.log("Group created successfully:", response);
      navigate("/groups");
    } catch (err) {
      console.log(err, "err")
      console.error("Error creating group:", err);
    } finally {
      setLoading(false);
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
            value={formFields[field.name]?.value || ""}
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
              className="md:w-[30%] text-right flex justify-end gap-2"
            >
              {field.isMandatory && <span className="text-red-500">*</span>}
              {field.label}
            </label>
            <ToggleBtn
              className="w-[70%]"
              id={`active/deactive-${field.label}`}
              isChecked={formFields[field.name]?.value || false}
              handleCheckboxChange={(e) => handleCheckboxChange(e, field.name)}
            />
          </div>
        );
      case "textarea":
        return (
          <FormTextarea
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            value={formFields[field.name]?.value || ""}
            customstyles={field.customstyles}
            isMandatory={field.isMandatory}
            onChangeHandler={onChangeInput}
          />
        );
      case "dropdown":
        return (
          <FormDropdown
            name={field.name}
            label={field.label}
            options={field.options}
            placeholder={field.placeholder}
            value={formFields[field.name]?.value || ""}
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
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            value={formFields[field.name]?.value || []}
            customstyles={field.customstyles}
            isMandatory={field.isMandatory}
            onChange={(pairs) => onChangeKeyValue(pairs, field.name)}
          />
        );
      case "multiOptions":
        return (
          <MultiOptionInput
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            value={formFields[field.name]?.value || []}
            customstyles={field.customstyles}
            isMandatory={field.isMandatory}
            onChange={(opts) => onChangeMultiOptions(opts, field.name)}
          />
        );
      case "jsonEditor":
        return (
          <FormJsonEditor
            name={field.name}
            label={field.label}
            value={formFields[field.name]?.value || ""}
            placeholder={field.placeholder}
            onChangeHandler={(val) => onChangeJsonEditor(val, field.name)}
          />
        );
      case "phone":
        return (
          <FormPhoneInput
            name={field.name}
            label={field.label}
            value={formFields[field.name]?.value || ""}
            placeholder={field.placeholder}
            onChangeHandler={onPhoneNumberChange}
          />
        );
      case "timezone":
        return (
          <TimezoneSelectDropdown
            name={field.name}
            label={field.label}
            value={formFields[field.name]?.value || ""}
            onChangeHandler={onTimezoneChange}
          />
        );
      default:
        return null;
    }
  };
  const allRequiredFilled = Object.keys(formFields).every(
    (field) =>
      !formFields[field].isMandatory || formFields[field].value !== ""
  );
  // console.log(formFields,"Form Fields here")
  return (
    <div className="w-full h-full overflow-auto flex flex-col gap-2 pb-4">
      <div className="h-[10%] flex items-center gap-4 px-4">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-700 hover:text-black bg-transparent"
        >
          <IoIosArrowBack size={30} />
        </button>
        <h3 className="text-2xl font-semibold m-0">New Group</h3>
        <button
          onClick={handleSubmit}
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
        <form
          onSubmit={handleSubmit}
          className="w-full h-[90%] self-center gap-6 rounded-lg"
        >
          <div className="h-fit md:h-[90%] w-full flex flex-col md:flex-row justify-between self-center overflow-auto md:px-10 px-2">
            {groupFormFields?.length > 0 ? (
              <>
                <div className="w-full md:w-1/2 h-fit gap-4 flex flex-col p-2">
                  {groupFormFields
                    .filter((_, i) => i % 2 === 0)
                    .map((field) =>
                      renderForField({
                        ...field,
                        value: formFields[field.name]?.value,
                      })
                    )}
                </div>
                <div className="w-full md:w-1/2 h-fit gap-4 flex flex-col p-2">
                  {groupFormFields
                    .filter((_, i) => i % 2 !== 0)
                    .map((field) =>
                      renderForField({
                        ...field,
                        value: formFields[field.name]?.value,
                      })
                    )}
                </div>
              </>
            ) : (
              <div className="w-full h-full min-h-[50vh] flex items-center justify-center text-2xl text-gray-400 text-center">
                <p>No Group Form</p>
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default GroupTableCreateView;

