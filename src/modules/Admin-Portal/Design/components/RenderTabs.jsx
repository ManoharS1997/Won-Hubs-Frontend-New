import React, { useState, useEffect } from 'react';
import { DndContext, DragOverlay, pointerWithin, rectIntersection } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { v4 as uuidv4 } from 'uuid';
import Modal from 'react-modal';
import TaskCard from './TaskCard';
import renderIcons from '../../../../shared/functions/renderIcons';
import { TabsDropStyles } from './Data';
import DroppableContainer from './DroppableContainer';
import SortableItem from './SortableItem';
import { handleDragEndGeneric } from './handleDragEnd ';

function RenderTabs({
  tabColumns, DragStyles, setTabColumns, CustomSettings,
  updateCards, TabColumnsFromBackend, updateDetailsContent, addFieldsstyles,
  handleNewRefDropdown, isNewRefSelectOpen, backendReferenceTables,
  backendFilter, setConfigureFields, setNewFilterSelectOpen, isNewFilterSelectOpen,
  setNewRefSelectOpen, setNewConfigFieldSelectOpen, isNewConfigFieldSelectOpen,
  configureFields
}) {
  const [addTab, setAddTab] = useState(false);
  const [newTabData, setNewTabData] = useState({
    type: 'tab',
    Task: "",
    Due_Date: new Date(),
    details: {
      name: '',
      type: '',
      referenceTables: [],
      filter: [],
      configureFields: [],
      length: '',
      description: '',
    }
  });
  const [tabsSearchText, setTabsSearchText] = useState('');
  const [referenceTables, setReferenceTables] = useState(backendReferenceTables);
  const [filter, setFilter] = useState(backendFilter);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    setNewTabData((prevState) => ({
      ...prevState,
      details: {
        ...prevState.details,
        name: prevState.Task
      }
    }));
  }, [newTabData.Task]);

  const openAddTab = () => setAddTab(true);
  const closeAddTab = () => setAddTab(false);

  const addNewTab = (e) => {
    e.preventDefault();
    if (newTabData.details.description === '') {
      return alert('Please Fill all the Required Fields');
    }
    const updatedData = [...Object.values(tabColumns)[0].items, { ...newTabData, id: `${uuidv4()}` }];
    const [firstKey] = Object.keys(tabColumns);
    const updatedFirstSubObject = { ...tabColumns[firstKey], items: updatedData };

    const updatedObject = {
      ...tabColumns,
      [firstKey]: updatedFirstSubObject
    };
    setTabColumns(updatedObject);
    closeAddTab(false);
    alert('Tab Added Succesfully');
  };

  const filterTabs = (e) => {
    setTabsSearchText(e.target.value);
    setTabColumns(updateCards(tabColumns, TabColumnsFromBackend, e.target.value));
  };

  const updateNewTabData = (fieldName, value) => {
    setNewTabData((prevState) => {
      const newState = { ...prevState };
      const keys = fieldName.split('.');

      let currentObj = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        currentObj = currentObj[keys[i]];
      }
      currentObj[keys[keys.length - 1]] = value;
      return newState;
    });
  };

  const updateNewTabArray = (tableId, stateData, fieldName) => {
    const updatedData = stateData.map(table =>
      table.id === tableId ? { ...table, selected: !table.selected } : table
    );
    if (fieldName === 'referenceTables') setReferenceTables(updatedData);
    else if (fieldName === 'filter') setFilter(updatedData);
    else setConfigureFields(updatedData);

    updateNewTabData(`details.${fieldName}`, updatedData);
  };

  const removeNewTabArrayItem = (tableId, stateData, fieldName) => {
    const updatedData = stateData.map(table =>
      table.id === tableId ? { ...table, selected: false } : table
    );
    if (fieldName === 'referenceTables') setReferenceTables(updatedData);
    else if (fieldName === 'filter') setFilter(updatedData);
    else setConfigureFields(updatedData);

    updateNewTabData(`details.${fieldName}`, updatedData);
  };

  const handleNewFilterDropdown = () => {
    setNewFilterSelectOpen(!isNewFilterSelectOpen);
    setNewRefSelectOpen(false);
    setNewConfigFieldSelectOpen(false);
  };

  const handleNewConfigFieldDropdown = () => {
    setNewConfigFieldSelectOpen(!isNewConfigFieldSelectOpen);
    setNewFilterSelectOpen(false);
    setNewRefSelectOpen(false);
  };

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
        const item = Object.values(tabColumns)
          .flatMap(col => col.items)
          .find(item => item.id === active.id);
        setActiveItem(item);
      }}
      onDragEnd={(event) => {
        setActiveItem(null);
        handleDragEndGeneric({ ...event, columns: tabColumns, setColumns: setTabColumns });
      }}
    >
      <div id="container" className='flex flex-col w-full h-[95%] grow bg-white'>
        <div id="task-column-styles" className='flex flex-col w-full h-full'>
          <div className='flex w-full h-full rounded pr-2 pb-2 grow gap-2'>
            {Object.entries(tabColumns).map(([columnId, column]) => (
              <DroppableContainer
                key={columnId}
                id={columnId}

                // classNames={`${column.title !== "Additional Fields" && 'max-w-[80%] h-full grow '}
                // ${column.title === "Additional Fields" ? 'shadow-[0_0px_10px_4px_#ccc] !rounded-tl-none ' : 'shadow-[0_0_10px_4px_#ccc]'}
                // rounded-[10px] overflow-auto h-full`}
                classNames={`${column.title !== "Tabs" && 'max-w-[80%] h-full grow '} rounded-[10px]
                 ${column.title === "Tabs" ? 'shadow-[0_0px_10px_4px_#ccc]' : 'shadow-[0_0_10px_4px_#ccc]'}`}
              >
                <div style={column.title === "Tabs" ? DragStyles : TabsDropStyles}>
                  <Modal
                    isOpen={addTab}
                    onRequestClose={closeAddTab}
                    content=''
                    style={CustomSettings}
                  >
                    <div className='overflow-y-auto w-full h-fit ' >
                      <form
                        className='flex flex-col justify-center items-center w-full min-h-[60vh] 
                                  grow gap-3 text-black py-[1%] pr-[12%] pl-[5%] '
                        onSubmit={addNewTab}
                      >
                        <h3 className='font-semibold'>Adding Tab</h3>

                        <div className='w-fit h-full flex items-center mx-1 text-[11px]' style={addFieldsstyles}>
                          <label className='w-[30%] text-right text-black ' htmlFor="name">Name : </label>
                          <input className='text-black p-2 h-fit rounded border outline-none w-fit grow' type="text"
                            placeholder="Enter Tab Name"
                            id='name'
                            onChange={e => { updateNewTabData('Task', e.target.value) }}
                            value={newTabData.Task}
                          />
                        </div>

                        <div className='w-fit h-full flex items-center mx-1 text-[11px]' style={addFieldsstyles}>
                          <label className='w-[30%] text-right text-black ' htmlFor="type" >Type: </label>
                          <select className='bg-white text-black outline-none border w-[60%]'
                            style={{ minWidth: '150px', flexGrow: '1', border: '1px solid ' }}
                            id='type'
                            onChange={e => { updateNewTabData('details.type', e.target.value) }}
                            value={newTabData.details.type}
                          >
                            <option value={'table'}>Table</option>
                          </select>
                        </div>

                        <div className='w-fit h-full flex items-center mx-1 text-[11px]' style={addFieldsstyles}>
                          <label className='w-[30%] text-right text-black ' htmlFor="length">Length : </label>
                          <input className='text-black p-2 h-fit rounded border outline-none w-fit grow'
                            type="text"
                            placeholder="Ex: 200"
                            id='length'
                            onChange={e => { updateNewTabData('details.length', e.target.value) }}
                            value={newTabData.details.length}
                          />
                        </div>

                        <div className='w-fit h-full flex items-center mx-1 text-[11px]' style={addFieldsstyles}>
                          <label className='w-[30%] text-right text-black ' htmlFor="reference-tables">Reference Tables :</label>

                          <div
                            className='relative w-[60%] h-[35px] flex items-center border rounded bg-white '
                            style={{ flexGrow: '1', width: '60%', marginLeft: 'auto' }}
                          >
                            <div
                              className='w-full h-full p-0 relative flex items-center justify-between mx-2 bg-white'
                              onClick={handleNewRefDropdown}
                            >
                              {'Select Table(s)'}
                              {renderIcons('RiArrowDownSLine', 18, 'inherit')}
                            </div>
                            {isNewRefSelectOpen && (
                              <div className='absolute top-full left-0 w-full p-1 m-0 bg-white max-h-[250px] flex flex-col mt-1 rounded z-999 shadow-lg ' >
                                <div className='overflow-y-auto overflow-x-hidden w-full min-h-fit max-h-[80%] flex flex-col rounded p-1 '>
                                  {referenceTables.map(tableName =>
                                    <div className='px-2 py-1 rounded flex border-b cursor-pointer' key={tableName.id} >
                                      <input type="checkbox" id={tableName.id}
                                        checked={tableName.selected}
                                        onChange={() => updateNewTabArray(tableName.id, referenceTables, 'referenceTables')}
                                      />
                                      <option className='ml-1 p-2' htmlFor="Super Admin">{tableName.name}</option>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <ol className='pl-0 flex flex-wrap gap-4 w-full list-decimal'>
                          {referenceTables.map(table => (
                            table.selected ?
                              <li
                                className='flex items-center justify-between w-fit  gap-4 bg-[#495057] text-white rounded py-1 px-2 '
                                key={table.id}>
                                {table.name}
                                <button
                                  className='w-fit p-1 m-0 bg-transparent text-[#fbfefb] border-none outline-none flex items-center justify-center cursor-pointer'
                                  type="button"
                                  id={table.id}
                                  onClick={() => removeNewTabArrayItem(table.id, referenceTables, 'referenceTables')}
                                >
                                  {/* <MdOutlineClose id={table.id} /> */}
                                  {renderIcons('MdOutlineClose')}
                                </button>
                              </li> : null
                          ))}
                        </ol>

                        <div className='w-fit h-full flex items-center mx-1 text-[11px]' style={addFieldsstyles}>
                          <label className='w-[30%] text-right text-black ' htmlFor="filter">Filter :</label>

                          <div
                            className='relative w-[60%] h-[35px] flex items-center border rounded bg-white '
                            style={{ flexGrow: '1', width: '60%', marginLeft: 'auto' }}
                          >
                            <div
                              className='w-full h-full p-0 relative flex items-center justify-between mx-2 bg-white'
                              onClick={handleNewFilterDropdown}
                            >
                              {'Select Filter(s)'}
                              {renderIcons('RiArrowDownSLine', 18,)}
                            </div>

                            {isNewFilterSelectOpen && (
                              <div className='absolute top-full left-0 w-full p-1 m-0 bg-white max-h-[250px] flex flex-col mt-1 rounded z-999 shadow-lg '  >
                                <div className='overflow-y-auto overflow-x-hidden w-full min-h-fit max-h-[80%] flex flex-col rounded p-1 '>
                                  {filter.map(tableName =>
                                    <div className='px-2 py-1 rounded flex border-b cursor-pointer' key={tableName.id} >
                                      <input type="checkbox" id={tableName.id}
                                        checked={tableName.selected}
                                        onChange={() => updateNewTabArray(tableName.id, filter, 'filter')}
                                      />
                                      <option className='ml-1 p-2'>{tableName.name}{'  '}({tableName.referenceTable})</option>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <ol className='pl-0 flex flex-wrap gap-4 w-full list-decimal'>
                          {filter.map(table => (
                            table.selected ? <li className='flex items-center justify-between w-fit gap-4 bg-[#495057] text-white rounded px-2 py-1'
                              key={table.id}>
                              {table.name} {' '}({table.referenceTable})
                              <button
                                className='w-fit p-1 m-0 bg-transparent text-[#fbfefb] border-none outline-none flex items-center justify-center cursor-pointer'
                                type="button"
                                id={table.id}
                                onClick={() => removeNewTabArrayItem(table.id, filter, 'filter')}
                              >
                                {/* <MdOutlineClose id={table.id} /> */}
                                {renderIcons('MdOutlineClose')}
                              </button>
                            </li> : null
                          ))}
                        </ol>

                        <div className='w-fit h-full flex items-center mx-1 text-[11px]' style={addFieldsstyles}>
                          <label className='w-[30%] text-right text-black ' htmlFor="config-fields">Configure Fields :</label>

                          <div
                            className='relative w-[60%] h-[35px] flex items-center border rounded bg-white '
                            style={{ flexGrow: '1', width: '60%', marginLeft: 'auto' }}
                          >
                            <div
                              className='w-full h-full p-0 relative flex items-center justify-between mx-2 bg-white'
                              onClick={handleNewConfigFieldDropdown}>
                              {'Select Configure Item(s)'}
                              {renderIcons('RiArrowDownSLine', 18, 'inherit')}
                            </div>

                            {isNewConfigFieldSelectOpen && (
                              <div className='absolute top-full left-0 w-full p-1 m-0 bg-white max-h-[250px] flex flex-col mt-1 rounded z-999 shadow-lg '  >
                                <div className='overflow-y-auto overflow-x-hidden w-full min-h-fit max-h-[80%] flex flex-col rounded p-1 '>
                                  {configureFields.map(item =>
                                    <div className='px-2 py-1 rounded flex border-b cursor-pointer' key={item.id} >
                                      <input type="checkbox" id={item.id}
                                        checked={item.selected}
                                        onChange={() => updateNewTabArray(item.id, configureFields, 'configureFields')}
                                      />
                                      <option className='ml-1 p-2'>{item.name}{'  '}({item.referenceTable})</option>
                                    </div>
                                  )}

                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <ol className='pl-0 flex flex-wrap gap-4 w-full list-decimal'>
                          {configureFields.map(item => (
                            item.selected ? <li className='flex items-center justify-between w-fit gap-4 bg-[#495057] text-white rounded px-2 py-1'
                              key={item.id}>
                              {item.name} {' '}({item.referenceTable})
                              <button
                                className='w-fit p-1 m-0 bg-transparent text-[#fbfefb] border-none outline-none flex items-center justify-center cursor-pointer'
                                type="button"
                                id={item.id}
                                onClick={() => removeNewTabArrayItem(item.id, configureFields, 'configureFields')}
                              >
                                {renderIcons('MdOutlineClose')}
                              </button>
                            </li> : null
                          ))}
                        </ol>

                        <div className='w-fit h-full flex items-center mx-1 text-[11px]' style={{ ...addFieldsstyles, alignItems: 'flex-start' }}>
                          <label className='w-[30%] text-right text-black ' htmlFor="description">Description : </label>
                          <textarea className='outline-none bg-white text-black rounded p-2 w-fit grow min-h-[10vh]'
                            rows={5}
                            cols={60}
                            style={{ backgroundColor: '#fff', color: '#000', border: '1px solid ' }}
                            onChange={e => { updateNewTabData('details.description', e.target.value) }}
                            value={newTabData.details.description}
                          ></textarea>
                        </div>

                        <div className='mt-auto flex gap-2 self-end' >
                          <button
                            className='bg-white text-black border py-2 px-4 outline-none flex items-center justify-center'
                            type="button" onClick={closeAddTab}>Cancle</button>
                          <button
                            className='bg-[#274c77] text-white py-2 px-4 rounded flex items-center justify-center mt-auto self-end'
                            type="submit">Submit</button>
                        </div>
                      </form>
                    </div>
                  </Modal>

                  {column.title === "Tabs" && (
                    <div className='flex items-center gap-2 mb-4'>
                      <input
                        className='bg-gray-100 text-black w-full rounded p-2 outline-none border-none text-[11px]'
                        type="search"
                        placeholder='Search Tab here...'
                        onChange={filterTabs}
                        value={tabsSearchText}
                      />
                      <button
                        className='!py-2 !px-4 !bg-[rgba(1, 0, 255, 0.15)] text-[#284b63] flex justify-between items-center rounded outline-none border-none cursor-pointer h-full w-fit active:!bg-white active:text-black '
                        title="Add New Tab"
                        type="button"
                        onClick={openAddTab}
                      >
                        {renderIcons('IoMdAdd', 18, 'inherit')}
                      </button>
                    </div>
                  )}

                  <div
                    className={`w-full h-fit overflow-y-auto p-2 flex-wrap gap-x-2 grid scrollbar-thin scrollbar-thumb-black/30 scrollbar-track-transparent`}
                    style={{
                      overflowY: column.title === "Tabs" ? 'auto' : 'hidden',
                      display: column.title !== "Tabs" ? 'flex' : 'block',
                    }}
                  >
                    <SortableContext
                      items={column.items.map((item) => item.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {column.items.length > 0 && column.items.map((item, index) => {
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
            ))}
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
            isOverlay={true}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default React.memo(RenderTabs);
