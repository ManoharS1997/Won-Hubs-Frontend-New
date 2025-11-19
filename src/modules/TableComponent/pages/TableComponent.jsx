import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import {
  getTableData,
  UpdateSelectedColumns,
  DeleteRecord,
} from "../../../utils/CheckAndExecuteFlows/CRUDoperations";
// import { Tooltip } from 'react-tooltip';

import Checkbox from "@mui/material/Checkbox";

import { GrConfigure } from "react-icons/gr";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowRoundUp,
  IoIosArrowRoundDown,
} from "react-icons/io";
import { RiFilter2Line } from "react-icons/ri";
import { GoPlus } from "react-icons/go";
import { IoClose, IoReloadSharp } from "react-icons/io5";
import { FaGripLinesVertical } from "react-icons/fa6";
import { LuAmpersand } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";
import {
  MdOutlineFilterListOff,
  MdDelete,
  MdLabelImportant,
} from "react-icons/md";
import { BiExport } from "react-icons/bi";
import { RxOpenInNewWindow } from "react-icons/rx";

import ConfigureFields from "../../Admin-Portal/ConfigureFields/pages/ConfigureFields";
import DetailedView from "../../Admin-Portal/DetailedView/pages/DetailedView";
import ExportData from "../../../shared/components/ExportTableData";
import MoreOptions from "../components/MoreOptions";
import CreateNotification from "../../Admin-Portal/Notifications/pages/CreateNotification";
import CreateTemplate from "../../Admin-Portal/Templates/pages/CreateTemplate";
import {
  TableContainer,
  CustomTable,
  CustomThead,
  CustomTh,
  CustomTr,
  CustomTbody,
  CustomTd,
  CheckBoxTag,
  MainContainer,
  ConfigureButton,
  BackBtn,
  HeaderContainer,
  TitleContainer,
  FilterBtn,
  MultiLevelDropdownContainer,
  DropdownToggle,
  DropdownMenu,
  MenuItem,
  SubMenu,
  SubMenuItem,
  ActionsContainer,
  SearchInput,
  FilterContainer,
  FiltersContainer,
  SearchContainer,
  OrBtn,
  AndBtn,
  AndOrBtnClose,
  ReloadBtn,
  TableFooter,
  PaginationBtnsContainer,
  PaginationArrBtn,
  ColumnOptions,
  HeadTr,
  ThContent,
  ColumnOptionsPopup,
  SortOptBtn,
  ClearSortingsBtn,
  RowActionsContainer,
  RowActionBtn,
} from "./StyledComponents";
import CreateAlerts from "../../Admin-Portal/Alerts/pages/CreateAlerts";
import CreateFeedback from "../../Admin-Portal/Feedback/pages/CreateFeedback";
import { selectedGridRowsCountSelector } from "@mui/x-data-grid";
import FormDesignerPage from "../../Admin-Portal/form/formDesignerPage";
import CreateFeedBack2 from "../../Admin-Portal/Feedback/pages/CreateFeedBack2";
import FlowStepComponent from "../../Admin-Portal/Templates/pages/FlowStep";
const conditions = ["Like", "Not Like", "Equals To", "Not Equals To"];

// <<<<<Model Styles
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    top: "10%",
    left: "4%",
    right: "2%",
    bottom: "8%",
    borderRadius: "10px",
    width: "92vw",
    height: "87vh",
    overflow: "hidden",
    padding: "3px",
    zIndex: "5",
  },
};
// Model Styles>>>>>

const selectCustomStyles = {
  control: (provided) => ({
    ...provided,
    // border: 'none', // Remove border from control
    boxShadow: "none", // Remove box-shadow
    borderRadius: "50px",
    "&:hover": {
      // border: 'none', // Remove border on hover
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    marginRight: "0", // Remove margin-right to eliminate space
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: "0.2rem", // Remove padding from the indicator
  }),
  indicatorSeparator: () => ({
    display: "none", // Hide the separator line between the label and arrow
  }),
};

export default function TableComponent({
  // selectedColumns,
  // filteredData,
  recordsPerPage,
  allowDeleting,
  createNewPath,
  id,
  tableData,
  TableColumnNames,
  setTableColumnNames,
  showConfigurefieldsBtn,
  selectedRows,
  tableName,
  title,
  fetchTableData,
  rdtColValue,
  redirectionPath,
  formData,
  activeTable,
}) {
  const [recievedTableData, setTableData] = useState(tableData);
  const [selectedRowIds, setselectedRowIds] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [isConfigureActive, setConfigure] = useState(false);
  const [isFilterActive, setFilterStatus] = useState(false);
  const [searchingText, setSearchingText] = useState("");
  const [allTableFields, setAllTableFields] = useState(TableColumnNames || []);
  const [filterConditions, setFilterConditions] = useState([
    {
      filter: "",
      condition: "",
      searchText: "",
      logicalOperator: "",
      filterDisplayText: "",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [currPage, setCurrentPage] = useState(1);
  const [isSortingsApllied, setSortingsApplied] = useState(false);
  const [selectedTab, setSelectedTab] = useState(tableName);
  const [oppenedRecordsList, setOppenedRecordsList] = useState([]);
  const navigate = useNavigate();
  const maxPages = Math.ceil(recievedTableData.length / 10);
  function formatDateForMySQL(isoDateString) {
    const date = new Date(isoDateString);

    // Format date as YYYY-MM-DD HH:MM:SS
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // pad with leading zeros
    const day = ("0" + date.getDate()).slice(-2); // pad with leading zeros
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  useEffect(() => {
    setTableData(tableData);
    setAllTableFields(TableColumnNames || []);
    getSelectedColumns();
  }, [tableData, TableColumnNames]);

  useEffect(() => {
    updateSelectedColumns();
  }, [selectedColumns]);

  console.log(formData, "====");

  const SelectedRowActionsList = ["Delete", "Mark As Favorite", "Move", "Copy"];

  const convertName = (name) => {
    const nameArr = name.split("_");
    const convertedName = nameArr.map(
      (item) => item[0].toUpperCase() + item.slice(1)
    );
    return convertedName.join(" ");
  };

  const OnSelectedRowActions = (action) => {
    if (action === "Delete") {
      const x = recievedTableData.filter(
        (item) => !selectedRows.includes(item.ticket_id)
      );
      setTableData(x);
    }
    // setIsAllCheckBoxActive(false);
  };

  const updateSelectedColumns = async () => {
    if (selectedColumns.length > 0) {
      // console.log('updating selectedColumns')
      await UpdateSelectedColumns(tableName, JSON.stringify(selectedColumns));
    }
  };

  const getSelectedColumns = async () => {
    const columns = await getTableData("table_selected_columns");
    // console.log(columns,"in get selected")
    const displayColumns =
      columns?.table_selected_columns?.filter((record) => {
        // console.log(record.table_name, tableName)
        return record.table_name === tableName;
      })[0]?.selected_columns || [];
    // console.log(displayColumns,"in display")

    setSelectedColumns(displayColumns);
  };

  const SelectAllCheckBox = (e) => {
    const selectAll = e.target.checked;
    const selectedRowIds = (
      recordsPerPage ? tableData.slice(0, recordsPerPage) : tableData
    ).map((item) => item.id);
    if (selectAll) {
      setselectedRowIds(selectedRowIds);
    } else {
      setselectedRowIds([]);
    }
  };

  const CheckboxChange = (ID) => {
    // console.log(ID)
    if (!selectedRowIds.includes(ID)) {
      setselectedRowIds([...selectedRowIds, ID]);
    } else {
      setselectedRowIds(selectedRowIds.filter((item) => item !== ID));
    }
  };

  const camelCaseToReadable = (columns) => {
    const readableColumns = columns.map((column) => {
      return (
        column.name
          .replace(/_/g, " ") // Replace underscores with space
          .replace(/([A-Z])/g, " $1") // Add space before capital letters
          .replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter

          // Capitalize the first letter of each word
          .replace(/\b\w/g, (str) => str.toUpperCase())
      );
    });

    return readableColumns;
  };

  const closeConfig = () => {
    setConfigure(false);
  };

  const OnSetFilter = (index, event) => {
    console.log(event.value);
    const text = event.value.name;
    // Capitalize the filter text
    const snakeCase = text.replace(/([A-Z])/g, (match) => match.toLowerCase());
    // Create a copy of filterConditions array
    const Filters = [...filterConditions];
    // Update the specific filter at the given index
    console.log(Filters, "Filters Here");
    Filters[index] = {
      ...Filters[index],
      filter: snakeCase,
      filterDisplayText: text,
    };
    // Update state with the modified Filters array
    setFilterConditions(Filters);
  };

  const OnsetCondition = (index, event) => {
    const text = event.value;
    // Create a copy of filterConditions array
    const Filters = [...filterConditions];
    // Update the specific filter at the given index with the new condition
    Filters[index] = {
      ...Filters[index],
      condition: text,
    };
    // Update state with the modified Filters array
    setFilterConditions(Filters);
  };

  const onSetSearchText = (e, index) => {
    const text = e.target.value;
    const filters = [...filterConditions];
    filters[index] = { ...filters[index], searchText: text };
    setFilterConditions(filters);
  };

  const onAnd = (index) => {
    if (filterConditions.length < 5) {
      const updatedConditions = [...filterConditions];
      updatedConditions[index] = {
        ...updatedConditions[index],
        logicalOperator: "AND",
      };

      setFilterConditions([
        ...updatedConditions,
        { filter: "", condition: "", searchText: "", logicalOperator: "" },
      ]);
    }
  };

  const onOr = (index) => {
    if (filterConditions.length < 5) {
      const updatedConditions = [...filterConditions];
      updatedConditions[index] = {
        ...updatedConditions[index],
        logicalOperator: "OR",
      };

      setFilterConditions([
        ...updatedConditions,
        { filter: "", condition: "", searchText: "", logicalOperator: "" },
      ]);
    }
  };

  const RemoveFilterContainer = (index) => {
    const Filters = [...filterConditions];
    if (Filters.length > 1) {
      Filters.splice(index, 1);
      setFilterConditions(Filters);
    }
  };

  // Toggling Filter container visibility
  const OnFilter = () => {
    setFilterStatus(!isFilterActive);
  };

  // go back button functionality
  const OnBack = () => {
    // Navigate to a specific route
    navigate(-1);
  };

  // handling searching text on change
  const onChangeSearchText = (e) => {
    const newText = e.target.value;
    setSearchingText(newText);

    const filteredData = tableData.filter((row) => {
      return Object.keys(row).some((key) => {
        // console.log(key, row[key])
        if (row && key && row[key]) {
          return row[key]
            .toString() // Convert the value to string in case it's not
            .toLowerCase()
            .includes(newText.toLowerCase());
        }
      });
    });

    setTableData(filteredData);
  };

  const sortTableData = (fieldName, order) => {
    // const  =
    // console.log(fieldName, order)
    const readableToCamelCase = (column) => {
      const camelCaseColumns = column
        .toLowerCase() // Convert the entire string to lowercase first
        .replace(
          /(?:^\w|[A-Z]|\b\w|\s+)/g,
          (match, index) =>
            index === 0 ? match.toLowerCase() : match.toUpperCase().trim() // Capitalize letters after the first word, remove spaces
        );

      return camelCaseColumns;
    };

    const sortedData = [...tableData].sort((a, b) => {
      let valueA = a[readableToCamelCase(fieldName)];
      let valueB = b[readableToCamelCase(fieldName)];
      // console.log(a, b, valueA, valueB, fieldName)

      // If sorting by numbers
      if (typeof valueA === "number" && typeof valueB === "number") {
        // console.log(order === 'asc' ? valueA - valueB : valueB - valueA)
        return order === "asc" ? valueA - valueB : valueB - valueA;
      }

      // If sorting by strings
      if (typeof valueA === "string" && typeof valueB === "string") {
        // console.log(order === 'asc'
        //     ? valueA.localeCompare(valueB)
        //     : valueB.localeCompare(valueA))

        return order === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return 0; // In case of unknown type, don't change order
    });
    // console.log(sortedData)

    setTableData(sortedData); // Update the state with the sorted data
    setSortingsApplied(true);
  };

  const onReloadTableData = () => {
    // console.log('loading....');

    setIsLoading(true);
    fetchTableData();
    setTableData(tableData);
    setIsLoading(false);
    // console.log('loading stopped');
  };
  const onNextPage = () => {
    if (currPage < maxPages) {
      setCurrentPage(currPage + 1);
    }
  };

  const onPreviousePage = () => {
    if (currPage > 1) {
      setCurrentPage(currPage - 1);
    }
  };
  const clearSortings = () => {
    setSortingsApplied(false);
    setTableData(tableData);
  };

  const Confirmdelete = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete!",
        customClass: {
          confirmButton: "SA-confirm-btn-table",
          cancelButton: "SA-cancel-btn-table",
        },
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteRecords();
          // fetchTableData()

          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };
  const deleteRecords = () => {
    // deleteFunction()
    for (let id of selectedRowIds) {
      DeleteRecord("event_logs", id, "Table Component", window.location.href);
      setTableData(recievedTableData.filter((record) => record.id !== id));
    }
  };
  const closeTab = (tabId) => {
    setOppenedRecordsList((prevTabs) => {
      const updatedTabs = prevTabs.filter((tab) => tab.id !== tabId);

      // Determine the new selected tab
      let newSelectedTab = tableName; // Default if no tabs remain

      if (updatedTabs.length > 0) {
        const closedTabIndex = prevTabs.findIndex((tab) => tab.id === tabId);
        const fallbackIndex = closedTabIndex > 0 ? closedTabIndex - 1 : 0;
        newSelectedTab = updatedTabs[fallbackIndex].id;
      }

      // Ensure the selected tab updates properly
      setTimeout(() => setSelectedTab(newSelectedTab), 0);

      return updatedTabs;
    });
  };

  const onTabClickHandler = (id, e) => {
    if (e.target.id !== "remove-btn") {
      setSelectedTab(id);
    }
  };

  // sandhya
  const applyFilters = (data, filterConditions) => {
    return data.filter((row) => {
      // Handle empty or no conditions
      if (!filterConditions || filterConditions.length === 0) return true;

      // Start with first condition result
      let result = testCondition(row, filterConditions[0]);

      // Apply subsequent conditions based on previous logicalOperator
      for (let i = 1; i < filterConditions.length; i++) {
        const prevOp = filterConditions[i - 1].logicalOperator;
        const condResult = testCondition(row, filterConditions[i]);

        if (prevOp === "AND") {
          result = result && condResult;
        } else if (prevOp === "OR") {
          result = result || condResult;
        } else {
          // If logicalOperator missing or unknown, default to AND
          result = result && condResult;
        }
      }

      return result;
    });
  };

  // Example testCondition helper:
  function testCondition(row, cond) {
    if (!cond.filter || !cond.condition || !cond.searchText) return true;
    const value = row[cond.filter];
    switch (cond.condition.toLowerCase()) {
      case "equals":
        return value == cond.searchText;
      case "contains":
      case "like":
        return (
          value &&
          value.toString().toLowerCase().includes(cond.searchText.toLowerCase())
        );
      case "not like":
      case "does not contain":
        return !(
          value &&
          value.toString().toLowerCase().includes(cond.searchText.toLowerCase())
        );
      case "greaterthan":
        return Number(value) > Number(cond.searchText);
      case "lessthan":
        return Number(value) < Number(cond.searchText);
      default:
        return true;
    }
  }
  const renderTabView = (tableName) => {
    // console.log(tableName,"@@@")
    // console.log(selectedTab, tableName, "###")
    switch (tableName) {
      case "notifications":
        return <FlowStepComponent recordId={selectedTab} path="notifications" />
      case 'alerts':
        return <FlowStepComponent recordId={selectedTab} path='alerts' />

      case 'feedBack':
        return <FlowStepComponent recordId={selectedTab} path='feedback' />

      case 'templates':
        return <FlowStepComponent recordId={selectedTab} path='templates' />
      case 'designs':
        return <FormDesignerPage recordId={selectedTab} />
      // default:
      //   return <DetailedView recordId={selectedTab} tableName={tableName} formData={formData} />

      case "feedBack":
        return <CreateFeedBack2 recordId={selectedTab} />;

      case "templates":
        return <FlowStepComponent recordId={selectedTab} />;
      case "designs":
        return <FormDesignerPage recordId={selectedTab} />;
      default:
        return (
          <DetailedView
            recordId={selectedTab}
            tableName={tableName}
            formData={formData}
            activeTable={activeTable}
          />
        );
    }
  };

  useEffect(() => {
    // Only run if filter is active, optionally
    if (isFilterActive) {
      setTableData(applyFilters(tableData, filterConditions));
    } else {
      setTableData(tableData); // reset to full
    }
  }, [filterConditions, isFilterActive, tableData]);

  return (
    <MainContainer>
      <div className="w-full h-fit bg-[var(--bakground-color)] pb-[4px] mb-2 overflow-auto scrollbar-hide ">
        <ul className="flex gap-2 items-center w-full h-full p-0 ">
          <span
            className={`h-full flex items-center justify-center
                                    bg-[var(--background-color)] border !border-[var(--primary-color)]
                                    text-[var(--text-color)] py-[2px] px-[0.5rem] rounded-[0.3rem]
                                    cursor-pointer`}
            onClick={() => setSelectedTab(tableName)}
          >
            {convertName(tableName)}
          </span>
          {oppenedRecordsList.map((record) => (
            <li
              key={record.id}
              id={record.id}
              onClick={(e) => onTabClickHandler(record.id, e)}
              className={`w-fit min-w-[8rem] h-full flex items-center justify-between 
                                        py-[2px] pl-[0.5rem] pr-[0.2rem] rounded-[0.3rem] cursor-pointer shadow-lg
                                        ${
                                          selectedTab === record.id
                                            ? "text-white"
                                            : "bg-white"
                                        }
                                    `}
              style={{
                backgroundColor:
                  selectedTab === record.id && "var(--primary-color)",
              }}
            >
              <span className=" px-[0rem]">#{record.name}</span>
              <span className="text-gray-500">{record.email}</span>
              <button
                type="button"
                className="p-0 rounded-[50%] h-fit w-fit flex items-center justify-center text-black"
                id="remove-btn"
                style={{ borderRadius: "50%" }}
                onClick={() => closeTab(record.id)}
                title="Close Tab"
              >
                <IoClose size={15} className="" id="remove-btn" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedTab === tableName ? (
        <div className="max-h-[82vh] flex flex-col gap-2 rounded-[15px]">
          <HeaderContainer>
            <TitleContainer>
              <BackBtn onClick={OnBack} title="Back" className="m-0">
                <IoIosArrowBack size={26} />
              </BackBtn>

              <FilterBtn
                onClick={OnFilter}
                className={`${isFilterActive && "#adb5bd"} m-0`}
              >
                <RiFilter2Line size={20} />
              </FilterBtn>

              <DropdownToggle className="!text-sm text-nowrap md:!text-[22px]">
                {title}
              </DropdownToggle>

              <button
                type="button"
                title="Reload"
                onClick={onReloadTableData}
                className={`hidden h-full w-fit p-[5px] m-0 outline-none border-none cursor-pointer 
                md:flex items-center justify-center !rounded-full text-[var(--primary-color)]
                ${isLoading && "rotate-360"} hover:!bg-[#ccc] `}
              >
                <IoReloadSharp size={20} />
              </button>

              {isSortingsApllied && (
                <ClearSortingsBtn
                  onClick={clearSortings}
                  title="Clear All Sortings"
                >
                  <MdOutlineFilterListOff size={20} />
                </ClearSortingsBtn>
              )}

              {selectedRowIds.length > 0 && (
                <span>
                  <b>{selectedRowIds.length}</b> row(s) selected
                </span>
              )}
            </TitleContainer>

            <RowActionsContainer isSelectedRows={selectedRowIds.length > 0}>
              {allowDeleting && (
                <RowActionBtn
                  type="button"
                  title="Delete Record (s)"
                  onClick={Confirmdelete}
                >
                  <MdDelete size={18} />
                </RowActionBtn>
              )}

              <RowActionBtn
                type="button"
                title="Export Record (s)"
                onClick={() =>
                  ExportData(
                    recievedTableData.filter((record) =>
                      selectedRowIds.includes(record.id)
                    )
                  )
                }
              >
                <BiExport size={18} />
              </RowActionBtn>

              <RowActionBtn type="button" title="Star Record (s)">
                <MdLabelImportant size={20} />
              </RowActionBtn>
            </RowActionsContainer>

            <ActionsContainer>
              {createNewPath && (
                <button
                  onClick={() =>
                    createNewPath && navigate(`/create/${createNewPath}`)
                  }
                  className={`p-1 !rounded-[50%] !bg-[var(--primary-color)] 
                          text-[var(--secondary-color)] hover:!bg-gray-200 
                          border !border-[var(--primary-color)]
                          hover:text-[var(--text-color)]`}
                >
                  <GoPlus className="plus" size={25} />
                </button>
              )}

              {showConfigurefieldsBtn === true && (
                <ConfigureButton
                  title="Configure Fields"
                  type="button"
                  onClick={() => setConfigure(true)}
                >
                  <GrConfigure />
                </ConfigureButton>
              )}
              <div
                className="hidden md:flex md:min-w-[20vw] items-center !p-1 md:!p-0 md:!pr-2 m-0 gap-[0.2rem] border
                border-[1px_solid_#ccc] rounded-full bg-[var(--primary-color)] grow 
                text-[var(--background-color)] focus-within:shadow-[0_0_0.2rem_0.1rem_var(--primary-color)] "
              >
                <SearchInput
                  type="text"
                  placeholder="Search"
                  onChange={onChangeSearchText}
                  value={searchingText}
                  className="br-[2px_solid_#007200] h-full hidden  md:flex"
                />

                <FiSearch
                  size={20}
                  onClick={onChangeSearchText}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <MoreOptions tableName={tableName} />
            </ActionsContainer>
          </HeaderContainer>

          {/* <FiltersContainer> */}
          {isFilterActive &&
            filterConditions.map((eachArray, index) => (
              <FilterContainer key={index}>
                <Select
                  defaultvalue={
                    eachArray.filterDisplayText
                      ? {
                          label: convertName(eachArray.filterDisplayText),
                          value: eachArray.filterDisplayText,
                        }
                      : { label: "Select Filter", value: "--" }
                  }
                  onChange={(event) => OnSetFilter(index, event)}
                  options={selectedColumns.map((column) => ({
                    label: convertName(column.name),
                    value: column,
                  }))}
                  placeholder="Select Filter"
                  styles={selectCustomStyles}
                  className="w-full"
                />

                <Select
                  defaultvalue={
                    eachArray.condition
                      ? {
                          label: convertName(eachArray.condition),
                          value: eachArray.condition,
                        }
                      : { label: "Select Condition", value: "--" }
                  }
                  onChange={(e) => OnsetCondition(index, e)}
                  options={conditions.map((condition) => ({
                    label: convertName(condition),
                    value: condition,
                  }))}
                  placeholder="Select Condition"
                  styles={selectCustomStyles}
                  className="w-full"
                />

                <SearchInput
                  type="text"
                  placeholder="Value"
                  value={eachArray.searchText}
                  onChange={(e) => onSetSearchText(e, index)}
                  className="w-full"
                />

                <div className="w-fit flex gap-4">
                  <AndBtn
                    style={{
                      background:
                        eachArray.logicalOperator === "AND"
                          ? "#efd3d7"
                          : "#fff",
                    }}
                    onClick={() => onAnd(index)}
                    id={`And-${index}`}
                  >
                    <LuAmpersand size={15} />
                  </AndBtn>

                  <OrBtn
                    style={{
                      background:
                        eachArray.logicalOperator === "OR" ? "#efd3d7" : "#fff",
                    }}
                    onClick={() => onOr(index)}
                    id={`Or-${index}`}
                  >
                    <FaGripLinesVertical size={15} />
                  </OrBtn>
                </div>

                {index !== 0 && (
                  <AndOrBtnClose onClick={() => RemoveFilterContainer(index)}>
                    <IoClose size={20} />
                  </AndOrBtnClose>
                )}
              </FilterContainer>
            ))}
          {/* </FiltersContainer> */}

          {showConfigurefieldsBtn === true && (
            <ConfigureFields
              isConfigureActive={isConfigureActive}
              closeConfig={closeConfig}
              customStyles={customStyles}
              TableColumnNames={allTableFields?.map((field, index) => ({
                ...field,
                id: index,
              }))}
              allFields={allTableFields}
              setSelectedColumns={setSelectedColumns}
              selectedColumns={selectedColumns}
              recievedTableData={recievedTableData}
              setTableColumnNames={setAllTableFields}
            />
          )}

          <TableContainer>
            {isLoading ? (
              <div>Data Lolading...</div>
            ) : (
              <CustomTable id="myTable">
                <CustomThead>
                  <CustomTh
                    style={{
                      width: "40px",
                      zIndex: isConfigureActive || isFilterActive ? "0" : "0",
                    }}
                  >
                    {/*  change z-index if needed*/}
                    <Checkbox
                      style={{ color: "#fff" }}
                      size="small"
                      type="checkbox"
                      onChange={(e) => SelectAllCheckBox(e)}
                    />
                  </CustomTh>

                  {selectedColumns?.length > 0 &&
                    typeof selectedColumns[0] !== "string" &&
                    camelCaseToReadable(selectedColumns).map((column) => {
                      return (
                        <CustomTh key={column}>
                          <ThContent>
                            <span>{column}</span>

                            <ColumnOptions>
                              <SortOptBtn
                                type="button"
                                id={column}
                                onClick={() => sortTableData(column, "asc")}
                              >
                                <IoIosArrowRoundUp
                                  size={20}
                                  style={{ fontWeight: "1000" }}
                                />
                              </SortOptBtn>

                              <SortOptBtn
                                type="button"
                                id={column}
                                onClick={() => sortTableData(column, "desc")}
                              >
                                <IoIosArrowRoundDown size={20} />
                              </SortOptBtn>
                            </ColumnOptions>
                          </ThContent>
                        </CustomTh>
                      );
                    })}
                </CustomThead>

                <CustomTbody>
                  {/* filteredData().slice(0, recordsPerPage) */}
                  {recievedTableData?.length > 0 &&
                    // (recordsPerPage ? recievedTableData.slice(0, recordsPerPage) : recievedTableData) commented by sanju

                    (recordsPerPage
                      ? recievedTableData.slice(
                          (currPage - 1) * recordsPerPage,
                          currPage * recordsPerPage
                        )
                      : recievedTableData
                    ).map((row, index) => {
                      {
                        /* console.log(`${row[column.name]}`) */
                      }
                      return (
                        <CustomTr
                          key={index}
                          isEven={index % 2 === 0}
                          isSelectedRow={selectedRowIds.includes(row[`${id}`])}
                        >
                          <CustomTd>
                            <Checkbox
                              style={{ zIndex: "0" }}
                              size="small"
                              type="checkbox"
                              checked={selectedRowIds.includes(row[`${id}`])}
                              onChange={() => CheckboxChange(row[`${id}`])}
                              className={`
                                ${
                                  selectedRowIds.includes(row[`${id}`])
                                    ? "!text-inherit"
                                    : "!text-[var(--text-color)]"
                                }
                              `}
                            />
                          </CustomTd>

                          {selectedColumns.map((column) => {
                            {
                              /* console.log(column.type ) */
                            }
                            return rdtColValue === column.name ? (
                              <CustomTd
                                key={column.name}
                                style={{
                                  textDecoration: "underline",
                                  color: "blue",
                                  cursor: "pointer",
                                }}
                                // onClick={() => navigate(`${redirectionPath}${row[id]}`)}
                                onClick={() => {
                                  setOppenedRecordsList((prevTabs) => {
                                    const tabId = row[column.name];
                                    // Check if the tab already exists
                                    if (
                                      prevTabs.some((tab) => tab.id === tabId)
                                    ) {
                                      setSelectedTab(tabId); // Just switch to the existing tab
                                      return prevTabs;
                                    } else if (prevTabs.length >= 9) {
                                      Swal.fire({
                                        icon: "error",
                                        title: "Oops...",
                                        text: "Maximum number of tabs reached!",
                                      });
                                      return prevTabs;
                                    } else {
                                      // If not a duplicate, add the new tab
                                      const newTab = {
                                        id: tabId,
                                        name: `${tabId}`,
                                        status: "Active",
                                      };
                                      return [...prevTabs, newTab];
                                    }
                                  });
                                  oppenedRecordsList.length < 9 &&
                                    setSelectedTab(row[column.name]);
                                }}
                              >
                                {column.type === "object"
                                  ? `Object Data`
                                  : column.type === "timestamp"
                                  ? formatDateForMySQL(row[column.name])
                                  : column.type === "json"
                                  ? "json data"
                                  : row[column.name]}
                              </CustomTd>
                            ) : (
                              <CustomTd key={column.name}>
                                {column.type === "object"
                                  ? `Object Data`
                                  : column.type === "timestamp"
                                  ? formatDateForMySQL(row[column.name])
                                  : column.type === "json"
                                  ? "json data"
                                  : row[column.name]}
                              </CustomTd>
                            );
                          })}
                          {redirectionPath && (
                            <span
                              className="redirectionIcon hidden text-bold"
                              title="view in editor"
                              onClick={() =>
                                navigate(redirectionPath + `${row[id]}`)
                              }
                            >
                              <RxOpenInNewWindow
                                size={18}
                                className="bg-white p-1 w-6 h-6 rounded-[50%]"
                              />
                            </span>
                          )}
                        </CustomTr>
                      );
                    })}
                </CustomTbody>
              </CustomTable>
            )}
            {recievedTableData?.length === 0 && (
              <div
                className={`!w-full grow-1 text-center font-bold  flex items-center justify-center
                                        h-full min-h-[20rem] text-xl text-nowrap bg-[var(--background-color)]`}
                style={{
                  padding: "auto",
                }}
              >
                No Data Is Available
              </div>
            )}
          </TableContainer>

          <TableFooter>
            <span>Page {currPage}</span>
            <PaginationBtnsContainer>
              <PaginationArrBtn
                type="button"
                title="Previouse"
                isFirstPage={currPage === 1}
                onClick={onPreviousePage}
              >
                <IoIosArrowBack size={20} />
              </PaginationArrBtn>

              <span style={{ width: "20px", textAlign: "center" }}>
                {currPage}
              </span>

              <PaginationArrBtn
                type="button"
                title="Next"
                isLastPage={currPage === maxPages}
                onClick={onNextPage}
              >
                <IoIosArrowForward size={20} />
              </PaginationArrBtn>
            </PaginationBtnsContainer>
          </TableFooter>
        </div>
      ) : (
        // <DetailedView recordId={selectedTab} tableName={tableName} />
        renderTabView(tableName)
      )}
    </MainContainer>
  );
}
