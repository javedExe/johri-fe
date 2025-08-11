import { useState } from "react";
import { dummyUser } from "../dummy";
import UserList from "./userList";
import UserFilters from "./UserFilters";

const User = () => {
  const [originalData] = useState(dummyUser);
  const [filteredData, setFilteredData] = useState(dummyUser);
  const [showForm, setShowForm] = useState(false);
  // const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row gap-4 px-4 py-6 w-full">
      {/* Filters Section */}
      <div className="w-full lg:w-[300px]">
        <UserFilters data={originalData} setData={setFilteredData} formVisible={()=> setShowForm(true)}  />
      </div>

      {/* Table Section */}
      <div className="h-[calc(100vh-100px)]">
        {/* <div className="flex-1 overflow-x-auto"> */}

        <UserList data={filteredData} userFormVisible={showForm} closeForm={() => setShowForm(false)}/>
      </div>
    </div>
  );
};

export default User;
