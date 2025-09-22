// components/DroppableContainer.jsx
import { useDroppable } from '@dnd-kit/core';

export default function DroppableContainer({ id, classNames = '', children, style }) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={classNames} style={style}>
      {children}
    </div>
  );
}
