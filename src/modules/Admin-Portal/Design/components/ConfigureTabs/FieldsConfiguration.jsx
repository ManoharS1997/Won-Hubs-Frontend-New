import { useState } from "react";
import renderIcons from "../../../../../shared/functions/renderIcons";
import Swal from "sweetalert2";
import { GetIconsList } from "../../../../../utils/CheckAndExecuteFlows/CRUDoperations";
import { useEffect } from "react";
import convertName from "../../../../../utils/conevrtName";
import { FaClock } from "react-icons/fa6";
import Select from "react-dropdown-select";

/**
 * Fieldsconfiguration component for configuring field properties.
 * @param {Object} props - Component props.
 */
export default function Fieldsconfiguration({
  isOpen, fieldDetails, updateFieldColumnsData, dropdownContainerRef,
  handleDropDownToggle, isDropdownOpen, searchTerm, setSearchTerm,
  filteredDropdownOptions, option, updateOption, addSelectOption,
  UpdatedSelectOptions, removeSelectOption, dropdownContainerRef2,
  handleAccessDropDownToggle, isAccessDropdownOpen, AccessUsers,
  handleAccessCheckBox, setIsOpen,
}) {
  const [icons, setIcons] = useState([])
  const [selectedIcon, setSelectedIcon] = useState(null)

  useEffect(() => {
    const fetchIconsList = async () => {
      try {
        const iconsList = await GetIconsList();
        if (iconsList) {
          // Assuming you want to do something with the iconsList
          // console.log("Icons List:", iconsList);
          setIcons(
            Object.keys(iconsList.data)
              .map(icon => ({ name: icon, value: iconsList.data[icon] }))
              .sort((a, b) => a.name.localeCompare(b.name))
          );
        }
      } catch (error) {
        console.error("Error fetching icons list:", error);
      }
    }
    fetchIconsList()
  }, [fieldDetails])


  // Helper to render access user checkbox
  const renderAccessCheckbox = (role) => (
    <div
      className="py-1 px-2 rounded flex border-b cursor-pointer hover:bg-[#d9d9d9]"
      key={role}
    >
      <input
        type="checkbox"
        id={role}
        checked={AccessUsers.includes(role)}
        onChange={() => handleAccessCheckBox(role)}
      />
      <label className="ml-1 p-2" htmlFor={role} style={{ marginLeft: 3 }}>
        {role}
      </label>
    </div>
  );

  // List of access roles
  const accessRoles = [
    "Super Admin",
    "Admin",
    "Internal User",
    "External User",
  ];

  const onDelete = () => (
    Swal.fire({
      title: "Are you sure want to delete this field?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your field has been deleted.",
          icon: "success"
        });
      }
    })
  )

  console.log('icons list: ', icons)
  return (
    <div
      className={`w-fit h-full box-border bg-gray-200 flex grow flex-col ${isOpen ? "0px" : "210px"
        } gap-2 p-2 lg:!p-5 overflow-y-auto shadow-[0_4px_30px_rgba(0,0,0,0.1)]`}
    >
      {/* Close button */}
      <button
        type="button"
        className="w-fit self-end !rounded-full"
        onClick={() => setIsOpen(false)}
        aria-label="Close"
      >
        {renderIcons("IoIosClose")}
      </button>

      {/* Title */}
      <h2 className="text-center !text-[20px] m-0">
        {fieldDetails.details.name} Configuration
      </h2>

      {/* Meta Tag Input */}
      <div className="flex items-center w-full h-fit bg-inherit">
        <label style={{ width: "40%" }}>Meta Tag :</label>
        <input
          className="p-2 rounded outline-none bg-white text-black border w-[60%] h-fit"
          type="text"
          id={fieldDetails.id}
          value={fieldDetails.Task}
          onChange={(e) =>
            updateFieldColumnsData("Task", e.target.id, e.target.value)
          }
        />
      </div>

      {/* Name Input */}
      <div className="flex items-center w-full h-fit">
        <label style={{ width: "40%" }} htmlFor={fieldDetails.id}>
          Name :
        </label>
        <input
          className="p-2 rounded outline-none bg-white text-black border w-[60%] h-fit"
          type="text"
          id={fieldDetails.id}
          value={fieldDetails.details.name}
          onChange={(e) =>
            updateFieldColumnsData("name", e.target.id, e.target.value)
          }
        />
      </div>

      {/* Type Dropdown */}
      <div className="flex items-center w-full h-fit">
        <label style={{ width: "40%" }} htmlFor="type">
          Type :
        </label>
        <div
          className="relative w-[60%] h-[35px] flex items-center border rounded bg-white"
          ref={dropdownContainerRef}
        >
          <div
            className="w-full h-full p-0 relative flex items-center justify-between mx-1 bg-white cursor-pointer"
            onClick={handleDropDownToggle}
          >
            {fieldDetails.details.type || "Data Type..."}
            {renderIcons("RiArrowDownSLine", 18, "inherit")}
          </div>

          {/* Dropdown Options */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 w-full p-1 m-0 bg-white max-h-[250px] flex flex-col mt-1 rounded z-999 shadow-md">
              <input
                className="bg-white border h-[9%] w-full rounded text-black outline-none px-2 py-1 m-1 ml-0"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="overflow-y-auto overflow-x-hidden w-full min-h-fit max-h-[80%] flex flex-col rounded p-1">
                {filteredDropdownOptions.map((option) => (
                  <div
                    className="py-1 px-2 rounded flex border-b cursor-pointer hover:bg-[#d9d9d9]"
                    key={option}
                    data-option-value={option}
                    onClick={() =>
                      updateFieldColumnsData(
                        "type",
                        fieldDetails.id,
                        option.toLowerCase()
                      )
                    }
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-">
        <label className="w-[40%]">Icon: </label>

        <Select
          options={icons}
          values={[]}
          className="gap-4 bg-white rounded"
          contentRenderer={({ props, state }) => (
            <div style={{ cursor: 'pointer' }}>
              {/* {state.values.length} of {props.options.length} selected */}
              {state.values.length > 0 ? (
                <div className="flex items-center gap-2">
                  {state.values.map((item) => (
                    <div
                      key={item.value}
                      className="flex items-center gap-2"
                      onClick={() => setSelectedIcon(item.value)}
                    >
                      {renderIcons(item.value, 20)}
                      {convertName(item.name)}
                      <button
                        className="ml-2 text-red-500"
                        onClick={() => {
                          const newValues = state.values.filter(
                            (v) => v.value !== item.value
                          );
                          state.setValues(newValues);
                        }}
                        aria-label="Remove Icon"
                      >
                        {renderIcons("MdOutlineClose", 15)}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500">No icons selected</div>
              )}
            </div>
          )}
          itemRenderer={({ item, methods }) => (
            <li
              className="list-none my-2 px-2 py-1 rounded hover:bg-blue-300"
            >
              <div className="flex items-center gap-4" onClick={() => methods.addItem(item)}>
                {renderIcons(item.value, 20)}
                {convertName(item.name)}
              </div>
            </li>
          )}
        />
      </div>

      {/* Select Options for 'select' type */}
      {fieldDetails.details.type === "select" && (
        <>
          <div
            className="flex items-center w-full h-fit justify-between"
          >
            <label>Options : </label>
            <input
              className="p-2 rounded outline-none bg-white text-black border w-[60%] h-fit"
              type="text"
              value={option}
              onChange={(e) => updateOption(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" ? addSelectOption(fieldDetails.id) : null
              }
            />
            <button
              className="py-1 px-4 bg-[rgba(1,0,255,0.15)] text-[#284b63] flex justify-between items-center rounded outline-none border-none cursor-pointer h-full w-fit active:bg-white active:text-black"
              type="button"
              onClick={() => addSelectOption(fieldDetails.id)}
              aria-label="Add Option"
            >
              {renderIcons("MdAddTask", 15)}
            </button>
          </div>

          {/* List of options */}
          <div className="flex items-center w-full h-fit">
            <ol className="pl-0 flex flex-wrap gap-4 w-full list-decimal">
              {UpdatedSelectOptions().map((option) => (
                <li
                  className="flex items-center justify-between w-fit gap-4 bg-[#594057] text-white rounded py-1 px-2"
                  key={option}
                >
                  {option}
                  <button
                    className="w-fit p-1 m-0 bg-transparent text-[#fbfefb] border-none outline-none flex items-center justify-center"
                    type="button"
                    id={fieldDetails.id}
                    onClick={() => removeSelectOption(fieldDetails.id, option)}
                    aria-label="Remove Option"
                  >
                    <span id={fieldDetails.id}>
                      {renderIcons("MdOutlineClose")}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </>
      )}

      {/* Length Input */}
      <div className="flex items-center w-full h-fit">
        <label style={{ width: "40%" }} htmlFor={fieldDetails.id}>
          Length :
        </label>
        <input
          className="p-2 rounded outline-none bg-white text-black border w-[60%] h-fit"
          type="text"
          value={fieldDetails.details.length}
          id={fieldDetails.id}
          onChange={(e) =>
            updateFieldColumnsData("length", e.target.id, e.target.value)
          }
        />
      </div>

      {/* Access Dropdown */}
      <div className="flex items-center w-full h-fit">
        <label>Who Can Access:</label>
        <div
          className="relative w-[60%] h-[35px] flex items-center border rounded bg-white ml-auto"
          ref={dropdownContainerRef2}
        >
          <div
            className="w-full h-full p-0 relative flex items-center justify-between mx-1 bg-white cursor-pointer"
            onClick={handleAccessDropDownToggle}
          >
            {"Choose..."}
            {renderIcons("RiArrowDownSLine", 18)}
          </div>

          {/* Access Dropdown Options */}
          {isAccessDropdownOpen && (
            <div className="absolute top-full left-0 w-full p-1 m-0 bg-white max-h-[250px] flex flex-col mt-1 rounded z-999 shadow-md">
              {accessRoles.map(renderAccessCheckbox)}
            </div>
          )}
        </div>
      </div>

      {/* Required Checkbox */}
      <div className="flex items-center w-full h-fit">
        <label style={{ width: "40%" }}>Required :</label>
        <input
          type="checkbox"
          checked={fieldDetails.details.required}
          id={fieldDetails.id}
          onChange={(e) =>
            updateFieldColumnsData(
              "required",
              e.target.id,
              e.target.checked
            )
          }
        />
      </div>

      {/* Placeholder Input */}
      <label style={{ width: "40%" }}>Placeholder :</label>
      <input
        className="p-2 rounded outline-none bg-white text-black border w-[60%] h-fit"
        style={{ width: "100%" }}
        value={fieldDetails.details.placeholder}
        id={fieldDetails.id}
        onChange={(e) =>
          updateFieldColumnsData(
            "placeholder",
            e.target.id,
            e.target.value
          )
        }
      />

      {/* Description Textarea */}
      <label style={{ width: "40%" }}>Description :</label>
      <textarea
        className="outline-none bg-white text-black rounded p-2 w-fit grow min-h-[10vh]"
        cols={20}
        rows={5}
        value={fieldDetails.details.description}
        id={fieldDetails.id}
        style={{ width: "100%", flexGrow: 0 }}
        onChange={(e) =>
          updateFieldColumnsData(
            "description",
            e.target.id,
            e.target.value
          )
        }
      ></textarea>

      {!fieldDetails?.isDefault && <button
        type='button'
        onClick={onDelete}
        className="w-full !bg-red-500 text-white py-2 !rounded mt-auto"
      >
        DELETE
      </button>}
    </div>
  );
}