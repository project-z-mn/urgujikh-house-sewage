"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  try {
    await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    router.push("/auth/login");
  } catch (err: any) {
    setError(err.message || "Бүртгэл амжилтгүй");
  }
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow"
      >
        <h1 className="mb-4 text-xl font-bold text-center">Бүртгүүлэх</h1>

        {/* Error */}
        {error && (
          <div className="mb-3 rounded bg-red-50 p-2 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Имэйл"
          className="mb-3 w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Нууц үг"
          className="mb-4 w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Submit */}
        <button
          disabled={loading}
          className={`w-full rounded py-2 text-white transition
            ${loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"}
          `}
        >
          {loading ? "Бүртгэж байна..." : "Бүртгүүлэх"}
        </button>

        {/* Login link */}
        <p className="mt-4 text-center text-sm">
          Аль хэдийн бүртгэлтэй?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Нэвтрэх
          </Link>
        </p>
      </form>
    </div>
  );
}
