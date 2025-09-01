import { useState, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import { CiExport } from "react-icons/ci";
import { IoAdd } from "react-icons/io5";
import { AiOutlineLayout } from "react-icons/ai";
import { AiOutlineAppstore } from "react-icons/ai";
// import dummyData from "../dummy";

const ProductFilters = ({
  data,
  setData,
  setView,
  getView,
  addProductModel,
  setEditMode,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const inputRef = useRef(null);

  const handleAvailability = (e) => {
    let availability = e.target.value;
    if (availability === "In Stock") {
      availability = true;
    } else if (availability === "Out of Stock") {
      availability = false;
    } else {
      availability = "";
    }
    setSelectedRole(availability);
    filterData(searchValue, availability, selectedStatus, selectedMaterial);
  };

  const handleActionFilter = (e) => {
    const action = e.target.value;
    setSelectedStatus(action);
    filterData(searchValue, selectedRole, action, selectedMaterial);
  };
  const handleMaterialFilter = (e) => {
    const material = e.target.value;
    setSelectedMaterial(material);
    filterData(searchValue, selectedRole, selectedStatus, material);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    const value = e.target.value;

    if (value === "") {
      setSelectedRole("");
      setSelectedStatus("");
    }

    setSearchValue(value);
    filterData(value, selectedRole, selectedStatus, selectedMaterial);
  };

  const filterData = (search, availability, action, material) => {
    let filtered = data;
    if (search) {
      const lowerSearch = String(search).toLowerCase();
      filtered = filtered.filter(
        (j) =>
          j.name.toLowerCase().includes(lowerSearch) ||
          j.sku.toLowerCase().includes(lowerSearch) ||
          j.seller_name.toLowerCase().includes(lowerSearch) ||
          j.weight.toLowerCase().includes(lowerSearch) ||
          j.price.toLowerCase().includes(lowerSearch)
      );
    }
    if (availability !== "" && availability !== undefined)
      filtered = filtered.filter((j) => j.availability === availability);
    if (action) filtered = filtered.filter((j) => j.status === action);
    if (material) {
      filtered = filtered.filter((j) => j.materials.includes(material));
    }
    setData(filtered);

    // setData(filtered);
  };

  const handleAddProduct = () => {
    setEditMode();
    addProductModel();
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
          className={`flex items-center border border-[#D9D9D9] rounded bg-white transition-all duration-300 ease-in-out ps-2 cursor-pointer ${
            isExpanded ? "w-full sm:w-65 rounded-md" : "w-[42px]"
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
        {/* Availability Filter */}
        <div className="relative w-full sm:w-[128px] transition-all duration-300">
          <select
            className="appearance-none border border-[#D9D9D9] text-sm h-[32px] px-[12px] py-[5px] pr-6 rounded-[6px] text-black/70 hover:bg-[#0000000A] w-full"
            onChange={handleAvailability}
          >
            <option value="">Availability</option>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
            <span className="block w-2 h-2 border-t-2 border-r-2 border-gray-600 transform rotate-135"></span>
          </div>
        </div>

        {/* Material type Filter */}
        <div className="relative w-full sm:w-[128px] transition-all duration-300">
          <select
            className="appearance-none border border-[#D9D9D9] text-sm h-[32px] px-[12px] py-[5px] pr-6 rounded-[6px] text-black/70 hover:bg-[#0000000A] w-full"
            onChange={handleMaterialFilter}
          >
            <option value="">Material type</option>
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
            <option value="Platinum">Platinum</option>
            <option value="Gemstone">Gemstone</option>
            <option value="Diamond">Diamond</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
            <span className="block w-2 h-2 border-t-2 border-r-2 border-gray-600 transform rotate-135"></span>
          </div>
        </div>

        {/* Action Filter */}
        <div className="relative w-full sm:w-[128px] transition-all duration-300">
          <select
            className="appearance-none border border-[#D9D9D9] text-sm h-[32px] px-[12px] py-[5px] pr-6 rounded-[6px] text-black/70 hover:bg-[#7c65650a] w-full"
            onChange={handleActionFilter}
          >
            <option value="">Action</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
            <span className="block w-2 h-2 border-t-2 border-r-2 border-gray-600 transform rotate-135"></span>
          </div>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex gap-4 w-full sm:w-auto sm:flex-row sm:justify-end transition-all duration-300  ">
        {/* Export Button */}
        <button
          className="group flex items-center justify-around gap-1 w-full sm:w-[92px] h-[32px] rounded-[6px] px-[12px] bg-white border border-[#D9D9D9] transition-transform transform hover:scale-105 "
          onClick={setView}
        >
          {/* <CiExport className="w-[16px] h-[16px] rotate-90 " />
          <span className="text-[14px] text-black/70 ">Export</span> */}
          <AiOutlineLayout
            className={`w-[22px] h-[22px] ${getView ? "" : "text-[#C2ADEB]"}`}
          />
          <AiOutlineAppstore
            className={`w-[22px] h-[22px] ${getView ? "text-[#C2ADEB]" : ""}`}
          />
        </button>

        {/* Add Product Button */}
        <button
          className="group flex items-center justify-center gap-2 w-full sm:w-[130px] h-[32px] rounded-[6px] px-[12px] bg-[#EDDD8A] border border-[#DDBF22] transition-transform transform hover:scale-105"
          onClick={handleAddProduct}
        >
          <IoAdd className="w-[16px] h-[16px]" />
          <span className="text-[14px] font-normal text-[#2C2607]">
            Add Product
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;
