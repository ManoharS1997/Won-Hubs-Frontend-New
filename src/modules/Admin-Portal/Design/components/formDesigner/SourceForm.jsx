import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import FormInput from "../../../../../shared/UIElements/FormInput";
import * as XLSX from "xlsx";
import ExportModal from "./ExportModal";
import ExcelJS from "exceljs/dist/exceljs.min.js";
import EmailModel from "./EmailModal";
import Cookies from "js-cookie";

import { saveAs } from "file-saver";

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

export default function SourceForm({
  formFields = [],
  formButtons = [],
  activeTable,
  tabName,
}) {
  const [formValues, setFormValues] = useState({});
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const [loadingBtn, setLoadingBtn] = useState(null);
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  const handleChange = (name, value) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
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
        try {
          const rawKeys = Object.keys(formattedData);
          const rawValues = Object.values(formattedData);
          const extractValue = (item) => {
            if (item == null) return "";
            if (typeof item === "string" || typeof item === "number")
              return String(item);
            if (item.v !== undefined) return String(item.v);
            if (item.value !== undefined) return String(item.value);
            return JSON.stringify(item); // fallback for objects
          };

          const headers = rawKeys;
          const values = rawValues.map(extractValue);
          const workbook = new ExcelJS.Workbook();
          const worksheet = workbook.addWorksheet("Sheet1");

          worksheet.addRow(headers);
          worksheet.addRow(values);

          const headerRow = worksheet.getRow(1);
          headerRow.height = 20;

          headerRow.eachCell((cell) => {
            cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 11 };
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "FF00215B" },
            };
            cell.alignment = {
              horizontal: "center",
              vertical: "middle",
              wrapText: true,
            };
            cell.border = {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            };
          });

          worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
            if (rowNumber === 1) return;
            row.eachCell((cell) => {
              cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
              };
              cell.alignment = {
                horizontal: "center", // <-- ADD THIS
                vertical: "middle", // <-- better than "top" for neat look
                wrapText: true,
              };
            });
          });

          worksheet.columns = headers.map((h, i) => ({
            width: Math.max(h.length, (values[i] || "").length, 10) + 5,
          }));

          worksheet.views = [{ state: "frozen", ySplit: 1 }];

          workbook.xlsx
            .writeBuffer()
            .then((buffer) => {
              saveAs(
                new Blob([buffer]),
                `${systemFields.activeTable}_${systemFields.tabName}_export.xlsx`
              );
              console.groupEnd();
            })
            .catch(() => {
              console.groupEnd();
              alert("Export failed. Check console.");
            });

          return;
        } catch (err) {
          alert("Export failed. Check console.");
        }
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

  const sendEmailExport = async (userEmail) => {
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
    try {
      const payload = {
        email: userEmail,
        rows: Object.entries(formattedData).map(([k, v]) => ({
          column1: k,
          column2: v,
        })),
      };
      const url = `${import.meta.env.VITE_HOSTED_API_URL}/sendemails/export`;
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("AccessToken")}`,
        },

        body: JSON.stringify(payload),
      });
    } catch (e) {
      console.log(e, "error in email export");
    }
  };

  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const endpoint = `${
          import.meta.env.VITE_HOSTED_API_URL
        }/api/form-designer/dynamic/get`;

        const activeUser = JSON.parse(localStorage.getItem("activeUserData"));
        const userId = activeUser?.id;

        const params = {
          activeTable,
          tabName,
          activeNav: localStorage.getItem("activeNav"),
          userId,
        };

        const response = await axios.get(endpoint, { params });

        if (response.data?.success && response.data.data) {
          const saved = response.data.data;

          const cleaned = {};
          Object.entries(saved).forEach(([key, value]) => {
            try {
              cleaned[key] = JSON.parse(value);
            } catch {
              cleaned[key] = value;
            }
          });

          const allowedKeys = formFields.map((f) => f.name);

          const filtered = Object.keys(cleaned)
            .filter((key) => allowedKeys.includes(key))
            .reduce((obj, key) => {
              obj[key] = cleaned[key];
              return obj;
            }, {});

          setFormValues({
            ...filtered,
            activeTable,
            tabName,
            activeNav: params.activeNav,
            activeUserData: localStorage.getItem("activeUserData"),
            record_id: saved.record_id,
          });
        }
      } catch (error) {
        console.error("❌ Error fetching saved data:", error);
      }
    };

    fetchExistingData();
  }, [activeTable, tabName]);

  const handleButtonClick = async (btn) => {
    const label = btn.label?.toLowerCase();

    if (label === "export") {
      setExportModalOpen(true);
      return;
    }

    if (label === "email") {
      alert("Email coming soon.");
      return;
    }

    if (!btn.apiEndpoint) {
      alert("Button has no API endpoint.");
      return;
    }

    try {
      setLoadingBtn(btn._id);

      const payload = {
        ...formValues,
        activeTable,
        tabName,
        activeNav: localStorage.getItem("activeNav"),
        userId: JSON.parse(localStorage.getItem("activeUserData"))?.id,
        activeUserData: localStorage.getItem("activeUserData"),
      };

      const hasFile = Object.values(payload).some(
        (v) => v instanceof File || v instanceof Blob
      );

      const method = (btn.apiMethod || "POST").toUpperCase();
      const endpoint = `${import.meta.env.VITE_HOSTED_API_URL}${
        btn.apiEndpoint
      }`;

      let config = { url: endpoint, method };

      if (hasFile) {
        // const fd = new FormData();
console.log(payload)
        // Object.entries(payload).forEach(([key, value]) => {
        //   if (value === undefined || value === null) {
        //     fd.append(key, "");
        //     return;
        //   }

        //   if (value instanceof File || value instanceof Blob) {
        //     fd.append(key, value);
        //     return;
        //   }

        //   if (typeof value === "object") {
        //     if (Array.isArray(value)) {
        //       fd.append(key, JSON.stringify(value));
        //     } else if (Object.keys(value).length === 0) {
        //       return;
        //     } else {
        //       fd.append(key, JSON.stringify(value));
        //     }
        //     return;
        //   }

        //   // 4) Everything else → string
        //   fd.append(key, String(value));
        // });

        config.data = payload;
        config.headers = {
          "Content-Type": "multipart/form-data",
        };
      } else {
        config.data = payload;
      }

      console.log(config)
      const resp = await axios(config);

      if (resp?.data?.success) alert(`${btn.label} successful!`);
      else alert(resp?.data?.message || "API Unknown Error");
    } catch (err) {
      alert(err?.response?.data?.message || err.message);
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
      <EmailModel
        open={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        onSelect={sendEmailExport}
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
                  : "!bg-blue-600 hover:!bg-blue-700"
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
