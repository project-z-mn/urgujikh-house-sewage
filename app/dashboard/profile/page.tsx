"use client"

import { useState } from "react"

export default function ProfilePage() {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handlePasswordChange = () => {
    // TODO: backend холбох
    setSuccess("✅ Нууц үг амжилттай солигдлоо")
    setError("")
  }

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-semibold">Миний профайл</h1>

      {/* Хувийн мэдээлэл */}
      <section className="bg-white p-6 rounded-xl shadow-sm grid grid-cols-2 gap-6">
        <div>
          <label className="text-sm">Өөрийн нэр</label>
          <input className="input" />
        </div>
        <div>
          <label className="text-sm">Эцэг (эх)-ийн нэр</label>
          <input className="input" />
        </div>
        <div>
          <label className="text-sm">Хүйс</label>
          <select className="input">
            <option>Эмэгтэй</option>
            <option>Эрэгтэй</option>
          </select>
        </div>
        <div>
          <label className="text-sm">Төрсөн өдөр</label>
          <input type="date" className="input" />
        </div>

        <button className="col-span-2 bg-gray-100 py-2 rounded-lg">
          Хадгалах
        </button>
      </section>

      {/* Нууц үг солих */}
      <section className="bg-white p-6 rounded-xl shadow-sm max-w-md">
        <h2 className="font-medium mb-4">Нууц үг солих</h2>

        <div className="space-y-3">
          <input type="password" placeholder="Одоогийн нууц үг" className="input" />
          <input type="password" placeholder="Шинэ нууц үг" className="input" />
          <input type="password" placeholder="Нууц үг давтах" className="input" />
        </div>

        {error && <p className="text-red-600 mt-2">{error}</p>}
        {success && <p className="text-green-600 mt-2">{success}</p>}

        <button
          onClick={handlePasswordChange}
          className="mt-4 bg-black text-white px-6 py-2 rounded-lg"
        >
          Хадгалах
        </button>
      </section>
    </div>
  )
}
