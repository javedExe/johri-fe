// UserTable.jsx
// import { MdArrowDownward } from "react-icons/md";
// import { AiOutlineEdit } from "react-icons/ai";
// import { FiTrash } from "react-icons/fi";
// import { PiToggleLeftFill, PiToggleRightFill } from "react-icons/pi";
// import StatusTag from "../../utils/StatusTags";
import { useState, useEffect, useRef } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import useDashboardStore from "../../store/useDashboardStore";
import CategoryManagementTable from "./CategoryManagementTable";
import searchIcon from "../../assets/search-icon.png";
import exportIcon from "../../assets/export-icon.png";
import addNewCategoryIcon from "../../assets/add-new-category-icon.png";
import AddCategoryModal from "./AddCategoryModal";

const CategoryManagement = ({
  data,
  loading,
  currentPage,
  recordsPerPage,
  totalRecords,
  onPageChange,
}) => {
  const tableRef = useRef(null);

  const [formErrors, setFormErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSave = () => {
    console.log("Saving category:", formData);
    setIsModalOpen(false);
  };

  const handleDiscard = () => {
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const users = useDashboardStore((state) => state.users);
  const setUsers = useDashboardStore((state) => state.setUsers);

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
    <section
      className="fixed top-[122px] left-0 xl:left-[297px] w-[calc(100%-0px)] xl:w-[calc(100%-329px)] bg-white px-4 py-3 z-20 flex flex-col"
      style={{
        height: "calc(100vh - 162px - 64px)",
        // width: window.innerWidth >= 768 ? "calc(100% - 297px)" : "100%",
      }}
    >
      <div className="mb-2 flex justify-between items-center">
        {/* Search Icon */}
        <div className="border border-[#D9D9D9] p-3 rounded-[4px]">
          <img src={searchIcon} alt="search-icon" />
        </div>
        <div className="flex items-center gap-2">
          {/* Export Button */}
          <button
            type="button"
            className="cursor-pointer border text-sm p-1 border-[#D9D9D9] rounded-[5px]"
          >
            <img src={exportIcon} alt="export-icon" className="inline mr-2" />
            <span>Export</span>
          </button>
          {/* Add New Category Button */}
          <button
            type="button"
            className="cursor-pointer text-sm rounded-[5px] flex items-center"
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src={addNewCategoryIcon}
              alt="add-new-category-icon"
              className="inline mr-2"
            />
          </button>
          <AddCategoryModal
            handleCloseModal={handleCloseModal}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleSave={handleSave}
            handleDiscard={handleDiscard}
          />
        </div>
      </div>
      <div
        ref={tableRef}
        className="overflow-auto custom-scrollbar"
        style={{ maxHeight: "100%" }}
      >
        <CategoryManagementTable />
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
    </section>
  );
};

export default CategoryManagement;
