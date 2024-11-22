import { useRef } from "react";
import { ToastError } from "../../Form/Notifications/ErrorNotification";
import { ToastSuccess } from "../../Form/Notifications/SuccessNotification";
import { ToastLoading } from "../../Form/Notifications/LoadingNotification";
import { toast } from "react-toastify";
import GenreForm from "../../Form/Layout/GenreForm";
import BaseModal from "../BaseModal";
import { useCreateGenre } from "../../Hook/Data/Genre/useCreateGenre";
import { FormModalProps } from "../../Props/modalProps";

export default function CreateGenreModal({
  open,
  handleClose,
  fetchData,
}: FormModalProps) {
  const { createGenre, error } = useCreateGenre();
  const loadingToastId = useRef(null);

  const handleCreate = async (name: string) => {
    // @ts-ignores
    loadingToastId.current = ToastLoading("Loading..");
    try {
      const success = await createGenre(name);
      if (success) {
        ToastSuccess("Genre Created Successfully");
        fetchData();
      } else {
        ToastError(error);
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
      <GenreForm
        buttonContent={"Create"}
        handleClose={handleClose}
        onSubmit={handleCreate}
      />
    </BaseModal>
  );
}
