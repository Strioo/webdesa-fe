import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          UMKM Tidak Ditemukan
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Maaf, UMKM yang Anda cari tidak tersedia atau mungkin telah dipindahkan.
        </p>
        <Link
          href="/umkm"
          className="inline-block px-6 py-3 bg-[#5B903A] text-white font-semibold rounded-full hover:bg-[#4a7a2f] transition-colors duration-300"
        >
          Kembali ke Daftar UMKM
        </Link>
      </div>
    </div>
  )
}
