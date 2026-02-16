"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { apiFetchAuth } from "@/lib/api";

type Order = {
  id: number;
  address: string;
  volume: string;
  status: string;
  user: {
    email: string;
  };
};

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  /* ============================
     FETCH ALL ORDERS
  ============================ */

  const fetchOrders = useCallback(async () => {
    try {
      setError("");
      setLoading(true);

      const data = await apiFetchAuth("/admin/orders");
      setOrders(data);
    } catch (err: any) {
      console.error("Failed to fetch orders:", err);
      setError(err.message || "Захиалга татахад алдаа гарлаа");
      
      // Only redirect to login on authentication errors
      if (err.message === "Нэвтрэх шаардлагатай" || err.message === "Хандах эрхгүй байна") {
        router.replace("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  /* ============================
     UPDATE STATUS
  ============================ */

  const updateStatus = async (
    orderId: number,
    status: string
  ) => {
    try {
      await apiFetchAuth(`/admin/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      await fetchOrders();
    } catch (err: any) {
      alert(err.message || "Төлөв шинэчлэхэд алдаа гарлаа");
    }
  };

  /* ============================
     DELETE ORDER
  ============================ */

  const deleteOrder = async (orderId: number) => {
    if (!confirm("Энэ захиалгыг устгахдаа итгэлтэй байна уу?")) {
      return;
    }

    try {
      await apiFetchAuth(`/admin/orders/${orderId}`, {
        method: "DELETE",
      });

      await fetchOrders();
    } catch (err: any) {
      alert(err.message || "Захиалга устгахад алдаа гарлаа");
    }
  };

  const logout = () => {
    localStorage.clear();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Ачааллаж байна...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-800">❌ {error}</p>
          <button
            onClick={fetchOrders}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Дахин оролдох
          </button>
        </div>
        <button
          onClick={logout}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          🚪 Гарах
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h1
        style={{
          fontSize: 22,
          marginBottom: 20,
        }}
      >
        ⚙ Админ самбар
      </h1>

      <button
        onClick={logout}
        style={{
          background: "red",
          color: "white",
          padding: "8px 15px",
          border: "none",
          marginBottom: 30,
          cursor: "pointer",
        }}
      >
        🚪 Гарах
      </button>

      {orders.length === 0 && (
        <p>Захиалга алга</p>
      )}

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ddd",
            padding: 15,
            marginBottom: 20,
          }}
        >
          <h3>{order.user.email}</h3>

          <p>
            📍 {order.address} | 🛢{" "}
            {order.volume} тонн
          </p>

          <p>
            Төлөв: <b>{order.status}</b>
          </p>

          <div style={{ marginTop: 10 }}>
            {order.status === "PENDING" && (
              <button
                onClick={() =>
                  updateStatus(
                    order.id,
                    "CONFIRMED"
                  )
                }
              >
                Батлах
              </button>
            )}

            {order.status === "CONFIRMED" && (
              <button
                onClick={() =>
                  updateStatus(
                    order.id,
                    "DONE"
                  )
                }
                style={{ marginLeft: 5 }}
              >
                Дуусгах
              </button>
            )}

            {order.status !== "DONE" &&
              order.status !== "CANCELED" && (
                <button
                  onClick={() =>
                    updateStatus(
                      order.id,
                      "CANCELED"
                    )
                  }
                  style={{ marginLeft: 5 }}
                >
                  Цуцлах
                </button>
              )}

            {order.status === "CANCELED" && (
              <button
                onClick={() =>
                  deleteOrder(order.id)
                }
                style={{
                  marginLeft: 5,
                  color: "red",
                }}
              >
                Устгах
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
