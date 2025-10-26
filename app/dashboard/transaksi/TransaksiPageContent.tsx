"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { transactionApi } from "@/lib/api";
import { getImageUrl, handleImageError } from "@/lib/utils";
import {
  ArrowLeft,
  User,
  MapPin,
  Calendar,
  CreditCard,
  Hash,
  Clock,
  Phone,
  Ticket,
  Loader2,
  CheckCircle,
  XCircle,
  Building
} from "lucide-react";

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
      color: "bg-yellow-100 text-yellow-800 border-2 border-yellow-300", 
      label: "Pending",
      icon: Clock
    },
    PAID: { 
      color: "bg-green-100 text-green-800 border-2 border-green-300", 
      label: "Lunas",
      icon: CheckCircle
    },
    CANCELLED: { 
      color: "bg-red-100 text-red-800 border-2 border-red-300", 
      label: "Dibatalkan",
      icon: XCircle
    }
  };
  
  const statusConfig = config[status as keyof typeof config] || config.PENDING;
  const Icon = statusConfig.icon;
  
  return (
    <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold ${statusConfig.color}`}>
      <Icon className="w-4 h-4 mr-1.5" />
      {statusConfig.label}
    </span>
  );
};

export default function DetailTransaksiPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchTransaction();
    }
  }, [id]);

  const fetchTransaction = async () => {
    try {
      setLoading(true);
      const response = await transactionApi.getById(id);
      
      if (response.success && response.data) {
        const data = response.data as Transaction;
        setTransaction(data);
      } else {
        throw new Error(response.message || "Gagal memuat data transaksi");
      }
    } catch (error: any) {
      console.error("Error fetching transaction:", error);
      toast.error(error.message || "Gagal memuat data transaksi");
      router.push("/dashboard/transaksi");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat detail transaksi...</p>
        </div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="text-center py-16">
        <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg font-medium">Transaksi tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/dashboard/transaksi")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Detail Transaksi</h1>
          <p className="text-gray-600 mt-1">Informasi lengkap pembelian tiket wisata</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Status & Wisata Info */}
        <div className="xl:col-span-1 space-y-6">
          {/* Status Card */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 text-lg">Status Transaksi</h3>
            <StatusBadge status={transaction.status} />
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-start text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Dibuat pada</p>
                  <p className="font-medium text-gray-700">
                    {formatDateTime(transaction.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Wisata Card */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 text-lg flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              Destinasi Wisata
            </h3>
            {transaction.wisata.foto && (
              <img
                src={getImageUrl(transaction.wisata.foto)}
                alt={transaction.wisata.nama}
                className="w-full h-32 object-cover rounded-lg mb-4 border border-gray-300"
                onError={handleImageError}
              />
            )}
            <h4 className="font-bold text-gray-900 mb-2">{transaction.wisata.nama}</h4>
            <p className="text-sm text-gray-600 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {transaction.wisata.lokasi}
            </p>
          </div>

          {/* Total Card */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3 text-lg flex items-center">
              <span className="mr-2 text-green-600 font-bold text-xl">Rp</span>
              Total Pembayaran
            </h3>
            <p className="text-3xl font-bold text-green-700">
              Rp {transaction.totalHarga.toLocaleString('id-ID')}
            </p>
            <p className="text-xs text-green-600 mt-2">
              {transaction.jumlahTiket} tiket × Rp {transaction.wisata.harga.toLocaleString('id-ID')}
            </p>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="xl:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Transaksi #{transaction.orderId || transaction.id.slice(0, 8)}
                </h2>
                <p className="text-gray-600">
                  Pembelian tiket wisata {transaction.wisata.nama}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 text-lg mb-5 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Informasi Pengunjung
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Nama Lengkap</p>
                <p className="font-semibold text-gray-900">{transaction.namaLengkap}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">No. Telepon</p>
                <p className="font-semibold text-gray-900">{transaction.noTelp}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Email User</p>
                <p className="font-semibold text-gray-900">{transaction.user.email}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Nama User</p>
                <p className="font-semibold text-gray-900">{transaction.user.name}</p>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 text-lg mb-5 flex items-center">
              <Ticket className="w-5 h-5 mr-2 text-purple-600" />
              Detail Pemesanan
            </h3>
            <div className="space-y-4">
              <div className="flex items-center text-gray-700 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <Calendar className="w-5 h-5 mr-3 text-purple-600 flex-shrink-0" />
                <div>
                  <p className="text-xs text-purple-700">Tanggal Kunjungan</p>
                  <p className="font-bold text-purple-900">{formatDate(transaction.tanggalKunjungan)}</p>
                </div>
              </div>
              
              <div className="flex items-center text-gray-700 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Ticket className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-xs text-blue-700">Jumlah Tiket</p>
                  <p className="font-bold text-blue-900">{transaction.jumlahTiket} Tiket</p>
                </div>
              </div>

              <div className="flex items-center text-gray-700 p-4 bg-green-50 rounded-lg border border-green-200">
                <span className="mr-3 text-green-600 flex-shrink-0 font-bold text-lg">Rp</span>
                <div>
                  <p className="text-xs text-green-700">Total Harga</p>
                  <p className="font-bold text-green-900">Rp {transaction.totalHarga.toLocaleString('id-ID')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          {(transaction.paymentType || transaction.vaNumber || transaction.bank) && (
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 text-lg mb-5 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-orange-600" />
                Informasi Pembayaran
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {transaction.orderId && (
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-xs text-orange-700 font-semibold mb-1">Order ID</p>
                    <p className="text-sm font-mono text-orange-900">{transaction.orderId}</p>
                  </div>
                )}
                {transaction.transactionId && (
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-xs text-orange-700 font-semibold mb-1">Transaction ID</p>
                    <p className="text-sm font-mono text-orange-900">{transaction.transactionId}</p>
                  </div>
                )}
                {transaction.paymentType && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs text-blue-700 font-semibold mb-1">Metode Pembayaran</p>
                    <p className="text-sm font-bold text-blue-900">{transaction.paymentType}</p>
                  </div>
                )}
                {transaction.bank && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs text-blue-700 font-semibold mb-1">Bank</p>
                    <p className="text-sm font-bold text-blue-900">{transaction.bank}</p>
                  </div>
                )}
                {transaction.vaNumber && (
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 md:col-span-2">
                    <p className="text-xs text-purple-700 font-semibold mb-1">Virtual Account Number</p>
                    <p className="text-lg font-mono font-bold text-purple-900">{transaction.vaNumber}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}