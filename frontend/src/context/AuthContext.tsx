import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

type User = {
  id: string;
  username: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  register: (username: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await api.get("/auth/me");

        setUser({
          id: res.data.user._id,
          username: res.data.user.username,
        });
      } catch {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  const register = async (username: string, password: string) => {
    const res = await api.post("/auth/register", { username, password });

    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
  };

  const login = async (username: string, password: string) => {
    const res = await api.post("/auth/login", { username, password });

    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}