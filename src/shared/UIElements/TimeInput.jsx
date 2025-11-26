import { useState, useRef, useEffect } from "react";
import { IoMdTime } from "react-icons/io";

const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));
const periods = ["AM", "PM"];

export default function TimePicker({ value, onChange }) {
    const [open, setOpen] = useState(false);

    const pickerRef = useRef(null);
    const inputRef = useRef(null);

    const [h, setH] = useState("09");
    const [m, setM] = useState("00");
    const [p, setP] = useState("AM");

    // ⭐ Sync internal state with value from parent
    useEffect(() => {
        if (!value) {
            // Ensure internal state is NOT undefined
            setH("09");
            setM("00");
            setP("AM");
            return;
        }
        const parts = value.split(" ");
        if (parts.length !== 2) return; // avoid undefined errors

        const [time, period] = parts;
        const [hour, minute] = time.split(":");

        if (hour && minute && period) {
            setH(hour);
            setM(minute);
            setP(period);
        }
    }, [value]);


    const selectTime = (hour, minute, period) => {
        // console.log("Selected Time:", `${hour}:${minute} ${period}`);
        onChange(`${hour}:${minute} ${period}`);
        setOpen(false);
    };

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(e) {
            if (inputRef.current && inputRef.current.contains(e.target)) return;
            if (pickerRef.current && pickerRef.current.contains(e.target)) return;
            setOpen(false);
        }

        if (open) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    return (
        <div className="relative w-full">

            {/* INPUT FIELD */}
            <div
                ref={inputRef}
                onClick={() => setOpen(!open)}
                className="flex items-center border rounded-lg px-3 py-2 gap-2 cursor-pointer bg-white text-[15px]"
            >
                <IoMdTime className="text-gray-600 text-lg" />
                <span>{value}</span>
            </div>

            {/* POPUP */}
            {open && (
                <div
                    ref={pickerRef}
                    className="absolute top-[105%] left-0 bg-white shadow-2xl border rounded-xl flex gap-3 px-3 py-2 z-30"
                >
                    {/* HOURS */}
                    <div className="h-40 overflow-y-auto hide-scrollbar pr-1">
                        {hours.map((hour) => (
                            <div
                                key={hour}
                                className={`px-3 py-2 text-center cursor-pointer rounded ${hour === h ? "bg-blue-600 text-white font-semibold" : "text-gray-800"
                                    }`}
                                onClick={() => {
                                    setH(hour);
                                    selectTime(hour, m, p);
                                }}
                            >
                                {hour}
                            </div>
                        ))}
                    </div>

                    {/* MINUTES */}
                    <div className="h-40 overflow-y-auto hide-scrollbar pr-1">
                        {minutes.map((minute) => (
                            <div
                                key={minute}
                                className={`px-3 py-2 text-center cursor-pointer rounded ${minute === m ? "bg-blue-600 text-white font-semibold" : "text-gray-800"
                                    }`}
                                onClick={() => {
                                    setM(minute);
                                    selectTime(h, minute, p);
                                }}
                            >
                                {minute}
                            </div>
                        ))}
                    </div>

                    {/* AM/PM */}
                    <div className="h-40 overflow-y-auto hide-scrollbar pr-1">
                        {periods.map((period) => (
                            <div
                                key={period}
                                className={`px-3 py-2 text-center cursor-pointer rounded ${period === p ? "bg-blue-600 text-white font-semibold" : "text-gray-800"
                                    }`}
                                onClick={() => {
                                    setP(period);
                                    selectTime(h, m, period);
                                }}
                            >
                                {period}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
