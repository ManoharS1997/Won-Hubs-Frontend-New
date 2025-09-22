import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import WONLoader from "../../../../shared/components/loader";
import { CreateNewAPIKey } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";

export default function CreateAPIKey() {
  const [apiKeyName, setApiKeyName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const showError = (message) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: message,
    });
  };

  const handleCreateAPIKey = async () => {
    if (!apiKeyName.trim()) {
      showError("API Key Name is required.");
      return;
    }

    if (!description.trim()) {
      showError("Description is required.");
      return;
    }

    setLoading(true);

    try {
      console.log('payload: ', apiKeyName, JSON.parse(localStorage.getItem("activeUserData"))?.id,);

      // Simulate API call
      const response = await CreateNewAPIKey(
        apiKeyName, description,
        JSON.parse(localStorage.getItem("activeUserData"))?.id,
      )
      console.log(response, "response");

      if (response.success === true) {
        console.log("API Key Created", { apiKeyName, description });
        Navigate('/api-keys'); // Redirect on success
      } else {
        throw new Error("Failed to create API key.");
      }
    } catch (err) {
      showError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col w-full gap-4 p-4">
      <h1>Create API Key</h1>
      {loading && <WONLoader />}

      <div className="flex flex-col gap-4 py-4 px-10 w-4/5 self-center shadow-lg bg-white rounded-lg">
        <div className="flex flex-col gap-1">
          <label htmlFor="apiKeyName">API Key Name</label>
          <input
            type="text"
            id="apiKeyName"
            value={apiKeyName}
            onChange={(e) => setApiKeyName(e.target.value)}
            placeholder="Enter API key name"
            className="border p-2 rounded"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter API key description"
            className="border p-2 rounded"
          />
        </div>
        <div className="w-full flex items-center gap-4 justify-center">
          <button
            type="button"
            onClick={() => Navigate('/api-keys')}
            className="!bg-red-500 text-white py-2 px-4 rounded hover:!bg-red-700 transition duration-300 ease-in-out"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCreateAPIKey}
            className="!bg-[var(--primary-color)] text-white py-2 px-4 rounded hover:!opacity-85 transition duration-300 ease-in-out"
          >
            Create API Key
          </button>
        </div>
      </div>
    </div>
  );
}
