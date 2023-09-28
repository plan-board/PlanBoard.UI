import exportFromJSON from "export-from-json";

const ExportExcel = (nameOfFile, jsonData) => {
    // Define the data you want to export, including headers
    const data = jsonData; 

    // Define the filename for the exported file
    const fileName = nameOfFile;

    // Define the file type (in this case, Excel)
    const exportType = 'xls';

    // Export the data to Excel
    return exportFromJSON({ data, fileName, exportType });
}

export default ExportExcel;