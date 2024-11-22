import { AiFillHome } from "react-icons/ai";
import StoreLogo from "../../../public/assets/Store Logo.png";
import LibraryLogo from "../../../public/assets/Library Logo.png";
import SubscriptionLogo from "../../../public/assets/Subscription Logo.png";
import SignoutLogo from "../../../public/assets/Sign out Logo.png";
import { Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  baseLogoutStyle,
  getHoverStyle,
  getMenuItemStyle,
} from "../Utility/StylingUtility";
import { createUrl } from "../Utility/UrlUtility";
import { AuthClient } from "@dfinity/auth-client";
import { useUser } from "../../lib/user_provider";
export default function UserNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useUser();
  const days = BigInt(1);
  const hours = BigInt(24);
  const nanoseconds = BigInt(3600000000000);
  const defaultOptions = {
    createOptions: {
      idleOptions: {
        disableIdle: true,
      },
    },
    loginOptions: {
      identityProvider: "https://identity.ic0.app/",
      maxTimeToLive: days * hours * nanoseconds,
    },
  };

  const handleLogout = async () => {
    const authClient = await AuthClient.create(defaultOptions.createOptions);
    await authClient.logout();
    document.cookie = "identity=; Max-Age=-99999999;";
    navigate("/login");
  };

  return (
    <Menu
      menuItemStyles={{
        button: {
          [`&:hover`]: getHoverStyle(),
          color: "#D1D3D7",
        },
      }}
    >
      {loading == false && (
        <>
          <MenuItem
            style={getMenuItemStyle("/", location)}
            icon={<AiFillHome size={22} />}
            component={<Link to={createUrl("/")} />}
          >
            Home
          </MenuItem>
          <MenuItem
            style={getMenuItemStyle("/store", location)}
            icon={
              <img
                src={StoreLogo}
                alt="Store Logo"
                style={{
                  width: "22px",
                  height: "22px",
                }}
              />
            }
            component={<Link to={createUrl("/store")} />}
          >
            Store
          </MenuItem>
          {user && (
            <MenuItem
              style={getMenuItemStyle("/library", location)}
              icon={
                <img
                  src={LibraryLogo}
                  alt="Library Logo"
                  style={{ width: "22px", height: "22px" }}
                />
              }
              component={<Link to={createUrl("/library")} />}
            >
              Library
            </MenuItem>
          )}

          <MenuItem
            style={getMenuItemStyle("/subscriptions", location)}
            icon={
              <img
                src={SubscriptionLogo}
                alt="Library Logo"
                style={{ width: "22px", height: "22px" }}
              />
            }
            component={<Link to={createUrl("/subscriptions")} />}
          >
            Subscriptions
          </MenuItem>
          {user && (
            <MenuItem
              icon={
                <img
                  src={SignoutLogo}
                  alt="Library Logo"
                  style={{ width: "22px", height: "22px" }}
                />
              }
              style={baseLogoutStyle()}
              onClick={handleLogout}
            >
              Logout
            </MenuItem>
          )}
        </>
      )}
    </Menu>
  );
}
