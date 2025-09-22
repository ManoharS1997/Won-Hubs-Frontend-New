// src/components/SignupPage.js
import { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select'
import { Tooltip } from 'react-tooltip';
import Swal from 'sweetalert2';
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import VerificationModal from '../components/VerificationModal';
import Cookies from 'js-cookie'
import { ColorRing } from 'react-loader-spinner';
import { DefaultLayout } from '../../../DataFile/DefaultDataFile';
import 'react-phone-number-input/style.css';

import { createNewRecordInTable, CheckUsername, sendEmail, sendEmailOtp, CheckEmailAvailability } from '../../../utils/CheckAndExecuteFlows/CRUDoperations';

import { GoDotFill } from "react-icons/go";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaEyeLowVision } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";

import {
  RegisterForm, Title, LoginBtn, FieldsContainer,
  Group, Input, Label, Bar, Highlight,
  ButtonsContainer, RegisterBtn, ShowPasswordIcon,
  CustomAnchorEl, InfoSpan, VerifyBtn
} from './RegisterStyledComponents'
import { useNavigate } from 'react-router-dom';

const titleOptions = [
  { value: 'mr', label: 'Mr' },
  { value: 'mrs', label: 'Mrs' },
  { value: 'ms', label: 'Ms' },
]

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    title: '',
    phoneNumber: '',
    email: '',
    password: '',
    userName: '',
  })
  const [emailVerifyStatus, setEmailVerifyStatus] = useState('otp_send')
  const [phoneNumVerifyStatus, setPhoneNumVerifyStatus] = useState('not_verified')
  const [viewPasword, setViewpassword] = useState(false)
  const [isValid, setIsValid] = useState(true);
  const [isEmailVerifyModalOpen, setIsEmailVerifyModalOpen] = useState(false)
  const [showEmailOtpSendingLoader, setShowEmailOtpSendingLoader] = useState(false)
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false)
  const [isEmailAvailable, setIsEmailAvailable] = useState(true)
  const [passwordErrors, setPasswordErrors] = useState([])

  const navigate = useNavigate()

  const convertName = (name) => {
    const nameArr = name.split('_')
    const convertedName = nameArr.map((item,) => item[0].toUpperCase() + item.slice(1))
    return (convertedName.join(' '))
  }

  const errorSwal = () => {
    const missingFields = {
      first_name: formData.firstName === '',
      last_name: formData.lastName === '',
      title: formData.title === '',
      phone_number: formData.phoneNumber === '',
      email: formData.email === '',
      password: formData.password === '',
      user_name: formData.userName === '',
      email_verifications: emailVerifyStatus !== 'verified',
      // phone_number_verification: phoneNumVerifyStatus !== 'verified',
    }

    const filteredMissingFields = Object.keys(missingFields).filter(key => missingFields[key] === true).map(field => convertName(field))
    if (filteredMissingFields.length > 0) {
      return Swal.fire({
        title: "!Mandatory Field(s)",
        text: `Missing: ${filteredMissingFields.join(', ')} values`,
        icon: "warning",
        confirmButtonText: "Got it!",
        showConfirmButton: true,
        buttonsStyling: true,
        customClass: {
          confirmButton: "btn btn-primary got-it-btn"
        }
      });
    }
  }

  const handleChange = (e, field) => {
    e && setFormData({
      ...formData,
      [e?.target?.name || field]: e?.target?.value,
    })
  }

  const createUser = async () => {
    await createNewRecordInTable({
      first_name: formData.firstName,
      last_name: formData.lastName,
      title: formData.title,
      phone_no: formData.phoneNumber,
      email: formData.email,
      password: formData.password,
      username: formData.userName,
      dashboard_layouts: DefaultLayout || [],
      selected_layout: '1',
      role_id: 10,
      active: 'true',
      reset_password: 'false',
      time_zone: 'Asia/India',
      user_type: 'external'
    }, 'users')

    navigate('/', { replace: true });

    await sendEmail({
      from: "wonhubs.noreply@nowitservices.com",
      to: formData.email,
      subject: "On Successful Registration of WONHUBS account",
      text: "",
      html: `<div>
                    <p>You have been successfully registered to WONHUBs and ypou click on the folloing link to login to your WONHUBS Account.</p>
                    <a href='http://3.110.7.85:3500/'> https://WONHUBS.com/</a>
                    </div>`,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    errorSwal()

    // Check if all fields are filled
    if (
      formData.firstName !== '' &&
      formData.lastName !== '' &&
      formData.title !== '' &&
      formData.phoneNumber !== '' &&
      formData.email !== '' &&
      formData.password !== '' &&
      formData.userName !== ''
    ) {
      errorSwal()

      if (emailVerifyStatus !== 'verified') {
        return Swal.fire({
          title: "!Mandatory Field(s)",
          text: `Need Email Verification`,
          icon: "warning",
          confirmButtonText: "Got it!",
          showConfirmButton: true,
          buttonsStyling: true,
          customClass: {
            confirmButton: "btn btn-primary got-it-btn"
          }
        });
      }
      // else if (phoneNumVerifyStatus !== 'verified') {
      //     return Swal.fire({
      //         title: "!Mandatory Field(s)",
      //         text: `Need Phone Number Verification`,
      //         icon: "warning",
      //         confirmButtonText: "Got it!",
      //         showConfirmButton: true,
      //         buttonsStyling: true,
      //         customClass: {
      //             confirmButton: "btn btn-primary got-it-btn"
      //         }
      //     });
      // }
      else {
        // Submit the form data to the server
        createUser()
      }
    }
  }

  function ValidateEmail(input) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.match(validRegex)) {
      // alert("Valid email address!");
      document.registrationForm.email.focus();
      return true;

    } else {
      // alert("Invalid email address!");
      document.registrationForm.email.focus();
      return false;

    }

  }

  function ValidatePhoneNumber(input) {
    var phoneRegex = /^\+?[1-9]\d{1,14}$/;

    if (input.match(phoneRegex)) {
      // document.registrationForm.otpFields.focus();
      return true;
    } else {
      alert("Invalid phone number!");
      // document.registrationForm.otpFields.focus();
      return false;
    }
  }

  const handlePhoneChange = (value) => {

    if (value) {
      setFormData({
        ...formData,
        phoneNumber: value,
      })

      // Check if phone number is valid for the selected country
      if (isValidPhoneNumber(value)) {
        setIsValid(true);
      } else {
        // document.registrationForm.otpFields.focus();
        setIsValid(false);
      }
    }
  }

  const onEmailVerification = async () => {
    // Start showing the loader
    setShowEmailOtpSendingLoader(true);

    if (ValidateEmail(formData.email)) {
      try {
        const { isEmailAvailable } = await CheckEmailAvailability(formData.email)
        console.log(isEmailAvailable)
        if (isEmailAvailable !== true) {

          const tempOtp = await sendEmailOtp(formData.email, 'Registation Page', window.location.href, 'external');
          if (tempOtp) {
            // OTP successfully sent, store OTP in cookies and update verification status
            Cookies.set("tempOtp", tempOtp.tempOtp);
            setEmailVerifyStatus('otp_sent');
            setIsEmailVerifyModalOpen(true)

            setInterval(() => {
              Cookies.remove('tempOtp')
            }, 5 * 60000)
          }
        } else {
          // alert('Email is already registered')
          setIsEmailAvailable(false)
        }
      } catch (error) {
        console.error('Error sending OTP:', error);
        alert('Failed to send OTP. Please try again.');
      } finally {
        // Hide loader regardless of success or failure
        setShowEmailOtpSendingLoader(false);
      }
    } else {
      // Invalid email case
      alert("Please enter a valid email address.");
      setShowEmailOtpSendingLoader(false); // Ensure loader is hidden
    }
  }

  const validateAndUpdateUsername = async (e) => {
    setFormData({ ...formData, userName: e.target.value })

    function validateUsername(username) {
      const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;

      if (!username) {
        return { valid: false, message: "Username cannot be empty" };
      }

      if (!usernameRegex.test(username)) {
        return {
          valid: false,
          message: "Username must start with a letter, contain only letters, numbers, and underscores, and be 3-20 characters long."
        };
      }

      return {
        valid: true,
        message: "Username is valid"
      };
    }

    if (validateUsername(e.target.value)) {
      const isUserNameAvailable = await CheckUsername(e.target.value)
      setIsUsernameAvailable(!isUserNameAvailable.usernameFound)
    }
  }

  function validatePassword(password) {
    const minLength = 8;

    const hasUpperCase = /[A-Z]/.test(password); // Check for uppercase letters
    const hasLowerCase = /[a-z]/.test(password); // Check for lowercase letters
    const hasNumber = /\d/.test(password);       // Check for numbers
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Check for special characters

    let errors = [];

    if (password.length < minLength) {
      errors.push(`*Must be at least ${minLength} characters long`);
    }
    if (!hasUpperCase) {
      errors.push('*Must contain at least one uppercase letter');
    }
    if (!hasLowerCase) {
      errors.push('*Must contain at least one lowercase letter');
    }
    if (!hasNumber) {
      errors.push('*Must contain at least one number');
    }
    if (!hasSpecialChar) {
      errors.push('*Must contain at least one special character');
    }

    // Return an array of errors if any, else return true for valid password
    return errors.length > 0 ? errors : true;
  }

  const validateAndUpdatePassword = (e) => {
    const password = e.target.value;
    setFormData({ ...formData, password: password })

    if (validatePassword(password) !== true) {
      setPasswordErrors(validatePassword(password))
    } else {
      setPasswordErrors([])
    }
  }

  const labelClassNames = 'absolute left-1 top-12 text-sm !flex items-center transition-all peer-focus:top-7 peer-focus:text-xs peer-valid:top-1 peer-valid:text-xs pointer-events-none'
  // console.log(formData.phoneNumber)

  return (
    <div
      className="flex justify-center items-center min-h-screen w-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/drtguvwir/image/upload/v1724754211/WON-Platform-Images/plbrnblzhouqcjztntb1.jpg')",
      }}
    >
      <form
        onSubmit={handleSubmit}
        name="registrationForm"
        className="w-full max-w-lg md:max-w-2xl lg:w-2/5 bg-white/80 border border-white rounded-2xl shadow-xl backdrop-blur-md p-4 md:p-8 flex flex-col justify-between md:gap-6"
      >
        {/* Title */}
        <div className="relative flex flex-col md:grid md:grid-cols-3 items-center 
        justify-center text-xl md:text-2xl font-semibold gap-2">
          <img
            onClick={() => navigate('/')}
            src="https://res.cloudinary.com/drtguvwir/image/upload/v1723878315/WON-Platform-Images/eurmlmdcs6exyfbtkh9o.png"
            alt="logo"
            className=" w-30 md:w-20 h-auto cursor-pointer"
          />
          <span>Register / Signup</span>
        </div>

        {/* First + Last Name */}
        <div className="flex flex-col md:flex-row md:gap-4">
          {['firstName', 'lastName'].map((field) => (
            <div key={field} className="relative flex-1 flex flex-col justify-end">
              <input
                type="text"
                required
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="px-3 pb-2 pt-5 w-full bg-transparent border-b border-gray-400 outline-none text-blue-900 peer"
                autoComplete="off"
              />
              <label className={labelClassNames}>
                <GoDotFill size={10} className="text-red-500 mr-1" />
                {field === 'firstName' ? 'First Name' : 'Last Name'}
              </label>
            </div>
          ))}
        </div>

        {/* Username + Title */}
        <div className="w-full flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full relative flex-1 flex flex-col md:justify-end">
            <input
              type="text"
              required
              name="userName"
              value={formData.userName}
              onChange={validateAndUpdateUsername}
              className="px-3 pb-2 pt-5 w-full bg-transparent border-b border-gray-400 outline-none text-blue-900 peer"
              autoComplete="off"
            />
            <label className={labelClassNames}>
              <GoDotFill size={10} className="text-red-500 mr-1" />
              Username
            </label>
            {formData.userName.length >= 6 && (
              <span className={`text-xs ${isUsernameAvailable ? 'text-green-600' : 'text-red-600'}`}>
                {formData.userName} is {isUsernameAvailable ? 'available' : 'not available!!'}
              </span>
            )}
          </div>
          <span data-tooltip-id="username-info" className="opacity-40 hover:opacity-100 cursor-pointer mt-2 md:mt-0">
            <AiOutlineInfoCircle size={18} />
          </span>
          <Tooltip
            id="username-info"
            place="left"
            className="bg-white text-black shadow p-2 max-w-xs text-xs rounded"
          >
            Username must be unique, contain at least 1 numeric character, and no special characters.
          </Tooltip>

          <div className="flex flex-col w-full md:w-40">
            <label className="text-sm !flex items-center mb-1">
              <GoDotFill size={10} className="text-red-500 mr-1" />
              Title
            </label>
            <Select
              defaultValue={{ label: '--', value: '' }}
              isSearchable={false}
              name="title"
              options={titleOptions}
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: 'transparent',
                  minHeight: '36px',
                  fontSize: '0.95rem',
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),
              }}
              onChange={(v) => handleChange({ target: { name: 'title', value: v.value } })}
              className="w-full"
            />
          </div>
        </div>

        {/* Password */}
        <div className="w-full flex flex-col md:flex-row gap-4 md:items-end">
          <div className="relative flex-1 flex flex-col md:justify-end">
            <input
              type={viewPasword ? 'text' : 'password'}
              name="password"
              required
              value={formData.password}
              onChange={validateAndUpdatePassword}
              className="md:px-3 md:pb-2 md:pt-5 pt-5 w-full bg-transparent border-b border-gray-400 outline-none text-blue-900 peer"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setViewpassword(!viewPasword)}
              className="absolute right-2 md:top-5 top-10 text-blue-600"
              tabIndex={-1}
            >
              {viewPasword ? <FaEyeLowVision size={18} /> : <FaEye size={18} />}
            </button>
            <label className={labelClassNames}>
              <GoDotFill size={10} className="text-red-500 mr-1" />
              Password
            </label>
          </div>
          <span data-tooltip-id="password-info" className="opacity-40 hover:opacity-100 cursor-pointer mt-2 md:mt-0">
            <AiOutlineInfoCircle size={18} />
          </span>
          <Tooltip
            id="password-info"
            place="left"
            className="bg-white text-black shadow p-2 max-w-xs text-xs rounded"
          >
            Password must have: 8 characters, 1 uppercase letter, and 1 numeric value.
          </Tooltip>
        </div>
        {passwordErrors.length > 0 && (
          <span className="text-xs text-red-600">{passwordErrors.join(', ')}</span>
        )}

        {/* Email + Verify */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 flex flex-col justify-end w-full">
            <input
              type="email"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="px-3 pb-2 pt-5 w-full bg-transparent border-b border-gray-400 outline-none text-blue-900 peer"
              autoComplete="email"
            />
            <label className={labelClassNames}>
              <GoDotFill size={10} className="text-red-500 mr-1" />
              Email
            </label>
          </div>
          {/* Email verification UI */}
          <div className="flex items-center w-full md:w-auto mt-2 md:mt-0">
            {emailVerifyStatus !== 'verified' ? (
              showEmailOtpSendingLoader ? (
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
              ) : (
                <button
                  type="button"
                  onClick={onEmailVerification}
                  className="text-xs px-3 py-1 !rounded-full !bg-blue-600 text-white hover:!bg-transparent hover:!text-black border border-blue-600 transition"
                >
                  Verify
                </button>
              )
            ) : (
              <div className="flex items-center gap-1 text-green-600">
                <RiVerifiedBadgeFill size={18} /> Verified
              </div>
            )}
          </div>
        </div>
        {!isEmailAvailable && (
          <span className="text-xs text-red-600">This Email is already in use, please try another.</span>
        )}

        {/* Phone + Verify */}
        <div className="flex flex-col md:flex-row gap-4 items-center mt-4">
          <div className="relative flex-1 flex flex-col justify-end w-full">
            <PhoneInput
              defaultCountry="IN"
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
              className="w-full peer"
            />
            <label className="absolute left-1 -top-6 text-sm !flex items-center pointer-events-none">
              <GoDotFill size={10} className="text-red-500 mr-1" />
              Phone Number
            </label>
          </div>
          <div className="flex items-center w-full md:w-auto mt-2 md:mt-0">
            {phoneNumVerifyStatus !== 'verified' ? (
              <button
                type="button"
                onClick={() => {
                  ValidatePhoneNumber(formData.phoneNumber);
                  setPhoneNumVerifyStatus('otp_sent');
                }}
                className="text-xs px-3 py-1 !rounded-full !bg-blue-600 !text-white hover:!bg-transparent hover:!text-black border border-blue-600 transition"
              >
                Verify
              </button>
            ) : (
              <div className="flex items-center gap-1 text-green-600">
                <RiVerifiedBadgeFill size={18} /> Verified
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col justify-center gap-4 md:gap-8 mt-6">
          <button
            type="submit"
            className="w-full md:w-fit self-center px-6 py-2 !bg-blue-300 text-blue-800 !rounded-full border-2 border-transparent hover:!bg-blue-600 hover:!text-white hover:border-white transition"
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-sm hover:text-gray-500 transition bg-transparent"
          >
            Already Registered?{' '}
            <span className="font-bold hover:underline">Login</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;