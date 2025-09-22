import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import Cookies from 'js-cookie'

// // ICON IMPORTS

import { IoIosArrowBack } from "react-icons/io";

// import {
//     BackBtn,
//     BtnsCon,
//     CustomContainer,
//     CustomViewContainer,
//     FormContent,
//     HeaderNBtnCon,
//     HeaderTag,
//     Heading,
//     Input,
//     InputCon,
//     Label,
//     SideNavNContentContainer,
//     TextArea,
//     UpdateAndSaveBtns,
//     UpdateBtn,
//     CustomSelect
// } from './StyledComponents';

// const CreateDepartment = () => {
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false)
//     const [formFields, setFormFields] = useState([])

//     const [newDepartmentData, setNewDepartmentData] = useState({})

//     useEffect(() => {
//         const getUserFormFields = async (department, category, subCategory) => {
//             setLoading(true);
//             let data
//             const url = `http://localhost:3001/AdminPortalForms/${subCategory}/${category}/${department}`
//             const options = {
//                 method: 'GET'
//             }

//             try {
//                 const response = await fetch(url, options)
//                 data = await response.json()
//                 setFormFields(data.AdminFormsData[0].fields)
//                 console.log('heyy', data.AdminFormsData[0].fields)
//             } catch (error) {
//                 console.error('Error fetching fields:', error);
//             } finally {
//                 setLoading(false);
//             }

//             return data.AdminFormsData
//         }

//         getUserFormFields('Global', 'Core Forms', 'Departments Form')
//     }, [])

//     const onChangeInputField = (fieldName, value) => {
//         const snake_case = fieldName.replace(/ /g, '_')
//         setNewDepartmentData((prevState) => ({
//             ...prevState,
//             [snake_case]: value,
//         }))
//     }

//     const addDepartment = async (e) => {
//         e.preventDefault()
//         // console.log(Cookies.get('accessToken'),"Access token")
//         console.log('New Department Data:', newDepartmentData)
//         const url = `http://localhost:3001/department/newDepartment`
//         const options = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                'authorization': `Bearer ${Cookies.get('accessToken')}`
//             },
//             body: JSON.stringify(newDepartmentData)
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
//             console.error('error adding user', error)
//         }

//         setNewDepartmentData({})
//     }

//     const OnBack = () => navigate(-1)

//     return (
//         <CustomViewContainer>
//             <SideNavNContentContainer>
//                 <CustomContainer>
//                     <FormContent onSubmit={addDepartment}>
//                         <HeaderNBtnCon>
//                             <Heading>
//                                 <BackBtn type='button' onClick={OnBack}>
//                                     <IoIosArrowBack size={26} />
//                                 </BackBtn>
//                                 <HeaderTag>Create Department</HeaderTag>
//                             </Heading>

//                         </HeaderNBtnCon>

//                         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'px' }}>

//                             {formFields && formFields.map(each => (
//                                 <div key={each.id}>

//                                     {(each.details.type === 'text' || each.details.type === 'number' || each.details.type === 'checkbox' || each.details.type === 'email') && (
//                                         <InputCon key={each.id}>
//                                             <Label>{each.details.name}</Label>
//                                             {each.details.type !== 'checkbox' ? (
//                                                 <Input
//                                                     type={each.details.type}
//                                                     placeholder={each.details.placeholder}
//                                                     onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
//                                                     value={newDepartmentData[each.details.name.toLowerCase().replace(/ /g, '_')]}
//                                                 />
//                                             ) : (
//                                                 <Input
//                                                     type={each.details.type}
//                                                     onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.checked)}
//                                                     checked={newDepartmentData[each.details.name.toLowerCase().replace(/ /g, '_')]}
//                                                 />
//                                             )}
//                                         </InputCon>
//                                     )}

//                                     {each.details.type === 'file attachment' && (
//                                         <InputCon>
//                                             <Label>{each.details.name}:</Label>
//                                             <Input
//                                                 type='file'
//                                                 placeholder={each.details.placeholder}
//                                                 onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
//                                                 value={newDepartmentData[each.details.name.toLowerCase().replace(/ /g, '_')]}
//                                             />
//                                         </InputCon>
//                                     )}

//                                     {each.details.type === 'textarea' && (
//                                         <InputCon>
//                                             <Label>{each.details.name}:</Label>
//                                             <TextArea
//                                                 placeholder={each.details.placeholder}
//                                                 onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
//                                                 value={newDepartmentData[each.details.name.toLowerCase().replace(/ /g, '_')]}
//                                             />
//                                         </InputCon>
//                                     )}

//                                     {each.details.type === 'select' && (
//                                         <InputCon>
//                                             <Label>{each.details.name}:</Label>
//                                             <CustomSelect
//                                                 onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
//                                                 value={newDepartmentData[each.details.name.toLowerCase().replace(/ /g, '_')]}
//                                             >
//                                                 {each.details.options.map(opt => (
//                                                     <option key={opt} value={opt}>{opt}</option>
//                                                 ))}
//                                             </CustomSelect>
//                                         </InputCon>
//                                     )}

//                                 </div>

//                             ))}
//                         </div>

//                         {/* <FieldsCon>

//                             <LeftFields>
//                                 <InputCon>
//                                     <Label>Name</Label>
//                                     <InputAndIconCon>
//                                         <Input
//                                             type='text'
//                                             value={formData.departmentName}
//                                             onChange={(e) => handleChange('departmentName', e.target.value)} />
//                                     </InputAndIconCon>
//                                 </InputCon>

//                                 <InputCon>
//                                     <Label>Description</Label>
//                                     <InputAndIconCon>
//                                         <TextArea rows={3}
//                                             value={formData.description}
//                                             onChange={(e) => handleChange('description', e.target.value)}
//                                         />
//                                     </InputAndIconCon>
//                                 </InputCon>
//                             </LeftFields>

//                             <RightFields>
//                                 <InputCon>
//                                     <Label>Manager</Label>
//                                     <InputAndIconCon>
//                                         <Input type='text'
//                                             value={formData.manager}
//                                             onChange={(e) => handleChange('manager', e.target.value)}
//                                         />
//                                         <IoIosSearch size={21} style={{ color: '#bababa', border: '2px' }} />
//                                     </InputAndIconCon>
//                                 </InputCon>

//                                 <InputCon>
//                                     <Label>Contact No</Label>
//                                     <InputAndIconCon>
//                                         <Input type='text'
//                                             value={formData.contactNo}
//                                             onChange={(e) => handleChange('contactNo', e.target.value)}
//                                         />
//                                         <IoIosSearch size={21} style={{ color: '#bababa', border: '2px' }} />
//                                     </InputAndIconCon>
//                                 </InputCon>

//                             </RightFields>

//                         </FieldsCon> */}

//                         {/* <BtnsCon> */}
//                             <UpdateBtn type="submit" className="self-start">Add</UpdateBtn>
//                         {/* </BtnsCon> */}

//                         <UpdateAndSaveBtns>

//                         </UpdateAndSaveBtns>

//                     </FormContent>
//                 </CustomContainer>

//             </SideNavNContentContainer>

//         </CustomViewContainer>
//     )
// }
// export default CreateDepartment

import WONLoader from "../../../../../shared/components/loader";
import { GetAddUserFormFields } from "../../../../../utils/CheckAndExecuteFlows/CRUDoperations";
import FormInput from "../../../../../shared/UIElements/FormInput";
import FormDropdown from "../../../../../shared/UIElements/FormDropdown";
import FormTextarea from "../../../../../shared/UIElements/FormTextarea";
import FormPhoneInput from '../../../../../shared/components/PhoneInput';
import { CreateNewUser } from "../../../../../utils/CheckAndExecuteFlows/CRUDoperations";


const GroupTableCreateView = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formFields, setFormFields] = useState({});
  const [groupFormFields, setGroupFormFields] = useState([]);

  useEffect(() => {
    const getGroupFormFields = async () => {
      setLoading(true);
      try {
        const data = await GetAddUserFormFields("department");
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
  const onChangeDropdown = (value, field) => {
    setFormFields((prev) => ({
      ...prev,
      [field]: {
        isMandatory: prev[field].isMandatory,
        value: value,
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Triggering TryBlock")
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
      const response = await CreateNewUser("department", formFields)
      console.log(response, "response")
      if (!response.success) {
        const errorText = await response.text();
        throw new Error(`Network error: ${errorText}`);
      }    
      console.log("Department created successfully:", response);
      navigate("/departments");
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
            iconName={field.iconName}
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
      case "phone":
        return (
          <FormPhoneInput
            name={field.name}
            label={field.label}
            value={formFields[field.name]?.value || ""}
            placeholder={field.placeholder}
            onChangeHandler={onPhoneNumberChange}
            iconName={field.iconName}
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
        <h3 className="text-2xl font-semibold m-0">New Department</h3>
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
