import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import Swal  from 'sweetalert2'

// import {
//     BackBtn, BtnsCon, CreateLocationsContainer, CustomViewContainer,
//     FieldsCon, FormContent, Heading, HeaderTag, Input,
//     InputCon, Label, SaveBtn, SideNavNContentContainer
// } from './StyledComponents'

// const CreateLocations = () => {
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false)
//     const [formFields, setFormFields] = useState([])
//     const [newLocationData, setNewLocationData] = useState({})

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
//                 // console.log('heyy', data.AdminFormsData[0].fields)
//             } catch (error) {
//                 console.error('Error fetching fields:', error);
//             } finally {
//                 setLoading(false);
//             }

//             return data.AdminFormsData
//         }

//         getUserFormFields('Global', 'Core Forms', 'Locations Form')
//     }, [])

//     const onChangeInputField = (fieldName, value) => {
//         const snake_case = fieldName.replace(/ /g, '_')
//         setNewLocationData((prevState) => ({
//             ...prevState,
//             [snake_case]: value,
//         }))
//     }

//     const addLocation = async (e) => {
//         // console.log(Cookies.get('accessToken'),"token heree")
//         console.log('New Location Data:', newLocationData)

//         e.preventDefault()
//         const url = `http://localhost:3001/location/newLocation`
//         const options = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'authorization': `Bearer ${Cookies.get('accessToken')}`
//             },
//             body: JSON.stringify(newLocationData)
//         }

//         try {
//             const response = await fetch(url, options)
//             if (!response.ok) {
//                 const errorText = await response.text();
//                 throw new Error(`Network response was not ok: ${errorText}`);
//             }
//             const result = await response.json();
//             console.log('Location added successfully:', result);
//         }
//         catch (error) {
//             console.error('error adding Location', error)
//         }

//         setNewLocationData({})
//     }


//     const OnBack = () => navigate(-1)

//     console.log('locationData', newLocationData)

//     return (
//         <CustomViewContainer>
//             <SideNavNContentContainer>
//                 <CreateLocationsContainer>
//                     <FormContent>
//                         <Heading>
//                             <BackBtn onClick={OnBack}>
//                                 <IoIosArrowBack size={26} />
//                             </BackBtn>
//                             <HeaderTag>Create Location</HeaderTag>
//                         </Heading>

//                         <FieldsCon onSubmit={addLocation}>

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
//                                                     value={newLocationData[each.details.name.toLowerCase().replace(/ /g, '_')]}
//                                                 />
//                                             ) : (
//                                                 <Input
//                                                     type={each.details.type}
//                                                     onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.checked)}
//                                                     checked={newLocationData[each.details.name.toLowerCase().replace(/ /g, '_')]}
//                                                 />
//                                             )}
//                                         </InputCon>
//                                     )}

//                                     {each.details.type === 'select' && (
//                                         <InputCon key={each.id}>
//                                             <Label >{each.details.name}</Label>
//                                             <select
//                                                 onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
//                                                 value={newLocationData[each.details.name.toLowerCase().replace(/ /g, '_')]}
//                                             >
//                                                 {each.details.options.map(opt => (
//                                                     <option key={opt} value={opt}>{opt}</option>
//                                                 ))}
//                                             </select>
//                                         </InputCon>)}

//                                     {each.details.type === 'textarea' && (
//                                         <InputCon key={each.id}>
//                                             <Label>{each.details.name}</Label>
//                                             <textarea
//                                                 placeholder={each.details.placeholder}
//                                                 onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
//                                                 value={newLocationData[each.details.name.toLowerCase().replace(/ /g, '_')]}
//                                             />
//                                         </InputCon>
//                                     )}

//                                     {each.details.type === 'file attachment' && (
//                                         <InputCon key={each.id}>
//                                             <Label>{each.details.name}</Label>
//                                             <Input
//                                                 type='file'
//                                                 placeholder={each.details.placeholder}
//                                                 onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
//                                                 value={newLocationData[each.details.name.toLowerCase().replace(/ /g, '_')]}
//                                             />
//                                         </InputCon>
//                                     )}

//                                 </div>
//                             ))}

//                             {/* <InputCon>
//                                 <Label>Location Name</Label>
//                                 <Input
//                                     type='text'
//                                     value={formData.locationName}
//                                     onChange={(e) => handleChange('locationName', e.target.value)} />
//                             </InputCon>

//                             <InputCon>
//                                 <Label>Street</Label>
//                                 <Input
//                                     type='text'
//                                     value={formData.street}
//                                     onChange={(e) => handleChange('street', e.target.value)} />
//                             </InputCon>

//                             <InputCon>
//                                 <Label>City</Label>
//                                 <Input
//                                     type='text'
//                                     value={formData.city}
//                                     onChange={(e) => handleChange('city', e.target.value)} />
//                             </InputCon>

//                             <InputCon>
//                                 <Label>State/Country</Label>
//                                 <Input
//                                     type='text'
//                                     value={formData.stateOrCountry}
//                                     onChange={(e) => handleChange('stateOrCountry', e.target.value)} />
//                             </InputCon>

//                             <InputCon>
//                                 <Label>Postal Code</Label>
//                                 <Input
//                                     type='text'
//                                     value={formData.postalCode}
//                                     onChange={(e) => handleChange('postalCode', e.target.value)} />
//                             </InputCon>

//                             <InputCon>
//                                 <Label>Contact</Label>
//                                 <Input
//                                     type='text'
//                                     value={formData.contact}
//                                     onChange={(e) => handleChange('contact', e.target.value)} />
//                             </InputCon>

//                             <InputCon>
//                                 <Label>Phone No</Label>
//                                 <Input
//                                     type='text'
//                                     value={formData.phoneNo}
//                                     onChange={(e) => handleChange('phoneNo', e.target.value)} />
//                             </InputCon>

//                             <InputCon>
//                                 <Label>Fax No</Label>
//                                 <Input
//                                     type='text'
//                                     value={formData.faxNo}
//                                     onChange={(e) => handleChange('faxNo', e.target.value)} />
//                             </InputCon>

//                             <InputCon>
//                                 <Label>Parent Location</Label>
//                                 <Input
//                                     type='text'
//                                     value={formData.parentLocation}
//                                     onChange={(e) => handleChange('parentLocation', e.target.value)} />
//                             </InputCon> */}

//                             <div className="flex ">
//                                 <button type="submit" className="!bg-blue-400 !rounded h-15 w-20">Submit</button>
//                             </div>
//                         </FieldsCon>
//                     </FormContent>
//                 </CreateLocationsContainer>
//             </SideNavNContentContainer>
//         </CustomViewContainer>
//     )
// }
// export default CreateLocations

import WONLoader from '../../../../../shared/components/loader';
import { GetAddUserFormFields } from '../../../../../utils/CheckAndExecuteFlows/CRUDoperations';
import FormInput from '../../../../../shared/UIElements/FormInput';
import FormDropdown from '../../../../../shared/UIElements/FormDropdown';
import FormPhoneInput from '../../../../../shared/components/PhoneInput';
import { CreateNewUser } from '../../../../../utils/CheckAndExecuteFlows/CRUDoperations';
// export default function CreateCompany() {
//     const navigate = useNavigate()

//     const [loading, setLoading] = useState(true)
//     const [formFields, setFormFields] = useState([])
//     const [newCompanyData, setNewCompanyData] = useState([])
//     const [companyData, setCompanyData] = useState({})

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

//         getUserFormFields('Global', 'Core Forms', 'Companies Form')
//     }, [])

//     const onChangeInputField = (fieldName, value) => {
//         const snake_case = fieldName.replace(/ /g, '_')
//         setNewCompanyData((prevState) => ({
//             ...prevState,
//             [snake_case]: value,
//         }))
//     }

//     const onBackbtn = () => {
//         navigate(-1)
//     }

//     const addCompany = async (e) => {
//         e.preventDefault()
//         const url = `http://localhost:3001/company/newCompany`
//         const options = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'authorization':`Bearer ${Cookies.get('accessToken')}`
//             },
//             body: JSON.stringify(newCompanyData),
//         }

//         try {
//             const response = await fetch(url, options)
//             if (!response.ok) {
//                 const errorText = await response.text();
//                 throw new Error(`Network response was not ok: ${errorText}`);
//             }
//             const result = await response.json();
//             console.log('Company added successfully:', result);
//         }
//         catch (error) {
//             console.error('error adding user', error)
//         }

//         setCompanyData({})
//     };
//     //  console.log(newCompanyData,"company Data Here")
//     return (
//         <WonContext.Consumer>
//             {value => {
//                 const { openSettings } = value

//                 return (
//                     <CreateTableContainer>
//                         <CreateCompanyDetailsContainer>
//                             <CustomContainer>
//                                 <CompanyFormDetailsContainer>
//                                     <CompanyForm onSubmit={addCompany} >
//                                         {loading ?
//                                             (<Loader>
//                                                 <Bar />
//                                                 <Bar />
//                                                 <Bar />
//                                             </Loader>) : (
//                                                 <>
//                                                     <BackBtn type='button' onClick={onBackbtn}><IoIosArrowBack size={30} /></BackBtn>
//                                                     <FormTitle>New Company</FormTitle>

//                                                     {formFields && formFields.map(each => (
//                                                         <div key={each.id}>

//                                                             {(each.details.type === 'text' || each.details.type === 'number') && (<InputField>
//                                                                 <CustomLabel>{each.details.name}</CustomLabel>
//                                                                 <CustomInput
//                                                                     type={each.details.type}
//                                                                     placeholder={each.details.placeholder}
//                                                                     onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
//                                                                     value={newCompanyData[each.details.name.toLowerCase().replace(/ /g, '_')]}
//                                                                 />
//                                                             </InputField>)}

//                                                             {each.details.type === 'File Attachment' && (<InputField>
//                                                                 <CustomLabel>{each.details.name}</CustomLabel>
//                                                                 <CustomInput
//                                                                     type='file'
//                                                                     placeholder={each.details.placeholder}
//                                                                     onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
//                                                                     value={newCompanyData[each.details.name.toLowerCase().replace(/ /g, '_')]}
//                                                                 />
//                                                             </InputField>)}

//                                                             {each.details.type === 'select' && (<InputField>
//                                                                 <CustomLabel>{each.details.name}</CustomLabel>
//                                                                 <CustomSelect
//                                                                     onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
//                                                                     value={newCompanyData[each.details.name.toLowerCase().replace(/ /g, '_')]}
//                                                                 >
//                                                                     {each.details.options.map(opt => (
//                                                                         <CustomOption key={opt} value={opt}>{opt}</CustomOption>
//                                                                     ))}
//                                                                 </CustomSelect>
//                                                             </InputField>)}

//                                                             {each.details.type === 'TextArea' && (
//                                                                 <InputField key={each.id}>
//                                                                     <CustomLabel>{each.details.name}</CustomLabel>
//                                                                     <TextAreaTag
//                                                                         placeholder={each.details.placeholder}
//                                                                         onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
//                                                                         value={newCompanyData[each.details.name.toLowerCase().replace(/ /g, '_')]}
//                                                                     />
//                                                                 </InputField>
//                                                             )}

//                                                         </div>
//                                                     ))}

//                                                     <SubmitBtn type='submit' >Submit</SubmitBtn>
//                                                 </>
//                                             )}

//                                     </CompanyForm>

//                                 </CompanyFormDetailsContainer>
//                                 {/* {openSettings ? <Settings /> : null} */}
//                             </CustomContainer>

//                         </CreateCompanyDetailsContainer>


//                     </CreateTableContainer>
//                 )
//             }}
//         </WonContext.Consumer>
//     )
// }

const CreateLocation = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formFields, setFormFields] = useState({});
    const [groupFormFields, setGroupFormFields] = useState([]);

    useEffect(() => {
        const getCompanyFormFields = async () => {
            setLoading(true);
            try {
                const data = await GetAddUserFormFields("location");
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
        getCompanyFormFields();
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

            //   const url = "http://localhost:3001/groups/newGroup";
            const response = await CreateNewUser("locations", formFields)
            console.log(response, "response")


            if (!response.success) {
                const errorText = await response.text();
                throw new Error(`Network error: ${errorText}`);
            }

           
            console.log("Group created successfully:", response);
            navigate("/locations");
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
    console.log(formFields, "Form Fields here")
    return (
        <div className="w-full h-full overflow-auto flex flex-col gap-2 pb-4">
            <div className="h-[10%] flex items-center gap-4 px-4">
                <button
                    onClick={() => navigate(-1)}
                    className="text-gray-700 hover:text-black bg-transparent"
                >
                    <IoIosArrowBack size={30} />
                </button>
                <h3 className="text-2xl font-semibold m-0">New
                    Location
                </h3>
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

export default CreateLocation;