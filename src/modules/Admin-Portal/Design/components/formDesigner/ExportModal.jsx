import PropTypes from "prop-types";

export default function ExportModal({ open, onClose, onSelect }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-xl w-80">
        <h2 className="text-lg font-semibold mb-4">Choose Export Format</h2>

        <div className="flex flex-col gap-3">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={() => onSelect("excel")}
          >
            Export as Excel
          </button>

          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md"
            onClick={() => onSelect("csv")}
          >
            Export as CSV
          </button>
        </div>

        <button
          className="mt-4 text-gray-600 underline w-full text-center"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

ExportModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};
