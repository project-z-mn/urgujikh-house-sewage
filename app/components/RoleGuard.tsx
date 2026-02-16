"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRole, isLoggedIn, Role } from "../../lib/auth";

export default function RoleGuard({
  allow,
  children,
}: {
  allow: Role;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const role = getRole();

    if (!isLoggedIn() || role !== allow) {
      router.replace("/");
    } else {
      setReady(true);
    }
  }, [allow, router]);

  if (!ready) return null;

  return <>{children}</>;
}
