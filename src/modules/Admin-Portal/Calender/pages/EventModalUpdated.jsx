import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaRegCalendarAlt, FaMapMarkerAlt, FaRegUser } from "react-icons/fa";
import { MdOutlineEventAvailable, MdVideoCall } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { GiProgression } from "react-icons/gi";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";
import { FaHandshake } from "react-icons/fa";
import TimePicker from "../../../../shared/UIElements/TimeInput";
import GuestSelector from "../components/GuestDropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const EVENT_TYPES = [
    { label: "Video calls", icon: <MdVideoCall className="text-purple-600 text-xl" /> },
    { label: "Meetings", icon: <FaRegCalendarAlt className="text-green-600 text-xl" /> },
    { label: "Deadline", icon: <GiProgression className="text-gray-700 text-xl" /> },
    { label: "Follow-ups", icon: <FaPhoneAlt className="text-blue-600 text-xl" /> },
    { label: "Tasks", icon: <HiOutlineSparkles className="text-orange-500 text-xl" /> },
    { label: "Personal", icon: <HiOutlineSparkles className="text-pink-500 text-xl" /> },
];


const UpdatedEventModal = ({ onClose }) => {
    const [provider, setProvider] = useState(localStorage.getItem("calendar_provider"));
    const [isConnected, setIsConnected] = useState(!!localStorage.getItem("calendar_access_token"));

    const [title, setTitle] = useState("");
    const [eventDate, setEventDate] = useState(new Date());
    const [startTime, setStartTime] = useState("9:00am");
    const [endTime, setEndTime] = useState("10:00am");
    const [timeDropdown, setTimeDropdown] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [typeDropdown, setTypeDropdown] = useState(false);
    const [location, setLocation] = useState("");
    const [guests, setGuests] = useState([]);
    const disableLocationInput = ['Video calls', 'Meetings', "Follow-ups"].includes(selectedType?.label);
    const Navigate = useNavigate()

    const connectGoogle = () => {
        localStorage.setItem("calendar_provider", "google");
        window.location.href = `${import.meta.env.VITE_HOSTED_API_URL}/auth/google`;
    };

    const connectOutlook = () => {
        localStorage.setItem("calendar_provider", "outlook");
        window.location.href = `${import.meta.env.VITE_HOSTED_API_URL}/auth/outlook`;
    };

    const connectYahoo = () => {
        localStorage.setItem("calendar_provider", "yahoo");
        window.location.href = `${import.meta.env.VITE_HOSTED_API_URL}/auth/yahoo`;
    };
    const formatDate = (date) => {
        if (!date) return "Select date";
        return format(date, "dd MMM yyyy, EEEE");
        // → 21 Dec 2026, Monday
    };

    const onEventTypeClicking = async (type) => {
        setSelectedType(type);
        setTypeDropdown(false);
        console.log("Selected Event Type: ", type);
        // if ((type.label === "Meetings") || (type.label === "Video calls")) {
        //     const url = `${import.meta.env.VITE_HOSTED_API_URL}/create-meet`;
        //     const options = {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //             Authorization: `Bearer ${Cookies.get("accessToken")}`
        //         },
        //     };
        //     try {
        //         const response = await fetch(url, options);
        //         console.log("Meet Link Response:", response);
        //         if (response.ok) {
        //             const data = await response.json();
        //             console.log("Meet Link:", data.meetLink);
        //         } else {
        //             console.error("Failed to fetch meet link");
        //         }
        //     } catch (error) {
        //         console.log ("Error fetching meet link:", error);
        //}
        // }
    };

    const handleSave = async () => {
        const eventData = {
            title,
            eventDate,
            startTime,
            endTime,
            type: selectedType?.label,
            location,
            guests,
            provider: localStorage.getItem("calendar_provider")
        };

        console.log("FINAL EVENT:", eventData);
        const url = `${import.meta.env.VITE_HOSTED_API_URL}/calendar/create-event`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("accessToken")}`
            },
            body: JSON.stringify(eventData)
        };
        try {
            const response = await fetch(url, options);
            // SUCCESS
            console.log(response, "response Hereeeeeeee")
            if (response.ok) {
                Swal.fire({
                    title: "Event Created!",
                    text: "Your event has been added.",
                    icon: "success",
                    timer: 4000,
                    showConfirmButton: false
                });
                // Close modal after alert
                setTimeout(() => {
                    onClose();
                }, 2000);
                return;
            }
            // FAILURE
            Swal.fire({
                title: "Regret!",
                text: "Event creation failed. Please try again.",
                icon: "error",
                timer: 2500,
                showConfirmButton: false,
            });
            Navigate('/newCal')
        } catch (error) {
            // NETWORK OR SERVER ERROR
            Swal.fire({
                title: "Regret!",
                text: "Something went wrong. Please check your connection and try again.",
                icon: "error",
                timer: 2500,
                showConfirmButton: false,
            });
            console.error("Error:", error);
        }
    };

    const onClickingClose = () => {

        Navigate('/newCal')
    }

    console.log(localStorage.getItem('calendar_provider') || "In Local")


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Background blur */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
            {/* Modal */}
            <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl p-6 z-50">
                {/* Header */}
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                        <FaRegCalendarAlt className="text-blue-600 text-2xl" />
                        <h2 className="text-2xl font-semibold m-0 p-0">Add Event</h2>
                    </div>
                    <button onClick={onClickingClose} className="p-1 hover:bg-gray-100 rounded-full bg-transparent">
                        <IoClose size={24} />
                    </button>
                </div>
                {/* STEP 1 — SHOW PROVIDER BUTTONS IF NOT CONNECTED */}
                <div className="w-full">
                    <div className="flex flex-row justify-center gap-10 mt-2">
                        {/* GOOGLE */}
                        <div
                            onClick={connectGoogle}
                            className="flex flex-col items-center cursor-pointer"
                        >
                            <img
                                src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png"
                                alt="Google"
                                className="w-10 h-10"
                            />
                            {/* <span className="text-sm mt-1">Google</span> */}
                        </div>
                        {/* OUTLOOK */}
                        <div
                            onClick={connectOutlook}
                            className="flex flex-col items-center cursor-pointer"
                        >
                            <img
                                src="https://res.cloudinary.com/djdct0pxu/image/upload/v1764221806/Screenshot_2025-11-27_110331-removebg-preview_n1tyuz.png"
                                alt="Outlook"
                                className="w-10 h-10"

                            />
                            {/* <span className="text-sm mt-1">Outlook</span> */}
                        </div>
                        {/* YAHOO */}
                        <div
                            onClick={connectYahoo}
                            className="flex flex-col items-center cursor-pointer"
                        >
                            <img
                                src="https://res.cloudinary.com/djdct0pxu/image/upload/v1764221878/Screenshot_2025-11-27_110441-removebg-preview_jqqayd.png"
                                alt="Yahoo"
                                className="w-10 h-10"
                            />

                            {/* <span className="text-sm mt-1">Yahoo</span> */}
                        </div>
                    </div>

                    <div className="mt-6">
                        {/* HEADER */}
                        {/* TITLE */}
                        <div className="flex items-start gap-3 ">
                            <FaHandshake className="text-gray-600 text-xl mt-2" size={25} />
                            <input
                                placeholder="Team Meeting Planner"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full border rounded-lg px-3 py-2.5 mb-4 text-[15px] outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {/* DATE + TIME */}
                        <div className="flex items-start gap-3 mb-4">
                            <FaRegCalendarAlt className="text-gray-600 text-xl mt-2" />
                            <div className="flex flex-col w-full gap-2.5">
                                {/* DATE FIELD */}
                                <div className="flex items-center border rounded-lg px-3 py-2.5 justify-between text-[15px] cursor-pointer">
                                    {/* Display selected date */}
                                    <span>{formatDate(eventDate)}</span>
                                    {/* Small calendar icon */}
                                    <DatePicker
                                        selected={eventDate}
                                        onChange={(date) => setEventDate(date)}
                                        dateFormat="dd MMM yyyy"
                                        customInput={
                                            <FaRegCalendarAlt className="text-gray-600 text-xl cursor-pointer" />
                                        }
                                        popperPlacement="bottom-start"
                                    />
                                </div>
                                {/* TIME ROW */}
                                <div className="flex gap-2.5">

                                    {/* START TIME */}
                                    <div className="w-1/2">
                                        <TimePicker value={startTime} onChange={setStartTime} />
                                    </div>

                                    {/* END TIME */}
                                    <div className="w-1/2">
                                        <TimePicker value={endTime} onChange={setEndTime} />
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

                                                    onEventTypeClicking(t);
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
                        <div className={`flex items-start gap-3 mb-4 ${disableLocationInput ? "opacity-50 pointer-events-none" : ""}`}>
                            <FaMapMarkerAlt className="text-gray-600 text-xl mt-2" />
                            <input
                                placeholder="Add location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full border rounded-lg px-3 py-2.5 text-[15px] outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {/* <AddLocations location={location} setLocation={setLocation} /> */}
                        </div>
                        {/* GUESTS */}
                        <div className="flex items-start gap-3 mb-4 relative">
                            <GuestSelector guests={guests} setGuests={setGuests} />
                        </div>

                        {/* FOOTER BUTTONS */}
                        <div className="flex justify-end gap-3 mt-6">


                            <button
                                onClick={handleSave}
                                className="px-5 py-2 !bg-blue-600 text-white !rounded-lg hover:bg-blue-700"
                            >
                                Save
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );

};

export default UpdatedEventModal;