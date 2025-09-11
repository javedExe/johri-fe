import React, { useState } from "react";
import Pagination from "../../../utils/Pagination";
import usePagination from "../../../utils/usePagination";
import StatusView from "./utils/StatusView";
import InvoiceDetailsModal from "./utils/InvoiceDetailsModal";
import { useEffect, useRef } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { GoDownload } from "react-icons/go";
import axios from "../../../utils/axiosInstance";

function InvoiceList({ data, setShowInvoice, showInvoice, isFilterActive, loading }) {
  const tableRef = useRef(null);
  const [invoiceId, setInvoiceId] = useState(null);

  const {
    paginatedData,
    page: currentPage,
    limit: recordsPerPage,
    handlePageChange,
    // totalPages,
  } = usePagination(data, 1, 10);

  // Scroll to top of table on page change
  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollTop = 0;
    }
  }, [currentPage]);

  let handleInvoiceItem = (id) => {
    setInvoiceId(id);
    setShowInvoice(true);
  };

const downloadInvoice = async (invoiceId) => {
  try {
    const response = await axios.get(`/api/invoices/${invoiceId}/download`, {
      withCredentials: true,
      responseType: 'blob',
    });

    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const url = window.URL.createObjectURL(blob);

    const disposition = response.headers['content-disposition'];
    let filename = `invoice_${invoiceId}.pdf`;

    if (disposition && disposition.indexOf('filename=') !== -1) {
      const filenameMatch = disposition.match(/filename="?([^"]+)"?/);
      if (filenameMatch && filenameMatch.length > 1) {
        filename = filenameMatch[1];
      }
    }

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download error:', error);
    alert('Failed to download invoice. Please try again.');
  }
};


  return (
    <>
      <div
        className="px-4 top-[162px] fixed bg-white py-3 flex flex-col w-[calc(100%-329px)] sm:flex-row flex-wrap items-center gap-4 lg:fixed lg:top-[162px] lg:left-[297px] lg:h-[48px] lg:flex lg:items-center lg:space-x-2 lg:whitespace-nowrap z-30"
        style={{
          width: window.innerWidth >= 1024 ? "calc(100% - 297px)" : "100%",
        }}
      >
        {showInvoice && (
          <InvoiceDetailsModal
            onClose={() => setShowInvoice(false)}
            invoiceId={invoiceId}
            downloadInvoice={(id) => downloadInvoice(id)}
          />
        )}

        {/* Scroll container only for table */}
        <div
          className="max-h-[calc(100vh-280px)] overflow-auto border-gray-200 custom-scrollbar"
          ref={tableRef}
        >
          <table className="min-w-full border-collapse table-auto">
            <thead className="sticky top-0 bg-gray-100 z-20 w-full h-[44px] ">
              <tr>
                <th className="w-12 px-2 py-3 text-center whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-purple-500"
                  />
                </th>
                <th className="min-w-[260px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    Transaction ID
                  </div>
                </th>
                <th className="min-w-[150px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
                  <div className="flex items-center gap-1">Order Type</div>
                </th>
                <th className="min-w-[150px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
                  Seller Type
                </th>
                <th className="min-w-[200px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
                  <div className="flex items-center gap-1">Seller Name</div>
                </th>
                <th className="min-w-[150px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
                  <div className="flex items-center gap-1">Date & Time</div>
                </th>
                <th className="min-w-[210px] px-20 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
                  Amount
                </th>
                <th className="min-w-[210px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
                  Status
                </th>

                <th
                  className="min-w-[100px] px-4 py-3 text-center sticky right-0 bg-gray-100 text-[#434956] text-xs font-normal whitespace-nowrap"
                  style={{ zIndex: 30 }}
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {loading && !isFilterActive && paginatedData.length <= 0 && (
                <tr>
                  <td colSpan={5} className="text-center">Loading...</td>
                </tr>
              )}

              {!loading && paginatedData.length <= 0 && (
                <tr>
                  <td colSpan={5} className="text-center">No Data found</td>
                </tr>
              )}

              {paginatedData.length > 0 &&
                paginatedData.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 group"
                  >
                    <td className="w-12 px-2 py-3 text-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-purple-500"
                      />
                    </td>
                    <td className="min-w-[260px] px-4 py-3 text-[#101828] font-inter font-medium text-sm leading-5 tracking-normal whitespace-nowrap">
                      {row.transaction_id} <br />{" "}
                      <span className="text-[#817e7e] text-xs">{row.type}</span>
                    </td>
                    <td className="min-w-[150px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap">
                      {row.order_type}
                    </td>
                    <td className="min-w-[150px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap">
                      {row.seller_type}
                    </td>
                    <td className="min-w-[200px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap flex gap-2">
                      {row.seller_name}
                    </td>
                    <td className="min-w-[150px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap">
                      {row.invoice_date}
                    </td>

                    <td className="min-w-[210px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap text-center">
                      ₹ {row.total}
                    </td>

                    <td className="min-w-[210px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap flex gap-2">
                      <StatusView value={row.payment_status} />
                    </td>

                    <td className="min-w-[150px] px-4 py-3 sticky right-0 bg-white text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap">
                      <div className="flex gap-5 items-center justify-center text-2xl">
                        <MdOutlineRemoveRedEye
                          className="cursor-pointer hover:text-blue-500"
                          onClick={() => handleInvoiceItem(row.id)}
                        />
                        <GoDownload
                          onClick={() => downloadInvoice(row.id)}
                          className="cursor-pointer hover:text-green-500"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination OUTSIDE of the scroll container */}
        <div className="flex justify-center w-full mt-4 mb-8 px-4">
          <Pagination
            totalRecords={data.length}
            currentPage={currentPage}
            recordsPerPage={recordsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}

export default InvoiceList;

