// import { utils, writeFile } from "xlsx";

// const ExportDataOrTemplate = (data, fileName = "export", fileType = "csv") => {
//     console.log(data,"data shoould export ");

//     if (!data || !data.fields || data.fields.length === 0) {
//         alert("Invalid input data");
//         return;
//     }

//     // Extract column headers
//     const columnHeaders = data.fields.map(field => field.name);

//     // Check if actual data rows exist (optional: ensure it's an array)
//     const hasData = Array.isArray(data.rows) && data.rows.length > 0;

//     // Prepare the worksheet data
//     const sheetData = hasData
//         ? [columnHeaders, ...data.rows.map(row => columnHeaders.map(col => row[col] || ""))] // Data exists
//         : [columnHeaders]; // Empty template

//     // Create worksheet & workbook
//     const worksheet = utils.aoa_to_sheet(sheetData);
//     const workbook = utils.book_new();
//     utils.book_append_sheet(workbook, worksheet, "Sheet1");

//     // Generate filename dynamically from tableName if available
//     const finalFileName = data.tableName ? `${data.tableName}_export` : fileName;

//     // Export file based on selected type
//     if (fileType === "csv") {
//         writeFile(workbook, `${finalFileName}.csv`);
//     } else if (fileType === "xlsx") {
//         writeFile(workbook, `${finalFileName}.xlsx`);
//     } else {
//         alert("Unsupported file type");
//     }
// };

// export default ExportDataOrTemplate;

// by sandhya
// import { saveAs } from "file-saver";
// import ExcelJS from "exceljs";

// const ExportDataOrTemplate = async (data, fileName = "export", fileType = "xlsx") => {
//     console.log(data, "data should export");

//     // Normalize if data is an array
//     if (Array.isArray(data)) {
//         if (data.length === 0) {
//             alert("No data available to export");
//             return;
//         }

//         const keys = Object.keys(data[0]);

//         data = {
//             fields: keys.map(k => ({ name: k })),
//             rows: data,
//             tableName: fileName
//         };
//     }

//     if (!data || !data.fields || data.fields.length === 0) {
//         alert("Invalid input data");
//         return;
//     }

//     // Prettify header names
//     const formatHeader = (key) =>
//         key
//             .split("_")
//             .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//             .join(" ");

//     const columnHeaders = data.fields.map(field => formatHeader(field.name));

//     // Create workbook & worksheet
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet("Sheet1");

//     // Add header row
//     const headerRow = worksheet.addRow(columnHeaders);

//     // Apply header styles only if exporting XLSX
//     if (fileType === "xlsx") {
//         headerRow.eachCell((cell) => {
//             cell.font = { bold: true, color: { argb: "FFFFFFFF" } }; // White bold text
//             cell.fill = {
//                 type: "pattern",
//                 pattern: "solid",
//                 fgColor: { argb: "002147" } // Dark Navy Blue background (#002147)
//             };
//             cell.alignment = { horizontal: "center", vertical: "middle" };
//             cell.border = {
//                 top: { style: "thin", color: { argb: "FFFFFFFF" } },
//                 bottom: { style: "thin", color: { argb: "FFFFFFFF" } },
//                 left: { style: "thin", color: { argb: "FFFFFFFF" } },
//                 right: { style: "thin", color: { argb: "FFFFFFFF" } }
//             };
//         });
//     }

//     // Add data rows
//     const hasData = Array.isArray(data.rows) && data.rows.length > 0;
//     if (hasData) {
//         data.rows.forEach(row => {
//             worksheet.addRow(data.fields.map(f => row[f.name] || ""));
//         });
//     }

//     // Auto-adjust column widths
//     worksheet.columns.forEach((column) => {
//         let maxLength = 10;
//         column.eachCell({ includeEmpty: true }, (cell) => {
//             const value = cell.value ? cell.value.toString() : "";
//             if (value.length > maxLength) maxLength = value.length;
//         });
//         column.width = maxLength + 2;
//     });

//     const finalFileName = data.tableName ? `${data.tableName}_export` : fileName;

//     // Export file
//     if (fileType === "csv") {
//         // Warn styles are not supported in CSV
//         alert("Note: CSV format does not support styling such as background color or font styles.");

//         const csvBuffer = await workbook.csv.writeBuffer();
//         saveAs(new Blob([csvBuffer], { type: "text/csv;charset=utf-8" }), `${finalFileName}.csv`);
//     } else if (fileType === "xlsx") {
//         const xlsxBuffer = await workbook.xlsx.writeBuffer();
//         saveAs(new Blob([xlsxBuffer]), `${finalFileName}.xlsx`);
//     } else {
//         alert("Unsupported file type");
//     }
// };

// export default ExportDataOrTemplate;
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";

const ExportDataOrTemplate = async (data, fileName = "export", fileType = "xlsx") => {
    console.log(data, "data should export");

    if (Array.isArray(data)) {
        if (data.length === 0) {
            alert("No data available to export");
            return;
        }

        const keys = Object.keys(data[0]);

        data = {
            fields: keys.map(k => ({ name: k })),
            rows: data,
            tableName: fileName
        };
    }

    if (!data || !data.fields || data.fields.length === 0) {
        alert("Invalid input data");
        return;
    }

    // Prettify header names
    const formatHeader = (key) =>
        key
            .split("_")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

    const columnHeaders = data.fields.map(field => formatHeader(field.name));

    // Create workbook & worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    // Add header row
    const headerRow = worksheet.addRow(columnHeaders);

    // Apply header styles only if exporting XLSX
    if (fileType === "xlsx") {
        headerRow.eachCell((cell) => {
            cell.font = { bold: true, color: { argb: "FFFFFFFF" } }; // White bold text
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "002147" } // Dark Navy Blue background (#002147)
            };
            cell.alignment = { horizontal: "center", vertical: "middle" };
            cell.border = {
                top: { style: "thin", color: { argb: "FFFFFFFF" } },
                bottom: { style: "thin", color: { argb: "FFFFFFFF" } },
                left: { style: "thin", color: { argb: "FFFFFFFF" } },
                right: { style: "thin", color: { argb: "FFFFFFFF" } }
            };
        });
    }

    // Add data rows
    const hasData = Array.isArray(data.rows) && data.rows.length > 0;
    if (hasData) {
        data.rows.forEach(row => {
            worksheet.addRow(data.fields.map(f => row[f.name] || ""));
        });
    }

    // Auto-adjust column widths
    worksheet.columns.forEach((column) => {
        let maxLength = 10;
        column.eachCell({ includeEmpty: true }, (cell) => {
            const value = cell.value ? cell.value.toString() : "";
            if (value.length > maxLength) maxLength = value.length;
        });
        column.width = maxLength + 2;
    });

    // ✅ Add dropdowns / validation
    const validationConfig = {
        'operational_status': {
            type: "list",
            formulae: ['"In Use,Retired,Maintainence,planned"'],
            errorTitle: "Invalid Status",
            error: "Choose either Active or Inactive",
        },
       "ci_type": {
            type: "list",
            formulae: ['"bussiness_services,application,hardware,networl,cloud_resources,datacenter,databse,middleware,software,use_devices,people,facilities,documents,extended_classes"'],
            errorTitle: "Invalid Value",
            error: "Choose either true or false",
        },
        startDate: {
            type: "date",
            operator: "between",
            formulae: [new Date(2000, 0, 1), new Date(2100, 11, 31)],
            error: "Enter a valid start date",
        },
        endDate: {
            type: "date",
            operator: "between",
            formulae: [new Date(2000, 0, 1), new Date(2100, 11, 31)],
            error: "Enter a valid end date",
        }
    };

    // Loop through headers & apply rules
    columnHeaders.forEach((header, index) => {
        const col = index + 1;
        const fieldName = data.fields[index].name; 
        console.log(fieldName,"field name Here")// use raw field name
        const rule = validationConfig[fieldName];
        console.log(rule,"rule heree")

        if (rule) {
            worksheet.getColumn(col).eachCell((cell, rowNumber) => {
                if (rowNumber > 1) { // skip header
                    worksheet.dataValidations.add(cell.address, {
                        type: rule.type,
                        allowBlank: true,
                        operator: rule.operator,
                        formulae: rule.formulae,
                        showErrorMessage: true,
                        errorStyle: "error",
                        errorTitle: rule.errorTitle || "Invalid Input",
                        error: rule.error || "Invalid value entered",
                    });
                }
            });
        }
    });

    const finalFileName = data.tableName ? `${data.tableName}_export` : fileName;

    // Export file
    if (fileType === "csv") {
        alert("Note: CSV format does not support styling or validation.");
        const csvBuffer = await workbook.csv.writeBuffer();
        saveAs(new Blob([csvBuffer], { type: "text/csv;charset=utf-8" }), `${finalFileName}.csv`);
    } else if (fileType === "xlsx") {
        const xlsxBuffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([xlsxBuffer]), `${finalFileName}.xlsx`);
    } else {
        alert("Unsupported file type");
    }
};

export default ExportDataOrTemplate;



