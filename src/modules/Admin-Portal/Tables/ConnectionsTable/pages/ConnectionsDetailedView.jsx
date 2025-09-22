import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// COMPONENT IMPORTS
import WonContext from '../../../../../context/WonContext';

// ICON IMPORTS
import { IoIosArrowBack } from "react-icons/io";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

import {
    BackBtn,
    CompanyForm,
    CompanyFormDetailsContainer,
    ConnectionFieldsContainer,
    CreateCompanyDetailsContainer,
    CreateTableContainer,
    CustomContainer,
    CustomInput,
    CustomLabel,
    CustomOption,
    CustomSelect,
    CustomTextArea,
    FieldsContainer,
    FormTitle,
    InputField,
    SubmitBtn,
    TestBtn
} from '../components/ConnectionsDetailedView/StyledComponents';


const ConnectionsDetailView = () => {
    const navigate = useNavigate()

    const [connectionData, setConnectionData] = useState({
        ConnectionId: '',
        Name: '',
        Type: '',
        Description: '',
        "Endpoint/URl": '',
        AuthenticationType: '',
        Enabled: '',
        CreatedAt: '',
        LastUpdatedAt: '',
        "User/Owner": '',
        Status: true,
        Notes: '',
        IntegrationType: '',
        Frequency: '',
        ConnectionParameter: '',
        WhoCanAccess: '',
        Timeout: '',
        Cost: '',
        Version: '',
        Source: '',
        CreatedBy: '',
        ExpirationPolicy: '',
        ConnectionSecret: '',
        UserName: '',
        Password: '',
        Attachment: '',
        SourcePath: ''
    })

    const onBackbtn = () => {
        navigate('/Connections')
    }

    const addCompany = async (e) => {
        e.preventDefault()
    };

    const onChangeInput = (fieldName, value) => {
        setConnectionData((prevState) => {
            return {
                ...prevState,
                [fieldName]: value
            }
        })
    }


    return (
        <WonContext.Consumer>
            {value => {
                const { openSettings } = value

                return (
                    <CreateTableContainer>

                        <CreateCompanyDetailsContainer>
                            <CustomContainer>
                                <CompanyFormDetailsContainer>
                                    <BackBtn type='button' onClick={onBackbtn}><IoIosArrowBack size={35} /></BackBtn>
                                    <CompanyForm onSubmit={addCompany} >

                                        <FormTitle>Connection</FormTitle>

                                        <ConnectionFieldsContainer >

                                            <FieldsContainer>

                                                <InputField>
                                                    <CustomLabel htmlFor='ConnectionID'>ID</CustomLabel>
                                                    <CustomInput type='number' id='ConnectionID' placeholder='Enter ID' onChange={(e) => { onChangeInput('ConnectionId', e.target.value) }} value={connectionData.ConnectionId} />
                                                </InputField>

                                                <InputField>
                                                    <CustomLabel htmlFor='Name'>Name</CustomLabel>
                                                    <CustomInput type='text' id='Name' placeholder='Enter Name' onChange={(e) => { onChangeInput('Name', e.target.value) }} value={connectionData.Name} />
                                                </InputField>

                                                <InputField>
                                                    <CustomLabel htmlFor='Type'>Type</CustomLabel>
                                                    <CustomInput type='text' id='Type' placeholder='Enter Type' onChange={(e) => { onChangeInput('Type', e.target.value) }} value={connectionData.Type} />
                                                </InputField>

                                                <InputField>
                                                    <CustomLabel htmlFor='Endpoint/URL'>Endpoint/URL</CustomLabel>
                                                    <CustomInput type='text' id='Endpoint/URL' placeholder='Endpoint/URL' onChange={(e) => { onChangeInput('Endpoint/URl', e.target.value) }} value={connectionData["Endpoint/URl"]} />
                                                </InputField>

                                                <InputField>
                                                    <CustomLabel htmlFor='Authention'>Authentication Type</CustomLabel>
                                                    <CustomSelect id='Authention' onChange={(e) => { onChangeInput('AuthenticationType', e.target.value) }} value={connectionData.AuthenticationType}>
                                                        <CustomOption>OAuth</CustomOption>
                                                        <CustomOption>Username/Password</CustomOption>
                                                    </CustomSelect>
                                                </InputField>

                                                {connectionData.AuthenticationType === 'Username/Password' ?
                                                    <InputField >
                                                        <CustomLabel htmlFor='UserName'>User Name</CustomLabel>
                                                        <CustomInput type='text' id='UserName' onChange={(e) => { onChangeInput('UserName', e.target.value) }} value={connectionData.UserName} />
                                                    </InputField> : null
                                                }

                                                {connectionData.AuthenticationType === 'Username/Password' ?
                                                    <InputField >
                                                        <CustomLabel htmlFor='Password'>Password</CustomLabel>
                                                        <CustomInput type='password' id='Password' onChange={(e) => { onChangeInput('Password', e.target.value) }} value={connectionData.Password} />
                                                    </InputField> : null
                                                }

                                                <InputField >
                                                    <CustomLabel htmlFor='Enabled'>Enabled</CustomLabel>
                                                    <CustomInput style={{ minWidth: 'fit-content', height: '25px' }} type='checkbox' id='Enabled' onChange={(e) => { onChangeInput('Enabled', e.target.value) }} value={connectionData.Enabled} />
                                                </InputField>

                                                <InputField>
                                                    <CustomLabel htmlFor='Status'>Status</CustomLabel>
                                                    {
                                                        connectionData.Status ? <p>Successful <IoCheckmarkCircle size={20} style={{ color: 'green' }} /></p> : <p>Failed <MdCancel size={20} style={{ color: 'red' }} /></p>
                                                    }
                                                </InputField>

                                                <InputField>
                                                    <CustomLabel htmlFor='ConnectionSecret'>Connection Secret</CustomLabel>
                                                    <CustomInput type='text' id='ConnectionSecret' placeholder=' ' onChange={(e) => { onChangeInput('ConnectionSecret', e.target.value) }} value={connectionData.ConnectionSecret} />
                                                </InputField>

                                                <InputField>
                                                    <CustomLabel htmlFor='Attachment'>Attachment</CustomLabel>
                                                    <CustomInput type='file' id='Attachment' placeholder=' ' onChange={(e) => { onChangeInput('Attachment', e.target.value) }} value={connectionData.Attachment} />
                                                </InputField>

                                                <InputField>
                                                    <CustomLabel htmlFor='SourcePath'>Source Path</CustomLabel>
                                                    <CustomTextArea rows={4} type='text' id='SourcePath' placeholder=' ' onChange={(e) => { onChangeInput('SourcePath', e.target.value) }} value={connectionData.SourcePath} />
                                                </InputField>

                                                <InputField>
                                                    <CustomLabel htmlFor='Endpoint/URL'>Endpoint/URL</CustomLabel>
                                                    <CustomTextArea rows={3} type='text' id='Endpoint/URL' placeholder='Endpoint/URL' onChange={(e) => { onChangeInput('Endpoint/URl', e.target.value) }} value={connectionData["Endpoint/URl"]} />
                                                </InputField>

                                                <InputField>
                                                    <CustomLabel htmlFor='Description'>Description</CustomLabel>
                                                    <CustomTextArea rows={5} type='text' id='Description' placeholder='Enter Description' onChange={(e) => { onChangeInput('Description', e.target.value) }} value={connectionData.Description} />
                                                </InputField>
                                            </FieldsContainer>

                                            <FieldsContainer>
                                                <InputField>
                                                    <CustomLabel htmlFor='User/Owner'>User/Owner</CustomLabel>
                                                    <CustomInput type='text' id='User/Owner' placeholder='' onChange={(e) => { onChangeInput('User/Owner', e.target.value) }} value={connectionData["User/Owner"]} />
                                                </InputField>

                                                <InputField>
                                                    <CustomLabel htmlFor='IntegrationType'>Integration Type</CustomLabel>
                                                    <CustomInput type='text' id='IntegrationType' placeholder='Enter Type' onChange={(e) => { onChangeInput('IntegrationType', e.target.value) }} value={connectionData.IntegrationType} />
                                                </InputField>

                                                <InputField>
                                                    <CustomLabel htmlFor='Frequency'>Frequency</CustomLabel>
                                                    <CustomSelect id='Frequency' onChange={(e) => { onChangeInput('Frequency', e.target.value) }} value={connectionData.Frequency}>
                                                        <CustomOption>Daily</CustomOption>
                                                        <CustomOption>Weekly</CustomOption>
                                                        <CustomOption>Monthly</CustomOption>
                                                    </CustomSelect>
                                                </InputField>

                                                <InputField>
                                                    <CustomLabel htmlFor='ConnectionParameter'>Connection parameter</CustomLabel>
                                                    <CustomSelect id='ConnectionParameter' onChange={(e) => { onChangeInput('ConnectionParameter', e.target.value) }} value={connectionData.ConnectionParameter}>
                                                        <CustomOption>Port Number</CustomOption>
                                                        <CustomOption>Database Name</CustomOption>
                                                    </CustomSelect>
                                                </InputField>

                                                <InputField>
                                                    <CustomLabel htmlFor='WhoCanAccess'>Who can Access</CustomLabel>
                                                    <CustomSelect id='WhoCanAccess' onChange={(e) => { onChangeInput('WhoCanAccess', e.target.value) }} value={connectionData.WhoCanAccess}>
                                                        <CustomOption>internal user</CustomOption>
                                                        <CustomOption>external user</CustomOption>
                                                    </CustomSelect>
                                                </InputField>

                                                <InputField>
                                                    <CustomLabel htmlFor='TimeOut'>TimeOut</CustomLabel>
                                                    <CustomInput type='text' id='TimeOut' placeholder='' onChange={(e) => { onChangeInput('Timeout', e.target.value) }} value={connectionData.Timeout} />
                                                </InputField>

                                                <InputField>
                                                    <CustomLabel htmlFor='Cost'>Cost</CustomLabel>
                                                    <CustomInput type='number' id='Cost' placeholder=' ' onChange={(e) => { onChangeInput('Cost', e.target.value) }} value={connectionData.Cost} />
                                                </InputField>

                                                <InputField>
                                                    <CustomLabel htmlFor='Version'>Version</CustomLabel>
                                                    <CustomInput type='text' id='Version' placeholder=' ' onChange={(e) => { onChangeInput('Version', e.target.value) }} value={connectionData.Version} />
                                                </InputField>

                                                <InputField>
                                                    <CustomLabel htmlFor='Source'>Source</CustomLabel>
                                                    <CustomSelect id='Source' onChange={(e) => { onChangeInput('Source', e.target.value) }} value={connectionData.Source}>
                                                        <CustomOption>internal system</CustomOption>
                                                        <CustomOption>third party API</CustomOption>
                                                        <CustomOption>external database</CustomOption>
                                                    </CustomSelect>
                                                </InputField>

                                                <InputField>
                                                    <CustomLabel htmlFor='ExpirationPolicy'>Expiration policy</CustomLabel>
                                                    <CustomInput type='text' id='ExpirationPolicy' placeholder=' ' onChange={(e) => { onChangeInput('ExpirationPolicy', e.target.value) }} value={connectionData.ExpirationPolicy} />
                                                </InputField>

                                                <InputField>
                                                    <CustomLabel htmlFor='Notes'>Notes</CustomLabel>
                                                    <CustomTextArea rows={5} type='text' id='Notes' placeholder='Enter Notes' onChange={(e) => { onChangeInput('Notes', e.target.value) }} value={connectionData.Notes} />
                                                </InputField>

                                            </FieldsContainer>
                                        </ConnectionFieldsContainer>

                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <TestBtn>Test Connection</TestBtn>
                                            <SubmitBtn type='submit' >Submit</SubmitBtn>
                                        </div>

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

export default ConnectionsDetailView