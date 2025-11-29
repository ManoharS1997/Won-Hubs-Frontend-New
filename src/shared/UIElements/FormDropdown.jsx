import { useEffect, useState } from "react";
import Select from "react-select";
import renderIcons from "../functions/renderIcons";
import Cookies from "js-cookie";

export const customStyles = {
  container: (base, state) => ({
    ...base,
    width: '100%'
  }),
  control: (base, state) => ({
    ...base,
    backgroundColor: state.isDisabled ? "#f0f0f0" : "white",
    borderColor: state.isFocused ? "#007bff" : "#ddd",
    boxShadow: state.isFocused ? "0 0 5px rgba(0, 123, 255, 0.5) !important" : "none",
    "&:hover": {
      borderColor: "#007bff",
    },
    padding: "0px",
    borderRadius: "0px !important",
    width: "100% !important", // Ensure it takes full width
    height: "100%", // Allow it to grow to the full height of the parent
    display: "flex",
    alignItems: "center",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "white",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    padding: "5px",
    width: "100%", // Ensure dropdown width matches the container
  }),
  option: (base, { isSelected, isFocused }) => ({
    ...base,
    backgroundColor: isSelected ? "#007bff" : isFocused ? "#f0f0f0" : "white",
    color: isSelected ? "white" : "black",
    padding: "10px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#007bff",
      color: "white",
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: "#333",
    fontWeight: "normal",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#aaa",
    fontStyle: "italic",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#007bff",
    "&:hover": {
      color: "#0056b3",
    },
  }),
  clearIndicator: (base) => ({
    ...base,
    color: "#ff4d4d",
    "&:hover": {
      color: "#ff0000",
    },
  }),
};

export default function FormDropdown({
  defaultValue, isDisabled, isLoading, isClearable, onChangeHandler,
  isRtl, isSearchable, options, label, type, isMandatory, name, noLabel,
  api_data, apiData, fieldData, iconName,onDetailedView,value
}) {
  const [optionsData, setOptionsData] = useState(options || [])
  // console.log(onDetailedView,"Heree")
  // console.log(options,"options Here")
  // console.log(defaultValue,"default Here")
  // console.log(value,"value Here")
  useEffect(() => {
    if (apiData) {
      const url = apiData.url;
      const options = {
        method: apiData.method,
        headers: {
          ...apiData?.headers,
          'authorization': `Bearer ${Cookies.get('accessToken')}`,
        },
      }
      const getOptions = async () => {
        const response = await fetch(url, options)
        const data = await response.json()

        // console.log('Data received from API:', apiData, label);
        if (data.success === true && data.data && Array.isArray(data.data)) {
          const formattedOptions = data.data.map(item => ({
            label: Array.isArray(apiData.label) ? apiData.label.map(optionLabel => item[optionLabel]).join(' ') : item[apiData?.label] || 'No Label',
            value: item[apiData?.value] || 'No Value',
          }))
          setOptionsData(formattedOptions)
        } else {
          console.error('Invalid data format received from API')
        }
      }
      getOptions()
      // console.error('Error fetching data:')
    }
  }, [apiData]);

// console.log(optionsData,"Options Data Here....")
// console.log(defaultValue,"Default Value Here....")
  return (
    <div className="group w-full h-fit flex flex-col grow-1 gap-1 ">
      {!noLabel && <label
        htmlFor={name}
        className="w-full !flex gap-2"
      >
        {label || 'label'}
        {isMandatory === true && renderIcons('FaStarOfLife', 5, '#ff0000')}
        {iconName && <span className="border !border-[#ccc] rounded-[2px] ml-auto flex items-center justify-center p-[2px]">
          {renderIcons(iconName, 15, 'inherit')}
        </span>}
      </label>}

      <div className="group-focus-within:shadow-[0_0_0.5rem_0.1rem_var(--primary-color)] flex items-center gap-2 border focus:shadow-[0_0_0.5rem_0.1rem_var(--primary-color)]">
        <Select
          className="basic-single"
          classNamePrefix="select"
          value={!onDetailedView?optionsData.find(option => option.value === defaultValue):optionsData.find(option => option.value === value)}
          onChange={onChangeHandler}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          name="color"
          options={optionsData}
          styles={customStyles}
        />
      </div>
    </div>
  )
}
