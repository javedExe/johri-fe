const exportToCSV = (data = [], filename = "export.csv") => {
  if (!data.length) {
    console.warn("No data to export.");
    return;
  }

  const headers = Object.keys(data[0]);
  const csvRows = [];

  // Add the header row
  csvRows.push(headers.join(","));

  // Add data rows
  for (const row of data) {
    const values = headers.map((key) => {
      const val = row[key] ?? ""; // Handle null/undefined
      // Wrap in double quotes and escape internal quotes
      return `"${String(val).replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(","));
  }

  // Create a CSV Blob
  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });

  // Trigger file download
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  // Cleanup
  URL.revokeObjectURL(url);
};

export default exportToCSV;
