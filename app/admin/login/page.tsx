"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!data?.token) {
        throw new ApiError("Серверээс токен ирсэнгүй", 500);
      }
      
      if (!data?.role) {
        throw new ApiError("Серверээс эрх ирсэнгүй", 500);
      }
      
      if (data.role !== "ADMIN") {
        throw new ApiError("Админ эрхгүй байна", 403);
      }

      // ✅ localStorage ONLY
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      router.replace("/admin");
    } catch (err: any) {
      console.error("Admin login error:", err);
      
      // Use status code for better error handling
      if (err instanceof ApiError) {
        if (err.status === 401) {
          setError("Имэйл эсвэл нууц үг буруу байна");
        } else if (err.status === 403) {
          setError(err.message);
        } else if (err.status && err.status >= 500) {
          setError("Серверт алдаа гарлаа. Түр хүлээгээд дахин оролдоно уу.");
        } else {
          setError(err.message || "Нэвтрэх боломжгүй. Дахин оролдоно уу.");
        }
      } else {
        setError(err.message || "Нэвтрэх боломжгүй. Дахин оролдоно уу.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-xl shadow w-full max-w-sm"
      >
        <h1 className="text-xl font-bold text-center text-red-600 mb-4">
          🔐 Админ нэвтрэх
        </h1>

        {error && <div className="text-red-600 mb-3">{error}</div>}

        <input
          type="email"
          placeholder="Админ имэйл"
          className="w-full border p-2 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Нууц үг"
          className="w-full border p-2 mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Нэвтэрч байна..." : "Админ нэвтрэх"}
        </button>
      </form>
    </div>
  );
}
