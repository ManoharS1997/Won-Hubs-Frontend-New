import React from "react";
import Select from "react-select";
import renderIcons from "../functions/renderIcons";


const iconColors = [
    "#FF6B6B",
    "#4ECDC4",
    "#556EE6",
    "#FFA502",
    "#2ED573",
    "#A55EEA",
    "#1E90FF",
    "#FF7F50",
];

function getRandomColor() {
    return iconColors[Math.floor(Math.random() * iconColors.length)];
}
const options = [
    { label: "Pie Chart", value: "pie", icon: "MdPieChart", color: getRandomColor() },
    { label: "Bar Chart", value: "bar", icon: "BiBarChart", color: getRandomColor() },
    { label: "Line Chart", value: "line", icon: "AiOutlineLineChart", color: getRandomColor() },
    { label: "Area Chart", value: "area", icon: "MdAreaChart", color: getRandomColor() },
    { label: "Doughnut Chart", value: "doughnut", icon: "RiDonutChartFill", color: getRandomColor() },
    { label: "Scatter Plot", value: "scatter", icon: "BiScatterChart", color: getRandomColor() },
    { label: "Radar Chart", value: "radar", icon: "MdRadar", color: getRandomColor() },
    { label: "Gauge Chart", value: "gauge", icon: "TbGauge", color: getRandomColor() },
    { label: "Heatmap", value: "heatmap", icon: "MdGridOn", color: getRandomColor() },
    { label: "Bubble Chart", value: "bubble", icon: "TbCircles", color: getRandomColor() },
    { label: "Tree Map", value: "treemap", icon: "FaSitemap", color: getRandomColor() },
    { label: "Box Plot", value: "boxplot", icon: "FaBox", color: getRandomColor() },
    { label: "Waterfall Chart", value: "waterfall", icon: "MdBarChart", color: getRandomColor() },
];



// 👇 Custom option renderer for react-select
const IconOption = (props) => {
    return (
        <div
            {...props.innerProps}
            className={`flex items-center gap-4 px-3 py-2 cursor-pointer 
          ${props.isFocused ? "bg-gray-100" : "bg-white"}`}
        >
            {console.log(props.data.color,"Color Here")}
            <span className="text-lg">{renderIcons(props.data.icon, 25, props.data.color)}</span>
            <span className="text-sm">{props.data.label}</span>
        </div>
    );
};

const customStyles = {
    container: (base) => ({
        ...base,
        width: "100%",
        border: 1
    }),

    control: (base, state) => ({
        ...base,
        backgroundColor: "white",
        borderColor: state.isFocused ? "#07315e" : "#ddd",
        boxShadow: state.isFocused
            ? "0 0 25px rgba(0, 123, 255, 0.2)"   // focus glow
            : "0 1px 4px rgba(0, 0, 0, 0.3)",     // default shadow

        padding: "2px",
        transition: "all 0.2s ease",
        border: 2,

        "&:hover": {
            borderColor: "#052b69",
            boxShadow: !state.isFocused
                ? "0 2px 6px rgba(0, 123, 255, 0.25)" // hover shadow
                : "0 0 8px rgba(0, 123, 255, 0.8)",
        },
    }),

    menu: (base) => ({
        ...base,
        width: "100%",
        backgroundColor: "white",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
        borderRadius: "8px",
        overflow: "hidden",
    }),

    // ✅ Your requested OPTION STYLING added here
    option: (base, { isSelected, isFocused }) => ({
        ...base,
        backgroundColor: isSelected
            ? "#007bff"
            : isFocused
                ? "#f0f0f0"
                : "white",
        color: isSelected ? "white" : "black",
        padding: "14px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",

        "&:hover": {
            backgroundColor: "#007bff",
            color: "white",
        },
    }),
};


export default function SelectWithIcon() {
    return (
        <div className="w-full flex flex-col gap-1">
            <div className="flex">
                <label>Graph Type</label>
                <span>{renderIcons('FaStarOfLife', 5, '#ff0000')}</span>
            </div>
            <Select
                options={options}
                styles={customStyles}
                placeholder="Select..."
                components={{
                    Option: IconOption,  // 👈 custom option with icons
                }}
            />
        </div>
    );
}
