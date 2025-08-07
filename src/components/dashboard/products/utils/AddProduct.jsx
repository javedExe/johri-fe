import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaCirclePlus } from "react-icons/fa6";
import uploadBoxIcon from "../../../../assets/uploadBoxIcon.png";

const MAX_TOTAL_SIZE_MB = 15;
const materialTypesList = ["Silver", "Gold", "Platinum", "Gemstone", "Diamond"];
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB


function AddProduct({ onClose }) {

  
  const fileInputRef = useRef(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [materialOpen, setMaterialOpen] = useState(false);

  const validationSchema = Yup.object().shape({

    product_name: Yup.string().required("Product name is required")
    .max(100, "Product name is too long."),

    price: Yup.number()
      .min(1, "Enter a valid product price.")
      .required("Enter a valid product price."),

    category: Yup.string().required("Please select a product category."),

    material: Yup.array().min(1, "Select at least one material"),

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
      category: "",
      material: [],
      description: "",
      status: "",
      images: [],
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Submitted:", values);
      alert(`Product Added Successfully! \n${values.product_name} is now in your catalog.`);
      onClose();
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

  const toggleMaterial = (material) => {
    const selected = formik.values.material;
    if (selected.includes(material)) {
      formik.setFieldValue(
        "material",
        selected.filter((m) => m !== material)
      );
    } else {
      formik.setFieldValue("material", [...selected, material]);
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

          {/* Product Name and Price */}
          <div className="flex gap-4">
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
          </div>

          {/* Category */}
          <div>
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
          </div>

          {/* Material */}
          <div className="">
            <label className="text-sm font-medium mb-1 block">
              Material Types<span className="text-red-500">*</span>
            </label>
            <div className="relative">
            <div
              className="border rounded w-full px-3 py-2 text-sm border-gray-400"
              onClick={() => setMaterialOpen(!materialOpen)}
            >
              {formik.values.material.length > 0
                ? formik.values.material.join(", ")
                : "Select materials"}
            </div>

            {materialOpen && (
              <div className="absolute z-10 mt-1 rounded-md bg-white shadow-lg max-h-60 overflow-y-auto border w-full">
                {materialTypesList.map((material) => (
                  <label
                    key={material}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={formik.values.material.includes(material)}
                      onChange={() => toggleMaterial(material)}
                      className="form-checkbox text-indigo-600 rounded mr-2"
                    />
                    {material}
                  </label>
                ))}
              </div>
            )}
            {formik.touched.material && formik.errors.material && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.material}
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
              <option value="in_stock">In Stock</option>
              <option value="out_of_stock">Out of Stock</option>
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
