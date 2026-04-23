"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getClientAuth } from "@/lib/firebase";
import Link from "next/link";

export default function AdminAuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(getClientAuth(), (user) => {
      if (!user && pathname !== "/admin/login") {
        router.push("/admin/login");
      }
      setChecking(false);
    });
    return unsub;
  }, [router, pathname]);

  async function handleLogout() {
    await signOut(getClientAuth());
    await fetch("/api/auth/session", { method: "DELETE" });
    router.push("/admin/login");
  }

  if (pathname === "/admin/login") return <>{children}</>;

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0faf5]">
        <div className="text-4xl animate-pulse">🌿</div>
      </div>
    );
  }

  const navItems = [
    { href: "/admin?tab=scheduling", label: "Scheduling", icon: "📅" },
    { href: "/admin?tab=quotes", label: "Quote Requests", icon: "📋" },
    { href: "/admin?tab=payments", label: "Payment History", icon: "💰" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a3d2e] text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-[#2D6A4F]">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="font-bold text-lg">GreenCut</span>
          </Link>
          <p className="text-xs text-green-400 mt-1">Admin Console</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-green-200 hover:bg-[#2D6A4F] hover:text-white transition-colors"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-[#2D6A4F]">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-xs text-green-400 hover:text-white transition-colors mb-2"
          >
            ← View site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-green-400 hover:text-red-300 transition-colors"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-lg font-semibold text-gray-900">Admin Dashboard</h1>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
