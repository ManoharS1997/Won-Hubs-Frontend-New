import { utils, writeFile } from "xlsx";

const ExportDataOrTemplate = (data, fileName = "export", fileType = "csv") => {
    console.log(data);
    
    if (!data || !data.fields || data.fields.length === 0) {
        alert("Invalid input data");
        return;
    }

    // Extract column headers
    const columnHeaders = data.fields.map(field => field.name);

    // Check if actual data rows exist (optional: ensure it's an array)
    const hasData = Array.isArray(data.rows) && data.rows.length > 0;

    // Prepare the worksheet data
    const sheetData = hasData
        ? [columnHeaders, ...data.rows.map(row => columnHeaders.map(col => row[col] || ""))] // Data exists
        : [columnHeaders]; // Empty template

    // Create worksheet & workbook
    const worksheet = utils.aoa_to_sheet(sheetData);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generate filename dynamically from tableName if available
    const finalFileName = data.tableName ? `${data.tableName}_export` : fileName;

    // Export file based on selected type
    if (fileType === "csv") {
        writeFile(workbook, `${finalFileName}.csv`);
    } else if (fileType === "xlsx") {
        writeFile(workbook, `${finalFileName}.xlsx`);
    } else {
        alert("Unsupported file type");
    }
};

export default ExportDataOrTemplate;
