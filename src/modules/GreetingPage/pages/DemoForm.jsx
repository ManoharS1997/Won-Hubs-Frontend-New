import { useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-number-input'
import { useState } from "react";
import Select from 'react-select'
import Cookies from 'js-cookie'

import 'react-phone-number-input/style.css'
import { isValidPhoneNumber } from 'react-phone-number-input'

export default function DemoForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    purpose: '',
    description: '',
    terms: false,
  });
  const [phoneError, setPhoneError] = useState('');

  const Navigate = useNavigate()

  // const onPhoneNumberChange = (phoneNumber) => {
  //   setFormData({ ...formData, phoneNumber });
  // };

  const onPurposeChange = (purpose) => {
    setFormData({ ...formData, purpose });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const isFormValid = () => {
    return (
      formData.companyName.trim() !== '' &&
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phoneNumber !== '' &&
      formData.purpose !== '' &&
      formData.description.trim() !== '' &&
      formData.terms
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('formData: ', formData)
    try {
      const response = await fetch(`${import.meta.env.VITE_HOSTED_API_URL}/api/recieve/demo-request`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('accessToken')}`
        }
      });
      console.log(response);
      if(response.ok){
        Navigate('/')
      }
    } catch (error) {
      console.log('error sending demo request.', error);
    }
  };

  // Helper to get max length for the selected country
  // getExampleNumber is not available, so fallback to a default max length
  const getMaxPhoneLength = (country) => {
    // You can set a reasonable default, e.g., 15 digits for international numbers
    return 15;
  }

  // Validation state for phone number

  const onPhoneNumberChange = (phoneNumber) => {
    // Limit input length based on country
    let value = phoneNumber || '';
    const country = 'IN'; // or dynamically detect from input if needed
    const maxLen = getMaxPhoneLength(country);
    const digits = value.replace(/\D/g, '');
    if (digits.length > maxLen) {
      value = value.slice(0, maxLen + (value.startsWith('+') ? 1 : 0));
    }
    setFormData({ ...formData, phoneNumber: value });

    // Validate phone number
    if (value && !isValidPhoneNumber(value)) {
      setPhoneError('Invalid phone number');
    } else {
      setPhoneError('');
    }
  };

  return (
    <div
      className="min-h-screen w-full overflow-auto flex items-center justify-center bg-white
    bg-[url('https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755036/plbrnblzhouqcjztntb1_p5dn0l.jpg')]
    bg-center bg-cover bg-no-repeat"
    >
      <form
        className="w-[90%] sm:w-4/5 md:w-3/5 lg:w-1/2 bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-10 space-y-6 my-8"
        onSubmit={onSubmit}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 md:grid md:grid-cols-3">
          <img
            className="w-[100px] cursor-pointer"
            onClick={() => Navigate('/')}
            src="https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755137/eurmlmdcs6exyfbtkh9o_ebq7uc.png"
            alt="logo"
          />
          <span className="text-2xl font-semibold text-center sm:text-left">Demo Request</span>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="Enter Company Name"
              className="p-2 border rounded-md"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter First Name"
              className="p-2 border rounded-md"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter Last Name"
              className="p-2 border rounded-md"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter Email"
              className="p-2 border rounded-md"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="phoneNumber">Phone Number</label>
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              defaultCountry="IN"
              value={formData.phoneNumber}
              onChange={onPhoneNumberChange}
            />
            {phoneError && <span className="text-red-500 text-xs">{phoneError}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="purpose">Purpose</label>
            <Select
              options={[
                { label: 'Demo', value: 'demo' },
                { label: 'Consultation', value: 'consultation' },
                { label: 'Other', value: 'other' },
              ]}
              value={formData.purpose}
              onChange={onPurposeChange}
            />
          </div>

          <div className="flex flex-col gap-1 md:col-span-2">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              placeholder="Enter Description"
              className="p-2 border rounded-md"
            />
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            name="terms"
            id="terms"
            checked={formData.terms}
            onChange={handleInputChange}
            className="mt-1 !text-blue-500"
          />
          <label htmlFor="terms">
            I agree to the terms of use to contact me via these means.
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`p-2 !rounded-md !w-full ${isFormValid() && !phoneError
            ? '!bg-blue-600 !text-white hover:!bg-blue-700'
            : '!bg-gray-300 !text-gray-500 !cursor-not-allowed'
            }`}
          disabled={!isFormValid() || !!phoneError}
        >
          Submit
        </button>
      </form>
    </div>

  );
}