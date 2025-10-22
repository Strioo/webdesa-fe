"use client";

import { Eye, Edit, Trash2, Star, MapPin, DollarSign } from "lucide-react";

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
  onDelete
}: WisataGridViewProps) {
  if (wisata.length === 0) {
    return (
      <div className="text-center py-12">
        <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Tidak ada wisata yang ditemukan</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {wisata.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
        >
          {item.foto ? (
            <div className="h-48 bg-gray-200 overflow-hidden relative">
              <img
                src={item.foto}
                alt={item.nama}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-wisata.jpg';
                }}
              />
              <div className="absolute top-3 right-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium shadow-lg ${
                  item.isAktif
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}>
                  {item.isAktif ? "Aktif" : "Tidak Aktif"}
                </span>
              </div>
            </div>
          ) : (
            <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
              <MapPin className="w-16 h-16 text-blue-300" />
            </div>
          )}
          
          <div className="p-5">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate flex-1">
                {item.nama}
              </h3>
            </div>
            
            {item.kategori && (
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mb-3">
                {item.kategori}
              </span>
            )}
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {item.deskripsi}
            </p>
            
            <div className="space-y-2 text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">{item.lokasi}</span>
              </div>
              {item.harga !== undefined && item.harga !== null && (
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="font-semibold text-green-600">
                    Rp {item.harga.toLocaleString('id-ID')}
                  </span>
                </div>
              )}
              {item.rating && (
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-2 text-yellow-400 fill-current" />
                  <span>{item.rating}/5.0</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onView(item)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Lihat Detail"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onEdit(item)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs text-gray-400">
                {new Date(item.createdAt).toLocaleDateString('id-ID')}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
