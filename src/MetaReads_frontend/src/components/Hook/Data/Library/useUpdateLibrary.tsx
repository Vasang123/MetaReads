import { useState } from "react";
import { Principal } from "@dfinity/principal";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";
import { getCookie } from "../../../Utility/IdentityUtility";

export const useUpdateLibrary = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  const updateLibrary = async (id: Principal, name: string) => {
    const library_id: Principal = Principal.fromText(id.toString());
    setLoading(true);
    setError(null);
    const identityCookie = getCookie('identity');

    if (identityCookie) {
      try {
        const user_id: Principal = Principal.fromText(identityCookie);
        const res = await MetaReads_backend.update_library({
          id: [library_id],
          name: [name],
          user_id: user_id,
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
      setLoading(false); // Ensure loading is set to false
      return false; // Indicate failure
    }
  };

  return { updateLibrary, loading, error };
};
