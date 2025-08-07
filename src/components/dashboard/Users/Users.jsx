import { useEffect, useState } from "react";
import UserTable from "./UserTable";
import UserFilters from "./UserFilters";
import useDashboardStore from "../../../store/useDashboardStore";

const Users = () => {
  const {
    users,
    totalUsers,
    usersLoading,
    usersError,
    page,
    limit,
    search,
    status,
    setSearch,
    setStatus,
    setPage,
    setLimit, // ✅ make sure this is available in your Zustand store
    fetchUsers,
  } = useDashboardStore();

  // Fetch users whenever filters, page, or limit change
  useEffect(() => {
    fetchUsers(search, status, page, limit);
  }, [search, status, page, limit, fetchUsers]);

  // Handle filters change from UserFilters component
  const handleFilterChange = ({ search: newSearch, status: newStatus }) => {
    if (newSearch !== search) setSearch(newSearch);
    if (newStatus !== status) setStatus(newStatus);
    setPage(1);
  };

  // Page and Limit handler
  const handlePageChange = (newPage, newLimit = limit) => {
    if (newLimit !== limit) setLimit(newLimit);
    if (newPage !== page) setPage(newPage);
  };

  // if (usersLoading) return <div>Loading users...</div>;
  if (usersError) return <div>Error loading users: {usersError}</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-4 px-4 py-6 w-full">
      <div className="w-full lg:w-[300px]">
        <UserFilters
          search={search}
          status={status}
          onChange={handleFilterChange}
          users={users}
        />
      </div>
      <div className="flex-1 overflow-x-auto">
        {users.length === 0 && !usersLoading ? (
          <div className="p-4 text-gray-500 text-center">No users found.</div>
        ) : (
          <div
            className={`transition-opacity duration-500 ${
              usersLoading ? "opacity-50 pointer-events-none" : "opacity-100"
            }`}
          >
            <UserTable
              data={users}
              loading={usersLoading}
              currentPage={page}
              recordsPerPage={limit}
              totalRecords={totalUsers}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
