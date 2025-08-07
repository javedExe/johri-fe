import axios from "../utils/axiosInstance";
import { create } from "zustand";
import { parsePhoneNumberFromString } from "libphonenumber-js";
// import { isValidNumber, parsePhoneNumberFromString } from "libphonenumber-js";

const useDashboardStore = create((set) => ({
  users: [],
  setUsers: (users) => set({ users }),

  totalUsers: 0,
  usersLoading: false,
  usersError: null,
  page: 1,
  limit: 10,
  search: "",
  status: "",

  isUserModalOpen: false,
  userModalMode: null, // "add" or "edit"
  selectedUser: null,
  openUserModal: (mode, user) => {
    set({
      isUserModalOpen: true,
      userModalMode: mode,
      selectedUser: user,
    });
  },

  closeUserModal: () =>
    set({ isUserModalOpen: false, userModalMode: null, selectedUser: null }),

  setSearch: (search) => set({ search, page: 1 }),
  setStatus: (status) => set({ status, page: 1 }),
  setPage: (page) => set({ page }),
  setLimit: (newLimit) => set({ limit: newLimit }),

  validateUserForm: (formData) => {
    const errors = {};

    if (!formData.contactName?.trim()) {
      errors.contactName = "Name is required";
    }

    if (!formData.contactEmail?.trim()) {
      errors.contactEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      errors.contactEmail = "Invalid email";
    }

    if (!formData.contactPhone?.trim()) {
      errors.contactPhone = "Phone number is required";
    } else {
      const parsed = parsePhoneNumberFromString(formData.contactPhone, "IN");
      if (!parsed || !parsed.isValid()) {
        errors.contactPhone = "Invalid phone number";
      }
    }

    if (!formData.status) {
      errors.status = "Status is required";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },

  fetchUsers: async () => {
    set({ usersLoading: true, usersError: null });
    const { search, status, page, limit } = useDashboardStore.getState();

    try {
      const response = await axios.get("/admin/dashboard/users", {
        params: { page, limit, search, status },
      });

      set({
        users: response.data.users.map((user) => ({
          ...user,
          status: user.status.toLowerCase(),
        })),
        totalUsers: response.data.total,
        page: response.data.page,
        limit: response.data.limit,
        usersLoading: false,
      });
    } catch (error) {
      console.error("Fetch Users Error:", error);
      set({
        users: [],
        usersError: error.response?.data?.message || error.message,
        usersLoading: false,
      });
    }
  },

  addUser: async (formData) => {
    const { isValid, errors } = useDashboardStore
      .getState()
      .validateUserForm(formData);

    if (!isValid) {
      return { success: false, errors };
    }

    try {
      const response = await axios.post("/admin/dashboard/user", formData);
      const user = response.data.user;

      if (!user || !user.contactName || !user.id) {
        throw new Error("Invalid user data from API");
      }

      return { success: true, data: user };
    } catch (error) {
      console.log("add user error:", error);
      return {
        success: false,
        errors: { api: error.response?.data?.message || error.message },
      };
    }
  },

  updateUser: async (userId, formData) => {
    const { isValid, errors } = useDashboardStore
      .getState()
      .validateUserForm(formData);

    if (!isValid) {
      return { success: false, errors };
    }

    try {
      const response = await axios.put(
        `/admin/dashboard/user/${userId}`,
        formData
      );

      const updatedUser = response.data;

      // If response is missing fields, merge with submitted formData
      const finalUser = {
        ...formData,
        ...updatedUser, // prioritize backend values
        status: (updatedUser?.status || formData.status || "").toLowerCase(),
      };

      // ✅ Update Zustand state
      set((state) => ({
        users: state.users.map((user) =>
          user.id === userId ? { ...user, ...finalUser } : user
        ),
      }));

      return { success: true, data: updatedUser };
    } catch (error) {
      console.log("update error:", error);
      return {
        success: false,
        errors: { api: error.response?.data?.message || error.message },
      };
    }
  },

  deleteUser: async (userId) => {
    try {
      await axios.delete(`/admin/dashboard/user/${userId}`);
      set((state) => ({
        users: state.users.filter((u) => u.id !== userId),
      }));
    } catch (error) {
      console.error("Delete user error:", error);
      throw error;
    }
  },
}));

export default useDashboardStore;
