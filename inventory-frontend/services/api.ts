import { Product } from "@/types/product";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}



function authHeaders() {
  const token = Cookies.get("token");

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}


export async function loginUser(data: {
  email: string;
  password: string;
}) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json(); 
  // expected: { token, user }
}

export async function signupUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Signup failed");
  }

  return res.json();
}




export async function createProduct(
  product: Omit<Product, "id">
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    throw new Error("Failed to create product");
  }

  return res.json();
}


export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export async function updateProduct(
  id: string,
  product: Omit<Product, "id">
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update product");
  }

  return res.json();
}

export async function deleteProduct(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete product");
  }
}
