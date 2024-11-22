import { useRef } from "react";
import { ToastError } from "../../Form/Notifications/ErrorNotification";
import { ToastSuccess } from "../../Form/Notifications/SuccessNotification";
import { ToastLoading } from "../../Form/Notifications/LoadingNotification";
import { toast } from "react-toastify";
import BaseModal from "../BaseModal";
import { FormModalProps } from "../../Props/modalProps";
import { useRemoveBookLibrary } from "../../Hook/Data/Library/useRemoveBookLibrary";
import DeleteModal from "../DeleteModal";

interface LibraryModalProps extends FormModalProps {
    bookId: string
}

export default function RemoveLibraryModal({ open, handleClose, fetchData, selectedItem: libraryId, bookId }: LibraryModalProps) {
    const { removeBook, error } = useRemoveBookLibrary();
    const loadingToastId = useRef(null);

    const handleRemove = async () => {
        // @ts-ignore
        loadingToastId.current = ToastLoading("Loading..");
        try {
            const success = await removeBook(libraryId, bookId);
            if (success) {
                ToastSuccess("Book removed Successfully");
                fetchData();
                handleClose();
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
            <DeleteModal
                open={open}
                handleClose={handleClose}
                title={"Are you sure you want to remove this book from the library?"}
                handleDelete={handleRemove}
            />
        </BaseModal>
    );
}
