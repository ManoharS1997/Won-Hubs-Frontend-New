import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import WonContext from '../../../../../context/WonContext';
import Settings from '../../../Settings/pages/Settings';
import Swal from 'sweetalert2';

import { useTimezoneSelect, allTimezones } from 'react-timezone-select'
import { MdVerified } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { IoIosArrowBack } from "react-icons/io";

const hostedUrl = import.meta.env.VITE_HOSTED_API_URL

import {
    ActionButtonsContainer, BackBtn, CustomContainer, CustomInput,
    CustomLabel, CustomOption, CustomSelect, CustomSpan,
    FormTitle, HearderContainer, InputField, Output, UpdateBtn,
    UserDetailsContainer, UserForm, UserTableDetailedViewContainer
} from './StyledComponents'

const labelStyle = 'original'
const timezones = {
    ...allTimezones,
    'Europe/Berlin': 'Frankfurt'
}

const iconStyles = {
    height: '15px',
    width: '15px',
    color: '#17b50e',
}

export default function UserDetailedView() {
    const { id } = useParams();

    const history = useNavigate()
    const [selectedFormat, setSelectedFormat] = useState('YYYY-MM-DD')
    const [outputText, setOutputText] = useState('')
    const [selectedImage, setSelectedImage] = useState(null)
    const { options, parseTimezone } = useTimezoneSelect({ labelStyle, timezones })
    const [mailVerificationStatus, setMailVerificationStatus] = useState(null)
    const [mobileVerificationStatus, setMobileVerificationStatus] = useState(null)
    const [mail, setMail] = useState('')

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        title: '',
        department: '',
        active: true,
        resetPassword: false,
        email: '',
        timeZone: '',
        phoneNo: '',
        location: '',
        userType: '',
        accountablePerson: '',
    })

    useEffect(() => {
        getUserData()
    }, [])

    const getUserData = async () => {
        const url = `${hostedUrl}/users/${id}`
        const options = {
            method: 'GET',
        }
        const response = await fetch(url, options)
        const data = await response.json()
        // console.log(data)

        setUserData({
            userId: data.user.id,
            firstName: data.user.first_name,
            lastName: data.user.last_name,
            title: data.user.title,
            department: data.user.department,
            active: data.user.active,
            resetPassword: data.user.reset_password,
            email: data.user.email,
            timeZone: data.user.time_zone,
            phoneNo: data.user.phone_no,
            location: data.user.location,
            userType: data.user.user_type,
            accountablePerson: data.user.accountable_person,
        })
    }

    const handleMailVerificationClick = () => {
        if (validateEmail(mail)) {
            setMailVerificationStatus('Verification successful!');
        } else {
            setMailVerificationStatus('Invalid email or mobile number');
        }
    };

    const handleMobileVerificationClick = () => {
        if (validateMobile(mail)) {
            setMobileVerificationStatus('Verification successful!');
        } else {
            setMobileVerificationStatus('Invalid email or mobile number');
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateMobile = (mobile) => {
        const mobileRegex = /^\d{10}$/;
        return mobileRegex.test(mobile);
    };

    useEffect(() => {
        updateDateFormat()
    }, [selectedFormat])

    const updateDateFormat = () => {
        const currentDate = new Date();
        const formattedDate = formatDate(currentDate, selectedFormat);
        setOutputText(`Formatted Date: ${formattedDate}`);
    }

    const formatDate = (date, format) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day);
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        // Check if a file is selected
        if (file) {
            // You can perform additional checks or actions here
            // For example, check file type, size, etc.

            // Update the state with the selected image file
            setSelectedImage(file);
        }
    }

    const onChangeInputField = (fieldName, value) => {
        setUserData((prevState) => ({
            ...prevState,
            [fieldName]: value,
        }))
    }

    const setTimeZone = (e) => {
        parseTimezone(e.currentTarget.value)
        onChangeInputField('timeZone', e.target.value)
    }

    const updateUser = async (e) => {
        e.preventDefault()

        const url = `http://localhost:3001/users/update/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        }

        const response = await fetch(url, options)
    }

    const ConfirmUpdate = (e) => {
        return Swal.fire({
            title: "Are you sure want to update?",
            // text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: 'No',
            confirmButtonText: "Yes, Update",
            customClass: { confirmButton: 'SA-confirm-btn', cancelButton: 'SA-cancel-btn' }
        }).then((result) => {
            if (result.isConfirmed) {
                updateUser(e)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    const OnBack = () => history('/Users')

    // console.log(userData)

    return (
        <WonContext.Consumer>
            {value => {
                const { openSettings } = value

                return (
                    <UserTableDetailedViewContainer>
                        <UserDetailsContainer>
                            <CustomContainer>
                                <UserForm onSubmit={updateUser}>
                                    <HearderContainer>
                                        <BackBtn onClick={OnBack}>
                                            <IoIosArrowBack size={35} />
                                        </BackBtn>

                                        <FormTitle>{userData.firstName} {userData.lastName}</FormTitle>
                                    </HearderContainer>

                                    <InputField>
                                        <CustomLabel htmlFor='user-id'>User ID</CustomLabel>
                                        <CustomInput type='text' id='user-id' value={userData?.userId} />
                                    </InputField>

                                    <InputField>
                                        <CustomLabel htmlFor='first-name'>First Name</CustomLabel>
                                        <CustomInput
                                            type='text'
                                            id='first-name'
                                            onChange={e => { onChangeInputField('firstName', e.target.value) }}
                                            value={userData.firstName}
                                        />
                                    </InputField>

                                    <InputField>
                                        <CustomLabel htmlFor='last-name'>Last Name</CustomLabel>
                                        <CustomInput
                                            type='text'
                                            id='last-name'
                                            onChange={e => { onChangeInputField('lastName', e.target.value) }}
                                            value={userData.lastName}
                                        />
                                    </InputField>

                                    <InputField>
                                        <CustomLabel htmlFor='department'>Department</CustomLabel>
                                        <CustomInput
                                            type='text'
                                            id='department'
                                            onChange={e => { onChangeInputField('department', e.target.value) }}
                                            value={userData.department}
                                        />
                                    </InputField>

                                    <InputField>
                                        <CustomLabel htmlFor='accountable-person'>Accountable Person / Manager</CustomLabel>
                                        <CustomInput
                                            type='text'
                                            id='accountable-person'
                                            onChange={e => { onChangeInputField('accountablePerson', e.target.value) }}
                                            value={userData.accountablePerson}
                                        />
                                    </InputField>

                                    <InputField>
                                        <CustomLabel htmlFor='email'>Email</CustomLabel>
                                        <CustomInput
                                            type='email'
                                            id='email'
                                            onChange={e => { onChangeInputField('email', e.target.value) }}
                                            value={userData.email}
                                        />
                                        <CustomSpan
                                            onClick={handleMailVerificationClick}>
                                            {mailVerificationStatus !== null ? <MdVerified style={iconStyles} /> : 'Verify'}
                                        </CustomSpan>
                                    </InputField>

                                    <InputField>
                                        <CustomLabel htmlFor='mobile'>Phone No.</CustomLabel>
                                        <CustomInput
                                            type='tel'
                                            id='mobile'
                                            pattern='+[0-9]{2} [0-9]{10}'
                                            onChange={e => { onChangeInputField('phoneNo', e.target.value) }}
                                            value={userData.phoneNo}
                                        />
                                        <CustomSpan
                                            onClick={handleMobileVerificationClick}>
                                            {mobileVerificationStatus !== null ? <MdVerified style={iconStyles} /> : 'Verify'}
                                        </CustomSpan>
                                    </InputField>

                                    <InputField>
                                        <CustomLabel htmlFor='time-zone'>Time Zone</CustomLabel>
                                        <CustomSelect onChange={setTimeZone} >
                                            {options.map(option => (
                                                <CustomOption
                                                    value={option.value}
                                                    selected={userData.timeZone === option.value}
                                                    key={option.value}>
                                                    {option.label}
                                                </CustomOption>
                                            ))}
                                        </CustomSelect>
                                    </InputField>


                                    <InputField>
                                        <CustomLabel htmlFor='dateFormatSelector'> Date Format</CustomLabel>

                                        <CustomSelect
                                            id="dateFormatSelector"
                                            value={selectedFormat}
                                            onChange={(e) => setSelectedFormat(e.target.value)}
                                        >
                                            <CustomOption value="YYYY-MM-DD">YYYY-MM-DD</CustomOption>
                                            <CustomOption value="DD-MM-YYYY">DD-MM-YYYY</CustomOption>
                                            <CustomOption value="MM/DD/YYYY">MM/DD/YYYY</CustomOption>
                                            <CustomOption value="YYYY/MM/DD">YYYY/MM/DD</CustomOption>
                                        </CustomSelect>
                                        <Output>{outputText}</Output>

                                    </InputField>

                                    <InputField>
                                        <CustomLabel htmlFor='photo'>Photo </CustomLabel>
                                        <CustomInput style={{ padding: '4px' }} type='file' id='photo' accept="image/*" onChange={handleImageChange} />
                                    </InputField>

                                    <InputField >
                                        <CustomLabel htmlFor='password-reset'>Password Needs Reset</CustomLabel>
                                        <CustomInput
                                            style={{ width: '20px' }}
                                            type='checkbox'
                                            id='password-reset'
                                            checked={userData.resetPassword === "true"}
                                            onChange={e => { onChangeInputField('resetPassword', e.target.checked) }}
                                        />
                                    </InputField>

                                    <InputField>
                                        <CustomLabel htmlFor='active'>Active</CustomLabel>

                                        <CustomInput
                                            style={{ width: '20px' }}
                                            type='checkbox'
                                            id='active'
                                            checked={userData?.active === "true"}
                                            onChange={e => { onChangeInputField('active', e.target.checked) }}
                                        />
                                    </InputField>

                                    <ActionButtonsContainer>
                                        <UpdateBtn type='button' onClick={ConfirmUpdate}>Update <GrUpdate /></UpdateBtn>
                                    </ActionButtonsContainer>
                                </UserForm>
                            </CustomContainer>
                            {/* {openSettings ? <Settings /> : null} */}
                        </UserDetailsContainer>
                    </UserTableDetailedViewContainer>
                )
            }}
        </WonContext.Consumer>
    )
}