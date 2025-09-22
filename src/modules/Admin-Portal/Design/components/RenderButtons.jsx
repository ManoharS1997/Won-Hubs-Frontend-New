import React, { useState } from 'react';
import { DndContext, DragOverlay, pointerWithin, rectIntersection } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';
import DroppableContainer from './DroppableContainer';
import SortableItem from './SortableItem';
import { handleDragEndGeneric } from './handleDragEnd ';

function RenderButtons({
  buttonColumns, DragStyles, DropStyles, buttonsSearchText, setButtonsSearchText,
  setButtonColumns, updateCards, buttonsData, updateDetailsContent
}) {
  const [activeItem, setActiveItem] = useState(null);

  const filterButtons = (e) => {
    setButtonsSearchText(e.target.value);
    setButtonColumns(updateCards(buttonColumns, buttonsData, e.target.value));
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
        const item = Object.values(buttonColumns)
          .flatMap(col => col.items)
          .find(item => item.id === active.id);
        setActiveItem(item);
      }}
      onDragEnd={(event) => {
        setActiveItem(null);
        handleDragEndGeneric({ ...event, columns: buttonColumns, setColumns: setButtonColumns });
      }}
    >
      <div id="container" className='flex flex-col w-full h-[95%] grow bg-white'>
        <div id="task-column-styles" className='flex flex-col w-full h-full'>
          <div id="DND-container" className='flex w-full h-full rounded pr-2 pb-2 gap-2 grow'>
            {Object.entries(buttonColumns).map(([columnId, column]) => (
              <DroppableContainer
                key={columnId}
                id={columnId}
                classNames={` rounded-[10px] ${column.title !== "Buttons" && 'max-w-[80%] h-full grow '}
                 ${column.title === "Buttons"
                    ? 'shadow-[0_0px_10px_4px_#ccc]'
                    : 'shadow-[0_0_10px_4px_#ccc]'}`}
              >
                <div style={column.title === "Buttons" ? DragStyles : DropStyles}>
                  {column.title === "Buttons" && (
                    <div className='flex items-center gap-2 mb-4'>
                      <input
                        className='bg-gray-100 text-black w-full rounded p-2 outline-none border-none text-[11px]'
                        type="search"
                        placeholder='Search Button here...'
                        value={buttonsSearchText}
                        onChange={filterButtons}
                      />
                    </div>
                  )}

                  <div
                    className={`w-full h-fit overflow-y-auto p-2 flex-wrap gap-x-2 grid 
                      scrollbar-thin scrollbar-thumb-black/30 scrollbar-track-transparent`}
                    style={{
                      columnGap: '15px',
                      overflowY: column.title === "Buttons" ? 'auto' : 'hidden',
                      overflowX: 'hidden',
                      display: column.title !== "Buttons" ? 'flex' : 'block',
                      flexWrap: 'wrap',
                      width: '100%',
                      paddingBottom: column.title === 'Drop Field Here' ? '15px' : '2px',
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
            updateDetailsContent={updateDetailsContent}
            isOverlay={true}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default React.memo(RenderButtons);
