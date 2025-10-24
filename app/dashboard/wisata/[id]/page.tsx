"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { wisataApi } from "@/lib/api";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Clock,
  Star,
  Loader2,
  Image as ImageIcon,
  Tag,
  CheckCircle,
  XCircle,
  Calendar,
  Users
} from "lucide-react";

interface Wisata {
  id: string;
  nama: string;
  deskripsi: string;
  lokasi: string;
  kategori?: string;
  harga?: number;
  jamBuka?: string;
  jamTutup?: string;
  kontak?: string;
  foto?: string;
  rating?: number;
  isAktif: boolean;
  createdAt: string;
}

export default function DetailWisataPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [wisata, setWisata] = useState<Wisata | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchWisata();
    }
  }, [id]);

  const fetchWisata = async () => {
    try {
      setLoading(true);
      const response = await wisataApi.getById(id);
      
      if (response.success && response.data) {
        const data = response.data as Wisata;
        setWisata(data);
      } else {
        throw new Error(response.message || "Gagal memuat data wisata");
      }
    } catch (error: any) {
      console.error("Error fetching wisata:", error);
      toast.error(error.message || "Gagal memuat data wisata");
      router.push("/dashboard/wisata");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat detail wisata...</p>
        </div>
      </div>
    );
  }

  if (!wisata) {
    return (
      <div className="text-center py-16">
        <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg font-medium">Wisata tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/dashboard/wisata")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Detail Wisata</h1>
          <p className="text-gray-600 mt-1">Informasi lengkap destinasi wisata</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Image & Status */}
        <div className="xl:col-span-1 space-y-6">
          {/* Image Card */}
          {wisata.foto && (
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center text-lg">
                <ImageIcon className="w-5 h-5 mr-2 text-gray-600" />
                Foto Wisata
              </h3>
              <img
                src={wisata.foto}
                alt={wisata.nama}
                className="w-full h-64 object-cover rounded-lg border-2 border-gray-300"
                onError={(e) => {
                  e.currentTarget.src = '/assets/images/placeholder.jpg';
                }}
              />
            </div>
          )}

          {/* Status Card */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 text-lg">Status</h3>
            <span
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold ${
                wisata.isAktif
                  ? "bg-green-100 text-green-800 border-2 border-green-300"
                  : "bg-red-100 text-red-800 border-2 border-red-300"
              }`}
            >
              {wisata.isAktif ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-1.5" />
                  Aktif Beroperasi
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 mr-1.5" />
                  Tidak Aktif
                </>
              )}
            </span>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  Terdaftar sejak{" "}
                  {new Date(wisata.createdAt).toLocaleDateString("id-ID", {
                    day: 'numeric',
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Rating Card */}
          {wisata.rating && (
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center text-lg">
                <Star className="w-5 h-5 mr-2 text-yellow-600" />
                Rating
              </h3>
              <div className="flex items-center">
                <span className="text-4xl font-bold text-yellow-600">{wisata.rating}</span>
                <div className="ml-3 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(wisata.rating || 0)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Details */}
        <div className="xl:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {wisata.nama}
              </h2>
              {wisata.kategori && (
                <span className="inline-flex items-center px-4 py-1.5 bg-blue-600 text-white text-sm rounded-full font-medium">
                  <Tag className="w-3.5 h-3.5 mr-1.5" />
                  {wisata.kategori}
                </span>
              )}
            </div>
            <p className="text-gray-700 leading-relaxed">{wisata.deskripsi}</p>
          </div>

          {/* Location & Contact Information */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 text-lg mb-5 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              Lokasi & Kontak
            </h3>
            <div className="space-y-4">
              <div className="flex items-center text-gray-700 p-4 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Lokasi</p>
                  <p className="font-semibold">{wisata.lokasi}</p>
                </div>
              </div>
              
              {wisata.kontak && (
                <div className="flex items-center text-gray-700 p-4 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Kontak</p>
                    <p className="font-semibold">{wisata.kontak}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Operational Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Jam Operasional */}
            {(wisata.jamBuka || wisata.jamTutup) && (
              <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 text-lg mb-5 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  Jam Operasional
                </h3>
                <div className="flex items-center text-gray-700 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Clock className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-blue-700">Buka - Tutup</p>
                    <p className="font-bold text-blue-900">
                      {wisata.jamBuka || "00:00"} - {wisata.jamTutup || "23:59"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Harga Tiket */}
            {wisata.harga && (
              <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 text-lg mb-5 flex items-center">
                  <span className="mr-2 text-green-600 font-bold text-xl">Rp</span>
                  Harga Tiket
                </h3>
                <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                  <p className="text-xs text-green-700 font-semibold mb-1">Per Orang</p>
                  <p className="text-2xl font-bold text-green-800">
                    Rp {wisata.harga.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Summary Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-indigo-600" />
              Ringkasan Wisata
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <p className="text-sm font-bold text-gray-800">
                  {wisata.isAktif ? "Aktif" : "Nonaktif"}
                </p>
              </div>
              {wisata.kategori && (
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="text-xs text-gray-500 mb-1">Kategori</p>
                  <p className="text-sm font-bold text-gray-800">{wisata.kategori}</p>
                </div>
              )}
              {wisata.rating && (
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="text-xs text-gray-500 mb-1">Rating</p>
                  <p className="text-sm font-bold text-yellow-600">{wisata.rating} ⭐</p>
                </div>
              )}
              {wisata.harga && (
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="text-xs text-gray-500 mb-1">Harga</p>
                  <p className="text-sm font-bold text-green-600">
                    Rp {(wisata.harga / 1000).toFixed(0)}K
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
