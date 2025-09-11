import React, { useState } from "react";
import axios from "../../../../utils/axiosInstance";
import { useFormik } from "formik";
import * as Yup from "yup";

function AddUser({ onClose, formData, setReload }) {

  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    first_name: Yup.string().required("Name is required."),
    // last_name: Yup.string().required("Last Name is required."),
    email: Yup.string().email("Invalid email").required("Email is required."),
    phone_number: Yup.string().required("Phone Number is required.")
      .length(10, "Enter Valid number."),
    status: Yup.string().required("Status is required."),
  });

  const formik = useFormik({
    initialValues: {
      first_name: formData.first_name || "",
      last_name: formData.last_name|| "",
      email: formData.email || "",
      phone_number: formData.phone_number || "",
      status: formData.status || false,
    },
    validationSchema,
    onSubmit: async (values) => {

      const filteredValues = Object.fromEntries(
        Object.entries(values).filter(
          ([_, v]) => v !== "" && v !== null && v !== undefined 
          && (typeof v !== "boolean" || v === true) 
        )
      );

      setLoading(true);
            try{
              // await axios.delete(`/enduser/${id}/delete`, filteredValues);
              await axios.delete(`/enduser/delete`, filteredValues);
              setReload();
              onClose();
            }catch(err){
              console.log("Error occured", err);
            }finally{
              setLoading(false);
            }

      console.log("Validated Data:", filteredValues);
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
          <div className="flex flex-col sm:flex-row gap-3">
            
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">
              First Name :
            </label>
            <input
              type="text"
              name="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Type here..."
              className="w-full px-3 py-2 border rounded-md text-sm border-gray-300"
            />
            {formik.touched.first_name && formik.errors.first_name && (
              <span className="text-red-500 text-sm">{formik.errors.first_name}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">
              Last Name :
            </label>
            <input
              type="text"
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Type here..."
              className="w-full px-3 py-2 border rounded-md text-sm border-gray-300"
            />
            {formik.touched.last_name && formik.errors.last_name && (
              <span className="text-red-500 text-sm">{formik.errors.last_name}</span>
            )}
          </div>



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
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Phone */}
            <div className="flex flex-col w-full">
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
                  name="phone_number"
                  value={formik.values.phone_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Type here..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-r-md text-sm"
                />
              </div>
              {formik.touched.phone_number && formik.errors.phone_number && (
                <span className="text-red-500 text-sm">{formik.errors.phone_number}</span>
              )}
            </div>

            {/* Status */}
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium mb-1">Status:</label>
              <select
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border rounded-md text-sm border-gray-300"
              >
                <option value="" disabled>Select Type</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
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
              className={`text-white border py-2 rounded text-sm w-full ${loading? "bg-[#2a2a47]" : "bg-[#141432]"}`}
              disabled={loading}
            >
              {loading? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
