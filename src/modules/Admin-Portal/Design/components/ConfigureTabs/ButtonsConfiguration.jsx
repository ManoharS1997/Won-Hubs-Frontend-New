import React from 'react';
import Swal from 'sweetalert2';
import renderIcons from '../../../../../shared/functions/renderIcons';

/**
 * ButtonsConfigurations component for configuring button details.
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the configuration panel is open.
 * @param {Object} props.buttonDetails - Details of the button being configured.
 * @param {Function} props.updateFieldColumnsData - Handler for updating column data.
 * @param {Function} props.updateFieldButtonsData - Handler for updating button data.
 */
export default function ButtonsConfigurations({
  isOpen,
  buttonDetails,
  updateFieldColumnsData,
  updateFieldButtonsData,setIsOpen
}) {
  // Destructure button details for easier access
  const { id, Task, type, icon, details = {} } = buttonDetails || {};
  const { name, description } = details;


  const onDelete = () => (
    Swal.fire({
      title: "Are you sure want to delete this field?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your Button has been deleted.",
          icon: "success"
        });
      }
    })
  )
  // console.log('button data: ', buttonDetails)
  return (
    <div
      className={`w-fit h-full box-border bg-gray-200 flex grow flex-col gap-2 p-2 lg:!p-4 overflow-y-auto shadow-[0_4px_30px_rgba(0,0,0,0.1)]`}
      style={{ marginLeft: isOpen ? '0px' : '210px' }}
    >
      {/* Close button */}
      <button
        type="button"
        className="w-fit self-end !rounded-full"
        onClick={() => setIsOpen(false)}
        aria-label="Close"
      >
        {renderIcons("IoIosClose")}
      </button>
      {/* Header */}
      <h2 className="text-center text-[20px] m-0">
        {name} Button Configuration
      </h2>

      {/* Meta Tag Input */}
      <div className="flex items-center w-full h-fit">
        <label style={{ width: '40%' }} htmlFor={`meta-tag-${id}`}>
          Meta Tag:
        </label>
        <input
          className="p-2 rounded outline-none bg-white text-black border w-[60%] h-fit"
          type="text"
          id={id}
          value={Task || ''}
          onChange={e => updateFieldColumnsData('Task', e.target.id, e.target.value)}
        />
      </div>

      {/* Name Input */}
      <div className="flex items-center w-full h-fit">
        <label style={{ width: '40%' }} htmlFor={`name-${id}`}>
          Name:
        </label>
        <input
          className="p-2 rounded outline-none bg-white text-black border w-[60%] h-fit"
          type="text"
          id={id}
          value={name || ''}
          onChange={e => updateFieldButtonsData('name', e.target.id, e.target.value)}
        />
      </div>

      {/* Type Selector */}
      <div className="flex items-center w-full h-fit">
        <label style={{ width: '40%' }} htmlFor={`type-${id}`}>
          Type:
        </label>
        <select
          className="bg-white text-black outline-none border w-[65%]"
          id={id}
          value={type || 'button'}
          disabled
        >
          <option value="button">{type || 'button'}</option>
        </select>
      </div>

      {/* Icon Link */}
      <div className="flex items-center w-full h-fit">
        <label style={{ width: '40%' }} htmlFor={`icon-${id}`}>
          Icon:
        </label>
        {icon ? (
          <a href={icon} target="_blank" rel="noopener noreferrer">
            Click Here
          </a>
        ) : (
          <span>No Icon</span>
        )}
      </div>

      {/* Description Textarea */}
      <label style={{ width: '40%' }} htmlFor={`description-${id}`}>
        Description:
      </label>
      <textarea
        className="outline-none bg-white text-black rounded p-2 w-fit grow min-h-[10vh]"
        cols={20}
        rows={5}
        id={id}
        value={description || ''}
        style={{ width: '100%', flexGrow: 0 }}
        onChange={e => updateFieldButtonsData('description', e.target.id, e.target.value)}
      />
      {!buttonDetails?.isDefault && <button
        type='button'
        onClick={onDelete}
        className="w-full !bg-red-500 text-white py-2 !rounded mt-auto"
      >
        DELETE
      </button>}
    </div>
  );
}