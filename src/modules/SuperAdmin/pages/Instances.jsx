import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import renderIcons from "../../../shared/functions/renderIcons";

const mockInstances = [
  {
    instance_name: "lead-gen-app",
    company: "Acme Corp",
    instance_type: "t3.medium",
    environment: "production",
    instance_state: "running",
    is_deployed_and_running: true,
  },
  {
    instance_name: "internal-dashboard",
    company: "Beta Ltd",
    instance_type: "t2.micro",
    environment: "dev",
    instance_state: "stopped",
    is_deployed_and_running: false,
  },
];


const InstanceTable = () => {
  const [instances, setInstances] = useState(mockInstances)
  const Navigate = useNavigate()

  const onBack = () => {
    Navigate(-1)
  }
  return (
    <div className="w-full h-full overflow-auto p-0 m-0 bg-white flex flex-col gap-2">
      <h2
        className=" h-[10%] text-2xl font-semibold text-gray-800 flex items-center gap-4"
      >
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 !bg-transparent"
        >
          {renderIcons('IoIosArrowBack', 30)}
        </button>
        All Instances
      </h2>

      <div className="overflow-x-auto shadow-md w-[95%] self-center ">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-200 text-gray-700 text-left">
            <tr>
              <th className="py-2 px-4 !border-b">Instance Name</th>
              <th className="py-2 px-4 !border-b">Company</th>
              <th className="py-2 px-4 !border-b">Instance Type</th>
              <th className="py-2 px-4 !border-b">Environment</th>
              <th className="py-2 px-4 !border-b">Instance State</th>
              <th className="py-2 px-4 !border-b">Deployed & Running</th>
            </tr>
          </thead>
          <tbody>
            {instances.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No instances found.
                </td>
              </tr>
            ) : (
              instances.map((instance, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="py-2 px-4 !border-b">{instance.instance_name}</td>
                  <td className="py-2 px-4 !border-b">{instance.company}</td>
                  <td className="py-2 px-4 !border-b">{instance.instance_type}</td>
                  <td className="py-2 px-4 !border-b">{instance.environment}</td>
                  <td className="py-2 px-4 !border-b capitalize">{instance.instance_state}</td>
                  <td className="py-2 px-4 !border-b">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${instance.is_deployed_and_running ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                    >
                      {instance.is_deployed_and_running ? "Yes" : "No"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstanceTable;
