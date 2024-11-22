import DefaultProfile from "../../../public/assets/Default Profile.png";
import CurrencyLogo from "../../../public/assets/Currency Logo.png";
import { Tooltip } from "@mui/material"; // Import Tooltip from MUI
import { useUser } from "../../lib/user_provider";
import { useNavigate } from "react-router-dom";
import LitupButton from "../Form/Button/LitUpButton";

export default function NavbarProfile() {
  const { user, loading } = useUser();
  const navigate = useNavigate();
  // const profilePicture = data && data.photo ? data.photo : DefaultProfile;
  const profilePicture = DefaultProfile;
  const formatMoney = (value: string | undefined) => {
    console.log(value);

    return value ? (value.length > 5 ? `${value.slice(0, 7)}...` : value) : 0;
  };

  const test = () => {
    console.log("test")
    console.log(user)
  }

  return (
    <div>
      {loading ? (
        ""
      ) : user ? (
        <div className="flex items-center justify-center gap-4">
          <Tooltip
            title={
              <img
                src={profilePicture}
                alt="Profile Preview"
                className="h-32 w-32"
              />
            }
            arrow
            placement="bottom"
          >
            <img
              src={profilePicture}
              alt="Profile Picture"
              className="w-12 cursor-pointer"
            />
          </Tooltip>

          <div onClick={test} className="flex items-center">
            <div className="flex flex-col items-center">
              <Tooltip title={user.username} arrow placement="top-start">
                <div className="max-w-[100px] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap">
                  <span>{user.username}</span>
                </div>
              </Tooltip>

              <div className="w-full">
                <Tooltip title={user.money.toString()} arrow placement="bottom">
                  <div
                    className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap"
                    style={{ color: "#3FF39D" }}
                  >
                    <span className="flex gap-2">
                      <div className="flex items-center">
                        <img
                          src={CurrencyLogo}
                          alt="Currency"
                          className="w-5"
                        />
                      </div>
                      {formatMoney(user?.money.toString())}
                    </span>
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full justify-center">
          <button
            className="relative inline-flex h-12 overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            onClick={() => {
              navigate("/login");
            }}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#EFAF21_0%,#494e5a_50%,#EFAF21_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Login
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
