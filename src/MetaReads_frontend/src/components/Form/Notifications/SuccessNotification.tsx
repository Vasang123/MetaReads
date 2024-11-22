import { toast } from "react-toastify";

export const ToastSuccess = (message : string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    // style: "width: 500px"
  });
};
