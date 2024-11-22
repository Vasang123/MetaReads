import { useRef } from "react";
import { ToastError } from "../../Form/Notifications/ErrorNotification";
import { ToastSuccess } from "../../Form/Notifications/SuccessNotification";
import { ToastLoading } from "../../Form/Notifications/LoadingNotification";
import { toast } from "react-toastify";
import BaseModal from "../BaseModal";
import { FormModalProps } from "../../Props/modalProps";
import useCreateSubscription from "../../Hook/Data/Subscription/useCreateSubscription";
import { Title } from "../../Utility/TitleUtility";
import ShimmerButton from "../../Form/Button/ShimmerButton";
import { BsFillCheckCircleFill } from "react-icons/bs";
import CurrencyLogo from "../../../../public/assets/Currency Logo.png";

interface BuySubscriptionModal extends FormModalProps {
  userId: string;
  planId: string;
  isYearly: "Yearly" | "Monthly";
  price: string;
  benefits: string[];
}
export default function BuySubscriptionModal({
  open,
  handleClose,
  fetchData,
  userId,
  planId,
  isYearly,
  price,
  benefits,
}: BuySubscriptionModal) {
  const { createSubscription, error } = useCreateSubscription();
  const loadingToastId = useRef(null);

  const handleCreate = async () => {
    // @ts-ignores
    loadingToastId.current = ToastLoading("Loading..");
    try {
      const success = await createSubscription(userId, planId, isYearly);
      if (success) {
        ToastSuccess("Subscription Payment Success!");
        fetchData();
        handleClose();
      } else {
        if (error) ToastError(error as string);
      }
    } finally {
      if (loadingToastId.current) {
        toast.dismiss(loadingToastId.current);
        loadingToastId.current = null;
      }
    }
  };

  return (
    <BaseModal open={open} handleClose={handleClose}>
      <div className="flex w-full flex-grow flex-col gap-2 text-center text-xl font-semibold">
        <div className="flex justify-center gap-2">
          By choosing the {isYearly} plan for
          <div className="flex items-center gap-1">
            <img src={CurrencyLogo} alt="Currency Logo" className="h-5" />
            <span>{price},</span>
          </div>
        </div>
        you will gain access to:
      </div>

      <div className="my-5 flex h-[100px] items-center justify-center overflow-y-auto">
        <p className="text-md w-full text-gray-700">
          {benefits.map((benefit: any, index: any) => (
            <li
              key={index}
              className="flex items-center p-2 text-sm text-gray-600"
            >
              <div className="mr-2">
                <BsFillCheckCircleFill color="#EFAF21" size={19} />
              </div>
              <div className="text-white" style={{ fontSize: "16px" }}>
                {benefit}
              </div>
            </li>
          ))}
        </p>
      </div>

      <div className="flex w-full justify-center gap-3">
        <button
          className="rounded-md border border-gray-600 bg-gray-600 px-4 py-2 text-sm font-bold uppercase text-white transition duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)]"
          onClick={handleClose}
        >
          Cancel
        </button>

        <ShimmerButton text={"Subscribe"} onClick={handleCreate} />
      </div>
    </BaseModal>
  );
}
