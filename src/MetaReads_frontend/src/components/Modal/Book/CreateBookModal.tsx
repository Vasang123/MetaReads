import { useRef } from "react";
import { ToastError } from "../../Form/Notifications/ErrorNotification";
import { ToastSuccess } from "../../Form/Notifications/SuccessNotification";
import { ToastLoading } from "../../Form/Notifications/LoadingNotification";
import { toast } from "react-toastify";

import BaseModal from "../BaseModal";
import { useCreateAuthor } from "../../Hook/Data/Author/useCreateAuthor";
import AuthorForm from "../../Form/Layout/AuthorForm";
import { FormModalProps } from "../../Props/modalProps";
import { useCreateBook } from "../../Hook/Data/Book/useCreateBook";
import { Principal } from "@dfinity/principal";
import { AuthorModel, GenreModel } from "../../Props/model";
import BookForm from "../../Form/Layout/BookForm";
import useFirebaseStorage from "../../Hook/Firebase/useFirebaseStorage";

interface BookModel {
  id: Principal;
  title: string;
  author: AuthorModel;
  book_url: File | null;
  plan: string;
  genre: GenreModel;
  description: string;
  coverImage: File | null;
  views: number;
  page_count: number;
}

export function CreateBookModal({
  open,
  handleClose,
  fetchData,
}: FormModalProps) {
  const { createBook, error } = useCreateBook();
  const loadingToastId = useRef<string | null>(null);

  const { uploadBookFile, uploadBookCover } = useFirebaseStorage();

  const handleCreate = async (
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
        const success = await createBook(
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
          ToastSuccess("Book Created Successfully");
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
        buttonContent={"Create"}
        handleClose={handleClose}
        onSubmit={handleCreate}
      />
    </BaseModal>
  );
}
