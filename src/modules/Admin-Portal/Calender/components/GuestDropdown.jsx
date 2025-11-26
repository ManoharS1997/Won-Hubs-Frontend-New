import { useState, useEffect, useRef } from "react";
import { FaRegUser } from "react-icons/fa";
import { ShieldAlert } from "lucide-react";


const GuestSelector = ({ guests, setGuests }) => {
    const [input, setInput] = useState("");
    const [open, setOpen] = useState(false);
    const [emails, setEmails] = useState([]);
    const dropdownRef = useRef(null);

    // ⭐ Convert email → Name (Gmail style)
    const toDisplayName = (email) => {
        const name = email.split("@")[0];
        return name
            .replace(/\./g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());
    };

    // ⭐ Avatar color (consistent per email)
    const getAvatarColor = (text) => {
        const colors = ["#4285F4", "#DB4437", "#F4B400", "#0F9D58", "#AB47BC"];
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            hash = text.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    // ⭐ Fetch emails from DB
    useEffect(() => {
        async function fetchEmails() {
            const url = `${import.meta.env.VITE_HOSTED_API_URL}/api/get/all-emails`;
            const response = await fetch(url);
            const data = await response.json();

            const formatted = data.emails.map((email) => ({
                name: toDisplayName(email),
                email,
            }));

            // ⭐ Remove duplicates
            const unique = [
                ...new Map(formatted.map((item) => [item.email, item])).values()
            ];

            setEmails(unique);
        }
        fetchEmails();
    }, []);


    // ⭐ Add selected/typed email
    const addGuest = (email) => {
        if (!email.trim()) return;
        email = email.toLowerCase();

        const existsInDB = emails.some((e) => e.email === email);

        if (!guests.some((g) => g.email === email)) {
            if (existsInDB) {
                const found = emails.find((e) => e.email === email);
                setGuests([...guests, { ...found, isNew: false }]);
            } else {
                setGuests([...guests, { name: toDisplayName(email), email, isNew: true }]);
            }
        }
        setInput("");
        setOpen(false);
    };

    // ⭐ Remove chip
    const removeGuest = (email) => {
        setGuests(guests.filter((g) => g.email !== email));
    };

    // ⭐ Close dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (!dropdownRef.current?.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // ⭐ Filter dropdown results
    const filtered = emails.filter((u) =>
        u.email.toLowerCase().includes(input.toLowerCase()) ||
        u.name.toLowerCase().includes(input.toLowerCase())
    );

    // ⭐ Gmail-Style Chip
    const Chip = ({ name, email, isNew }) => {
        const color = getAvatarColor(email);

        const isExternal = isNew; // You can expand: || !email.endsWith("@yourdomain.com")

        return (
            <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full mb-2 mr-2 border transition 
                ${isExternal
                        ? "bg-yellow-100 border-yellow-500"
                        : "bg-white border-gray-300"
                    }
            `}
            >
                {/* Avatar / External Icon */}
                {isExternal ? (
                    <ShieldAlert className="w-5 h-5 text-yellow-700" />
                ) : (
                    <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold"
                        style={{ backgroundColor: color }}
                    >
                        {name[0]}
                    </div>
                )}

                {/* Name */}
                <span className="text-sm font-medium">
                    {name}
                </span>

                {/* Remove */}
                <button
                    onClick={() => removeGuest(email)}
                    className="text-xs font-bold text-gray-600 hover:text-black !bg-transparent"
                >
                    ✕
                </button>
            </div>
        );
    };

    // console.log(emails, "emails hereee")

    return (
        <div className="w-full" ref={dropdownRef}>
            <div className="flex items-start gap-3 mb-2">
                <FaRegUser className="text-gray-600 text-xl mt-2" />

                <div className="w-full">
                    {/* Chips */}
                    <div className="flex flex-wrap">
                        {guests.map((g) => (
                            <Chip key={g.email} name={g.name} email={g.email} isNew={g.isNew} />
                        ))}

                    </div>

                    {/* Input */}
                    <input
                        className="w-full border rounded-lg px-3 py-2.5 outline-none"
                        placeholder="Add recipients"
                        value={input}
                        onClick={() => setOpen(true)}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addGuest(input)}
                    />
                </div>
            </div>

            {/* Dropdown */}
            {open && (
                <div className="absolute bg-white border rounded-xl shadow-xl w-[calc(100%-36px)] ml-[36px] z-[999] max-h-64 overflow-y-auto">

                    {/* ❗ Gmail-style "Add email" option */}
                    {input &&
                        !emails.some((u) => u.email === input.toLowerCase()) && (
                            <div
                                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 cursor-pointer border-b"
                                onClick={() => addGuest(input)}
                            >
                                Add "{input}"
                            </div>
                        )}

                    {/* Suggestions list */}
                    {filtered.map((u) => (
                        <div
                            key={u.email}
                            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => addGuest(u.email)}
                        >
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold"
                                style={{ background: getAvatarColor(u.email) }}
                            >
                                {u.name[0]}
                            </div>

                            <div>
                                <div className="font-medium">{u.name}</div>
                                <div className="text-gray-500 text-sm">{u.email}</div>
                            </div>
                        </div>
                    ))}

                    {filtered.length === 0 && !input && (
                        <div className="text-center text-gray-500 py-2">
                            No emails available
                        </div>
                    )}

                </div>
            )}
        </div>
    );
};

export default GuestSelector;
