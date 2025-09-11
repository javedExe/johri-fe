import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Topbar from "../../../components/dashboard/Topbar";
import Sidebar from "../../../components/dashboard/Sidebar";

const DashboardDesktop = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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


  //   <div className="flex min-h-screen">

  //   {/* Sidebar */}
  //   <div className="w-0 lg:w-[297px] h-screen overflow-y-auto flex-shrink-0">
  //     <Sidebar />
  //   </div>

  //   {/* Main Content */}
  //   <main className="flex-1 flex flex-col w-full overflow-x-auto">
  //     {/* Topbar */}
  //     <div className="bg-white w-full  z-30">
  //       <Topbar />
  //     </div>

  //     {/* Breadcrumb */}
  //     {/* <div className="px-6 py-2">
  //       <p className="text-black/70">Dashboard / <span className="font-bold">{activeLink}</span></p>
  //     </div> */}

  //     {/* Main Routed Content */}
  //     <div className="flex-1 p-6">
  //       <Outlet />
  //     </div>
  //   </main>

  // </div>

  
<div className="flex min-h-screen bg-[#F8FAFC]">
  {/* Sidebar */}
  <div className="w-0 lg:w-[297px] h-screen flex-shrink-0 ">
    <Sidebar />
  </div>

  {/* Main Content */}
  <div className="flex-1 flex flex-col min-w-0 relative">
    {/* Sticky Topbar */}
    <div className="sticky top-0 z-30 bg-white inset-x-0">
      <Topbar />
    </div>

    {/* Main Routed Content */}
    <main className="flex-1 overflow-y-auto p-6">
      <Outlet />
    </main>
  </div>
</div>
  
  );
};

export default DashboardDesktop;