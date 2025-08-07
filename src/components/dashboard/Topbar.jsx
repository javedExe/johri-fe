import { useLocation } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import profileIcon from "../../assets/profile-icon.png";

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
    <div className="">
    <div
      className="h-20 bg-white shadow-sm flex justify-end items-center px-4 transition-all duration-300"

    >
    {/* <div
      className="fixed top-0 h-20 bg-white shadow-sm flex justify-end items-center px-4 transition-all duration-300"
      style={{
        left: window.innerWidth >= 1280 ? "297px" : "0px", // Responsive sidebar width
        width: window.innerWidth >= 1280 ? "calc(100% - 297px)" : "100%",
      }}
    > */}
      <div className="h-full flex items-center space-x-4">
        {/* Notification Icon */}
        <div className="w-12 h-12 rounded-full bg-[#CCE4E4] flex items-center justify-center">
          <IoMdNotificationsOutline className="text-[#299090] w-6 h-6" />
        </div>

        {/* User Icon */}
        <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center">
          <img src={profileIcon} className="text-[#52C0FF] w-[40px] h-[40px]" />
        </div>
      </div>
    </div>
        <div className="bg-white px-4">
          <p className="text-black/70">Dashboard / {" "}
                    <span className="font-bold leading-[28px] text-[#000000E0] font-inter">
            {activeLink}
          </span>
          </p>
        </div>
    </div>
  );
};

export default Topbar;
