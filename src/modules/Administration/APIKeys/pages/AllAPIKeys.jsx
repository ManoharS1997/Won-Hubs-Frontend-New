import { useEffect, useState } from "react";
import { GetAPIKeyList, DeleteAPIKey } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";
import renderIcons from "../../../../shared/functions/renderIcons";
import Swal from 'sweetalert2';
import copyToClipboard from "../../../../shared/functions/copyToClipboard";
import { useNavigate } from "react-router-dom";

const apiKeysList = [
  {
    id: 1,
    key: "12345-ABCDE",
    status: "Active",
    created_at: "2023-07-16T10:00:00Z",
    updated_at: "2023-07-16T10:00:00Z"
  },
  {
    id: 2,
    key: "67890-FGHIJ",
    status: "Inactive",
    created_at: "2023-07-16T10:00:00Z",
    updated_at: "2023-07-16T10:00:00Z"
  }
];

export default function AllAPIKeys() {
  const [apiKeyList, setApiKeyList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const Navigate = useNavigate()

  useEffect(() => {
    const fetchAPIKeys = async () => {
      setLoading(true);
      try {
        // Simulate an API call
        const response = await GetAPIKeyList()
        if (response?.success === false) {
          throw new Error("Failed to fetch API keys.");
        }
        setApiKeyList(response?.data || []);
      } catch (err) {
        setError("Failed to fetch API keys");
      } finally {
        setLoading(false);
      }
    };
    fetchAPIKeys();
  }, []);


  const deleteAPIKey = (id) => {
    console.log(id, "deleteAPIKey id");

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Call the delete API function here
        const delResponse = await DeleteAPIKey(id)
        if (delResponse?.success === false) {
          Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Failed to delete API key.',
            timer: 1500,
            showConfirmButton: false,
          });
        } else {
          setApiKeyList(apiKeyList.filter((key) => key.id !== id));
          Swal.fire(
            'Deleted!',
            'Your API key has been deleted.',
            'success'
          );
        }
      }
    });
  }

  return (
    <div className="flex flex-col w-full gap-4 p-4">
      <h2 className="flex items-center gap-4">
        <button onClick={() => Navigate(-1)} className="text-blue-500 !bg-inherit hover:underline">
          {renderIcons("IoChevronBack", 25, "#000")}
        </button>
        Your API Keys
      </h2>
      <div>
        <p className="m-0 p-0">
          API keys are used to authenticate requests to your application.
        </p>
        <p className="m-0 p-0">
          Manage your API keys here. You can create, edit, or delete keys as
          needed.
        </p>
      </div>
      {apiKeyList?.length !== 0 && (
        <button
          type="button"
          className="w-fit self-end border-2 !rounded-full px-4 py-2 !border-dashed hover:border-gray-300 text-gray-500 hover:text-green-500 hover:bg-gray-100 transition duration-300 ease-in-out"
          onClick={() => Navigate("/create-api-key")}
        >
          Create New API Key +
        </button>
      )}
      {apiKeyList?.length !== 0 && !loading ? (
        <div>
          <table className="border">
            <thead>
              <tr className="border">
                <th className="px-4 py-2 !border-r-2">API Key ID</th>
                <th className="px-4 py-2 !border-r-2">Name</th>
                <th className="px-4 py-2 !border-r-2">Key</th>
                <th className="px-4 py-2 !border-r-2">Token</th>
                <th className="px-4 py-2 !border-r-2">Description</th>
                <th className="px-4 py-2 !border-r-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apiKeyList.map((apiKey) => (
                <tr key={apiKey.id} className="border">
                  <td className="pl-4">{apiKey.id}</td>
                  <td className="pl-4">{apiKey.name}</td>
                  <td className="group ">
                    <div className="group flex items-center gap-2 px-2">
                      {apiKey.api_key.slice(0, 10)}...
                      <span
                        onClick={() => copyToClipboard(apiKey.api_key)}
                        className="opacity-0 group-hover:!opacity-100 bg-white rounded-full text-sm text-gray-700 "
                      >
                        {renderIcons("MdContentCopy", 17)}
                      </span>
                    </div>
                  </td>
                  <td className="group ">
                    <div className="group flex items-center gap-2 px-2">
                      {apiKey.secret_token.slice(0, 10)}...
                      <span
                        onClick={() => copyToClipboard(apiKey.secret_token)}
                        className="opacity-0 group-hover:!opacity-100 bg-white rounded-full text-sm text-gray-700 "
                      >
                        {renderIcons("MdContentCopy", 17)}
                      </span>
                    </div>
                  </td>
                  <td>{apiKey.description}</td>
                  <td>{apiKey.status}</td>
                  <td className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      className="!bg-inherit px-2 py-1 rounded hover:!text-red-500 "
                      onClick={deleteAPIKey.bind(this, apiKey.id)}
                    >
                      {renderIcons("MdDeleteOutline", 20, "inherit")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p className="text-2xl text-gray-400">No API keys found.</p>
              <p>Start by creating a new API key to get started.</p>
              <button
                type="button"
                className="w-fit self-center !border-2 !bg-green-500 !rounded-full px-4 py-2 hover:border-gray-300 text-white hover:!text-green-700 hover:!bg-white transition duration-300 ease-in-out"
                onClick={() => Navigate("create-api-key")}
              >
                Create New API Key
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}