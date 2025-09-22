// utils/dndHandlers.js
export function handleDragEndGeneric({ active, over, columns, setColumns }) {
  if (!over || active.id === over.id) return;

  const sourceColumnId = Object.keys(columns).find((key) =>
    columns[key].items.some((item) => item.id === active.id)
  );

  const destinationColumnId = Object.keys(columns).find((key) =>
    columns[key].items.some((item) => item.id === over.id)
  ) || over.id;

  if (!sourceColumnId || !destinationColumnId) return;

  const sourceItems = [...columns[sourceColumnId].items];
  const destinationItems = [...columns[destinationColumnId].items];

  const activeIndex = sourceItems.findIndex((item) => item.id === active.id);
  const overIndex = destinationItems.findIndex((item) => item.id === over.id);

  const [movedItem] = sourceItems.splice(activeIndex, 1);

  if (sourceColumnId === destinationColumnId) {
    const updatedItems = [...sourceItems];
    updatedItems.splice(overIndex === -1 ? updatedItems.length : overIndex, 0, movedItem);

    setColumns(prev => ({
      ...prev,
      [sourceColumnId]: {
        ...columns[sourceColumnId],
        items: updatedItems,
      },
    }));
  } else {
    const updatedDestinationItems = [...destinationItems];
    updatedDestinationItems.splice(overIndex === -1 ? updatedDestinationItems.length : overIndex, 0, movedItem);

    setColumns(prev => ({
      ...prev,
      [sourceColumnId]: {
        ...columns[sourceColumnId],
        items: sourceItems,
      },
      [destinationColumnId]: {
        ...columns[destinationColumnId],
        items: updatedDestinationItems,
      },
    }));
  }
}
