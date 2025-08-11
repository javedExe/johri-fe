import React from "react";

function StatusView({value}) {

    let colorList;

    if(value === "Active"){
        colorList = "text-[#265A0C] border-[#52C41A] bg-[#F6FFED]";
    }else if(value === "Inactive"){
        colorList = "text-[#990002] border-[#FF4D4F] bg#FFF2F0]";
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
