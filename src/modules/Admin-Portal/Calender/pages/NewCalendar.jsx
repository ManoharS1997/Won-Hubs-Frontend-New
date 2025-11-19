import { useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import EventModal from "./EventModal";

const dummyEvents = [
    {
        date: "2020-08-09",
        events: [
            { label: "Work Orders", color: "bg-red-400", count: 15 },
            { label: "Move-Ins", color: "bg-green-400", count: 9 },
            { label: "Move-Outs", color: "bg-purple-400", count: 3 },
            { label: "Notes", color: "bg-orange-300", count: 2 },
        ],
    },
    {
        date: "2020-08-10",
        events: [{ label: "Nicole Spencer", color: "bg-indigo-300" }],
    },
    {
        date: "2020-08-20",
        events: [
            { label: "Move-Outs", color: "bg-purple-400", count: 3 },
            { label: "Notes", color: "bg-orange-300", count: 2 },
            { label: "215 Mark Davidson", color: "bg-green-300" },
        ],
    },
    {
        date: "2020-08-25",
        events: [
            {
                label: "Follow-up Joe Williams and update on wooden floor",
                color: "bg-orange-200",
            },
        ],
    },
];

const getEventsByDate = (date) => {
    return dummyEvents.find((e) => e.date === date)?.events || [];
};

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const weekDaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const NewCalendar = () => {
    // shared month/year for both calendars
    const [currentDate, setCurrentDate] = useState(new Date(2020, 7, 1)); // Aug 2020
    const [showEventModal,setShowEventModal] = useState(false); 

    const year = currentDate.getFullYear();
    const monthIndex = currentDate.getMonth();

    const handlePrevMonth = () => {
        setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    // build main calendar grid
    const monthStart = new Date(year, monthIndex, 1);
    const monthEnd = new Date(year, monthIndex + 1, 0);
    const daysInMonth = monthEnd.getDate();

    const startDay = monthStart.getDay(); 
    const paddedStart = (startDay + 6) % 7; // convert to Mon-start
    const totalCells = paddedStart + daysInMonth;
    const rows = Math.ceil(totalCells / 7);
    const grid = [];
    let currentDay = 1;
    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < 7; c++) {
            if (r === 0 && c < paddedStart) {
                row.push(null);
            } else if (currentDay > daysInMonth) {
                row.push(null);
            } else {
                row.push(currentDay);
                currentDay++;
            }
        }
        grid.push(row);
    }

    return (
        <div className="h-[100%] w-full p-3 bg-white font-sans border-2 overflow-hidden">

            {/* TOP HEADER */}
            <div className="h-full w-[100%] border-amber-400 border-2 p-0 m-0">

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold p-0 m-0">Calendar</h1>

                    <div className="flex items-center gap-3">
                        <div className="flex border rounded-xl overflow-hidden">
                            <button className="px-4 py-2 border-r">Day</button>
                            <button className="px-4 py-2 border-r">Week</button>
                            <button className="px-4 py-2 bg-black text-white">Month</button>
                        </div>
                        <button className="!bg-red-400 text-white px-4 py-2 !rounded-xl" onClick={()=>setShowEventModal(prev=>!prev)}>
                            + Add Event
                        </button>
                    </div>
                </div>

                {/* MAIN GRID: Filters + Calendar */}
                <div className="grid grid-cols-[280px_1fr] gap-6 h-full">
                    {/* LEFT FILTER PANEL */}
                    <div className="border rounded-xl p-4 flex flex-col custom-scroll overflow-y-auto max-h-[80vh] !shadow-xl w-[100%] justify-between">

                        <div>
                            <h2 className="font-semibold text-lg mb-4">Filters</h2>
                            <div className="flex flex-col !gap-2">
                                <Filter label="Work-Orders" color="#F87171" />         {/* bg-red-400 */}
                                <Filter label="Move-Ins" color="#4ADE80" />            {/* bg-green-400 */}
                                <Filter label="Move-Outs" color="#C084FC" />           {/* bg-purple-400 */}
                                <Filter label="Notes & Reminders" color="#FDBA74" />   {/* bg-orange-300 */}

                            </div>
                        </div>

                        <MiniCalendar
                            year={year}
                            monthIndex={monthIndex}
                            onPrev={handlePrevMonth}
                            onNext={handleNextMonth}
                        />
                    </div>
                    {/* MAIN CALENDAR */}
                    <div className="border rounded-xl p-4 custom-scroll overflow-y-auto max-h-[78vh] !shadow-xl">

                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">
                                {monthNames[monthIndex]} {year}
                            </h2>

                            <div className="flex gap-2">
                                <button className="p-2 rounded-xl bg-transparent m-0  h-0 w-0" onClick={handlePrevMonth}>
                                    <IoChevronBack size={25}/>
                                </button>
                                <button className="p-2  rounded-xl bg-transparentm-0 h-0 w-0" onClick={handleNextMonth}>
                                    <IoChevronForward size={25}/>
                                </button>
                            </div>
                        </div>

                        {/* Week headers */}
                        <div className="grid grid-cols-7 text-center font-medium text-gray-600 mb-2">
                            {weekDaysShort.map((d) => (
                                <div key={d}>{d}</div>
                            ))}
                        </div>

                        {/* Calendar cells */}
                        <div className="grid grid-cols-7 gap-[1px] border bg-gray-200">
                            {grid.map((row, rIndex) =>
                                row.map((day, cIndex) => {
                                    const dateStr =
                                        day &&
                                        `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(
                                            day
                                        ).padStart(2, "0")}`;

                                    const events = day ? getEventsByDate(dateStr) : [];

                                    return (
                                        <div
                                            key={`${rIndex}-${cIndex}`}
                                            className="bg-white h-20 p-2 relative align-top"
                                        >
                                            {day && (
                                                <div className="text-sm font-semibold mb-1">{day}</div>
                                            )}

                                            <div className="space-y-1 overflow-hidden">
                                                {events.map((ev, i) => (
                                                    <div
                                                        key={i}
                                                        className={`text-xs px-1 py-[2px] rounded ${ev.color} truncate`}
                                                    >
                                                        {ev.label} {ev.count ? `(${ev.count})` : ""}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                    </div>
                </div>
            </div>
            {
                showEventModal && <EventModal onClose={()=>setShowEventModal(false)}/>
            }
        </div>
    );

};

const Filter = ({ label, color }) => (
    <div
        className="border border-white rounded px-2 py-1 flex items-center gap-2"
        style={{ backgroundColor: color }}   // card bg color
    >
        <input
            type="checkbox"
            defaultChecked
            className="custom-checkbox"
            style={{ "--check-color": color }}   // pass dynamic color
        />

        <label className="text-sm text-white">{label}</label>
    </div>
);


// Mini calendar that uses the same month/year and navigation as main calendar
const MiniCalendar = ({ year, monthIndex, onPrev, onNext }) => {
    const monthStart = new Date(year, monthIndex, 1);
    const monthEnd = new Date(year, monthIndex + 1, 0);
    const daysInMonth = monthEnd.getDate();

    const startDay = monthStart.getDay(); // 0 = Sun
    const paddedStart = (startDay + 6) % 7; // Monday-start

    const cells = [];
    for (let i = 0; i < paddedStart; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    return (
        <div className="mt-6 border  rounded-xl">
            <div className="flex items-center justify-between mb-2 p-1">
                <h4 className="text-sm font-semibold">
                    {monthNames[monthIndex]} {year}
                </h4>
                <div className="flex gap-1">
                    <button className="p-1 rounded hover:bg-gray-100 bg-transparent" onClick={onPrev}>
                        <IoChevronBack className="text-xs" />
                    </button>
                    <button className="p-1 rounded hover:bg-gray-100 bg-transparent" onClick={onNext}>
                        <IoChevronForward className="text-xs" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 text-[10px] text-center mb-1 text-gray-500 p-2">
                {weekDaysShort.map((d) => (
                    <div key={d}>{d[0]}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1 text-[11px] text-center p-2">
                {cells.map((day, i) => (
                    <div
                        key={i}
                        className={`p-1 rounded ${day === 10 && monthIndex === 7 && year === 2020
                            ? "bg-black text-white"
                            : ""
                            }`}
                    >
                        {day || ""}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewCalendar;
