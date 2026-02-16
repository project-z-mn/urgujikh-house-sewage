"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const match = document.cookie.match(/role=(USER|ADMIN)/);
    const role = match ? match[1] : null;

    if (role !== "USER") {
      router.replace("/auth/login");
    }
  }, [router]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">
        Хэрэглэгчийн хяналтын самбар
      </h1>

      <p className="text-gray-600 mb-6 text-sm">
        Захиалга үүсгэх, явцыг хянах хэсэг
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
        <Link
          href="/order/create"
          className="border rounded-xl p-6 hover:shadow transition bg-white"
        >
          <div className="text-xl font-medium mb-2">
            ➕ Шинэ захиалга
          </div>
          <p className="text-gray-600 text-sm">
            Бохир ус соруулах үйлчилгээ захиалах
          </p>
        </Link>

        <Link
          href="/dashboard/orders"
          className="border rounded-xl p-6 hover:shadow transition bg-white"
        >
          <div className="text-xl font-medium mb-2">
            📦 Миний захиалгууд
          </div>
          <p className="text-gray-600 text-sm">
            Захиалгын төлөв, явц харах
          </p>
        </Link>
      </div>
    </div>
  );
}
