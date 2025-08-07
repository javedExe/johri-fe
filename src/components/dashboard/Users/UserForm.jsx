import { useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import useDashboardStore from "../../../store/useDashboardStore";

const UserModal = ({ isOpen, onClose, user, onSave, mode }) => {
  const { validateUserForm } = useDashboardStore();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    status: "Active",
  });

  useEffect(() => {
    if ((mode === "edit" && user) || (mode === "add" && user)) {
      const normalizedStatus =
        user?.status === "ACTIVE"
          ? "Active"
          : user?.status === "INACTIVE"
          ? "Inactive"
          : "Active";

      setFormData({
        contactName: user?.contactName || "",
        contactEmail: user?.contactEmail || "",
        contactPhone: user?.contactPhone || "",
        status: normalizedStatus,
      });
    }

    if (mode === "add") {
      setFormData({
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        status: "Active",
      });
      setErrors({});
    }
  }, [user, mode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, errors } = validateUserForm(formData);

    if (!isValid) {
      setErrors(errors);
      return;
    }

    const payload = {
      contactName: formData.contactName,
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone,
      status: formData.status.toUpperCase(),
    };

    if (mode === "edit") {
      payload.id = user.id;
    }

    onSave(payload);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/10 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">
          {mode === "add" ? "Add User" : "Edit User"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="contactName" className="text-[#333333]">
            Full Name
          </label>
          <input
            type="text"
            name="contactName"
            placeholder="Name"
            value={formData.contactName}
            onChange={handleChange}
            className="w-full border border-[#D9D9D9] px-3 py-2 rounded"
          />
          {errors.contactName && (
            <p className="text-red-500 text-sm">{errors.contactName}</p>
          )}

          <label htmlFor="contactEmail" className="text-[#333333]">
            Email
          </label>
          <input
            type="email"
            name="contactEmail"
            placeholder="Email"
            value={formData.contactEmail}
            onChange={handleChange}
            className="w-full border border-[#D9D9D9] px-3 py-2 rounded"
          />
          {errors.contactEmail && (
            <p className="text-red-500 text-sm">{errors.contactEmail}</p>
          )}

          <div className="flex gap-8">
            <div className="flex flex-col w-full">
              <label htmlFor="contactPhone" className="text-[#333333] mb-1">
                Phone
              </label>
              <PhoneInput
                country={"in"}
                value={formData.contactPhone}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    contactPhone: `+${value}`,
                  }))
                }
                inputClass="!w-full !border !border-[#D9D9D9] !rounded !py-2 !pl-12 !pr-3"
                buttonClass="!border-r !border-[#D9D9D9] !bg-white"
                dropdownClass="!rounded"
                containerClass="!w-full !text-[#333333]"
              />
              {errors.contactPhone && (
                <p className="text-red-500 text-sm">{errors.contactPhone}</p>
              )}
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="status" className="text-[#333333] mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-[#D9D9D9] px-3 py-2 rounded"
              >
                <option value="Status">Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between gap-8 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#1C1C3A] bg-white rounded w-full cursor-pointer"
            >
              Discard
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#1C1C3A] text-white rounded w-full cursor-pointer"
            >
              {mode === "add" ? "Add" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
