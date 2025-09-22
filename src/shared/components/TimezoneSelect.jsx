
import { useTimezoneSelect, allTimezones } from 'react-timezone-select';

import renderIcons from '../functions/renderIcons';

const labelStyle = 'original';
const timezones = { ...allTimezones, 'Europe/Berlin': 'Frankfurt' };

export default function TimezoneSelectDropdown({
  value, name, onChangeHandler, label, isMandatory, iconName
}) {
  const { options, parseTimezone } = useTimezoneSelect({ labelStyle, timezones });

  const setTimeZone = (e) => {
    parseTimezone(e.currentTarget.value);
    onChangeHandler(e.target.value, name);
  };

  return (
    <div className="group w-full h-fit flex flex-col grow-1 gap-1 ">
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
      <div
        className='w-full border p-2 py-1 focus:!shadow '
      >
        <select
          id={name}
          onChange={(e) => setTimeZone(e)}
          className='py-0 !w-full !border-none focus:!shadow-[var(--proimary-color)] '>
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}