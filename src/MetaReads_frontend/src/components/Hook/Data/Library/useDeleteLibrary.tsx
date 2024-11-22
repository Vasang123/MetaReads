import { Principal } from "@dfinity/principal";
import { useState } from "react";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";

export const useDeleteLibrary = () => {
  const [error, setError] = useState<any | null>(null);
  const deleteLibrary = async (id: Principal) => {
    setError(null);

    const library_id: Principal = Principal.fromText(id.toString());
    try {
      await MetaReads_backend.delete_library(library_id);
      return true;
    } catch (err: any) {
      setError(err);
    }
  };

  return { deleteLibrary, error };
};
