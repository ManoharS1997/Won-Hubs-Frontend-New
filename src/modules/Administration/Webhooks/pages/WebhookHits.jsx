import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WONLoader from '../../../../shared/components/loader';
import { GetWebhookById } from '../../../../utils/CheckAndExecuteFlows/CRUDoperations';
import renderIcons from '../../../../shared/functions/renderIcons';
import { useNavigate } from 'react-router-dom';

const WebhookHits = () => {
  const { id } = useParams();
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [webhookData, setWebhookData] = useState(null);
  const [webhookName, setWebhookName] = useState(null);
  const [webhookUrl, setWebhookUrl] = useState(null);
  const [status, setStatus] = useState(null);
  const Navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchWebhookData = async () => {
        try {
          const data = await GetWebhookById(id);
          if (data.success === false) {
            throw new Error('No data found for this webhook ID');
          }
          // console.log('Fetched webhook data:', data.data);
          setWebhookName(data.data.webhook_name);
          setWebhookUrl(data.data.webhook_url);
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      };
      fetchWebhookData();
    }
  }, [id]);

  useEffect(() => {
    setLoading(true);
    // const socket = new WebSocket('ws://localhost:3001');
    const socket = new WebSocket(`${import.meta.env.VITE_HOSTED_API_DOMAIN}`);

    socket.onopen = () => {
      console.log('WebSocket connected');
    };
    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        const getUrl = async () => {
          const data = await GetWebhookById(id);
          const url = data.data.webhook_url

          // console.log('Fetched webhook data:', webhookUrl);
          // console.log('is webhook matched: ', message.data.apiId, url);

          if (message.type === 'webhook' && message.data.apiId === url?.split('?')[1]?.split('&')[0].split('=')[1]) {
            message?.data && setWebhookData(message.data);
          } else if (message.type === 'status') {
            setStatus(message.data);
          }
        }
        getUrl()

      } catch (err) {
        console.error('Error parsing message:', err);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };
    setLoading(false);
    return () => socket.close();
  }, []);

  if (loading) return <WONLoader />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  console.log('webhoog data: ', webhookData)

  return (
    <div className="p-6 flex flex-col items-center  space-y-8 font-sans overflow-auto h-full">
      <button onClick={() => Navigate(-1)} className="text-blue-500 hover:underline mb-4 self-start">
        {renderIcons("IoChevronBack", 20, "#000")}
      </button>
      <div className='w-3/5 flex flex-col gap-4'>
        <h1 className="text-2xl font-bold text-gray-800">
          Recent Webhook Hits
        </h1>

        <p>Name: <span className='bg-gray-200 px-2 py-1 rounded'>{webhookName}</span></p>

        <div className="bg-white shadow-md rounded-xl p-4 border">
          <h2 className="text-lg font-semibold mb-2 text-blue-700">
            Live Webhook Data
          </h2>
          {webhookData ? (
            <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-sm text-gray-800">
              {JSON.stringify(webhookData, null, 2)}
            </pre>
          ) : (
            <p className="text-gray-500">Waiting for webhook...</p>
          )}
        </div>

        <div className="bg-white shadow-md rounded-xl p-4 border">
          <h2 className="text-lg font-semibold mb-2 text-green-700">
            Server Status
          </h2>
          {status ? (
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {Object.entries(status).map(([key, value]) => (
                <li key={key}>
                  <span className="font-medium">
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </span>{" "}
                  <span className={value ? "text-green-600" : "text-red-600"}>
                    {value ? "Online" : "Offline"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Checking status...</p>
          )}
        </div>

        <div className="bg-white shadow-md rounded-xl p-4 border">
          <h2 className="text-lg font-semibold mb-2 text-purple-700">
            Webhook Hit History
          </h2>
          {hits.length === 0 ? (
            <p className="text-gray-500">No hits found for this webhook.</p>
          ) : (
            <ul className="space-y-4">
              {hits.map((hit, index) => (
                <li key={index} className="border rounded-md p-3 bg-gray-50">
                  <div className="mb-2">
                    <span className="font-semibold text-gray-700">
                      Timestamp:
                    </span>{" "}
                    {new Date(hit.timestamp).toLocaleString()}
                  </div>
                  <div className="text-sm">
                    <div className="mb-1 font-semibold">Request Body:</div>
                    <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
                      {JSON.stringify(hit.reqBody, null, 2)}
                    </pre>
                    <div className="mt-2 mb-1 font-semibold">Result Data:</div>
                    <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
                      {JSON.stringify(hit.resultData, null, 2)}
                    </pre>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebhookHits;
