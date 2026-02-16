"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        <Link href="/" className="flex items-center">
          <Image
            src="/urgujikh.house.png"
            alt="Өргөжих хаус"
            width={200}
            height={60}
            priority
          />
        </Link>

        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
          <Link href="/">Нүүр</Link>
          <Link href="/about">Бидний тухай</Link>
          <Link href="/services">Үйлчилгээ</Link>
          <Link href="/partner">Хамтран ажилласан</Link>
          <Link href="/news">Мэдээ мэдээлэл</Link>
          <Link href="/contact">Холбоо барих</Link>
        </nav>

        {/* USER LOGIN ONLY */}
        <div ref={dropdownRef} className="relative hidden md:block">
          <button
            onClick={() => setOpen(!open)}
            className="bg-[#0b4f7d] text-white px-5 py-2 rounded-md text-sm font-semibold"
          >
            Нэвтрэх
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-50">
              <Link
                href="/auth/login"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                👤 Хэрэглэгч
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
