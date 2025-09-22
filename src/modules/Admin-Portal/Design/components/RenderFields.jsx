
import { useState, useEffect } from 'react';
import { DndContext, DragOverlay, closestCorners, rectIntersection, pointerWithin } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
import { v4 as uuidv4 } from 'uuid';
import Modal from 'react-modal'
import TaskCard from './TaskCard';
import renderIcons from '../../../../shared/functions/renderIcons'
import PropTypes from 'prop-types';
import SortableItem from './SortableItem';
import DroppableContainer from './DroppableContainer';
import { handleDragEndGeneric } from './handleDragEnd ';

import { DropStyles } from './Data';


export default function RenderFields({
  columns, setColumns, DragStyles, noOfColumns,
  CustomSettings, addFieldsstyles, updateCards, additionalFieldsData,
  updateDetailsContent
}) {
  const [addField, setAddField] = useState(false)
  const [newFieldData, setNewFielddata] = useState({
    Task: "",
    Due_Date: new Date(),
    details: {
      name: '',
      type: 'text',
      length: '',
      required: false,
      placeholder: '',
      description: '',
      options: [],
    }
  })
  const [fieldsSearchText, setFieldsSearchText] = useState('')
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    setNewFielddata((prevState) => ({
      ...prevState,
      details: {
        ...prevState.details,
        name: prevState.Task
      }
    }));
  }, [newFieldData.Task])

  const openAddfield = () => setAddField(true)

  const closeAddfield = () => setAddField(false)

  const addNewField = (e) => {
    e.preventDefault()
    if (newFieldData.details.name === '' ||
      newFieldData.details.type === '' ||
      newFieldData.details.length === '' ||
      newFieldData.details.placeholder === '' ||
      newFieldData.details.description === '') {
      return alert('Please Fill all the Required Fields')
    }

    const updatedData = [...Object.values(columns)[0].items, { ...newFieldData, id: `${uuidv4()}`, type: 'field' }]
    const [firstKey, ...remainingKeys] = Object.keys(columns);
    const updatedFirstSubObject = { ...columns[firstKey], items: updatedData, };

    const updatedObject = {
      ...columns,
      [firstKey]: updatedFirstSubObject
    };
    setColumns(updatedObject)
    closeAddfield(false)
    alert('Field Added Succesfully')
  }

  const updateNewFieldData = (fieldName, value) => {
    setNewFielddata((prevState) => {
      const newState = { ...prevState };
      const keys = fieldName.split('.')

      let currentObj = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        currentObj = currentObj[keys[i]]
      }
      currentObj[keys[keys.length - 1]] = value;

      return newState;
    })
  }

  const filterFields = (e) => {
    setFieldsSearchText(e.target.value)
    setColumns(updateCards(columns, additionalFieldsData, e.target.value))
  }

  const gridColsClass = () => {
    switch (noOfColumns) {
      case '1':
        return 'grid-cols-1'
      case '2':
        return 'grid-cols-2'
      case '3':
        return 'grid-cols-3'
      default:
        return 'grid-cols-4';
    }
  }

  const customCollisionDetection = (args) => {
    const pointerIntersections = pointerWithin(args);
    return pointerIntersections.length > 0
      ? pointerIntersections
      : rectIntersection(args);
  };

  return (
    <DndContext
      collisionDetection={customCollisionDetection}
      onDragStart={({ active }) => {
        // console.log("Dragging:", active.id);
        const item = Object.values(columns)
          .flatMap(col => col.items)
          .find(item => item.id === active.id);
        setActiveItem(item);
      }}
      onDragEnd={(event) => {
        setActiveItem(null);
        handleDragEndGeneric({ ...event, columns, setColumns });
      }}
    >
      <div id="container" className='flex flex-col w-full h-[95%] grow bg-white'>
        <div id="task-column-styles" className='flex flex-col w-full h-full'>
          <div id="DND-container" className='flex items-center gap-2 w-full h-full rounded pr-2 pb-2 grow overflow-auto'>
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <DroppableContainer
                  key={columnId}
                  id={columnId}
                  classNames={`${column.title !== "Additional Fields" && 'max-w-[80%] h-full grow '}
                  ${column.title === "Additional Fields" ? 'shadow-[0_0px_10px_4px_#ccc] !rounded-tl-none ' : 'shadow-[0_0_10px_4px_#ccc]'}
                  rounded-[10px] overflow-auto h-full`}
                >
                  <div
                    className={` 
                      overflow-x-hidden overflow-y-auto `}
                    style={column.title === "Additional Fields" ? DragStyles : DropStyles}
                  >
                    <Modal
                      isOpen={addField}
                      onRequestClose={closeAddfield}
                      content=''
                      style={CustomSettings}
                    >
                      <div className='overflow-y-auto w-full h-fit '>
                        <form
                          className='flex flex-col justify-center items-center w-full min-h-[60vh] 
                                  grow gap-3 text-black py-[1%] pr-[12%] pl-[5%] '
                          onSubmit={addNewField}
                        >
                          <h3 className='font-semibold'>Adding Field</h3>
                          <div className='w-fit h-full flex items-center mx-1 text-[11px]' style={addFieldsstyles}>
                            <label className='w-[30%] text-right text-black ' htmlFor="name">Name : </label>
                            <input className='text-black p-2 h-fit rounded border outline-none w-fit grow' type="text"
                              placeholder="Enter Field Name"
                              id='name'
                              onChange={e => { updateNewFieldData('Task', e.target.value) }}
                              value={newFieldData.Task}
                            />
                          </div>

                          <div className='w-fit h-full flex items-center mx-1 text-[11px]' style={addFieldsstyles}>
                            <label className='w-[30%] text-right text-black ' htmlFor="content" >Type: </label>

                            <select className='bg-white text-black outline-none border w-[60%]'
                              style={{ minWidth: '150px', flexGrow: '1', border: '1px solid #6c757d' }}
                              id='content' onChange={e => { updateNewFieldData('details.type', e.target.value) }}
                              value={newFieldData.details.type}
                            >
                              <option selected value={'text'}>Text</option>
                              <option value={'select'}>Select</option>
                              <option value={'number'}>Phone Number</option>
                              <option value={'email'}>Email</option>
                              <option value={'checkbox'}>Checkbox</option>
                            </select>
                          </div>

                          <div className='w-fit h-full flex items-center mx-1 text-[11px]' style={addFieldsstyles}>
                            <label className='w-[30%] text-right text-black ' htmlFor="length">Length : </label>
                            <input className='text-black p-2 h-fit rounded border outline-none w-fit grow' type="text"
                              placeholder="Ex: 200"
                              id='length'
                              onChange={e => { updateNewFieldData('details.length', e.target.value) }}
                              value={newFieldData.details.length}
                            />
                          </div>

                          <div className='w-fit h-full flex items-center mx-1 text-[11px]' style={addFieldsstyles}>
                            <label className='w-[30%] text-right text-black ' htmlFor="isRequired">Required :</label>
                            <input type="checkbox"
                              id="isRequired"
                              onChange={e => { updateNewFieldData('details.required', e.target.checked) }}
                            />
                          </div>

                          <div className='w-fit h-full flex items-center mx-1 text-[11px]' style={addFieldsstyles}>
                            <label className='w-[30%] text-right text-black ' htmlFor="placeholder">PlaceHolder : </label>
                            <input className='text-black p-2 h-fit rounded border outline-none w-fit grow' type="text"
                              placeholder="Enter Placeholder"
                              id='placeholder'
                              onChange={e => { updateNewFieldData('details.placeholder', e.target.value) }}
                              value={newFieldData.details.placeholder}
                            />
                          </div>

                          <div className='w-fit h-full flex items-center mx-1 text-[11px]' style={{ ...addFieldsstyles, alignItems: 'flex-start' }} >
                            <label className='w-[30%] text-right text-black ' htmlFor="description">Description : </label>
                            <textarea className='outline-none bg-white text-black rounded p-2 w-fit grow min-h-[10vh]'
                              rows={5}
                              cols={60}
                              style={{ backgroundColor: '', color: '#000', border: '1px solid' }}
                              onChange={e => { updateNewFieldData('details.description', e.target.value) }}
                              value={newFieldData.details.description}
                            ></textarea>
                          </div>

                          <div className='mt-auto flex gap-x-4 self-end' >
                            <button
                              className='bg-white text-black border border-black px-4  py-2 outline-none flex items-center justify-center'
                              type="button"
                              onClick={closeAddfield}
                            >
                              Cancle
                            </button>
                            <button
                              type="submit"
                              className='bg-[#274c77] text-white py-2 px-4 rounded flex items-center justify-center mt-auto self-end'
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </Modal>

                    {(column.title === "Additional Fields") ? (
                      <div className='flex items-center gap-2 mb-2'>
                        <input
                          className='bg-gray-100 text-black w-full rounded p-2 outline-none border-none text-[11px]'
                          type="search"
                          placeholder='Search Field here...'
                          onChange={filterFields}
                          value={fieldsSearchText}
                        />
                        {column.title === "Additional Fields" ?
                          <button
                            className='py-2 px-4 bg-[rgba(1, 0, 255, 0.15)] text-[#284b63] flex justify-between items-center rounded outline-none border-none cursor-pointer h-full w-fit active:bg-white active:text-black '
                            title="Add New Field"
                            type="button"
                            onClick={openAddfield}
                          >
                            {renderIcons('IoMdAdd', 18, 'inherit')}
                          </button>
                          : null}
                      </div>
                    ) : null}

                    <div
                      className={`w-full h-fit p-2 flex-wrap gap-x-2 grid ${gridColsClass()} 
                          scrollbar-thin scrollbar-thumb-black/30 scrollbar-track-transparent !overflow-x-hidden `}
                      style={{
                        display: column.title === 'Drop Field Here' ? 'grid' : 'block',
                      }}
                    >
                      <SortableContext
                        items={column.items.map((item) => item.id)}
                        className='!overflow-x-hidden'
                        strategy={verticalListSortingStrategy}
                      >
                        {column.items.length > 0 && column.items.map((item, index) => {
                          // hide from original list during drag
                          if (activeItem?.id === item.id) return null;

                          return (
                            <SortableItem
                              key={item.id}
                              id={item.id}
                              render={({ isDragging, attributes, listeners }) => (
                                <TaskCard
                                  item={item}
                                  index={index}
                                  updateDetailsContent={updateDetailsContent}
                                  isOverlay={isDragging}
                                  attributes={attributes}
                                  listeners={listeners}
                                />
                              )}
                            />
                          );
                        })}
                      </SortableContext>
                    </div>
                  </div>
                </DroppableContainer>
              );
            })}
          </div>
        </div>
      </div>
      <DragOverlay dropAnimation={null}>
        {activeItem ? (
          <TaskCard
            id={activeItem.id}
            item={activeItem}
            customWidth={'150px'}
            updateDetailsContent={updateDetailsContent}
            isOverlay={true} // optional prop for styling overlays differently
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

RenderFields.propTypes = {
  onDragEnd: PropTypes.func.isRequired,
  setColumns: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
  DragStyles: PropTypes.object.isRequired,
  noOfColumns: PropTypes.number.isRequired,
  CustomSettings: PropTypes.object.isRequired,
  addFieldsstyles: PropTypes.object.isRequired,
  updateCards: PropTypes.func.isRequired,
  additionalFieldsData: PropTypes.array.isRequired,
  updateDetailsContent: PropTypes.func.isRequired
};