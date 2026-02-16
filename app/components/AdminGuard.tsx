"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const match = document.cookie.match(/role=(USER|ADMIN)/);
    const role = match ? match[1] : null;

    if (role !== "ADMIN") {
      router.replace("/admin/login");
    }
  }, [router]);

  return <>{children}</>;
}
