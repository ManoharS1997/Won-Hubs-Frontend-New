
import { useState } from 'react'
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'
import renderIcons from '../functions/renderIcons';


export default function FormPhoneInput({ iconName, value, name, onChangeHandler, label, isMandatory }) {
  const [phoneError, setPhoneError] = useState('');

  const onPhoneNumType = (phoneNo) => {
    onChangeHandler(phoneNo, name)
    // Validate phone number
    if (phoneNo && !isValidPhoneNumber(phoneNo)) {
      setPhoneError('Invalid phone number');
    } else {
      setPhoneError('');
    }
  }

  return (
    <div
      className="w-[100%] h-fit flex !flex-col items-start grow-1 gap-2 md:gap-4"
    >
      <label
        htmlFor={name}
        className="w-full !flex gap-2"
      >
        {label || 'label'}
        {isMandatory === true && renderIcons('FaStarOfLife', 5, '#ff0000')}
        {iconName && <span className="border !border-[#ccc] rounded-[2px] ml-auto flex items-center justify-center p-[2px]">
          {renderIcons(iconName, 15, 'inherit')}
        </span>}
      </label>
      <div
        className='w-full md:w-full border p-2'
      >
        <PhoneInput
          international
          countryCallingCodeEditable={false}
          defaultCountry="IN"
          value={value}
          onChange={onPhoneNumType}
          className="!border-none !shadow-none [&>input]:!border-0 [&>input]:!shadow-none [&>input]:!outline-none"
        />
        {phoneError && <span className="text-red-500 text-xs">{phoneError}</span>}
      </div>
    </div>
  )
}