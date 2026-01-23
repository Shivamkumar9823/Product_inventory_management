import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <AuthProvider>
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1">
              <Navbar />
              <main className="p-6 overflow-y-auto">{children}</main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
