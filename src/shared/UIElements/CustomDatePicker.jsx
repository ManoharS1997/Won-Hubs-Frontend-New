import convertName from "../../utils/conevrtName";

export default function CustomDateTimePicker({
    label,
    value,
    onChangeHandler,
    showTime,
}) {
    const date = value ? new Date(value) : null;

    const dateValue = date ? date.toISOString().split('T')[0] : ''; // Ensure date string is valid
    const timeValue = date
        ? {
            hours: date.getHours() % 12 || 12, // Ensure 12-hour format
            minutes: date.getMinutes(),
            period: date.getHours() < 12 ? 'AM' : 'PM',
        }
        : { hours: '', minutes: '', period: 'AM' }; // Initialize empty values

    const handleDateChange = (date) => {
        const newDate = new Date(date);

        // Ensure valid time value, using defaults if time is not yet set
        const currentTime = timeValue.hours !== '' ? timeValue : { hours: 12, minutes: 0, period: 'AM' };

        newDate.setHours(currentTime.hours + (currentTime.period === 'PM' ? 12 : 0));
        newDate.setMinutes(currentTime.minutes);

        onChangeHandler(newDate.getTime()); // Ensure timestamp is always valid
    };

    const handleTimeChange = (time) => {
        const newDate = value ? new Date(value) : new Date(); // Ensure we have a valid date

        let hours = parseInt(time.hours, 10) || 0; // Default to 0 if empty
        if (time.period === 'PM') hours += 12;
        if (time.period === 'AM' && hours === 12) hours = 0;

        newDate.setHours(hours);
        newDate.setMinutes(parseInt(time.minutes, 10) || 0); // Default to 0 if empty

        onChangeHandler(newDate.getTime()); // Ensure timestamp is valid
    };

    return (
        <div className="w-full text-[var(--text-color)] flex flex-col gap-2">
            <label>{convertName(label)}</label>
            <div className="flex gap-2">
                <input
                    type="date"
                    value={dateValue}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="border border-[var(--secondary-color)] h-[2rem] p-2 outline-none"
                />
                {showTime && (
                    <div className="flex gap-2 items-center">
                        H:
                        <input
                            type="number"
                            min="1"
                            max="12"
                            value={timeValue.hours}
                            onChange={(e) =>
                                handleTimeChange({ ...timeValue, hours: e.target.value })
                            }
                            className="border border-[var(--secondary-color)] h-[2rem] p-2 outline-none w-15"
                            placeholder="HH"
                        />
                        M:
                        <input
                            type="number"
                            min="0"
                            max="59"
                            value={timeValue.minutes}
                            onChange={(e) =>
                                handleTimeChange({ ...timeValue, minutes: e.target.value })
                            }
                            className="border border-[var(--secondary-color)] h-[2rem] p-2 outline-none w-15"
                            placeholder="MM"
                        />

                        <select
                            value={timeValue.period}
                            onChange={(e) =>
                                handleTimeChange({ ...timeValue, period: e.target.value })
                            }
                            className="border border-[var(--secondary-color)] h-[2rem] outline-none w-15 !rounded-none"
                        >
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                    </div>
                )}
            </div>
        </div>
    );
}
