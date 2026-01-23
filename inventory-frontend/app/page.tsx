import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold mb-4">
        Inventory Management System
      </h1>

      <p className="text-gray-600 mb-6">
        Login to access inventory features
      </p>

      <Link
        href="/login"
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Login
      </Link>
    </div>
  );
}
