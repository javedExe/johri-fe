import React from "react";
import { Outlet} from "react-router-dom";
import Sidebar from "./desktop/Sidebar";
import Topbar from "./desktop/Topbar";

const JewelerDashboardDesktop = () => {

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Topbar, Breadcrumbs, Routes etc */}
        
        <div className="w-full sticky top-0 z-10">
          <Topbar />
        </div>

        <Outlet />
      </main>
    </div>


  );
};

export default JewelerDashboardDesktop;