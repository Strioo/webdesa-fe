"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { transactionApi } from "@/lib/api";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  ShoppingBag, 
  CreditCard, 
  CheckCircle, 
  Clock, 
  XCircle,
  Loader2,
  Package,
  MapPin,
  Ticket
} from "lucide-react";
import { toast } from "sonner";

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

const StatusBadge = ({ status }: { status: string }) => {
  const config = {
    PENDING: { 
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
      icon: Clock, 
      label: 'Menunggu Pembayaran' 
    },
    PAID: { 
      color: 'bg-green-100 text-green-800 border-green-200', 
      icon: CheckCircle, 
      label: 'Lunas' 
    },
    CANCELLED: { 
      color: 'bg-red-100 text-red-800 border-red-200', 
      icon: XCircle, 
      label: 'Dibatalkan' 
    }
  };

  const statusConfig = config[status as keyof typeof config] || config.PENDING;
  const Icon = statusConfig.icon;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
      <Icon className="w-3.5 h-3.5 mr-1.5" />
      {statusConfig.label}
    </span>
  );
};

export default function TransactionsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?from=/transactions');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await transactionApi.getMyTransactions();
      
      console.log('Transactions response:', response);
      
      if (response.success && response.data) {
        const data = Array.isArray(response.data) ? response.data : [];
        setTransactions(data);
      } else {
        setError(response.message || 'Gagal memuat riwayat transaksi');
      }
    } catch (error: any) {
      console.error('Error fetching transactions:', error);
      setError(error.message || 'Gagal memuat riwayat transaksi');
      toast.error(error.message || 'Gagal memuat riwayat transaksi');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#5B903A] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Riwayat Transaksi</h1>
            <p className="text-gray-600">Kelola dan lihat semua transaksi pembelian tiket wisata Anda</p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <Loader2 className="w-12 h-12 text-[#5B903A] animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Memuat riwayat transaksi...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
              <div className="flex items-start">
                <XCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-800 mb-1">Terjadi Kesalahan</h3>
                  <p className="text-red-600 text-sm mb-3">{error}</p>
                  <button
                    onClick={fetchTransactions}
                    className="text-sm text-red-700 hover:text-red-800 underline font-medium"
                  >
                    Coba lagi
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && transactions.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium mb-2">Belum ada transaksi</p>
              <p className="text-gray-400 text-sm mb-6">Mulai jelajahi wisata desa dan pesan tiket Anda</p>
              <button
                onClick={() => router.push('/wisata')}
                className="px-6 py-3 bg-[#5B903A] text-white rounded-lg hover:bg-[#4a7a2f] transition-colors font-medium"
              >
                Jelajahi Wisata
              </button>
            </div>
          )}

          {/* Transactions List */}
          {!loading && !error && transactions.length > 0 && (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-[#F0F7ED] rounded-lg">
                        <ShoppingBag className="w-6 h-6 text-[#5B903A]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{transaction.wisata.nama}</h3>
                        <p className="text-sm text-gray-500 flex items-center mt-1">
                          <MapPin className="w-3.5 h-3.5 mr-1" />
                          {transaction.wisata.lokasi}
                        </p>
                        {transaction.orderId && (
                          <p className="text-xs text-gray-400 mt-1">
                            Order ID: {transaction.orderId}
                          </p>
                        )}
                      </div>
                    </div>
                    <StatusBadge status={transaction.status} />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Nama Pengunjung</p>
                      <p className="text-sm font-medium text-gray-900">{transaction.namaLengkap}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Jumlah Tiket</p>
                      <p className="text-sm font-medium text-gray-900 flex items-center">
                        <Ticket className="w-4 h-4 mr-1 text-blue-600" />
                        {transaction.jumlahTiket} tiket
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Total Pembayaran</p>
                      <p className="text-sm font-medium text-[#5B903A]">
                        Rp {transaction.totalHarga.toLocaleString('id-ID')}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Tanggal Kunjungan</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(transaction.tanggalKunjungan).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  {transaction.paymentType && (
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-600">
                          <CreditCard className="w-4 h-4 mr-2" />
                          <span>Metode: <span className="font-medium">{transaction.paymentType}</span></span>
                          {transaction.bank && (
                            <span className="ml-2">({transaction.bank})</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">
                          Dibuat: {new Date(transaction.createdAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}