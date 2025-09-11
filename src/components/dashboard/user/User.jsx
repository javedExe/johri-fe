import React, { useState, useEffect } from "react";
import axios from "../../../utils/axiosInstance";
import useFeatureStore from "../../../store/useFeatureStore";
// import ExportToCSV from "../../../utils/ExportToCSV.jsx";
import ExportToCSV from "../../../utils/ExportToCSV.jsx"
// import { dummyUser } from "../dummy";
import { LiaFileExportSolid } from "react-icons/lia";
// import { IoAdd } from "react-icons/io5";
import UserList from "./UserList";
import UserFilters from "./UserFilters";
import KpiData from "./utils/KpiData";

const User = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState(originalData);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [formData, setFormData] = useState({});
  // const [isEditMode, setIsEditMode] = useState(false);
  const { selectedUsers } = useFeatureStore();


    const fetchPackageList = async () => {
      setLoading(true);
      try{
        const response = await axios.get("/enduser/users", {
          withCredentials: true,
        });

        setOriginalData(response.data.user);
      
      }catch(err){
        console.log("Error occured", err);
      }finally{
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchPackageList();
    }, [reload]);
  
    useEffect(() => {
      setFilteredData(originalData);
    }, [originalData]);
    



  return (

    <div className="flex flex-col items-end">
      <div className="w-full px-4 ps-5 flex justify-between">
        <div>
          <p className="font-bold text-lg md:text-2xl">Users</p>
          <p className="text-xs md:text-sm text-gray-500">
            Manage and Monitor all the platfrom Users.
          </p>
        </div>

        <div className="flex gap-3 py-2">

          {/* Export Buttons */}
          <ExportToCSV data={selectedUsers} filename="User_List.csv">
            <LiaFileExportSolid className="text-lg" /> Export
          </ExportToCSV>

          {/* Add Product Button */}
          {/* <div className="flex gap-4 w-full sm:w-auto sm:flex-row sm:justify-end transition-all duration-300  ">
            <button
              className="flex items-center gap-1 rounded-sm bg-[#EDDD8A] shadow-2xl  shadow-[#DDBF22] px-2 py-1.5"
              // onClick={handleAddForm}
              onClick={() => setShowForm(true)}
            >
              <IoAdd className="w-[16px] h-[16px]" />
              <span className="text-[14px] font-normal text-[#2C2607]">
                Add Product
              </span>
            </button>
          </div> */}
        </div>
      </div>

      <KpiData className={"mb-4 mt-2"} />


      <div className="flex flex-col w-full">
        <UserFilters
          data={originalData}
          setData={setFilteredData}
          formVisible={() => setShowForm(true)}
        />
      </div>

      <div className=" w-full">
        <UserList
          data={filteredData}
          userFormVisible={showForm}
          closeForm={() => setShowForm(false)}
          openForm={() => setShowForm(true)}
          loading={loading}
          setLoading={(value) => setLoading(value)}
          reload={reload}
          setReload={() => setReload(!reload)}
          formData={formData}
          setFormData={(row) => setFormData(row)}
        />
      </div>
    </div>
  );
};

export default User;
