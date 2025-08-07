import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Topbar from "../../../components/dashboard/Topbar";
import Sidebar from "../../../components/dashboard/Sidebar";

const DashboardDesktop = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const getActiveLink = () => {
    const pathParts = location.pathname.split("/");
    return (
      pathParts[pathParts.length - 1].charAt(0).toUpperCase() +
      pathParts[pathParts.length - 1].slice(1)
    );
  };

  const activeLink =
    getActiveLink() === "Dashboard" || getActiveLink() === ""
      ? "Dashboard"
      : getActiveLink().replace(/-/g, " ");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Topbar, Breadcrumbs, Routes etc */}
        
        <div className="w-full sticky top-0 ">
          <Topbar />
        </div>

        {/* Breadcrumb */}
        {/* <div className="px-4 mt-0 text-[14px] md:fixed md:top-[78px] md:left-[297px] md:h-[48px] md:flex md:items-center md:space-x-2 md:whitespace-nowrap z-10"> */}

        {/* <div className="z-50">
          <p className="text-black/70">Dashboard / {" "}
                    <span className="font-bold leading-[28px] text-[#000000E0] font-inter">
            {activeLink}
          </span>
          </p>
        </div> */}
        <Outlet />
      </main>
    </div>


  );
};

export default DashboardDesktop;
