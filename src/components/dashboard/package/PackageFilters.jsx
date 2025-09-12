import { useState, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";

const PackageFilters = ({ data, setData, addPackageModel, setEditMode, filteredData, selectedUsers }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const inputRef = useRef(null);

  const handleAddForm = () =>{
    
    setEditMode();
    addPackageModel();
  }

  const handleTypeFilter = (e) => {
    const Packagetype = e.target.value;
    setSelectedRole(Packagetype);
    filterData(searchValue, Packagetype, selectedStatus);
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

const filterData = (search, type, status) => {
  let filtered = data;

  if (search) {
    const lowerSearch = String(search).toLowerCase();
    filtered = filtered.filter((j) =>
      j.name.toLowerCase().includes(lowerSearch) ||
      String(j.price).toLowerCase().includes(lowerSearch) ||
      String(j.validity_days).toLowerCase().includes(lowerSearch) ||
      j.target_audience.toLowerCase().includes(lowerSearch)
    );
  }

  if (type) {
    filtered = filtered.filter((j) => j.target_audience === type);
  }

  if (status) {
    const statusBool = status === "true";
    filtered = filtered.filter((j) => j.status === statusBool);
  }

  setData(filtered);
};


  return (
    <div
      // className="px-4 top-[115px] fixed bg-white py-3 flex flex-col w-[calc(100%-329px)] sm:flex-row flex-wrap items-center gap-4 md:fixed md:top-[115px] md:left-[297px] md:flex md:items-center md:space-x-2 md:whitespace-nowrap z-30"
      className="px-4 w-full bg-white py-3 flex flex-col sm:flex-row flex-wrap items-center gap-4  md:flex md:items-center md:space-x-2 md:whitespace-nowrap z-10"
      //  md:h-[48px]
   
    >
      <div className="ms-2 flex justify-center items-center gap-3">
        <BsPeople size={20} /> Packages ({filteredData.length})
        {selectedUsers >= 0 ? (
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


        {/* Plan Type Filter */}
        <div className="relative w-full sm:w-[158px] transition-all duration-300">
          <select
            className="appearance-none border border-[#D9D9D9] text-sm h-[32px] px-[12px] py-[5px] pr-6 rounded-[6px] text-black/70 hover:bg-[#0000000A] w-full"
            onChange={handleTypeFilter}
          >
            <option value="">Target Audience</option>
            <option value="Retailer">Retailer</option>
            <option value="Jeweler">Jeweler</option>
            <option value="End User">End User</option>
            <option value="Retailer">Retailer</option>
            <option value="General">General</option>
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
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
            <span className="block w-2 h-2 border-t-2 border-r-2 border-gray-600 transform rotate-135"></span>
          </div>
        </div>
      </div>

      {/* Buttons Section */}
        {/* Add Product Button */}
      {/* <div className="flex gap-4 w-full sm:w-auto sm:flex-row sm:justify-end transition-all duration-300  ">

        <button className="group flex items-center justify-center gap-2 w-full sm:w-[130px] h-[32px] rounded-[6px] px-[12px] bg-[#EDDD8A] border border-[#DDBF22] transition-transform transform hover:scale-105"
        onClick={handleAddForm}
        >
          <IoAdd className="w-[16px] h-[16px]" />
          <span className="text-[14px] font-normal text-[#2C2607]">
            Add Product
          </span>
        </button>
      </div> */}


    </div>
  );
};

export default PackageFilters;
