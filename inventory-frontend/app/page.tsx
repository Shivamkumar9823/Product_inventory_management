"use client";
import Link from "next/link";
import {useAuth} from "@/context/AuthContext";
import { use } from "react";

export default function HomePage() {
  const { user,token } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold mb-4">
        Inventory Management System
      </h1>

      {!token ? 
      <div><p className="text-gray-600 mb-6">
        Login to access inventory features
      </p> 
      <Link
        href="/login"
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Login
      </Link>
      </div>
      : <p className="text-gray-600 mb-6">
        Welcome back, {user?.name}!
      </p>}

      
    </div>
  );
}
