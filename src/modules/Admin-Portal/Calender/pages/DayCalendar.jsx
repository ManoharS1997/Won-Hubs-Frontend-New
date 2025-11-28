
import { useState } from "react";
import renderIcons from "../../../../shared/functions/renderIcons";

// Convert 09:00am -> 09:00
const normalizeTime = (t) => {
    if (!t) return "00:00";
    t = t.replace(/am/i, " AM").replace(/pm/i, " PM").trim();

    let [time, modifier] = t.split(" ");
    let [h, m] = time.split(":");

    h = parseInt(h);

    if (modifier === "PM" && h !== 12) h += 12;
    if (modifier === "AM" && h === 12) h = 0;

    return `${String(h).padStart(2, "0")}:${m}`;
};

// *** FIX: Convert month-format events -> flat daily events
const normalizeDayEvents = (rawEvents, today) => {
    let final = [];

    rawEvents.forEach((d) => {
        if (d.date !== today) return;

        d.events.forEach((ev) => {
            final.push({
                id: ev.id,
                date: d.date,
                label: ev.label,
                color: ev.color,
                full_event: ev.full_event,
                start24: normalizeTime(ev.full_event?.from_time),
                end24: normalizeTime(ev.full_event?.to_time)
            });
        });
    });

    return final;
};

const DayView = ({ currentDate, events, setSelectedEvent, setPopupPos, onPrevDay, onNextDay, onToday }) => {

    const hours = [...Array(24)].map((_, i) => i);

    const todayStr = currentDate.toISOString().split("T")[0];

    // *** Use the NEW NORMALIZATION ***
    const dayEvents = normalizeDayEvents(events, todayStr);
    console.log(dayEvents, "Day Events PARSED Correctly");

    // Month & weekday formatting
    const weekNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const weekday = weekNames[currentDate.getDay()];
    const monthName = monthNames[currentDate.getMonth()];
    const dateNum = currentDate.getDate();

    return (
        <div className="w-full">

            {/* Google-like header */}
            <div className="flex items-center justify-between bg-white px-4 py-3 border-b border-gray-300">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-500">{monthName}</span>
                        <span className="text-4xl font-bold text-[#0b1a7d]">{dateNum}</span>
                        <span className="text-sm font-semibold text-gray-600">{weekday}</span>
                    </div>

                    <div className="flex gap-1">
                        <button onClick={onPrevDay} className="hover:bg-gray-200 rounded-full p-1">
                            {renderIcons("IoChevronBack", 22, "#0b1a7d")}
                        </button>
                        <button onClick={onNextDay} className="hover:bg-gray-200 rounded-full p-1">
                            {renderIcons("IoChevronForward", 22, "#0b1a7d")}
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-[60px_1fr] relative">

                {/* Hour labels */}
                <div className="flex flex-col">
                    {hours.map((h) => (
                        <div key={h} className="h-20 text-[11px] text-gray-500 flex items-start pt-2 pl-1">
                            {h === 0 ? "12 AM" :
                                h < 12 ? `${h} AM` :
                                    h === 12 ? "12 PM" :
                                        `${h - 12} PM`}
                        </div>
                    ))}
                </div>

                {/* Hours Grid */}
                <div className="relative border-l border-gray-200">
                    {hours.map((h) => (
                        <div
                            key={h}
                            className="h-20 border-b border-gray-200 hover:bg-blue-50 transition-colors"
                        ></div>
                    ))}

                    {/* Events Rendering */}
                    {dayEvents.map((ev) => {
                        const startHour = parseInt(ev.start24.split(":")[0]);
                        const endHour = parseInt(ev.end24.split(":")[0]);

                        return (
                            <div
                                key={ev.id}
                                className="absolute rounded text-white p-2 text-xs shadow-md cursor-pointer"
                                style={{
                                    backgroundColor: ev.color,
                                    top: startHour * 80 + 4,
                                    height: (endHour - startHour) * 80 - 8,
                                    left: 10,
                                    right: 10,
                                }}
                                onClick={(e) => {
                                    const rect = e.target.getBoundingClientRect();
                                    setPopupPos({ x: rect.right + 10, y: rect.top });
                                    setSelectedEvent(ev);
                                }}
                            >
                                <div className="font-semibold">{ev.label}</div>
                                <div className="text-[10px] opacity-80">
                                    {ev.full_event?.from_time} - {ev.full_event?.to_time}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
};

export default DayView;
