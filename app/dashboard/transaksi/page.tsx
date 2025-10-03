"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Eye,
  CreditCard,
  Calendar,
  User,
  MapPin,
  X,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  DollarSign,
  Ticket
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
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "PENDING":
        return { color: "bg-yellow-100 text-yellow-800", icon: Clock };
      case "PAID":
        return { color: "bg-green-100 text-green-800", icon: CheckCircle };
      case "CANCELLED":
        return { color: "bg-red-100 text-red-800", icon: XCircle };
      default:
        return { color: "bg-gray-100 text-gray-800", icon: Clock };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      <Icon className="w-3 h-3 mr-1" />
      {status}
    </span>
  );
};

const PaymentTypeBadge = ({ type }: { type?: string }) => {
  if (!type) return null;

  const getPaymentConfig = (type: string) => {
    switch (type) {
      case "bank_transfer":
        return { color: "bg-blue-100 text-blue-800", label: "Bank Transfer" };
      case "gopay":
        return { color: "bg-green-100 text-green-800", label: "GoPay" };
      case "qris":
        return { color: "bg-purple-100 text-purple-800", label: "QRIS" };
      case "credit_card":
        return { color: "bg-orange-100 text-orange-800", label: "Credit Card" };
      default:
        return { color: "bg-gray-100 text-gray-800", label: type };
    }
  };

  const config = getPaymentConfig(type);

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
};

const DetailModal = ({
  transaction,
  isOpen,
  onClose
}: {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen || !transaction) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Detail Transaksi</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Order #{transaction.orderId || transaction.id}</h4>
              <StatusBadge status={transaction.status} />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Transaction ID</p>
                <p className="font-medium">{transaction.transactionId || "-"}</p>
              </div>
              <div>
                <p className="text-gray-500">Tanggal Transaksi</p>
                <p className="font-medium">{new Date(transaction.createdAt).toLocaleString('id-ID')}</p>
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-medium text-gray-900 mb-4">Informasi Wisata</h5>
            <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
              {transaction.wisata.foto && (
                <img
                  src={transaction.wisata.foto}
                  alt={transaction.wisata.nama}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <h6 className="font-semibold text-gray-900">{transaction.wisata.nama}</h6>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{transaction.wisata.lokasi}</span>
                </div>
                <div className="flex items-center text-gray-600 mt-1">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span className="text-sm">Rp {transaction.wisata.harga.toLocaleString('id-ID')} / tiket</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-medium text-gray-900 mb-4">Informasi Pengunjung</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Nama Lengkap</p>
                <p className="font-medium">{transaction.namaLengkap}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">No. Telepon</p>
                <p className="font-medium">{transaction.noTelp}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{transaction.user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tanggal Kunjungan</p>
                <p className="font-medium">{new Date(transaction.tanggalKunjungan).toLocaleDateString('id-ID')}</p>
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-medium text-gray-900 mb-4">Detail Pembayaran</h5>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Jumlah Tiket</p>
                  <p className="font-semibold text-lg">{transaction.jumlahTiket} tiket</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Pembayaran</p>
                  <p className="font-semibold text-lg text-green-600">
                    Rp {transaction.totalHarga.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
              
              {transaction.paymentType && (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Metode Pembayaran</p>
                    <PaymentTypeBadge type={transaction.paymentType} />
                  </div>
                  {transaction.vaNumber && (
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Virtual Account</p>
                      <p className="font-mono text-sm font-medium">{transaction.vaNumber}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {transaction.buktiPembayaran && (
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Bukti Pembayaran</h5>
              <img
                src={transaction.buktiPembayaran}
                alt="Bukti pembayaran"
                className="w-full max-w-md h-auto rounded-lg border border-gray-200"
              />
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-end space-x-3">
            {transaction.status === "PAID" && (
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Download Tiket
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TransaksiPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [paymentFilter, setPaymentFilter] = useState("ALL");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [transactions, searchTerm, statusFilter, paymentFilter]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const mockData: Transaction[] = [
        {
          id: "1",
          userId: "user1",
          wisataId: "wisata1",
          jumlahTiket: 2,
          totalHarga: 20000,
          tanggalKunjungan: "2025-10-15T00:00:00.000Z",
          namaLengkap: "Rina Setiawan",
          noTelp: "081234567896",
          status: "PAID",
          orderId: "ORDER-1727876543210-user1",
          transactionId: "b3ff5a2f-8f5b-4e3c-9d1a-7c8b9e4f5a6b",
          paymentType: "bank_transfer",
          vaNumber: "8277087781234567",
          bank: "bca",
          buktiPembayaran: "/uploads/bukti-bayar-1.jpg",
          createdAt: "2025-10-02T10:30:00.000Z",
          user: {
            id: "user1",
            name: "Rina Setiawan",
            email: "tourist1@gmail.com"
          },
          wisata: {
            id: "wisata1",
            nama: "Air Terjun Pelangi",
            harga: 10000,
            lokasi: "Bukit Hijau, 2 km dari pusat desa",
            foto: "/uploads/air-terjun.jpg"
          }
        },
        {
          id: "2",
          userId: "user2",
          wisataId: "wisata2",
          jumlahTiket: 4,
          totalHarga: 100000,
          tanggalKunjungan: "2025-10-20T00:00:00.000Z",
          namaLengkap: "David Chen",
          noTelp: "081234567897",
          status: "PAID",
          orderId: "ORDER-1727876543211-user2",
          paymentType: "gopay",
          createdAt: "2025-10-01T15:45:00.000Z",
          user: {
            id: "user2",
            name: "David Chen",
            email: "visitor2@gmail.com"
          },
          wisata: {
            id: "wisata2",
            nama: "Kebun Strawberry Suka Maju",
            harga: 25000,
            lokasi: "Blok Pertanian, 1.5 km dari kantor desa",
            foto: "/uploads/kebun-strawberry.jpg"
          }
        },
        {
          id: "3",
          userId: "user3",
          wisataId: "wisata3",
          jumlahTiket: 3,
          totalHarga: 15000,
          tanggalKunjungan: "2025-10-18T00:00:00.000Z",
          namaLengkap: "Budi Santoso",
          noTelp: "081234567891",
          status: "PENDING",
          orderId: "ORDER-1727876543212-user3",
          createdAt: "2025-10-01T12:20:00.000Z",
          user: {
            id: "user3",
            name: "Budi Santoso",
            email: "budi@gmail.com"
          },
          wisata: {
            id: "wisata3",
            nama: "Rumah Adat Betawi",
            harga: 5000,
            lokasi: "Kampung Budaya RT 05"
          }
        },
        {
          id: "4",
          userId: "user1",
          wisataId: "wisata4",
          jumlahTiket: 2,
          totalHarga: 30000,
          tanggalKunjungan: "2025-10-25T00:00:00.000Z",
          namaLengkap: "Rina Setiawan",
          noTelp: "081234567896",
          status: "CANCELLED",
          orderId: "ORDER-1727876543213-user1",
          createdAt: "2025-09-30T09:15:00.000Z",
          user: {
            id: "user1",
            name: "Rina Setiawan",
            email: "tourist1@gmail.com"
          },
          wisata: {
            id: "wisata4",
            nama: "Hiking Trail Bukit Sunrise",
            harga: 15000,
            lokasi: "Bukit Sunrise, 3 km dari desa"
          }
        }
      ];
      setTransactions(mockData);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterTransactions = () => {
    let filtered = transactions;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.wisata.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.orderId?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "ALL") {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    if (paymentFilter !== "ALL") {
      filtered = filtered.filter(item => item.paymentType === paymentFilter);
    }

    setFilteredTransactions(filtered);
  };

  const openDetailModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailModalOpen(true);
  };

  const getTotalRevenue = () => {
    return transactions
      .filter(t => t.status === "PAID")
      .reduce((total, t) => total + t.totalHarga, 0);
  };

  const getTransactionStats = () => {
    const total = transactions.length;
    const paid = transactions.filter(t => t.status === "PAID").length;
    const pending = transactions.filter(t => t.status === "PENDING").length;
    const cancelled = transactions.filter(t => t.status === "CANCELLED").length;

    return { total, paid, pending, cancelled };
  };

  const stats = getTransactionStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Transaksi</h1>
          <p className="text-gray-600 mt-2">Kelola transaksi pembelian tiket wisata</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Transaksi</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Berhasil</p>
              <p className="text-2xl font-bold text-green-600">{stats.paid}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-lg font-bold text-purple-600">
                Rp {getTotalRevenue().toLocaleString('id-ID')}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari transaksi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ALL">Semua Status</option>
              <option value="PENDING">Pending</option>
              <option value="PAID">Paid</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ALL">Semua Payment</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="gopay">GoPay</option>
              <option value="qris">QRIS</option>
              <option value="credit_card">Credit Card</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Order ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Wisata</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Tiket</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Total</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Tanggal</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-mono text-sm font-medium text-gray-900">
                        {item.orderId || item.id}
                      </p>
                      {item.paymentType && (
                        <PaymentTypeBadge type={item.paymentType} />
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      {item.wisata.foto && (
                        <img
                          src={item.wisata.foto}
                          alt={item.wisata.nama}
                          className="w-10 h-10 object-cover rounded-lg"
                        />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{item.wisata.nama}</p>
                        <p className="text-sm text-gray-500 truncate max-w-xs">
                          {item.wisata.lokasi}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{item.namaLengkap}</p>
                      <p className="text-sm text-gray-500">{item.user.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center text-gray-600">
                      <Ticket className="w-4 h-4 mr-1" />
                      <span className="font-medium">{item.jumlahTiket}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-medium text-gray-900">
                      Rp {item.totalHarga.toLocaleString('id-ID')}
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    <div>
                      <p>{new Date(item.createdAt).toLocaleDateString('id-ID')}</p>
                      <p className="text-xs text-gray-400">
                        Kunjungan: {new Date(item.tanggalKunjungan).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => openDetailModal(item)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Lihat Detail"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Tidak ada transaksi yang ditemukan</p>
          </div>
        )}
      </div>

      <DetailModal
        transaction={selectedTransaction}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />
    </div>
  );
}