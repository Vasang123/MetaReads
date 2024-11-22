import { useState } from "react";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";

export const useCreateGenre = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  const createGenre = async (name: string) => {
    setLoading(true);
    setError(null);

    try {
      await MetaReads_backend.create_genre({
        id: [],
        name: name,
      });
      return true; // Indicate success
    } catch (err: any) {
      setError(err);
      return false; // Indicate failure
    } finally {
      setLoading(false);
    }
  };

  return { createGenre, loading, error };
};
