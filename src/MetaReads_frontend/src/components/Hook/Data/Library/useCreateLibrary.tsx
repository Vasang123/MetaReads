import { useState } from "react";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";
import { Principal } from "@dfinity/principal";
import { getCookie } from "../../../Utility/IdentityUtility";

export const useCreateLibrary = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  const createLibrary = async (name: string) => {
    setLoading(true);
    setError(null);
    const identityCookie = getCookie('identity');
    if (identityCookie) {
      const user_id: Principal = Principal.fromText(identityCookie);
      try {
        await MetaReads_backend.create_library({
          id: [],
          user_id: user_id,
          name: [name],
          book_id: []
        });
        return true; // Indicate success
      } catch (err: any) {
        setError(err);
        return false; // Indicate failure
      } finally {
        setLoading(false);
      }
    } else {
      console.error('Identity cookie not found.');
    }
  };

  return { createLibrary, loading, error };
};
