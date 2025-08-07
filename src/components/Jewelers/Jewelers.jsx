import { useState } from "react";
import dummyData from "./jewelerDashboard/dummy";
import JewelerFilters from "./JewelerFilters";
import JewelerTable from "./JewelerTable";

const Jewelers = () => {
  const [originalData] = useState(dummyData); // original unfiltered data (never changes)
  const [filteredData, setFilteredData] = useState(dummyData); // data shown in table

  return (
    <div className="flex flex-col lg:flex-row gap-4 px-4 py-6 w-full">
      {/* Filters Section */}
      <div className="w-full lg:w-[300px]">
        <JewelerFilters data={originalData} setData={setFilteredData} />
      </div>

      {/* Table Section */}
      <div className="flex-1 overflow-x-auto">
        <JewelerTable data={filteredData} />
      </div>
    </div>
  );
};

export default Jewelers;
