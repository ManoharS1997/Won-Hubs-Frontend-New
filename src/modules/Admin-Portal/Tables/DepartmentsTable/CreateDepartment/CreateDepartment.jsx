import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

// ICON IMPORTS
import { IoIosArrowBack } from "react-icons/io";

import {
    BackBtn,
    BtnsCon,
    CustomContainer,
    CustomViewContainer,
    FormContent,
    HeaderNBtnCon,
    HeaderTag,
    Heading,
    Input,
    InputCon,
    Label,
    SideNavNContentContainer,
    TextArea,
    UpdateAndSaveBtns,
    UpdateBtn,
    CustomSelect
} from './StyledComponents';

const CreateDepartment = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [formFields, setFormFields] = useState([])

    const [newDepartmentData, setNewDepartmentData] = useState({})

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

        getUserFormFields('Global', 'Core Forms', 'Departments Form')
    }, [])

    const onChangeInputField = (fieldName, value) => {
        const snake_case = fieldName.replace(/ /g, '_')
        setNewDepartmentData((prevState) => ({
            ...prevState,
            [snake_case]: value,
        }))
    }

    const addDepartment = async (e) => {
        e.preventDefault()
        const url = `http://localhost:3001/department/newDepartment`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newDepartmentData)
        }

        try {
            const response = await fetch(url, options)
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${errorText}`);
            }
            const result = await response.json();
            console.log('User added successfully:', result);
        }
        catch (error) {
            console.error('error adding user', error)
        }

        setNewDepartmentData({})
    }

    const OnBack = () => navigate(-1)

    return (
        <CustomViewContainer>
            <SideNavNContentContainer>
                <CustomContainer>
                    <FormContent onSubmit={addDepartment}>
                        <HeaderNBtnCon>
                            <Heading>
                                <BackBtn type='button' onClick={OnBack}>
                                    <IoIosArrowBack size={26} />
                                </BackBtn>
                                <HeaderTag>Create Department</HeaderTag>
                            </Heading>

                        </HeaderNBtnCon>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'px' }}>

                            {formFields && formFields.map(each => (
                                <div key={each.id}>

                                    {(each.details.type === 'text' || each.details.type === 'number' || each.details.type === 'checkbox' || each.details.type === 'email') && (
                                        <InputCon key={each.id}>
                                            <Label>{each.details.name}</Label>
                                            {each.details.type !== 'checkbox' ? (
                                                <Input
                                                    type={each.details.type}
                                                    placeholder={each.details.placeholder}
                                                    onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
                                                    value={newDepartmentData[each.details.name.toLowerCase().replace(/ /g, '_')]}
                                                />
                                            ) : (
                                                <Input
                                                    type={each.details.type}
                                                    onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.checked)}
                                                    checked={newDepartmentData[each.details.name.toLowerCase().replace(/ /g, '_')]}
                                                />
                                            )}
                                        </InputCon>
                                    )}

                                    {each.details.type === 'file attachment' && (
                                        <InputCon>
                                            <Label>{each.details.name}:</Label>
                                            <Input
                                                type='file'
                                                placeholder={each.details.placeholder}
                                                onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
                                                value={newDepartmentData[each.details.name.toLowerCase().replace(/ /g, '_')]}
                                            />
                                        </InputCon>
                                    )}

                                    {each.details.type === 'textarea' && (
                                        <InputCon>
                                            <Label>{each.details.name}:</Label>
                                            <TextArea
                                                placeholder={each.details.placeholder}
                                                onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
                                                value={newDepartmentData[each.details.name.toLowerCase().replace(/ /g, '_')]}
                                            />
                                        </InputCon>
                                    )}

                                    {each.details.type === 'select' && (
                                        <InputCon>
                                            <Label>{each.details.name}:</Label>
                                            <CustomSelect
                                                onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
                                                value={newDepartmentData[each.details.name.toLowerCase().replace(/ /g, '_')]}
                                            >
                                                {each.details.options.map(opt => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </CustomSelect>
                                        </InputCon>
                                    )}

                                </div>

                            ))}
                        </div>

                        {/* <FieldsCon>

                            <LeftFields>
                                <InputCon>
                                    <Label>Name</Label>
                                    <InputAndIconCon>
                                        <Input
                                            type='text'
                                            value={formData.departmentName}
                                            onChange={(e) => handleChange('departmentName', e.target.value)} />
                                    </InputAndIconCon>
                                </InputCon>

                                <InputCon>
                                    <Label>Description</Label>
                                    <InputAndIconCon>
                                        <TextArea rows={3}
                                            value={formData.description}
                                            onChange={(e) => handleChange('description', e.target.value)}
                                        />
                                    </InputAndIconCon>
                                </InputCon>
                            </LeftFields>

                            <RightFields>
                                <InputCon>
                                    <Label>Manager</Label>
                                    <InputAndIconCon>
                                        <Input type='text'
                                            value={formData.manager}
                                            onChange={(e) => handleChange('manager', e.target.value)}
                                        />
                                        <IoIosSearch size={21} style={{ color: '#bababa', border: '2px' }} />
                                    </InputAndIconCon>
                                </InputCon>

                                <InputCon>
                                    <Label>Contact No</Label>
                                    <InputAndIconCon>
                                        <Input type='text'
                                            value={formData.contactNo}
                                            onChange={(e) => handleChange('contactNo', e.target.value)}
                                        />
                                        <IoIosSearch size={21} style={{ color: '#bababa', border: '2px' }} />
                                    </InputAndIconCon>
                                </InputCon>

                            </RightFields>

                        </FieldsCon> */}

                        <BtnsCon>
                            <UpdateBtn type="submit">Add</UpdateBtn>
                        </BtnsCon>

                        <UpdateAndSaveBtns>

                        </UpdateAndSaveBtns>

                    </FormContent>
                </CustomContainer>

            </SideNavNContentContainer>

        </CustomViewContainer>
    )
}
export default CreateDepartment