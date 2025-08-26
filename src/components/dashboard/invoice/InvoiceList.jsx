import React from "react";
import Pagination from "../../../utils/Pagination";
import usePagination from "../../../utils/usePagination";
import StatusView from "./utils/StatusView";
import InvoiceDetailsModal from "./utils/InvoiceDetailsModal";
import { useEffect, useRef } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { GoDownload } from "react-icons/go";


// function InvoiceList({ data, openProductModel}) {
function InvoiceList({ data, setShowInvoice, showInvoice }) {
  const tableRef = useRef(null);

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

  return (
    <>
      <div
        className="px-4 top-[162px] fixed bg-white py-3 flex flex-col w-[calc(100%-329px)] sm:flex-row flex-wrap items-center gap-4 lg:fixed lg:top-[162px] lg:left-[297px] lg:h-[48px] lg:flex lg:items-center lg:space-x-2 lg:whitespace-nowrap z-30"
        style={{
          width: window.innerWidth >= 1024 ? "calc(100% - 297px)" : "100%",
        }}
      >


        {showInvoice &&      
          <InvoiceDetailsModal
            onClose={() => setShowInvoice(false)}
            // invoice={yourInvoiceObject}
          />
        }


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
                    {/* <MdArrowDownward className="w-4 h-4 text-gray-500" /> */}
                  </div>
                </th>
                <th className="min-w-[150px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
                  <div className="flex items-center gap-1">Order Type</div>
                </th>
                <th className="min-w-[150px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
                  Sellet Type
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
              {paginatedData.map((row, index) => (
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
                    {row.transactionId} <br />{" "}
                    <span className="text-[#817e7e] text-xs">{row.type}</span>
                  </td>
                  <td className="min-w-[150px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap">
                    {row.orderType}
                  </td>
                  <td className="min-w-[150px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap">
                    {row.sellerType}
                  </td>
                  <td className="min-w-[200px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap flex gap-2">
                    {row.sellerName}
                  </td>
                  <td className="min-w-[150px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap">
                    {row.dateTime}
                  </td>

                  <td className="min-w-[210px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap text-center">
                    ₹ {row.amount}
                  </td>

                  <td className="min-w-[210px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap flex gap-2">
                    {/* {row.status} */}
                    <StatusView value={row.status} />
                  </td>

                  <td className="min-w-[150px] px-4 py-3 sticky right-0 bg-white text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap">
                   <div className="flex gap-5 items-center justify-center text-2xl">
                    <MdOutlineRemoveRedEye 
                      className="cursor-pointer hover:text-blue-500" 
                      onClick={() => setShowInvoice(true)}
                    />
                    <GoDownload className="cursor-pointer hover:text-green-500" />
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
