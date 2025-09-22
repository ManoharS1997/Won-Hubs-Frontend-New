import PropTypes from "prop-types";

const MODULES = ["User", "Product", "Order"];

export default function ModulesSidebar({ module, setModule }) {
  return (
    <select style={{height:38}}
      value={module}
      onChange={(e) => setModule(e.target.value)}
      className="w-full px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-gray-200 focus:border-gray-200 text-gray-700"
    >
      <option value="">-- Select Module --</option>
      {MODULES.map((m) => (
        <option key={m} value={m}>
          {m}
        </option>
      ))}
    </select>
  );
}

ModulesSidebar.propTypes = {
  module: PropTypes.string.isRequired,
  setModule: PropTypes.func.isRequired,
};
