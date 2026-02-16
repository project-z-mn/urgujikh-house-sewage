import Link from "next/link";

export default function OrderCard({ order }: any) {
  return (
    <div className="rounded-xl border p-4 bg-white shadow">
      <p className="font-semibold">🚚 Захиалга #{order.id}</p>
      <p>📍 {order.address}</p>
      <p>📊 Төлөв: {order.state}</p>

      <div className="flex gap-3 mt-3">
        <Link href={`/order/${order.id}`} className="text-blue-600">
          Дэлгэрэнгүй
        </Link>

        {["draft", "confirmed"].includes(order.state) && (
          <button className="text-red-500">Цуцлах</button>
        )}
      </div>
    </div>
  );
}
