// "use client";

// import { useAuth } from "@/context/AuthContext";
// import { useState } from "react";

// export default function AuthForm() {
//   const { login } = useAuth();

//   const [isSignup, setIsSignup] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");



//   async function handleSubmit() {
//     // 🔥 Fake API response (abhi)
//     const token = "fake-jwt-token";

//     const user = {
//       name: isSignup ? name : "User",
//       email,
//     };

//     login(token, user);
//   }

//   return (
//     <div className="max-w-sm mx-auto mt-10 border p-6 rounded shadow">
//       <h2 className="text-xl font-semibold mb-4 text-center">
//         {isSignup ? "Create Account" : "Login"}
//       </h2>

//       {isSignup && (
//         <input
//           placeholder="Name"
//           className="border p-2 w-full mb-3"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       )}

//       <input
//         placeholder="Email"
//         className="border p-2 w-full mb-3"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         placeholder="Password"
//         type="password"
//         className="border p-2 w-full mb-4"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button
//         onClick={handleSubmit}
//         className="bg-black text-white px-4 py-2 w-full mb-3"
//       >
//         {isSignup ? "Sign Up" : "Login"}
//       </button>

//       <p className="text-sm text-center text-gray-600">
//         {isSignup ? "Already have an account?" : "New user?"}{" "}
//         <button
//           className="text-blue-600 font-medium"
//           onClick={() => setIsSignup(!isSignup)}
//         >
//           {isSignup ? "Login" : "Sign up"}
//         </button>
//       </p>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { loginUser, signupUser } from "@/services/api";

export default function AuthForm() {
  const { login } = useAuth();

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);

      let response;

      if (isSignup) {
        response = await signupUser({ name, email, password });
      } else {
        response = await loginUser({ email, password });
      }

      // backend should return this
      const { token, user } = response;

      login(token, user);

    } catch (err) {
      // alert("Authentication failed");
      alert(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-10 border p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {isSignup ? "Sign Up" : "Login"}
      </h2>

      {isSignup && (
        <input
          placeholder="Name"
          className="border p-2 w-full mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <input
        placeholder="Email"
        className="border p-2 w-full mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        className="border p-2 w-full mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-black text-white px-4 py-2 w-full"
      >
        {loading ? "Please wait..." : isSignup ? "Sign Up" : "Login"}
      </button>

      <p className="text-sm text-center text-gray-600 mt-3">
        {isSignup ? "Already have an account?" : "New user?"}{" "}
        <button
          className="text-blue-600"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Login" : "Sign up"}
        </button>
      </p>
    </div>
  );
}

