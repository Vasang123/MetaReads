import { useRef } from "react";
import DeleteModal from "../DeleteModal";
import { toast } from "react-toastify";
import { ToastLoading } from "../../Form/Notifications/LoadingNotification";
import { ToastSuccess } from "../../Form/Notifications/SuccessNotification";
import { ToastError } from "../../Form/Notifications/ErrorNotification";
import { useDeleteGenre } from "../../Hook/Data/Genre/useDeleteGenre";
import { FormModalProps } from "../../Props/modalProps";
import { useDeleteLibrary } from "../../Hook/Data/Library/useDeleteLibrary";

export default function DeleteLibraryModal({
    open,
    handleClose,
    fetchData,
    selectedItem,
}: FormModalProps) {
    const { deleteLibrary, error } = useDeleteLibrary();

    const loadingToastId = useRef(null);
    const handleDelete = async () => {
        // @ts-ignore
        loadingToastId.current = ToastLoading("Loading..");
        try {
            const success = await deleteLibrary(selectedItem.id);
            if (success) {
                ToastSuccess("Library Deleted Successfully");
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
            title={"Do you want to delete this library and its content ?"}
            handleDelete={handleDelete}
        />
    );
}
