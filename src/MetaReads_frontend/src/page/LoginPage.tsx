import { useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import MetaReadsLogo from "../../public/assets/Meta Reads Full Logo.png";
import { MetaReads_backend } from "../../../declarations/MetaReads_backend";
import { Principal } from "@dfinity/principal";
import { ToastError } from "../components/Form/Notifications/ErrorNotification";
import { useNavigate } from "react-router-dom";
import { useUser } from "../lib/user_provider";
import { StarsBackground } from "../components/ui/background/stars-background";

function LoginPage() {
  const navigate = useNavigate();
  const { getUserById: fetchUserData } = useUser();
  const [loggedIn, setLoggedIn] = useState(false);
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

  type Result<T, E> = { Ok: T } | { Err: E };

  function isError<T, E>(result: Result<T, E>): result is { Err: E } {
    return "Err" in result;
  }

  const handleLogin = async () => {
    const authClient = await AuthClient.create(defaultOptions.createOptions);
    if (await authClient.isAuthenticated()) {
      const internetIdentityId = authClient.getIdentity().getPrincipal();
      const getUserById = await MetaReads_backend.get_user(internetIdentityId);
      // console.log(getUserById)
      if (isError(getUserById)) {
        navigate("/register/" + internetIdentityId);
      } else {
        fetchUserData();
        navigate("/store");
        document.cookie = `identity=${internetIdentityId}; path=/; expires=${new Date(Date.now() + 86400e3).toUTCString()}`;
      }
    } else {
      try {
        await authClient.login(defaultOptions.loginOptions);
        setLoggedIn(true);
      } catch (error) {
        ToastError("Login Error");
      }
    }
  };

  return (
    <div className="relative flex h-[100vh] w-[100vw] items-center justify-center">
      <button
        onClick={() => {
          fetchUserData();
          navigate("/");
        }}
        className="absolute left-4 top-4 z-[999] rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
      >
        Back
      </button>
      <div className="login-button h-[10vw] w-[20vw] text-white">
        <div
          onClick={handleLogin}
          className="flex h-full w-full flex-col items-center justify-center"
        >
          {loggedIn ? (
            <div>You're logged in! Click again to continue.</div>
          ) : (
            ""
          )}
          <img src={MetaReadsLogo} alt="Full Logo" width={200} />
          {loggedIn == false && (
            <div className="text-center">Login with Internet Identity</div>
          )}
        </div>
      </div>
      <StarsBackground />
    </div>
  );
}

export default LoginPage;
