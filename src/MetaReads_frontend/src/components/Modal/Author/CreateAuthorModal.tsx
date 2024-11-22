import { useRef } from "react";
import { ToastError } from "../../Form/Notifications/ErrorNotification";
import { ToastSuccess } from "../../Form/Notifications/SuccessNotification";
import { ToastLoading } from "../../Form/Notifications/LoadingNotification";
import { toast } from "react-toastify";

import BaseModal from "../BaseModal";
import { useCreateAuthor } from "../../Hook/Data/Author/useCreateAuthor";
import AuthorForm from "../../Form/Layout/AuthorForm";
import { FormModalProps } from "../../Props/modalProps";


export function CreateAuthorModal({ open, handleClose, fetchData }: FormModalProps) {
  const { createAuthor, error } = useCreateAuthor();
  const loadingToastId = useRef<string | null>(null);

  const handleCreate = async (name: string) => {
    // @ts-ignore
    loadingToastId.current = ToastLoading("Loading..");
    
    try {
      const success = await createAuthor(name);
      if (success) {
        ToastSuccess("Author Created Successfully");
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
      <AuthorForm
        buttonContent={"Create"}
        handleClose={handleClose}
        onSubmit={handleCreate}
      />
    </BaseModal>
  );
};


