"use client";

import { useState, useMemo } from "react";
import { useProducts } from "@/context/ProductContext";

export default function DashboardPage() {
  const { products } = useProducts();

  const [lowStockLimit, setLowStockLimit] = useState(5);

  // KPIs
  const totalProducts = products === null ? 0 :products.length;

  const totalStock = useMemo(() => {
    return products === null ? 0 : products.reduce((sum, p) => sum + p.quantity, 0);
  }, [products]);

  const inventoryValue = useMemo(() => {
    return products === null ? 0 : products.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0
    );
  }, [products]);

  const lowStockProducts = useMemo(() => {
    return products === null ? [] : products.filter(
      (p) => p.quantity <= lowStockLimit
    );
  }, [products, lowStockLimit]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {/* Low stock threshold */}
      <div className="mb-6 flex items-center gap-3">
        <label className="font-medium">
          Low stock threshold:
        </label>
        <input
          type="number"
          value={lowStockLimit}
          onChange={(e) =>
            setLowStockLimit(Number(e.target.value))
          }
          className="border px-3 py-1 rounded w-24"
        />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card title="Total Products" value={totalProducts} />
        <Card title="Total Stock" value={totalStock} />
        <Card
          title="Low Stock Items"
          value={lowStockProducts.length}
        />
        <Card
          title="Inventory Value"
          value={`₹${inventoryValue}`}
        />
      </div>

      {/* Low stock table */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="text-lg font-semibold mb-3">
          Low Stock Products
        </h3>

        {lowStockProducts.length === 0 ? (
          <p className="text-gray-500">
            No low stock products 🎉
          </p>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 text-left">
                  Name
                </th>
                <th className="px-3 py-2 text-left">
                  Category
                </th>
                <th className="px-3 py-2 text-left">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody>
              {lowStockProducts.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-3 py-2">{p.name}</td>
                  <td className="px-3 py-2">
                    {p.category}
                  </td>
                  <td className="px-3 py-2 text-red-600 font-medium">
                    {p.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* Small reusable card */
function Card({
  title,
  value,
}: {
  title: string;
  value: number | string;
}) {
  return (
    <div className="bg-white rounded shadow p-4">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
