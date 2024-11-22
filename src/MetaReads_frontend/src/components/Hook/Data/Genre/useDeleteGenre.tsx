import { Principal } from "@dfinity/principal";
import { useState } from "react";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";

export const useDeleteGenre = () => {
  const [error, setError] = useState<any | null>(null);
  const deleteGenre = async (id: Principal) => {
    setError(null);
    const genre_id: Principal = Principal.fromText(id.toString());
    try {
      await MetaReads_backend.delete_genre(genre_id);
      return true;
    } catch (err: any) {
      setError(err);
    }
  };

  return { deleteGenre, error };
};
