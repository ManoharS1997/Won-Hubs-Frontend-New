import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const CustomInputPhone = () => {
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')

    const handlePhoneChange = (value) => {
        setPhone(value);
        setError('');

        if (value) {
            // Parse the phone number using libphonenumber-js
            const phoneNumber = parsePhoneNumberFromString(value);

            if (phoneNumber) {
                const country = phoneNumber.country;
                const nationalNumber = phoneNumber.nationalNumber;

                // Get the minimum and maximum number length for the country
                // const minLength = phoneNumber.metadata.countryCallingCode.length;
                const maxLength = phoneNumber.number.length;

                if (nationalNumber.length > maxLength) {
                    setError(`Phone number is too long for the selected country (${country})`);
                } else {
                    setError('');
                }
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!error && phone) {
            alert('Phone number submitted: ' + phone);
        } else {
            alert('Please provide a valid phone number!');
        }
    }

    return (
        <PhoneInput
            international
            defaultCountry="US"
            value={phone}
            onChange={handlePhoneChange}
        />
    )
}

export default CustomInputPhone;
