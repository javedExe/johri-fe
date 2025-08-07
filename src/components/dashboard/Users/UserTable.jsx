// UserTable.jsx
import { MdArrowDownward } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
import { PiToggleLeftFill, PiToggleRightFill } from "react-icons/pi";
import StatusTag from "../../../utils/StatusTags";
import Pagination from "../../../utils/Pagination";
import { useState, useEffect, useRef } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import useDashboardStore from "../../../store/useDashboardStore";
import UserModal from "./UserForm";

const UserTable = ({
  data,
  loading,
  currentPage,
  recordsPerPage,
  totalRecords,
  onPageChange,
}) => {
  const tableRef = useRef(null);

  const [formErrors, setFormErrors] = useState({});

  const users = useDashboardStore((state) => state.users);
  const setUsers = useDashboardStore((state) => state.setUsers);

  const updateUser = useDashboardStore((state) => state.updateUser);
  const fetchUsers = useDashboardStore((state) => state.fetchUsers);
  const addUser = useDashboardStore((state) => state.addUser);
  const deleteUser = useDashboardStore((state) => state.deleteUser);

  const openUserModal = useDashboardStore((state) => state.openUserModal);
  const closeUserModal = useDashboardStore((state) => state.closeUserModal);
  const isUserModalOpen = useDashboardStore((state) => state.isUserModalOpen);
  const userModalMode = useDashboardStore((state) => state.userModalMode);
  const selectedUser = useDashboardStore((state) => state.selectedUser);

  const handleEditClick = (user) => {
    openUserModal("edit", user);
  };

  const handleToggleStatus = async (user) => {
    const updatedStatus =
      user.status.toLowerCase() === "active" ? "INACTIVE" : "ACTIVE";

    try {
      const result = await updateUser(user.id, {
        ...user,
        status: updatedStatus,
      });

      if (result.success) {
        useDashboardStore.setState((state) => {
          const updatedUsers = state.users.map((u) =>
            u.id === user.id ? { ...u, status: updatedStatus } : u
          );
          return { users: updatedUsers };
        });
      } else {
        console.error("Failed to update user status:", result.errors);
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await deleteUser(userId);
      console.log("User deleted successfully");
      // toast.success("User deleted successfully");
    } catch (err) {
      console.log("delete error:", err);
      // toast.error("Failed to delete user");
    }
  };

  const formatPhoneNumber = (phone, separator = " ") => {
    if (!phone) return "";

    const phoneNumber = parsePhoneNumberFromString(phone);
    if (!phoneNumber) return phone;

    // Format with INTERNATIONAL style, then replace spaces with your separator
    return phoneNumber.formatInternational().replace(/ /g, separator);
  };

  const handleSaveUser = async (userData) => {
    if (userModalMode === "edit" && selectedUser) {
      const result = await updateUser(selectedUser.id, userData);

      if (result.success) {
        useDashboardStore.setState((state) => {
          const updatedUsers = state.users.map((user) =>
            user.id === selectedUser.id ? { ...user, ...userData } : user
          );
          return { users: updatedUsers };
        });

        closeUserModal();
      } else {
        setFormErrors(result.errors || {});
      }
    } else if (userModalMode === "add") {
      const result = await addUser(userData);

      if (result.success) {
        useDashboardStore.setState((state) => ({
          users: [result.data, ...state.users], // ✅ Properly add new user
        }));

        closeUserModal();
      } else {
        setFormErrors(result.errors || {});
      }
    }
  };

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollTop = 0;
    }
  }, [data]);

  return (
    <div
      className="fixed top-[162px] left-[297px] w-[calc(100%-329px)] bg-white px-4 py-3 z-20 flex flex-col"
      style={{
        height: "calc(100vh - 162px - 64px)",
        width: window.innerWidth >= 768 ? "calc(100% - 297px)" : "100%",
      }}
    >
      <div
        ref={tableRef}
        className="overflow-auto custom-scrollbar"
        style={{ maxHeight: "100%" }}
      >
        <table className="w-full h-full table-auto border-collapse">
          <thead className="sticky top-0 bg-gray-100 z-30">
            <tr>
              <th className="w-12 px-2 py-3 text-center whitespace-nowrap">
                <input type="checkbox" className="w-4 h-4 accent-purple-500" />
              </th>
              <th className="min-w-[200px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
                <div className="flex items-center gap-1">
                  Name <MdArrowDownward className="w-4 h-4 text-gray-500" />
                </div>
              </th>
              <th className="min-w-[280px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
                <div className="flex items-center gap-1">
                  Email <MdArrowDownward className="w-4 h-4 text-gray-500" />
                </div>
              </th>
              <th className="min-w-[200px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
                Phone
              </th>
              <th className="min-w-[200px] px-4 py-3 text-left text-xs font-normal text-[#434956] whitespace-nowrap">
                Status
              </th>
              <th className="min-w-[180px] px-4 py-3 text-center sticky right-0 text-xs font-semibold text-[#434956] z-30 bg-gray-100">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : (
              (Array.isArray(users) ? users : []).map((row, index) => (
                <tr
                  key={row.id ?? index}
                  className="border-b border-gray-200 hover:bg-gray-50 group"
                >
                  <td className="w-12 px-2 py-3 text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-purple-500"
                    />
                  </td>
                  <td className="min-w-[200px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap">
                    {row.contactName}
                  </td>
                  <td className="min-w-[280px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap">
                    {row.contactEmail}
                  </td>
                  <td className="min-w-[200px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap">
                    {formatPhoneNumber(row.contactPhone, " ")}
                  </td>
                  <td className="min-w-[200px] px-4 py-3 text-[#333333] font-inter font-normal text-sm leading-5 tracking-normal whitespace-nowrap">
                    <StatusTag status={row.status.toLowerCase()} />
                  </td>
                  <td className="px-4 py-3 sticky right-0 z-10 text-center bg-white flex border-b-[#EAECF0] group-hover:bg-gray-50">
                    {" "}
                    {/* <td className="min-w-[180px] px-4 py-3 sticky right-0 bg-white border-b-[#EAECF0] flex items-center justify-between group-hover:bg-gray-50 z-10"> */}
                    <div className="flex items-center text-center justify-center space-x-8">
                      <AiOutlineEdit
                        className="text-gray-600 hover:text-blue-600 cursor-pointer transition-transform duration-150 w-8 h-8 hover:rounded-[4px] hover:shadow-[1px_2px_4px_0px_#0000000F]"
                        onClick={() => handleEditClick(row)}
                      />
                      <FiTrash
                        className="text-gray-600 hover:text-[#FF4D4F] hover:bg-[#FFF2F0] cursor-pointer transition-transform duration-150 w-9 h-9 p-1 hover:rounded-[4px] hover:shadow-[1px_2px_4px_0px_#0000000F]"
                        onClick={() => handleDeleteUser(row.id)}
                      />
                      {row.status.toLowerCase() === "active" ? (
                        <PiToggleRightFill
                          className="w-8 h-8 text-[#1677FF] cursor-pointer"
                          onClick={() => handleToggleStatus(row)}
                        />
                      ) : (
                        <PiToggleLeftFill
                          className="w-8 h-8 text-gray-300 cursor-pointer"
                          onClick={() => handleToggleStatus(row)}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isUserModalOpen && (
        <UserModal
          isOpen={isUserModalOpen}
          user={userModalMode === "edit" ? selectedUser : null}
          onClose={closeUserModal}
          onSave={handleSaveUser}
          mode={userModalMode}
          errors={formErrors}
        />
      )}

      <div className="flex justify-center mt-4">
        <Pagination
          totalRecords={totalRecords}
          currentPage={currentPage}
          recordsPerPage={recordsPerPage}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default UserTable;
