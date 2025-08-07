import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

function AddPackage({ onClose, prevData, isEditMode }) {
  const [featureOpen, setFeatureOpen] = useState(false);
  const dropdownRef = useRef(null);

  const types = ["Free", "Paid"];
  const audiences = ["End User", "Jeweler", "Brand", "Retailer"];
  const featureOptions = [
    "E-mail Support",
    "Feature 1",
    "Feature 2",
    "Feature 3",
  ];

  const validationSchema = Yup.object({
    name: Yup.string().required("Package name is required."),

    validityDays: Yup.number()
      .required("Please specify the validity period in days")
      .min(1, "Must be at least 1 day"),

    type: Yup.string().required("Type is required"),

    price: Yup.number()
      .required("Price is required")
      .min(0, "Price must be non-negative")
      .test(
        "price-check",
        "Free packages cannot have a price.",
        function (value) {
          const { type } = this.parent;
          return !(type === "Free" && value > 0);
        }
      )
      .test(
        "paid-check",
        "Price is required for Paid packages",
        function (value) {
          const { type } = this.parent;
          return !(type === "Paid" && value <= 0);
        }
      ),

    targetAudience: Yup.string().required("Please select a valid Targeted Audiences"),

    features: Yup.array()
      .min(1, "Add at least one feature to the package.")
      .of(Yup.string()),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      validityDays: "",
      type: "",
      price: "",
      targetAudience: "",
      features: [],
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      console.log("Validated Data:", values);
      // Add POST API logic here
      alert("Package saved successfully.");
    },
  });

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setFeatureOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleFeature = (feature) => {
    const selected = formik.values.features;
    if (selected.includes(feature)) {
      formik.setFieldValue(
        "features",
        selected.filter((f) => f !== feature)
      );
    } else {
      formik.setFieldValue("features", [...selected, feature]);
    }
  };

  useEffect(()=>{
    if(!isEditMode){
      prevData = null;
    }
  })


useEffect(() => {
  // console.log("prev: ", prevData);
  if (prevData && Object.keys(prevData).length !== 0) {
    formik.setValues({
      name: prevData.name || "",
      validityDays: prevData.validityDays || "",
      type: prevData.type || "",
      price: prevData.price || "0",
      targetAudience: prevData.targetAudience || "",
      features: prevData.features || [],
    });
  } else {
    formik.resetForm();
  }

}, [prevData]); 


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-lg w-[500px] p-6 relative overflow-y-auto max-h-[98vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Package</h2>
          <button
            className="text-gray-500 text-xl hover:text-black"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">
              Package Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Type here..."
              className="w-full px-3 py-2 border rounded-md text-sm border-gray-300"
            />
            {formik.touched.name && formik.errors.name && (
              <span className="text-red-500 text-sm">{formik.errors.name}</span>
            )}
          </div>

          {/* Validity */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">
              Occurrence (Days)<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="validityDays"
              value={formik.values.validityDays}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Type here..."
              className="w-full px-3 py-2 border rounded-md text-sm border-gray-300"
            />
            {formik.touched.validityDays && formik.errors.validityDays && (
              <span className="text-sm text-red-500">
                {formik.errors.validityDays}
              </span>
            )}
          </div>

          {/* Type */}
          <div>
            <label className="text-sm font-medium mb-1 block">
              Type<span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border rounded-md text-sm text-gray-500 border-gray-300"
            >
              <option value="" disabled>
                Select Type
              </option>
              {types.map((t) => (
                <option key={t} value={t} className="text-black">
                  {t}
                </option>
              ))}
            </select>
            {formik.touched.type && formik.errors.type && (
              <div className="text-sm text-red-500">{formik.errors.type}</div>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm mb-1 font-medium">
              Price<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Type here..."
              className="w-full px-3 py-2 border rounded-md text-sm border-gray-300"
            />
            {formik.touched.price && formik.errors.price && (
              <div className="text-sm text-red-500">{formik.errors.price}</div>
            )}
          </div>

          {/* Audience */}
          <div>
            <label className="block text-sm mb-1 font-medium">
              Target Audience<span className="text-red-500">*</span>
            </label>
            <select
              name="targetAudience"
              value={formik.values.targetAudience}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border rounded-md text-sm text-gray-500 border-gray-300"
            >
              <option value="" disabled>
                Select Audience
              </option>
              {audiences.map((aud) => (
                <option key={aud} value={aud} className="text-black">
                  {aud}
                </option>
              ))}
            </select>
            {formik.touched.targetAudience && formik.errors.targetAudience && (
              <div className="text-sm text-red-500">
                {formik.errors.targetAudience}
              </div>
            )}
          </div>

          {/* Feature List */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Feature List<span className="text-red-500">*</span>
            </label>
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setFeatureOpen(!featureOpen)}
                className="border rounded-md px-3 py-2 cursor-pointer text-sm bg-white shadow-sm text-gray-500 border-gray-300"
              >
                {formik.values.features.length > 0
                  ? formik.values.features.join(", ")
                  : "Select Features"}
              </div>

              {featureOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg max-h-60 overflow-y-auto border">
                  {featureOptions.map((feature) => (
                    <label
                      key={feature}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={formik.values.features.includes(feature)}
                        onChange={() => toggleFeature(feature)}
                        className="form-checkbox text-indigo-600 rounded mr-2"
                      />
                      {feature}
                    </label>
                  ))}
                </div>
              )}


              
              {formik.touched.features && formik.errors.features && (
                <span className="text-sm text-red-500">
                  {formik.errors.features}
                </span>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-5">
            <span className="w-full">
              <button
                type="button"
                className="border py-2 rounded text-sm w-full"
                onClick={onClose}
              >
                Discard
              </button>
            </span>
            <span className="w-full">
              <button
                type="submit"
                className="bg-[#141432] text-white border py-2 rounded text-sm w-full"
              >
                Save
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPackage;
