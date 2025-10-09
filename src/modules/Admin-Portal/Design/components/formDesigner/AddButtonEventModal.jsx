import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const METHOD_LABELS = {
  POST: "Create",
  PUT: "Update",
  DELETE: "Delete",
  GET: "Fetch",
};

function AddButtonEventModal({
  open,
  onClose,
  onSubmit,
  initialLabel,
  moduleName,
}) {
  const eventTypes = ["None", "API Call", "Custom JavaScript"];
  const [eventType, setEventType] = useState("None");
  const [apiMethod, setApiMethod] = useState("");
  const [buttonName, setButtonName] = useState("");
  const [apis, setApis] = useState([]);
  const [filteredApis, setFilteredApis] = useState([]);
  const [selectedApiId, setSelectedApiId] = useState(null);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setEventType("None");
    setApiMethod("");
    setButtonName("");
    setFilteredApis([]);
    setSelectedApiId(null);
  };

  // ✅ Fetch APIs from backend
  useEffect(() => {
    if (open && moduleName) {
      const fetchApis = async () => {
        try {
          setLoading(true);
          const res = await fetch(`http://localhost:3001/form-designer/api/list/${moduleName}`);
          const result = await res.json();

          if (result.success && result.data?.apis) {
            setApis(result.data.apis);
          } else {
            console.error("Invalid response:", result);
            setApis([]);
          }
        } catch (err) {
          console.error("Error fetching APIs:", err);
          setApis([]);
        } finally {
          setLoading(false);
        }
      };

      fetchApis();
    }
  }, [open, moduleName]);

  // Filter APIs by method when eventType or method changes
  useEffect(() => {
    if (eventType === "API Call" && apiMethod) {
      setFilteredApis(apis.filter((api) => api.method === apiMethod));
      setSelectedApiId(null);
    } else {
      setFilteredApis([]);
      setSelectedApiId(null);
    }
  }, [eventType, apiMethod, apis]);

  if (!open) return null;

  const handleSubmit = () => {
    if (eventType === "API Call" && !selectedApiId) {
      alert("Please select an API to call.");
      return;
    }
    onSubmit({
      eventType,
      apiCallData:
        filteredApis.find((api) => api._id === selectedApiId) || null,
      labelFromModal: buttonName.trim() ? buttonName : null,
    });
    onClose();
  };

  const handleCancel = () => {
    resetForm();
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
          Add Button & Event
        </h2>

        {!initialLabel && (
          <>
            <label
              htmlFor="btnNme"
              style={{
                display: "block",
                marginBottom: "4px",
                fontWeight: "500",
                color: "#374151",
              }}
            >
              Button Name
            </label>
            <input
              type="text"
              name="label"
              id="btnNme"
              style={{
                width: "100%",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                padding: "8px",
                outline: "none",
                height: 40,
              }}
              onChange={(e) => setButtonName(e.target.value)}
            />
          </>
        )}

        {/* Event Type Selector */}
        <div style={{ margin: "12px 0" }}>
          <label
            htmlFor="eventType"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "500",
              color: "#374151",
            }}
          >
            Event Listener Type
          </label>
          <select
            id="eventType"
            style={{
              width: "100%",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              padding: "8px",
              outline: "none",
              height: 40,
            }}
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

        {/* API Call Section */}
        {eventType === "API Call" && (
          <>
            {loading ? (
              <p style={{ textAlign: "center", color: "#6b7280" }}>
                Loading APIs...
              </p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {/* Method Selector */}
                <div>
                  <label
                    htmlFor="apiMethod"
                    style={{
                      display: "block",
                      marginBottom: "2px",
                      fontWeight: "500",
                      color: "#374151",
                    }}
                  >
                    API Method
                  </label>
                  <select
                    id="apiMethod"
                    style={{
                      width: "100%",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      padding: "8px",
                      outline: "none",
                      height: 40,
                    }}
                    value={apiMethod}
                    onChange={(e) => setApiMethod(e.target.value)}
                  >
                    <option value="">Select Method</option>
                    {[...new Set(apis.map((api) => api.method))].map(
                      (method) => (
                        <option key={method} value={method}>
                          {METHOD_LABELS[method] || method}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* API Selector */}
                {filteredApis.length > 0 && (
                  <div>
                    <label
                      htmlFor="apiSelect"
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontWeight: "500",
                        color: "#374151",
                      }}
                    >
                      Select API
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
                          {api.name}
                        </option>
                      ))}
                    </select>

                    {/* API Description */}
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
                  </div>
                )}
              </div>
            )}
          </>
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
            disabled={eventType === "API Call" && !selectedApiId}
            onClick={handleSubmit}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              border: "none",
              color: "white",
              cursor:
                eventType === "API Call" && !selectedApiId
                  ? "not-allowed"
                  : "pointer",
              backgroundColor:
                eventType === "API Call" && !selectedApiId
                  ? "#a5b4fc"
                  : "#4f46e5",
            }}
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
  initialLabel: PropTypes.any.isRequired,
  moduleName: PropTypes.string.isRequired, // ✅ Add this prop
};

export default AddButtonEventModal;
