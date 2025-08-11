import React, { useState, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import { LiaFileExportSolid } from "react-icons/lia";
import { FaPlus } from "react-icons/fa6";


const UserFilters = ({ data, setData, formVisible }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedType, setselectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const inputRef = useRef(null);




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
          item.name.toLowerCase().includes(lowerSearch) ||
          String(item.phoneNumber).toLowerCase().includes(lowerSearch) ||
          item.email.toLowerCase().includes(lowerSearch)
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



        {/* Status Filter */}
        <div className="relative w-full sm:w-[128px] transition-all duration-300">
          <select
            className="appearance-none border border-[#D9D9D9] text-sm h-[32px] px-[12px] py-[5px] pr-6 rounded-[6px] text-black/70 hover:bg-[#0000000A] w-full"
            onChange={handleStatusFilter}
          >
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
            <span className="block w-2 h-2 border-t-2 border-r-2 border-gray-600 transform rotate-135"></span>
          </div>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="border border-[#D9D9D9] text-sm px-4 py-1 rounded-md text-gray-600 flex gap-2 items-center cursor-pointer">
        <LiaFileExportSolid className="text-lg" /> Export
      </div>
      {/* Form Buttons */}
      <div className="border border-[#DDBF22] bg-[#EDDD8A] text-sm px-4 py-1 rounded-md text-gray-600 flex gap-2 items-center cursor-pointer"
      onClick={formVisible}
      >
        <FaPlus className="text-lg" /> Add User
      </div>
    </div>
  );
};

export default UserFilters;
