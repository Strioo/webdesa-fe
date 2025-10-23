"use client";

import { X, User, MapPin, Calendar, CreditCard, Hash, Clock, Phone, Ticket } from "lucide-react";

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

interface DetailModalProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
}

const StatusBadge = ({ status }: { status: string }) => {
  const config = {
    PENDING: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
    PAID: { color: "bg-green-100 text-green-800", label: "Lunas" },
    CANCELLED: { color: "bg-red-100 text-red-800", label: "Dibatalkan" }
  };
  
  const { color, label } = config[status as keyof typeof config] || config.PENDING;
  
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${color}`}>
      {label}
    </span>
  );
};

export default function DetailModal({ transaction, isOpen, onClose }: DetailModalProps) {
  if (!isOpen || !transaction) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Detail Transaksi</h3>
              <p className="text-sm text-gray-500 mt-1">Order ID: {transaction.orderId}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <StatusBadge status={transaction.status} />
            <span className="text-sm text-gray-500">
              {new Date(transaction.createdAt).toLocaleString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>

          {/* Wisata Info */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
            <div className="flex items-start space-x-4">
              {transaction.wisata.foto && (
                <img
                  src={transaction.wisata.foto}
                  alt={transaction.wisata.nama}
                  className="w-24 h-24 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/images/placeholder.jpg';
                  }}
                />
              )}
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">{transaction.wisata.nama}</h4>
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{transaction.wisata.lokasi}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CreditCard className="w-4 h-4 mr-2" />
                  <span>Rp {transaction.wisata.harga.toLocaleString('id-ID')} / tiket</span>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h5 className="font-semibold text-gray-900 mb-3">Informasi Pengunjung</h5>
              
              <div className="flex items-start">
                <User className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Nama Lengkap</p>
                  <p className="font-medium text-gray-900">{transaction.namaLengkap}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">No. Telepon</p>
                  <p className="font-medium text-gray-900">{transaction.noTelp}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Calendar className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Tanggal Kunjungan</p>
                  <p className="font-medium text-gray-900">
                    {new Date(transaction.tanggalKunjungan).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Ticket className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Jumlah Tiket</p>
                  <p className="font-medium text-gray-900">{transaction.jumlahTiket} tiket</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-semibold text-gray-900 mb-3">Informasi Pembayaran</h5>
              
              {transaction.transactionId && (
                <div className="flex items-start">
                  <Hash className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Transaction ID</p>
                    <p className="font-medium text-gray-900 text-sm break-all">{transaction.transactionId}</p>
                  </div>
                </div>
              )}

              {transaction.paymentType && (
                <div className="flex items-start">
                  <CreditCard className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Metode Pembayaran</p>
                    <p className="font-medium text-gray-900 capitalize">
                      {transaction.paymentType.replace('_', ' ')}
                    </p>
                  </div>
                </div>
              )}

              {transaction.bank && transaction.vaNumber && (
                <div className="flex items-start">
                  <Hash className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">VA Number ({transaction.bank.toUpperCase()})</p>
                    <p className="font-medium text-gray-900">{transaction.vaNumber}</p>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    Rp {(transaction.wisata.harga * transaction.jumlahTiket).toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-xl text-blue-600">
                    Rp {transaction.totalHarga.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="pt-4 border-t border-gray-200">
            <h5 className="font-semibold text-gray-900 mb-3">Informasi Akun</h5>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-900">{transaction.user.email}</p>
              <p className="text-sm text-gray-500 mt-2">User ID</p>
              <p className="font-medium text-gray-900 text-sm">{transaction.user.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}