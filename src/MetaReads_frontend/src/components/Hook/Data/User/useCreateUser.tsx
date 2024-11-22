import { useState } from "react";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";
import { Principal } from "@dfinity/principal";

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createUser = async (internetIdentityId: string, username: string) => {
    setLoading(true);
    setError(null);


    try {
      const response: any = await MetaReads_backend.create_user({
        id: Principal.fromText(internetIdentityId),
        username: username,
        money: [BigInt(100)],
        password: [],
        image: [],
      });
      if (response?.Err?.ValidationErrors?.message) {
        return response?.Err?.ValidationErrors?.message;
      } else {
        return true;
      }
    } catch (err: any) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error };
};
