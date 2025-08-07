// MyProfile.jsx
import React, { useState } from "react";
// import React from "react";
import { NavLink } from "react-router-dom";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import BusinessInformation from "./BusinessInformation";
import JewelerProfileImage from "../../../../../assets/jewelerProfile.png"

const MyProfile = () => {

  const [percentage, setPercentage] = useState(40);

  const navLinks = [
      {
        label: "Personal Information",
        path: "/jeweler/dashboard/profile",
      },
      {
        label: "Business Information",
        path: "/jeweler/dashboard/profile/business-informationt",
      },
      {
        label: "Working Hours",
        path: "/jeweler/dashboard/profile/working-hours",
      },
  ]


  return (
<div className="w-64 mx-2 bg-[#EEF0F6] shadow-md p-6 rounded-xl border-1 border-[#9BA7CA]  min-h-full">

        <p className="text-xl font-bold">My Profile</p>

        <div className="flex flex-col items-center mt-7">
            <div className="w-24 h-24">
              <CircularProgressbarWithChildren
              strokeWidth={5}
                value={percentage}
                className="rotate-180"
                styles={buildStyles({
                  pathColor: "#7ACF52", 
                  trailColor: "#C4DBB9",
                })}
              >
                  <img
              src={JewelerProfileImage}
              alt="User"
              className="w-full h-full object-cover p-2"
            />

                <p className="text-xs text-[#3D7821] bg-[#CFE7CA] p-1 absolute bottom-[-6%] rounded-xl">{percentage}%</p>

              </CircularProgressbarWithChildren>
            </div>


          <p className="mt-4 font-semibold text-lg">John Doe</p>
        </div>

        <div className="mt-6 space-y-3">

      {navLinks.map(({ label, path }) => (
        <NavLink
          key={label}
          to={path}
          className={({ isActive }) =>
            `${ isActive ? "bg-white text-gray-700 font-medium"
                  : "hover:bg-gray-100 text-gray-700"} w-full text-left py-2 px-3 rounded-md block`
          
          }
          end
        >
          {label}
        </NavLink>
      ))}
        </div>
      </div>
  );
};

export default MyProfile;
