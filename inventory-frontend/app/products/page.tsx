"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getProducts, deleteProduct } from "@/services/api";
import { Product } from "@/types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError("Unable to load products"))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string) {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Delete failed");
    }
  }

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Products</h2>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.category}</td>
                <td className="px-4 py-2">₹{p.price}</td>
                <td className="px-4 py-2">{p.quantity}</td>
                <td className="px-4 py-2 space-x-3">
                  <button
                    onClick={() =>
                      router.push(`/edit-product?id=${p.id}`)
                    }
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="p-4 text-center text-gray-500">
            No products found
          </p>
        )}
      </div>
    </div>
  );
}
