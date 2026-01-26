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
  token: string | null;              
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // load from cookies once
  useEffect(() => {
    const storedToken = Cookies.get("token");
    const userData = Cookies.get("user");

    if (storedToken && userData) {
      setToken(storedToken);
      setUser(JSON.parse(userData));
    }
  }, []); 

  function login(token: string, user: User) {
    if (!token || !user) return;

    Cookies.set("token", token);
    Cookies.set("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
    router.push("/dashboard");
  }

  function logout() {
    Cookies.remove("token");
    Cookies.remove("user");
    setToken(null);
    setUser(null);
    router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext missing");
  return ctx;
}
