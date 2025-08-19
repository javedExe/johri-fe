import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

function AddUser({ onClose }) {
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required."),
    email: Yup.string().email("Invalid email").required("Email is required."),
    phoneNumber: Yup.string().required("Phone Number is required.")
      .length(10, "Enter Valid number."),
    status: Yup.string().required("Status is required."),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      status: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Validated Data:", values);
      alert("User saved successfully.");
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-lg w-[500px] p-6 relative overflow-y-auto max-h-[98vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add User</h2>
          <button
            className="text-gray-500 text-xl hover:text-black"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form noValidate onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">
              Full Name :
            </label>
            <input
              type="text"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Type here..."
              className="w-full px-3 py-2 border rounded-md text-sm border-gray-300"
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <span className="text-red-500 text-sm">{formik.errors.fullName}</span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">
              Email Address :
            </label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Type here..."
              className="w-full px-3 py-2 border rounded-md text-sm border-gray-300"
            />
            {formik.touched.email && formik.errors.email && (
              <span className="text-red-500 text-sm">{formik.errors.email}</span>
            )}
          </div>

          {/* Phone + Status in same row */}
          <div className="flex gap-4">
            {/* Phone */}
            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium mb-1">Phone Number</label>
              <div className="flex">
                <select
                  className="px-2 py-2 border border-gray-300 rounded-l-md text-sm"
                  disabled
                >
                  <option>IN</option>
                </select>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Type here..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-r-md text-sm"
                />
              </div>
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <span className="text-red-500 text-sm">{formik.errors.phoneNumber}</span>
              )}
            </div>

            {/* Status */}
            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium mb-1">Status:</label>
              <select
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border rounded-md text-sm border-gray-300"
              >
                <option value="" disabled>Select Type</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {formik.touched.status && formik.errors.status && (
                <span className="text-red-500 text-sm">{formik.errors.status}</span>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-5 mt-4">
            <button
              type="button"
              className="border py-2 rounded text-sm w-full"
              onClick={onClose}
            >
              Discard
            </button>
            <button
              type="submit"
              className="bg-[#141432] text-white border py-2 rounded text-sm w-full"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
