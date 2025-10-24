"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { laporanApi } from "@/lib/api";
import {
  Search,
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  MapPin,
  Calendar,
  User,
  FileText,
  AlertCircleIcon,
  Loader2,
  UserX
} from "lucide-react";

interface Laporan {
  id: string;
  judul: string;
  deskripsi: string;
  kategori: string;
  status: "PENDING" | "PROSES" | "SELESAI" | "DITOLAK";
  lokasi?: string;
  foto?: string;
  tanggapan?: string;
  createdAt: string;
  updatedAt?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  } | null; // ✅ Make user optional and nullable
}

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "PENDING":
        return { color: "bg-yellow-100 text-yellow-800 border border-yellow-200", icon: Clock, label: "Menunggu" };
      case "PROSES":
        return { color: "bg-blue-100 text-blue-800 border border-blue-200", icon: AlertTriangle, label: "Diproses" };
      case "SELESAI":
        return { color: "bg-green-100 text-green-800 border border-green-200", icon: CheckCircle, label: "Selesai" };
      case "DITOLAK":
        return { color: "bg-red-100 text-red-800 border border-red-200", icon: XCircle, label: "Ditolak" };
      default:
        return { color: "bg-gray-100 text-gray-800 border border-gray-200", icon: Clock, label: status };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
      <Icon className="w-3.5 h-3.5 mr-1.5" />
      {config.label}
    </span>
  );
};

const KategoriBadge = ({ kategori }: { kategori: string }) => {
  const getKategoriConfig = (kategori: string) => {
    switch (kategori) {
      case "INFRASTRUKTUR":
        return { color: "bg-purple-100 text-purple-800 border border-purple-200", label: "Infrastruktur" };
      case "KESEHATAN":
        return { color: "bg-red-100 text-red-800 border border-red-200", label: "Kesehatan" };
      case "PENDIDIKAN":
        return { color: "bg-blue-100 text-blue-800 border border-blue-200", label: "Pendidikan" };
      case "LINGKUNGAN":
        return { color: "bg-green-100 text-green-800 border border-green-200", label: "Lingkungan" };
      case "KEAMANAN":
        return { color: "bg-orange-100 text-orange-800 border border-orange-200", label: "Keamanan" };
      default:
        return { color: "bg-gray-100 text-gray-800 border border-gray-200", label: kategori };
    }
  };

  const config = getKategoriConfig(kategori);

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
};

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
          <AlertCircleIcon className="w-6 h-6 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
          Hapus Laporan?
        </h3>
        <p className="text-sm text-gray-600 text-center mb-6">
          Tindakan ini tidak dapat dibatalkan. Laporan akan dihapus secara permanen dari sistem.
        </p>
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium disabled:opacity-50"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2.5 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors font-medium disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Menghapus...
              </>
            ) : (
              "Hapus"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function LaporanPage() {
  const router = useRouter();
  const [laporan, setLaporan] = useState<Laporan[]>([]);
  const [filteredLaporan, setFilteredLaporan] = useState<Laporan[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [kategoriFilter, setKategoriFilter] = useState("ALL");
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string | null }>({ isOpen: false, id: null });
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchLaporan();
  }, []);

  useEffect(() => {
    filterLaporan();
  }, [laporan, searchTerm, statusFilter, kategoriFilter]);

  const fetchLaporan = async () => {
    try {
      setLoading(true);
      console.log('Fetching laporan...');
      
      const response = await laporanApi.getAll();
      console.log('Laporan response:', response);

      if (response.success && response.data) {
        setLaporan(response.data as Laporan[]);
      } else {
        throw new Error(response.message || 'Gagal memuat data laporan');
      }
    } catch (error: any) {
      console.error("Error fetching laporan:", error);
      toast.error(error.message || 'Gagal memuat data laporan');
      setLaporan([]);
    } finally {
      setLoading(false);
    }
  };

  const filterLaporan = () => {
    let filtered = laporan;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) || // ✅ Safe navigation
        (item.lokasi && item.lokasi.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (statusFilter !== "ALL") {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    if (kategoriFilter !== "ALL") {
      filtered = filtered.filter(item => item.kategori === kategoriFilter);
    }

    setFilteredLaporan(filtered);
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;

    try {
      setDeleteLoading(true);
      console.log('Deleting laporan:', deleteModal.id);
      
      const response = await laporanApi.delete(deleteModal.id);
      console.log('Delete response:', response);

      if (response.success) {
        setLaporan(prev => prev.filter(item => item.id !== deleteModal.id));
        toast.success('Laporan berhasil dihapus');
        setDeleteModal({ isOpen: false, id: null });
      } else {
        throw new Error(response.message || 'Gagal menghapus laporan');
      }
    } catch (error: any) {
      console.error("Error deleting laporan:", error);
      toast.error(error.message || 'Gagal menghapus laporan');
    } finally {
      setDeleteLoading(false);
    }
  };

  const openDetailModal = (laporan: Laporan) => {
    router.push(`/dashboard/laporan/${laporan.id}`);
  };

  const openDeleteModal = (id: string) => {
    setDeleteModal({ isOpen: true, id });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat data laporan...</p>
        </div>
      </div>
    );
  }

  const stats = {
    total: laporan.length,
    pending: laporan.filter(l => l.status === 'PENDING').length,
    proses: laporan.filter(l => l.status === 'PROSES').length,
    selesai: laporan.filter(l => l.status === 'SELESAI').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Laporan</h1>
          <p className="text-gray-600 mt-2">Kelola semua laporan dari warga desa</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border-2 border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Laporan</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border-2 border-yellow-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-800">Menunggu</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border-2 border-blue-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800">Diproses</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{stats.proses}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border-2 border-green-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800">Selesai</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{stats.selesai}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Table */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari laporan, pelapor, atau lokasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-medium"
            >
              <option value="ALL">Semua Status</option>
              <option value="PENDING">Menunggu</option>
              <option value="PROSES">Diproses</option>
              <option value="SELESAI">Selesai</option>
              <option value="DITOLAK">Ditolak</option>
            </select>
            <select
              value={kategoriFilter}
              onChange={(e) => setKategoriFilter(e.target.value)}
              className="px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-medium"
            >
              <option value="ALL">Semua Kategori</option>
              <option value="INFRASTRUKTUR">Infrastruktur</option>
              <option value="KESEHATAN">Kesehatan</option>
              <option value="PENDIDIKAN">Pendidikan</option>
              <option value="LINGKUNGAN">Lingkungan</option>
              <option value="KEAMANAN">Keamanan</option>
              <option value="LAINNYA">Lainnya</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Laporan</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Pelapor</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Kategori</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Tanggal</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredLaporan.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-semibold text-gray-900">{item.judul}</p>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {item.deskripsi}
                      </p>
                      {item.lokasi && (
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <MapPin className="w-3.5 h-3.5 mr-1" />
                          {item.lokasi}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {/* ✅ Handle guest user in table */}
                    {item.user ? (
                      <div>
                        <p className="font-medium text-gray-900">{item.user.name}</p>
                        <p className="text-sm text-gray-500">{item.user.email}</p>
                      </div>
                    ) : (
                      <div className="flex items-center text-gray-500">
                        <UserX className="w-4 h-4 mr-2" />
                        <span className="text-sm italic">Guest User</span>
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <KategoriBadge kategori={item.kategori} />
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openDetailModal(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Lihat Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(item.id)}
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

        {filteredLaporan.length === 0 && (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">Tidak ada laporan yang ditemukan</p>
            <p className="text-gray-400 text-sm mt-1">Coba ubah filter atau kata kunci pencarian</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={handleDelete}
        loading={deleteLoading}
      />
    </div>
  );
}