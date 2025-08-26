import React from "react";

function InvoiceDetailsModal({
  onClose,
  invoice = {
    transactionId: "GSV567489240UI",
    date: "March 13, 2014",
    sellerName: "Seller name",
    paymentStatus: "Paid",
    bullionType: "Gold",
    subscriptionStatus: "Active",
    items: [
      { description: "Gold thing", quantity: 1, unitPrice: 90.0, total: 90.0 },
      { description: "Service Fee", quantity: 1, unitPrice: 10.0, total: 10.0 },
    ],
    subtotal: 100.0,
    tax: 5.0,
    totalAmount: 105.0,
    // pdfUrl: '/api/invoice/download/xyz'  // If you implement download logic
  },
  onDownloadPDF = () => alert("Download PDF not implemented"),
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-lg w-[630px] p-6 relative overflow-y-auto max-h-[98vh]">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2 mb-4 border-[#D9D9D9]">
          <h2 className="text-xl font-semibold">Invoice Details</h2>
          <button
            onClick={onClose}
            className="text-[#666666] hover:text-black text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Invoice Info */}
        <div className="grid grid-cols-2 gap-y-1 text-sm mb-4">
          <div>
            <div>
              <span className="font-medium">Transaction ID:</span>
              <span className="ml-1 text-[#666666]">
                {invoice.transactionId}
              </span>
            </div>

            <div className="mt-2">
              <span className="font-medium">Seller Name:</span>
              <span className="ml-1 text-[#666666]">{invoice.sellerName}</span>
            </div>

            <div className="mt-2">
              <span className="font-medium">Bullion Type:</span>
              <span className="ml-1 text-[#666666]">{invoice.bullionType}</span>
            </div>

            <div className="mt-2">
              <span className="font-medium">Subscription Status:</span>
              <span className="ml-1 text-[#666666]">
                {invoice.subscriptionStatus}
              </span>
            </div>
          </div>

          <div>
            <div>
              <span className="font-medium">Date:</span>
              <span className="ml-1 text-[#666666]">{invoice.date}</span>
            </div>

            <div className="mt-2">
              <span className="font-medium">Payment Status:</span>
              <span className="ml-1">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                  {invoice.paymentStatus}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="border-t-1 py-6 mt-5 border-b-1 border-[#D9D9D9]">
          <h3 className="font-medium mb-2">Items:</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="mb-5">
                <tr className="text-[#666666] text-xs">
                  <th className="text-left font-medium py-1">Description</th>
                  <th className="text-left font-medium py-1">Quantity</th>
                  <th className="text-left font-medium py-1">Unit Price</th>
                  <th className="text-left font-medium py-1">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, idx) => (
                  <tr key={idx} className="">
                    <td className="py-1">{item.description}</td>
                    <td className="py-1 text-center pe-4">{item.quantity}</td>
                    <td className="py-1">${item.unitPrice.toFixed(2)}</td>
                    <td className="py-1">${item.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals */}
        <div className="flex flex-col items-end mt-4 text-sm">
          <div className="flex w-64 justify-between py-0.5">
            <span className="text-[#666666]">Subtotal:</span>
            <span className="text-[#666666]">${invoice.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex w-64 justify-between py-0.5">
            <span className="text-[#666666]">Tax (5%):</span>
            <span className="text-[#666666]">${invoice.tax.toFixed(2)}</span>
          </div>
          <div className="flex w-64 justify-between font-semibold py-1">
            <span className="">Total Amount:</span>
            <span className="text-lg">${invoice.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-7">
          <button
            className="w-full border rounded px-4 py-2 text-sm border-[#1C1C3A]"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="w-full bg-[#1C1C3A] text-white rounded px-4 py-2 text-sm font-semibold"
            onClick={onDownloadPDF}
            // you can also use: onClick={() => window.open(invoice.pdfUrl, "_blank")}
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetailsModal;
