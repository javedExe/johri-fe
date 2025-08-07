import React, { useState } from "react";
import Button from "../../components/ui/Button";
import Dropdown from "../../components/ui/Dropdown";
import MultiselectDropdown from "../../components/ui/MultiSelectDrowpdown";
import TextArea from "../../components/ui/TextArea";

const AddCategoryModal = ({
  handleSave,
  handleDiscard,
  handleCloseModal,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [formData, setFormData] = useState({
    categoryName: "Gemstone",
    materialType: "",
    occasion: "Wedding, Party",
    parentCategory: "Top Level",
    description: "",
  });

  const [selectedMaterialTypes, setSelectedMaterialTypes] = useState([]);
  const materialTypeOptions = [
    { label: "Select Type", value: "" },
    { label: "Gold", value: "gold" },
    { label: "Silver", value: "silver" },
    { label: "Platinum", value: "platinum" },
    { label: "Diamond", value: "diamond" },
    { label: "Gemstone", value: "gemstone" },
  ];

  const occasionOptions = [
    { label: "Wedding, Party", value: "wedding_party" },
    { label: "Casual", value: "casual" },
    { label: "Formal", value: "formal" },
    { label: "Traditional", value: "traditional" },
  ];

  const parentCategoryOptions = [
    { label: "Top Level", value: "top_level" },
    { label: "Jewelry", value: "jewelry" },
    { label: "Rings", value: "rings" },
    { label: "Necklace", value: "necklace" },
    { label: "Earrings", value: "earrings" },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className="fixed top-10 inset-0 bg-black/50 flex items-center justify-center p-4 sm:p-6 z-50">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white border border-[#cfc0f0] rounded-md p-6 sm:p-8 md:p-12 max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-black font-inter">
              Add Category
            </h2>
            <button
              onClick={handleCloseModal}
              className="cursor-pointer w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Close modal"
            >
              <img
                src="/images/img_frame_367.svg"
                alt="Close"
                className="w-9 h-9"
              />
            </button>
          </div>

          {/* Form Content */}
          <form className="space-y-6">
            {/* Category Name and Material Types Row */}
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
              {/* Category Name */}
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <label className="text-base font-normal text-black font-inter">
                    Category Name
                  </label>
                  <span className="text-base font-normal text-[#ed5b5b] font-inter ml-1">
                    *
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.categoryName}
                  onChange={(e) =>
                    handleInputChange("categoryName", e.target.value)
                  }
                  placeholder="Gemstone"
                  className="w-full px-3 py-3 text-sm font-normal text-[#000000e0] font-sf-pro bg-white border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Material Types */}
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <label className="text-base font-normal text-black font-inter">
                    Material Types
                  </label>
                  <span className="text-base font-normal text-[#ed5b5b] font-inter ml-1">
                    *
                  </span>
                </div>
                <div className="relative">
                  <MultiselectDropdown
                    selectedOptions={selectedMaterialTypes}
                    setSelectedOptions={setSelectedMaterialTypes}
                  />
                </div>
              </div>
            </div>

            {/* Occasion */}
            <div>
              <div className="flex items-center mb-2">
                <label className="text-base font-normal text-black font-inter">
                  Occasion
                </label>
                <span className="text-base font-normal text-[#ed5b5b] font-inter ml-1">
                  *
                </span>
              </div>
              <Dropdown
                options={occasionOptions}
                value="wedding_party"
                onChange={(value) => handleInputChange("occasion", value)}
                placeholder="Wedding, Party"
                className="w-full px-3 py-3 text-sm font-normal text-[#000000e0] font-sf-pro bg-white border border-[#d9d9d9] rounded-md"
              />
            </div>

            {/* Parent Category */}
            <div>
              <label className="block text-base font-normal text-black font-inter mb-2">
                Parent Category
              </label>
              <Dropdown
                options={parentCategoryOptions}
                value="top_level"
                onChange={(value) => handleInputChange("parentCategory", value)}
                placeholder="Top Level"
                className="w-full px-3 py-3 text-sm font-normal text-[#000000e0] font-sf-pro bg-white border border-[#d9d9d9] rounded-md"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-base font-normal text-black font-inter mb-1">
                Description
              </label>
              <TextArea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Type here..."
                rows={6}
                className="w-full px-3 py-3 text-sm font-normal text-[#3333337f] font-sf-pro bg-white border border-[#d9d9d9] rounded-md resize-none"
              />
              <div className="flex justify-end mt-1">
                <span className="text-xs font-medium text-[#7f7f7f] font-inter">
                  (Optional)
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-4">
              <Button
                onClick={handleDiscard}
                variant="outline"
                className="flex-1 px-8 py-3 text-sm font-normal text-[#1c1c3a] font-inter bg-white border border-[#1c1c3a] rounded-lg hover:bg-gray-50 transition-colors"
              >
                Discard
              </Button>
              <Button
                onClick={handleSave}
                variant="primary"
                className="flex-1 px-8 py-3 text-sm font-normal text-white font-inter bg-[#1c1c3a] rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
