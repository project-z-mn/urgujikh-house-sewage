"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const match = document.cookie.match(/role=(USER|ADMIN)/);
    const role = match ? match[1] : null;

    if (role !== "USER") {
      router.replace("/auth/login");
    }
  }, [router]);

  return <>{children}</>;
}
