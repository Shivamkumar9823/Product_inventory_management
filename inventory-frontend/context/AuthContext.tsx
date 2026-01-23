"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    const userData = Cookies.get("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  function login(token: string, user: User) {
    Cookies.set("token", token);
    Cookies.set("user", JSON.stringify(user));
    setUser(user);
    router.push("/dashboard");
  }

  function logout() {
    Cookies.remove("token");
    Cookies.remove("user");
    setUser(null);
    router.push("/");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext missing");
  return ctx;
}
