'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const menu = [
  { label: 'Хэрэглэгчийн хэсэг', href: '/dashboard' },
  { label: 'Миний захиалгууд', href: '/dashboard/orders' },
  { label: 'Хадгалсан захиалгууд', href: '/dashboard/saved-orders' },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const logout = () => {
    localStorage.removeItem('token')
    router.push('/auth/login')
  }

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      <ul className="space-y-2">
        {menu.map(item => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`block px-4 py-2 rounded-lg ${
                pathname === item.href
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}

        <li>
          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50"
          >
            Гарах
          </button>
        </li>
      </ul>
    </aside>
  )
}
