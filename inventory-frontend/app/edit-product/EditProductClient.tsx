// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { updateProduct, getProducts } from "@/services/api";
// import { useProducts } from "@/context/ProductContext";

// export default function EditProductClient() {
//   const params = useSearchParams();
//   const router = useRouter();

//   const { getProductById, setProducts } = useProducts();
//   const id = params.get("id");
//   const product = id ? getProductById(id) : undefined;

//   const [form, setForm] = useState({
//     name: "",
//     category: "",
//     price: "",
//     quantity: "",
//   });

//   useEffect(() => {
//     if (!product) return;
//     setForm({
//       name: product.name,
//       category: product.category,
//       price: String(product.price),
//       quantity: String(product.quantity),
//     });
//   }, [product]);

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     await updateProduct(id!, {
//       name: form.name,
//       category: form.category,
//       price: Number(form.price),
//       quantity: Number(form.quantity),
//     });

//     const fresh = await getProducts();
//     setProducts(fresh);
//     router.push("/products");
//   }

//   return (
//     <div className="max-w-lg">
//       <h2>Edit Product</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
//         <input name="category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/>
//         <input name="price" value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/>
//         <input name="quantity" value={form.quantity} onChange={e=>setForm({...form,quantity:e.target.value})}/>
//         <button>Update</button>
//       </form>
//     </div>
//   );
// }


"use client";
// export const dynamic = "force-dynamic";


import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { updateProduct } from "@/services/api";
import { useProducts } from "@/context/ProductContext";
import { getProducts } from "@/services/api";

export default function EditProductPage() {
  console.log("EditProductPage rendered");
  const params = useSearchParams();
  const router = useRouter();

  const { getProductById, setProducts } = useProducts();
  const id = params.get("id");
  const product = id ? getProductById(id) : undefined;

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    if (!product) return;


    setForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      quantity: String(product.quantity),
    });
  }, [product]);

  console.log("Product to edit:", product);

  console.log("Form state:", form);

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

      const fresh = await getProducts();
      
      setProducts(fresh);

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