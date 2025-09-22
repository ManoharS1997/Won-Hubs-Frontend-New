import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

// ICON IMPORTS
import { IoIosSearch } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";


import {
    BackBtn,
    BtnsCon,
    CustomContainer,
    CustomViewContainer,
    DeleteBtn,
    FieldsCon,
    FormContent,
    HeaderNBtnCon,
    HeaderTag,
    Input,
    InputAndIconCon,
    InputCheckBox,
    InputCon,
    Label,
    LeftFields,
    RightFields,
    SideNavAndDetailContainer,
    TextArea,
    UpdateBtn,
    ViewNameAndNumber
} from './StyledComponents';


const DepartmentDetailsView = () => {
    let { id } = useParams();

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        departmentName: '',
        departmentId: '',
        manager: '',
        description: '',
        contactNo: '',
        active: true,
    })

    useEffect(() => {
        getDepartmentDetails()
    }, [])

    const getDepartmentDetails = async () => {
        const url = `http://localhost:3001/department/${id}`
        const options = {
            method: 'GET',
        }
        const response = await fetch(url, options)
        const data = await response.json()
        setFormData({
            departmentName: data.department[0].department_name,
            departmentId: data.department[0].department_id,
            manager: data.department[0].manager,
            description: data.department[0].description,
            contactNo: data.department[0].contact_no,
            active: data.department[0].active,
        })
    }

    const updateDepartment = async (e) => {
        e.preventDefault()
        const url = `http://localhost:3001/department/update/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }
        const response = await fetch(url, options)
    }

    const handleChange = (fieldName, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,

        }))
    };

    const handleDelete = () => {
        console.log('write functionality for Delete button')
    }

    const OnBack = () => {
        // Navigate to a specific route
        navigate(-1)
    };

    return (
        <CustomViewContainer>
            <SideNavAndDetailContainer>
                <CustomContainer>

                    <FormContent>
                        <HeaderNBtnCon>
                            <BackBtn onClick={OnBack}>
                                <IoIosArrowBack size={26} />
                            </BackBtn>
                            <HeaderTag>Department</HeaderTag>
                        </HeaderNBtnCon>

                        <ViewNameAndNumber>{formData.departmentName} {formData.departmentId}</ViewNameAndNumber>

                        <FieldsCon>
                            <LeftFields>
                                <InputCon>
                                    <Label>Department Name</Label>
                                    <InputAndIconCon>
                                        <Input
                                            placeholder="Enter Name"
                                            type='text'
                                            value={formData.departmentName}
                                            onChange={(e) => handleChange('departmentName', e.target.value)} />
                                    </InputAndIconCon>
                                </InputCon>

                                <InputCon>
                                    <Label>ID</Label>
                                    <InputAndIconCon>
                                        <Input
                                            placeholder="Enter ID"
                                            type='text'
                                            value={formData.departmentId}
                                        />
                                    </InputAndIconCon>
                                </InputCon>

                                <InputCon>
                                    <Label>Manager</Label>
                                    <InputAndIconCon>
                                        <Input
                                            placeholder="Enter Parent"
                                            type='text'
                                            value={formData.manager}
                                            onChange={(e) => handleChange('manager', e.target.value)}
                                        />
                                        <IoIosSearch size={21} style={{ color: '#bababa', border: '2px' }} />
                                    </InputAndIconCon>
                                </InputCon>

                                <InputCon>
                                    <Label>Description</Label>
                                    <InputAndIconCon>
                                        <TextArea
                                            value={formData.description}
                                            onChange={(e) => handleChange('description', e.target.value)}
                                        />
                                    </InputAndIconCon>
                                </InputCon>
                            </LeftFields>

                            <RightFields>
                                <InputCon>
                                    <Label>Contact Number</Label>
                                    <InputAndIconCon>
                                        <Input
                                            placeholder="Enter Department Head"
                                            type='text'
                                            value={formData.contactNo}
                                            onChange={(e) => handleChange('contactNo', e.target.value)}
                                        />
                                        <IoIosSearch size={21} style={{ color: '#bababa', border: '2px' }} />
                                    </InputAndIconCon>
                                </InputCon>

                                <InputCon>
                                    <Label>Active</Label>
                                    <InputCheckBox
                                        type='checkbox'
                                        checked={formData.active === 'true'}
                                        onChange={(e) => handleChange('Active', e.target.value)}
                                    />
                                </InputCon>
                            </RightFields>
                        </FieldsCon>

                        <BtnsCon>
                            <UpdateBtn onClick={updateDepartment} type="buttton">Update</UpdateBtn>
                            <DeleteBtn onClick={handleDelete}>Delete</DeleteBtn>
                        </BtnsCon>
                    </FormContent>

                </CustomContainer>

            </SideNavAndDetailContainer>


        </CustomViewContainer>
    )
}

export default DepartmentDetailsView