import { useState, useEffect } from "react";

const usePagination = (data = [], currentPage = 1, recordsPerPage = 10) => {
  const [page, setPage] = useState(currentPage);
  const [limit, setLimit] = useState(recordsPerPage);
  const [paginatedData, setPaginatedData] = useState([]);

  useEffect(() => {
    if (!Array.isArray(data)) return;

    const totalPages = Math.ceil(data.length / limit);
    if (page > totalPages && totalPages > 0) {
      setPage(1);
      return;
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    setPaginatedData(data.slice(start, end));
  }, [page, limit, data]);

  const handlePageChange = (newPage, newLimit = limit) => {
    setPage(newPage);
    setLimit(newLimit);
  };

  return {
    paginatedData,
    page,
    limit,
    setPage,
    setLimit,
    handlePageChange,
    totalPages: Math.ceil(data.length / limit),
  };
};

export default usePagination;
