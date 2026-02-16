import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaEnvelope,
} from "react-icons/fa6";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "Urgujikh House",
    template: "%s | Urgujikh House",
  },
  description: "Бохир ус соруулах, тээвэрлэх үйлчилгээ",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};
const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100057280757111",
    Icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/urgujikh.house/",
    Icon: FaInstagram,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@YOUR_USERNAME",
    Icon: FaYoutube,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/",
    Icon: FaTiktok,
  },
  {
    label: "Gmail",
    href: "mailto:Urgujikh@gmail.com",
    Icon: FaEnvelope,
  },
];
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="mn" suppressHydrationWarning>
      <body className="min-h-screen bg-white font-sans text-gray-800 antialiased">
        <Header />
        <div className="h-20" />
        <main className="min-h-[calc(100vh-160px)]">
          {children}
        </main>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              fontSize: "14px",
            },
          }}
        />
        <footer className="mt-10 border-t border-gray-200 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
          <div className="mx-auto max-w-7xl px-6 py-6">
            <div className="grid gap-6 md:grid-cols-[auto_1fr_1fr_1fr]">
              {/* SOCIALS */}
              <div className="flex items-center justify-center gap-3 md:justify-start">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="grid h-8 w-8 place-items-center rounded-full bg-black text-white transition hover:bg-[#0b4f7d]"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
              {/* LINKS */}
              <div className="text-center text-[12px] md:text-left">
                <h4 className="mb-1 font-semibold">ЦЭС</h4>
                <ul className="space-y-0.5">
                  <li>
                    <Link href="/business/concrete" className="hover:underline">
                      Бохир ус
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/rental" className="hover:underline">
                      Соруулах, тээвэрлэх үйлчилгээ
                    </Link>
                  </li>
                  <li>
                    <Link href="/projects" className="hover:underline">
                      Ажил
                    </Link>
                  </li>
                </ul>
              </div>
              {/* LOCATION */}
              <div className="text-center text-[12px] md:text-left">
                <h4 className="mb-1 font-semibold">БАЙРШИЛ</h4>
                <ul className="space-y-0.5">
                  <li>Офис: Улаанбаатар</li>
                  <li>
                    Үйлдвэр: Баянзүрх дүүрэг 28-р хороо, Сэлбэ 20-ийн 480 тоот
                  </li>
                </ul>
              </div>
              {/* CONTACT */}
              <div className="text-center text-[12px] md:text-left">
                <h4 className="mb-1 font-semibold">ХОЛБОО БАРИХ</h4>
                <ul className="space-y-0.5">
                  <li>Гар утас: 9919 6855</li>
                  <li>Office утас: 9019 6855</li>
                </ul>
              </div>
            </div>
            <p className="mt-6 text-center text-xs text-gray-400">
              © {new Date().getFullYear()} Urgujikh House. Бүх эрх хуулиар хамгаалагдсан.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
