import { Principal } from "@dfinity/principal";
import { useState } from "react";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";

export const useDeleteAuthor = () => {
  const [error, setError] = useState<any | null>(null);
  const deleteAuthor = async (id: Principal) => {
    setError(null);
    const author_id: Principal = Principal.fromText(id.toString());
    try {
      await MetaReads_backend.delete_author(author_id);
      return true;
    } catch (err: any) {
      setError(err);
      return false;
    }
  };

  return { deleteAuthor, error };
};
