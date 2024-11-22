import BaseModal from "../BaseModal";
import { FormModalProps } from "../../Props/modalProps";
import { Title } from "../../Utility/TitleUtility";
import ShimmerButton from "../../Form/Button/ShimmerButton";
import MetaReadsLogo from "../../../../public/assets/Meta Reads Logo.png";

export default function LoginWarningModal({
  open,
  handleClose,
}: FormModalProps) {
  return (
    <BaseModal open={open} handleClose={handleClose}>
      <div className="my-2 flex w-full justify-center gap-2">
        <img src={MetaReadsLogo} alt="" width={"35px"} />
        <div className="flex items-center">
          <Title text="Please Log In to Continue!" />
        </div>
      </div>
      <div className="my-7 flex h-[50px] w-full justify-center text-center text-lg font-normal">
        Unlock a world of content and features by logging in to your account.
      </div>
      <div className="flex w-full justify-center">
        <button
          className="relative inline-flex h-12 overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          onClick={() => {
            handleClose();
          }}
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#EFAF21_0%,#494e5a_50%,#EFAF21_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Login
          </span>
        </button>
      </div>
    </BaseModal>
  );
}
