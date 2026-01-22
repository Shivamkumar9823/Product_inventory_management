"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  getProductById,
  updateProduct,
} from "@/services/api";

export default function EditProductPage() {
  const params = useSearchParams();
  const router = useRouter();
  const id = params.get("id");

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    getProductById(id)
      .then((p) =>
        setForm({
          name: p.name,
          category: p.category,
          price: String(p.price),
          quantity: String(p.quantity),
        })
      )
      .catch(() => setError("Unable to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await updateProduct(id!, {
        name: form.name,
        category: form.category,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });

      router.push("/products");
    } catch {
      setError("Update failed");
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-4"
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="quantity"
          type="number"
          value={form.quantity}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Product
        </button>
      </form>
    </div>
  );
}
