import { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";
// import { dummyPackages } from "../dummy";
import PackageFilters from "./PackageFilters";
import PackageList from "./PackageList";
import { IoAdd } from "react-icons/io5";
import { LiaFileExportSolid } from "react-icons/lia";


const Packages = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState(originalData);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchPackageList = async () => {
    const response = await axios.get("/admin/packages/all", {
      withCredentials: true,
    });

    setOriginalData(response.data.packages.data);
  };

  useEffect(() => {
    fetchPackageList();
  }, []);

  useEffect(() => {
    setFilteredData(originalData);
  }, [originalData]);

  return (

    <div className="flex flex-col items-end">

      <div className="w-full px-4 ps-5 flex justify-between">
        <div>
          <p className="font-bold text-lg md:text-2xl">Package management</p>
          <p className="text-xs md:text-sm text-gray-500">Manage and Monitor all the platfrom packages.</p>
        </div>


        <div className="flex gap-3 py-2">

     {/* Export Buttons */}
      <div className="border border-[#D9D9D9] text-sm px-4 py-1 rounded-md text-gray-600 flex gap-2 items-center cursor-pointer">
        <LiaFileExportSolid className="text-lg" /> Export
      </div>


                {/* Buttons Section */}
        {/* Add Product Button */}
      <div className="flex gap-4 w-full sm:w-auto sm:flex-row sm:justify-end transition-all duration-300  ">

        <button className="flex items-center gap-1 rounded-sm bg-[#EDDD8A] shadow-2xl  shadow-[#DDBF22] px-2 py-1.5"
        // onClick={handleAddForm}
        >
          <IoAdd className="w-[16px] h-[16px]" />
          <span className="text-[14px] font-normal text-[#2C2607]">
            Add Product
          </span>
        </button>
      </div>
        </div>

      </div>

      <div
        className="flex flex-col w-full"
        // style={{
        //     // width: window.innerWidth >= 768 ? "calc(100% - 297px)" : "100%",
        //     width: window.innerWidth >= 1024 ? "calc(100% - 297px)" : "100%",
        //   }}
      >

        <PackageFilters
          data={originalData}
          setData={setFilteredData}
          addPackageModel={() => setShowModal(true)}
          setEditMode={() => setIsEditMode(false)}
        />
      </div>

      <div
        className=" w-full"
        // style={{
        //     width: window.innerWidth >= 1024 ? "calc(100% - 297px)" : "100%",
        //   }}
      >

        <PackageList data={filteredData} closeProductModel={() => setShowModal(false)} productModelVisible={showModal} openProductModel={() => setShowModal(true)}
            setEditMode={()=> setIsEditMode(true)}
            isEditMode={isEditMode}
            fetchList={()=> fetchPackageList()}
          />


        {/* <PackageList data={filteredData} closeProductModel={() => setShowModal(false)} productModelVisible={showModal} openProductModel={() => setShowModal(true)}
            setEditMode={()=> setIsEditMode(true)}
            isEditMode={isEditMode}
            fetchList={()=> fetchPackageList()}
            /> */}

      </div>
    </div>
  );
};

export default Packages;
