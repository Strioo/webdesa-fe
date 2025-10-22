"use client";

import { X, MapPin, Phone, DollarSign, Clock, Star } from "lucide-react";

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

interface DetailModalProps {
  wisata: Wisata | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DetailModal({ wisata, isOpen, onClose }: DetailModalProps) {
  if (!isOpen || !wisata) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Detail Wisata</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {wisata.foto && (
            <div>
              <img
                src={wisata.foto}
                alt={wisata.nama}
                className="w-full h-64 object-cover rounded-lg border border-gray-200"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-wisata.jpg';
                }}
              />
            </div>
          )}

          <div>
            <h4 className="text-2xl font-semibold text-gray-900 mb-2">{wisata.nama}</h4>
            {wisata.kategori && (
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full mb-4">
                {wisata.kategori}
              </span>
            )}
            <p className="text-gray-700 leading-relaxed">{wisata.deskripsi}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                <span>{wisata.lokasi}</span>
              </div>
              {wisata.kontak && (
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-3 text-gray-400" />
                  <span>{wisata.kontak}</span>
                </div>
              )}
              {wisata.harga !== undefined && wisata.harga !== null && (
                <div className="flex items-center text-gray-600">
                  <DollarSign className="w-5 h-5 mr-3 text-gray-400" />
                  <span>Rp {wisata.harga.toLocaleString('id-ID')}</span>
                </div>
              )}
            </div>
            <div className="space-y-4">
              {(wisata.jamBuka || wisata.jamTutup) && (
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-3 text-gray-400" />
                  <span>
                    {wisata.jamBuka || "00:00"} - {wisata.jamTutup || "23:59"}
                  </span>
                </div>
              )}
              {wisata.rating && (
                <div className="flex items-center text-gray-600">
                  <Star className="w-5 h-5 mr-3 text-yellow-400 fill-current" />
                  <span>{wisata.rating}/5.0</span>
                </div>
              )}
              <div className="flex items-center">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  wisata.isAktif
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {wisata.isAktif ? "Aktif" : "Tidak Aktif"}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Dibuat pada: {new Date(wisata.createdAt).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
