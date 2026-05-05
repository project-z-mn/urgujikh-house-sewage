"use client";

import { useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await apiFetch("/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      setMessage("📩 Хэрвээ имэйл бүртгэлтэй бол сэргээх заавар илгээгдэнэ");
    } catch (err: any) {
      setError(err.message || "Сервертэй холбогдож чадсангүй");
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
          Нууц үг сэргээх
        </h1>

        {error && (
          <p className="mb-3 text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </p>
        )}

        {message && (
          <p className="mb-3 text-sm text-green-600 bg-green-50 p-2 rounded">
            {message}
          </p>
        )}

        <input
          type="email"
          placeholder="Имэйл хаяг"
          className="mb-4 w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded py-2 text-white transition
            ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}
          `}
        >
          {loading ? "Илгээж байна..." : "Сэргээх"}
        </button>

        <p className="mt-4 text-center text-sm">
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            ← Нэвтрэх рүү буцах
          </Link>
        </p>
      </form>
    </div>
  );
}
