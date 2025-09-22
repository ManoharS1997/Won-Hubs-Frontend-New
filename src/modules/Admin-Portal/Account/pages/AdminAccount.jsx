import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import renderIcons from "../../../../shared/functions/renderIcons";

// Simulated API calls (replace with real APIs)
const fetchUserData = async () => {
  return {
    username: "NowIT",
    role_id: 2,
    first_name: "NowIT",
    last_name: "Services",
    title: "Mr",
    department: "Technical",
    active: "true",
    login_count: 27,
    mfa_enabled: "true",
    email: "testmail@nowitservices.com",
    time_zone: "Asia/India",
    phone_no: "7337277893",
    location: "",
    user_type: "admin",
    locale: "",
    is_phone_verified: 0,
    subscription_status: "",
    subscription_expiration: "",
    last_login: "",
    last_activity: "",
    signup_date: "",
    account_age: "",
    actions_taken: "",
    payment_status: "",
    billing_address: "",
    subscription_start: "",
    subscription_end: "",
    action_timestamp: "",
    performed_by: "",
    action_type: "",
    ip_address: "",
    device_info: ""
  };
};

const updateUserData = async (data) => {
  return { success: true, ...data };
};

export default function AdminUserEditor() {
  const [user, setUser] = useState({});
  const [original, setOriginal] = useState({});
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const Navigate = useNavigate()

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchUserData();
      setUser(data);
      setOriginal(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setEditing(true);
    setMessage(null);
  };

  const handleCancel = () => {
    setUser(original);
    setEditing(false);
    setMessage(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await updateUserData(user);
    setLoading(false);
    if (result.success) {
      setOriginal(user);
      setEditing(false);
      setMessage({ type: "success", text: "User data updated successfully." });
    } else {
      setMessage({ type: "error", text: "Failed to update user data." });
    }
  };

  const editableFields = Object.keys(user);

  if (loading) return <div className="text-center mt-10">Loading user data...</div>;

  return (
    <div className="w-full h-full flex justify-center overflow-auto p-6 bg-inherit ">
      <div className="w-8/9 h-fit rounded-xl bg-white p-4">
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-2xl font-bold "
          >
            Profile
          </h2>
          {/* <div className="col-span-full  flex justify-end gap-3">
            {editing ? (
              <>
                <button
                  type="submit"
                  className="!bg-blue-600 text-white px-4 py-2 !rounded hover:!bg-blue-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleEdit}
                className="!bg-blue-600 text-white px-4 py-2 rounded hover:!bg-blue-700"
              >
                Edit User
              </button>
            )}
          </div> */}
        </div>

        {message && (
          <div
            className={`mb-4 px-4 py-2 rounded-md text-sm ${message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
              }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {editableFields.map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {key.replace(/_/g, " ")}
              </label>
              {editing ? (
                <input
                  type="text"
                  name={key}
                  value={user[key] || ""}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm"
                />
              ) : (
                <div
                  className="mt-1 text-gray-900 bg-gray-50 p-2 rounded !cursor-not-allowed"
                >
                  {user[key] || "-"}
                </div>
              )}
            </div>
          ))}
          <div>
            <button
              type="button"
              onClick={() => Navigate('/admin/change-password')}
              className="text-blue-500 font-semibold cursor-pointer hover:underline mt-4 flex items-center gap-2
              hover:shadow-lg !px-4 !py-2 rounded"
            >
              {renderIcons('PiUserGearBold')} <span> Change Password</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
