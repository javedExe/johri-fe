import React, { useState, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import { BsPeople } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { LiaFileExportSolid } from "react-icons/lia";

const InvoiceFilters = ({ data, setData, isFilterActive, selectedInvoice }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [dateOfInvoice, setDateOfInvoice] = useState("");
  const inputRef = useRef(null);
  const dateRef = useRef(null);

  console.log("Selected User: ", selectedInvoice);

  const handleDateChange = (e) => {
    let newDate = e.target.value;
    setDateOfInvoice(newDate);
    filterData(searchValue, selectedStatus, newDate);
  };

  const handleStatusFilter = (e) => {
    const status = e.target.value;

    if (!status) {
      isFilterActive(false);
    } else {
      isFilterActive(true);
    }
    setSelectedStatus(status);
    filterData(searchValue, status, dateOfInvoice);
  };

  const handleSearchFilter = (e) => {
    e.preventDefault();
    const value = e.target.value;

    if (!value) {
      isFilterActive(false);
    } else {
      isFilterActive(true);
    }

    setSearchValue(value);
    filterData(value, selectedStatus, dateOfInvoice);
  };

  const filterData = (search, status, date) => {
    let filtered = data;

    if (search) {
      const lowerSearch = String(search).toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.transaction_id.toLowerCase().includes(lowerSearch) ||
          String(item.total).toLowerCase().includes(lowerSearch) ||
          item.seller_name.toLowerCase().includes(lowerSearch)
      );
    }

    if (status) {
      filtered = filtered.filter((j) => j.payment_status === status);
    }

    if (date) {
      let dateMatching = new Date(date);

      filtered = filtered.filter((t) => {
        const tDate = new Date(t.invoice_date);
        return tDate >= dateMatching;
      });
    }

    setData(filtered);
  };

  return (
    // <div
    //   className="px-4 top-[115px] fixed bg-white py-3 flex flex-col w-[calc(100%-329px)] sm:flex-row flex-wrap items-center gap-4 md:fixed md:top-[115px] md:left-[297px] md:flex md:items-center md:space-x-2 md:whitespace-nowrap z-30"
    //   //  md:h-[48px]
    //   style={{
    //     width: window.innerWidth >= 768 ? "calc(100% - 297px)" : "100%",
    //   }}
    // >
    //   {/* Search */}
    //   <div className="flex items-center w-full sm:w-auto sm:flex-1">
    //     <div
    //       className={`flex items-center border border-[#D9D9D9] rounded bg-white transition-all duration-300 ease-in-out ps-2 cursor-pointer ${
    //         isExpanded ? "w-full sm:w-95 rounded-md" : "w-[42px]"
    //       } h-[32px]`}
    //       onClick={() => {
    //         setIsExpanded(true);
    //         setTimeout(() => inputRef.current?.focus(), 0);
    //       }}
    //     >
    //       <IoIosSearch className="w-[20px] h-[20px] text-[#00000073]" />
    //       <input
    //         ref={inputRef}
    //         type="text"
    //         value={searchValue}
    //         onChange={handleSearchFilter}
    //         onBlur={() => setIsExpanded(false)}
    //         placeholder="Search"
    //         className={`ml-2 bg-transparent outline-none text-sm text-[#000000] placeholder:text-[#00000073] transition-all duration-300 ease-in-out ${
    //           isExpanded ? "w-full opacity-100" : "w-0 opacity-0"
    //         }`}
    //         onFocus={() => setIsExpanded(true)}
    //       />
    //     </div>
    //   </div>

    //   {/* Filters Section */}
    //   <div className="flex gap-4 w-full sm:w-auto sm:flex-row sm:justify-end">

    //     {/* New Date Picker UI */}
    //     <div className="flex items-center border border-gray-300 px-3 rounded-md gap-2 bg-white w-fit text-gray-600 text-sm">

    //       {/* Date */}
    //       <span
    //         className="cursor-pointer"
    //         onClick={() =>
    //           dateRef.current.showPicker?.() || dateRef.current.click()
    //         }
    //       >
    //         {dateOfInvoice || "Select Date"}
    //       </span>
    //       <input
    //         ref={dateRef}
    //         type="date"
    //         value={dateOfInvoice}
    //         onChange={(e) => handleDateChange(e)}
    //         className="absolute opacity-0"
    //         style={{ pointerEvents: "none" }}
    //       />

    //       {/* Calendar Icon */}
    //       <FaCalendarAlt
    //         className="text-gray-600 cursor-pointer"
    //         onClick={() =>
    //           dateRef.current.showPicker?.() || dateRef.current.click()
    //         }
    //       />
    //     </div>

    //     {/* Status Filter */}
    //     <div className="relative w-full sm:w-[128px] transition-all duration-300">
    //       <select
    //         className="appearance-none border border-[#D9D9D9] text-sm h-[32px] px-[12px] py-[5px] pr-6 rounded-[6px] text-black/70 hover:bg-[#0000000A] w-full"
    //         onChange={handleStatusFilter}
    //       >
    //         <option value="">Status</option>
    //         <option value="Paid">Paid</option>
    //         <option value="Pending">Pending</option>
    //         <option value="Overdue">Overdue</option>
    //         <option value="Cancelled">Cancelled</option>
    //       </select>
    //       <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
    //         <span className="block w-2 h-2 border-t-2 border-r-2 border-gray-600 transform rotate-135"></span>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Buttons Section */}
    //   <div className="border border-[#D9D9D9] text-sm px-4 py-1 rounded-md text-gray-600 flex gap-2 items-center cursor-pointer">
    //     <LiaFileExportSolid className="text-lg" /> Export
    //   </div>
    // </div>

    <div className="px-4 w-full bg-white py-3 flex flex-col sm:flex-row flex-wrap items-center gap-4  md:flex md:items-center md:space-x-2 md:whitespace-nowrap z-10">
      <div className="ms-2 flex justify-center items-center gap-3">
        <BsPeople size={20} /> Invoices ({data.length})
        {selectedInvoice >= 0 ? (
          ""
        ) : (
          <span className="flex items-center border border-[#D9D9D9] rounded bg-white cursor-pointer px-2 ms-2">
            Bulk Action
          </span>
        )}
      </div>

      {/* Search */}
      <div className="flex items-end w-full sm:w-auto sm:flex-1 justify-end">
        <div
          className={`flex items-center border border-[#D9D9D9] rounded bg-white transition-all duration-300 ease-in-out ps-2 cursor-pointer ${
            isExpanded ? "w-50 md:w-80 lg:w-95 rounded-md" : "w-[42px]"
          } h-[32px]`}
          onClick={() => {
            setIsExpanded(true);
            setTimeout(() => inputRef.current?.focus(), 0);
          }}
        >
          <IoIosSearch className="w-[20px] h-[20px] text-[#00000073]" />
          <input
            ref={inputRef}
            type="text"
            value={searchValue}
            onChange={handleSearchFilter}
            onBlur={() => setIsExpanded(false)}
            placeholder="Search"
            className={`ml-2 bg-transparent outline-none text-sm text-[#000000] placeholder:text-[#00000073] transition-all duration-300 ease-in-out ${
              isExpanded ? "w-full opacity-100" : "w-0 opacity-0"
            }`}
            onFocus={() => setIsExpanded(true)}
          />
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex gap-4 w-full sm:w-auto sm:flex-row sm:justify-end">
        {/* New Date Picker UI */}
        <div className="flex items-center border border-gray-300 px-3 rounded-md gap-2 bg-white w-fit text-gray-600 text-sm">
          {/* Date */}
          <span
            className="cursor-pointer"
            onClick={() =>
              dateRef.current.showPicker?.() || dateRef.current.click()
            }
          >
            {dateOfInvoice || "Select Date"}
          </span>
          <input
            ref={dateRef}
            type="date"
            value={dateOfInvoice}
            onChange={(e) => handleDateChange(e)}
            className="absolute opacity-0"
            style={{ pointerEvents: "none" }}
          />

          {/* Calendar Icon */}
          <FaCalendarAlt
            className="text-gray-600 cursor-pointer"
            onClick={() =>
              dateRef.current.showPicker?.() || dateRef.current.click()
            }
          />
        </div>

        {/* Status Filter */}
        <div className="relative w-full sm:w-[128px] transition-all duration-300">
          <select
            className="appearance-none border border-[#D9D9D9] text-sm h-[32px] px-[12px] py-[5px] pr-6 rounded-[6px] text-black/70 hover:bg-[#0000000A] w-full"
            onChange={handleStatusFilter}
          >
            <option value="">Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
            <span className="block w-2 h-2 border-t-2 border-r-2 border-gray-600 transform rotate-135"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceFilters;

{
  /* New Date Picker UI */
}
// <div className="flex items-center border border-gray-300 px-3 rounded-md gap-2 bg-white w-fit text-gray-600 text-sm">

//   {/* Date */}
//   <span
//     className="cursor-pointer"
//     onClick={() =>
//       dateRef.current.showPicker?.() || dateRef.current.click()
//     }
//   >
//     {dateOfInvoice || "Select Date"}
//   </span>
//   <input
//     ref={dateRef}
//     type="date"
//     value={dateOfInvoice}
//     onChange={(e) => handleDateChange(e)}
//     className="absolute opacity-0"
//     style={{ pointerEvents: "none" }}
//   />

//   {/* Calendar Icon */}
//   <FaCalendarAlt
//     className="text-gray-600 cursor-pointer"
//     onClick={() =>
//       dateRef.current.showPicker?.() || dateRef.current.click()
//     }
//   />
// </div>
