'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const ORDERS_KEY = 'orders'

export default function CreateOrderPage() {
  const router = useRouter()

  const [address, setAddress] = useState('')
  const [volume, setVolume] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const submit = async () => {
    if (!address || !volume) {
      setError('Бүх талбарыг бөглөнө үү')
      return
    }

    setLoading(true)
    setError('')

    try {
      const newOrder = {
        id: crypto.randomUUID(),
        address,
        volume,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
      }

      const existing = JSON.parse(
        localStorage.getItem(ORDERS_KEY) || '[]'
      )

      localStorage.setItem(
        ORDERS_KEY,
        JSON.stringify([newOrder, ...existing])
      )

      setSuccess(true)

      setTimeout(() => {
        router.push('/dashboard/orders')
      }, 900)
    } catch {
      setError('Захиалга илгээхэд алдаа гарлаа')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto py-12">
      <Link
        href="/dashboard"
        className="text-sm text-gray-600 hover:underline mb-4 inline-block"
      >
        ← Хэрэглэгчийн хэсэг рүү буцах
      </Link>

      <div className="bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl font-semibold mb-2">
          🧾 Шинэ захиалга үүсгэх
        </h1>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm mb-6">
          <ol className="list-decimal list-inside space-y-1">
            <li>Ажлын хаягаа тодорхой оруулна</li>
            <li>Соруулах бохир усны хэмжээг тонн-оор бичнэ</li>
            <li>Захиалга илгээгдсэний дараа жолооч холбогдоно</li>
          </ol>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium block mb-1">
            📍 Ажлын хаяг
          </label>
          <input
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium block mb-1">
            🚛 Багтаамж (тонн)
          </label>
          <input
            type="number"
            value={volume}
            onChange={e => setVolume(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-700 p-2 rounded mb-4 text-sm">
            🎉 Амжилттай захиаллаа! Түр хүлээнэ үү...
          </div>
        )}

        <button
          onClick={submit}
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white font-medium
            ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}
          `}
        >
          {loading ? 'Илгээж байна...' : '🚀 Захиалах'}
        </button>
      </div>
    </div>
  )
}
