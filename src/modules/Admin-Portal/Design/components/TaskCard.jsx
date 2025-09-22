import React from 'react';
import { TaskInformation, FieldName } from './StyledComponents';
import renderIcons from '../../../../shared/functions/renderIcons';

const TaskCard = ({ item, index, updateDetailsContent, customWidth, isOverlay, attributes, listeners }) => {
  const handleClick = () => {
    updateDetailsContent(item.id, item.type);
  };

  const style = {
    // width: customWidth || '100%',
    cursor: 'default',
  };

  return (
    <div style={style}>
      {/* Clickable content */}
      <TaskInformation onClick={handleClick}>
        {/* optional left drag ahndler */}
        {/* <div
          {...listeners}
          {...attributes}
          style={{ cursor: 'grab', display: 'inline-block' }}
        >
          {renderIcons('GoGrabber')}
        </div> */}

        <FieldName style={{ margin: '0px', width: '90%' }}>
          {item.details.name}
        </FieldName>
        {/* Drag handle */}
        <div
          {...listeners}
          {...attributes}
          style={{ cursor: 'grab', display: 'inline-block' }}
        >
          {renderIcons('GoGrabber')}
        </div>
      </TaskInformation>
    </div>
  );
};

export default TaskCard;
