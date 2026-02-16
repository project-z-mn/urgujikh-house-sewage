'use client'

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function OrderDetailPage({ params }: any) {
  const router = useRouter()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!
  })

  useEffect(() => {
    fetch(`/api/orders/${params.id}`)
      .then(res => {
        if (!res.ok) {
          setNotFound(true)
          setLoading(false)
          return null
        }
        return res.json()
      })
      .then(data => {
        if (data) setOrder(data)
        setLoading(false)
      })
  }, [params.id])

  // ⏳ Loading
  if (loading || !isLoaded) {
    return <p className="p-8">Ачааллаж байна...</p>
  }

  // ❌ Захиалга олдсонгүй
  if (notFound) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-gray-600">
          ⚠️ Энэ захиалга олдсонгүй
        </p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          ← Буцах
        </button>
      </div>
    )
  }

  // ✅ Амжилттай
  return (
    <div className="max-w-4xl mx-auto mt-12 space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-xl font-semibold mb-2">
          🧾 Захиалгын дэлгэрэнгүй
        </h1>

        <p><b>Хаяг:</b> {order.address}</p>
        <p><b>Төлөв:</b> {order.status}</p>

        {/* 🔙 БУЦАХ ТОВЧ */}
        <button
          onClick={() => router.back()}
          className="mt-4 text-blue-600 font-medium"
        >
          ← Миний захиалгууд руу буцах
        </button>
      </div>

      {order.truckLocation && (
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="font-medium mb-3">🚚 Машины байршил</h2>
          <GoogleMap
            center={order.truckLocation}
            zoom={14}
            mapContainerStyle={{ width: '100%', height: '400px' }}
          >
            <Marker position={order.truckLocation} />
          </GoogleMap>
        </div>
      )}
    </div>
  )
}
