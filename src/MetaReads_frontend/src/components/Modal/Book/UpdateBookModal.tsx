import { useRef } from "react";
import { ToastError } from "../../Form/Notifications/ErrorNotification";
import { ToastSuccess } from "../../Form/Notifications/SuccessNotification";
import { ToastLoading } from "../../Form/Notifications/LoadingNotification";
import { toast } from "react-toastify";
import AuthorForm from "../../Form/Layout/AuthorForm";
import BaseModal from "../BaseModal";
import { useUpdateAuthor } from "../../Hook/Data/Author/useUpdateAuthor";
import { FormModalProps } from "../../Props/modalProps";
import BookForm from "../../Form/Layout/BookForm";
import { Principal } from "@dfinity/principal";
import { useUpdateBook } from "../../Hook/Data/Book/useUpdateBook";
import useFirebaseStorage from "../../Hook/Firebase/useFirebaseStorage";

export default function UpdateBookModal({
  open,
  handleClose,
  fetchData,
  selectedItem,
}: FormModalProps) {
  const { updateBook, error } = useUpdateBook();
  const loadingToastId = useRef(null);
  const { uploadBookFile, uploadBookCover } = useFirebaseStorage();

  const handleUpdate = async (
    title: string,
    author: Principal,
    book_url: File | null,
    plan: string,
    genre: Principal,
    description: string,
    coverImage: File | null,
    page_count: any,
  ) => {
    // @ts-ignore
    loadingToastId.current = ToastLoading("Loading..");
    try {
      if (book_url && coverImage) {
        const currentTime = new Date().getTime().toString();
        const pdf_url = await uploadBookFile(
          book_url,
          currentTime + " - " + title,
        );
        const book_cover = await uploadBookCover(
          coverImage,
          currentTime + " - " + title,
        );
        const success = await updateBook(
          selectedItem.id,
          title,
          author,
          pdf_url,
          plan,
          genre,
          description,
          book_cover,
          page_count,
        );
        if (success) {
          ToastSuccess("Book Updated Successfully");
          fetchData();
          handleClose();
        } else {
          ToastError(error);
        }
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
      <BookForm
        buttonContent={"Update"}
        handleClose={handleClose}
        onSubmit={handleUpdate}
        selectedItem={selectedItem}
      />
    </BaseModal>
  );
}
