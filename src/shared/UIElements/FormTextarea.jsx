
import renderIcons from "../functions/renderIcons";

export default function FormTextarea({
  iconName, customstyles, type, label, placeholder, rows, cols,
  isMandatory, name, onChangeHandler, value, resize
}) {
  return (
    <div
      className="group w-full h-fit flex flex-col grow-1 gap-1 "
      style={customstyles}
    >
      <label
        htmlFor={name}
        className="w-full !flex gap-2"
      >
        {label || 'label'}
        {isMandatory === true && renderIcons('FaStarOfLife', 5, '#ff0000')}
        {iconName && <span className="border !border-[#ccc] rounded-[2px] ml-auto flex items-center justify-center p-[2px]">
          {renderIcons(iconName, 15, 'inherit')}
        </span>}
      </label>
      <textarea
        id={name}
        value={value}
        type={type || 'text'}
        placeholder={placeholder || ''}
        rows={rows || 5}
        cols={cols || 20}
        onChange={onChangeHandler}
        className={`w-full md:w-full grow-1 p-2 border outline-none
          focus:shadow-[0_0_0.5rem_0.1rem_var(--primary-color)] ${resize === true && ' !resize-y'}`}
      />
    </div>
  )
}