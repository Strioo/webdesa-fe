"use client";

import { Eye, Edit, Trash2, MapPin, DollarSign, Star } from "lucide-react";

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

interface WisataTableViewProps {
  wisata: Wisata[];
  onView: (wisata: Wisata) => void;
  onEdit: (wisata: Wisata) => void;
  onDelete: (id: string) => void;
}

export default function WisataTableView({
  wisata,
  onView,
  onEdit,
  onDelete
}: WisataTableViewProps) {
  if (wisata.length === 0) {
    return (
      <div className="text-center py-12">
        <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Tidak ada wisata yang ditemukan</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">
              Foto
            </th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">
              Nama Wisata
            </th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">
              Kategori
            </th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">
              Lokasi
            </th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">
              Harga
            </th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">
              Rating
            </th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">
              Status
            </th>
            <th className="text-center py-4 px-4 font-semibold text-gray-700 text-sm">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {wisata.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="py-4 px-4">
                {item.foto ? (
                  <img
                    src={item.foto}
                    alt={item.nama}
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-wisata.jpg';
                    }}
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-blue-400" />
                  </div>
                )}
              </td>
              <td className="py-4 px-4">
                <div>
                  <p className="font-semibold text-gray-900">{item.nama}</p>
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {item.deskripsi}
                  </p>
                </div>
              </td>
              <td className="py-4 px-4">
                {item.kategori ? (
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {item.kategori}
                  </span>
                ) : (
                  <span className="text-gray-400 text-sm">-</span>
                )}
              </td>
              <td className="py-4 px-4">
                <div className="flex items-start max-w-xs">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 line-clamp-2">
                    {item.lokasi}
                  </span>
                </div>
              </td>
              <td className="py-4 px-4">
                {item.harga !== undefined && item.harga !== null ? (
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-600">
                      {item.harga.toLocaleString('id-ID')}
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">Gratis</span>
                )}
              </td>
              <td className="py-4 px-4">
                {item.rating ? (
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">-</span>
                )}
              </td>
              <td className="py-4 px-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  item.isAktif
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {item.isAktif ? "Aktif" : "Tidak Aktif"}
                </span>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center justify-center space-x-2">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
