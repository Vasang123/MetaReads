import { useState } from "react";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";
import { Principal } from "@dfinity/principal";
import { AuthorModel, GenreModel } from "../../../Props/model";

export const useCreateComment = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  const createComment = async (
    text: string,
    userId: Principal,
    bookId: Principal,
  ) => {
    setLoading(true);
    setError(null);

    try {
      await MetaReads_backend.create_comment({
        text: text,
        user_id: userId,
        book_id: bookId,
      });
      return true; // Indicate success
    } catch (err: any) {
      setError(err);
      return false; // Indicate failure
    } finally {
      setLoading(false);
    }
  };

  return { createComment, loading, error };
};
