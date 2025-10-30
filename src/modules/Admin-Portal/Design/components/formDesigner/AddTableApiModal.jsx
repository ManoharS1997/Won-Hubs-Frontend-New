import { useState } from "react";
import PropTypes from "prop-types";

export default function AddTableApiModal({
  open,
  onClose,
  onSubmit,
  initialEndpoint,
  initialMethod,
}) {
  const [endpoint, setEndpoint] = useState(initialEndpoint || "");
  const [method, setMethod] = useState(initialMethod || "GET");
  if (!open) return null; // Render nothing if not open

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Configure Table API</h3>
        <input
          type="text"
          placeholder="API Endpoint"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          className="input"
        />
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
        <div className="modal-actions">
          <button
            onClick={() => {
              onSubmit({ endpoint, method });
              onClose();
            }}
            className="btn"
          >
            Save
          </button>
          <button onClick={onClose} className="btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

AddTableApiModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialEndpoint: PropTypes.string,
  initialMethod: PropTypes.string,
};
