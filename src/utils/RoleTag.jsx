// src/components/common/RoleTag.js
import React from "react";

const RoleTag = ({ role }) => {
  const renderRoleTag = (role) => {
    switch (role) {
      case "manufacturer":
        return (
          <span className="w-[105px] h-[22px] px-[8px] py-[1px] rounded-[6px] border border-[#BFBFBF] flex items-center justify-center gap-[2px] text-[#333333] text-[12px]">
            <span className="w-[8px] h-[8px] rounded-full bg-[#FDB49B] shrink-0 "></span>
            Manufacturer
          </span>
        );
      case "retailer":
        return (
          <span className="flex items-center w-[71px] h-[22px] gap-[2px] px-[8px] py-[1px] rounded-[6px] border border-[#BFBFBF] justify-center text-[#333333] text-[12px]">
            <span className="w-[8px] h-[8px] rounded-full bg-[#A2B2F6] shrink-0"></span>
            Retailer
          </span>
        );
      case "brand":
        return (
          <span className="flex items-center w-[62px] h-[22px] gap-[4px] px-[8px] py-[1px] rounded-[6px] border border-[#BFBFBF] text-[12px] text-[#333333]">
            <span className="w-[8px] h-[8px] bg-[#E2A8F0] rounded-full shrink-0"></span>
            Brand
          </span>
        );
      default:
        return (
          <span className="w-[79px] h-[22px] px-[8px] py-[1px] gap-[4px] rounded-[6px] border text-gray-500 bg-gray-100 text-sm flex items-center justify-center">
            Unknown
          </span>
        );
    }
  };

  return <>{renderRoleTag(role)}</>;
};

export default RoleTag;
