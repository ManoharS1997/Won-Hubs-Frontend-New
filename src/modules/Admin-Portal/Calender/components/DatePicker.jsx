import { useState, useRef, useEffect } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

export default function DatePickerPopup({ value, onChange }) {
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Format full date with day
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="relative w-full" ref={ref}>
      {/* FIELD */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center border rounded-lg px-3 py-2.5 justify-between cursor-pointer text-[15px]"
      >
        {formatDate(value)}
      </div>

      {/* POPUP DATE PICKER */}
      {open && (
        <div className="absolute top-[105%] left-0 bg-white shadow-xl border rounded-xl z-50 p-2">
          <DatePicker
            onChange={(date) => {
              onChange(date);
              setOpen(false);
            }}
            value={value}
            calendarClassName="rounded-xl shadow"
            clearIcon={null}
            calendarIcon={null}
          />
        </div>
      )}
    </div>
  );
}
