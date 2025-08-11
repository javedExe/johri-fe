import React, { useState, useRef, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { LiaFileExportSolid } from "react-icons/lia";


const InvoiceFilters = ({ data, setData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedType, setselectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const inputRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);



  // Filter data based on date range
function filterInvoiceByDate(transactions, startDate, endDate) {
  if (!startDate || !endDate) return transactions; 

  const start = new Date(startDate);
  const end = new Date(endDate);

  return transactions.filter((t) => {
    const tDate = new Date(t.dateTime); 
    return tDate >= start && tDate <= end;
  });
}


useEffect(()=>{
    const dateFilter = filterInvoiceByDate(data, startDate, endDate);
    setData(dateFilter);
}, [startDate, endDate]);


  const handleTypeFilter = (e) => {
    const bullionType = e.target.value;
    setselectedType(bullionType);
    filterData(searchValue, bullionType, selectedStatus);
  };

  const handleStatusFilter = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    filterData(searchValue, selectedType, status);
  };

  const handleSearchFilter = (e) => {
    e.preventDefault();
    const value = e.target.value;

    if (value === "") {
      setselectedType("");
      setSelectedStatus("");
    }

    setSearchValue(value);
    filterData(value, selectedType, selectedStatus);
  };

  const filterData = (search, type, status) => {
    let filtered = data;

    if (search) {
      const lowerSearch = String(search).toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.transactionId.toLowerCase().includes(lowerSearch) ||
          String(item.amount).toLowerCase().includes(lowerSearch) ||
          item.sellerName.toLowerCase().includes(lowerSearch)
      );
    }


    if (status) {
      filtered = filtered.filter((j) => j.status === status);
    }

    setData(filtered);
  };

  return (
    <div
      className="px-4 top-[115px] fixed bg-white py-3 flex flex-col w-[calc(100%-329px)] sm:flex-row flex-wrap items-center gap-4 md:fixed md:top-[115px] md:left-[297px] md:flex md:items-center md:space-x-2 md:whitespace-nowrap z-30"
      //  md:h-[48px]
      style={{
        width: window.innerWidth >= 768 ? "calc(100% - 297px)" : "100%",
      }}
    >
      {/* Search */}
      <div className="flex items-center w-full sm:w-auto sm:flex-1">
        <div
          className={`flex items-center border border-[#D9D9D9] rounded bg-white transition-all duration-300 ease-in-out px-2 cursor-pointer ${
            isExpanded ? "w-full sm:w-95 rounded-md" : "w-[42px]"
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
        {/* Date Picker UI */}
        <div className="flex items-center border border-gray-300 px-3 rounded-md gap-2 bg-white w-fit text-gray-600 text-sm">
          {/* Start Date */}
          <span
            className="cursor-pointer"
            onClick={() =>
              startRef.current.showPicker?.() || startRef.current.click()
            }
          >
            {startDate || "Start Date"}
          </span>
          <input
            ref={startRef}
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="absolute opacity-0"
            style={{ pointerEvents: "none" }}
          />

          <span>→</span>

          {/* End Date */}
          <span
            className="cursor-pointer"
            onClick={() =>
              endRef.current.showPicker?.() || endRef.current.click()
            }
          >
            {endDate || "End Date"}
          </span>
          <input
            ref={endRef}
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="absolute opacity-0"
            style={{ pointerEvents: "none" }}
          />

          {/* Calendar Icon */}
          <FaCalendarAlt
            className="text-gray-600 cursor-pointer"
            onClick={() =>
              startRef.current.showPicker?.() || startRef.current.click()
            }
          />
        </div>

        {/* Bullion Type Filter */}
        <div className="relative w-full sm:w-[128px] transition-all duration-300">
          <select
            className="appearance-none border border-[#D9D9D9] text-sm h-[32px] px-[12px] py-[5px] pr-6 rounded-[6px] text-black/70 hover:bg-[#0000000A] w-full"
            onChange={handleTypeFilter}
          >
            <option value="">Bullion Type</option>
            <option value="gold">Gold Bullion</option>
            <option value="silver">Silver Bullion</option>
            <option value="palladium">Palladium Bullion</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
            <span className="block w-2 h-2 border-t-2 border-r-2 border-gray-600 transform rotate-135"></span>
          </div>
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

      {/* Buttons Section */}
      <div className="border border-[#D9D9D9] text-sm px-4 py-1 rounded-md text-gray-600 flex gap-2 items-center cursor-pointer">
        <LiaFileExportSolid className="text-lg" /> Export
      </div>
    </div>
  );
};

export default InvoiceFilters;
