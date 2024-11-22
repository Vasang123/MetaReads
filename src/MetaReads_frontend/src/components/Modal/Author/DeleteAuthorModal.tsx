import { useRef } from "react";
import { toast } from "react-toastify";
import { ToastLoading } from "../../Form/Notifications/LoadingNotification";
import { ToastSuccess } from "../../Form/Notifications/SuccessNotification";
import { ToastError } from "../../Form/Notifications/ErrorNotification";
import { useDeleteAuthor } from "../../Hook/Data/Author/useDeleteAuthor";
import { FormModalProps } from "../../Props/modalProps";
import DeleteModal from "../DeleteModal";

export default function DeleteAuthorModal({
  open,
  handleClose,
  fetchData,
  selectedItem,
}: FormModalProps) {
  const { deleteAuthor, error } = useDeleteAuthor();
  const loadingToastId = useRef(null);
  const handleDelete = async () => {
    // @ts-ignore
    loadingToastId.current = ToastLoading("Loading..");
    try {
      const success = await deleteAuthor(selectedItem.id);
      if (success) {
        ToastSuccess("Author Deleted Successfully");
        fetchData();
      } else {
        ToastError(error);
      }
    } finally {
      handleClose();

      if (loadingToastId.current) {
        toast.dismiss(loadingToastId.current);
        loadingToastId.current = null;
      }
    }
  };
  return (
    <DeleteModal
      open={open}
      handleClose={handleClose}
      title={"Do you want to delete this author ?"}
      handleDelete={handleDelete}
    />
  );
}
