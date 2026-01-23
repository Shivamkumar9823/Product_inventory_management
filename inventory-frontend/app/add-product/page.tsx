"use client";

import * as Sentry from "@sentry/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/services/api";

Sentry.captureMessage("User opened Add Product page");

export default function AddProductPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.name || !form.category) {
      setError("Name and category are required");
      return;
    }

    setLoading(true);

    try {
      await createProduct({
        name: form.name,
        category: form.category,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });

      router.push("/products");
    } catch(err) {
        Sentry.captureException(err);
      setError("Unable to add product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>

      {error && (
        <p className="text-red-500 mb-3">{error}</p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-4"
      >
        <input
          name="name"
          placeholder="Product Name"
          className="w-full border px-3 py-2 rounded"
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category"
          className="w-full border px-3 py-2 rounded"
          onChange={handleChange}
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          className="w-full border px-3 py-2 rounded"
          onChange={handleChange}
        />

        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          className="w-full border px-3 py-2 rounded"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
