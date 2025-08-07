// src/components/common/StatusTag.js
import activeTag from "../assets/active-tag.png";
import inactiveTag from "../assets/inactive-tag.png";
import pendingTag from "../assets/pending-tag.png";

const StatusTag = ({ status }) => {
  const renderStatusTag = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="flex items-center ">
            {/* <img
              src={activeTag}
              alt="active-tag"
              className="w-[12px] h-[12px] "

              w-[69px] h-[22px] gap-[2px] px-[8px] py-[1px] rounded-[6px] border bg-[#F6FFED] border-[#52C41A] text-[#265A0C] text-[12px] font-inter
            />
            Active */}
            <img
              src={activeTag}
              alt="active-tag"
              className="w-[69px] h-[22px] "
            />
          </span>
        );
      case "inactive":
        return (
          <span className="flex items-center">
            {/* <img
              src={inactiveTag}
              alt="inactive-tag"
              className="w-[12px] h-[12px] "
            />

             w-[78px] h-[22px] gap-[5px] px-[8px] py-[1px] rounded-[6px] border bg-[#FFF2F0] border-[#FF4D4F] text-[#990002] text-[12px] font-inter
            Inactive */}

            <img
              src={inactiveTag}
              alt="inactive-tag"
              className="w-[78px] h-[22px] "
            />
          </span>
        );
      case "pending":
        return (
          <span className="flex items-center">
            <img
              src={pendingTag}
              alt="pending-tag"
              className="w-[79px] h-[22px] "
            />
            {/* w-[79px] h-[22px] gap-[2px] px-[8px] py-[1px] rounded-[6px] border border-[#FA8C16] bg-[#FFFBE6] text-[#7D4203] text-[12px] font-inter
            Pending */}
          </span>
        );
      default:
        return <span>Loading...</span>;
    }
  };

  return (
    <div>
      {status ? renderStatusTag(status) : <span>Loading status...</span>}
    </div>
  );
};

export default StatusTag;
