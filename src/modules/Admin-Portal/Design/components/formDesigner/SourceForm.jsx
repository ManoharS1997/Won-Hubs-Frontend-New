import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import FormInput from "../../../../../shared/UIElements/FormInput";
import * as XLSX from "xlsx";
import ExportModal from "./ExportModal";

function ItemCheck({ field, formValues, handleChange }) {
  const handleButtonClick = async () => {
    if (field?.actionType === "API Call" && field?.apiEndpoint) {
      try {
        const method = (field?.apiMethod || "POST").toUpperCase();
        await axios({
          method,
          url: field.apiEndpoint,
          data: formValues,
        });
        alert(`${field?.label || "API"} call successful!`);
      } catch (error) {
        console.error("❌ API call failed:", error);
        alert("API call failed! Check console for details.");
      }
    }
  };

  switch (field?.type) {
    // 📘 Standard Input Fields
    case "text":
    case "email":
    case "password":
    case "number":
    case "tel":
    case "url":
    case "date":
    case "time":
    case "month":
    case "week":
    case "color":
      return (
        <FormInput
          type={field.type}
          label={field.label}
          value={formValues?.[field?.name] || ""}
          onChangeHandler={(e) => handleChange(field?.name, e.target.value)}
        />
      );

    case "textarea":
      return (
        <div className="flex flex-col gap-1">
          <label className="font-medium">{field?.label}</label>
          <textarea
            name={field?.name}
            value={formValues?.[field?.name] || ""}
            onChange={(e) => handleChange(field?.name, e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-blue-500"
          />
        </div>
      );

    case "dropdown":
      return (
        <div className="flex flex-col gap-1">
          <label className="font-medium">{field?.label}</label>
          <select
            name={field?.name}
            value={formValues?.[field?.name] || ""}
            onChange={(e) => handleChange(field?.name, e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-blue-500"
          >
            <option value="">Select...</option>
            {field?.options?.map((opt, idx) => {
              const val = typeof opt === "string" ? opt : opt.value;
              const label = typeof opt === "string" ? opt : opt.label;
              return (
                <option key={idx} value={val}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>
      );

    case "radio":
      return (
        <fieldset className="flex flex-col gap-2">
          <legend className="font-medium">{field?.label}</legend>
          <div className="flex flex-wrap gap-4">
            {field?.options?.map((option, idx) => {
              const val = typeof option === "string" ? option : option.value;
              const label = typeof option === "string" ? option : option.label;
              return (
                <label
                  key={idx}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={field?.name}
                    value={val}
                    checked={formValues?.[field?.name] === val}
                    onChange={(e) => handleChange(field?.name, e.target.value)}
                  />
                  <span>{label}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      );

    case "checkbox":
      return (
        <fieldset className="flex flex-col gap-2">
          <legend className="font-medium">{field?.label}</legend>
          <div className="flex flex-wrap gap-4">
            {field?.options?.length > 0 ? (
              field.options.map((option, idx) => {
                const val = typeof option === "string" ? option : option.value;
                const label =
                  typeof option === "string" ? option : option.label;
                const checked = formValues?.[field?.name]?.includes(val);
                return (
                  <label
                    key={idx}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name={field?.name}
                      value={val}
                      checked={!!checked}
                      onChange={(e) => {
                        const prev = formValues?.[field?.name] || [];
                        const updated = e.target.checked
                          ? [...prev, val]
                          : prev.filter((v) => v !== val);
                        handleChange(field?.name, updated);
                      }}
                    />
                    <span>{label}</span>
                  </label>
                );
              })
            ) : (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name={field?.name}
                  checked={!!formValues?.[field?.name]}
                  onChange={(e) => handleChange(field?.name, e.target.checked)}
                />
                <span>{field?.label}</span>
              </label>
            )}
          </div>
        </fieldset>
      );

    case "file":
    case "image":
      return (
        <div className="flex flex-col gap-1">
          <label className="font-medium">{field?.label}</label>
          <input
            type="file"
            name={field?.name}
            onChange={(e) => handleChange(field?.name, e.target.files[0])}
            className="border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
      );

    // ✅ API button
    case "button":
      return (
        <button
          type="button"
          onClick={handleButtonClick}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          {field?.label || "Submit"}
        </button>
      );

    default:
      return null;
  }
}

// ✅ Parent form with all logic intact
export default function SourceForm({
  formFields = [],
  formButtons = [],
  activeTable,
  tabName,
}) {
  const [formValues, setFormValues] = useState({});
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const [loadingBtn, setLoadingBtn] = useState(null);
  const handleChange = (name, value) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
      activeTable,
      tabName,
      activeNav: localStorage.getItem("activeNav"),
      activeUserData: localStorage.getItem("activeUserData"),
    }));
  };

  const handleExport = (exportType) => {
    try {
      if (!formValues || Object.keys(formValues).length === 0) {
        alert("No data to export!");
        return;
      }

      const cleaned = { ...formValues };
      delete cleaned.record_id;
      delete cleaned.activeUserData;

      const systemFields = {
        activeTable,
        tabName,
        activeNav: localStorage.getItem("activeNav") || "",
      };

      const allowedFormKeys = formFields.map((f) => f.name);

      const filtered = Object.keys(cleaned)
        .filter((key) => allowedFormKeys.includes(key))
        .reduce((obj, key) => {
          obj[key] = cleaned[key];
          return obj;
        }, {});

      const finalData = {
        "ACTIVE TABLE": systemFields.activeTable,
        "TAB NAME": systemFields.tabName,
        "ACTIVE NAV": systemFields.activeNav,
        ...filtered,
      };

      const convertLabel = (key) =>
        key
          .replace(/([A-Z])/g, " $1")
          .trim()
          .toUpperCase();

      const formattedData = {};
      Object.keys(finalData).forEach((key) => {
        formattedData[convertLabel(key)] = finalData[key];
      });

      const exportArray = [formattedData];

      if (exportType === "excel") {
        const worksheet = XLSX.utils.aoa_to_sheet([]);

        const headers = Object.keys(formattedData);
        const values = Object.values(formattedData);

        // Row 1 → Headers
        headers.forEach((header, colIndex) => {
          const cellRef = XLSX.utils.encode_cell({ r: 0, c: colIndex });

          worksheet[cellRef] = {
            t: "s",
            v: header,
            s: {
              fill: { fgColor: { rgb: "DDEBF7" } },
              font: { bold: true, color: { rgb: "000000" } },
              alignment: { horizontal: "center" },
            },
          };
        });

        // Row 2 → Values (all text)
        values.forEach((cellObj, colIndex) => {
          const cellRef = XLSX.utils.encode_cell({ r: 1, c: colIndex });

          worksheet[cellRef] = {
            t: "s",
            v: String(cellObj.v),
          };
        });

        worksheet["!ref"] = XLSX.utils.encode_range({
          s: { r: 0, c: 0 },
          e: { r: 1, c: headers.length - 1 },
        });

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        XLSX.writeFile(
          workbook,
          `${systemFields.activeTable}_${systemFields.tabName}_export.xlsx`
        );
        return;
      }

      if (exportType === "csv") {
        const worksheet = XLSX.utils.json_to_sheet(exportArray);
        const csvOutput = XLSX.utils.sheet_to_csv(worksheet);

        const blob = new Blob([csvOutput], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${activeTable}_${tabName}_export.csv`;
        a.click();

        window.URL.revokeObjectURL(url);
        return;
      }
    } catch (err) {
      alert("Export failed. Check console.");
    }
  };

  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const endpoint = `${
          import.meta.env.VITE_HOSTED_API_URL
        }/api/form-designer/dynamic/get`;

        const params = {
          activeTable,
          tabName,
          activeNav: localStorage.getItem("activeNav"),
        };

        const user = localStorage.getItem("activeUserData");
        if (user) {
          const parsedUser = JSON.parse(user);
          if (parsedUser?.id) params.userId = parsedUser.id;
        }

        const response = await axios.get(endpoint, { params });

        if (response.data?.success && response.data.data.length > 0) {
          const saved = response.data.data[0];

          // convert JSON-like columns
          const cleaned = {};
          Object.entries(saved).forEach(([key, value]) => {
            try {
              cleaned[key] = JSON.parse(value);
            } catch {
              cleaned[key] = value;
            }
          });

          // 🔥 FILTER USING formFields list
          const allowedKeys = formFields.map((f) => f.name);

          const filteredSavedValues = Object.keys(cleaned)
            .filter((key) => allowedKeys.includes(key))
            .reduce((obj, key) => {
              obj[key] = cleaned[key];
              return obj;
            }, {});

          setFormValues({
            ...filteredSavedValues,
            activeTable,
            tabName,
            activeNav: localStorage.getItem("activeNav"),
            activeUserData: localStorage.getItem("activeUserData"),
          });
        }
      } catch (error) {
        console.error("❌ Error fetching saved data:", error);
      }
    };

    fetchExistingData();
  }, [activeTable, tabName]);

  const handleButtonClick = (btn) => {
    if (btn.label?.toLowerCase() === "export") {
      setExportModalOpen(true); // Open modal
      return;
    }

    if (btn.label?.toLowerCase() === "email") {
      alert("Email functionality will be added later.");
      return;
    }

    if (!btn.apiEndpoint) return;

    try {
      setLoadingBtn(btn._id);
      const method = btn.apiMethod?.toUpperCase() || "POST";
      const endpoint = `${import.meta.env.VITE_HOSTED_API_URL}${
        btn.apiEndpoint
      }`;

      let response;
      if (method === "GET") response = axios.get(endpoint);
      if (method === "POST") response = axios.post(endpoint, formValues);
      if (method === "PUT") response = axios.put(endpoint, formValues);
      if (method === "DELETE") response = axios.delete(endpoint);

      alert(`${btn.label} successful!`);
    } catch (err) {
      console.error(err);
      alert("API call failed.");
    } finally {
      setLoadingBtn(null);
    }
  };

  const handleExportSelect = (type) => {
    handleExport(type); // Export as excel/csv/pdf
    setExportModalOpen(false); // Close modal
  };

  return (
    <div className="w-[100%] h-fit bg-white p-6 overflow-y-auto rounded-b-[0.5rem]">
      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full !min-w-[100%]">
        {formFields.map((field, idx) => (
          <div key={field?.name || idx}>
            <ItemCheck
              field={field}
              formValues={formValues}
              handleChange={handleChange}
            />
          </div>
        ))}
      </div>
      <ExportModal
        open={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        onSelect={handleExportSelect}
      />
      {/* Form Buttons */}
      {formButtons.length > 0 && (
        <div className="w-full flex mt-8 gap-4 flex-wrap justify-end">
          {formButtons.map((btn, idx) => (
            <button
              key={btn._id || idx}
              type={btn.type || "button"}
              onClick={() => handleButtonClick(btn)}
              disabled={loadingBtn === btn._id}
              className={`px-6 py-2 text-white rounded transition-all ${
                loadingBtn === btn._id
                  ? "!bg-gray-400 cursor-not-allowed"
                  : "!bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loadingBtn === btn._id ? "Processing..." : btn.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

SourceForm.propTypes = {
  formFields: PropTypes.array.isRequired,
  formButtons: PropTypes.array.isRequired,
  activeTable: PropTypes.string.isRequired,
  tabName: PropTypes.string.isRequired,
};

ItemCheck.propTypes = {
  field: PropTypes.any.isRequired,
  formValues: PropTypes.any.isRequired,
  handleChange: PropTypes.any.isRequired,
};
