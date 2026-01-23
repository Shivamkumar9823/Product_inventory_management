// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const links = [
//   { name: "Dashboard", href: "/dashboard" },
//   { name: "Products", href: "/products" },
//   { name: "Add Product", href: "/add-product" },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();

//   return (
//     <aside className="w-64 bg-white shadow-md">
//       <div className="p-6 text-xl font-bold text-blue-600">
//         Inventory App
//       </div>

//       <nav className="px-4 space-y-2">
//         {links.map((link) => (
//           <Link
//             key={link.href}
//             href={link.href}
//             className={`block px-4 py-2 rounded-md ${
//               pathname === link.href
//                 ? "bg-blue-100 text-blue-600"
//                 : "text-gray-700 hover:bg-gray-100"
//             }`}
//           >
//             {link.name}
//           </Link>
//         ))}
//       </nav>
//     </aside>
//   );
// }


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const links = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Products", href: "/products" },
  { name: "Add Product", href: "/add-product" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  // 🔐 If user is not logged in → hide sidebar
  if (!user) return null;

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-6 text-xl font-bold text-blue-600">
        Inventory App
      </div>

      <nav className="px-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-4 py-2 rounded-md ${
              pathname === link.href
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
