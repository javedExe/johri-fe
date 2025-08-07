// import React, { useState, useEffect } from "react";

// const Pagination = ({ totalRecords = 1000, onPageChange }) => {
//   const [recordsPerPage, setRecordsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = Math.ceil(totalRecords / recordsPerPage);

//   useEffect(() => {
//     onPageChange(currentPage, recordsPerPage);
//   }, [currentPage, recordsPerPage, onPageChange]);

//   const handlePageClick = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const getPageNumbers = () => {
//     let pages = [];
//     if (totalPages <= 6) {
//       pages = Array.from({ length: totalPages }, (_, i) => i + 1);
//     } else {
//       if (currentPage <= 3) {
//         pages = [1, 2, 3, 4, 5, "...", totalPages];
//       } else if (currentPage > totalPages - 3) {
//         pages = [
//           1,
//           "...",
//           totalPages - 4,
//           totalPages - 3,
//           totalPages - 2,
//           totalPages - 1,
//           totalPages,
//         ];
//       } else {
//         pages = [
//           1,
//           "...",
//           currentPage - 1,
//           currentPage,
//           currentPage + 1,
//           "...",
//           totalPages,
//         ];
//       }
//     }
//     return pages;
//   };

//   return (
//     <div className="flex items-center justify-between w-full max-w-[504px] p-4 rounded-[6px] bg-white gap-4">
//       {/* Left Arrow */}
//       <button
//         onClick={() => handlePageClick(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="px-2 py-1 text-lg text-gray-500 hover:text-black disabled:opacity-30"
//       >
//         {"<"}
//       </button>

//       {/* Page Numbers */}
//       <div className="flex items-center gap-2">
//         {getPageNumbers().map((page, index) => (
//           <button
//             key={index}
//             onClick={() => typeof page === "number" && handlePageClick(page)}
//             className={`px-3 py-1 text-sm rounded border ${
//               page === currentPage
//                 ? "border-blue-500 text-blue-600"
//                 : "border-transparent text-gray-700 hover:border-blue-300"
//             } text-[14px] leading-[22px] font-normal text-center text-[#000000E0] font-inter`}
//           >
//             {page}
//           </button>
//         ))}
//       </div>

//       {/* Right Arrow */}
//       <button
//         onClick={() => handlePageClick(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="px-2 py-1 text-lg text-gray-500 hover:text-black disabled:opacity-30"
//       >
//         {">"}
//       </button>

//       {/* Records per page dropdown*/}
//       <div className="relative flex justify-between items-center w-[80px] h-[24px]">
//         <select
//           value={recordsPerPage}
//           onChange={(e) => {
//             setCurrentPage(1);
//             setRecordsPerPage(Number(e.target.value));
//           }}
//           className="appearance-none border w-[80px] border-[#D9D9D9] rounded px-3 py-1 text-sm  text-[#000000E0] font-inter"
//         >
//           {[10, 25, 50, 100].map((num) => (
//             <option key={num} value={num}>
//               {num}
//             </option>
//           ))}
//         </select>
//         <div className="pointer-events-none right-2 flex items-center pr-2 absolute -translate-y-1/2">
//           <span className="block w-2 h-2 border-t-2 border-r-2 border-gray-500 rotate-135 transform"></span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pagination;

// Pagination.jsx

const Pagination = ({
  totalRecords,
  currentPage,
  recordsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page, recordsPerPage);
    }
  };

  const getPageNumbers = () => {
    let pages = [];
    if (totalPages <= 6) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, 5, "...", totalPages];
      } else if (currentPage > totalPages - 3) {
        pages = [
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        pages = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-wrap items-center justify-center w-full max-w-[504px] p-4 rounded-[6px] bg-white gap-2 mx-auto">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-1 text-lg text-gray-500 hover:text-black disabled:opacity-30"
      >
        {"<"}
      </button>

      <div className="flex flex-wrap items-center gap-2">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && handlePageClick(page)}
            className={`px-3 py-1 text-sm rounded border ${
              page === currentPage
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-700 hover:border-blue-300"
            } text-[14px] leading-[22px] font-normal text-center text-[#000000E0] font-inter`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 py-1 text-lg text-gray-500 hover:text-black disabled:opacity-30"
      >
        {">"}
      </button>

      <div className="relative flex justify-between items-center w-[80px] h-[24px]">
        <select
          value={recordsPerPage}
          onChange={(e) => onPageChange(1, Number(e.target.value))}
          className="appearance-none border w-[80px] border-[#D9D9D9] rounded px-3 py-1 text-sm text-[#000000E0] font-inter"
        >
          {[10, 25, 50, 100].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <div className="pointer-events-none right-2 flex items-center pr-2 absolute -translate-y-1/2">
          <span className="block w-2 h-2 border-t-2 border-r-2 border-gray-500 rotate-135 transform"></span>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

// const Pagination = ({
//   totalRecords,
//   currentPage,
//   recordsPerPage,
//   onPageChange,
// }) => {
//   const totalPages = Math.ceil(totalRecords / recordsPerPage);

//   const handlePageClick = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       onPageChange(page, recordsPerPage);
//     }
//   };

//   const getPageNumbers = () => {
//     let pages = [];
//     if (totalPages <= 6) {
//       pages = Array.from({ length: totalPages }, (_, i) => i + 1);
//     } else {
//       if (currentPage <= 3) {
//         pages = [1, 2, 3, 4, 5, "...", totalPages];
//       } else if (currentPage > totalPages - 3) {
//         pages = [
//           1,
//           "...",
//           totalPages - 4,
//           totalPages - 3,
//           totalPages - 2,
//           totalPages - 1,
//           totalPages,
//         ];
//       } else {
//         pages = [
//           1,
//           "...",
//           currentPage - 1,
//           currentPage,
//           currentPage + 1,
//           "...",
//           totalPages,
//         ];
//       }
//     }
//     return pages;
//   };

//   return (
//     <div className="flex flex-wrap items-center justify-center w-full max-w-[504px] p-4 rounded-[6px] bg-white gap-2 mx-auto">
//       <button
//         onClick={() => handlePageClick(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="px-2 py-1 text-lg text-gray-500 hover:text-black disabled:opacity-30"
//       >
//         {"<"}
//       </button>

//       <div className="flex items-center gap-2">
//         {getPageNumbers().map((page, index) => (
//           <button
//             key={index}
//             onClick={() => typeof page === "number" && handlePageClick(page)}
//             className={`px-3 py-1 text-sm rounded border ${
//               page === currentPage
//                 ? "border-blue-500 text-blue-600"
//                 : "border-transparent text-gray-700 hover:border-blue-300"
//             } text-[14px] leading-[22px] font-normal text-center text-[#000000E0] font-inter`}
//           >
//             {page}
//           </button>
//         ))}
//       </div>

//       <button
//         onClick={() => handlePageClick(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="px-2 py-1 text-lg text-gray-500 hover:text-black disabled:opacity-30"
//       >
//         {">"}
//       </button>

//       <div className="relative flex justify-between items-center w-[80px] h-[24px]">
//         <select
//           value={recordsPerPage}
//           onChange={(e) => onPageChange(1, Number(e.target.value))}
//           className="appearance-none border w-[80px] border-[#D9D9D9] rounded px-3 py-1 text-sm  text-[#000000E0] font-inter"
//         >
//           {[10, 25, 50, 100].map((num) => (
//             <option key={num} value={num}>
//               {num}
//             </option>
//           ))}
//         </select>
//         <div className="pointer-events-none right-2 flex items-center pr-2 absolute -translate-y-1/2">
//           <span className="block w-2 h-2 border-t-2 border-r-2 border-gray-500 rotate-135 transform"></span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pagination;
