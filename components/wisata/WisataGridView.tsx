"use client";

import { MapPin, Eye, Edit, Trash2, Phone, Clock, Star } from "lucide-react";
import { getImageUrl, handleImageError } from "@/lib/utils";

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

interface WisataGridViewProps {
  wisata: Wisata[];
  onView: (wisata: Wisata) => void;
  onEdit: (wisata: Wisata) => void;
  onDelete: (id: string) => void;
}

export default function WisataGridView({
  wisata,
  onView,
  onEdit,
  onDelete,
}: WisataGridViewProps) {
  if (wisata.length === 0) {
    return (
      <div className="text-center py-12">
        <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Tidak ada wisata yang ditemukan</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {wisata.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 overflow-hidden group"
        >
          {/* Image */}
          <div className="relative h-48 bg-gray-200 overflow-hidden">
            <img
              src={getImageUrl(item.foto)}
              alt={item.nama}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={handleImageError}
            />
            
            {/* Status Badge */}
            <span
              className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
                item.isAktif
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {item.isAktif ? "Aktif" : "Nonaktif"}
            </span>

            {/* Rating Badge */}
            {item.rating && (
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-yellow-400 text-gray-900 flex items-center">
                <Star className="w-3 h-3 mr-1 fill-current" />
                {item.rating}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Header */}
            <div className="mb-3">
              <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">
                {item.nama}
              </h3>
              {item.kategori && (
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md font-medium">
                  {item.kategori}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {item.deskripsi}
            </p>

            {/* Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-start text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1">{item.lokasi}</span>
              </div>

              {item.harga && (
                <div className="flex items-center text-sm font-semibold text-green-600">
                  <span className="mr-1">Rp</span>
                  <span>{item.harga.toLocaleString('id-ID')}</span>
                </div>
              )}

              {(item.jamBuka || item.jamTutup) && (
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                  <span>{item.jamBuka || "00:00"} - {item.jamTutup || "23:59"}</span>
                </div>
              )}

              {item.kontak && (
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                  <span>{item.kontak}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
              <button
                onClick={() => onView(item)}
                className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors text-sm font-medium"
              >
                <Eye className="w-4 h-4 mr-1.5" />
                Detail
              </button>
              <button
                onClick={() => onEdit(item)}
                className="flex items-center justify-center px-3 py-2 bg-yellow-50 text-yellow-600 hover:bg-yellow-100 rounded-lg transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="flex items-center justify-center px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
