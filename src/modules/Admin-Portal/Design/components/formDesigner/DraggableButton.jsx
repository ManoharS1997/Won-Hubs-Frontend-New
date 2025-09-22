import PropTypes from "prop-types";

export default function DraggableButton({ item, category, onDragStart, children, className }) {
  return (
    <button
      type="button"
      draggable
      onDragStart={e => onDragStart(e, item, category)}
      className={className}
    >
      {children}
    </button>
  );
}

DraggableButton.propTypes = {
  item: PropTypes.any.isRequired,
  category: PropTypes.string.isRequired,
  onDragStart: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};