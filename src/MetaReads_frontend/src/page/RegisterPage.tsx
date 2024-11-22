import { useRef, useState } from "react";
import MetaReadsLogo from "../../public/assets/Meta Reads Logo.png";
import PrimaryButton from "../components/Form/Button/PrimaryButton";
import InputField from "../components/Form/Input/TextField/InputField";
import { Title } from "../components/Utility/TitleUtility";
import { useCreateUser } from "../components/Hook/Data/User/useCreateUser";
import { useNavigate, useParams } from "react-router-dom";
import { ToastError } from "../components/Form/Notifications/ErrorNotification";
import { ToastLoading } from "../components/Form/Notifications/LoadingNotification";
import { toast } from "react-toastify";
import { ToastSuccess } from "../components/Form/Notifications/SuccessNotification";
import { useUser } from "../lib/user_provider";
import { StarsBackground } from "../components/ui/background/stars-background";

export default function RegisterPage() {
  const { getUserById: fetchUserData } = useUser();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const loadingToastId = useRef<string | null>(null);
  const { internetIdentityId } = useParams();
  const { createUser } = useCreateUser();
  const handleRegister = async () => {
    // @ts-ignore
    loadingToastId.current = ToastLoading("Loading..");
    try {
      if (internetIdentityId) {
        const res: any = await createUser(internetIdentityId, username);

        if (res == true) {
          ToastSuccess("Register Success");
          document.cookie = `identity=${internetIdentityId}; path=/; expires=${new Date(Date.now() + 86400e3).toUTCString()}`;
          fetchUserData();
          navigate("/store");
        } else {
          ToastError(res);
        }
      }
    } finally {
      if (loadingToastId.current) {
        toast.dismiss(loadingToastId.current);
        loadingToastId.current = null;
      }
    }
  };


  return (
    <>
      <div className="flex h-[100vh] w-[100vw] flex-col items-center justify-center">
        <div
          className="z-[999] flex w-[30%] flex-col gap-10 rounded-md px-4 py-10"
          style={{ backgroundColor: "#14181E" }}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center gap-2">
              <img src={MetaReadsLogo} alt="Full Logo" width={40} />
              <div>
                <Title text={"Register"} />
              </div>
            </div>
            <div className="flex w-full justify-center">
              <hr className="w-[150px]" />
            </div>
            <div className="flex justify-center gap-2 text-white">
              Hello, before you get in, let us know your name
            </div>
          </div>
          <div>
            <InputField
              label={"Username"}
              size={"medium"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex justify-center">
            <PrimaryButton text={"Create Account"} onClick={handleRegister} />
          </div>
        </div>
        <StarsBackground />
      </div>
    </>
  );
}
