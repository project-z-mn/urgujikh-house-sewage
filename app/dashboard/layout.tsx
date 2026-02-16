"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Role = "USER" | "ADMIN";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [ready, setReady] = useState(false);
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role") as Role | null;

    if (!token || storedRole !== "USER") {
      router.replace("/auth/login");
      return;
    }

    setRole(storedRole);
    setReady(true);
  }, [router]);

  if (!ready) return null;

  const logout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r p-5 flex flex-col justify-between">
        <div>
          <h2 className="text-xs font-semibold text-gray-500 mb-6 uppercase tracking-wide">
            Хэрэглэгчийн хэсэг
          </h2>

          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className={`block px-4 py-2 rounded ${
                  pathname === "/dashboard" ? "bg-black text-white" : "hover:bg-gray-100"
                }`}
              >
                Хяналтын самбар
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/orders"
                className={`block px-4 py-2 rounded ${
                  pathname.startsWith("/dashboard/orders") ? "bg-black text-white" : "hover:bg-gray-100"
                }`}
              >
                Миний захиалгууд
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="text-xs text-gray-400">Эрх: {role}</div>

          <button onClick={logout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded">
            Гарах
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
