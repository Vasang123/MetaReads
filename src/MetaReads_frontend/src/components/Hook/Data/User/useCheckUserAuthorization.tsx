import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookModel, PlanLevel, UserModel } from "../../../Props/model";

interface UseCheckUserAuthorizationParams {
  user: UserModel | null;
  getCookie: (name: string) => string | null;
  detailBook: BookModel | undefined;
}

export const useCheckUserAuthorization = ({
  user,
  getCookie,
  detailBook,
}: UseCheckUserAuthorizationParams) => {
  const [authorize, setAuthorize] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    const checkAuthorization = async () => {
      const cookie = getCookie("identity");

      if (!cookie || !user) {
        setIsLoggedIn(false);
        return;
      }
      setIsLoggedIn(true);
      const planName = Array.isArray(user.subscription)
        ? user.subscription.length > 0
          ? user.subscription[0]?.plan.name
          : "No plan available"
        : user.subscription?.plan?.name || "No plan available";

      switch (detailBook?.plan) {
        case PlanLevel.Free:
          setAuthorize(true);
          break;

        case PlanLevel.Standard:
          setAuthorize(
            planName === PlanLevel.Standard || planName === PlanLevel.Premium,
          );
          break;

        case PlanLevel.Premium:
          setAuthorize(planName === PlanLevel.Premium);
          break;

        default:
          setAuthorize(false);
      }
    };

    if (detailBook) {
      checkAuthorization();
    }
  }, [user, getCookie, detailBook, nav]);

  return { authorize, isLoggedIn };
};
