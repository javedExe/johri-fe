import React from "react";

// Utility: Convert array of objects to CSV string
function convertToCSV(data) {
  if (!data || !data.length) return '';
  const keys = Object.keys(data[0]);
  const prettify = (str) =>
    str.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    
  const header = keys.map(prettify).join(",");
  
  const rows = data.map(row => 
    keys.map(k => {
      let val = row[k] ?? "";
      if (Array.isArray(val) || (typeof val === "object" && val !== null)) {
        val = JSON.stringify(val);
      }
      if (typeof val === "string" && (val.includes(",") || val.includes('\n') || val.includes('"'))) {
        val = `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    }).join(",")
  );
  
  return [header, ...rows].join("\n");
}



// Reusable export button
function ExportToCSV({ data, filename = "exports.csv", children, ...rest }) {
  const handleDownload = () => {
    if (!data || !data.length) return;
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={!data || data.length === 0}
      className={rest.className || "border border-[#D9D9D9] text-sm px-4 py-1 rounded-md text-gray-600 flex gap-2 items-center cursor-pointer"}
    >
      {children || "Export"}
    </button>
  );
}


export default ExportToCSV;