"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">Inventory Management</h1>

      {user ? (
        <button
          onClick={logout}
          className="text-sm text-red-600"
        >
          Logout
        </button>
      ) : (
        <Link
          href="/login"
          className="text-sm text-blue-600"
        >
          Login
        </Link>
      )}
    </header>
  );
}
