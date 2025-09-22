import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const AppModal = ({ isOpen, onClose, appData }) => {
    const Navigate = useNavigate()
    // Close on escape key press
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl gap-2 flex flex-col text-center"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                    >
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
                        >
                            <X size={24} />
                        </button>
                        <div className="w-full h-[15rem] flex items-center justify-center">
                            <img
                                src={appData.logo}
                                alt="app-logo"
                                className="w-full h-fit max-h-full"
                            />
                        </div>
                        <h2 className="mb-0 text-2xl text-center font-semibold">{appData?.name}</h2>
                        <p className="text-gray-600">{appData?.description}</p>
                        <p className="font-bold text-xl text-center">Connections: {appData.connections || 0}</p>
                        <div className="w-full flex items-center justify-center gap-4">
                            <button
                                type="button"
                                onClick={() => Navigate(`/new/connection/rest/${appData.name}/${appData.type}`)}
                                className="border px-4 py-1 !rounded-[50px] hover:!border-[var(--primary-color)]"
                            >
                                REST
                            </button>
                            <button
                                type="button"
                                onClick={() => Navigate(`/new/connection/soap/${appData.name}/${appData.name}/${appData.type}`)}
                                className="border px-4 py-1 !rounded-[50px] hover:!border-[var(--primary-color)]"
                            >
                                SOAP
                            </button>
                            <button
                                type="button"
                                onClick={() => Navigate(`/new/connection/hub/${appData.name}/${appData.type}`)}
                                className="border px-4 py-1 !rounded-[50px] hover:!border-[var(--primary-color)]"
                            >
                                Integration Hub
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AppModal;
