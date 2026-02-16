"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const getToken = () =>
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  /* ============================
     FETCH ALL ORDERS
  ============================ */

  const fetchOrders = async () => {
    const token = getToken();

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:4000/admin/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        router.replace("/admin/login");
        return;
      }

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ============================
     UPDATE STATUS
  ============================ */

  const updateStatus = async (
    orderId: number,
    status: string
  ) => {
    const token = getToken();

    await fetch(
      `http://localhost:4000/admin/orders/${orderId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    fetchOrders();
  };

  /* ============================
     DELETE ORDER
  ============================ */

  const deleteOrder = async (orderId: number) => {
    const token = getToken();

    await fetch(
      `http://localhost:4000/admin/orders/${orderId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchOrders();
  };

  const logout = () => {
    localStorage.clear();
    router.push("/admin/login");
  };

  if (loading)
    return <p style={{ padding: 40 }}>Ачааллаж байна...</p>;

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
