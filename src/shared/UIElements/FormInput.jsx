
import { useEffect, useState } from "react";
import renderIcons from "../functions/renderIcons";

export default function FormInput({
  type, label, placeholder, customstyles,
  isMandatory, name, onChangeHandler, value,
  iconName, inputType 
}) {
  const [inputFieldType, setInputType] = useState('password')

  useEffect(() => {
    if (type !== 'password' || inputType !== 'password') {
      setInputType(type || inputType)
    }
  }, [])

  return (
    <div
      className="group w-full h-fit flex flex-col grow-1 gap-1 "
      style={customstyles}
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
      <div className=" group-focus-within:shadow-[0_0_0.5rem_0.1rem_var(--primary-color)] flex items-center gap-2 border focus:shadow-[0_0_0.5rem_0.1rem_var(--primary-color)]">
        <input
          id={name}
          value={value}
          type={inputFieldType || type || inputType}
          placeholder={placeholder || ''}
          onChange={onChangeHandler}
          className=" w-full grow-1 p-2 border-none outline-none "
        />
        {type === 'password' || inputType === 'password' &&
          (inputFieldType === 'password' ? <span
            className="pr-2"
            onClick={() => setInputType('text')}
          >
            {renderIcons('IoEyeOff', 15, 'inherit')}
          </span> :
            <span
              className="pr-2"
              onClick={() => setInputType('password')}
            >
              {renderIcons('IoEye', 15, 'inherit')}
            </span>)
        }
      </div>
    </div>
  )
}