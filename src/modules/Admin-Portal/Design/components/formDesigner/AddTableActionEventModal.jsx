import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// ✅ Map actions to their respective HTTP methods
const METHOD_MAP = {
  Edit: ["PUT", "PATCH"], // Update actions
  View: ["GET"], // View actions
  Delete: ["DELETE"], // Delete actions
};

function AddTableActionEventModal({
  open,
  onClose,
  onSubmit,
  actionLabel,
  moduleName,
}) {
  const [filteredApis, setFilteredApis] = useState([]);
  const [selectedApiId, setSelectedApiId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch APIs from backend and filter based on the action
  useEffect(() => {
    if (open && moduleName && actionLabel) {
      const fetchApis = async () => {
        try {
          setLoading(true);
          const res = await fetch(
            `${
              import.meta.env.VITE_HOSTED_API_URL
            }/form-designer/api/list/${moduleName}`
          );
          const result = await res.json();

          if (result.success && result.data?.apis) {
            const allowedMethods = METHOD_MAP[actionLabel] || ["GET"];
            const matchingApis = result.data.apis.filter((api) =>
              allowedMethods.includes(api.method)
            );
            setFilteredApis(matchingApis);
          } else {
            setFilteredApis([]);
          }
        } catch (err) {
          console.error("Error fetching APIs:", err);
          setFilteredApis([]);
        } finally {
          setLoading(false);
        }
      };

      fetchApis();
    }
  }, [open, moduleName, actionLabel]);

  // ✅ Close modal safely if not open
  if (!open) return null;

  const handleSubmit = () => {
    if (!selectedApiId) {
      alert("Please select an API to assign.");
      return;
    }

    const selectedApi = filteredApis.find((api) => api._id === selectedApiId);
    onSubmit({
      actionLabel,
      apiCallData: selectedApi || null,
    });
    onClose();
  };

  const handleCancel = () => {
    setSelectedApiId(null);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          width: "100%",
          maxWidth: "450px",
          padding: "24px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "600",
            marginBottom: "20px",
            color: "#1e1b4b",
          }}
        >
          Assign API for {actionLabel}
        </h2>

        {loading ? (
          <p style={{ textAlign: "center", color: "#6b7280" }}>
            Loading APIs...
          </p>
        ) : filteredApis.length > 0 ? (
          <>
            <label
              htmlFor="apiSelect"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "500",
                color: "#374151",
              }}
            >
              Select API ({METHOD_MAP[actionLabel].join(", ")} method)
            </label>
            <select
              id="apiSelect"
              style={{
                width: "100%",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                padding: "8px",
                outline: "none",
                height: 40,
              }}
              value={selectedApiId || ""}
              onChange={(e) => setSelectedApiId(e.target.value)}
            >
              <option value="">Select an API</option>
              {filteredApis.map((api) => (
                <option key={api._id} value={api._id}>
                  {api.name} ({api.method})
                </option>
              ))}
            </select>

            {selectedApiId && (
              <div
                style={{
                  marginTop: "12px",
                  padding: "12px",
                  backgroundColor: "#eef2ff",
                  color: "#3730a3",
                  borderRadius: "6px",
                  border: "1px solid #c7d2fe",
                  fontSize: "14px",
                  maxHeight: "120px",
                  overflowY: "auto",
                }}
              >
                {
                  filteredApis.find((api) => api._id === selectedApiId)
                    ?.description
                }
              </div>
            )}
          </>
        ) : (
          <p style={{ textAlign: "center", color: "#6b7280" }}>
            No APIs found for {METHOD_MAP[actionLabel].join(", ")} method.
          </p>
        )}

        {/* Footer Buttons */}
        <div
          style={{
            marginTop: "32px",
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
          }}
        >
          <button
            onClick={handleCancel}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              backgroundColor: "#e5e7eb",
              color: "#374151",
              border: "none",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            disabled={!selectedApiId}
            onClick={handleSubmit}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              border: "none",
              color: "white",
              cursor: !selectedApiId ? "not-allowed" : "pointer",
              backgroundColor: !selectedApiId ? "#a5b4fc" : "#4f46e5",
            }}
          >
            Assign API
          </button>
        </div>
      </div>
    </div>
  );
}

AddTableActionEventModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  actionLabel: PropTypes.string.isRequired, // Edit, View, Delete
  moduleName: PropTypes.string.isRequired,
};

export default AddTableActionEventModal;
