"use client";

import { MapPin, Calendar, User, Eye, Ticket } from "lucide-react";
import { getImageUrl, handleImageError } from "@/lib/utils";

interface Transaction {
  id: string;
  userId: string;
  wisataId: string;
  jumlahTiket: number;
  totalHarga: number;
  tanggalKunjungan: string;
  namaLengkap: string;
  noTelp: string;
  status: "PENDING" | "PAID" | "CANCELLED";
  orderId?: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  wisata: {
    id: string;
    nama: string;
    harga: number;
    lokasi: string;
    foto?: string;
  };
}

interface TransactionTableViewProps {
  transactions: Transaction[];
  onView: (transaction: Transaction) => void;
}

const StatusBadge = ({ status }: { status: string }) => {
  const configs = {
    PENDING: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
    PAID: { color: "bg-green-100 text-green-800", label: "Lunas" },
    CANCELLED: { color: "bg-red-100 text-red-800", label: "Dibatalkan" }
  };
  
  const config = configs[status as keyof typeof configs] || configs.PENDING;
  
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${config.color}`}>
      {config.label}
    </span>
  );
};

export default function TransactionTableView({ transactions, onView }: TransactionTableViewProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-16">
        <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg font-medium">Tidak ada transaksi</p>
        <p className="text-gray-400 text-sm mt-2">Transaksi yang sesuai filter akan muncul di sini</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Wisata</th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Pengunjung</th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Tanggal</th>
            <th className="text-center py-4 px-4 text-sm font-semibold text-gray-700">Tiket</th>
            <th className="text-right py-4 px-4 text-sm font-semibold text-gray-700">Total</th>
            <th className="text-center py-4 px-4 text-sm font-semibold text-gray-700">Status</th>
            <th className="text-center py-4 px-4 text-sm font-semibold text-gray-700">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr 
              key={transaction.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-4 px-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                    {transaction.wisata.foto ? (
                      <img
                        src={getImageUrl(transaction.wisata.foto)}
                        alt={transaction.wisata.nama}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {transaction.wisata.nama}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center mt-0.5">
                      <MapPin className="w-3 h-3 mr-1" />
                      {transaction.wisata.lokasi}
                    </p>
                  </div>
                </div>
              </td>
              
              <td className="py-4 px-4">
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    {transaction.namaLengkap}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center mt-0.5">
                    <User className="w-3 h-3 mr-1" />
                    {transaction.user.email}
                  </p>
                </div>
              </td>

              <td className="py-4 px-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  {new Date(transaction.tanggalKunjungan).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </div>
              </td>

              <td className="py-4 px-4 text-center">
                <span className="inline-flex items-center px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                  <Ticket className="w-3 h-3 mr-1" />
                  {transaction.jumlahTiket}
                </span>
              </td>

              <td className="py-4 px-4 text-right">
                <p className="font-bold text-green-600 text-sm">
                  Rp {transaction.totalHarga.toLocaleString('id-ID')}
                </p>
              </td>

              <td className="py-4 px-4 text-center">
                <StatusBadge status={transaction.status} />
              </td>

              <td className="py-4 px-4 text-center">
                <button
                  onClick={() => onView(transaction)}
                  className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium"
                >
                  <Eye className="w-3.5 h-3.5 mr-1" />
                  Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}