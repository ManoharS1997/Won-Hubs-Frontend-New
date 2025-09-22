import { useState, useEffect, useRef, useMemo, useCallback, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import _ from 'lodash';

// ALERT COMPONENTS IMPORTS
import Swal from 'sweetalert2'
import {
  buttonsData, additionalFieldsData, TabColumnsFromBackend,
  dataTypeOptions, additionalCatalogFieldsData, catalogButtonsData
} from "../components/DragFields";

import { GetdesignDepartmentData } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";
import WonContext from "../../../../context/WonContext";
import PreviewDesign from "./DesignPreview";
import RenderFields from "../components/RenderFields";
import RenderTabs from "../components/RenderTabs";
import RenderButtons from "../components/RenderButtons";
import Fieldsconfiguration from "../components/ConfigureTabs/FieldsConfiguration";
import TabsConfigurations from "../components/ConfigureTabs/TabsConfigurations";
import ButtonsConfigurations from "../components/ConfigureTabs/ButtonsConfiguration";
import Designtabs from "../components/DesignTabs";
import DesignHeader from "../components/DesignHeader";

import { columnOptions, alignmentOptions } from "../components/Data";

import {
  Dot, NewtonsCradle,
} from '../components/StyledComponents'

import {
  CustomSettings, backendReferenceTables, backendFilter, backendConfigureFields,
  DropStyles,
} from "../components/Data";
import { getCatalog, getAdminForms, replaceData } from "../components/functions";
import renderIcons from "../../../../shared/functions/renderIcons";

export default function DesignForm() {
  const { id } = useParams();
  const location = useLocation()
  const CatalogDepartment = location.state ? location.state.department : ''
  const CatalogCategory = location.state ? location.state.category : ''
  const CatalogSubcategory = location.state ? location.state.subCategory : ''
  let formFieldsToDisplay;

  switch (id) {
    case 'CatalogForm':
      formFieldsToDisplay = additionalCatalogFieldsData;
      break;
    case 'AdminPortalForms':
      formFieldsToDisplay = additionalFieldsData;
      break;
    default:
      formFieldsToDisplay = additionalFieldsData;
      break;
  }

  let formButtonsToDisplay
  switch (id) {
    case 'CatalogForm':
      formButtonsToDisplay = catalogButtonsData;
      break;
    case 'AdminPortalForms':
      formButtonsToDisplay = buttonsData;
      break;
    default:
      formButtonsToDisplay = buttonsData;
      break;
  }

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [ApiData, setApiData] = useState([])
  const [configureFields, setConfigureFields] = useState(backendConfigureFields)
  const [buttonColumns, setButtonColumns] = useState(formButtonsToDisplay)               //BUTTONS IN DESIGNER
  const [columns, setColumns] = useState(formFieldsToDisplay)                            //FIELDS IN DESIGNER
  const [tabColumns, setTabColumns] = useState(TabColumnsFromBackend)                    //TABS IN DESIGNER
  const [DataTypeOptions, setDataTypeOptions] = useState(dataTypeOptions)

  const memoizedFieldDetails = useMemo(() => {
    const dragItems = Object.values(columns)[0]?.items || [];
    const dropItems = Object.values(columns)[1]?.items || [];
    return dragItems.length > 0 ? dragItems[0] : (dropItems[0] || null);
  }, [columns]);

  const memoizedTabDetails = useMemo(() => {
    const dragItems = Object.values(tabColumns)[0]?.items || [];
    const dropItems = Object.values(tabColumns)[1]?.items || [];
    return dragItems.length > 0 ? dragItems[0] : (dropItems[0] || null);
  }, [tabColumns]);

  const memoizedButtonDetails = useMemo(() => {
    const dragItems = Object.values(buttonColumns)[0]?.items || [];
    const dropItems = Object.values(buttonColumns)[1]?.items || [];
    return dragItems.length > 0 ? dragItems[0] : (dropItems[0] || null);
  }, [buttonColumns]);

  const [fieldDetails, setFieldDetails] = useState(memoizedFieldDetails);
  const [tabDetails, setTabDetails] = useState(memoizedTabDetails);
  const [buttonDetails, setButtonDetails] = useState(memoizedButtonDetails);

  const [activeTab, setActiveTab] = useState('fields')
  const [activeConfigType, setActiveConfigType] = useState('field')
  const [selectedDepartments, setSelectedDepartments] = useState({
    department: CatalogDepartment || '',
    category: CatalogCategory || '',
    sub_category: CatalogSubcategory || ''
  });
  const [selectedViews, setSelectedViews] = useState([])
  const [views, setViews] = useState(['Super Admin', 'Admin', 'Designer Admin', 'Agent', 'Internal User', 'External User']);
  const [formTitle, setFormTitle] = useState('')
  const [goToPreview, setToPreview] = useState(false)
  const [buttonsAlignment, setButtonsAlignment] = useState('top')
  const [activeCard, setActiveCard] = useState(null)
  const [option, updateOption] = useState('')
  const [buttonsSearchText, setButtonsSearchText] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [iconChange, changeIcon] = useState(false)
  const [noOfColumns, setNoOfColumns] = useState('1')
  const [isAccessDropdownOpen, setAccessDropdownOpen] = useState(false)
  const [selectRefTable, setselectRefTable] = useState(false)
  const [isSelectFilterOpen, setSelectFilterOpen] = useState(false)
  const [isConfigFieldsOpen, setConfigFieldsOpen] = useState(false)
  const [isNewRefSelectOpen, setNewRefSelectOpen] = useState(false)
  const [isNewFilterSelectOpen, setNewFilterSelectOpen] = useState(false)
  const [isNewConfigFieldSelectOpen, setNewConfigFieldSelectOpen] = useState(false)
  const [AccessUsers, setAccessUsers] = useState([])
  const [departmentData, setDepartmentData] = useState(null)
  const { selectedDesign } = useContext(WonContext)
  //<<<<< STATE FOR CUSTOM SEARCH DROPDOWN
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const DragStyles = {        //DRAG STYLES
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
    width: '20vw',
    padding: '10px',
    color: '#000',
    overflowY: 'auto',
    margin: '0px',
    borderRadius: `${activeTab !== 'fields' ? '10px' : '0px 10px 10px 10px'}`,
  }

  const dropdownContainerRef2 = useRef(null);
  const dropdownContainerTabRef = useRef(null);
  const dropdownContainerTabFilter = useRef(null);
  const dropdownContainerTabConfigFields = useRef(null);
  const dropdownContainerRef = useRef(null);

  useEffect(() => {
    const getDepartmentsData = async () => {
      try {
        const resData = await GetdesignDepartmentData()
        if (resData.data.success) {
          setDepartmentData(resData.data.data)
        }
      } catch (err) {
        console.log('error getting department data: ', err)
      }
    }
    getDepartmentsData()
  }, [])

  const handleDropDownToggle = useCallback(() => {
    setDropdownOpen(prev => !prev);
  }, []);

  const filteredDropdownOptions = useMemo(() =>
    DataTypeOptions.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm, DataTypeOptions]);


  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownContainerRef.current && !dropdownContainerRef.current.contains(event.target)) {
        // Click occurred outside the first dropdown container
        setDropdownOpen(false);
      }
      if (dropdownContainerRef2.current && !dropdownContainerRef2.current.contains(event.target)) {
        // Click occurred outside the second dropdown container
        setAccessDropdownOpen(false);
      }
      if (dropdownContainerTabRef.current && !dropdownContainerTabRef.current.contains(event.target)) {
        // Click occurred outside the second dropdown container
        setselectRefTable(false)
      }
      if (dropdownContainerTabFilter.current && !dropdownContainerTabFilter.current.contains(event.target)) {
        // Click occurred outside the second dropdown container
        setSelectFilterOpen(false)
      }
      if (dropdownContainerTabConfigFields.current && !dropdownContainerTabConfigFields.current.contains(event.target)) {
        // Click occurred outside the second dropdown container
        setConfigFieldsOpen(false)
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [setDropdownOpen, setAccessDropdownOpen]);

  useEffect(() => {
    if (!activeCard) return;

    const getItemById = (columnsData) => {
      const drag = Object.values(columnsData)[0].items.find(item => item.id === activeCard);
      const drop = Object.values(columnsData)[1].items.find(item => item.id === activeCard);
      return drag || drop || null;
    };

    if (activeConfigType === 'field') {
      setFieldDetails(getItemById(columns));
    } else if (activeConfigType === 'tab') {
      setTabDetails(getItemById(tabColumns));
    } else {
      setButtonDetails(getItemById(buttonColumns));
    }
  }, [activeCard, activeConfigType, columns, tabColumns, buttonColumns]);


  ///STATE FOR CUSTOM SEARCH DROPDOWN >>>>>

  const showPreview = () => setToPreview(true)

  const hidePreview = () => setToPreview(false)

  const changeTab = (id) => setActiveTab(id)

  const getDropdownOptions = (key) => {
    if (!departmentData) {
      return []
    }
    switch (key) {
      case 'department':
        return Object.keys(departmentData).map(dept => ({
          label: dept,
          value: dept
        }));
      case 'category':
        return selectedDepartments.department && departmentData[selectedDepartments.department] ?
          Object.keys(departmentData[selectedDepartments.department]).map(cat => ({
            label: cat,
            value: cat
          })) : [];
      case 'sub_category':
        return selectedDepartments.category && departmentData[selectedDepartments.department]?.[selectedDepartments.category]
          ? departmentData[selectedDepartments.department][selectedDepartments.category].map(subCat => ({
            label: subCat,
            value: subCat
          }))
          : [];
      default:
        return [];
    }
  };

  const updateDepartments = (value) => {
    const N = value[0];
    setSelectedDepartments({
      department: N.value,
      category: '',
      sub_category: '',
    })
  }

  const updateCategory = (value) => {
    const N = value[0];
    setSelectedDepartments(prev => ({
      ...prev,
      category: N.value,
      sub_category: ''
    }))
  }

  const updateSubcategory = async (value) => {
    try {
      const N = value[0];
      setSelectedDepartments(prevState => ({
        ...prevState,
        sub_category: N.value
      }));

      const { department, category } = selectedDepartments;

      let x;
      if (id === 'CatalogForm') {
        x = await getCatalog(department, category, N.value, setLoading, setApiData);
      } else if (id === 'AdminPortalForms') {
        x = await getAdminForms(department, category, N.value, setLoading, setApiData);
      }

      if (x.length === 0) {
        setColumns(formFieldsToDisplay);
        setButtonColumns(formButtonsToDisplay);
        setFormTitle('');
      } else {
        replaceData(formFieldsToDisplay, catalogButtonsData, x, setColumns, setButtonColumns, setSelectedViews, setFormTitle);
      }
    } catch (error) {
      console.error("Error updating subcategory:", error);
      // Optionally, you can set an error state here to inform the user.
    }
  };

  const onClickView = (selected) => {
    setSelectedViews(selected.map(item => item.value));
  };

  const updateFormTitle = (e) => setFormTitle(e.target.value)

  const handleAccessDropDownToggle = () => {
    setAccessDropdownOpen(!isAccessDropdownOpen)
    setselectRefTable(false)
    setSelectFilterOpen(false)
    setConfigFieldsOpen(false)
    setNewRefSelectOpen(false)
  }

  const handleRefTablesDropdown = () => {
    setselectRefTable(!selectRefTable)
    setAccessDropdownOpen(false)
    setSelectFilterOpen(false)
    setConfigFieldsOpen(false)
    setNewRefSelectOpen(false)
  }

  const handleFilterDropdown = () => {
    setSelectFilterOpen(!isSelectFilterOpen)
    setAccessDropdownOpen(false)
    setselectRefTable(false)
    setConfigFieldsOpen(false)
    setNewRefSelectOpen(false)
  }

  const handleConfigFieldsDropdown = () => {
    setSelectFilterOpen(false)
    setAccessDropdownOpen(false)
    setselectRefTable(false)
    setNewRefSelectOpen(false)
    setConfigFieldsOpen(!isConfigFieldsOpen)
  }

  const handleNewRefDropdown = () => {
    setNewRefSelectOpen(!isNewRefSelectOpen)
    setNewFilterSelectOpen(false)
    setNewConfigFieldSelectOpen(false)
  }

  const handleAccessCheckBox = (checkBoxId) => {
    setAccessUsers(_.xor(AccessUsers, [checkBoxId]));
  }

  const addSelectOption = (id) => {
    const [firstKey, secondKey] = Object.keys(columns);
    const updateDropColumns = Object.values(columns)[1].items.map(item => {
      if (item.id === id) {
        const checkDuplicate = item.details.options.filter(optionItem => optionItem !== option)
        if (option === '') {
          return item
        }
        return { ...item, details: { ...item.details, options: [...checkDuplicate, option] } }
      }
      return item
    })
    const updatedFirstSubObject = { ...columns[secondKey], items: updateDropColumns };
    const updatedObject = {
      ...columns,
      [secondKey]: updatedFirstSubObject
    }

    setColumns(updatedObject)
    updateOption('')
  }

  const removeSelectOption = (id, optionId) => {
    const [firstKey, secondKey] = Object.keys(columns);

    const updateDropColumns = Object.values(columns)[1].items.map(item => {
      if (item.id === id) {
        const filterOptions = item.details.options.filter(item => item !== optionId)
        return { ...item, details: { ...item.details, options: [...filterOptions] } }
      }
      return item
    })
    const updatedFirstSubObject = { ...columns[secondKey], items: updateDropColumns };
    const updatedObject = {
      ...columns,
      [secondKey]: updatedFirstSubObject
    };
    setColumns(updatedObject)
  }

  const updateButtonsAllignment = () => {
    setButtonsAlignment(buttonsAlignment === 'top' ? 'bottom' : 'top');
  };

  const changeNoOfColumns = () => {
    setNoOfColumns(noOfColumns === '1' ? '2' : '1');
  };

  const updateCards = (stateData, originalData, searchText) => {
    const filteredData = Object.values(originalData)[0].items.filter(item => item.details.name.toLowerCase().includes(searchText.toLowerCase()))
    const separatedData = filteredData.filter(item => !(Object.values(stateData)[1].items.some(excludeItem => excludeItem.id === item.id)))
    const [firstKey, ...remainingKeys] = Object.keys(stateData);
    const updatedFirstSubObject = { ...stateData[firstKey], items: separatedData };

    const updatedObject = {
      ...stateData,
      [firstKey]: updatedFirstSubObject
    };
    return (updatedObject)
  }

  const updateDetails = (originalData, id, fieldType, value) => {
    const updatedDragData = _.map(Object.values(originalData)[0].items, item => (
      item.id === id ? { ...item, details: { ...item.details, [fieldType.toString()]: value } } : item
    ));

    const updatedDropData = _.map(Object.values(originalData)[1].items, item => (
      item.id === id ? { ...item, details: { ...item.details, [fieldType]: value } } : item
    ));

    const updatedObject = {
      ...originalData,
      [Object.keys(originalData)[0]]: { ...originalData[Object.keys(originalData)[0]], items: updatedDragData },
      [Object.keys(originalData)[1]]: { ...originalData[Object.keys(originalData)[1]], items: updatedDropData },
    };

    return updatedObject;
  };

  const updateFieldColumnsData = (type, id, value) => {
    // Update columns using updateDetails function
    const updatedColumns = updateDetails(columns, id, type, value)
    setColumns(updatedColumns)

    // Find the item in the updated columns
    const fromDragged = (Object.values(updatedColumns)[0].items.filter(item => item.id === id)).length > 0 ? (Object.values(updatedColumns)[0].items.filter(item => item.id === id))[0] : ''
    const fromDropped = (Object.values(updatedColumns)[1].items.filter(item => item.id === id)).length > 0 ? (Object.values(updatedColumns)[1].items.filter(item => item.id === id))[0] : ''
    const fieldDetails = fromDragged === '' ? fromDropped : fromDragged

    setFieldDetails(fieldDetails)
    setDropdownOpen(false)
  }

  const updateFieldTabsData = (type, id, value) => {
    // Update Tabs using updateDetails function
    const updatedColumns = updateDetails(tabColumns, id, type, value)
    setTabColumns(updatedColumns)

    // Find the item in the updated columns
    const fromDragged = (Object.values(updatedColumns)[0].items.filter(item => item.id === id)).length > 0 ? (Object.values(updatedColumns)[0].items.filter(item => item.id === id))[0] : ''
    const fromDropped = (Object.values(updatedColumns)[1].items.filter(item => item.id === id)).length > 0 ? (Object.values(updatedColumns)[1].items.filter(item => item.id === id))[0] : ''
    const fieldDetails = fromDragged === '' ? fromDropped : fromDragged

    setTabDetails(fieldDetails)
  }

  const updateFieldButtonsData = (type, id, value) => {
    // Update buttons using updateDetails function
    const updatedColumns = updateDetails(buttonColumns, id, type, value)
    setButtonColumns(updatedColumns)

    // Find the item in the updated columns
    const fromDragged = (Object.values(updatedColumns)[0].items.filter(item => item.id === id)).length > 0 ? (Object.values(updatedColumns)[0].items.filter(item => item.id === id))[0] : ''
    const fromDropped = (Object.values(updatedColumns)[1].items.filter(item => item.id === id)).length > 0 ? (Object.values(updatedColumns)[1].items.filter(item => item.id === id))[0] : ''
    const fieldDetails = fromDragged === '' ? fromDropped : fromDragged

    setButtonDetails(fieldDetails)
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setTimeout(() => {
      changeIcon(!iconChange);
    }, 500);
  };

  const onDragEnd = (result, columns, setColumns) => {
    console.log(result.destination)
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const updateDetailsContent = useCallback((value, type) => {
    setActiveCard(value);
    setActiveConfigType(type);
    setIsOpen(true);
    setTimeout(() => {
      changeIcon(true);
    }, 500);
  }, []);


  const addFieldsstyles = {
    width: '100%',
  }

  const UpdatedSelectOptions = () => {
    return (activeCard !== null ?
      Object.values(columns)[0].items.filter(item => item.id === activeCard).length > 0 ?
        Object.values(columns)[0].items.filter(item => item.id === activeCard)[0].details.options :
        Object.values(columns)[1].items.filter(item => item.id === activeCard)[0].details.options :
      [])
  }

  //  Add/remove reference tables 
  const addReferenceTable = (tabId, tableId, value) => {
    const updateReferenceTable = Object.values(tabColumns)[1].items.map(item => {
      if (item.id === tabId) {
        return ({
          ...item, details: {
            ...item.details, referenceTables: item.details.referenceTables.map(table => {
              if (table.id === tableId) {
                return { ...table, selected: value }
              }
              return table
            })
          }
        })
      }
      return item
    })
    const [firstKey, secondKey] = Object.keys(tabColumns)
    const updatedSecondColumn = { ...tabColumns[secondKey], items: updateReferenceTable }

    const updatedTabColumns = {
      ...tabColumns,
      [secondKey]: updatedSecondColumn
    }
    setTabColumns(updatedTabColumns)
    const fromDragged = (Object.values(updatedTabColumns)[0].items.filter(item => item.id === tabId)).length > 0 ? (Object.values(updatedTabColumns)[0].items.filter(item => item.id === tabId))[0] : ''
    const fromDropped = (Object.values(updatedTabColumns)[1].items.filter(item => item.id === tabId)).length > 0 ? (Object.values(updatedTabColumns)[1].items.filter(item => item.id === tabId))[0] : ''
    const fieldDetails = fromDragged === '' ? fromDropped : fromDragged

    setTabDetails(fieldDetails)
  }

  const removeReferenceTable = (tabId, tableId) => {
    const updateReferenceTable = Object.values(tabColumns)[1].items.map(item => {
      if (item.id === tabId) {
        return ({
          ...item, details: {
            ...item.details, referenceTables: item.details.referenceTables.map(table => {
              if (table.id === tableId) {
                return { ...table, selected: false }
              }
              return table
            })
          }
        })
      }
      return item
    })
    const [firstKey, secondKey] = Object.keys(tabColumns)
    const updatedSecondColumn = { ...tabColumns[secondKey], items: updateReferenceTable }

    const updatedTabColumns = {
      ...tabColumns,
      [secondKey]: updatedSecondColumn
    }
    setTabColumns(updatedTabColumns)
    const fromDragged = (Object.values(updatedTabColumns)[0].items.filter(item => item.id === tabId)).length > 0 ? (Object.values(updatedTabColumns)[0].items.filter(item => item.id === tabId))[0] : ''
    const fromDropped = (Object.values(updatedTabColumns)[1].items.filter(item => item.id === tabId)).length > 0 ? (Object.values(updatedTabColumns)[1].items.filter(item => item.id === tabId))[0] : ''
    const fieldDetails = fromDragged === '' ? fromDropped : fromDragged

    setTabDetails(fieldDetails)
  }

  //  Add/remove filter items 
  const addFilterItem = (tabId, tableId, value) => {
    const updateFilterItems = Object.values(tabColumns)[1].items.map(item => {
      if (item.id === tabId) {
        return ({
          ...item, details: {
            ...item.details, filter: item.details.filter.map(filterItem => {
              if (filterItem.id === tableId) {
                return { ...filterItem, selected: value }
              }
              return filterItem
            })
          }
        })
      }
      return item
    })
    const [firstKey, secondKey] = Object.keys(tabColumns)
    const updatedSecondColumn = { ...tabColumns[secondKey], items: updateFilterItems }

    const updatedTabColumns = {
      ...tabColumns,
      [secondKey]: updatedSecondColumn
    }
    setTabColumns(updatedTabColumns)
    const fromDragged = (Object.values(updatedTabColumns)[0].items.filter(item => item.id === tabId)).length > 0 ? (Object.values(updatedTabColumns)[0].items.filter(item => item.id === tabId))[0] : ''
    const fromDropped = (Object.values(updatedTabColumns)[1].items.filter(item => item.id === tabId)).length > 0 ? (Object.values(updatedTabColumns)[1].items.filter(item => item.id === tabId))[0] : ''
    const fieldDetails = fromDragged === '' ? fromDropped : fromDragged

    setTabDetails(fieldDetails)
  }

  const removeFilterItem = (tabId, filterId) => {
    const updateReferenceTable = Object.values(tabColumns)[1].items.map(item => {
      if (item.id === tabId) {
        return ({
          ...item, details: {
            ...item.details, filter: item.details.filter.map(filterItem => {
              if (filterItem.id === filterId) {
                return { ...filterItem, selected: false }
              }
              return filterItem
            })
          }
        })
      }
      return item
    })
    const [firstKey, secondKey] = Object.keys(tabColumns)
    const updatedSecondColumn = { ...tabColumns[secondKey], items: updateReferenceTable }

    const updatedTabColumns = {
      ...tabColumns,
      [secondKey]: updatedSecondColumn
    }
    setTabColumns(updatedTabColumns)
    const fromDragged = (Object.values(updatedTabColumns)[0].items.filter(item => item.id === tabId)).length > 0 ? (Object.values(updatedTabColumns)[0].items.filter(item => item.id === tabId))[0] : ''
    const fromDropped = (Object.values(updatedTabColumns)[1].items.filter(item => item.id === tabId)).length > 0 ? (Object.values(updatedTabColumns)[1].items.filter(item => item.id === tabId))[0] : ''
    const fieldDetails = fromDragged === '' ? fromDropped : fromDragged

    setTabDetails(fieldDetails)
  }

  //  Add/remove configure fields 
  const addConfigItem = (tabId, configId, value) => {

    const updateFilterItems = Object.values(tabColumns)[1].items.map(item => {
      if (item.id === tabId) {
        return ({
          ...item, details: {
            ...item.details, configureFields: item.details.configureFields.map(configItem => {
              if (configItem.id === configId) {
                return { ...configItem, selected: value }
              }
              return configItem
            })
          }
        })
      }
      return item
    })
    const [firstKey, secondKey] = Object.keys(tabColumns)
    const updatedSecondColumn = { ...tabColumns[secondKey], items: updateFilterItems }

    const updatedTabColumns = {
      ...tabColumns,
      [secondKey]: updatedSecondColumn
    }
    setTabColumns(updatedTabColumns)
    const fromDragged = (Object.values(updatedTabColumns)[0].items.filter(item => item.id === tabId)).length > 0 ? (Object.values(updatedTabColumns)[0].items.filter(item => item.id === tabId))[0] : ''
    const fromDropped = (Object.values(updatedTabColumns)[1].items.filter(item => item.id === tabId)).length > 0 ? (Object.values(updatedTabColumns)[1].items.filter(item => item.id === tabId))[0] : ''
    const fieldDetails = fromDragged === '' ? fromDropped : fromDragged

    setTabDetails(fieldDetails)
  }

  const removeConfigItem = (tabId, configId) => {
    const updateReferenceTable = Object.values(tabColumns)[1].items.map(item => {
      if (item.id === tabId) {
        return ({
          ...item, details: {
            ...item.details, configureFields: item.details.configureFields.map(filterItem => {
              if (filterItem.id === configId) {
                return { ...filterItem, selected: false }
              }
              return filterItem
            })
          }
        })
      }
      return item
    })
    const [firstKey, secondKey] = Object.keys(tabColumns)
    const updatedSecondColumn = { ...tabColumns[secondKey], items: updateReferenceTable }

    const updatedTabColumns = {
      ...tabColumns,
      [secondKey]: updatedSecondColumn
    }
    setTabColumns(updatedTabColumns)
    const fromDragged = (Object.values(updatedTabColumns)[0].items.filter(item => item.id === tabId)).length > 0 ? (Object.values(updatedTabColumns)[0].items.filter(item => item.id === tabId))[0] : ''
    const fromDropped = (Object.values(updatedTabColumns)[1].items.filter(item => item.id === tabId)).length > 0 ? (Object.values(updatedTabColumns)[1].items.filter(item => item.id === tabId))[0] : ''
    const fieldDetails = fromDragged === '' ? fromDropped : fromDragged

    setTabDetails(fieldDetails)
  }

  const showAlert = (message) => {
    Swal.fire({
      text: message,
      icon: 'warning',
      customClass: {
        confirmButton: 'my-custom-button'
      }
    });
  };

  const ValidateDesign = () => {
    if (formTitle.trim() === '' && selectedDesign === null) {
      showAlert('Give a Title to the Design');
      return false;
    }

    // const { department, category, sub_category } = selectedDepartments;

    // if (department.trim() === '') {
    //   showAlert('Select a Department');
    //   return false;
    // }

    // if (category.trim() === '') {
    //   showAlert('Select a Category');
    //   return false;
    // }

    // if (sub_category.trim() === '') {
    //   showAlert('Select a SubCategory');
    //   return false;
    // }

    return true; // Return true if all validations pass
  };
  const handlePreview = () => {
    if (ValidateDesign()) {
      setToPreview(true);
    }
  };

  const OnBack = () => {
    navigate(-1)
  }

  const getPreviewData = () => ({
    department: selectedDepartments.department,
    category: selectedDepartments.category,
    sub_category: selectedDepartments.sub_category,
    title: formTitle,
    field_columns: noOfColumns,
    fields: Object.values(columns)[1].items,
    tabs: Object.values(tabColumns)[1].items,
    buttons: Object.values(buttonColumns)[1].items,
    buttons_alignment: buttonsAlignment,
    view: selectedViews
  });

  // console.log('selected design: ', selectedDesign)

  // Main render logic for the DesignForm component
  return (
    <div className="w-full h-full flex flex-col text-[12px]">
      {/* Show PreviewDesign if goToPreview is true, else show the main designer UI */}
      {goToPreview ? (
        <PreviewDesign
          hidePreview={hidePreview}
          data={getPreviewData()}
          designType={id}
          formTitle={formTitle}
          updateFormTitle={updateFormTitle}
          getDropdownOptions={getDropdownOptions}
          selectedDepartments={selectedDepartments}
          updateDepartments={updateDepartments}
          updateCategory={updateCategory}
          updateSubcategory={updateSubcategory}
          views={views}
          selectedViews={selectedViews}
          onClickView={onClickView}
          columnOptions={columnOptions}
          noOfColumns={noOfColumns}
          changeNoOfColumns={changeNoOfColumns}
          alignmentOptions={alignmentOptions}
          buttonsAlignment={buttonsAlignment}
          updateButtonsAllignment={updateButtonsAllignment}
        />
      ) : (
        // Main designer UI
        <div className="w-full h-full flex flex-col">
          {/* Header section with navigation and form settings */}
          <DesignHeader
            OnBack={OnBack}
            formTitle={selectedDesign ? selectedDesign?.name : formTitle}
            updateFormTitle={updateFormTitle}
            activeTab={activeTab}
            columnOptions={columnOptions}
            noOfColumns={noOfColumns}
            changeNoOfColumns={changeNoOfColumns}
            alignmentOptions={alignmentOptions}
            buttonsAlignment={buttonsAlignment}
            updateButtonsAllignment={updateButtonsAllignment}
            ValidateDesign={ValidateDesign}
            setPreviewData={handlePreview}
          />
          <div className="w-full flex m-0">
            {/* Show loading spinner if loading, else show designer content */}
            {loading ? (
              <NewtonsCradle>
                <Dot />
                <Dot />
                <Dot />
                <Dot />
              </NewtonsCradle>
            ) : (
              <>
                {/* Main design area (fields, tabs, or buttons) */}
                <div className="w-screen grow h-[86vh] flex flex-col bg-white">
                  {/* Tabs for switching between fields, tabs, and buttons */}
                  <Designtabs
                    activeTab={activeTab}
                    changeTab={changeTab}
                  />

                  {/* Render the appropriate section based on the active tab */}
                  {activeTab === 'buttons' ? (
                    <RenderButtons
                      onDragEnd={onDragEnd}
                      buttonColumns={buttonColumns}
                      DragStyles={DragStyles}
                      DropStyles={DropStyles}
                      buttonsSearchText={buttonsSearchText}
                      setButtonsSearchText={setButtonsSearchText}
                      setButtonColumns={setButtonColumns}
                      updateCards={updateCards}
                      buttonsData={buttonsData}
                      updateDetailsContent={updateDetailsContent}
                    />
                  ) : activeTab === 'tabs' ? (
                    <RenderTabs
                      onDragEnd={onDragEnd}
                      tabColumns={tabColumns}
                      DragStyles={DragStyles}
                      setTabColumns={setTabColumns}
                      CustomSettings={CustomSettings}
                      updateCards={updateCards}
                      TabColumnsFromBackend={TabColumnsFromBackend}
                      updateDetailsContent={updateDetailsContent}
                      addFieldsstyles={addFieldsstyles}
                      handleNewRefDropdown={handleNewRefDropdown}
                      isNewRefSelectOpen={isNewRefSelectOpen}
                      backendReferenceTables={backendReferenceTables}
                      backendFilter={backendFilter}
                      setConfigureFields={setConfigureFields}
                      setNewFilterSelectOpen={setNewFilterSelectOpen}
                      isNewFilterSelectOpen={isNewFilterSelectOpen}
                      setNewRefSelectOpen={setNewRefSelectOpen}
                      setNewConfigFieldSelectOpen={setNewConfigFieldSelectOpen}
                      isNewConfigFieldSelectOpen={isNewConfigFieldSelectOpen}
                      configureFields={configureFields}
                    />
                  ) : (
                    <RenderFields
                      onDragEnd={onDragEnd}
                      columns={columns}
                      setColumns={setColumns}
                      DragStyles={DragStyles}
                      noOfColumns={noOfColumns}
                      CustomSettings={CustomSettings}
                      addFieldsstyles={addFieldsstyles}
                      updateCards={updateCards}
                      additionalFieldsData={additionalFieldsData}
                      updateDetailsContent={updateDetailsContent}
                    />
                  )}
                </div>

                {/* Sidebar for configuration (fields, tabs, or buttons) */}
                <div
                  className={`
                      fixed !h-[93vh] flex bg-transparent transition-[width] duration-700 right-0 !top-[7vh]
                      ${!isOpen ? 'w-0' : 'w-[25vw]'}
                    `}
                >
                  {/* Sidebar open/close icon */}
                  {/* <OpenIcon onClick={toggleSidebar} isOpened={isOpen}>
                    {renderIcons('IoIosArrowBack', 25, 'inherit')}
                  </OpenIcon> */}
                  {/* Render the configuration panel based on the active config type */}
                  {activeConfigType === 'field' ? (
                    <Fieldsconfiguration
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      fieldDetails={fieldDetails}
                      updateFieldColumnsData={updateFieldColumnsData}
                      dropdownContainerRef={dropdownContainerRef}
                      handleDropDownToggle={handleDropDownToggle}
                      isDropdownOpen={isDropdownOpen}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      filteredDropdownOptions={filteredDropdownOptions}
                      option={option}
                      updateOption={updateOption}
                      addSelectOption={addSelectOption}
                      UpdatedSelectOptions={UpdatedSelectOptions}
                      removeSelectOption={removeSelectOption}
                      dropdownContainerRef2={dropdownContainerRef2}
                      handleAccessDropDownToggle={handleAccessDropDownToggle}
                      isAccessDropdownOpen={isAccessDropdownOpen}
                      AccessUsers={AccessUsers}
                      handleAccessCheckBox={handleAccessCheckBox}
                    />
                  ) : activeConfigType === 'tab' ? (
                    <TabsConfigurations
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      tabDetails={tabDetails}
                      updateFieldColumnsData={updateFieldColumnsData}
                      updateFieldTabsData={updateFieldTabsData}
                      dropdownContainerTabRef={dropdownContainerTabRef}
                      handleRefTablesDropdown={handleRefTablesDropdown}
                      selectRefTable={selectRefTable}
                      addReferenceTable={addReferenceTable}
                      removeReferenceTable={removeReferenceTable}
                      dropdownContainerTabFilter={dropdownContainerTabFilter}
                      handleFilterDropdown={handleFilterDropdown}
                      isSelectFilterOpen={isSelectFilterOpen}
                      addFilterItem={addFilterItem}
                      removeFilterItem={removeFilterItem}
                      dropdownContainerTabConfigFields={dropdownContainerTabConfigFields}
                      handleConfigFieldsDropdown={handleConfigFieldsDropdown}
                      isConfigFieldsOpen={isConfigFieldsOpen}
                      addConfigItem={addConfigItem}
                      removeConfigItem={removeConfigItem}
                    />
                  ) : (
                    <ButtonsConfigurations
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      buttonDetails={buttonDetails}
                      updateFieldColumnsData={tabDetails}
                      updateFieldButtonsData={updateFieldButtonsData}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}