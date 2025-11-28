import { useState } from "react";
import renderIcons from "../../../../shared/functions/renderIcons";

// FIXED: Convert "09:00am", "1:00 PM", etc.
const convertTo24 = (str) => {
    if (!str) return "00:00";

    str = str.replace(/am/i, " AM").replace(/pm/i, " PM").trim();
    let [time, modifier] = str.split(" ");
    let [h, m] = time.split(":");

    h = parseInt(h);

    if (modifier === "PM" && h !== 12) h += 12;
    if (modifier === "AM" && h === 12) h = 0;

    return `${String(h).padStart(2, "0")}:${m}`;
};

// Normalize backend format → usable events
const normalizeEvents = (rawEvents) => {
    let final = [];

    rawEvents.forEach((d) => {
        d.events.forEach((ev) => {
            final.push({
                id: ev.id,
                date: d.date,
                label: ev.label,
                color: ev.color,
                start: convertTo24(ev.full_event.from_time),
                end: convertTo24(ev.full_event.to_time),
                full_event: ev.full_event,
            });
        });
    });

    return final;
};

const WeekView = ({
    currentDate,
    events,
    setSelectedEvent,
    setPopupPos,
    onPrevWeek,
    onNextWeek,
    onToday
}) => {

    const flatEvents = normalizeEvents(events);

    // HOVER POPUP STATE
    const [hoverEvent, setHoverEvent] = useState(null);
    const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });

    // WEEK CALCULATION
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - (day === 0 ? 6 : day - 1));

    const weekDays = [...Array(7)].map((_, i) => {
        const d = new Date(startOfWeek);
        d.setDate(d.getDate() + i);
        return d;
    });

    const hours = [...Array(24)].map((_, i) => i);

    // Month Title
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const firstMonth = monthNames[weekDays[0].getMonth()];
    const lastMonth = monthNames[weekDays[6].getMonth()];
    const year = weekDays[0].getFullYear();

    const monthTitle = firstMonth === lastMonth
        ? `${firstMonth} ${year}`
        : `${firstMonth} – ${lastMonth} ${year}`;

    return (
        <div className="w-full">

            {/* HEADER */}
            <div className="flex justify-between bg-white px-4 py-2">
                <p className="text-xl font-semibold">{monthTitle}</p>

                <div className="flex gap-2">
                    <button onClick={onPrevWeek} className="hover:bg-gray-200 rounded-full p-2">
                        {renderIcons("IoChevronBack")}
                    </button>
                    <button onClick={onNextWeek} className="hover:bg-gray-200 rounded-full p-2">
                        {renderIcons("IoChevronForward")}
                    </button>
                </div>
            </div>

            {/* WEEK HEADER */}
            <div className="grid grid-cols-[60px_1fr] border-b border-gray-300 bg-white">
                <div></div>

                <div className="grid grid-cols-7 text-center py-2 font-medium text-gray-600">
                    {weekDays.map((d, idx) => (
                        <div key={idx}>
                            <div className="uppercase text-xs">
                                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()]}
                            </div>
                            <div className="text-lg font-semibold">{d.getDate()}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-[60px_1fr] relative">

                {/* HOURS LEFT */}
                <div className="flex flex-col">
                    {hours.map((h) => (
                        <div key={h} className="h-20 text-[11px] text-gray-500 px-1">
                            {h === 0 ? "12 AM" :
                                h < 12 ? `${h} AM` :
                                    h === 12 ? "12 PM" :
                                        `${h - 12} PM`}
                        </div>
                    ))}
                </div>

                {/* GRID */}
                <div className="grid grid-cols-7 border-l border-gray-200 relative bg-white">

                    {weekDays.map((date, colIndex) => (
                        <div key={colIndex} className="border-r border-gray-200 relative">
                            {hours.map((h) => (
                                <div
                                    key={h}
                                    className="h-20 border-b border-gray-200 hover:bg-blue-50 transition-colors"
                                ></div>
                            ))}
                        </div>
                    ))}

                    {/* EVENTS WITH HOVER */}
                    {flatEvents.map((ev) => {
                        const eventDate = new Date(ev.date);
                        const index = weekDays.findIndex(
                            (d) => d.toDateString() === eventDate.toDateString()
                        );

                        if (index === -1) return null;

                        const startHour = parseInt(ev.start.split(":")[0]);
                        const endHour = parseInt(ev.end.split(":")[0]);

                        return (
                            <div
                                key={ev.id}
                                className="absolute rounded p-2 text-xs text-white shadow-md cursor-pointer"
                                style={{
                                    backgroundColor: ev.color || "#ccc",
                                    top: startHour * 80 + 4,
                                    height: (endHour - startHour) * 80 - 8,
                                    left: `calc(${index} * (100% / 7))`,
                                    width: `calc(100% / 7 - 6px)`,
                                }}

                                onMouseEnter={(e) => {
                                    console.log("HoverEvent Triggered")
                                    const rect = e.target.getBoundingClientRect();
                                    setHoverPos({ x: rect.right + 8, y: rect.top });
                                    setHoverEvent(ev);
                                }}

                                onMouseLeave={() => setHoverEvent(null)}

                                onClick={(e) => {
                                    const rect = e.target.getBoundingClientRect();
                                    setPopupPos({ x: rect.right + 10, y: rect.top });
                                    setSelectedEvent(ev);
                                }}
                            >
                                {ev.label}
                            </div>
                        );
                    })}

                    {/* HOVER POPUP WITH ANIMATION */}
                    {hoverEvent && (
                        // <div
                        //     className="fixed bg-white shadow-xl border rounded-lg p-3 text-sm z-[9999] w-[220px]
                        //                animate-fadeIn scale-95 opacity-0 
                        //                animation-fill-forwards border-red"
                        //     style={{
                        //         top: hoverPos.y,
                        //         left: hoverPos.x,
                        //     }}
                        // >
                        <div className='border-2'>
                            <p className="font-semibold text-gray-800 mb-1">{hoverEvent.label}</p>

                            <p className="text-gray-600 text-xs">
                                <b>From: </b> {hoverEvent.full_event.from_time}
                            </p>

                            <p className="text-gray-600 text-xs">
                                <b>To: </b> {hoverEvent.full_event.to_time}
                            </p>

                            {hoverEvent.full_event.location && (
                                <p className="text-gray-600 text-xs mt-1">
                                    <b>Location:</b> {hoverEvent.full_event.location}
                                </p>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default WeekView;
