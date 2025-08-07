import { MdArrowDownward } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
import { IoToggle } from "react-icons/io5";
import StatusTag from "../../utils/StatusTags";
import RoleTag from "../../utils/RoleTag";
import Pagination from "../../utils/Pagination";
import usePagination from "../../utils/usePagination";
import { useEffect, useRef } from "react";

const JewelerTable = ({ data }) => {
  const tableRef = useRef(null);

  const {
    paginatedData,
    page: currentPage,
    limit: recordsPerPage,
    handlePageChange,
    totalPages,
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
        className="px-4 top-[162px] fixed bg-white py-3 flex flex-col w-full sm:flex-row flex-wrap items-center gap-4 lg:fixed lg:top-[162px] lg:left-[297px] lg:h-[48px] lg:flex lg:items-center lg:space-x-2 lg:whitespace-nowrap z-30"
        style={{
          width: window.innerWidth >= 1024 ? "calc(100% - 297px)" : "100%",
        }}
      >
        {/* Scroll container only for table */}
        <div
          className="max-h-[calc(100vh-280px)] overflow-auto border-gray-200 custom-scrollbar"
          ref={tableRef}
        >
          <table className="min-w-full border-collapse table-auto">
            <thead className="sticky top-0 bg-gray-100 z-20 w-full h-[44px] ">
              {/* <div className="overflow-x-auto border-gray-200">
  <table className="min-w-full border-collapse table-auto">
    <thead className="sticky top-0 bg-gray-100 z-20 w-full h-[44px] "> */}
              <tr>
                <th className="w-12 px-2 py-3 text-center whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-purple-500"
                  />
                </th>
                <th className="min-w-[180px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    Business Name{" "}
                    <MdArrowDownward className="w-4 h-4 text-gray-500" />
                  </div>
                </th>
                <th className="min-w-[260px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    Business Email{" "}
                    <MdArrowDownward className="w-4 h-4 text-gray-500" />
                  </div>
                </th>
                <th className="min-w-[180px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
                  Phone Number
                </th>
                <th className="min-w-[200px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    Contact Person Name{" "}
                    <MdArrowDownward className="w-4 h-4 text-gray-500" />
                  </div>
                </th>
                <th className="min-w-[180px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    Contact Person Phone{" "}
                    <MdArrowDownward className="w-4 h-4 text-gray-500" />
                  </div>
                </th>
                <th className="min-w-[280px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
                  Contact Person Email
                </th>
                <th className="min-w-[180px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
                  Number Of Products
                </th>
                <th className="min-w-[180px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    Active Offers{" "}
                    <MdArrowDownward className="w-4 h-4 text-gray-500" />
                  </div>
                </th>
                <th className="min-w-[180px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
                  Role
                </th>
                <th className="min-w-[180px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
                  Status
                </th>
                <th
                  className="min-w-[180px] px-4 py-3 text-center sticky right-0 bg-gray-100 text-[#434956] text-xs font-normal whitespace-nowrap"
                  style={{ zIndex: 30 }}
                >
                  Actions
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
                  <td className="min-w-[180px] px-4 py-3 text-[#101828] font-inter font-medium text-sm leading-5 tracking-normal whitespace-nowrap">
                    {row.businessName}
                  </td>
                  <td className="min-w-[260px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap">
                    {row.businessEmail}
                  </td>
                  <td className="min-w-[180px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap">
                    {row.businessPhone}
                  </td>
                  <td className="min-w-[200px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap">
                    {row.contactName}
                  </td>
                  <td className="min-w-[180px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap">
                    {row.contactPhone}
                  </td>
                  <td className="min-w-[280px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap">
                    {row.contactEmail}
                  </td>
                  <td className="min-w-[180px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap text-center">
                    {row.products}
                  </td>
                  <td className="min-w-[180px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap text-center">
                    {row.activeOffers}
                  </td>
                  <td className="min-w-[180px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap">
                    <RoleTag role={row.role} />
                  </td>
                  <td className="min-w-[180px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap">
                    <StatusTag status={row.status} />
                  </td>
                  <td
                    className="min-w-[180px] px-8 py-3 sticky right-0 bg-white border-b-[#EAECF0] flex items-center justify-between gap-2 group-hover:bg-gray-50"
                    style={{ zIndex: 10 }}
                  >
                    <AiOutlineEdit className="text-gray-600 hover:text-blue-600 cursor-pointer transition-transform duration-150 w-7 h-7 rounded-[4px] shadow-[1px_2px_4px_0px_#0000000F]" />
                    <FiTrash className=" text-gray-600 hover:text-[#FF4D4F] hover:bg-[#FFF2F0] cursor-pointer transition-transform duration-150 w-9 h-9 p-1 rounded-[4px] shadow-[1px_2px_4px_0px_#0000000F]" />
                    <IoToggle className="w-7 h-7 text-[#1677FF] cursor-pointer" />
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
};

export default JewelerTable;
