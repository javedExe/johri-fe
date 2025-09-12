import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { CiExport } from "react-icons/ci";
import useDashboardStore from "../../../store/useDashboardStore";
import axiosInstance from "../../../utils/axiosInstance";

const UserFilters = () => {
  const { search, status, setSearch, setStatus, setPage, page, limit } =
    useDashboardStore();

  const openUserModal = useDashboardStore((state) => state.openUserModal);

  const [localSearch, setLocalSearch] = useState(search || "");
  const [localStatus, setLocalStatus] = useState(status || "");
  const [isExpanded, setIsExpanded] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef(null);

  // Utility function to update URL params consistently
  const updateSearchParams = (searchVal, statusVal, pageVal = "1") => {
    const newParams = new URLSearchParams(searchParams.toString());

    searchVal?.trim()
      ? newParams.set("search", searchVal.trim())
      : newParams.delete("search");
    statusVal ? newParams.set("status", statusVal) : newParams.delete("status");

    newParams.set("page", pageVal);
    setSearchParams(newParams);
  };

  // Sync global store + local state from URL when mounted or changed
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlStatus = searchParams.get("status") || "";

    setSearch(urlSearch);
    setStatus(urlStatus);
    setLocalSearch(urlSearch);
    setLocalStatus(urlStatus);
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedSearch = localSearch.trim();

    setSearch(trimmedSearch);
    setStatus(localStatus);
    setPage(1);

    updateSearchParams(trimmedSearch, localStatus);
    setIsExpanded(false);
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setLocalStatus(value);
    setStatus(value);
    setPage(1);

    updateSearchParams(localSearch, value);
  };

  const handleAddClick = () => {
    openUserModal("add", null);
  };

  const handleExportCSV = async () => {
    try {
      const params = {
        search: search || "",
        status: status || "",
        page,
        limit,
      };

      const response = await axiosInstance.get(
        "/admin/dashboard/users/export",
        {
          params,
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], {
        type: "text/csv;charset=utf-8;",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "users.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting CSV:", error);
      alert("Failed to export CSV");
    }
  };

  return (
    <div
      className="px-4 top-[115px] fixed bg-white py-3 flex flex-col w-full sm:flex-row flex-wrap items-center gap-4 md:fixed md:top-[115px] md:left-[297px] md:h-[48px] md:flex md:items-center md:space-x-2 md:whitespace-nowrap z-30"
      style={{
        width: window.innerWidth >= 768 ? "calc(100% - 297px)" : "100%",
      }}
    >
      {/* Search */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center w-full sm:w-auto sm:flex-1"
      >
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
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search"
            className={`ml-2 bg-transparent outline-none text-sm text-[#000000] placeholder:text-[#00000073] transition-all duration-300 ease-in-out ${
              isExpanded ? "w-full opacity-100" : "w-0 opacity-0"
            }`}
          />
        </div>
      </form>

      {/* Status Filter */}
      <div className="flex gap-4 w-full sm:w-auto sm:flex-row sm:justify-end">
        <div className="relative w-full sm:w-[128px] transition-all duration-300">
          <select
            className="appearance-none border border-[#D9D9D9] text-sm h-[32px] px-[12px] py-[5px] pr-6 rounded-[6px] text-black/70 hover:bg-[#0000000A] w-full"
            value={localStatus}
            onChange={handleStatusChange}
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

      {/* Buttons */}
      <div className="flex gap-4 w-full sm:w-auto sm:flex-row sm:justify-end transition-all duration-300">
        {/* <button
          type="button"
          className="group flex items-center justify-center gap-1 w-full sm:w-[92px] h-[32px] rounded-[6px] px-[12px] bg-white border border-[#D9D9D9] transition-transform transform hover:scale-105"
          onClick={handleExportCSV}
        >
          <CiExport className="w-[16px] h-[16px] rotate-90" />
          <span className="text-[14px] text-black/70">Export</span>
        </button> */}

        <button
          type="button"
          className="group flex items-center justify-center gap-2 w-full sm:w-[130px] h-[32px] rounded-[6px] px-[12px] bg-[#EDDD8A] border border-[#DDBF22] transition-transform transform hover:scale-105"
          onClick={handleAddClick}
        >
          <IoAdd className="w-[16px] h-[16px]" />
          <span className="text-[14px] font-normal text-[#2C2607]">
            Add User
          </span>
        </button>
      </div>
    </div>
  );
};

export default UserFilters;
