"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  MapPin,
  Calendar,
  User,
  FileText
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
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "PENDING":
        return { color: "bg-yellow-100 text-yellow-800", icon: Clock };
      case "PROSES":
        return { color: "bg-blue-100 text-blue-800", icon: AlertTriangle };
      case "SELESAI":
        return { color: "bg-green-100 text-green-800", icon: CheckCircle };
      case "DITOLAK":
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

const KategoriBadge = ({ kategori }: { kategori: string }) => {
  const getKategoriColor = (kategori: string) => {
    switch (kategori) {
      case "INFRASTRUKTUR":
        return "bg-purple-100 text-purple-800";
      case "KESEHATAN":
        return "bg-red-100 text-red-800";
      case "PENDIDIKAN":
        return "bg-blue-100 text-blue-800";
      case "LINGKUNGAN":
        return "bg-green-100 text-green-800";
      case "KEAMANAN":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getKategoriColor(kategori)}`}>
      {kategori}
    </span>
  );
};

const DetailModal = ({ 
  laporan, 
  isOpen, 
  onClose, 
  onStatusUpdate 
}: { 
  laporan: Laporan | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (id: string, status: string, tanggapan: string) => void;
}) => {
  const [newStatus, setNewStatus] = useState("");
  const [tanggapan, setTanggapan] = useState("");

  useEffect(() => {
    if (laporan) {
      setNewStatus(laporan.status);
      setTanggapan(laporan.tanggapan || "");
    }
  }, [laporan]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (laporan) {
      onStatusUpdate(laporan.id, newStatus, tanggapan);
      onClose();
    }
  };

  if (!isOpen || !laporan) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Detail Laporan</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">{laporan.judul}</h4>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {laporan.user.name}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(laporan.createdAt).toLocaleDateString('id-ID')}
              </div>
              {laporan.lokasi && (
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {laporan.lokasi}
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <StatusBadge status={laporan.status} />
              <KategoriBadge kategori={laporan.kategori} />
            </div>
          </div>

          <div>
            <h5 className="font-medium text-gray-900 mb-2">Deskripsi</h5>
            <p className="text-gray-700 leading-relaxed">{laporan.deskripsi}</p>
          </div>

          {laporan.foto && (
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Foto</h5>
              <img
                src={laporan.foto}
                alt="Foto laporan"
                className="w-full h-48 object-cover rounded-lg border border-gray-200"
              />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="PENDING">Pending</option>
                <option value="PROSES">Proses</option>
                <option value="SELESAI">Selesai</option>
                <option value="DITOLAK">Ditolak</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggapan Admin
              </label>
              <textarea
                value={tanggapan}
                onChange={(e) => setTanggapan(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Berikan tanggapan untuk laporan ini..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
              >
                Update Status
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default function LaporanPage() {
  const [laporan, setLaporan] = useState<Laporan[]>([]);
  const [filteredLaporan, setFilteredLaporan] = useState<Laporan[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [kategoriFilter, setKategoriFilter] = useState("ALL");
  const [selectedLaporan, setSelectedLaporan] = useState<Laporan | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLaporan();
  }, []);

  useEffect(() => {
    filterLaporan();
  }, [laporan, searchTerm, statusFilter, kategoriFilter]);

  const fetchLaporan = async () => {
    try {
      setLoading(true);
      const mockData: Laporan[] = [
        {
          id: "1",
          judul: "Jalan Rusak di RT 01",
          deskripsi: "Jalan di depan rumah pak RT mengalami kerusakan parah akibat hujan deras minggu lalu. Banyak lubang yang membahayakan pengendara motor.",
          kategori: "INFRASTRUKTUR",
          status: "PENDING",
          lokasi: "Jl. Merdeka RT 01/RW 02",
          foto: "/uploads/laporan1.jpg",
          createdAt: "2025-10-01T10:30:00.000Z",
          user: {
            id: "user1",
            name: "Budi Santoso",
            email: "budi@gmail.com"
          }
        },
        {
          id: "2",
          judul: "Lampu Jalan Mati",
          deskripsi: "Lampu jalan di sepanjang Jl. Pemuda sudah mati sejak 3 hari yang lalu. Kondisi ini membuat jalan gelap dan rawan kejahatan.",
          kategori: "INFRASTRUKTUR",
          status: "PROSES",
          lokasi: "Jl. Pemuda",
          tanggapan: "Laporan telah diterima dan sedang diproses oleh dinas terkait.",
          createdAt: "2025-09-30T14:15:00.000Z",
          user: {
            id: "user2",
            name: "Siti Nurhaliza",
            email: "siti@gmail.com"
          }
        },
        {
          id: "3",
          judul: "Sampah Menumpuk di TPS",
          deskripsi: "Tempat pembuangan sampah sementara di RT 03 sudah penuh dan tidak diangkut selama seminggu.",
          kategori: "LINGKUNGAN",
          status: "SELESAI",
          lokasi: "TPS RT 03/RW 01",
          tanggapan: "Sampah telah diangkut dan jadwal pengangkutan akan diperbaiki.",
          createdAt: "2025-09-28T08:45:00.000Z",
          user: {
            id: "user3",
            name: "Ahmad Wijaya",
            email: "ahmad@gmail.com"
          }
        }
      ];
      setLaporan(mockData);
    } catch (error) {
      console.error("Error fetching laporan:", error);
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
        item.user.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleStatusUpdate = async (id: string, status: string, tanggapan: string) => {
    try {
      setLaporan(prev =>
        prev.map(item =>
          item.id === id
            ? { ...item, status: status as any, tanggapan }
            : item
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus laporan ini?")) {
      try {
        setLaporan(prev => prev.filter(item => item.id !== id));
      } catch (error) {
        console.error("Error deleting laporan:", error);
      }
    }
  };

  const openDetailModal = (laporan: Laporan) => {
    setSelectedLaporan(laporan);
    setIsDetailModalOpen(true);
  };

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
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Laporan</h1>
          <p className="text-gray-600 mt-2">Kelola semua laporan dari warga desa</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari laporan..."
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
              <option value="PROSES">Proses</option>
              <option value="SELESAI">Selesai</option>
              <option value="DITOLAK">Ditolak</option>
            </select>
            <select
              value={kategoriFilter}
              onChange={(e) => setKategoriFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Laporan</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Pelapor</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Kategori</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Tanggal</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredLaporan.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{item.judul}</p>
                      <p className="text-sm text-gray-500 mt-1 truncate max-w-xs">
                        {item.deskripsi}
                      </p>
                      {item.lokasi && (
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <MapPin className="w-3 h-3 mr-1" />
                          {item.lokasi}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{item.user.name}</p>
                      <p className="text-sm text-gray-500">{item.user.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <KategoriBadge kategori={item.kategori} />
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString('id-ID')}
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
                        onClick={() => handleDelete(item.id)}
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
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Tidak ada laporan yang ditemukan</p>
          </div>
        )}
      </div>

      <DetailModal
        laporan={selectedLaporan}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
}