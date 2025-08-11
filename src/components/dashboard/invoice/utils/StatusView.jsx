import React from "react";

function StatusView({value}) {

    let colorList;

    if(value === "Paid"){
        colorList = "text-[#265A0C] border-[#52C41A] bg-[#F6FFED]";
    }
    if(value === "Pending"){
        colorList = "text-[#7D4203] border-[#FA8C16] bg-[#FFFBE6]";
    }
    if(value === "Overdue"){
        colorList = "text-[#990002] border-[#FF4D4F] bg#FFF2F0]";
    }
    if(value === "Cancelled"){
        colorList = "text-[#808080] border-[#808080] bg-[#E5E5E5]";
    }

  return (
    <div>
      {<span className={`px-2 py-0.5 rounded-lg border text-sm font-medium ${colorList}`}>
        {value}
      </span>}
    </div>
  );
}

export default StatusView;
