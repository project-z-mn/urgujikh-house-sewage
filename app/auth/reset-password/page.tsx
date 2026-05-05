"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const token = params.get("token");
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Нууц үг таарахгүй байна");
      return;
    }

    setLoading(true);

    try {
      await apiFetch("/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      setSuccess("Нууц үг амжилттай солигдлоо");
      setTimeout(() => router.push("/auth/login"), 2000);
    } catch (err: any) {
      setError(err.message || "Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow text-center">
          <p className="text-red-600 mb-4">Холбоос хүчингүй байна</p>
          <Link href="/auth/forgot-password" className="text-blue-600 hover:underline text-sm">
            Дахин сэргээх холбоос авах
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-xl w-full max-w-sm shadow"
      >
        <h1 className="text-xl font-bold mb-4 text-center">Шинэ нууц үг</h1>

        {error && (
          <p className="mb-3 text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </p>
        )}
        {success && (
          <p className="mb-3 text-sm text-green-600 bg-green-50 p-2 rounded">
            {success}
          </p>
        )}

        <input
          type="password"
          placeholder="Шинэ нууц үг"
          className="mb-3 w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Нууц үг давтах"
          className="mb-4 w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded py-2 text-white transition
            ${loading ? "bg-gray-400" : "bg-black hover:bg-gray-800"}
          `}
        >
          {loading ? "Хадгалж байна..." : "Хадгалах"}
        </button>
      </form>
    </div>
  );
}
