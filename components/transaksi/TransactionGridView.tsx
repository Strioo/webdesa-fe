"use client";

import { MapPin, Calendar, Ticket, Eye } from "lucide-react";
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

interface TransactionGridViewProps {
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

export default function TransactionGridView({ transactions, onView }: TransactionGridViewProps) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all hover:border-blue-300 group"
        >
          <div className="relative h-48 bg-gray-200">
            {transaction.wisata.foto ? (
              <img
                src={getImageUrl(transaction.wisata.foto)}
                alt={transaction.wisata.nama}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <MapPin className="w-16 h-16 text-gray-400" />
              </div>
            )}
            <div className="absolute top-3 right-3">
              <StatusBadge status={transaction.status} />
            </div>
          </div>

          <div className="p-5">
            <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
              {transaction.wisata.nama}
            </h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="line-clamp-1">{transaction.wisata.lokasi}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>
                  {new Date(transaction.tanggalKunjungan).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <Ticket className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{transaction.jumlahTiket} Tiket</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div>
                <p className="text-xs text-gray-500">Total</p>
                <p className="text-lg font-bold text-green-600">
                  Rp {transaction.totalHarga.toLocaleString('id-ID')}
                </p>
              </div>
              
              <button
                onClick={() => onView(transaction)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center"
              >
                <Eye className="w-4 h-4 mr-1.5" />
                Detail
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}