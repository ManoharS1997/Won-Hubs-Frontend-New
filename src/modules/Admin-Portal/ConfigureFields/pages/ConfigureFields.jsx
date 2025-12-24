import Modal from 'react-modal'

import { useEffect, useState } from 'react';
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy, } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { IoClose } from "react-icons/io5";
// import ItemsDND from './dnd';
// import RBDnD from './RBDnD';

import {
  CheckBoxTag, CloseManageAccountBtn, CustomContainer,
  CustomTbody, CustomTd, CustomTh, CustomThead, CustomTr, CustomUserTable,
  FieldsSearchContainer, FieldSearchBar, ManageAccountContent, ManageAccountPopUp,
  ModelCustomContainerRight, ModelHeaderContainer, ModelHeadingText, TableContainer,
  DragCardItem, ConfigureFieldsListContainer
} from './StyledComponents'
import Select from 'react-dropdown-select';

const CustomPointerSensor = () => {
  return useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5,  // Drag only starts if the mouse moves 5px
    },
  });
};

export default function ConfigureFields({
  isConfigureActive, closeConfig, customStyles,
  TableColumnNames, setSelectedColumns, selectedColumns,
  recievedTableData
}) {
  const [searchText, setSearchText] = useState('')
  const [filteredColumns, setFilteredColumns] = useState(TableColumnNames)
  const sensors = useSensors(CustomPointerSensor())

  useEffect(() => {
    setFilteredColumns(TableColumnNames)
  }, [TableColumnNames])

  const handleColumnVisibility = (column) => {
    console.log(column)
    const updatedColumns = selectedColumns.find(item => item.name === column.name)
      ? selectedColumns.filter((col) => col.name !== column.name)
      : [...selectedColumns, column];

    setSelectedColumns(updatedColumns);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log(active, over)

    if (active.id !== over.id) {
      setFilteredColumns((prevItems) => {
        const oldIndex = prevItems.findIndex((item) => item.id === active.id);
        const newIndex = prevItems.findIndex((item) => item.id === over.id);
        return arrayMove(prevItems, oldIndex, newIndex);
      });

      // setSelectedColumns((prevItems) => {
      //     const oldIndex = prevItems.findIndex((item) => item.id === active.id);
      //     const newIndex = prevItems.findIndex((item) => item.id === over.id);
      //     return arrayMove(prevItems, oldIndex, newIndex);
      // });
    }
  };

  // SNAKE CASE TO CAPITALIZED //
  const camelCaseToReadable = (columns) => {
    const readableColumns = columns.map((column) =>
      column.name
        .replace(/_/g, ' ')  // Replace underscores with space
        .replace(/([A-Z])/g, ' $1')  // Add space before capital letters
        .replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter

        // Capitalize the first letter of each word
        .replace(/\b\w/g, (str) => str.toUpperCase())
    );

    return readableColumns;
  }

  function SortableItem({ id, item }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      padding: '0px',
      margin: '0.5rem 0',
      border: 'none',
      borderRadius: '4px',
      userSelect: 'none',
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={e => e.stopPropagation()}
        onMouseDown={e => e.stopPropagation()}
      >
        <DragCardItem isSelected={checkIfSelected(item?.name)} >
          <CheckBoxTag
            type="checkbox"
            checked={checkIfSelected(item?.name)}
            onChange={(e) => {
              e.stopPropagation()
              handleColumnVisibility(item)
            }}
          />
{/* 
          {item.name.replace(/_/g, ' ') // Replace underscores with space
            .replace(/([A-Z])/g, ' $1') // Add space before capital letters
            .replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter
            .replace(/\b\w/g, (str) => str.toUpperCase()) // Capitalize each word
          }  previous */ }
          {item}
        </DragCardItem>
      </div>
    );
  }

  const UpdateSearchText = (e) => {
    const value = e.target.value.toLowerCase();
    console.log(value)

    setSearchText(value)
    setFilteredColumns(TableColumnNames.filter(item => item.name.toLowerCase().includes(value.toLowerCase())))

  }

  const checkIfSelected = (name) => {
    const selectedList = selectedColumns.filter(record => record.name === name)
    // console.log(selectedList)
    return selectedList.length > 0
  }
  console.log(selectedColumns, "selectedColumns Hereee")

  return (
    <>
      <Modal
        isOpen={isConfigureActive}
        onRequestClose={closeConfig}
        contentLabel="Manage Account Example Modal"
        style={customStyles}
      >
        <ManageAccountPopUp className='popup-modal'>
          <ModelHeaderContainer style={{ width: '100%' }}>
            <ModelHeadingText>Configure Fields</ModelHeadingText>

            <CloseManageAccountBtn onClick={closeConfig}>
              <IoClose size={20} />
            </CloseManageAccountBtn>
          </ModelHeaderContainer>

          <ManageAccountContent className='!flex-col md:!flex-row'>
            <div className='w-full h-fit md:w-[20%] md:h-full'>
              <CustomContainer>
                <FieldsSearchContainer>
                  <FieldSearchBar
                    type="search"
                    placeholder="Search..."
                    value={searchText}
                    onChange={UpdateSearchText}
                  />
                </FieldsSearchContainer>
              </CustomContainer>

              <ConfigureFieldsListContainer>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    // items={filteredColumns}
                    items={selectedColumns}
                    strategy={verticalListSortingStrategy}
                    style={{ overflow: 'auto' }}
                  >
                    {/* {filteredColumns.map((field, index) => ({ ...field, id: index })).map((item) => (
                      <SortableItem key={item.id} id={item.id} name={item.name} item={item} />
                    ))} previous list */ }
                   <SortableItem />
                  </SortableContext>
                </DndContext>
              </ConfigureFieldsListContainer>
            </div>
            <div className='h-fit w-full md:h-full md:w-[85%] border-[1px_solid_#ccc] 
            rounded-md '>
              <TableContainer style={{ borderRadius: '10px' }}>
                <CustomUserTable style={{ height: '100%' }}>
                  <CustomThead>
                    {selectedColumns?.length > 0 && (typeof (selectedColumns[0]) !== 'string') &&
                      camelCaseToReadable(selectedColumns).map((column) => (
                        <CustomTh key={column} style={{ fontSize: '10px' }}>{column}</CustomTh>
                      ))
                    }
                  </CustomThead>
                  <CustomTbody>
                    {recievedTableData?.slice(0, 10).map((row, index) => (
                      <CustomTr key={index}>
                        {selectedColumns.map((column) => (
                          <CustomTd key={column.name} >
                            {
                              typeof row[column.name] === 'object' ? `${row[column.name]}` : row[column.name]
                            }
                          </CustomTd>
                        ))}
                      </CustomTr>
                    ))}
                  </CustomTbody>
                </CustomUserTable>
              </TableContainer>
            </div>
          </ManageAccountContent>
        </ManageAccountPopUp>
      </Modal>
    </>
  )
}