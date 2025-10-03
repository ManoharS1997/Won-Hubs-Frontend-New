import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const DUMMY_APIS = [
  { id: 1, name: "Export Data", endpoint: "/api/x/exportData", method: "POST", description: "Export all data for module X." },
  { id: 2, name: "Add User", endpoint: "/api/x/addUser", method: "POST", description: "Add a new user in module X." },
  { id: 3, name: "Update Record", endpoint: "/api/x/updateRecord", method: "PUT", description: "Update existing record in module X." },
  { id: 4, name: "Delete Item", endpoint: "/api/x/deleteItem", method: "DELETE", description: "Delete item from module X." },
  { id: 5, name: "Get Report", endpoint: "/api/x/getReport", method: "GET", description: "Retrieve report data from module X." }
];

function AddButtonEventModal({ open, onClose, onSubmit }) {
  const eventTypes = ["None", "API Call", "Custom JavaScript"];
  const [eventType, setEventType] = useState("None");
  const [apiMethod, setApiMethod] = useState("");
  const [filteredApis, setFilteredApis] = useState([]);
  const [selectedApiId, setSelectedApiId] = useState(null);

  useEffect(() => {
    if (eventType === "API Call" && apiMethod) {
      setFilteredApis(DUMMY_APIS.filter((api) => api.method === apiMethod));
      setSelectedApiId(null);
    } else {
      setFilteredApis([]);
      setSelectedApiId(null);
    }
  }, [eventType, apiMethod]);

  if (!open) return null;

  const handleSubmit = () => {
    if (eventType === "API Call" && !selectedApiId) {
      alert("Please select an API to call.");
      return;
    }
    onSubmit({
      eventType,
      apiCallData: filteredApis.find(api => api.id === Number(selectedApiId)) || null
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 overflow-auto max-h-[90vh]">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-900">Add Button & Event</h2>

        <div className="mb-6">
          <label className="block mb-2 text-gray-700 font-medium" htmlFor="eventType">
            Event Listener Type
          </label>
          <select
            id="eventType"
            className="w-full border border-gray-300 rounded-md p-2 transition focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {eventType === "API Call" && (
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-gray-700 font-medium" htmlFor="apiMethod">
                API Method
              </label>
              <select
                id="apiMethod"
                className="w-full border border-gray-300 rounded-md p-2 transition focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                value={apiMethod}
                onChange={(e) => setApiMethod(e.target.value)}
              >
                <option value="">Select HTTP Method</option>
                {[...new Set(DUMMY_APIS.map((api) => api.method))].map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>

            {filteredApis.length > 0 && (
              <div>
                <label className="block mb-2 text-gray-700 font-medium" htmlFor="apiSelect">
                  Select API
                </label>
                <select
                  id="apiSelect"
                  className="w-full border border-gray-300 rounded-md p-2 transition focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  value={selectedApiId || ""}
                  onChange={(e) => setSelectedApiId(e.target.value)}
                >
                  <option value="">Select an API</option>
                  {filteredApis.map((api) => (
                    <option key={api.id} value={api.id}>
                      {api.name}
                    </option>
                  ))}
                </select>

                {selectedApiId && (
                  <div className="mt-4 p-3 bg-indigo-50 text-indigo-800 rounded-md text-sm max-h-32 overflow-auto border border-indigo-200">
                    {filteredApis.find((api) => api.id === Number(selectedApiId)).description}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            disabled={eventType === "API Call" && !selectedApiId}
            onClick={handleSubmit}
            className={`px-5 py-2 rounded-md text-white transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 ${
              eventType === "API Call" && !selectedApiId
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            Add Button
          </button>
        </div>
      </div>
    </div>
  );
}

AddButtonEventModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddButtonEventModal;
export { DUMMY_APIS };
