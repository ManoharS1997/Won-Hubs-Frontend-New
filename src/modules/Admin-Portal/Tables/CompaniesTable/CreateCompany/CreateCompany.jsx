import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// COMPONENT IMPORTS
import Settings from '../../../Settings/pages/Settings'
import WonContext from '../../../../../context/WonContext';

// ICON IMPORTS
import { IoIosArrowBack } from "react-icons/io";

import {
    BackBtn,
    Bar,
    CompanyForm,
    CompanyFormDetailsContainer,
    CreateCompanyDetailsContainer,
    CreateTableContainer,
    CustomContainer,
    CustomInput,
    CustomLabel,
    CustomOption,
    CustomSelect,
    FormTitle,
    InputField,
    Loader,
    SubmitBtn,
    TextAreaTag
} from './StyledComponents';

export default function CreateCompany() {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [formFields, setFormFields] = useState([])
    const [newCompanyData, setNewCompanyData] = useState([])
    const [companyData, setCompanyData] = useState({})

    useEffect(() => {
        const getUserFormFields = async (department, category, subCategory) => {
            setLoading(true);
            let data
            const url = `http://localhost:3001/AdminPortalForms/${subCategory}/${category}/${department}`
            const options = {
                method: 'GET'
            }

            try {
                const response = await fetch(url, options)
                data = await response.json()
                setFormFields(data.AdminFormsData[0].fields)
                console.log('heyy', data.AdminFormsData[0].fields)
            } catch (error) {
                console.error('Error fetching fields:', error);
            } finally {
                setLoading(false);
            }

            return data.AdminFormsData
        }

        getUserFormFields('Global', 'Core Forms', 'Companies Form')
    }, [])

    const onChangeInputField = (fieldName, value) => {
        const snake_case = fieldName.replace(/ /g, '_')
        setNewCompanyData((prevState) => ({
            ...prevState,
            [snake_case]: value,
        }))
    }

    const onBackbtn = () => {
        navigate(-1)
    }

    const addCompany = async (e) => {
        e.preventDefault()
        const url = `http://localhost:3001/company/newCompany`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(companyData),
        }

        try {
            const response = await fetch(url, options)
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${errorText}`);
            }
            const result = await response.json();
            console.log('Company added successfully:', result);
        }
        catch (error) {
            console.error('error adding user', error)
        }

        setCompanyData({})
    };

    return (
        <WonContext.Consumer>
            {value => {
                const { openSettings } = value

                return (
                    <CreateTableContainer>
                        <CreateCompanyDetailsContainer>
                            <CustomContainer>
                                <CompanyFormDetailsContainer>
                                    <CompanyForm onSubmit={addCompany} >
                                        {loading ?
                                            (<Loader>
                                                <Bar />
                                                <Bar />
                                                <Bar />
                                            </Loader>) : (
                                                <>
                                                    <BackBtn type='button' onClick={onBackbtn}><IoIosArrowBack size={30} /></BackBtn>
                                                    <FormTitle>New Company</FormTitle>

                                                    {formFields && formFields.map(each => (
                                                        <div key={each.id}>

                                                            {(each.details.type === 'text' || each.details.type === 'number') && (<InputField>
                                                                <CustomLabel>{each.details.name}</CustomLabel>
                                                                <CustomInput
                                                                    type={each.details.type}
                                                                    placeholder={each.details.placeholder}
                                                                    onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
                                                                    value={newCompanyData[each.details.name.toLowerCase().replace(/ /g, '_')]}
                                                                />
                                                            </InputField>)}

                                                            {each.details.type === 'File Attachment' && (<InputField>
                                                                <CustomLabel>{each.details.name}</CustomLabel>
                                                                <CustomInput
                                                                    type='file'
                                                                    placeholder={each.details.placeholder}
                                                                    onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
                                                                    value={newCompanyData[each.details.name.toLowerCase().replace(/ /g, '_')]}
                                                                />
                                                            </InputField>)}

                                                            {each.details.type === 'select' && (<InputField>
                                                                <CustomLabel>{each.details.name}</CustomLabel>
                                                                <CustomSelect
                                                                    onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
                                                                    value={newCompanyData[each.details.name.toLowerCase().replace(/ /g, '_')]}
                                                                >
                                                                    {each.details.options.map(opt => (
                                                                        <CustomOption key={opt} value={opt}>{opt}</CustomOption>
                                                                    ))}
                                                                </CustomSelect>
                                                            </InputField>)}

                                                            {each.details.type === 'TextArea' && (
                                                                <InputField key={each.id}>
                                                                    <CustomLabel>{each.details.name}</CustomLabel>
                                                                    <TextAreaTag
                                                                        placeholder={each.details.placeholder}
                                                                        onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
                                                                        value={newCompanyData[each.details.name.toLowerCase().replace(/ /g, '_')]}
                                                                    />
                                                                </InputField>
                                                            )}

                                                        </div>
                                                    ))}

                                                    <SubmitBtn type='submit' >Submit</SubmitBtn>
                                                </>
                                            )}

                                    </CompanyForm>

                                </CompanyFormDetailsContainer>
                                {/* {openSettings ? <Settings /> : null} */}
                            </CustomContainer>

                        </CreateCompanyDetailsContainer>


                    </CreateTableContainer>
                )
            }}
        </WonContext.Consumer>
    )
}