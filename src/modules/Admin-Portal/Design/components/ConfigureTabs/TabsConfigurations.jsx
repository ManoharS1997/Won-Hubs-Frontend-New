import renderIcons from "../../../../../shared/functions/renderIcons";
import Swal from "sweetalert2";
/**
 * TabsConfigurations component for configuring tab details.
 * Handles meta tag, name, reference tables, filters, length, configure fields, and description.
 */
export default function TabsConfigurations({
  isOpen,
  tabDetails,
  updateFieldColumnsData,
  updateFieldTabsData,
  dropdownContainerTabRef,
  handleRefTablesDropdown,
  selectRefTable,
  addReferenceTable,
  removeReferenceTable,
  dropdownContainerTabFilter,
  handleFilterDropdown,
  isSelectFilterOpen,
  addFilterItem,
  removeFilterItem,
  dropdownContainerTabConfigFields,
  handleConfigFieldsDropdown,
  isConfigFieldsOpen,
  addConfigItem,
  removeConfigItem,setIsOpen
}) {
  // Helper to render a dropdown list of checkboxes
  const renderDropdownList = (items, onChange, labelFormatter = (item) => item.name) => (
    <div className="absolute top-full left-0 w-full p-1 m-0 bg-white max-h-[250px] flex flex-col mt-1 rounded z-999 shadow-md">
      {items.map(item => (
        <div
          className="py-1 px-2 rounded flex border-b cursor-pointer hover:bg-[#d9d9d9]"
          key={item.id}
        >
          <input
            type="checkbox"
            id={item.id}
            checked={item.selected}
            onChange={e => onChange(item.id, e.target.checked)}
          />
          <label className="ml-1 p-2" htmlFor={item.id}>
            {labelFormatter(item)}
          </label>
        </div>
      ))}
    </div>
  );

  // Helper to render selected items as removable chips
  const renderSelectedChips = (items, onRemove, labelFormatter = (item) => item.name) =>
    items.filter(item => item.selected).map(item => (
      <li
        className="flex items-center justify-between w-fit gap-4 bg-[#594057] text-white rounded py-1 px-2"
        key={item.id}
      >
        {labelFormatter(item)}
        <button
          className="w-fit p-1 m-0 bg-transparent text-[#fbfefb] border-none outline-none flex items-center justify-center"
          type="button"
          id={item.id}
          onClick={() => onRemove(item.id)}
        >
          {renderIcons('MdOutlineClose')}
        </button>
      </li>
    ));

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
          text: "Your Button has been deleted.",
          icon: "success"
        });
      }
    })
  )
  return (
    <div
      className={`w-fit h-full box-border bg-gray-200 flex grow flex-col ${isOpen ? "0px" : "210px"
        } gap-2 p-2 lg:!p-4 overflow-y-auto shadow-[0_4px_30px_rgba(0,0,0,0.1)]`}
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

      <h2 className="text-center text-[20px] m-0">
        {tabDetails.details.name} Tab Configuration
      </h2>

      {/* Meta Tag Input */}
      <div className="flex items-center w-full h-fit">
        <label style={{ width: "40%" }}>Meta Tag:</label>
        <input
          className="p-2 rounded outline-none bg-white text-black border w-[60%] h-fit"
          type="text"
          id={tabDetails.id}
          value={tabDetails.Task}
          onChange={e =>
            updateFieldColumnsData("Task", e.target.id, e.target.value)
          }
        />
      </div>

      {/* Name Input */}
      <div className="flex items-center w-full h-fit">
        <label style={{ width: "40%" }} htmlFor={tabDetails.id}>
          Name :
        </label>
        <input
          className="p-2 rounded outline-none bg-white text-black border w-[60%] h-fit"
          type="text"
          id={tabDetails.id}
          onChange={e =>
            updateFieldTabsData("name", e.target.id, e.target.value)
          }
          value={tabDetails.details.name}
        />
      </div>

      {/* Reference Tables Dropdown */}
      <div className="flex items-center w-full h-fit">
        <label style={{ width: "40%" }} htmlFor={tabDetails.id}>
          Reference Tables :
        </label>
        <div
          className="relative w-[60%] h-[35px] flex items-center border rounded bg-white"
          style={{ flexGrow: 0, width: "60%", marginLeft: "auto" }}
          ref={dropdownContainerTabRef}
        >
          <div
            className="w-full h-full p-0 relative flex items-center justify-between mx-1 bg-white"
            onClick={handleRefTablesDropdown}
          >
            Select Table (s)
            {renderIcons("RiArrowDownSLine", 18, "inherit")}
          </div>
          {selectRefTable &&
            renderDropdownList(
              tabDetails.details.referenceTables,
              (id, checked) => addReferenceTable(tabDetails.id, id, checked)
            )}
        </div>
      </div>

      {/* Selected Reference Tables */}
      <div className="flex items-center w-full h-fit">
        <ol className="pl-0 flex flex-wrap gap-4 w-full list-decimal">
          {renderSelectedChips(
            tabDetails.details.referenceTables,
            id => removeReferenceTable(tabDetails.id, id)
          )}
        </ol>
      </div>

      {/* Filter Dropdown */}
      <div className="flex items-center w-full h-fit">
        <label style={{ width: "40%" }} htmlFor={tabDetails.id}>
          Filter :
        </label>
        <div
          className="relative w-[60%] h-[35px] flex items-center border rounded bg-white"
          style={{ flexGrow: 0, width: "60%", marginLeft: "auto" }}
          ref={dropdownContainerTabFilter}
        >
          <div
            className="w-full h-full p-0 relative flex items-center justify-between mx-1 bg-white"
            onClick={handleFilterDropdown}
          >
            Select Filter (s)
            {renderIcons("RiArrowDownSLine", 18)}
          </div>
          {isSelectFilterOpen &&
            renderDropdownList(
              tabDetails.details.filter,
              (id, checked) => addFilterItem(tabDetails.id, id, checked),
              item => `${item.name} (${item.referenceTable})`
            )}
        </div>
      </div>

      {/* Selected Filters */}
      <div className="flex items-center w-full h-fit">
        <ol className="pl-0 flex flex-wrap gap-4 w-full list-decimal">
          {renderSelectedChips(
            tabDetails.details.filter,
            id => removeFilterItem(tabDetails.id, id)
          )}
        </ol>
      </div>

      {/* Length Input */}
      <div className="flex items-center w-full h-fit">
        <label style={{ width: "40%" }} htmlFor={tabDetails.id}>
          Length:
        </label>
        <input
          className="p-2 rounded outline-none bg-white text-black border w-[60%] h-fit"
          type="text"
          id={tabDetails.id}
          onChange={e =>
            updateFieldTabsData("length", e.target.id, e.target.value)
          }
          value={tabDetails.details.length}
        />
      </div>

      {/* Configure Fields Dropdown */}
      <div className="flex items-center w-full h-fit">
        <label style={{ width: "fit-content" }} htmlFor="config-fields">
          Configure Fields :
        </label>
        <div
          className="relative w-[60%] h-[35px] flex items-center border rounded bg-white"
          style={{ flexGrow: 0, width: "60%", marginLeft: "auto" }}
          ref={dropdownContainerTabConfigFields}
        >
          <div
            className="w-full h-full p-0 relative flex items-center justify-between mx-1 bg-white"
            onClick={handleConfigFieldsDropdown}
          >
            Select Configure Field (s)
            {renderIcons("RiArrowDownSLine", 18)}
          </div>
          {isConfigFieldsOpen &&
            renderDropdownList(
              tabDetails.details.configureFields,
              (id, checked) => addConfigItem(tabDetails.id, id, checked),
              item => `${item.name} (${item.referenceTable})`
            )}
        </div>
      </div>

      {/* Selected Configure Fields */}
      <div className="flex items-center w-full h-fit">
        <ol className="pl-0 flex flex-wrap gap-4 w-full list-decimal">
          {renderSelectedChips(
            tabDetails.details.configureFields,
            id => removeConfigItem(tabDetails.id, id),
            item => `${item.name} (${item.referenceTable})`
          )}
        </ol>
      </div>

      {/* Description Textarea */}
      <label style={{ width: "40%" }}>Description:</label>
      <textarea
        className="outline-none bg-white text-black rounded p-2 w-fit grow min-h-[10vh]"
        cols={20}
        rows={5}
        value={tabDetails.details.description}
        id={tabDetails.id}
        style={{ width: "100%", flexGrow: 0 }}
        onChange={e =>
          updateFieldTabsData("description", e.target.id, e.target.value)
        }
      ></textarea>
      {!tabDetails?.isDefault && <button
        type='button'
        onClick={onDelete}
        className="w-full !bg-red-500 text-white py-2 !rounded mt-auto"
      >
        DELETE
      </button>}
    </div>
  );
}