import { useState, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import { CiExport } from "react-icons/ci";
import { IoAdd } from "react-icons/io5";
// import dummyData from "../dummy";

const JewelerFilters = ({ data, setData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const inputRef = useRef(null);

  const handleRoleFilter = (e) => {
    const role = e.target.value;
    setSelectedRole(role);
    filterData(searchValue, role, selectedStatus);
  };

  const handleStatusFilter = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    filterData(searchValue, selectedRole, status);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    const value = e.target.value;

    if (value === "") {
      setSelectedRole("");
      setSelectedStatus("");
    }

    setSearchValue(value);
    filterData(value, selectedRole, selectedStatus);
  };

  const filterData = (search, role, status) => {
    let filtered = data;
    if (search) {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(
        (j) =>
          j.businessName.toLowerCase().includes(lowerSearch) ||
          j.businessEmail.toLowerCase().includes(lowerSearch) ||
          j.businessPhone.toLowerCase().includes(lowerSearch) ||
          j.contactName.toLowerCase().includes(lowerSearch)
      );
    }
    if (role) filtered = filtered.filter((j) => j.role === role);
    if (status) filtered = filtered.filter((j) => j.status === status);
    setData(filtered);
    // setSearchValue("");
  };

  return (
    <div
      className="px-4 top-[115px] fixed bg-white py-3 flex flex-col w-[calc(100%-329px)] sm:flex-row flex-wrap items-center gap-4 md:fixed md:top-[115px] md:left-[297px] md:h-[48px] md:flex md:items-center md:space-x-2 md:whitespace-nowrap z-30"
      style={{
        width: window.innerWidth >= 768 ? "calc(100% - 297px)" : "100%",
      }}
    >
      {/* Search */}
      <div className="flex items-center w-full sm:w-auto sm:flex-1">
        <div
          className={`flex items-center border border-[#D9D9D9] rounded bg-white transition-all duration-300 ease-in-out px-2 cursor-pointer ${
            isExpanded ? "w-full sm:w-[426px] rounded-md" : "w-[42px]"
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
            onChange={handleFilter}
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
        {/* Role Filter */}
        <div className="relative w-full sm:w-[128px] transition-all duration-300">
          <select
            className="appearance-none border border-[#D9D9D9] text-sm h-[32px] px-[12px] py-[5px] pr-6 rounded-[6px] text-black/70 hover:bg-[#0000000A] w-full"
            onChange={handleRoleFilter}
          >
            <option value="">Role</option>
            <option value="brand">Brand</option>
            <option value="manufacturer">Manufacturer</option>
            <option value="retailer">Retailer</option>
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
            <span className="block w-2 h-2 border-t-2 border-r-2 border-gray-600 transform rotate-135"></span>
          </div>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex gap-4 w-full sm:w-auto sm:flex-row sm:justify-end transition-all duration-300  ">
        {/* Export Button */}
        <button className="group flex items-center justify-center gap-1 w-full sm:w-[92px] h-[32px] rounded-[6px] px-[12px] bg-white border border-[#D9D9D9] transition-transform transform hover:scale-105 ">
          <CiExport className="w-[16px] h-[16px] rotate-90 " />
          <span className="text-[14px] text-black/70 ">Export</span>
        </button>

        {/* Add Jeweler Button */}
        <button className="group flex items-center justify-center gap-2 w-full sm:w-[130px] h-[32px] rounded-[6px] px-[12px] bg-[#EDDD8A] border border-[#DDBF22] transition-transform transform hover:scale-105">
          <IoAdd className="w-[16px] h-[16px]" />
          <span className="text-[14px] font-normal text-[#2C2607]">
            Add Jeweler
          </span>
        </button>
      </div>
    </div>
  );
};

export default JewelerFilters;
