import React, { useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { ArrowUpRight } from "lucide-react"; // Blue top-right arrow icon

const PreviewReport = () => {
    const [showModal, setShowModal] = useState(false);

    // Dummy data for pie chart
    const pieData = [
        { name: "Cardiology", value: 400 },
        { name: "Neurology", value: 300 },
        { name: "Orthopedics", value: 300 },
        { name: "Pediatrics", value: 200 },
    ];

    const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f"];

    // Dummy data for table
    const tableData = [
        { department: "Cardiology", patients: 40, revenue: "$15,000" },
        { department: "Neurology", patients: 25, revenue: "$12,500" },
        { department: "Orthopedics", patients: 30, revenue: "$18,000" },
        { department: "Pediatrics", patients: 20, revenue: "$10,000" },
    ];

    return (
        <div className="h-[78vh] w-[100%] bg-white flex justify-center items-center max-h-[80vh]">
            <div className="flex flex-col items-center gap-2 h-full w-full p-4 rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-auto">

                {/* Top buttons */}
                <div className="flex gap-2 items-end justify-end p-0 m-0 min-h-[3vh] w-full">
                    <button className="float-right px-4 py-2 bg-[#150363] hover:bg-blue-700 text-white rounded-lg ml-8">
                        Create
                    </button>
                    <button className="float-right px-4 py-2 bg-[#150363] hover:bg-blue-700 text-white rounded-lg">
                        Cancel
                    </button>
                </div>

                {/* Pie Chart Section */}
                <div className="w-full flex flex-col items-center justify-center bg-gray-50 rounded-xl border max-h-[65%] pl-3 pb-2 relative">
                    <h3 className="text-[15px] font-semibold text-gray-600 self-start">
                        Department Distribution
                    </h3>

                    {/* Blue top-right arrow */}


                    <div className="w-full h-[300px] m-0 p-0">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                {/* Table Section */}
                <div className="w-full bg-gray-50 rounded-xl shadow-md p-4 overflow-x-auto max-h-[70%] relative">
                    <div className="flex items-center mb-3">
                        <h3 className="text-md font-semibold text-gray-700 flex items-center m-0">
                            Summary Table
                            <button
                                onClick={() => setShowModal(true)}
                                className="ml-1 text-blue-600 hover:text-blue-800 transition transform -translate-y-1"
                                title="Expand Table"
                            >
                                <ArrowUpRight size={16} />
                            </button>
                        </h3>
                    </div>


                    <table className="min-w-full text-sm text-gray-800 border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900 uppercase text-xs font-semibold tracking-wide">
                            <tr>
                                <th className="px-4 py-3 text-left border-b border-blue-200">Department</th>
                                <th className="px-4 py-3 text-left border-b border-blue-200">Patients</th>
                                <th className="px-4 py-3 text-left border-b border-blue-200">Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, i) => (
                                <tr
                                    key={i}
                                    className={`${i % 2 === 0 ? "bg-blue-50" : "bg-white"
                                        } hover:bg-blue-100 transition-all duration-200`}
                                >
                                    <td className="px-4 py-2 border-b border-gray-200 font-medium text-blue-800">
                                        {row.department}
                                    </td>
                                    <td className="px-4 py-2 border-b border-gray-200">{row.patients}</td>
                                    <td className="px-4 py-2 border-b border-gray-200 font-semibold text-green-700">
                                        {row.revenue}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
            {/* Modal */}
            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl w-[85%] max-w-4xl p-6 relative animate-fadeIn">
                        {/* Close button */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-xl font-bold"
                        >
                            ✕
                        </button>

                        {/* Header */}
                        <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center justify-between">
                            Summary Table
                        </h2>

                        {/* Table container */}
                        <div className="overflow-auto max-h-[65vh] border rounded-xl shadow-inner bg-gradient-to-b from-white to-blue-50 mt-0">
                            <table className="min-w-full text-sm text-gray-800 border-collapse">
                                <thead className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900 uppercase text-xs font-semibold tracking-wide">
                                    <tr>
                                        <th className="px-5 py-3 text-left border-b border-blue-200">Department</th>
                                        <th className="px-5 py-3 text-left border-b border-blue-200">Patients</th>
                                        <th className="px-5 py-3 text-left border-b border-blue-200">Revenue</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {tableData.map((row, i) => (
                                        <tr
                                            key={i}
                                            className={`${i % 2 === 0 ? "bg-white" : "bg-blue-50"
                                                } hover:bg-blue-100 transition-all duration-200`}
                                        >
                                            <td className="px-5 py-3 border-b border-gray-200 font-medium text-blue-800">
                                                {row.department}
                                            </td>
                                            <td className="px-5 py-3 border-b border-gray-200">
                                                <span className="inline-block px-2 py-1 bg-blue-100 rounded-full text-xs font-medium text-blue-800">
                                                    {row.patients} Patients
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 border-b border-gray-200 font-semibold text-green-700">
                                                {row.revenue}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer info */}
                        <div className="mt-4 text-xs text-gray-500 flex justify-between">
                            <span>🕒 Last updated: Just now</span>
                            <span>📊 Data Source: Hospital Analytics</span>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default PreviewReport;
