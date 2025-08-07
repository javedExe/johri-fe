import React, { useEffect, useRef, useState } from "react";
import uploadBoxIcon from "../../assets/uploadBoxIcon.png";

function DashedUploadBox({ label, className }) {
  const fileInputRef = useRef(null);
  const [isFile, setIsFile] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0]; // Get the first dropped file
    setIsFile(file)
    handleFile(file);
  };

  useEffect(()=>{

  }, [isFile])

  const handleFile = (file) => {
    const MAX_SIZE_MB = 5;

    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Only JPEG or PNG images are allowed.");
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert(`Image size must not exceed ${MAX_SIZE_MB} MB.`);
      return;
    }

    console.log("Valid file selected:", file);

    // formik.setFieldValue("images", [file]);
    // setImagePreviews([URL.createObjectURL(file)]);
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0]; // Get the first selected file
    handleFile(file);
  };

  return (
    <div
      className={className}
      onClick={() => fileInputRef.current.click()}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <p className="mb-2 text-sm font-bold">{label}</p>

      <div className="border border-dashed border-gray-400 rounded-md p-6 pt-4 text-center text-sm text-gray-500">
        <div className="flex justify-center">
          <img src={uploadBoxIcon} className="w-8 h-8" />
        </div>

        <div className="mt-4 text-black">
          Click or drag file to this area to upload
        </div>
        <p className="text-xs mt-2">JPEG, PNG (Max 5MB)</p>
              {
        isFile && <div>File name here</div>
      }

      </div>


      <input
        type="file"
        accept="image/jpeg, image/png"
        ref={fileInputRef}
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
}

export default DashedUploadBox;
