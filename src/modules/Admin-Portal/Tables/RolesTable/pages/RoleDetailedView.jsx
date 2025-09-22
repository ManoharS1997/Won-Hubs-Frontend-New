import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import WonContext from '../../../../../context/WonContext';

import { RxUpdate } from "react-icons/rx";
import { IoIosArrowBack } from "react-icons/io";

import UsersTab from '../components/UsersTab'

import {
    BackBtn, BodyContainer, ContentContainer, CustomInput,
    CustomLabel, CustomSpan, CustomText, FormTitle,
    InputField, RoleForm, RolesTableContainer, TabItem,
    TabsContentContainer, TabsList, TablesTabsContainer,
    UpdateBtn
} from '../components/RoleDeatailedViewStyledComponents'

const roleDetails = {
    roleName: 'Developer',
    requireLicense: false,
    description: 'React JS Developer role',
    roleType: 'Global',
    active: true,
    extendedRoles: true,
}

export default function RoleDetailedView(props) {
    const { match } = props
    const { params } = match
    const { id } = params

    const [roleDetailData, setRoleDetails] = useState({
        role_id: '',
        role_name: '',
        require_license: false,
        description: '',
        role_type: '',
        active: false,
        extended_roles: false
    })
    const [activeTab, setActiveTab] = useState('1')

    useEffect(() => {
        getRoleData()
    }, [])

    const getRoleData = async () => {
        const url = `http://localhost:3001/roles/${id}`
        const options = {
            method: 'GET',
        }
        const response = await fetch(url, options)
        const data = await response.json()
        setRoleDetails(data.role[0])
        console.log(data.role[0])
    }

    const updateRole = async () => {
        const updatedData = { ...roleDetailData }
        console.log(updatedData)
        const url = `http://localhost:3001/roles/update/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(updatedData)
        }
        const response = await fetch(url, options)
        console.log(response)
    }

    const updateFormField = (fieldName, value) => (
        setRoleDetails((prev) => ({
            ...prev,
            [fieldName]: value

        })
        ))

    const onSetActiveTab = (e) => {
        setActiveTab(e.target.id)
    }

    const renderTabContent = (recordsPerPage) => {
        switch (activeTab) {
            case '1':
                return <UsersTab recordsPerPage={recordsPerPage} />
            default:
                return null
        }
    }


    const role = 'won_internal'

    const history = useNavigate()

    const onBackBtn = () => {
        history.push('/Roles')
    }

    return (
        <WonContext.Consumer>
            {value => {
                const { openSettings, recordsPerPage } = value
                return (
                    <RolesTableContainer>
                        <BodyContainer>
                            <ContentContainer>
                                <div style={{ backgroundColor: '#fff', height: '100%', borderRadius: '15px', overflow: 'hidden', padding: '10px' }}>
                                    <RoleForm>
                                        <BackBtn type="button" onClick={onBackBtn}><IoIosArrowBack size={26} /></BackBtn>
                                        <FormTitle>{id} Details</FormTitle>

                                        <InputField>
                                            <CustomLabel htmlFor='role-name'>Role Name</CustomLabel>
                                            <CustomInput type='text' id='role-name' placeholder='Enter Role Name' value={roleDetailData.role_name} onChange={(event) => updateFormField('role_name', event.target.value)} />
                                        </InputField>

                                        <InputField>
                                            <CustomLabel htmlFor='requires-license'>Requires License</CustomLabel>
                                            <CustomInput style={{ width: 'fit-content' }} type='checkbox' id='requires-license' checked={roleDetailData.require_license} />
                                        </InputField>

                                        <InputField>
                                            <CustomLabel htmlFor='description'>Description</CustomLabel>
                                            <CustomInput type='text' id='description' value={roleDetailData.description} onChange={(event) => updateFormField('description', event.target.value)} />
                                        </InputField>

                                        <InputField>
                                            <CustomLabel htmlFor='role-type'>Role Type</CustomLabel>
                                            <CustomInput type='text' id='role-type' value={roleDetailData.role_type} onChange={(event) => updateFormField('role_type', event.target.value)} />
                                        </InputField>

                                        <InputField>
                                            <CustomLabel htmlFor='active'>Active</CustomLabel>
                                            <CustomInput style={{ width: 'fit-content' }} type='checkbox' id='active' checked={roleDetailData.active} />
                                        </InputField>

                                        <InputField>
                                            <CustomLabel htmlFor='extended-roles'>Extended Roles</CustomLabel>
                                            <CustomInput style={{ width: 'fit-content' }} type='checkbox' id='extended-roles' checked={roleDetailData.extended_roles} />
                                        </InputField>

                                        <UpdateBtn type='button' onClick={updateRole}>Update<RxUpdate /></UpdateBtn>
                                    </RoleForm>

                                    <TablesTabsContainer>
                                        <TabsList>
                                            <TabItem id='1' onClick={onSetActiveTab} active={activeTab === '1'}>Users</TabItem>
                                            <TabItem id='2' onClick={onSetActiveTab} active={activeTab === '2'}>Groups</TabItem>
                                            <TabItem id='3' onClick={onSetActiveTab} active={activeTab === '3'}>Contains Roles</TabItem>
                                            <TabItem id='4' onClick={onSetActiveTab} active={activeTab === '4'}>Applications with Role</TabItem>
                                            <TabItem id='5' onClick={onSetActiveTab} active={activeTab === '5'}>Modules with Role</TabItem>
                                            <TabItem id='6' onClick={onSetActiveTab} active={activeTab === '6'}>Role Subscription Attributes</TabItem>
                                            <TabItem id='7' onClick={onSetActiveTab} active={activeTab === '7'}>Contained By</TabItem>
                                        </TabsList>

                                        <TabsContentContainer >
                                            <CustomText>User: <CustomSpan>{role}</CustomSpan></CustomText>
                                            {renderTabContent(recordsPerPage)}
                                        </TabsContentContainer>
                                    </TablesTabsContainer>
                                </div>

                            </ContentContainer>
                            {/* {openSettings ? <Settings /> : null} */}
                        </BodyContainer>

                    </RolesTableContainer>
                )
            }}
        </WonContext.Consumer>
    )
}