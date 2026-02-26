
const SaveButton = ({ isCancel = false, text, onClickFunction }) => {
    const isCancelMode = Boolean(isCancel);
    return (
        <div>
            <button
                type="button"
                title={isCancelMode ? "Cancel" : "Save"}
                className={`
          group flex items-center gap-2
          px-3 py-2
          ${isCancelMode ? "!bg-red-600 hover:!bg-red-700" : "!bg-[#08107D] hover:!bg-[#0A1499]"}
          text-white text-sm font-semibold
          !rounded-xl
          transition-all duration-300
          active:scale-95
        `} onClick={onClickFunction}
            >
                {/* Icon */}
                <span
                    className="
            flex items-center justify-center
            transition-transform duration-300
            group-hover:scale-125
          "
                >
                    {isCancelMode ? (
                        /* ❌ Cancel Icon */
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="18"
                            height="18"
                            className="
                fill-current text-white
                transition-all duration-300
                group-hover:scale-y-125
              "
                        >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
                10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17
                12 13.41 8.41 17 7 15.59 10.59 12 7 8.41
                8.41 7 12 10.59 15.59 7 17 8.41 13.41 12
                17 15.59z" />
                        </svg>
                    ) : (
                        /* ☁️ Save Icon */
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="18"
                            height="18"
                            className="
                fill-current text-white
                transition-all duration-300
                group-hover:translate-x-3
                group-hover:scale-110
              "
                        >
                            <path d="M22,15.04C22,17.23 20.24,19 18.07,19H5.93
                C3.76,19 2,17.23 2,15.04C2,13.07 3.43,11.44
                5.31,11.14C5.28,11 5.27,10.86 5.27,10.71
                C5.27,9.33 6.38,8.2 7.76,8.2C8.37,8.2
                8.94,8.43 9.37,8.8C10.14,7.05 11.13,5.44
                13.91,5.44C17.28,5.44 18.87,8.06 18.87,10.83
                C18.87,10.94 18.87,11.06 18.86,11.17
                C20.65,11.54 22,13.13 22,15.04Z" />
                        </svg>
                    )}
                </span>

                {/* Text */}
                <span
                    className="
            transition-all duration-300
            group-hover:opacity-0
            whitespace-nowrap
          "
                >
                    {text || (isCancelMode ? "Cancel" : "Save")}
                </span>
            </button>
        </div>
    );
};

export default SaveButton;
