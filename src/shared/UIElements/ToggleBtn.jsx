import React, { useState } from 'react'
import { SiTicktick } from "react-icons/si";


const ToggleBtn = ({ isChecked, handleCheckboxChange, customStyles, checkboxProps, isDisabled, showTick }) => {

    return (
        <label className='flex cursor-pointer select-none items-center'>
            <div className='relative'>
                <input
                    type='checkbox'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className='sr-only'
                    disabled={isDisabled}
                    {...checkboxProps}
                />
                <div
                    className={`box block h-4 w-7 rounded-full 
                            ${isChecked ? isDisabled ? 'bg-[#b0bcfd]' : 'bg-primary' : 'bg-[#ccc]'}
                         `}
                    style={customStyles?.ball}
                >
                </div>
                <div
                    className={`absolute left-[0.125rem] top-[0.125rem] flex h-3 w-3
                            items-center justify-center rounded-full
                            bg-white transition ${isChecked ? 'translate-x-full' : ''
                        }`}
                    style={customStyles?.slider}
                >
                    {isChecked && showTick && <SiTicktick className='text-green-600' />}
                </div>
            </div>
        </label>
    )
}

export default ToggleBtn
