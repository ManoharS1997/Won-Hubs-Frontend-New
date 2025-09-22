import React from "react";

const WONLoader = ({ size = "100px", color = "#007bff", opacity = 0.2 }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black-1000 z-10"
      style={{ backgroundColor: `rgba(0, 0, 0, ${opacity})` }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <div
          className="absolute animate-ping rounded-full"
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            opacity: 0.5,
          }}
        ></div>
        <div
          className="animate-spin rounded-full border-4 border-solid"
          style={{
            width: `calc(${size} / 2)`,
            height: `calc(${size} / 2)`,
            borderColor: `var(--primary-color) white white `,
            borderWidth: "4px",
          }}
        ></div>
      </div>
    </div>
  );
};

export default WONLoader;
