import { deleteFromStorage, retrieveFromStorage } from "@/lib/asyncStorage";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: any) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const storedUserId = await retrieveFromStorage<string>("user-id");
      if (storedUserId) {
        setUser({ id: storedUserId });
      }
      setIsLoading(false);
    })();
  }, []);

  const signOut = async () => {
    await deleteFromStorage("user-id");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, setUser, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be inside of the AuthProvider");
  }
  return context;
};
