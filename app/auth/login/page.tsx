"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

export default function UserLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Имэйл болон нууц үг оруулна уу");
      return;
    }

    try {
      setLoading(true);

      const data = await apiFetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!data?.token || !data?.role) throw new Error("Серверийн алдаа");

      if (data.role !== "USER") {
        throw new Error("Энэ хэсэгт зөвхөн хэрэглэгч нэвтрэх боломжтой");
      }

      // ✅ localStorage ONLY
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      router.replace("/dashboard");
    } catch (err: any) {
      setError(err.message || "Имэйл эсвэл нууц үг буруу байна");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow"
      >
        <h1 className="mb-4 text-xl font-bold text-center">
          Хэрэглэгч нэвтрэх
        </h1>

        {error && (
          <div className="mb-3 rounded bg-red-50 p-2 text-sm text-red-600">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Имэйл"
          className="mb-3 w-full rounded border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Нууц үг"
          className="mb-4 w-full rounded border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
        </button>

        <p className="mt-4 text-center text-sm">
          Бүртгэлгүй юу?{" "}
          <Link href="/auth/register" className="text-blue-600">
            Бүртгүүлэх
          </Link>
        </p>
      </form>
    </div>
  );
}
