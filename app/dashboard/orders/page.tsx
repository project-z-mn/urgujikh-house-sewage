"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetchAuth } from "@/lib/api";

type Order = {
  id: number;
  address: string;
  volume: number;
  status: string;
  createdAt: string;
};

const statusLabels: Record<string, string> = {
  PENDING: "Хүлээгдэж буй",
  CONFIRMED: "Баталгаажсан",
  DONE: "Дууссан",
  CANCELED: "Цуцлагдсан",
};

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  DONE: "bg-green-100 text-green-800",
  CANCELED: "bg-red-100 text-red-800",
};

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchOrders = async () => {
    try {
      setError("");
      setLoading(true);
      
      // Updated endpoint to match backend
      const data = await apiFetchAuth("/orders/my-orders");
      setOrders(data);
    } catch (err: any) {
      console.error("Failed to fetch orders:", err);
      setError(err.message || "Захиалга татахад алдаа гарлаа");
      
      // Redirect to login if unauthorized
      if (err.message === "Нэвтрэх шаардлагатай") {
        router.push("/auth/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const cancel = async (id: number) => {
    try {
      await apiFetchAuth(`/orders/${id}/cancel`, {
        method: "PUT",
      });
      
      // Refresh orders list
      await fetchOrders();
    } catch (err: any) {
      alert(err.message || "Захиалга цуцлахад алдаа гарлаа");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Ачааллаж байна...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">❌ {error}</p>
          <button
            onClick={fetchOrders}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Дахин оролдох
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Миний захиалгууд</h1>

      {orders.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600 text-lg">
            Та одоогоор захиалга үүсгээгүй байна
          </p>
          <button
            onClick={() => router.push("/order/create")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Захиалга үүсгэх
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Захиалга #{order.id}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString("mn-MN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusColors[order.status] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  {statusLabels[order.status] || order.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <p className="flex items-center text-gray-700">
                  <span className="font-medium mr-2">📍 Хаяг:</span>
                  {order.address}
                </p>
                <p className="flex items-center text-gray-700">
                  <span className="font-medium mr-2">🛢 Эзлэхүүн:</span>
                  {order.volume} тонн
                </p>
              </div>

              {order.status === "PENDING" && (
                <button
                  onClick={() => cancel(order.id)}
                  className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Цуцлах
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
