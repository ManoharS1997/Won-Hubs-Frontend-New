import { useState, useEffect } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useRef } from "react";
import renderIcons from "../../../../shared/functions/renderIcons";
import { useNavigate } from "react-router-dom";
import WeekView from "./WeekCalendar";
import DayView from "./DayCalendar";
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
    const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1)); // Nov 2025
    // const [showEventModal, setShowEventModal] = useState(false);
    const [calendarEvents, setCalendarEvents] = useState(dummyEvents);
    const [calenderType, setCalenderType] = useState('month')// fetched events
    const year = currentDate.getFullYear();
    const monthIndex = currentDate.getMonth();
    //hovering states in the calendar
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
    const popupRef = useRef(null);// to popup
    const Navigate = useNavigate();
    const calendarRef = useRef(null);

    // to diaplay events
    const handlePrevMonth = () => {
        setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };
    const handleNextMonth = () => {
        setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };
    const handlePrevWeek = () => {
        setCurrentDate(prev => {
            const d = new Date(prev);
            d.setDate(d.getDate() - 7);
            return d;
        });
    };

    const handleNextWeek = () => {
        setCurrentDate(prev => {
            const d = new Date(prev);
            d.setDate(d.getDate() + 7);
            return d;
        });
    };

    const handleToday = () => {
        setCurrentDate(new Date());
    };
    const handlePrevDay = () => {
        setCurrentDate(prev => {
            const d = new Date(prev);
            d.setDate(d.getDate() - 1);
            return d;
        });
    };

    const handleNextDay = () => {
        setCurrentDate(prev => {
            const d = new Date(prev);
            d.setDate(d.getDate() + 1);
            return d;
        });
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
    const getEventsByDate = (date) => {
        return calendarEvents.find((e) => e.date === date)?.events || [];
    };
    const getEventsForDisplayingMonth = async () => {
        try {
            const Month = 11;
            const Year = 2025;

            const url = `${import.meta.env.VITE_HOSTED_API_URL}/calendar/${Month}/${Year}`;

            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const response = await fetch(url, options);

            if (response.status !== 200) {
                console.log("Error in fetching month data");
                return;
            }

            const result = await response.json();

            const { data } = result;

            console.log(data, "data hereb ")

            setCalendarEvents(data);
        } catch (error) {
            console.log("Error fetching events:", error);
        }
    };
    // get calendar events
    useEffect(() => {
        getEventsForDisplayingMonth()
    }, []);

    useEffect(() => {
        function handleClickOutside(e) {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                setSelectedEvent(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    // console.log(calendarEvents, "Events herer")
    useEffect(() => {
        const reopen = localStorage.getItem("open_event_modal_after_google");
        // If user came from Google OAuth callback
        const urlParams = new URLSearchParams(window.location.search);
        const googleSuccess = urlParams.get("google_auth");

        if (googleSuccess === "success" && reopen === "true") {
            setShowEventModal(true);
            localStorage.removeItem("open_event_modal_after_google");
        }
    }, []);

    const onAddEventClick = () => {
        Navigate('/eventUpdate', { replace: true });
    };
    const DeleteEvent = async (id) => {
        // Implement delete functionality here
        console.log(id, "Deleting event...");
        const url = `${import.meta.env.VITE_HOSTED_API_URL}/calendar/cancel-event/${id}`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(url, options);
        console.log(response, "response For cancelling event");

        if (response.status !== 200) {
            console.log("Error in deleting event");
            return;
        }
        getEventsForDisplayingMonth();
    }
    const RescheduleEvent = async (id) => {
        console.log(id, "Reschedule event...");
        const url = `${import.meta.env.VITE_HOSTED_API_URL}/calendar/reschedule-event/${id}`;
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                // "authorization": `Bearer ${Cookies.get("Access_Token")}`
            },
        };
        const response = await fetch(url, options);
        console.log(response, "response For cancelling event");

        if (response.status !== 200) {
            console.log("Error in deleting event");
            return;
        }
        getEventsForDisplayingMonth();
    }

    return (
        <div className="h-[100%] w-full p-3 bg-white font-sans  overflow-hidden">
            {/* TOP HEADER */}
            <div className="h-full w-[100%] border-amber-400 border-2 p-0 m-0">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold p-0 m-0">Calendar</h1>
                    <div className="flex items-center gap-3">
                        <div className="flex border rounded-xl overflow-hidden">
                            <button
                                className={`px-4 py-2 border-r ${calenderType === 'day' ? "bg-black text-white" : "bg-white"}`}
                                onClick={() => setCalenderType('day')}
                            >
                                Day
                            </button>
                            <button
                                className={`px-4 py-2 border-r ${calenderType === 'week' ? "bg-black text-white" : "bg-white"}`}
                                onClick={() => setCalenderType('week')}
                            >
                                Week
                            </button>
                            <button
                                className={`px-4 py-2 ${calenderType === 'month' ? "bg-black text-white" : "bg-white"}`}
                                onClick={() => setCalenderType('month')}
                            >
                                Month
                            </button>
                        </div>


                        <button
                            onClick={onAddEventClick}
                            className="!bg-blue-900 text-white px-4 py-2 !rounded-xl"
                        >
                            + Add Event
                        </button>
                    </div>
                </div>
                {/* MAIN GRID: Filters + Calendar */}
                <div className="grid grid-cols-[280px_1fr] gap-6 h-full">
                    {/* LEFT FILTER PANEL */}
                    <div className="border rounded-xl px-3 flex flex-col custom-scroll overflow-y-auto max-h-[80vh] !shadow-xl w-[100%] justify-between py-2">
                        <div>
                            <h4 className="font-semibold text-xl p-0 mb-2">Filters</h4>
                            <div className="flex flex-col !gap-2">
                                <Filter label="Meetings" color="#F87171" />         {/* red-400 */}
                                <Filter label="Video calls" color="#4ADE80" />      {/* green-400 */}
                                <Filter label="Tasks" color="#C084FC" />            {/* purple-400 */}
                                <Filter label="Deadlines" color="#FDBA74" />        {/* orange-300 */}
                                <Filter label="Followups" color="#60A5FA" />        {/* blue-400 */}
                                <Filter label="Personal" color="#F472B6" />         {/* pink-400 */}
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
                    <div className="border rounded-xl p-4 custom-scroll overflow-y-auto max-h-[78vh] !shadow-xl" ref={calendarRef} >
                        {calenderType === 'month' &&
                            <>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold">
                                        {monthNames[monthIndex]} {year}
                                    </h2>
                                    <div className="flex gap-2">
                                        <button className="p-2 rounded-xl bg-transparent m-0  h-0 w-0" onClick={handlePrevMonth}>
                                            <IoChevronBack size={25} />
                                        </button>
                                        <button className="p-2  rounded-xl bg-transparentm-0 h-0 w-0" onClick={handleNextMonth}>
                                            <IoChevronForward size={25} />
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
                                                    className="bg-white h-20 p-2 relative"
                                                >
                                                    {day && (
                                                        <div className="text-sm font-semibold mb-1">{day}</div>
                                                    )}

                                                    <div className="space-y-1 overflow-hidden">
                                                        {events.map((ev, i) => (
                                                            <div
                                                                key={i}
                                                                className={`text-xs px-1 py-[2px] rounded truncate !text-white cursor-pointer`}
                                                                style={{ backgroundColor: ev.color }}
                                                                onClick={(e) => {
                                                                    const rect = e.target.getBoundingClientRect();
                                                                    const container = calendarRef.current.getBoundingClientRect();
                                                                    const popupWidth = 220;
                                                                    const popupHeight = 120;
                                                                    let x = rect.right + 10;
                                                                    let y = rect.top + window.scrollY;
                                                                    // If popup goes outside RIGHT → move LEFT
                                                                    if (x + popupWidth > container.right) {
                                                                        x = rect.left - popupWidth - 10;
                                                                    }
                                                                    // If popup goes outside TOP → push down
                                                                    if (y < container.top) {
                                                                        y = container.top + 10;
                                                                    }
                                                                    // If popup goes outside BOTTOM → shift up
                                                                    const viewportBottom = window.innerHeight + window.scrollY;
                                                                    if (y + popupHeight > viewportBottom) {
                                                                        y = viewportBottom - popupHeight - 10;
                                                                    }
                                                                    setPopupPos({ x, y });
                                                                    setSelectedEvent(ev);
                                                                }}

                                                            >
                                                                {ev.label}
                                                            </div>

                                                        ))}
                                                    </div>

                                                </div>
                                            );
                                        })
                                    )}
                                    {selectedEvent && (
                                        <div
                                            ref={popupRef}
                                            className="fixed z-[9999] bg-white border shadow-xl rounded-xl p-4 animate-fadeIn transition-all"
                                            style={{
                                                top: popupPos.y,
                                                left: popupPos.x,
                                                width: "220px",
                                                maxWidth: "calc(100vw - 40px)"
                                            }}
                                        >
                                            {/* Title */}
                                            <div className="font-semibold text-blue-600 text-sm mb-1">
                                                {selectedEvent.label}
                                            </div>

                                            {/* Time */}
                                            <div className="text-xs text-gray-500 mb-3">
                                                {selectedEvent.time || "No Time"}
                                            </div>

                                            {/* ACTION BUTTONS */}
                                            <div className="flex justify-end gap-1">

                                                {/* Reschedule Icon Button */}
                                                <button
                                                    onClick={() => RescheduleEvent(selectedEvent.id)}
                                                    className="w-10 h-10  flex items-center justify-center 
                   bg-purple-50 border
                   hover:bg-purple-100 transition-all shadow-sm rounded"
                                                >
                                                    {renderIcons("FaClockRotateLeft", 20, "#7C3AED")}
                                                </button>

                                                {/* Delete Icon Button (settings icon style) */}
                                                <button
                                                    onClick={() => DeleteEvent(selectedEvent.id)}
                                                    className="w-10 h-10  flex items-center justify-center bg-transparent rounded
                  border border-[#F87171]
                   hover:bg-blue-100 transition-all shadow-sm"
                                                >

                                                    {renderIcons("MdFreeCancellation", 20, "#F87171")}
                                                </button>

                                            </div>

                                        </div>
                                    )}


                                </div>
                            </>
                        }
                        {calenderType === 'week' && <WeekView
                            currentDate={currentDate}
                            events={calendarEvents}
                            setSelectedEvent={setSelectedEvent}
                            setPopupPos={setPopupPos}
                            onPrevWeek={handlePrevWeek}
                            onNextWeek={handleNextWeek}
                            onToday={handleToday}
                        />}
                        {calenderType === "day" && <DayView
                            currentDate={currentDate}
                            events={calendarEvents}
                            setSelectedEvent={setSelectedEvent}
                            setPopupPos={setPopupPos}
                            onPrevDay={handlePrevDay}
                            onNextDay={handleNextDay}
                            onToday={handleToday}
                        />}
                    </div>
                </div>
            </div>
            {/* {
                showEventModal && <EventModal onClose={() => setShowEventModal(false)} />
            } */}
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
    const paddedStart = (startDay + 6) % 7;
    const today = new Date();
    const isCurrentMonth =
        today.getFullYear() === year && today.getMonth() === monthIndex;
    const todaysDate = today.getDate();
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


            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1 text-[11px] text-center p-2">
                {cells.map((day, i) => {
                    const isToday = isCurrentMonth && day === todaysDate;

                    return (
                        <div
                            key={i}
                            className={`p-1 rounded cursor-pointer transition
                                ${isToday ? "!bg-sky-500 text-white font-bold !rounded-full" : "text-gray-800"}
                                ${day ? "hover:bg-blue-100" : ""}
                            `}
                        >
                            {day || ""}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NewCalendar;
