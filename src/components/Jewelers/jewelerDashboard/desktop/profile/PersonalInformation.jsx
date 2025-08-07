import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { indianStatesAndUTs } from "../../dummy";

export default function PersonalInformation() {
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Please enter a valid name")
                           .max(100, "Name is too long"),

    lastName: Yup.string().max(100, "Name is too long"),

    email: Yup.string().email("Invalid email").required("Email is required"),

    phoneNumber: Yup.string()
      .required("Enter a valid phone number.")
      .matches(/^[0-9]{10,15}$/, "Enter a valid phone number."),


    address: Yup.string().required("Address cannot be empty.")
                          .max(250, "Address is too long."),

    city: Yup.string(),

    state: Yup.string(),
    
    pinCode: Yup.string()
      .matches(/^[0-9]{6}$/, "Pin code must be 6 digits")
      .nullable(),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      city: "",
      state: "",
      pinCode: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Saved Data", values);
    },
  });

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    formik;

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white me-2 p-9 rounded-xl shadow-md space-y-4 border-1 border-[#ABB5D3] mb-5 pb-15">
        <h2 className="text-xl font-semibold mb-1">Personal Information</h2>
        <p className="text-sm text-gray-500 mb-6">
          Manage your basic contact and identity details.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-3 text-sm font-medium">
              First Name<span className="text-red-600">*</span>
            </label>
            <input
              name="firstName"
              type="text"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border border-[#D9D9D9] rounded-md text-sm"
              placeholder="John"
            />
            {touched.firstName && errors.firstName && (
              <div className="text-red-500 text-sm mt-1">
                {errors.firstName}
              </div>
            )}
          </div>

          <div>
            <label className="block mb-3 text-sm font-medium">Last Name</label>
            <input
              name="lastName"
              type="text"
              value={values.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-[#D9D9D9] rounded-md text-sm"
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <div>
            <label className="block mb-3 text-sm font-medium">
              Email Address<span className="text-red-600">*</span>
            </label>
            <input
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border border-[#D9D9D9] rounded-md text-sm"
              placeholder="john.doe@example.com"
            />
            {touched.email && errors.email && (
              <div className="text-red-500 text-sm mt-1">{errors.email}</div>
            )}
          </div>

          <div>
            <label className="block mb-3 text-sm font-medium">
              Phone Number<span className="text-red-600">*</span>
            </label>
            <input
              name="phoneNumber"
              type="text"
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border border-[#D9D9D9] rounded-md text-sm"
              placeholder="1234567890"
            />
            {touched.phoneNumber && errors.phoneNumber && (
              <div className="text-red-500 text-sm mt-1">
                {errors.phoneNumber}
              </div>
            )}
          </div>
        </div>

        <div className="mt-5">
          <label className="block mb-1 text-sm font-medium">
            Address<span className="text-red-600">*</span>
          </label>
          <textarea
            name="address"
            rows={5}
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-2 border border-[#D9D9D9] rounded-md text-sm"
            placeholder="6391 Elgin St. Celina, Delaware 10299"
          ></textarea>
          {touched.address && errors.address && (
            <div className="text-red-500 text-sm mt-1">{errors.address}</div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <div>
            <label className="block mb-3 text-sm font-medium">City</label>
            <input
              name="city"
              type="text"
              value={values.city}
              onChange={handleChange}
              className="w-full p-2 border border-[#D9D9D9] rounded-md text-sm"
              placeholder="Mumbai"
            />
          </div>

          <div>
            <label className="block mb-3 text-sm font-medium">State</label>
            <select
              name="state"
              value={values.state}
              onChange={handleChange}
              className="w-full p-2 border border-[#D9D9D9] rounded-md text-sm text-[#616060]"
            >
              <option value="">Select State</option>
              {indianStatesAndUTs.map(({ name, value }) => (
                <option key={value} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-3 text-sm font-medium">Pin Code</label>
            <input
              name="pinCode"
              type="text"
              value={values.pinCode}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border border-[#D9D9D9] rounded-md text-sm"
              placeholder="123456"
            />
            {touched.pinCode && errors.pinCode && (
              <div className="text-red-500 text-sm mt-1">{errors.pinCode}</div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 text-sm">
        <button
          type="button"
          className="w-1/4 px-4 py-2 border border-[#323267] text-[#323267] rounded-md hover:bg-gray-100 hover:cursor-pointer"
        >
          Discard Changes
        </button>
        <button
          type="submit"
          className="w-1/4 px-4 py-2 bg-[#1C1C3A] text-white rounded-md hover:cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
