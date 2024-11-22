import { Principal } from "@dfinity/principal";
import { useState } from "react";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";

export const useDeleteBook = () => {
  const [error, setError] = useState<any | null>(null);
  const deleteBook = async (id: Principal) => {
    setError(null);
    const book_id: Principal = Principal.fromText(id.toString());
    try {
      await MetaReads_backend.delete_book(book_id);
      return true;
    } catch (err: any) {
      setError(err);
      return false;
    }
  };

  return { deleteBook, error };
};
