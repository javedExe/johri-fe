import React from "react";

function MaterialTag({ tag }) {
  const tagColorMap = {
    Silver: "#C0C0C0",
    Gold: "#FFE766",
    Platinum: "#C2E5EF",
    Gemstone: "#D6A0F8",
    Diamond: "#99C3FF",
  };

  const tagColor = tagColorMap[tag] || "#CCCCCC"; // default color

  return (
    <span className="w-fit h-[22px] px-[8px] py-[1px] rounded-[6px] border border-[#BFBFBF] flex items-center justify-center gap-[2px] text-[#333333] text-[12px]">
      <span
        className="w-[8px] h-[8px] rounded-full shrink-0"
        style={{ backgroundColor: tagColor }}
      ></span>
      {tag}
    </span>
  );
}

export default MaterialTag;
