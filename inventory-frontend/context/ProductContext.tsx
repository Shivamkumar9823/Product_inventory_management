"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/types/product";
import { getProducts } from "@/services/api";
import { useAuth } from "@/context/AuthContext";

interface ProductContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  getProductById: (id: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, setProducts] = useState<Product[]>([]);

  const { token } = useAuth(); // from AuthContext

   useEffect(() => {
    if (!token) return;   // 👈 no user, no API call

    getProducts()
        .then(setProducts)
        .catch(console.error);
    }, [token]);


  function getProductById(id: string) {
    const val = products.find((p) => String(p.id) === id);
    console.log("getProductById:", id, val);
    console.log("Current products:", products);
    return val;
  }

  return (
    <ProductContext.Provider
      value={{ products, setProducts, getProductById }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("ProductContext missing");
  return ctx;
}
