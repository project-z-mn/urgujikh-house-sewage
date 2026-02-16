"use client";

import { useEffect, useState } from "react";

type Order = {
  id: number;
  address: string;
  volume: number;
  status: string;
  createdAt: string;
};

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    const res = await fetch("http://localhost:4000/orders/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const cancel = async (id: number) => {
    await fetch(`http://localhost:4000/orders/${id}/cancel`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchOrders();
  };

  return (
    <div>
      <h1>Миний захиалгууд</h1>

      {orders.map((order) => (
        <div key={order.id}>
          <p>{order.address}</p>
          <p>{order.volume} тонн</p>
          <p>{order.status}</p>

          {order.status === "PENDING" && (
            <button onClick={() => cancel(order.id)}>
              Цуцлах
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
