import React, { useState } from 'react';
import { AiOutlineEdit } from "react-icons/ai";
import { IoIosCloseCircle } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoToggle } from "react-icons/io5";
import { FiTrash } from "react-icons/fi";
import AddPackage from './utils/AddPackage';
import usePagination from "../../../utils/usePagination";
import { useEffect, useRef } from "react";
import Switch from '../../ui/Switch';



function PackageList({ data, closeProductModel, productModelVisible, openProductModel, isEditMode, setEditMode }) {

     const tableRef = useRef(null);
     const [formData, setFormData] = useState({});



     const handleEdit = (value) =>{
      // console.log("clicked")
      setEditMode();
      setFormData(value);
      openProductModel();
     }



     const handleDelete = (id) => {
      alert(`Package deleted successfully. \n id: ${id}`);
     }

     
    const handleToggle = (id, currentStatus) => {
      const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

      // updatePackageStatus(id, newStatus); // API logic

      alert(`Package status updated successfully.\nID: ${id}\nNew Status: ${newStatus}`);
    };



  const {
    paginatedData,
    page: currentPage,
    // limit: recordsPerPage,
    // handlePageChange,
    // totalPages,
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
            className="px-4 top-[162px] fixed bg-white py-3 flex flex-col w-[calc(100%-329px)] sm:flex-row flex-wrap items-center gap-4 lg:fixed lg:top-[162px] lg:left-[297px] lg:h-[48px] lg:flex lg:items-center lg:space-x-2 lg:whitespace-nowrap z-30"
            style={{
              width: window.innerWidth >= 1024 ? "calc(100% - 297px)" : "100%",
            }}
          >
            {productModelVisible && <AddPackage onClose={closeProductModel} prevData={formData} isEditMode={isEditMode} />}


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
                    <th className="min-w-[260px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        Package Name{" "}
                        {/* <MdArrowDownward className="w-4 h-4 text-gray-500" /> */}
                      </div>
                    </th>
                    <th className="min-w-[150px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        Price
                        {/* <MdArrowDownward className="w-4 h-4 text-gray-500" /> */}
                      </div>
                    </th>
                    <th className="min-w-[150px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
                      Target Audience
                    </th>
                    <th className="min-w-[200px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        Occurance <br /> (Days)
                        {/* <MdArrowDownward className="w-4 h-4 text-gray-500" /> */}
                      </div>
                    </th>
                    <th className="min-w-[80px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        Features
                      </div>
                    </th>
                    <th className="min-w-[210px] px-20 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
                      Status
                    </th>

                    <th
                      className="min-w-[100px] px-4 py-3 text-center sticky right-0 bg-gray-100 text-[#434956] text-xs font-normal whitespace-nowrap"
                      style={{ zIndex: 30 }}
                    >
                      Action
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
                      <td className="min-w-[260px] px-4 py-3 text-[#101828] font-inter font-medium text-sm leading-5 tracking-normal whitespace-nowrap">
                        {row.name} <br /> <span className="text-[#817e7e] text-xs">{row.type}</span>
                      </td>
                      <td className="min-w-[150px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap">
                        {row.price}
                      </td>
                      <td className="min-w-[150px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap">
                        {row.targetAudience}
                      </td>
                      <td className="min-w-[200px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap flex gap-2">
                        {row.validityDays} {" "} Days
                      </td>
                      <td className="min-w-[180px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap">
                        
                        {row.features.map((materialName, index) => (
                            <span key={index} className="inline-flex items-center border-1 border-[#90affd] text-[#3471ff] bg-[#e9f0fd] text-sm px-1 py-0.5 mx-1 rounded-md gap-2">
                        <MdOutlineEmail className="text-lg" />
                        {materialName}
                      </span>
                        ))}

                      </td>
                      
                      <td className="min-w-[180px] px-20 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap">
                       {
                        row.status === "Active" ? (
                            <span className="inline-flex items-center gap-1 text-[#52C41A] text-sm border-1 p-0.5 px-1 rounded-md"><FaCheckCircle className="text-md" />Active</span>
                        ) : (
                            <span className="inline-flex items-center gap-1 text-red-500 text-sm border-1 p-0.5 px-1 rounded-md"><IoIosCloseCircle className="text-lg" />Inactive</span>
                        )
                        }
                      </td> 


                        {/* Till Here */}

                      <td
                        className="min-w-[100px] px-8 py-3 sticky right-0 bg-white border-b-[#EAECF0] flex items-center justify-between gap-2 group-hover:bg-gray-50"
                        style={{ zIndex: 10 }}
                      >
                        <AiOutlineEdit className="text-gray-600 hover:text-blue-600 cursor-pointer transition-transform duration-150 w-7 h-7 rounded-[4px] shadow-[1px_2px_4px_0px_#0000000F]"
                        onClick={()=> handleEdit(row)}
                        />
                        <FiTrash className=" text-gray-600 hover:text-[#FF4D4F] hover:bg-[#FFF2F0] cursor-pointer transition-transform duration-150 w-9 h-9 p-1 rounded-[4px] shadow-[1px_2px_4px_0px_#0000000F]"
                        onClick={()=> handleDelete(row.id)}
                        />
                        <Switch className="w-5 h-5 text-[#1677FF] cursor-pointer" 
                        checked={row.status === "Active"}
                        onClick={()=> handleToggle(row.id, row.status)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
    
            {/* Pagination OUTSIDE of the scroll container */}
            {/* <div className="flex justify-center w-full mt-4 mb-8 px-4">
              <Pagination
                totalRecords={data.length}
                currentPage={currentPage}
                recordsPerPage={recordsPerPage}
                onPageChange={handlePageChange}
              />
            </div> */}
          </div>
        </>
  )
}

export default PackageList;