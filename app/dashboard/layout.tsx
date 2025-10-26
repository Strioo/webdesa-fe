"use client";

export const dynamic = 'force-dynamic'

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  MapPin,
  Store,
  CreditCard,
  Hammer,
  Users,
  LogOut,
  Menu,
  X,
  Settings,
  Home,
  User as UserIcon,
  ChevronDown
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Toaster } from 'sonner';

const sidebarItems = [
  {
    name: "Ringkasan",
    href: "/dashboard",
    icon: LayoutDashboard,
    exact: true
  },
  {
    name: "Laporan",
    href: "/dashboard/laporan",
    icon: FileText
  },
  {
    name: "Wisata",
    href: "/dashboard/wisata",
    icon: MapPin
  },
  {
    name: "UMKM",
    href: "/dashboard/umkm",
    icon: Store
  },
  {
    name: "Transaksi",
    href: "/dashboard/transaksi",
    icon: CreditCard
  },
  {
    name: "Program",
    href: "/dashboard/program",
    icon: Hammer
  },
  {
    name: "Pengguna",
    href: "/dashboard/users",
    icon: Users
  }
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Anda perlu login terlebih dahulu</p>
          <Link href="/login" className="text-blue-600 hover:text-blue-700">
            Ke halaman login
          </Link>
        </div>
      </div>
    );
  }

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`fixed top-0 left-0 z-50 w-64 h-full bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:transform-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">Admin Desa</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const isItemActive = isActive(item.href, item.exact);
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isItemActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon
                      className={`w-5 h-5 ${
                        isItemActive ? "text-blue-600" : "text-gray-400"
                      }`}
                    />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                <span className={`inline-block px-2 py-0.5 text-xs rounded-full mt-1 ${
                  user.role === 'ADMIN' ? 'bg-red-100 text-red-700' :
                  user.role === 'WARGA' ? 'bg-blue-100 text-blue-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {user.role}
                </span>
              </div>
            </div>
            <button 
              onClick={logout}
              className="flex items-center justify-center space-x-2 text-sm text-red-600 hover:text-red-700 transition-colors w-full py-2 hover:bg-red-50 rounded-lg"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="lg:ml-64">
        <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-bold text-gray-800">Dashboard Admin</h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <button 
                  onClick={() => setShowSettings(!showSettings)}
                  className="flex items-center space-x-2 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Settings className="w-5 h-5" />
                </button>

                {showSettings && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-2">
                      <Link
                        href="/home"
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                        onClick={() => setShowSettings(false)}
                      >
                        <Home className="w-4 h-4" />
                        <span className="text-sm font-medium">Kembali ke Home</span>
                      </Link>
                      <button
                        onClick={() => {
                          setShowSettings(false);
                          logout();
                        }}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 w-full transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          {children}
          <Toaster position="top-right" richColors closeButton />
        </main>
      </div>
    </div>
  );
}