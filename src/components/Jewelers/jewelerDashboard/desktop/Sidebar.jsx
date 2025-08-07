import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";


import desktopLogo from "../../../../assets/desktop-logo.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Dashboard", 
      icon: <RxDashboard />, 
      path: "/jeweler/dashboard" 
    },
    {
      label: "Profile",
      icon: <IoSettingsOutline />,
      path: "/jeweler/dashboard/profile",
    },
    { label: "products", 
      icon: <IoSettingsOutline />, 
      path: "/jeweler/dashboard/products" 
    },
    {
      label: "Settings 1",
      icon: <IoSettingsOutline />,
      path: "/jeweler/dashboard/category-management",
    },
    {
      label: "Settings 2",
      icon: <IoSettingsOutline />,
      path: "/jeweler/dashboard/package-management",
    },
  ];

  return (
    <div className="z-50">
      {/* Hamburger icon for small screens */}
      <div className="block lg:hidden fixed top-4 left-4 z-[100]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-black text-2xl z-50 cursor-pointer"
        >
          {isOpen ? <IoMdClose /> : <HiOutlineMenu />}
        </button>
      </div>



      {/* Sidebar */}
  <aside
    className={`
      w-[297px]
      bg-gradient-to-b from-[#EAECF4] to-[#5065A4]
      text-gray-800
      sticky top-0 self-start
      h-fit
      transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
       w-[200px] xl:w-[297px] lg:translate-x-0 lg:block
    `}
  >

    {/* Logo */}
        <div className="absolute top-[34px] left-[32px]">
          <img
            src={desktopLogo}
            alt="Johri Desktop Logo"
            className="h-[38.9px] w-[79.89px]"
          />
        </div>

        
    <div className="pt-[100px] px-[12px] pb-6 flex flex-col gap-[10px] min-h-[100vh]">
      {navLinks.map(({ label, icon, path, }) => (
        <NavLink
          key={label}
          to={path}
          className={({ isActive }) =>
            `${isActive ? "bg-white rounded-[6px]" : "hover:bg-white/40"} flex py-[16px] w-full items-center px-[24px] gap-[10px] hover:rounded transition`
          }
          end={path !== "/jeweler/dashboard/profile"}
        >
          <span className="text-[#4C4C4C] size-[20px]">{icon}</span>
          <span className="pl-3 text-[16px]">{label}</span>
        </NavLink>
      ))}
    </div>
  </aside>
    </div>
  );
};

export default Sidebar;
