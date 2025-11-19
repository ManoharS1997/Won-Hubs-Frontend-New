import { useState } from "react";
import PropTypes from "prop-types";

const EmailModel = ({ open, onClose, onSelect }) => {
    const [email, setEmail] = useState("");

    if (!open) return null;

    const handleSend = () => {
        console.log("User entered email:", email);
        if (onSelect) {
            onSelect(email);  // <-- return email to parent
        }

        onClose(); // <-- close modal after sending email

    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-xl w-80 relative">

                {/* Top Right X */}
                <button
                    className="absolute top-3 right-3 text-gray-700 font-bold text-sm"
                    onClick={onClose}
                >
                    X
                </button>

                <p className="text-sm font-semibold m-1">
                    Enter Email Here
                </p>

                <input
                    type="email"
                    className="w-full border rounded-md px-3 py-2 mb-4
                               focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* OK Button Positioned Bottom-Right */}
                <div className="flex justify-end">
                    <button
                        className="!bg-blue-600 text-white text-xs px-3 py-1 !rounded-md"
                        onClick={handleSend}
                    >
                        Send
                    </button>
                </div>

            </div>
        </div>
    );
};

EmailModel.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default EmailModel;
