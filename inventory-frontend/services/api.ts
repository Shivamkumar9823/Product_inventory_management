import { Product } from "@/types/product";
import Cookies from "js-cookie";
import * as Sentry from "@sentry/nextjs";
import { send } from "process";


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getProducts(): Promise<Product[]> {
  try {
  const res = await fetch(`${BASE_URL}/api/products`, {
    method: "GET",
    headers: authHeaders(),
  });

  // if (!res.ok) {
  //   Sentry.captureException(`Failed to fetch products: ${res.statusText}`);
  //   throw new Error("Failed to fetch products");
  // }
  if (!res.ok) {
    let backendError = "Failed to fetch products";

    try {
      const errData = await res.json();
      backendError = errData.error || backendError;
    } catch {}

    const error = new Error(backendError);
    Sentry.captureException(error);
    throw error;
  }

  return res.json();
} catch (error) {
  Sentry.captureException(error);
  throw error;
}
}



function authHeaders() {
  const token = Cookies.get("token");

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}


// export async function loginUser(data: {
//   email: string;
//   password: string;
// }) {
//   const res = await fetch(`${BASE_URL}/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });

//   if (!res.ok) {
//     const error = new Error(`Login failed: ${res.status} ${res.statusText}`);
//     Sentry.captureException(error);
//     throw new Error("Login failed");
//   }

//   return res.json(); 
//   // expected: { token, user }
// }

export async function loginUser(data: {
  email: string;
  password: string;
}) {
  try {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    let backendError = "Login failed";

    try {
      const errData = await res.json();
      backendError = errData.error || backendError;
    } catch {}

    const error = new Error(backendError);
    Sentry.captureException(error);
    throw error;
  }

  return res.json(); // { token, user }
}
catch (error) {
  Sentry.captureException(error);
  throw error;
}
}

export async function signupUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  try {
  console.log("Signup response:", JSON.stringify(data));
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  

  console.log("Signup response status:", res);

  // if (!res.ok) {
  //   throw new Error("Signup failed");
  // }
  if (!res.ok) {
    let backendError = "LSignup failed";

    try {
      const errData = await res.json();
      backendError = errData.error || backendError;
    } catch {}

    const error = new Error(backendError);
    Sentry.captureException(error);
    throw error;
  }

  return res.json();
} catch (error) {
  Sentry.captureException(error);
  throw error;
}
}




export async function createProduct(
  product: Omit<Product, "id">
) {
  try {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(product),
  });

  // if (!res.ok) {
  //   throw new Error("Failed to create product");
  // }
  if (!res.ok) {
    let backendError = "Failed to create product";

    try {
      const errData = await res.json();
      backendError = errData.error || backendError;
    } catch {}

    const error = new Error(backendError);
    Sentry.captureException(error);
    throw error;
  }
  const data = await res.json();

  return Array.isArray(data) ? data : data.products ?? [];
} catch (error) {
  Sentry.captureException(error);
  throw error;
}
}


export async function getProductById(id: string): Promise<Product> {
  try {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${id}`,{
      headers: authHeaders(),
    }
  );

  // if (!res.ok) {
  //   throw new Error("Failed to fetch product");
  // }
  if (!res.ok) {
    let backendError = "Failed to fetch product";

    try {
      const errData = await res.json();
      backendError = errData.error || backendError;
    } catch {}

    const error = new Error(backendError);
    Sentry.captureException(error);
    throw error;
  }
  

  return res.json();
} catch (error) {
  Sentry.captureException(error);
  throw error;
}
}

export async function updateProduct(
  id: string,
  product: Omit<Product, "id">
) {
  try {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${id}`,
    {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(product),
    }
  );

  // if (!res.ok) {
  //   throw new Error("Failed to update product");
  // }

  if (!res.ok) {
    let backendError = "Failed to update product";

    try {
      const errData = await res.json();
      backendError = errData.error || backendError;
    } catch {}

    const error = new Error(backendError);
    Sentry.captureException(error);
    throw error;
  }

  return res.json();
} catch (error) {
  Sentry.captureException(error);
  throw error; 
}
}

// delete by id

export async function deleteProduct(id: string) {
  try {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${id}`,
    {
      method: "DELETE",
      headers: authHeaders(),
    }
  );

  // if (!res.ok) {
  //   throw new Error("Failed to delete product");
  // }
  if (!res.ok) {
    let backendError = "Failed to delete product";

    try {
      const errData = await res.json();
      backendError = errData.error || backendError;
    } catch {}

    const error = new Error(backendError);
    Sentry.captureException(error);
    throw error;
  }
} catch (error) {
  Sentry.captureException(error);
  throw error;
}
}
