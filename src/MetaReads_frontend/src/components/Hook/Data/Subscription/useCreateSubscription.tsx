import { useState } from "react";
import { Principal } from "@dfinity/principal";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";

const useCreateSubscription = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createSubscription = async (
    userId: string,
    planId: string,
    frequency: string,
  ) => {
    setLoading(true);
    setError(null);

    try {
      console.log(userId, planId, frequency);

      const data = await MetaReads_backend.create_subscription({
        id: [],
        user_id: Principal.fromText(userId),
        plan_id: Principal.fromText(planId),
        frequency: frequency,
      });
      return true; // Indicate success
    } catch (err: any) {
      setError(err);
      return false; // Indicate failure
    } finally {
      setLoading(false);
    }
  };

  return { createSubscription, loading, error };
};

export default useCreateSubscription;
