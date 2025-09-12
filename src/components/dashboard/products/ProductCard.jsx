import React, { useState } from "react";
import AddProduct from "./utils/AddProduct";
import { BsThreeDotsVertical } from "react-icons/bs";
import Pagination from "../../../utils/Pagination";
import usePagination from "../../../utils/usePagination";
import { useEffect, useRef } from "react";
// import adminProductImg from "../../../assets/adminProductImg.png";
import ringProduct from "../../../assets/ringProduct.png";
import solidLocketProduct from "../../../assets/solidLocketProduct.png";
import sharpLocketProduct from "../../../assets/sharpLocketProduct.png";

function ProductCard({
  data,
  closeProductModel,
  productModelVisible,
  isEditMode,
  setEditMode,
  openProductModel,
}) {
  const tableRef = useRef(null);
  const [menuIndex, setMenuIndex] = useState(null);
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

  return (
    <div className="px-4 bg-white">
      <div className="overflow-x-auto w-full">
        {/* Here */}
        <div className="flex flex-wrap gap-4">
          {paginatedData.map((row, index) => (
            <div key={index} className="w-42 rounded-md shadow-sm bg-white p-2">
              {/* Image */}
              <div
                className="relative h-38 rounded-md bg-cover bg-center"
                // style={{ backgroundImage: `url(${adminProductImg})` }}
                style={{
                  backgroundImage: `url(${
                    row.status === "approved"
                      ? ringProduct
                      : row.status === "rejected"
                      ? solidLocketProduct
                      : sharpLocketProduct
                  })`,
                }}
              >
                {/* Dots Menu */}
                <div className="absolute top-2 right-2">
                  <button
                    className="text-gray-600 hover:text-black"
                    onClick={() =>
                      setMenuIndex(menuIndex === index ? null : index)
                    }
                  >
                    <BsThreeDotsVertical />
                  </button>

                  {menuIndex === index && (
                    <div className="absolute right-0 w-24 bg-white shadow rounded-md z-10">
                      <button
                        onClick={() => handleEdit(row)}
                        className="block w-full text-left px-3 py-1 text-sm hover:bg-gray-300"
                      >
                        Edit
                      </button>
                      <button className="block w-full text-left px-3 py-1 text-sm hover:bg-gray-300">
                        Disable
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Product details */}
              <div className="mt-2">
                <p className="text-sm font-medium text-black">{row.name}</p>
                <p className="text-xs text-gray-500">{row.sku}</p>

                <div className="flex justify-between mt-1">
                  <p className="text-sm font-semibold">{row.price}</p>
                  <span
                    className={`inline-block px-2 py-0.5 text-xs rounded-full border ${
                      row.availability
                        ? "text-green-500 border-green-500"
                        : "text-red-500 border-red-500"
                    }`}
                  >
                    {row.availability ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* till here */}
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

export default ProductCard;
