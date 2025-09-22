import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import convertName from "../../../../utils/conevrtName";
import FormDropdown from "../../../../shared/UIElements/FormDropdown";
import { GetActiveAPIKeys, CreateWebhookAPI } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";
import { useNavigate } from "react-router-dom";

const permissions = [
  "web_service_admin",
  "web_service_read",
  "web_service_write",
  "web_service_delete",
  "rest_api_explorer",
];

export default function CreateWebhook() {
  const [formState, setFormState] = useState({
    webhookName: "",
    apiKey: "",
    selectedPermissions: [],
    description: "",
  });
  const [activeApiKeys, setActiveApiKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate()

  useEffect(() => {
    const fetchAPIKeys = async () => {
      setLoading(true);
      try {
        const response = await GetActiveAPIKeys();
        if (response.success) {
          setActiveApiKeys(response.data.map(item => ({ label: item.name, value: item.id })));
        } else {
          Swal.fire("Error", "Failed to fetch API keys", "error");
        }
      } catch (err) {
        Swal.fire("Error", "Failed to fetch API keys", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchAPIKeys();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      selectedPermissions: checked
        ? [...prev.selectedPermissions, value]
        : prev.selectedPermissions.filter((perm) => perm !== value),
    }));
  };

  const handleCreateWebhook = async () => {
    const { webhookName, apiKey, selectedPermissions, description } = formState;
    console.log(formState, "formState");

    // Validate required fields
    if (!webhookName || !apiKey) {
      Swal.fire("Error", "Please fill in all required fields: Webhook Name, API Key, and Webhook URL.", "error");
      return;
    }

    if (selectedPermissions.length === 0) {
      Swal.fire("Error", "Please select at least one permission scope.", "error");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: webhookName,
        apiKeyId: apiKey,
        permissions: selectedPermissions,
        description,
        url: `${import.meta.env.VITE_HOSTED_API_URL}/api/webhooks/test/any-webhook`,
        userId: JSON.parse(localStorage.getItem("activeUserData")).id,
      };
      const response = await CreateWebhookAPI(payload);
      if (response.success) {
        Swal.fire("Success", "Webhook created successfully!", "success");
        setFormState({
          webhookName: "",
          apiKey: "",
          selectedPermissions: [],
          description: "",
        });
        Navigate("webhooks")
      } else {
        Swal.fire("Error", "Failed to create webhook", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Failed to create webhook", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full overflow-auto h-full gap-4 p-4">
      <h1>Create Webhook</h1>
      {loading && <p>Loading...</p>}

      <div className="flex flex-col gap-4 py-4 px-10 w-4/5 self-center shadow-lg bg-white rounded-lg">
        <div className="flex flex-col gap-1">
          <label htmlFor="webhookName">Webhook Name</label>
          <input
            type="text"
            id="webhookName"
            name="webhookName"
            value={formState.webhookName}
            onChange={handleInputChange}
            placeholder="Enter webhook name"
            className="border p-2 rounded"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="apiKey">API Key</label>
          <FormDropdown
            noLabel
            options={activeApiKeys}
            value={formState.apiKey}
            onChangeHandler={(value) => setFormState((prev) => ({ ...prev, apiKey: value.value }))}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="permissions">Permission Scopes</label>
          <ul className="flex flex-col gap-2">
            {permissions.map((permission) => (
              <li key={permission} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={permission}
                  name="permissions"
                  value={permission}
                  checked={formState.selectedPermissions.includes(permission)}
                  onChange={handlePermissionChange}
                />
                <label htmlFor={permission}>{convertName(permission)}</label>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows={5}
            value={formState.description}
            onChange={handleInputChange}
            placeholder="Enter webhook description"
            className="border p-2 rounded"
          />
        </div>
        <button
          type="button"
          onClick={handleCreateWebhook}
          className="!bg-[var(--primary-color)] text-white py-2 px-4 rounded hover:bg-[var(--color-primary-dark)] transition duration-300 ease-in-out"
        >
          Create Webhook
        </button>

        <button
          type="button"
          className="!bg-white text-red-500 border !border-red-500 py-2 px-4 rounded hover:!bg-red-700 hover:!text-white transition duration-300 ease-in-out"
          onClick={() => Navigate(-1)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
