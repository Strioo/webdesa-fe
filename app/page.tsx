import { Suspense } from 'react';
import Home from "./home/page";
import { Loader2 } from 'lucide-react';

export default function Page() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#5B903A] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat halaman...</p>
        </div>
      </div>
    }>
      <Home />
    </Suspense>
  )
}