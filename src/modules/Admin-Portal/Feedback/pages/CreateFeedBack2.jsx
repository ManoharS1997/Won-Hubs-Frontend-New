import React, { useState } from 'react'
import { IoMdAdd } from 'react-icons/io';

export const fieldsList = [
  { fieldName: 'Address', isAdded: false, value: 'India  -6-284-1, Uma Shankar Nagar, Revenue Ward -17 , YSR Tadigadapa, 520007.' },
  { fieldName: 'Assigned Member', isAdded: false, value: 'Kartheek Muppiri' },
  { fieldName: 'Category', isAdded: false, value: 'WON-Platform' },
  { fieldName: 'Contact Number', isAdded: false, value: '+19 2568974613' },
  { fieldName: 'Created By', isAdded: false, value: 'Sriram Kakani' },
  { fieldName: 'Department', isAdded: false, value: 'Technical' },
  { fieldName: 'Description', isAdded: false, value: 'This ticket is assigned for update the client requirements in the Admin Portal' },
  { fieldName: 'Due Date', isAdded: false, value: '22/2/2024' },
  { fieldName: 'Email Address', isAdded: false, value: 'Kartheek.M@nowitservices.com' },
  { fieldName: 'Internal Notes', isAdded: false, value: '{empty}' },
  { fieldName: 'Location', isAdded: false, value: 'Vijayawada' },
  { fieldName: 'Priority', isAdded: false, value: '1-High' },
  { fieldName: 'State', isAdded: false, value: 'Created' },
  { fieldName: 'Sub-department', isAdded: false, value: 'MERN Developer' },
  { fieldName: 'Subject', isAdded: false, value: '{empty}' },
]
const CreateFeedBack2 = () => {
    const [fieldsListData, setFieldsListData] = useState(fieldsList);
    console.log(fieldsListData, "Fields List Data here")
  return (
      <div className='flex h-[100%] w-[100%] border-2'>
        <div className='flex'>
            {/* additional fields */}
          <div className="hidden w-[17vw] h-full md:flex flex-col p-4 bg-[#353535] text-white overflow-y-auto custom-scrollbar">
            <h2 className="text-center">Additional Fields</h2>
            <ul className="flex flex-col gap-[10px] pl-0">
              {fieldsListData.map((item) =>
                item.isAdded ? null : (
                  <button
                    key={item.fieldName}
                    // onClick={() => handleAddField(item.fieldName, item.value)}
                    className="p-[10px] w-full h-fit bg-black outline-none border border-white text-white text-center flex justify-between items-center rounded-md hover:border-[#9ef01a] hover:text-[#9ef01a]"
                  >
                    {item.fieldName}
                    <IoMdAdd />
                  </button>
                )
              )}
            </ul>
          </div>
      </div>
      </div>
  )
}

export default CreateFeedBack2