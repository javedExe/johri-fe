import React from "react";
import { useRef, useState } from "react";
import { FaPaperclip } from "react-icons/fa";




const UploadFileWithText = ({ textLable, uploadLable }) => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (

    <div className="flex gap-4">

        {/* Input Field */}
      <div className="w-5/10">
        <label className="text-sm font-medium text-gray-700">
          {textLable} <span className="text-red-500">*</span>
        </label>
        <div className="">
          <input
            type="text"
            onChange={handleChange}
            className="w-full p-2 border-1 border-[#D9D9D9] rounded-md text-sm mt-2" 
          />
        </div>

      </div>

            {/* Upload Field */}
    <div className="flex flex-col gap-1 w-5/10">
      <label className="text-sm font-medium text-gray-700">
        {uploadLable} <span className="text-red-500">*</span>
      </label>
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden mt-2 p-1">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleChange}
          className="hidden"
          accept=".jpg,.jpeg,.png,.pdf"
        />
        <p className="px-4 text-sm text-gray-400 flex-1 truncate">
          {fileName || "Drag or Upload your file"}
        </p>
        <button
          type="button"
          onClick={handleClick}
          className="bg-[#5065A4] text-white px-2 py-1.5 text-xs flex items-center gap-2 hover:bg-[#1C1C3A] cursor-pointer rounded-md"
        >
          <FaPaperclip className="text-white text-sm" />
          Upload
        </button>
      </div>
    </div>
    </div>
  );
};



export default UploadFileWithText;

