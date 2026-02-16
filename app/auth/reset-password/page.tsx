"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const token = params.get("token");
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Нууц үг таарахгүй байна");
      return;
    }

    const res = await fetch("/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
    } else {
      setSuccess("Нууц үг амжилттай солигдлоо");
      setTimeout(() => router.push("/auth/login"), 2000);
    }
  };

  if (!token) return <p>Invalid link</p>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form className="bg-white p-6 rounded-xl w-full max-w-sm" onSubmit={submit}>
        <h1 className="text-xl font-bold mb-4">Шинэ нууц үг</h1>

        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        <input
          type="password"
          placeholder="Шинэ нууц үг"
          className="input mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Нууц үг давтах"
          className="input mb-4"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button className="w-full bg-black text-white py-2 rounded">
          Хадгалах
        </button>
      </form>
    </div>
  );
}
