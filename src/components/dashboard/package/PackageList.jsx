import React, { useState } from "react";
import axios from "../../../utils/axiosInstance";
import { AiOutlineEdit } from "react-icons/ai";
import { IoIosCloseCircle } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoToggle } from "react-icons/io5";
import { FiTrash } from "react-icons/fi";
import AddPackage from "./utils/AddPackage";
import usePagination from "../../../utils/usePagination";
import { useEffect, useRef } from "react";
import Switch from "../../ui/Switch";
import ActionMenu from "../../ui/ActionMenu";
import Pagination from "../../../utils/Pagination";

function PackageList({
  data,
  closeProductModel,
  productModelVisible,
  openProductModel,
  isEditMode,
  setEditMode,
  fetchList,
}) {
  const tableRef = useRef(null);
  const [formData, setFormData] = useState({});

  const handleEdit = (value) => {
    console.log(value);
    setEditMode();
    setFormData(value);
    openProductModel();
  };

  const handleDelete = async (id) => {
    const response = await axios.delete(`/admin/packages/${id}`, {
      withCredentials: true,
    });

    console.log(response);

    if (response.data.success) {
      fetchList();
      alert("Package deleted successfully. \n id: ", id);
    } else {
      alert("Package deleted Failed.");
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus ? false : true;

    const response = await axios.patch(
      `/admin/packages/${id}/status`,
      { status: newStatus },
      {
        withCredentials: true,
      }
    );

    console.log(response);

    if (response.data.success) {
      fetchList();
      alert(
        `Package status updated successfully.\nID: ${id}\nNew Status: ${newStatus}`
      );
    } else {
      alert("Package status update Failed.");
    }
  };

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

  useEffect(() => {}, [data]);

  return (

    <div className="px-4">

   
    <div className="overflow-x-auto w-full">
      {productModelVisible && (
        <AddPackage
          onClose={closeProductModel}
          prevData={formData}
          isEditMode={isEditMode}
          fetchList={fetchList}
        />
      )}

      <table className="min-w-full border-collaps">
        <thead className="bg-gray-100 sticky top-0 z-20 w-full h-[44px] text-sm">
          <tr>
            <th className="px-4 min-w-[3rem] text-left">
              <input type="checkbox" className="w-4 h-4 accent-purple-500" />
            </th>
            <th className="px-4 min-w-[15rem] text-left">Name</th>
            <th className="px-4 min-w-[8rem] text-left">Price</th>
            <th className="px-4 min-w-[12rem] text-left">Target Audience</th>
            <th className="px-4 min-w-[12rem] text-left">Occurrence (Days)</th>
            <th className="px-4 min-w-[12rem] text-left">Feature</th>
            <th className="px-4 min-w-[8rem] text-left">Status</th>
            <th className="px-4 min-w-[6rem] sticky right-0 bg-gray-100">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Map your data here */}

          {paginatedData.length <= 0 && (
            <tr>
              <td>Loading...</td>
            </tr>
          )}

          {paginatedData.length > 0 &&
            paginatedData.map((row, index) => (
              <tr key={index} className="h-15  border-gray-300">
                <td className="px-4">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-purple-500"
                  />
                </td>

                <td className="px-4 whitespace-nowrap">
                  {row.name} <br />{" "}
                  <span className="text-[#817e7e] text-xs">{row.type}</span>
                </td>

                <td className="px-4">₹{row.price}</td>
                <td className="px-4">{row.targetAudience}</td>
                <td className="px-4">{row.validityDays} Days</td>

                <td className="px-4 whitespace-nowrap">
                  {row.features.map((materialName, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center border-1 border-[#90affd] text-[#3471ff] bg-[#e9f0fd] text-sm px-1 py-0.5 mx-1 rounded-md gap-2"
                    >
                      <MdOutlineEmail className="text-lg" />
                      {materialName}
                    </span>
                  ))}
                </td>
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

          {/* <tr>
        <td className="border border-gray-300 px-4 py-2">Hello</td>
        <td className="border border-gray-300 px-4 py-2">Hi</td>
        <td className="border border-gray-300 px-4 py-2">1000000</td>
        <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">Some Big Audience Name Lorem ipsum dolor sit amet consectetur adipisicing elit.</td>
        <td className="border border-gray-300 px-4 py-2">30</td>
        <td className="border border-gray-300 px-4 py-2">Feature List Lorem ipsum dolor sit amet</td>
        <td className="border border-gray-300 px-4 py-2">Active</td>
        <td className="border border-gray-300 px-4 py-2 sticky right-0 bg-white">...</td>
      </tr>
      <tr>
        <td className="border border-gray-300 px-4 py-2">Hello</td>
        <td className="border border-gray-300 px-4 py-2">Hi</td>
        <td className="border border-gray-300 px-4 py-2">1000000</td>
        <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">Some Big Audience Name Lorem ipsum dolor sit amet consectetur adipisicing elit.</td>
        <td className="border border-gray-300 px-4 py-2">30</td>
        <td className="border border-gray-300 px-4 py-2">Feature List Lorem ipsum dolor sit amet</td>
        <td className="border border-gray-300 px-4 py-2">Active</td>
        <td className="border border-gray-300 px-4 py-2 sticky right-0 bg-white">...</td>
      </tr>
      <tr>
        <td className="border border-gray-300 px-4 py-2">Hello</td>
        <td className="border border-gray-300 px-4 py-2">Hi</td>
        <td className="border border-gray-300 px-4 py-2">1000000</td>
        <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">Some Big Audience Name Lorem ipsum dolor sit amet consectetur adipisicing elit.</td>
        <td className="border border-gray-300 px-4 py-2">30</td>
        <td className="border border-gray-300 px-4 py-2">Feature List Lorem ipsum dolor sit amet</td>
        <td className="border border-gray-300 px-4 py-2">Active</td>
        <td className="border border-gray-300 px-4 py-2 sticky right-0 bg-white">...</td>
      </tr>
      <tr>
        <td className="border border-gray-300 px-4 py-2">Hello</td>
        <td className="border border-gray-300 px-4 py-2">Hi</td>
        <td className="border border-gray-300 px-4 py-2">1000000</td>
        <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">Some Big Audience Name Lorem ipsum dolor sit amet consectetur adipisicing elit.</td>
        <td className="border border-gray-300 px-4 py-2">30</td>
        <td className="border border-gray-300 px-4 py-2">Feature List Lorem ipsum dolor sit amet</td>
        <td className="border border-gray-300 px-4 py-2">Active</td>
        <td className="border border-gray-300 px-4 py-2 sticky right-0 bg-white">...</td>
      </tr> */}
          {/* Repeat for more rows */}
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
  );
}

export default PackageList;
