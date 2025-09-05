import { useLocation } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import profileIcon from "../../assets/profile-icon.png";
import { IoMdSearch } from "react-icons/io";

const Topbar = () => {
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
    <div className="w-full"
        style={{
        // left: window.innerWidth >= 1280 ? "297px" : "0px", // Responsive sidebar width
        // width: window.innerWidth >= 1280 ? "calc(100% - 297px)" : "100%",
      }}
    >
      {/* <div className="h-18 bg-red-300 shadow-sm flex justify-between items-center px-4 transition-all duration-300"> */}
        <div
      className="h-18 bg-white shadow-sm flex justify-between items-center px-4 transition-all duration-300"
      // style={{
      //   // left: window.innerWidth >= 1280 ? "297px" : "0px", // Responsive sidebar width
      //   width: window.innerWidth >= 1280 ? "calc(100% - 297px)" : "100%",
      // }}
    >

        <div className="ps-6 lg:ps-4 px-4 ">
          <p className="text-black/70  hidden md:block">
            Dashboard /{" "}
            <span className="font-bold leading-[28px] text-[#000000E0] font-inter">
              {activeLink}
            </span>
          </p>
        </div>

        <div className="h-full flex items-center space-x-4">
          <div>
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 transition text-gray-700 bg-white"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <IoMdSearch className="w-6 h-6" />
              </span>
            </div>
          </div>
          {/* Notification Icon */}
          <div className="w-12 h-12 rounded-full bg-[#CCE4E4] flex items-center justify-center">
            <IoMdNotificationsOutline className="text-[#299090] w-6 h-6" />
          </div>

          {/* User Icon */}
          <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center">
            <img
              src={profileIcon}
              className="text-[#52C0FF] w-[40px] h-[40px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
