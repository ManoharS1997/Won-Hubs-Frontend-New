import { useEffect, useState } from "react";
import { GetWebhookList, DeleteWebhook } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";
import renderIcons from "../../../../shared/functions/renderIcons";
import Swal from "sweetalert2";
import copyToClipboard from "../../../../shared/functions/copyToClipboard";
import WONLoader from "../../../../shared/components/loader";
import { useNavigate } from "react-router-dom";

const webhooksList = [
  {
    id: 1,
    url: "https://example.com/webhook1",
    scopes: ["User Signup", "Order Completed"],
    status: "Active",
    created_at: "2023-07-16T10:00:00Z",
    updated_at: "2023-07-16T10:00:00Z"
  },
  {
    id: 2,
    url: "https://example.com/webhook2",
    scopes: ["User Login", "Product Purchased"],
    status: "Inactive",
    created_at: "2023-07-16T10:00:00Z",
    updated_at: "2023-07-16T10:00:00Z"
  }
]

export default function AllWebhooks() {
  const [webhook, setWebhook] = useState(null);
  const [webhookList, setWebhookList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const Navigate = useNavigate()

  useEffect(() => {
    const fetchWebhooks = async () => {
      setLoading(true);
      try {
        // Simulate an API call
        const response = await GetWebhookList()
        response.success === true
          ? setWebhookList(response.data)
          : setError("Failed to fetch webhooks");
      } catch (err) {
        setError("Failed to fetch webhooks");
      } finally {
        setLoading(false);
      }
    };
    fetchWebhooks();
  }, []);

  const deleteWebhook = (id) => {
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
        const delResponse = await DeleteWebhook(id)
        if (delResponse?.success === false) {
          Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Failed to delete Webhook.',
            timer: 1500,
            showConfirmButton: false,
          });
        } else {
          setWebhookList(webhookList.filter((key) => key.id !== id));
          Swal.fire(
            'Deleted!',
            'Your Webhook has been deleted.',
            'success'
          );
        }
      }
    });
  }

  // console.log(webhookList, "webhookList");

  return (
    <div className="flex flex-col bg-[var(--background-color)] text-[var(--text-color)] w-full h-full gap-4 p-4 ">
      <h2 className="flex items-center gap-4">
        <button onClick={() => Navigate(-1)} className="text-blue-500 !rounded-full hover:underline">
          {renderIcons("IoChevronBack", 25, "#000")}
        </button>
        Your Webhooks
      </h2>
      <div>
        <p className="m-0 p-0">
          Webhooks are a way for an app to provide other applications with
          real-time information.
        </p>
        <p className="m-0 p-0">
          A webhook is a user-defined HTTP callback that is triggered by a
          specific event in a web application. When the event occurs, the source
          site makes an HTTP request to the URL configured for the webhook,
          sending data about the event.
        </p>
      </div>
      {webhookList?.length !== 0 && (
        <button
          type="button"
          className="w-fit self-end border-2 !rounded-full px-4 py-2 !border-dashed hover:border-gray-300 text-gray-500 hover:text-green-500 hover:bg-gray-100 transition duration-300 ease-in-out"
          onClick={() => Navigate("/create-webhook")}
        >
          Create New Subscription +
        </button>
      )}
      {webhookList?.length !== 0 && !loading ? (
        <div className="overflow-auto">
          <table className="border">
            <thead>
              <tr className="border">
                <th className="px-4 py-2 !border-r-2">Webhook ID</th>
                <th className="px-4 py-2 !border-r-2">URL</th>
                <th className="px-4 py-2 !border-r-2">Name</th>
                <th className="px-4 py-2 !border-r-2">Description</th>
                <th className="px-4 py-2 !border-r-2">Scopes</th>
                <th className="px-4 py-2 !border-r-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {webhookList.map((webhook) => (
                <tr key={webhook.id} className="border">
                  <td className="px-2">{webhook.id}</td>
                  <td className="group  px-2">
                    <div className="group flex items-center gap-2 px-2">
                      {webhook?.webhook_url?.slice(0, 40) + "..."}
                      <span
                        onClick={() => copyToClipboard(webhook.webhook_url)}
                        className="opacity-0 group-hover:!opacity-100 bg-white rounded-full text-sm text-gray-700 "
                      >
                        {renderIcons("MdContentCopy", 17)}
                      </span>
                    </div>
                  </td>
                  <td className="px-2">{webhook.webhook_name}</td>
                  <td className="px-2">{webhook.description}</td>
                  <td className="px-2">{webhook.scopes.join(", ")}</td>
                  <td className="px-2">{webhook.status}</td>
                  <td className="flex px-2 items-center justify-center gap-2">
                    <button
                      type="button"
                      className="!bg-inherit px-2 py-1 rounded hover:text-blue-500 "
                    // onClick={() => Navigate(`/webhook/${webhook.id}`)}
                    >
                      {renderIcons("MdModeEditOutline", 18, "inherit")}
                    </button>
                    <button
                      type="button"
                      className="!bg-inherit px-2 py-1 rounded hover:text-blue-500 "
                      onClick={() => Navigate(`/webhook/${webhook.id}`)}
                    >
                      {renderIcons("BiCode", 20, "inherit")}
                    </button>
                    <button
                      type="button"
                      className="!bg-inherit px-2 py-1 rounded hover:text-red-500 "
                      onClick={deleteWebhook.bind(this, webhook.id)}
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
            <WONLoader />
          ) : (
            <>
              <p className="text-2xl text-gray-400">No webhooks found.</p>
              <p> Start Create a new subscription to get started.</p>
              <button
                type="button"
                className="w-fit self-center !border-2 !bg-green-500 !rounded-full px-4 py-2  hover:border-gray-300 text-white hover:!text-green-700 hover:!bg-white transition duration-300 ease-in-out"
                onClick={() => Navigate("/create-webhook")}
              >
                Create New Subscription
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}