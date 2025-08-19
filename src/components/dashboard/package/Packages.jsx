import { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";
// import { dummyPackages } from "../dummy";
import PackageFilters from "./PackageFilters";
import PackageList from "./PackageList";


const Packages = () => {
  const [originalData, setOriginalData] = useState([]); 
  const [filteredData, setFilteredData] = useState(originalData); 
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchPackageList = async ()=>{
          const response = await axios.get("/admin/packages/all", {
            withCredentials: true,
          });

          setOriginalData(response.data.packages.data);   
  }
  

  useEffect(()=>{
    fetchPackageList();
  },[]);


  useEffect(()=>{
   setFilteredData(originalData);
  },[originalData]);

  
  return (

    <div className="flex flex-col lg:flex-row gap-4 px-4 py-6 w-full">
      {/* Filters Section */}
      <div className="w-full lg:w-[300px]">
        <PackageFilters data={originalData} setData={setFilteredData} addPackageModel={() => setShowModal(true)}
        setEditMode={()=> setIsEditMode(false)}
        />
      </div>

      {/* Table Section */}
      <div className="h-[calc(100vh-100px)]">
      {/* <div className="flex-1 overflow-x-auto"> */}

            <PackageList data={filteredData} closeProductModel={() => setShowModal(false)} productModelVisible={showModal} openProductModel={() => setShowModal(true)}  
            setEditMode={()=> setIsEditMode(true)}
            isEditMode={isEditMode}
            fetchList={()=> fetchPackageList()}
            />

      </div>
    </div>
  );
};

export default Packages;
