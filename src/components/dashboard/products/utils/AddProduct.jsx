import React, { useRef, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../../../utils/axiosInstance";
import { FaCirclePlus } from "react-icons/fa6";
import uploadBoxIcon from "../../../../assets/uploadBoxIcon.png";

const MAX_TOTAL_SIZE_MB = 15;
const materialsTypesList = ["Silver", "Gold", "Platinum", "Gemstone", "Diamond"];
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB



// Define category and subcategory mappings
const categoryOptions = [
  { value: "Rings", label: "Rings" },
  { value: "Necklace", label: "Necklace" },
  { value: "Bracelet", label: "Bracelet" },
  { value: "Earrings", label: "Earrings" }
];

const subcategoryOptions = {
  Rings: [
    { value: "Engagement", label: "Engagement Rings" },
    { value: "Wedding", label: "Wedding Bands" },
    { value: "Fashion", label: "Fashion Rings" }
  ],
  Necklace: [
    { value: "Pendant", label: "Pendant Necklaces" },
    { value: "Choker", label: "Chokers" },
    { value: "Chain", label: "Chains" }
  ],
  Bracelet: [
    { value: "Bangle", label: "Bangles" },
    { value: "Cuff", label: "Cuffs" },
    { value: "Charm", label: "Charm Bracelets" }
  ],
  Earrings: [
    { value: "Stud", label: "Stud Earrings" },
    { value: "Hoop", label: "Hoops" },
    { value: "Drop", label: "Drop Earrings" }
  ]
};


function AddProduct({ onClose, prevData, isEditMode }) {

  
  const fileInputRef = useRef(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [materialsOpen, setmaterialsOpen] = useState(false);

  const validationSchema = Yup.object().shape({

    product_name: Yup.string().required("Product name is required")
    .max(100, "Product name is too long."),

    price: Yup.number()
      .min(1, "Enter a valid product price.")
      .required("Enter a valid product price."),
    weight: Yup.number()
      // .min(1, "Enter a valid product weight.")
      .positive("Enter a valid weight.")
      .required("Enter a valid product weight."),

    category: Yup.string().required("Please select a product category."),
  
    subcategory: Yup.string().required("Please select a subcategory"),

    materials: Yup.array().min(1, "Select at least one material"),

    description: Yup.string()
    .max(1000, "Description too long."),

    status: Yup.string().required("Select product availability status"),

    images: Yup.array()
    .min(1, "Upload valid image (JPEG/PNG, max 5MB).")
    .test("is-valid-type", "Only JPEG/PNG files are allowed", (files) =>
      files ? files.every((file) => SUPPORTED_FORMATS.includes(file.type)) : false
    )
    .test("is-valid-size", "Each file must be under 5MB", (files) =>
      files ? files.every((file) => file.size <= MAX_FILE_SIZE) : false
    ),

  });

  const formik = useFormik({
    initialValues: {
      product_name: "",
      price: 0,
      weight: 0,
      category: "",
      subcategory: "",
      materials: [],
      description: "",
      status: "",
      images: [],
    },
    validationSchema,
    onSubmit: async (values) => {

      try {
      // 1. Create FormData object
      const formData = new FormData();

      // 2. Transform status to availability
      const { status, product_name, ...rest } = values;
      const submissionData = {
        ...rest,
        availability: status,
        name: product_name
      };

      // 3. Append all fields to FormData
      Object.entries(submissionData).forEach(([key, value]) => {
        if (key === 'images') {
          // Handle image files
          value.forEach((file) => {
            formData.append('images', file);
          });
        } else if (Array.isArray(value)) {
          // Handle arrays (like materials)
          value.forEach((item) => {
            formData.append(key, item);
          });
        } else {
          // Handle regular fields
          formData.append(key, value);
        }
      });

      console.log("FormData: ", formData);

      formData.append("status", "approved");

      // 4. Make the request with proper headers
      const response = await axios.post('/admin/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      });

      console.log(response);

      if (response.data.success) {
        alert("Product saved successfully.");
        onClose();
      } else {
        alert("Failed to save product: " + (response.data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to save product. Please try again.");
    }
  },
  });

  const handleFiles = (files) => {
    const validFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );
    const totalSize = validFiles.reduce((sum, file) => sum + file.size, 0);
    const currentTotal = formik.values.images.reduce(
      (sum, file) => sum + file.size,
      0
    );

    if (currentTotal + totalSize > MAX_TOTAL_SIZE_MB * 1024 * 1024) {
      alert("Total image size must not exceed 15 MB.");
      return;
    }

    const updatedImages = [...formik.values.images, ...validFiles];
    const updatedPreviews = [
      ...imagePreviews,
      ...validFiles.map((file) => URL.createObjectURL(file)),
    ];

    formik.setFieldValue("images", updatedImages);
    setImagePreviews(updatedPreviews);
  };

  const togglematerials = (materials) => {
    const selected = formik.values.materials;
    if (selected.includes(materials)) {
      formik.setFieldValue(
        "materials",
        selected.filter((m) => m !== materials)
      );
    } else {
      formik.setFieldValue("materials", [...selected, materials]);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    const updatedPreviews = [...imagePreviews];
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
    setImagePreviews(updatedPreviews);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

    // Handle category change - reset subcategory when category changes
const handleCategoryChange = (e) => {
  formik.setFieldValue('category', e.target.value);
  formik.setFieldTouched('category', true, false); // Mark as touched
  formik.setFieldValue('subcategory', '');
};


    // Edite Button Work here

  useEffect(() => {
    if (!isEditMode) {
      prevData = null;
    }
  });

    useEffect(() => {

      console.log("Product preData: ", prevData);

      if (prevData && Object.keys(prevData).length !== 0) {
        formik.setValues({
          product_name: prevData.product_name || "",
          category: prevData.category || "",
          subcategory: prevData.subcategory || "",
          price: prevData.price || "0",
          weight: prevData.weight || "0",
          description: prevData.description || "",
          status: prevData.status || "",
          materials: Array.isArray(prevData.materials)
            ? prevData.materials
            : prevData.materials?.split(",").map((f) => f.trim()) || [],
          images: Array.isArray(prevData.images)
            ? prevData.images
            : prevData.images?.split(",").map((f) => f.trim()) || [],


        });
      } else {
        formik.resetForm();
      }
    }, [prevData]);



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-lg w-[500px] p-6 relative overflow-y-auto max-h-[98vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Product</h2>
          <button
            className="text-gray-500 text-xl hover:text-black"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4" noValidate>
          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium mb-1 block">
              Product Image<span className="text-red-500">*</span>
            </label>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="flex gap-2 flex-wrap border border-dashed border-gray-400 p-3 rounded-lg min-h-[96px]"
            >
              {imagePreviews.map((src, index) => (
                <div key={index} className="relative w-20 h-20">
                  <img
                    src={src}
                    alt={`preview-${index}`}
                    className="w-full h-full object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 text-white bg-black/70 rounded-full px-[5px] leading-none text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}


              {/* Box after Image select */}

              {formik.values.images.length > 0 && (
                <div
                  onClick={() => fileInputRef.current.click()}
                  className="w-20 h-20 flex items-center justify-center cursor-pointer bg-gray-200 rounded hover:bg-gray-300"
                >
                  <FaCirclePlus className="text-gray-400" />
                </div>
              )}


              {/* View before Image select */}

              {formik.values.images.length === 0 && (
                <div
                  className="w-full border-gray-400 rounded-md text-center text-sm text-gray-500 hover:cursor-pointer"
                  onClick={() => fileInputRef.current.click()}
                >
                  <div className="flex justify-center">
                    <img src={uploadBoxIcon} className="w-8 h-8" />
                  </div>
                  <div className="mt-4 text-black">
                    Click or drag file to this area to upload
                  </div>
                  <p className="text-xs mt-2">JPG, PNG (Max 15MB)</p>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={(e) => handleFiles(e.target.files)}
                className="hidden"
              />
            </div>
            {formik.errors.images && formik.touched.images && (
              <p className="text-sm text-red-500 mt-1">
                {formik.errors.images}
              </p>
            )}
          </div>

          {/* Product Name */}
          <div>
            <div>
              <label className="text-sm font-medium mb-1">
                Product Name<span className="text-red-500">*</span>
              </label>
            </div>
              <input
                name="product_name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.product_name}
                className="w-full border border-gray-400 rounded px-3 py-2 text-sm"
              />
              {formik.errors.product_name && formik.touched.product_name && (
                <p className="text-sm text-red-500">
                  {formik.errors.product_name}
                </p>
              )}
          </div>

          {/* Product Name and Price */}
          <div className="flex gap-4">
            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium mb-1">
                Product Weight<span className="text-red-500">*</span>
              </label>
              <input
                name="weight"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.weight}
                className="border border-gray-400 rounded px-3 py-2 text-sm"
              />
              {formik.errors.weight && formik.touched.weight && (
                <p className="text-sm text-red-500">
                  {formik.errors.weight}
                </p>
              )}
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium mb-1">
                Price (INR)<span className="text-red-500">*</span>
              </label>
              <input
                name="price"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
                className="border border-gray-400 rounded px-3 py-2 text-sm"
              />
              {formik.errors.price && formik.touched.price && (
                <p className="text-sm text-red-500">{formik.errors.price}</p>
              )}
            </div>
          </div>
          {/* <div className="flex gap-4">
            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium mb-1">
                Product Name<span className="text-red-500">*</span>
              </label>
              <input
                name="product_name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.product_name}
                className="border border-gray-400 rounded px-3 py-2 text-sm"
              />
              {formik.errors.product_name && formik.touched.product_name && (
                <p className="text-sm text-red-500">
                  {formik.errors.product_name}
                </p>
              )}
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium mb-1">
                Price (INR)<span className="text-red-500">*</span>
              </label>
              <input
                name="price"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
                className="border border-gray-400 rounded px-3 py-2 text-sm"
              />
              {formik.errors.price && formik.touched.price && (
                <p className="text-sm text-red-500">{formik.errors.price}</p>
              )}
            </div>
          </div> */}

          {/* Category */}
          {/* <div>
            <label className="text-sm font-medium mb-1 block">
              Category<span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
              className="border border-gray-400 rounded w-full px-3 py-2 text-sm"
            >
              <option value="">Select Category</option>
              <option value="Rings">Rings</option>
              <option value="Necklace">Necklace</option>
              <option value="Bracelet">Bracelet</option>
            </select>
            {formik.errors.category && formik.touched.category && (
              <p className="text-sm text-red-500">{formik.errors.category}</p>
            )}
          </div> */}


        {/* Category Dropdown */}
        <div>
          <label className="text-sm font-medium mb-1 block">
            Category<span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            onChange={handleCategoryChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
            className="border border-gray-400 rounded w-full px-3 py-2 text-sm"
          >
            <option value="">Select Category</option>
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {formik.errors.category && formik.touched.category && (
            <p className="text-sm text-red-500">{formik.errors.category}</p>
          )}
        </div>

        {/* Subcategory Dropdown (only shown when category is selected) */}
        {formik.values.category && (
          <div>
            <label className="text-sm font-medium mb-1 block">
              Subcategory<span className="text-red-500">*</span>
            </label>
            <select
              name="subcategory"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.subcategory}
              className="border border-gray-400 rounded w-full px-3 py-2 text-sm"
            >
              <option value="">Select Subcategory</option>
              {subcategoryOptions[formik.values.category]?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {formik.errors.subcategory && formik.touched.subcategory && (
              <p className="text-sm text-red-500">{formik.errors.subcategory}</p>
            )}
          </div>
        )}

          {/* Material */}
          <div className="">
            <label className="text-sm font-medium mb-1 block">
              Material Types<span className="text-red-500">*</span>
            </label>
            <div className="relative">
            <div
              className="border rounded w-full px-3 py-2 text-sm border-gray-400"
              onClick={() => setmaterialsOpen(!materialsOpen)}
            >
              {formik.values.materials.length > 0
                ? formik.values.materials.join(", ")
                : "Select materials"}
            </div>

            {materialsOpen && (
              <div className="absolute z-10 mt-1 rounded-md bg-white shadow-lg max-h-60 overflow-y-auto border w-full">
                {materialsTypesList.map((materials) => (
                  <label
                    key={materials}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={formik.values.materials.includes(materials)}
                      onChange={() => togglematerials(materials)}
                      className="form-checkbox text-indigo-600 rounded mr-2"
                    />
                    {materials}
                  </label>
                ))}
              </div>
            )}
            {formik.touched.materials && formik.errors.materials && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.materials}
              </div>
            )}

            </div>
          </div>


          {/* Description */}
          <div>
            <label className="text-sm font-medium mb-1 block">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              placeholder="Type here..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className="border border-gray-400 rounded w-full px-3 py-2 text-sm"
            />
          </div>

          {/* Availability */}
          <div>
            <label className="text-sm font-medium mb-1 block">
              Availability<span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.status}
              className="border border-gray-400 rounded w-full px-3 py-2 text-sm"
            >
              <option value="">Select Type</option>
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
            {formik.errors.status && formik.touched.status && (
              <p className="text-sm text-red-500">{formik.errors.status}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              className="border px-4 py-2 rounded text-sm w-1/2"
              onClick={onClose}
            >
              Discard
            </button>
            <button
              type="submit"
              className="bg-[#141432] text-white px-6 py-2 rounded text-sm w-1/2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
