"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { transactionApi } from "@/lib/api";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  ShoppingBag, 
  Calendar, 
  CreditCard, 
  CheckCircle, 
  Clock, 
  XCircle,
  Eye,
  Loader2,
  Package
} from "lucide-react";
import { toast } from "sonner";

interface Transaction {
  id: string;
  orderId: string;
  productName: string;
  productType: 'WISATA' | 'UMKM';
  quantity: number;
  totalAmount: number;
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'EXPIRED';
  paymentMethod?: string;
  createdAt: string;
}

const StatusBadge = ({ status }: { status: string }) => {
  const config = {
    PENDING: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock, label: 'Menunggu' },
    SUCCESS: { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle, label: 'Berhasil' },
    FAILED: { color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle, label: 'Gagal' },
    EXPIRED: { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: Clock, label: 'Kedaluwarsa' }
  };

  const { color, icon: Icon, label } = config[status as keyof typeof config] || config.PENDING;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${color}`}>
      <Icon className="w-3.5 h-3.5 mr-1.5" />
      {label}
    </span>
  );
};

export default function TransactionsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'WISATA' | 'UMKM'>('ALL');

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
      const response = await transactionApi.getMyTransactions();
      
      if (response.success && response.data) {
        setTransactions(response.data as Transaction[]);
      }
    } catch (error: any) {
      console.error('Error fetching transactions:', error);
      toast.error(error.message || 'Gagal memuat riwayat transaksi');
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(t => 
    filter === 'ALL' || t.productType === filter
  );

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#5B903A] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat riwayat transaksi...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Riwayat Transaksi</h1>
            <p className="text-gray-600">Kelola dan lihat semua transaksi Anda</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Filter:</span>
              <div className="flex gap-2">
                {['ALL', 'WISATA', 'UMKM'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === f
                        ? 'bg-[#5B903A] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {f === 'ALL' ? 'Semua' : f === 'WISATA' ? 'Wisata' : 'UMKM'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Transactions List */}
          {filteredTransactions.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium mb-2">Belum ada transaksi</p>
              <p className="text-gray-400 text-sm">Transaksi Anda akan muncul di sini</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
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
                        <h3 className="font-semibold text-gray-900">{transaction.productName}</h3>
                        <p className="text-sm text-gray-500">Order ID: {transaction.orderId}</p>
                      </div>
                    </div>
                    <StatusBadge status={transaction.status} />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Tipe</p>
                      <p className="text-sm font-medium text-gray-900">
                        {transaction.productType === 'WISATA' ? 'Wisata' : 'UMKM'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Jumlah</p>
                      <p className="text-sm font-medium text-gray-900">{transaction.quantity} tiket</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Total</p>
                      <p className="text-sm font-medium text-[#5B903A]">
                        Rp {transaction.totalAmount.toLocaleString('id-ID')}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Tanggal</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(transaction.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  {transaction.paymentMethod && (
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center text-sm text-gray-600">
                        <CreditCard className="w-4 h-4 mr-2" />
                        <span>Metode: {transaction.paymentMethod}</span>
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