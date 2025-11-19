import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaRegCalendarAlt, FaMapMarkerAlt, FaRegUser } from "react-icons/fa";
import { MdOutlineEventAvailable, MdVideoCall } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { GiProgression } from "react-icons/gi";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";

const EVENT_TYPES = [
    { label: "Video calls", icon: <MdVideoCall className="text-purple-600 text-xl" /> },
    { label: "Meetings", icon: <FaRegCalendarAlt className="text-green-600 text-xl" /> },
    { label: "Deadline", icon: <GiProgression className="text-gray-700 text-xl" /> },
    { label: "Follow-ups", icon: <FaPhoneAlt className="text-blue-600 text-xl" /> },
    { label: "Tasks", icon: <HiOutlineSparkles className="text-orange-500 text-xl" /> },
    { label: "Personal", icon: <HiOutlineSparkles className="text-pink-500 text-xl" /> },
];

const DUMMY_USERS = [
    "sai@gmail.com",
    "nithin@gmail.com",
    "rachana@gmail.com",
    "harish@gmail.com",
    "meghana@gmail.com",
];

const TIME_OPTIONS = [
    "8:00am", "8:30am", "9:00am", "9:30am", "10:00am",
    "10:30am", "11:00am", "11:30am", "12:00pm",
    "12:30pm", "1:00pm", "1:30pm", "2:00pm",
];

const EventModal = ({ onClose }) => {
    // Form states
    const [title, setTitle] = useState("");
    const [eventDate, setEventDate] = useState("Fri, Apr 25 2024");

    const [startTime, setStartTime] = useState("9:00am");
    const [endTime, setEndTime] = useState("10:00am");

    const [timeDropdown, setTimeDropdown] = useState(null);

    const [selectedType, setSelectedType] = useState(null);
    const [typeDropdown, setTypeDropdown] = useState(false);

    const [location, setLocation] = useState("");
    const [guestDropdown, setGuestDropdown] = useState(false);
    const [guests, setGuests] = useState([]);

    // When clicking save
    const handleSave = () => {
        const eventData = {
            title,
            eventDate,
            startTime,
            endTime,
            type: selectedType?.label,
            location,
            guests,
        };

        console.log("FINAL EVENT:", eventData);
        alert("Event Created!\nCheck console for full data.");
    };

    const toggleGuest = (email) => {
        if (guests.includes(email)) {
            setGuests(guests.filter((g) => g !== email));
        } else {
            setGuests([...guests, email]);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">

            {/* BACKGROUND BLUR */}
            <div className="absolute inset-0 backdrop-blur-md bg-white/20"></div>

            {/* MODAL */}
            <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 z-50">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-5">
                    <div className="flex items-center gap-2">
                        <FaRegCalendarAlt className="text-blue-600 text-2xl" />
                        <h2 className="text-2xl font-semibold">Add Event</h2>
                    </div>

                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                        <IoClose size={24} />
                    </button>
                </div>

                {/* TITLE */}
                <input
                    placeholder="Team Meeting Planner"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2.5 mb-4 text-[15px] outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* DATE + TIME */}
                <div className="flex items-start gap-3 mb-4">

                    <FaRegCalendarAlt className="text-gray-600 text-xl mt-2" />

                    <div className="flex flex-col w-full gap-2.5">

                        {/* DATE FIELD */}
                        <div className="flex items-center border rounded-lg px-3 py-2.5 justify-between text-[15px] cursor-pointer">
                            {eventDate}
                        </div>

                        {/* TIME ROW */}
                        <div className="flex gap-2.5">
                            {/* Start Time */}
                            <div
                                onClick={() =>
                                    setTimeDropdown(timeDropdown === "start" ? null : "start")
                                }
                                className="relative flex items-center border rounded-lg px-3 py-2.5 gap-2 w-1/2 text-[15px] cursor-pointer"
                            >
                                <IoMdTime className="text-gray-600 text-lg" />
                                <span>{startTime}</span>

                                {timeDropdown === "start" && (
                                    <div className="absolute left-0 right-0 top-[105%] bg-white border rounded-xl shadow-lg z-20">
                                        {TIME_OPTIONS.map((t) => (
                                            <div
                                                key={t}
                                                onClick={() => {
                                                    setStartTime(t);
                                                    setTimeDropdown(null);
                                                }}
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                                {t}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* End Time */}
                            <div
                                onClick={() =>
                                    setTimeDropdown(timeDropdown === "end" ? null : "end")
                                }
                                className="relative flex items-center border rounded-lg px-3 py-2.5 gap-2 w-1/2 text-[15px] cursor-pointer"
                            >
                                <IoMdTime className="text-gray-600 text-lg" />
                                <span>{endTime}</span>

                                {timeDropdown === "end" && (
                                    <div className="absolute left-0 right-0 top-[105%] bg-white border rounded-xl shadow-lg z-20">
                                        {TIME_OPTIONS.map((t) => (
                                            <div
                                                key={t}
                                                onClick={() => {
                                                    setEndTime(t);
                                                    setTimeDropdown(null);
                                                }}
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                                {t}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* EVENT TYPE */}
                <div className="flex items-start gap-3 mb-4">
                    <FaRegCalendarCheck className="text-gray-600 text-xl mt-2" />

                    <div className="w-full relative">
                        <div
                            onClick={() => setTypeDropdown(!typeDropdown)}
                            className="border rounded-lg px-3 py-2.5 flex items-center justify-between text-[15px] cursor-pointer"
                        >
                            <span>
                                {selectedType ? selectedType.label : "Select Type"}
                            </span>
                            <MdOutlineEventAvailable className="text-gray-500 text-xl" />
                        </div>

                        {typeDropdown && (
                            <div className="absolute left-0 right-0 bg-white border rounded-xl mt-1 shadow-lg z-20">
                                {EVENT_TYPES.map((t, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => {
                                            setSelectedType(t);
                                            setTypeDropdown(false);
                                        }}
                                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {t.icon}
                                        <span>{t.label}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* LOCATION */}
                <div className="flex items-start gap-3 mb-4">
                    <FaMapMarkerAlt className="text-gray-600 text-xl mt-2" />
                    <input
                        placeholder="Add location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2.5 text-[15px] outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* GUESTS */}
                <div className="flex items-start gap-3 mb-4 relative">
                    <FaRegUser className="text-gray-600 text-xl mt-2" />

                    <div className="w-full relative">
                        <div
                            className="border rounded-lg px-3 py-2.5 text-[15px] cursor-pointer"
                            onClick={() => setGuestDropdown(!guestDropdown)}
                        >
                            {guests.length === 0
                                ? "Add guests"
                                : guests.join(", ")}
                        </div>

                        {guestDropdown && (
                            <div className="absolute left-0 right-0 top-[105%] bg-white border rounded-xl shadow-lg z-20">
                                {DUMMY_USERS.map((email) => (
                                    <div
                                        key={email}
                                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => toggleGuest(email)}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={guests.includes(email)}
                                            readOnly
                                        />
                                        <span>{email}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* FOOTER BUTTONS */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        className="px-5 py-2 !bg-blue-600 text-white !rounded-lg hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventModal;
