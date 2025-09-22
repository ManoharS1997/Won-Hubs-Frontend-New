// src/DateTimePicker.js
import { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { getYear, getMonth } from 'date-fns';
import _ from 'lodash';

import {
  ModalContent, PickerContainer, PickerRow, Label, CustomHeader,
  LeftArrow, RightArrow, Pickerbutton, CloseBtn, PickerTitle
} from './StyledComponents';

import './index.css';

const range = (start, end, step) => _.range(start, end + step, step);

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function DateTimePicker() {
  const [time, setTime] = useState('12:00');
  const [timezone, setTimezone] = useState("Asia/Calcutta");
  const [isPickerOpen, setPickerOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const years = range(1900, getYear(new Date()) + 100, 1);

  const handleOpenPicker = () => setPickerOpen(true)

  const handleClosePicker = () => setPickerOpen(false)

  const handleTimezoneChange = (e) => setTimezone(e.target.value)

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = _.range(currentYear - 100, currentYear + 11); // +11 to include currentYear + 10
  }, []);

  const handleDateChange = (e) => setStartDate(e);

  const renderDatePicker = () => (
    <DatePicker
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <CustomHeader>
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            <LeftArrow size={20} />
          </button>

          <div>
            <select
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value)}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            <RightArrow size={20} />
          </button>
        </CustomHeader>
      )}
      onChange={handleDateChange}
      selected={startDate}
      inline
    />
  );

  return (
    <div>
      <Pickerbutton
        onClick={handleOpenPicker}
        data-tooltip-id='custom_picker2'
        className='picker-button'
      >
        {JSON.stringify(startDate).split('T')[0].slice(1,)}
      </Pickerbutton>

      {isPickerOpen &&
        <Tooltip
          id='custom_picker2'
          clickable
          style={{
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '0px 2px 10px 1px #ccc',
            opacity: '1',
            left: '0',
            backgroundColor: '#fff',
          }}
          opacity={1}
          noArrow={false}
          arrowColor='#000'
          place='bottom'
          offset={6}
          openOnClick={true}
          isOpen={isPickerOpen}
        >
          <ModalContent>
            <PickerTitle>Start Date</PickerTitle>
            <PickerContainer>
              {renderDatePicker()}

              <label style={{ color: '#000', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                <span>Timezone: </span>
                <select value={timezone} onChange={handleTimezoneChange} style={{ maxWidth: '150px' }}>
                  {Intl.supportedValuesOf('timeZone').map(tz => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
                </select>

                <PickerRow>
                  <Label htmlFor="timeSelect">Time:</Label>
                  <input type="time" id="timeSelect" value={time} onChange={(e) => setTime(e.target.value)} style={{ padding: '5px', borderRadius: '5px', border: '1px solid', outline: 'none' }} />
                </PickerRow>
              </label>
            </PickerContainer>

            <CloseBtn onClick={handleClosePicker}>Close</CloseBtn>
          </ModalContent>
        </Tooltip>}
    </div>
  );
}
