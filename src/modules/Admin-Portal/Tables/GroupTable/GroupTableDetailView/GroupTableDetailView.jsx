import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";

import { useTimezoneSelect, allTimezones } from 'react-timezone-select'

const labelStyle = 'original'
const timezones = {
    ...allTimezones,
    'Europe/Berlin': 'Frankfurt'
}

import {
    BackBtn, Btn, CustomContainer, CustomViewContainer, FormContent,
    GroupTableForm, HeaderContainer, HeaderTag, Input, InputAndIconCon,
    InputCon, Label, OptionTag, SaveUpdateCon, SelectTag,
    SideNavAndContentContainer, TextArea
} from './StyledComponents'

const GroupTableDetailView = (props) => {
    const history = useNavigate();
    const [formData, SetFormData] = useState({
        GroupName: 'NowIt',
        Id: '6789',
        ManagerName: 'xyz',
        GroupEmail: 'abcdefgh@gmail.com',
        ParentGroup: 'mnop',
        Description: 'asafdf cxvb fwerg wqetrrtwtg',
        Type: 'internal',
        Region: 'india',
    })

    const { id } = useParams()

    useEffect(() => {
        getGroupData()
    }, [])

    const getGroupData = async () => {
        const url = `http://localhost:3001/groups/${id}`
        const options = {
            method: 'GET',
        }
        const response = await fetch(url, options)
        const data = await response.json()
        SetFormData({
            GroupName: data.group.group_name,
            Id: data.group.group_id,
            ManagerName: data.group.manager_name,
            GroupEmail: data.group.email,
            ParentGroup: data.group.parent_group,
            Description: data.group.group_type_description,
            Type: data.group.group_type,
            Region: data.group.region,

        })

    }

    const updateGroupData = async (e) => {
        e.preventDefault()
        const updatedGroup = {
            groupName: formData.GroupName,
            groupId: formData.Id,
            managerName: formData.ManagerName,
            email: formData.GroupEmail,
            parentGroup: formData.ParentGroup,
            groupTypeDescription: formData.Description,
            groupType: formData.Type,
            region: formData.Region
        }
        const url = `http://localhost:3001/groups/update/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedGroup)
        }
        const response = await fetch(url, options)
    }

    const deleteGroup = async () => {
        const url = `http://localhost:3001/groups/delete/${id}`
        const options = {
            method: 'DELETE',
        }
        const response = await fetch(url, options)
    }

    const { options, parseTimezone } = useTimezoneSelect({ labelStyle, timezones })

    const OnBack = () => history(-1);

    const handleChange = (fieldName, value) => {
        SetFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,

        }))
    };

    const onSetTimeZone = e => {
        // setTimeZone(e.target.value)
    }

    return (
        <CustomViewContainer>
            <SideNavAndContentContainer>
                <CustomContainer>
                    <FormContent>
                        <HeaderContainer>
                            <BackBtn onClick={OnBack}>
                                <IoIosArrowBack size={35} />
                            </BackBtn>
                            <HeaderTag>Groups</HeaderTag>
                        </HeaderContainer>

                        <GroupTableForm>
                            <InputCon>
                                <Label>Group Name</Label>
                                <InputAndIconCon>
                                    <Input
                                        type='text'
                                        value={formData.GroupName}
                                        onChange={(e) => handleChange('GroupName', e.target.value)}
                                    />
                                </InputAndIconCon>
                            </InputCon>

                            <InputCon>
                                <Label>Id</Label>
                                <InputAndIconCon>
                                    <Input type='text'
                                        value={formData.Id}
                                        onChange={(e) => handleChange('Id', e.target.value)}
                                    />
                                </InputAndIconCon>
                            </InputCon>

                            <InputCon>
                                <Label>Manager Name</Label>
                                <InputAndIconCon>
                                    <Input type='text'
                                        value={formData.ManagerName}
                                        onChange={(e) => handleChange('ManagerName', e.target.value)}
                                    />
                                    <IoIosSearch size={21} style={{ color: '#bababa', border: '2px' }} />
                                </InputAndIconCon>
                            </InputCon>

                            <InputCon>
                                <Label>Group Email</Label>
                                <InputAndIconCon>
                                    <Input type='text'
                                        value={formData.GroupEmail}
                                        onChange={(e) => handleChange('GroupEmail', e.target.value)}
                                    />
                                    <IoIosSearch size={21} style={{ color: '#bababa', border: '2px' }} />
                                </InputAndIconCon>
                            </InputCon>

                            <InputCon>
                                <Label>Parent Group</Label>
                                <InputAndIconCon>
                                    <Input type='text'
                                        value={formData.ParentGroup}
                                        onChange={(e) => handleChange('ParentGroup', e.target.value)}
                                    />
                                    <HiOutlineMail size={21} style={{ color: '#bababa', border: '2px' }} />
                                </InputAndIconCon>
                            </InputCon>

                            <InputCon>
                                <Label>Description</Label>
                                <InputAndIconCon>
                                    <TextArea
                                        value={formData.Description}
                                        onChange={(e) => handleChange('Description', e.target.value)} />
                                </InputAndIconCon>
                            </InputCon>

                            <InputCon>
                                <Label>Type </Label>
                                <SelectTag onChange={e => { handleChange('Type', e.target.value) }}>
                                    <OptionTag >-- Select Type --</OptionTag>
                                    <OptionTag selected={formData.Type === 'internal'} value="internal">Internal</OptionTag>
                                    <OptionTag selected={formData.Type === 'external'} value="external">External</OptionTag>
                                </SelectTag>
                            </InputCon>

                            <InputCon>
                                <Label>Region</Label>
                                <SelectTag onClick={onSetTimeZone} onChange={e => (handleChange('Region', e.currentTarget.value))}>
                                    {options.map(option => (
                                        <OptionTag value={option.value} key={option.value}>{option.label}</OptionTag>
                                    ))}
                                </SelectTag>
                            </InputCon>

                            <SaveUpdateCon>
                                <Btn type='button' onClick={updateGroupData} >Update</Btn>
                                <Btn type='button' onClick={deleteGroup} >Delete</Btn>
                            </SaveUpdateCon>
                        </GroupTableForm>
                    </FormContent>
                </CustomContainer>
            </SideNavAndContentContainer>
        </CustomViewContainer>
    )
}

export default GroupTableDetailView