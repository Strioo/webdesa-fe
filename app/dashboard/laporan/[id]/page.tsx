"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { laporanApi } from "@/lib/api";
import { getImageUrl, handleImageError } from "@/lib/utils";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  MapPin,
  Calendar,
  User,
  FileText,
  Loader2,
  UserX,
  Save,
  Image as ImageIcon,
  Tag,
  MessageSquare
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
  } | null;
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
    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${config.color}`}>
      <Icon className="w-4 h-4 mr-1.5" />
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
    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${config.color}`}>
      <Tag className="w-3.5 h-3.5 mr-1.5" />
      {config.label}
    </span>
  );
};

export default function DetailLaporanPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [laporan, setLaporan] = useState<Laporan | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [newStatus, setNewStatus] = useState("");
  const [tanggapan, setTanggapan] = useState("");

  useEffect(() => {
    if (id) {
      fetchLaporan();
    }
  }, [id]);

  const fetchLaporan = async () => {
    try {
      setLoading(true);
      const response = await laporanApi.getById(id);
      
      if (response.success && response.data) {
        const data = response.data as Laporan;
        setLaporan(data);
        setNewStatus(data.status);
        setTanggapan(data.tanggapan || "");
      } else {
        throw new Error(response.message || "Gagal memuat data laporan");
      }
    } catch (error: any) {
      toast.error(error.message || "Gagal memuat data laporan");
      router.push("/dashboard/laporan");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!laporan) return;

    try {
      setSubmitting(true);
      
      const response = await laporanApi.updateStatus(laporan.id, { 
        status: newStatus, 
        tanggapan 
      });

      if (response.success) {
        toast.success("Status laporan berhasil diperbarui!");
        router.push("/dashboard/laporan");
      } else {
        throw new Error(response.message || "Gagal memperbarui status");
      }
    } catch (error: any) {
      toast.error(error.message || "Gagal memperbarui status laporan");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat detail laporan...</p>
        </div>
      </div>
    );
  }

  if (!laporan) {
    return (
      <div className="text-center py-16">
        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg font-medium">Laporan tidak ditemukan</p>
      </div>
    );
  }

  const statusConfig = {
    PENDING: { color: "text-yellow-600", bgColor: "bg-yellow-50", borderColor: "border-yellow-200" },
    PROSES: { color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
    SELESAI: { color: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200" },
    DITOLAK: { color: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-200" }
  };

  const currentConfig = statusConfig[laporan.status] || statusConfig.PENDING;

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/dashboard/laporan")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Detail & Edit Laporan</h1>
          <p className="text-gray-600 mt-1">Kelola dan tanggapi laporan dari warga</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className={`${currentConfig.bgColor} ${currentConfig.borderColor} border-2 rounded-xl p-6 shadow-sm`}>
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 pr-4">{laporan.judul}</h2>
              <StatusBadge status={laporan.status} />
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                {laporan.user ? (
                  <>
                    <User className="w-4 h-4 mr-1.5" />
                    <span className="font-medium">{laporan.user.name}</span>
                  </>
                ) : (
                  <>
                    <UserX className="w-4 h-4 mr-1.5 text-gray-400" />
                    <span className="font-medium text-gray-500 italic">Guest User</span>
                  </>
                )}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1.5" />
                {new Date(laporan.createdAt).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              {laporan.lokasi && (
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1.5" />
                  {laporan.lokasi}
                </div>
              )}
            </div>
            
            <KategoriBadge kategori={laporan.kategori} />
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center text-lg">
              <FileText className="w-5 h-5 mr-2 text-gray-600" />
              Deskripsi Laporan
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{laporan.deskripsi}</p>
          </div>

          {laporan.foto && (
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center text-lg">
                <ImageIcon className="w-5 h-5 mr-2 text-gray-600" />
                Dokumentasi
              </h3>
              <div className="relative group">
                <img
                  src={getImageUrl(laporan.foto)}
                  alt="Foto laporan"
                  className="w-full h-96 object-cover rounded-lg border-2 border-gray-300 shadow-sm transition-transform group-hover:scale-[1.02]"
                  onError={handleImageError}
                />
              </div>
            </div>
          )}

          {laporan.tanggapan && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-blue-900 mb-4 flex items-center text-lg">
                <MessageSquare className="w-5 h-5 mr-2" />
                Tanggapan Admin Sebelumnya
              </h3>
              <p className="text-blue-800 leading-relaxed whitespace-pre-line">{laporan.tanggapan}</p>
              {laporan.updatedAt && (
                <p className="text-xs text-blue-600 mt-3">
                  Diperbarui: {new Date(laporan.updatedAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="xl:col-span-1">
          <div className="sticky top-6">
            <form onSubmit={handleSubmit} className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
              <div className="pb-4 border-b border-gray-200">
                <h3 className="font-bold text-gray-900 text-lg">Update Status Laporan</h3>
                <p className="text-sm text-gray-600 mt-1">Ubah status dan berikan tanggapan</p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Status Laporan <span className="text-red-500">*</span>
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-medium"
                >
                  <option value="PENDING">Menunggu</option>
                  <option value="PROSES">Diproses</option>
                  <option value="SELESAI">Selesai</option>
                  <option value="DITOLAK">Ditolak</option>
                </select>
                <p className="text-xs text-gray-500 mt-2">
                  Status saat ini: <span className="font-semibold">{laporan.status}</span>
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Tanggapan Admin
                </label>
                <textarea
                  value={tanggapan}
                  onChange={(e) => setTanggapan(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Berikan tanggapan terhadap laporan ini..."
                />
                <p className="text-xs text-gray-500 mt-2">
                  Opsional: Berikan penjelasan atau update kepada pelapor
                </p>
              </div>

              <div className="pt-4 space-y-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      Simpan Perubahan
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => router.push("/dashboard/laporan")}
                  disabled={submitting}
                  className="w-full px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-semibold disabled:opacity-50"
                >
                  Batal
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-xs text-blue-800 leading-relaxed">
                  <strong>💡 Tips:</strong> Pastikan status yang dipilih sesuai dengan progress penanganan laporan. 
                  Berikan tanggapan yang jelas untuk membantu pelapor memahami situasi.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}