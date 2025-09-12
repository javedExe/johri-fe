import React, { useState } from "react";
import axios from "../../../utils/axiosInstance";
import Switch from "../../ui/Switch";
import { MdArrowDownward } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
import { IoToggle } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import StatusTag from "../../../utils/StatusTags";
import RoleTag from "../../../utils/RoleTag";
import Pagination from "../../../utils/Pagination";
import usePagination from "../../../utils/usePagination";
import { useEffect, useRef } from "react";
import MaterialTag from "./utils/MaterialTag";
import AddProduct from "./utils/AddProduct";
import ringProduct from "../../../assets/ringProduct.png";
import solidLocketProduct from "../../../assets/solidLocketProduct.png";
import sharpLocketProduct from "../../../assets/sharpLocketProduct.png";
// import ActionMenu from "../../ui/ActionMenu";
import ActionMenu from "./utils/ActionMenu";

function ProductList({
  data,
  closeProductModel,
  productModelVisible,
  isEditMode,
  setEditMode,
  openProductModel,
}) {
  const tableRef = useRef(null);
  const [formData, setFormData] = useState({});

  const {
    paginatedData,
    page: currentPage,
    limit: recordsPerPage,
    handlePageChange,
    // totalPages,
  } = usePagination(data, 1, 10);

  // Scroll to top of table on page change
  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollTop = 0;
    }
  }, [currentPage]);

  const handleEdit = (value) => {
    setEditMode();
    setFormData(value);
    openProductModel();
  };

  const handleStatus = async (id, status) => {
    const response = await axios.patch(`/admin/products/${id}`, {
      status: status,
    });

    if (response.data.success) {
      alert("Product Status update successfully.");
    } else {
      alert(
        "Failed to save product: " + (response.data.message || "Unknown error")
      );
    }
  };

  const handleAvailability = async (id, availability) => {
    const value = availability ? "In Stock" : "Out of Stock";
    alert(`${value} ${id}`);
    // return;
    const response = await axios.patch(`/admin/products/${id}`, {
      availability: value,
    });

    if (response.data.success) {
      alert("Product Status update successfully.");
    } else {
      alert(
        "Failed to save product: " + (response.data.message || "Unknown error")
      );
    }
  };

  return (
    // <>
    //   <div className="px-4 top-[162px] fixed bg-white py-3 flex flex-col w-full sm:flex-row flex-wrap items-center gap-4 lg:fixed lg:top-[162px] lg:left-[297px] lg:h-[48px] lg:flex lg:items-center lg:space-x-2 lg:whitespace-nowrap lg:w-[calc(100%-297px)] z-30">
    //     {productModelVisible && (
    //       <AddProduct
    //         onClose={closeProductModel}
    //         prevData={formData}
    //         isEditMode={isEditMode}
    //       />
    //     )}

    //     {/* Scroll container only for table */}
    //     <div
    //       className="max-h-[calc(100vh-280px)] overflow-auto border-gray-200 custom-scrollbar"
    //       ref={tableRef}
    //     >
    //       <table className="min-w-full border-collapse table-auto">
    //         <thead className="sticky top-0 bg-gray-100 z-20 w-full h-[44px] ">
    //           {/* <div className="overflow-x-auto border-gray-200">
    //   <table className="min-w-full border-collapse table-auto">
    //     <thead className="sticky top-0 bg-gray-100 z-20 w-full h-[44px] "> */}
    //           <tr>
    //             <th className="w-12 px-2 py-3 text-center whitespace-nowrap">
    //               <input
    //                 type="checkbox"
    //                 className="w-4 h-4 accent-purple-500"
    //               />
    //             </th>
    //             <th className="min-w-[260px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
    //               <div className="flex items-center gap-1">
    //                 Product Name{" "}
    //                 {/* <MdArrowDownward className="w-4 h-4 text-gray-500" /> */}
    //               </div>
    //             </th>
    //             <th className="min-w-[100px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
    //               <div className="flex items-center gap-1">
    //                 Seller Name
    //                 {/* <MdArrowDownward className="w-4 h-4 text-gray-500" /> */}
    //               </div>
    //             </th>
    //             <th className="min-w-[100px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
    //               Used By
    //             </th>
    //             <th className="min-w-[200px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
    //               <div className="flex items-center gap-1">
    //                 Material type{" "}
    //                 {/* <MdArrowDownward className="w-4 h-4 text-gray-500" /> */}
    //               </div>
    //             </th>
    //             <th className="min-w-[80px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
    //               <div className="flex items-center gap-1">
    //                 Weight{" "}
    //                 {/* <MdArrowDownward className="w-4 h-4 text-gray-500" /> */}
    //               </div>
    //             </th>
    //             <th className="min-w-[210px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
    //               Category
    //             </th>
    //             <th className="min-w-[90px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
    //               Price
    //             </th>
    //             <th className="min-w-[80px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
    //               <div className="flex items-center gap-1">
    //                 Views{" "}
    //                 {/* <MdArrowDownward className="w-4 h-4 text-gray-500" /> */}
    //               </div>
    //             </th>
    //             <th className="min-w-[180px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
    //               Availability
    //             </th>

    //             <th
    //               className="min-w-[100px] px-4 py-3 text-center sticky right-0 bg-gray-100 text-[#434956] text-xs font-normal whitespace-nowrap"
    //               style={{ zIndex: 30 }}
    //             >
    //               Actions
    //             </th>
    //           </tr>
    //         </thead>

    //         <tbody>
    //           {paginatedData.map((row, index) => (
    //             <tr
    //               key={index}
    //               className="border-b border-gray-200 hover:bg-gray-50 group"
    //             >
    //               <td className="w-12 px-2 py-3 text-center">
    //                 <input
    //                   type="checkbox"
    //                   className="w-4 h-4 accent-purple-500"
    //                 />
    //               </td>
    //               <td className="min-w-[260px] px-4 py-3 text-[#101828] font-inter font-medium text-sm leading-5 tracking-normal whitespace-nowrap flex gap-1">
    //                 {/* <img src={ringProduct} alt="" className="w-8 h-8" /> */}
    //                 <img
    //                   className="w-10 h-10"
    //                   src={
    //                     row.action === "Approved"
    //                       ? ringProduct
    //                       : row.action === "Rejected"
    //                       ? solidLocketProduct
    //                       : sharpLocketProduct
    //                   }
    //                   alt=""
    //                 />
    //                 <div>
    //                   {row.name} <br />{" "}
    //                   <span className="text-[#817e7e] text-xs">{row.sku}</span>
    //                 </div>
    //               </td>
    //               <td className="min-w-[100px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap">
    //                 {row.seller_name}
    //               </td>
    //               <td className="min-w-[100px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap">
    //                 {row.used_by}
    //               </td>
    //               <td className="min-w-[200px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap flex gap-2">
    //                 {row.materials.map((materialName, index) => (
    //                   <MaterialTag key={index} tag={materialName} />
    //                 ))}
    //               </td>
    //               <td className="min-w-[80px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap">
    //                 {row.weight}
    //               </td>
    //               <td className="min-w-[210px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap">
    //                 {`${row.category} > ${row.subcategory}`}
    //               </td>
    //               <td className="min-w-[90px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap">
    //                 {row.price}
    //               </td>
    //               <td className="min-w-[80px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap">
    //                 {row.views}
    //               </td>
    //               <td className="min-w-[180px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap">
    //                 {/* <StatusTag role={row.availability} /> */}
    //                 {row.availability ? (
    //                   <span className="text-[#52C41A] text-sm border-1 p-1 px-2 rounded-2xl">
    //                     In Stock
    //                   </span>
    //                 ) : (
    //                   <span className="text-red-500 text-sm border-1 p-1 px-2 rounded-2xl">
    //                     Out of Stock
    //                   </span>
    //                 )}
    //               </td>
    //               <td
    //                 className="min-w-[100px] px-8 py-3 sticky right-0 bg-white border-b-[#EAECF0] flex items-center justify-between gap-2 group-hover:bg-gray-50"
    //                 style={{ zIndex: 10 }}
    //               >
    //                 {row.status === "approved" && (
    //                   <div className="flex gap-2">
    //                     <AiOutlineEdit
    //                       className="text-gray-600  cursor-pointer transition-transform duration-150 w-7 h-7 rounded-[4px] shadow-[1px_2px_4px_0px_#0000000F]"
    //                       onClick={() => handleEdit(row)}
    //                     />

    //                     <Switch
    //                       checked={row.availability}
    //                       onClick={() =>
    //                         handleAvailability(row.id, !row.availability)
    //                       }
    //                       className="w-4 h-5 text-[#1677FF] cursor-pointer"
    //                     />
    //                   </div>
    //                 )}
    //                 {row.status === "rejected" && (
    //                   <div className="w-full flex justify-end">
    //                     <IoCloseCircleOutline className="text-red-400  cursor-pointer transition-transform duration-150 w-7 h-7 rounded-[4px] shadow-[1px_2px_4px_0px_#0000000F]" />
    //                   </div>
    //                 )}
    //                 {row.status === "pending" && (
    //                   <div className="flex gap-3">
    //                     <IoCloseCircleOutline
    //                       onClick={() => handleStatus(row.id, "rejected")}
    //                       className="text-red-400  cursor-pointer transition-transform duration-150 w-7 h-7 rounded-[4px] shadow-[1px_2px_4px_0px_#0000000F]"
    //                     />
    //                     <IoIosCheckmarkCircleOutline
    //                       onClick={() => handleStatus(row.id, "approved")}
    //                       className="text-green-400  cursor-pointer transition-transform duration-150 w-7 h-7 rounded-[4px] shadow-[1px_2px_4px_0px_#0000000F]"
    //                     />
    //                   </div>
    //                 )}
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>

    //     {/* Pagination OUTSIDE of the scroll container */}
    //     <div className="flex justify-center w-full mt-4 mb-8 px-4">
    //       <Pagination
    //         totalRecords={data.length}
    //         currentPage={currentPage}
    //         recordsPerPage={recordsPerPage}
    //         onPageChange={handlePageChange}
    //       />
    //     </div>
    //   </div>
    // </>

    <div className="px-4 bg-white">
      <div className="overflow-x-auto w-full">

        {productModelVisible && (
          <AddProduct
            onClose={closeProductModel}
            prevData={formData}
            isEditMode={isEditMode}
          />
        )}

        <table className="min-w-full border-collaps">
          <thead className="bg-[#EEF0F6] sticky top-0 z-20 w-full h-[44px] text-sm">
            <tr>
              <th className="px-4 min-w-[3rem] text-left">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-purple-500"
                  // checked={paginatedData.every((row) =>
                  //   selectedRowIds.includes(row.id)
                  // )}
                  // onChange={handleSelectAllVisible}
                />
              </th>
              <th className="px-4 min-w-[15rem] text-left">
                <div>Product Name</div>
                <div>SKU</div>
              </th>
              <th className="px-4 min-w-[15rem] text-left">Seller Name</th>
              <th className="px-4 min-w-[8rem] text-left">Used By</th>
              <th className="px-4 min-w-[15rem] text-left ps-5">
                Material Type
              </th>
              <th className="px-4 min-w-[8rem] text-left">Weight</th>
              <th className="px-4 min-w-[15rem] text-left">Category</th>
              <th className="px-4 min-w-[8rem] text-left">Price</th>
              <th className="px-4 min-w-[8rem] text-left">Views</th>
              <th className="px-4 min-w-[10rem] text-left">Availability</th>
              <th className="px-4 min-w-[6rem] sticky right-0 bg-[#EEF0F6]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Map your data here */}

            {/* {paginatedData.length <= 0 && loading && (
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
            )} */}

            {paginatedData.length > 0 &&
              paginatedData.map((row, index) => (
                <tr key={index} className="h-15  border-gray-300">
                  <td className="px-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-purple-500"
                      // checked={selectedRowIds.includes(row.id)}
                      // onChange={() => handleOneCheckbox(row.id)}
                    />
                  </td>
                  <td className="px-4 whitespace-nowrap flex">
                    <img
                      className="w-10 h-10"
                      src={
                        row.status === "Approved"
                          ? ringProduct
                          : row.status === "Rejected"
                          ? solidLocketProduct
                          : sharpLocketProduct
                      }
                      alt=""
                    />
                    <div>
                      {row.name} <br />{" "}
                      <span className="text-[#817e7e] text-xs">{row.sku}</span>
                    </div>
                  </td>

                  <td className="px-4">{row.seller_name}</td>
                  <td className="px-4">{row.used_by}</td>
                  <td className="px-4 whitespace-nowrap">
                    {row.materials.map((materialName, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center ms-1"
                      >
                        <MaterialTag key={index} tag={materialName} />
                      </span>
                    ))}
                  </td>
                  <td className="px-4">{row.weight}</td>
                  <td className="px-4">{`${row.category} > ${row.subcategory}`}</td>
                  <td className="px-4">{row.price}</td>
                  <td className="px-4">{row.views}</td>
                  <td className="px-4">
                    
                    {row.availability === "true" ? (
                      <span className="text-[#52C41A] text-sm border-1 p-1 px-2 rounded-2xl">
                        In Stock
                      </span>
                    ) : (
                      <span className="text-red-500 text-sm border-1 p-1 px-2 rounded-2xl">
                        Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="px-4 sticky right-0 bg-white">
                    <ActionMenu
                      row={row}
                      handleEdit={() => handleEdit(row)}
                      handleAvailability={() => handleAvailability(row.id, !row.availability)}
                      rejectStatus={() => handleStatus(row.id, "rejected")}
                      approveStatus={() => handleStatus(row.id, "approved")}
                      actionMode={row.status}
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
        />
      </div>
    </div>
  );
}

export default ProductList;
