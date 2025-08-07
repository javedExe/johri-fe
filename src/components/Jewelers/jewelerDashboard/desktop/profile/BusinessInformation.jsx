import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { indianStatesAndUTs } from "../../dummy";
import UploadFileWithText from "../../../../ui/UploadFileWithText";
import DashedUploadBox from "../../../../ui/DashedUploadBox";

const validationSchema = Yup.object().shape({
  businessName: Yup.string().required("Please enter a valid name.")
                            .max(100, "Name is too long."),

  businessType: Yup.string().required("Please select a Business type."),

  storeType: Yup.string().required("Please select a store type."),

  ownerName: Yup.string().required("Please enter a valid name.")
                            .max(100, "Name is too long."),

  numberOfShops: Yup.number().required("Please enter a valid Shop number.").min(1, "Shop can not be less then 1."),

  address: Yup.string().required("Address cannot be empty."),

  city: Yup.string().required("City cannot be empty."),

  state: Yup.string().required("State cannot be empty."),
  
  pinCode: Yup.string()
    .required("Pin code cannot be empty.")
    .matches(/^\d{6}$/, "Pin code must be 6 digits"),
});

export default function BusinessInformation() {
  const initialValues = {
    businessName: "",
    businessType: "",
    storeType: "",
    ownerName: "",
    numberOfShops: 1,
    address: "",
    city: "",
    state: "",
    pinCode: "",
  };

  const handleSubmit = (values) => {
    console.log("Submitted values:", values);
    // handle file upload & API here
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {() => (
        <Form className="">
          <div className="g-white me-2 p-9 rounded-xl shadow-md space-y-4 border-1 border-[#ABB5D3] mb-5 pb-5">
            <h2 className="text-xl font-semibold mb-1">Business Information</h2>
            <p className="text-sm text-gray-500 mb-6">Provide details about your business and legal standing.</p>

            {/* Basic Info */}
            <div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Business Name<span className="text-red-500">*</span></label>
                <Field name="businessName" type="text" className="w-full p-2 border-1 border-[#D9D9D9] rounded-md text-sm mt-2" placeholder="Gems n Jewels" />
                <ErrorMessage name="businessName" component="div" className="text-sm text-red-500 mt-1" />
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700">Business Type<span className="text-red-500">*</span></label>
                <Field as="select" name="businessType" className="w-full mt-2 p-2 border-1 border-[#D9D9D9] rounded-md text-sm text-[#616060]">
                  <option value="">Select Type</option>
                  <option value="Proprietorship">Proprietorship</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Private Ltd">Private Ltd</option>
                </Field>
                <ErrorMessage name="businessType" component="div" className="text-sm text-red-500 mt-1" />
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700">Store Type<span className="text-red-500">*</span></label>
                <Field as="select" name="storeType" className="w-full mt-2 p-2 border-1 border-[#D9D9D9] rounded-md text-sm text-[#616060]">
                  <option value="">Select Store Type</option>
                  <option value="Retailer Store">Retailer Store</option>
                  <option value="Jeweller Store">Jeweller Store</option>
                  <option value="Both">Both</option>
                </Field>
                <ErrorMessage name="storeType" component="div" className="text-sm text-red-500 mt-1" />
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700">Owner / Director Name(s)<span className="text-red-500">*</span></label>
                <Field name="ownerName" type="text" className="w-full p-2 border-1 border-[#D9D9D9] rounded-md text-sm mt-2" placeholder="John Doe" />
                <ErrorMessage name="ownerName" component="div" className="text-sm text-red-500 mt-1" />
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700">Number of Shops<span className="text-red-500">*</span></label>
                <Field name="numberOfShops" type="number" className="w-full p-2 border-1 border-[#D9D9D9] rounded-md text-sm mt-2" />
                <ErrorMessage name="numberOfShops" component="div" className="text-sm text-red-500 mt-1" />
              </div>

              <div className="md:col-span-2 mt-5">
                <label className="block text-sm font-medium text-gray-700">Address<span className="text-red-500">*</span></label>
                <Field as="textarea" name="address" rows={4} placeholder="6391 Elgin St. Celina, Delaware 10299" className="w-full p-2 mt-2 border-1 border-[#D9D9D9] rounded-md text-sm" />
                <ErrorMessage name="address" component="div" className="text-sm text-red-500 mt-1" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                <div>
                  <label className="block mb-3 text-sm font-medium">City<span className="text-red-500">*</span></label>
                  <Field name="city" type="text" className="w-full p-2 border-1 border-[#D9D9D9] rounded-md text-sm" placeholder="Mumbai" />
                  <ErrorMessage name="city" component="div" className="text-sm text-red-500 mt-1" />
                </div>

                <div>
                  <label className="block mb-3 text-sm font-medium">State<span className="text-red-500">*</span></label>
                  <Field as="select" name="state" className="w-full p-2 border-1 border-[#D9D9D9] rounded-md text-sm text-[#616060]">
                    <option value="">Select State</option>
                    {indianStatesAndUTs.map(({ name, value }) => (
                      <option key={value} value={name}>
                        {name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="state" component="div" className="text-sm text-red-500 mt-1" />
                </div>

                <div>
                  <label className="block mb-3 text-sm font-medium">Pin Code<span className="text-red-500">*</span></label>
                  <Field name="pinCode" type="text" className="w-full p-2 border-1 border-[#D9D9D9] rounded-md text-sm" placeholder="123456" />
                  <ErrorMessage name="pinCode" component="div" className="text-sm text-red-500 mt-1" />
                </div>
              </div>
            </div>

            {/* Identity Documents */}
            <div className="mt-10">
              <h3 className="text-md font-semibold mb-1">Identity & Legal Documents</h3>
              <p className="text-xs text-gray-500 mb-6">Upload clear scans/photos of your documents. Max 5MB per file. Accepted formats: JPG, PNG, PDF.</p>
              <div className="space-y-6">
                <UploadFileWithText textLable="PAN Number" uploadLable="PAN Card" />
                <UploadFileWithText textLable="GST Number" uploadLable="GST Certificate" />
                <UploadFileWithText textLable="DIN Number" uploadLable="DIN Certificate" />
                <UploadFileWithText textLable="PAN of Partners" uploadLable="PAN" />
                <UploadFileWithText textLable="CIN Number" uploadLable="COI Certificate" />
              </div>
            </div>

            {/* Supporting Documents */}
            <div className="mt-15">
              <h3 className="text-md font-semibold mb-1">Supporting Documents</h3>
              <p className="text-xs text-gray-500 mb-8">Upload clear scans/photos of your documents. Max 5MB per file. Accepted formats: JPG, PNG, PDF.</p>
              <div className="space-y-4">
                <DashedUploadBox label="Shop and Establishment License (if applicable)" className="mt-5" />
                <DashedUploadBox label="Udyam Registration / MSME Certificate" className="mt-8" />
                <DashedUploadBox label="Address Proof of Business (e.g., utility bill)" className="mt-8" />
                <DashedUploadBox label="Board Resolution for Authorized Signatory (if applicable)" className="mt-8" />
                <DashedUploadBox label="Digital Signature Certificate (DSC)" className="mt-8" />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2 text-sm mt-4">
            <button type="button" className="w-1/4 px-4 py-2 border border-[#323267] text-[#323267] rounded-md hover:bg-gray-100 hover:cursor-pointer">
              Discard Changes
            </button>
            <button type="submit" className="w-1/4 px-4 py-2 bg-[#1C1C3A] text-white rounded-md hover:cursor-pointer">
              Save Changes
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
