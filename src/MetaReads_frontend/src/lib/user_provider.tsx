import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { User } from "../components/Props/userProps";
import { useCookie } from "../components/Hook/Cookie/useCookie";
import { UserModel } from "../components/Props/model";
import { useSubscriptionByUser } from "../components/Hook/Data/Subscription/useSubscriptionByUser";

interface UserContextType {
  user: UserModel | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<UserModel | null>>;
  isAdmin: boolean;
  getUserById: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const { getIdentityfromCookie } = useCookie();


  async function getUserById() {
    setLoading(true);
    const { getSubscriptionByUser } = await useSubscriptionByUser()
    try {
      const newUser = await getIdentityfromCookie();
      setUser(newUser);
      if (newUser) {
        const subscription = await getSubscriptionByUser(newUser.id.toString())
        setUser({
          id: newUser.id,
          username: newUser.username,
          money: newUser.money,
          image: newUser.image,
          subscription: subscription[0],
        });
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserById();
  }, []);

  useEffect(() => {
    if (user && user.username === "vasang") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const contextValue: UserContextType = {
    user,
    loading,
    setUser,
    isAdmin,
    getUserById,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
