import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";

import {
    BackBtn,
    Btn,
    Bar,
    CreateGroupTableContainer,
    CustomSelect,
    FormContent,
    GroupTableCon,
    GroupTableForm,
    HeaderContainer,
    HeaderTag,
    Input,
    InputCon,
    Label,
    Loader,
    SaveUpdateCon,
    SideNavAndContentContainer,
    TextArea
} from './StyledComponents'


const getRandomFourDigitNumber = () => Math.floor(1000 + Math.random() * 9000)

const GroupTableCreateView = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formFields, setFormFields] = useState('')
    const [newGroupData, setNewGroupData] = useState({})

    const [formData, SetFormData] = useState({
        groupName: '',
        groupId: getRandomFourDigitNumber(),
        manager: '',
        email: '',
        parentGroup: '',
        groupTypeDescription: '',
        groupType: '',
        region: '',
    })

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

        getUserFormFields('Global', 'Core Forms', 'Groups Form')
    }, [])

    const onChangeInputField = (fieldName, value) => {
        const snake_case = fieldName.replace(/ /g, '_')
        setNewGroupData((prevState) => ({
            ...prevState,
            [snake_case]: value,
        }))
    }

    const addGroup = async (e) => {
        e.preventDefault()
        console.log(formData)

        const url = 'http://localhost:3001/groups/newGroup'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
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
            console.error('error adding Group', error)
        }

        SetFormData({})
    }

    const OnBack = () => navigate(-1)

    return (
        <CreateGroupTableContainer>
            <SideNavAndContentContainer>
                <GroupTableCon>
                    <FormContent>
                        <HeaderContainer>
                            <BackBtn onClick={OnBack}>
                                <IoIosArrowBack size={35} />
                            </BackBtn>
                            <HeaderTag>Create Group</HeaderTag>
                        </HeaderContainer>

                        {loading ?
                            (<Loader>
                                <Bar />
                                <Bar />
                                <Bar />
                            </Loader>)
                            :
                            (<GroupTableForm onSubmit={addGroup} >
                                {formFields && formFields.map(each => (
                                    <div key={each.id}>

                                        {each.details.type === 'text' &&
                                            (<InputCon >
                                                <Label>{each.details.name}</Label>
                                                <Input
                                                    type='text'
                                                    placeholder={each.details.placeholder}
                                                    value={newGroupData[each.details.name.toLowerCase().replace(/ /g, '_')]}
                                                    onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
                                                />
                                            </InputCon>)
                                        }

                                        {each.details.type === 'select' &&
                                            (<InputCon >
                                                <Label>{each.details.name}</Label>
                                                <CustomSelect
                                                    onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
                                                    value={newGroupData[each.details.name.toLowerCase().replace(/ /g, '_')]}
                                                >
                                                    {each.details.options.map(opt => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}

                                                </CustomSelect>
                                            </InputCon>)
                                        }

                                        {each.details.type === 'textarea' &&
                                            (<InputCon >
                                                <Label>{each.details.name}</Label>
                                                <TextArea
                                                    placeholder={each.details.placeholder}
                                                    onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
                                                    value={newGroupData[each.details.name.toLowerCase().replace(/ /g, '_')]}
                                                />
                                            </InputCon>)
                                        }

                                        {each.details.type === 'File Attachment' &&
                                            (<InputCon >
                                                <Label>{each.details.name}</Label>
                                                <Input
                                                    type='file'
                                                    placeholder={each.details.placeholder}
                                                    value={newGroupData[each.details.name.toLowerCase().replace(/ /g, '_')]}
                                                    onChange={(e) => onChangeInputField(each.details.name.toLowerCase(), e.target.value)}
                                                />
                                            </InputCon>)
                                        }
                                    </div>
                                ))}

                                <SaveUpdateCon>
                                    <Btn type="submit">ADD</Btn>
                                </SaveUpdateCon>
                            </GroupTableForm>)
                        }

                    </FormContent>
                </GroupTableCon>
            </SideNavAndContentContainer>
        </CreateGroupTableContainer>
    )
}

export default GroupTableCreateView