import BaseModal from "../BaseModal";
import { FormModalProps } from "../../Props/modalProps";
import { Title } from "../../Utility/TitleUtility";
import MetaReadsLogo from "../../../../public/assets/Meta Reads Logo.png";
import ShimmerButton from "../../Form/Button/ShimmerButton";

export default function SubscriptionWarningModal({
  open,
  handleClose,
}: FormModalProps) {
  return (
    <BaseModal open={open} handleClose={handleClose}>
      <div className="my-2 flex w-full justify-center gap-2">
        <img src={MetaReadsLogo} alt="MetaReads Logo" width={"35px"} />
        <div className="flex items-center">
          <Title text="Subscription Required" />
        </div>
      </div>
      <div className="my-7 flex h-[50px] w-full justify-center text-center text-lg font-normal">
        <p>
          You need to subscribe to access this book. Join us for unlimited
          reading!
        </p>
      </div>
      <div className="flex w-full justify-center">
        <ShimmerButton text={"Subscribe"} onClick={handleClose} />
      </div>
    </BaseModal>
  );
}
