
import { useEffect, useState } from 'react';
import { getRecordData } from '../../../../utils/CheckAndExecuteFlows/CRUDoperations';
import convertName from '../../../../utils/conevrtName';
import FormInput from '../../../../shared/UIElements/FormInput';

const recordTabsList = [
  { id: 1, name: 'Details' },
  { id: 2, name: 'History' },
  { id: 3, name: 'RelatedRecords' },
  { id: 4, name: 'Attachments' },
  { id: 5, name: 'Child Details' },
  { id: 6, name: 'Users' },
  { id: 7, name: 'Groups' },
  { id: 8, name: 'Companies' },
  { id: 9, name: 'Roles' },
  { id: 10, name: 'Locations' },
  { id: 11, name: 'Department' },
  { id: 12, name: 'CMDB' },
  { id: 13, name: 'Connections' },
]

export default function DetailedView({ recordId, tableName }) {
  const [recordData, setRecordData] = useState(null);
  const [recordFields, setRecordFields] = useState(null);
  const [recordTabs, setRecordTabs] = useState(recordTabsList);
  const [activeTab, setActiveTab] = useState(1)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecordDetails();
    setActiveTab(1);
  }, [recordId]);

  const getRecordDetails = async () => {
    setLoading(true);
    try {
      const response = await getRecordData(tableName, recordId);
      setRecordData(response.data[0]);
      setRecordFields(Object.keys(response.data[0]));
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  const switchFieldByType = (fieldType, field) => {
    // console.log(fieldType)
    switch (fieldType) {
      case 'boolean':
        return <FormInput
          inputType={'text'}
          name={convertName(field)}
          label={convertName(field)}
          value={recordData[field]}
          // placeholder={'Enter role name'}
        // isMandatory={formData.role_name.isMandatory}
        // onChangeHandler={onChangeInputField}
        // iconName={'MdPassword'}
        />
      case 'date':
        return <FormInput
          inputType={'text'}
          name={convertName(field)}
          label={convertName(field)}
          value={recordData[field]}
          // placeholder={'Enter role name'}
        // isMandatory={formData.role_name.isMandatory}
        // onChangeHandler={onChangeInputField}
        // iconName={'MdPassword'}
        />
      // <input type='date' value={recordData[field]} className='w-[70%] h-[2rem] border border-gray-300 py-[0.3rem] px-[0.5rem] rounded-md' />
      case 'datetime':
        return <FormInput
          inputType={'text'}
          name={convertName(field)}
          label={convertName(field)}
          value={recordData[field]}
          // placeholder={'Enter role name'}
        // isMandatory={formData.role_name.isMandatory}
        // onChangeHandler={onChangeInputField}
        // iconName={'MdPassword'}
        />
      // <input type='datetime-local' value={recordData[field]} className='w-[70%] h-[2rem] border border-gray-300  py-[0.3rem] px-[0.5rem] rounded-md' />
      case 'number':
        return <FormInput
          inputType={'text'}
          name={convertName(field)}
          label={convertName(field)}
          value={recordData[field]}
          placeholder={'Enter role name'}
        // isMandatory={formData.role_name.isMandatory}
        // onChangeHandler={onChangeInputField}
        // iconName={'MdPassword'}
        />
      //  <input type='number' value={recordData[field]} className='w-[70%] h-[2rem] border border-gray-300  py-[0.3rem] px-[0.5rem] rounded-md' />
      case 'string':
        return <FormInput
          inputType={'text'}
          name={convertName(field)}
          label={convertName(field)}
          value={recordData[field]}
          // placeholder={'Enter role name'}
        // isMandatory={formData.role_name.isMandatory}
        // onChangeHandler={onChangeInputField}
        // iconName={'MdPassword'}
        />
      //  <input type='text' value={recordData[field]} className='w-[70%] h-[2rem] border border-gray-300 py-[0.3rem] px-[0.5rem] rounded-md' />
      default:
        return <FormInput
          inputType={'text'}
          name={convertName(field)}
          label={convertName(field)}
          value={recordData[field]}
          placeholder={'Enter role name'}
        // isMandatory={formData.role_name.isMandatory}
        // onChangeHandler={onChangeInputField}
        iconName={'MdPassword'}
        />
      // <input type='text' value={`${recordData[field]}`} className='w-[70%] h-[2rem] border border-gray-300  py-[0.3rem] px-[0.5rem] rounded-md' />
    }
  }

  // console.log(recordData);

  return (
    
    <div
      className='w-full h-fit max-h-[82vh] overflow-hidden flex flex-col grow-1 gap-2 p-0 !rounded-b-[0.5rem] bg-[var(--background-color)] text-[var(--text-color)]'
      style={{ borderRadius: '0.5rem' }}
    >
      <div
        className={`h-[5%] `}
        style={{ background: `var(--primary-color)` }}
      >
        <ul
          className='h-[2rem] flex items-end gap-2 m-0 p-[0rem] overflow-auto no-scrollbar rounded-[0.5rem]'
          style={{ padding: '0 0.5rem' }}
        >
          {recordTabs.map(tab => (
            <li
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-fit h-[80%] flex py-[0.3rem]  px-[1rem] 
                ${activeTab === tab.id ? 'bg-white text-[var(--primary-color)]' : 'bg-inherit  text-[#fff]'}
                rounded-t-[0.3rem] font-700 text-nowrap hover:bg-[#ccc] hover:!text-black cursor-pointer
                `}
            >
              <span> {tab.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className='w-full flex items-center justify-end gap-4 px-[1rem]'>
        <button type='button' className='py-2 px-4 text-white !bg-blue-500 !rounded-md' >
          {/* <MdArrowBackIos /> */}
          Save
        </button>
        <button type='button' className='py-2 px-4 text-white !bg-blue-500 !rounded-md' >
          {/* <MdArrowBackIos /> */}
          Update
        </button>
      </div>

      {activeTab === 1 ?
        <ul className='h-[95%] grow-1 grid md:grid-cols-2 gap-4 p-4 m-0 overflow-auto !rounded-b-[1rem]'>
          {recordFields && recordFields.map((field, index) => (
            <li key={index} className='flex flex-row gap-4'>
              <div className='w-full flex items-center '>
                
                {switchFieldByType(typeof recordData[field], field)}
                {/* <input type='text' /> */}
              </div>
              {/* <span>{recordData[field]}</span> */}
            </li>
          ))}
        </ul> :
        <div className='h-full flex grow-1 items-center justify-center text-gray-400 font-bold text-2xl'>No Data Available</div>}
    </div>
  );
}
