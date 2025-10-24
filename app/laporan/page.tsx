"use client";

import { Suspense } from "react";
import LaporanHistoryContent from "./LaporanHistoryContent";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LaporanHistoryPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-[#5B903A] animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Memuat riwayat laporan...</p>
          </div>
        </div>
      }>
        <LaporanHistoryContent />
      </Suspense>
      <Footer />
    </>
  );
}