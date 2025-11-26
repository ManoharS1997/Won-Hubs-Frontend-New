import React from "react";
// import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { FaMapMarkerAlt } from "react-icons/fa";

const LocationPicker = ({ value, onChange }) => {
    return (
        <div className="flex items-start gap-3 mb-4 relative">
            {/* Left Icon */}
            <FaMapMarkerAlt className="text-gray-600 text-xl mt-2" />

            <div className="flex-1">
                {/* <GooglePlacesAutocomplete
                    apiKey="YOUR_API_KEY"
                    selectProps={{
                        value,
                        onChange,
                        placeholder: "Search location...",
                        className: "text-[15px]",
                        styles: {
                            control: (provided) => ({
                                ...provided,
                                padding: "4px 6px",
                                borderRadius: "10px",
                                borderColor: "#d1d5db",
                                boxShadow: "none",
                                "&:hover": { borderColor: "#3b82f6" },
                            }),
                            menu: (provided) => ({
                                ...provided,
                                zIndex: 50,
                                borderRadius: "10px",
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                padding: "10px",
                                backgroundColor: state.isFocused ? "#f3f4f6" : "white",
                                color: "black",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }),
                        },
                    }}
                /> */}
            </div>
        </div>
    );
};

export default LocationPicker;
