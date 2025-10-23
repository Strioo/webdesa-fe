"use client";

import { Eye, Calendar, Ticket, CreditCard, User, MapPin, CheckCircle, Clock, XCircle } from "lucide-react";

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
  buktiPembayaran?: string;
  orderId?: string;
  transactionId?: string;
  paymentType?: string;
  vaNumber?: string;
  bank?: string;
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

export default function TransactionGridView({ transactions, onView }: TransactionGridViewProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Tidak ada transaksi yang ditemukan</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
        >
          {/* Header with Wisata Image */}
          {transaction.wisata.foto ? (
            <div className="h-32 bg-gray-200 overflow-hidden relative">
              <img
                src={transaction.wisata.foto}
                alt={transaction.wisata.nama}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = '/assets/images/placeholder.jpg';
                }}
              />
              <div className="absolute top-3 right-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium shadow-lg ${
                  transaction.status === "PAID"
                    ? "bg-green-500 text-white"
                    : transaction.status === "PENDING"
                    ? "bg-yellow-500 text-white"
                    : "bg-red-500 text-white"
                }`}>
                  {transaction.status === "PAID" ? "Lunas" : transaction.status === "PENDING" ? "Pending" : "Batal"}
                </span>
              </div>
            </div>
          ) : (
            <div className="h-32 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center relative">
              <MapPin className="w-16 h-16 text-blue-300" />
              <div className="absolute top-3 right-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium shadow-lg ${
                  transaction.status === "PAID"
                    ? "bg-green-500 text-white"
                    : transaction.status === "PENDING"
                    ? "bg-yellow-500 text-white"
                    : "bg-red-500 text-white"
                }`}>
                  {transaction.status === "PAID" ? "Lunas" : transaction.status === "PENDING" ? "Pending" : "Batal"}
                </span>
              </div>
            </div>
          )}
          
          <div className="p-5">
            {/* Wisata Name */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
              {transaction.wisata.nama}
            </h3>
            
            {/* Order ID */}
            <p className="text-xs text-gray-500 mb-3 truncate">
              Order: {transaction.orderId}
            </p>
            
            {/* Info Grid */}
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" />
                <span className="truncate">{transaction.namaLengkap}</span>
              </div>
              
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" />
                <span>
                  {new Date(transaction.tanggalKunjungan).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="flex items-center">
                <Ticket className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" />
                <span>{transaction.jumlahTiket} tiket</span>
              </div>

              <div className="flex items-center">
                <CreditCard className="w-4 h-4 mr-2 flex-shrink-0 text-green-600" />
                <span className="font-semibold text-green-600">
                  Rp {transaction.totalHarga.toLocaleString('id-ID')}
                </span>
              </div>

              {transaction.paymentType && (
                <div className="flex items-center">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    {transaction.paymentType.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            
            {/* Action Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                onClick={() => onView(transaction)}
                className="flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                <Eye className="w-4 h-4 mr-1" />
                Lihat Detail
              </button>
              <span className="text-xs text-gray-400">
                {new Date(transaction.createdAt).toLocaleDateString('id-ID')}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}