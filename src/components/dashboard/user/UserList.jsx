import React, { useState } from "react";
import axios from "../../../utils/axiosInstance";
import Pagination from "../../../utils/Pagination";
import usePagination from "../../../utils/usePagination";
import ActionMenu from "../../ui/ActionMenu";
import useFeatureStore from "../../../store/useFeatureStore";
import StatusView from "./utils/StatusView";
import AddUser from "./utils/AddUser";
import { useEffect, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
import { IoToggle } from "react-icons/io5";
import { FaArrowDown } from "react-icons/fa6";
import Switch from "../../ui/Switch";

// function InvoiceList({ data, openProductModel}) {
function UserList({
  data,
  userFormVisible,
  closeForm,
  openForm,
  loading,
  setLoading,
  setReload,
  formData,
  setFormData,
}) {
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const tableRef = useRef(null);

  // store objects
  const { setSelectedUsers } = useFeatureStore();

  const {
    paginatedData,
    page: currentPage,
    limit: recordsPerPage,
    handlePageChange,
    // totalPages,
  } = usePagination(data, 1, 20);

  useEffect(() => {
    setSelectedUsers(
      // data.filter((row, idx) => selectedRowIds.includes(idx))
      data.filter((row) => selectedRowIds.includes(row.id))
    );
  }, [selectedRowIds, data, setSelectedUsers]);

  // const allChecked = data.length > 0 && selectedRowIds.length === data.length;

  // Scroll to top of table on page change
  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollTop = 0;
    }
  }, [currentPage]);

  const handleSelectAllVisible = (e) => {
    if (e.target.checked) {
      setSelectedRowIds(paginatedData.map((row) => row.id));
    } else {
      setSelectedRowIds((prevSelected) =>
        prevSelected.filter((id) => !paginatedData.some((row) => row.id === id))
      );
    }
  };

  // const handleAllCheckbox = (e) => {
  //   if (e.target.checked) {
  //     setSelectedRowIds(data.map((_, idx) => idx));
  //   } else {
  //     setSelectedRowIds([]);
  //     clearSelectedUsers();
  //   }
  // };

  const handleOneCheckbox = (idx) => {
    setSelectedRowIds((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleEdit = (row) => {
    setFormData(row);
    openForm();
    alert(row);
  };

  const handleDelete = async (id) => {
    // alert(id);
    setLoading(true);
    try {
      await axios.delete(`/enduser/${id}/delete`, {
        withCredentials: true,
      });
      setReload();
    } catch (err) {
      console.log("Error occured", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (id) => {
    try {
      await axios.put(`/enduser/${id}/status`);
      alert(id);
      setReload();
    } catch (err) {
      console.log("Error occured", err);
    } finally {
      setLoading(false);
    }
  };

  return (
   
    <div className="px-4 bg-white">
      <div className="overflow-x-auto w-full">
        {userFormVisible && (
          <AddUser
            formData={formData}
            onClose={closeForm}
            setReload={setReload}
          />
        )}

        <table className="min-w-full border-collaps">
          <thead className="bg-[#EEF0F6] sticky top-0 z-20 w-full h-[44px] text-sm">
            <tr>
              <th className="px-4 min-w-[3rem] text-left">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-purple-500"
                  checked={paginatedData.every((row) =>
                    selectedRowIds.includes(row.id)
                  )}
                  onChange={handleSelectAllVisible}
                />
              </th>
              <th className="px-4 min-w-[15rem] text-left">Name</th>
              <th className="px-4 min-w-[8rem] text-left">Email</th>
              <th className="px-4 min-w-[12rem] text-left">Phone Number</th>
              <th className="px-4 min-w-[12rem] text-left">Status</th>
              <th className="px-4 min-w-[6rem] sticky right-0 bg-[#EEF0F6]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Map your data here */}

            {paginatedData.length <= 0 && loading && (
              <tr>
                <td colSpan={5} className="w-full text-center">
                  Loading...
                </td>
              </tr>
            )}

            {paginatedData.length <= 0 && !loading && (
              <tr>
                <td colSpan={5} className="w-full text-center">
                  No user Found
                </td>
              </tr>
            )}

            {paginatedData.length > 0 &&
              paginatedData.map((row, index) => (
                <tr key={index} className="h-15  border-gray-300">
                  <td className="px-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-purple-500"
                      checked={selectedRowIds.includes(row.id)}
                      onChange={() => handleOneCheckbox(row.id)}
                    />
                  </td>

                  {row.first_name || row.last_name ? (
                    <td className="px-4 whitespace-nowrap">
                      {row.first_name} {row.last_name}
                    </td>
                  ) : (
                    <td className="px-4 whitespace-nowrap">N/A</td>
                  )}

                  <td className="px-4">{row.email}</td>
                  <td className="px-4">{row.phone_number}</td>

                  <td className="px-4">
                    {row.status ? (
                      <span className="inline-flex items-center gap-1 text-[#52C41A] text-sm border-1 p-0.5 px-1 rounded-md">
                        <FaCheckCircle className="text-md" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-500 text-sm border-1 p-0.5 px-1 rounded-md">
                        <IoIosCloseCircle className="text-lg" />
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-4 sticky right-0 bg-white">
                    <ActionMenu
                      row={row}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      handleStatusToggle={handleStatusToggle}
                    />
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
          initialDataCount={20}
        />
      </div>
    </div>
  );
}

export default UserList;
