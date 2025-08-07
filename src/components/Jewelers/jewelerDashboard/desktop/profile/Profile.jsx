import React from 'react';
import { Outlet} from "react-router-dom";
import MyProfile from './MyProfile';
import BusinessInformation from './BusinessInformation';

function Profile() {
  return (
    <div className="flex min-h-[100vh]  mt-5 mb-5">
        
        <div className="flex-1/6 px-2 z-0">
        <MyProfile />
        </div>

        <div className="flex-5/6 px-2">
            {/* <BusinessInformation /> */}
            <Outlet />
        </div>
    </div>
  )
}

export default Profile