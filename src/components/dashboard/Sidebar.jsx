import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { PiUsers, PiQuestionMark } from "react-icons/pi";
import { SlDiamond } from "react-icons/sl";
import { MdOutlineLocalOffer } from "react-icons/md";
import { AiOutlineBarChart } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { AiOutlineSolution } from "react-icons/ai";
import { FaRegFolderOpen } from "react-icons/fa";
// import desktopLogo from "../../assets/desktop-logo.png";
import desktopLogo from "../../assets/logo-v2.png";
import productIcon from "../../assets/product-icon.png";
// import categoryIcon from "../../assets/category-icon.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    {
      label: "Dashboard",
      icon: <RxDashboard className="text-white" />,
      path: "/admin/dashboard",
    },
    {
      label: "Users",
      icon: <PiUsers className="text-white text-lg" />,
      path: "/admin/dashboard/users",
    },
    {
      label: "Jewelers",
      icon: <SlDiamond className="text-white" />,
      path: "/admin/dashboard/jewelers",
    },
    {
      label: "Products",
      icon: (
        <img
          src={productIcon}
          className="w-[35px] h-[25px] text-white"
          alt="product"
        />
      ),
      path: "/admin/dashboard/products",
    },
    {
      label: "Categories",
      icon: <FaRegFolderOpen className="text-2xl text-white" />,
      path: "/admin/dashboard/category-management",
    },
    {
      label: "Package Management",
      icon: <FaRegFolderOpen className="text-2xl text-white" />,
      path: "/admin/dashboard/package-management",
    },
    {
      label: "Invoice Management",
      icon: <AiOutlineSolution className="text-2xl text-white" />,
      path: "/admin/dashboard/invoice-management",
    },
    {
      label: "Offers",
      icon: <MdOutlineLocalOffer className="rotate-90 text-white" />,
      path: "/admin/dashboard/offers",
    },
    {
      label: "Support and Complaints",
      icon: <PiQuestionMark className="text-white" />,
      path: "/admin/dashboard/support",
    },
    {
      label: "Analytics",
      icon: <AiOutlineBarChart className="text-white" />,
      path: "/admin/dashboard/analytics",
    },
    {
      label: "Settings",
      icon: <IoSettingsOutline className="text-white" />,
      path: "/admin/dashboard/settings",
    },
  ];

  return (
    // <div className="z-50 w-0">
    // <div className="z-50 h-screen overflow-y-auto flex-shrink-0 fixed bottom-0">

    <div>
      {/* Hamburger icon for small screens */}
      <div className="block lg:hidden fixed top-4 left-4 z-[100]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-black text-2xl z-50 cursor-pointer"
        >
          {isOpen ? <IoMdClose /> : <HiOutlineMenu />}
        </button>
      </div>
      {/* <div className="z-50 h-screen overflow-y-auto flex-shrink-0 fixed bottom-0"> */}
      <div
        className={`z-50
        h-screen overflow-y-auto flex-shrink-0
        fixed buttom-0   
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:block scrollbar-hide
      `}
      >
        {/* Sidebar */}
        <aside
          className={`
      w-[297px]
      bg-[#141E39]
      text-white
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

          <div className="pt-[100px] px-[12px] pb-6 flex flex-col gap-[10px]">
            {navLinks.map(({ label, icon, path }) => (
              <NavLink
                key={label}
                to={path}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-[#155DFC] rounded-[6px]"
                      : "hover:bg-white/40"
                  } flex py-[16px] w-full items-center px-[24px] gap-[10px] hover:rounded transition`
                }
                end
              >
                <span className="text-[#4C4C4C] size-[20px]">{icon}</span>
                <span className="pl-3 text-[16px]">{label}</span>
              </NavLink>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
