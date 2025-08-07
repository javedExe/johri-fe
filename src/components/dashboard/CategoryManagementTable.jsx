import React, { useState } from "react";
import { ChipView, ChipItem } from "../../components/ui/ChipView";

import Switch from "../../components/ui/Switch";

const JewelryCategoryManagement = () => {
  const [expandedRows, setExpandedRows] = useState({});
  const [selectedRows, setSelectedRows] = useState({});

  const toggleRowExpansion = (rowId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const toggleRowSelection = (rowId) => {
    setSelectedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const tableData = [
    {
      id: "jewelry",
      category: "Jewelry",
      jewelryTypes: [],
      occasion: "Wedding, Party, Engagement, Festivals, Anniversaries",
      createdDate: "November 1, 2024",
      isActive: true,
      hasChildren: true,
      level: 0,
    },
    {
      id: "rings",
      category: "Rings",
      jewelryTypes: [
        { name: "Gold Rings", variant: "gold" },
        { name: "Silver Rings", variant: "silver" },
      ],
      occasion: "Wedding, Party, Engagement, Festivals, Anniversaries",
      createdDate: "November 1, 2024",
      isActive: true,
      hasChildren: true,
      level: 1,
      parent: "jewelry",
    },
    {
      id: "gold-rings",
      category: "Gold Rings",
      jewelryTypes: [
        { name: "Type 1", variant: "gold" },
        { name: "Type 2", variant: "gold" },
        { name: "Type 3", variant: "gold" },
      ],
      occasion: "Wedding, Party, Engagement, Festivals, Anniversaries",
      createdDate: "November 1, 2024",
      isActive: true,
      hasChildren: false,
      level: 2,
      parent: "rings",
    },
    {
      id: "silver-rings",
      category: "Silver Rings",
      jewelryTypes: [
        { name: "Type 1", variant: "silver" },
        { name: "Type 2", variant: "silver" },
      ],
      occasion: "Wedding, Party, Engagement, Festivals, Anniversaries",
      createdDate: "November 1, 2024",
      isActive: true,
      hasChildren: false,
      level: 2,
      parent: "rings",
    },
    {
      id: "necklace",
      category: "Necklace",
      jewelryTypes: [{ name: "Necklace", variant: "gray" }],
      occasion: "Wedding, Party, Engagement, Festivals, Anniversaries",
      createdDate: "November 1, 2024",
      isActive: true,
      hasChildren: false,
      level: 1,
      parent: "jewelry",
    },
    {
      id: "earrings",
      category: "Earrings",
      jewelryTypes: [{ name: "Earrings", variant: "gray" }],
      occasion: "Wedding, Party, Engagement, Festivals, Anniversaries",
      createdDate: "November 1, 2024",
      isActive: true,
      hasChildren: false,
      level: 1,
      parent: "jewelry",
    },
    {
      id: "gemstone",
      category: "Gemstone",
      jewelryTypes: [
        { name: "Saphire", variant: "blue" },
        { name: "Ruby", variant: "green" },
      ],
      occasion: "Wedding, Party, Engagement, Festivals, Anniversaries",
      createdDate: "November 1, 2024",
      isActive: true,
      hasChildren: false,
      level: 0,
    },
  ];

  const getVisibleRows = () => {
    return tableData.filter((row) => {
      if (row.level === 0) return true;
      if (row.level === 1) return expandedRows["jewelry"];
      if (row.level === 2)
        return expandedRows["jewelry"] && expandedRows["rings"];
      return false;
    });
  };

  const renderExpandIcon = (row) => {
    if (!row.hasChildren) {
      return (
        <div className="w-[10px] h-[6px] flex items-center justify-center">
          <img
            src="/images/img_vector_black_900.svg"
            alt=""
            className="w-[12px] h-[12px]"
          />
        </div>
      );
    }

    const isExpanded = expandedRows[row.id];
    return (
      <button
        onClick={() => toggleRowExpansion(row.id)}
        className="w-[12px] h-[12px] flex items-center justify-center cursor-pointer"
      >
        <img
          src={
            isExpanded
              ? "/images/img_vector.svg"
              : "/images/img_vector_black_900.svg"
          }
          alt=""
          className="w-[12px] h-[12px]"
        />
      </button>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px] border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="bg-global-1">
              <th className="w-[30%] border-b border-secondary p-3 text-left">
                <div className="flex items-center gap-2">
                  <div className="w-[44px] h-[44px] flex items-center justify-center">
                    <img
                      src="/images/img_checkbox_wrapper.svg"
                      alt=""
                      className="w-[16px] h-[22px]"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-inter font-normal text-global-1">
                      Category Name
                    </span>
                    <img
                      src="/images/img_icon_arrowdownoutlined.svg"
                      alt=""
                      className="w-4 h-4"
                    />
                  </div>
                </div>
              </th>
              <th className="w-[30%] border-b border-primary p-3 text-left bg-global-1">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-inter font-normal text-global-1">
                    Jewelry Type
                  </span>
                  <img
                    src="/images/img_icon_arrowdownoutlined.svg"
                    alt=""
                    className="w-4 h-4"
                  />
                </div>
              </th>
              <th className="w-[22%] border-b border-primary p-3 text-left bg-global-1">
                <span className="text-xs font-inter font-normal text-global-1">
                  Occasion
                </span>
              </th>
              <th className="w-[16%] border-b border-primary p-3 text-left bg-global-1">
                <span className="text-xs font-inter font-normal text-global-1">
                  Created Date
                </span>
              </th>
              <th className="w-[12%] border-b border-primary p-3 text-left bg-global-1">
                <span className="text-xs font-inter font-normal text-global-1">
                  Actions
                </span>
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {getVisibleRows().map((row, index) => (
              <tr key={row.id} className="bg-global-2 hover:bg-gray-50">
                {/* Category Column */}
                <td className="border-b border-primary p-0">
                  <div className="flex items-center">
                    {/* Checkbox */}
                    <div className="w-[44px] h-[44px] flex items-center justify-center border-b border-primary">
                      <button
                        onClick={() => toggleRowSelection(row.id)}
                        className="w-[44px] h-[44px] flex items-center justify-center"
                      >
                        <img
                          src={
                            selectedRows[row.id]
                              ? "/images/img_checkbox.svg"
                              : "/images/img_checkbox_white_a700.svg"
                          }
                          alt=""
                          className="w-[22px] h-[16px]"
                        />
                      </button>
                    </div>


                    {/* Expand Icon */}
                    {row.level === 0 ? (
                        <div className="w-[44px] h-[44px] flex items-center justify-center border-b border-primary">
                      {renderExpandIcon(row)}
                    </div>
                      ) : (
                        <div className="ml-8 w-[44px] h-[44px] flex items-center     justify-center border-b border-primary">
                          {renderExpandIcon(row)}
                        </div>
                      )}
                      

                    {/* Category Name */}
                    <div className="flex-1 px-3 py-3 border-b border-primary ">
                      {row.level === 0 ? (
                        <span className="text-sm font-inter font-medium text-edittext-1">
                          {row.category}
                        </span>
                      ) : (
                        <span
                          className="text-sm font-inter font-medium text-global-2"
                          style={{ paddingLeft: `${row.level * 20}px` }}
                        >
                          {row.category}
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                {/* Jewelry Type Column */}
                <td className="border-b border-primary p-3">
                  {row.jewelryTypes.length > 0 ? (
                    <ChipView gap="gap-2">
                      {row.jewelryTypes.map((type, typeIndex) => (
                        <ChipItem
                          key={typeIndex}
                          variant={type.variant}
                          size="small"
                        >
                          {type.name}
                        </ChipItem>
                      ))}
                    </ChipView>
                  ) : null}
                </td>

                {/* Occasion Column */}
                <td className="border-b border-primary p-3">
                  <span className="text-sm font-inter font-normal text-global-2">
                    {row.occasion}
                  </span>
                </td>

                {/* Created Date Column */}
                <td className="border-b border-primary p-3">
                  <span className="text-sm font-inter font-normal text-global-2">
                    {row.createdDate}
                  </span>
                </td>

                {/* Actions Column */}
                <td className="border-b border-primary p-3">
                  <div className="flex items-center justify-between gap-3">
                    <img
                      src="/images/img_frame_68.svg"
                      alt="Edit"
                      className="w-7 h-7 rounded cursor-pointer"
                    />
                    <img
                      src="/images/img_frame_69.svg"
                      alt="Delete"
                      className="w-7 h-7 rounded cursor-pointer"
                    />
                    <Switch
                      checked={row.isActive}
                      onChange={(checked) => {
                        // Handle switch change
                        console.log(`Row ${row.id} active state:`, checked);
                      }}
                      size="small"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JewelryCategoryManagement;
