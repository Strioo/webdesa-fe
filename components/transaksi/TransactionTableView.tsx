"use client";

import { Eye, CreditCard, CheckCircle, Clock, XCircle, User, MapPin } from "lucide-react";

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

interface TransactionTableViewProps {
  transactions: Transaction[];
  onView: (transaction: Transaction) => void;
}

const StatusBadge = ({ status }: { status: string }) => {
  const configs = {
    PENDING: { color: "bg-yellow-100 text-yellow-800", icon: Clock, label: "Pending" },
    PAID: { color: "bg-green-100 text-green-800", icon: CheckCircle, label: "Lunas" },
    CANCELLED: { color: "bg-red-100 text-red-800", icon: XCircle, label: "Batal" }
  };
  
  const config = configs[status as keyof typeof configs] || configs.PENDING;
  const Icon = config.icon;
  
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </span>
  );
};

export default function TransactionTableView({ transactions, onView }: TransactionTableViewProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Tidak ada transaksi yang ditemukan</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">
              Order ID
            </th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">
              Wisata
            </th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">
              Pengunjung
            </th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">
              Tanggal Kunjungan
            </th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">
              Tiket
            </th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">
              Total
            </th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">
              Metode
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
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="py-4 px-4">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{transaction.orderId}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(transaction.createdAt).toLocaleDateString('id-ID')}
                  </p>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center space-x-3">
                  {transaction.wisata.foto ? (
                    <img
                      src={transaction.wisata.foto}
                      alt={transaction.wisata.nama}
                      className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        e.currentTarget.src = '/assets/images/placeholder.jpg';
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-blue-400" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{transaction.wisata.nama}</p>
                    <p className="text-xs text-gray-500">
                      Rp {transaction.wisata.harga.toLocaleString('id-ID')}/tiket
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{transaction.namaLengkap}</p>
                  <p className="text-xs text-gray-500">{transaction.noTelp}</p>
                </div>
              </td>
              <td className="py-4 px-4">
                <p className="text-sm text-gray-900">
                  {new Date(transaction.tanggalKunjungan).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
              </td>
              <td className="py-4 px-4">
                <span className="inline-flex items-center px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  {transaction.jumlahTiket} tiket
                </span>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center">
                  <CreditCard className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-sm font-semibold text-green-600">
                    Rp {transaction.totalHarga.toLocaleString('id-ID')}
                  </span>
                </div>
              </td>
              <td className="py-4 px-4">
                {transaction.paymentType ? (
                  <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                    {transaction.paymentType.replace('_', ' ').toUpperCase()}
                  </span>
                ) : (
                  <span className="text-gray-400 text-sm">-</span>
                )}
              </td>
              <td className="py-4 px-4">
                <StatusBadge status={transaction.status} />
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => onView(transaction)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Lihat Detail"
                  >
                    <Eye className="w-4 h-4" />
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