import { Sidebar, Menu } from "react-pro-sidebar";
import MetaReadsFullLogo from "../../../public/assets/Meta Reads Full Logo.png";
import MetaReadsLogo from "../../../public/assets/Meta Reads Logo.png";
import { useCollapsed } from "../../lib/collapsed_provider";
import { Outlet } from "react-router-dom";
import UserNavigation from "./UserNavigation";
import AdminNavigation from "./AdminNavigation";
import { AuthClient } from "@dfinity/auth-client";

export default function SideNavbar() {
  const { collapsed, setCollapsed } = useCollapsed();

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const toggleSidebar = ({ value }: { value: boolean }) => {
    setCollapsed(value);
  };

  return (
    <div style={{ position: "relative" }} className="h-screen">
      <Sidebar
        onMouseEnter={() => toggleSidebar({ value: false })}
        onMouseLeave={() => toggleSidebar({ value: true })}
        collapsed={collapsed}
        backgroundColor={hexToRgba("#14181E", 0.7)}
        className="inject-black-border inject-width h-full"
        style={{ position: "fixed", top: 0, left: 0 }}
      >
        <Menu className="w-100 mb-6 ml-7 mt-6 flex justify-start align-middle">
          <div className="flex gap-2">
            <img src={MetaReadsLogo} alt="Full Logo" width={44} />

            {collapsed == false && (
              <div className="quantico-font flex items-center text-[30px] text-white">
                Metareads
              </div>
            )}
          </div>
        </Menu>
        <UserNavigation />
        <AdminNavigation />
      </Sidebar>
      <Outlet />
      {/* <div
        onClick={() => toggleSidebar({ value: !collapsed })}
        style={{
          position: "fixed",
          top: "50%",
          left: collapsed ? "80px" : "230px",
          right: "100%",
          transform: "translate(50%, 0)",
          cursor: "pointer",
          zIndex: 1000,
          transition: "left 0.28s ease",
        }}
      >
        {collapsed ? (
          <IoIosArrowDroprightCircle
            className="cursor-pointer text-white"
            size={30}
            style={{
              color: "#EFAF21",
              //   backgroundColor: "#D1D3D7",
              borderRadius: "30px",
            }}
          />
        ) : (
          <IoIosArrowDropleftCircle
            className="cursor-pointer"
            size={30}
            style={{
              color: "#EFAF21",
              //   backgroundColor: "#D1D3D7",
              borderRadius: "30px",
            }}
          />
        )}
      </div> */}
    </div>
  );
}
