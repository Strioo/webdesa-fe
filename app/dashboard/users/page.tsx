"use client";

import { Suspense } from "react";
import UsersPageContent from "./UsersPageContent";
import { Loader2 } from "lucide-react";

export default function UsersPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat halaman users...</p>
        </div>
      </div>
    }>
      <UsersPageContent />
    </Suspense>
  );
}