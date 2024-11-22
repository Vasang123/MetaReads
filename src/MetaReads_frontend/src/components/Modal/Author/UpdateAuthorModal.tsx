import { useRef } from "react";
import { ToastError } from "../../Form/Notifications/ErrorNotification";
import { ToastSuccess } from "../../Form/Notifications/SuccessNotification";
import { ToastLoading } from "../../Form/Notifications/LoadingNotification";
import { toast } from "react-toastify";
import AuthorForm from "../../Form/Layout/AuthorForm";
import BaseModal from "../BaseModal";
import { useUpdateAuthor } from "../../Hook/Data/Author/useUpdateAuthor";
import { FormModalProps } from "../../Props/modalProps";

export default function UpdateAuthorModal({
  open,
  handleClose,
  fetchData,
  selectedItem,
}: FormModalProps) {
  const { updateAuthor, error } = useUpdateAuthor();
  const loadingToastId = useRef(null);

  const handleUpdate = async (name: string) => {
    // @ts-ignore
    loadingToastId.current = ToastLoading("Loading..");
    try {
      const success = await updateAuthor(selectedItem.id, name);
      if (success) {
        ToastSuccess("Author Updated Successfully");
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
        buttonContent={"Update"}
        handleClose={handleClose}
        onSubmit={handleUpdate}
        selectedItem={selectedItem}
      />
    </BaseModal>
  );
}
