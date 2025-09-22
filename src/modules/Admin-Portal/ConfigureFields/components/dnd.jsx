import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { DragCardItem, CheckBoxTag, } from '../pages/StyledComponents';

const SortableItem = ({ item }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: '10px',
        border: '1px solid gray',
        marginBottom: '5px',
        backgroundColor: 'white'
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {item.name} {/* Displaying item name */}
        </div>
    );
};

export default function ItemsDND({ columnItems, checkIfSelected, handleColumnVisibility }) {
    const [items, setItems] = useState(columnItems);

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                {/* {items.map((item) => (
                    <SortableItem key={item.id} item={item} />
                ))} */}

                {items?.length > 0 &&
                    items.map((item, index) => (
                        <SortableItem
                            key={item.name} // Ensure item.name is unique
                            item={item}
                        />

                    ))}
                {/* <DragCardItem
                                isSelected={checkIfSelected(item.name)}
                            >
                                <CheckBoxTag
                                    type="checkbox"
                                    checked={checkIfSelected(item.name)}
                                    onChange={() => handleColumnVisibility(item)}
                                />
                                {item.name.replace(/_/g, ' ') // Replace underscores with space
                                    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
                                    .replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter
                                    .replace(/\b\w/g, (str) => str.toUpperCase()) // Capitalize each word
                                }
                            </DragCardItem>

                        </SortableItem> */}
            </SortableContext>
        </DndContext>
    );
}
