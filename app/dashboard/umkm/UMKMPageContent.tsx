"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { umkmApi } from "@/lib/api";
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Store,
  MapPin,
  User,
  X,
  CheckCircle,
  XCircle,
  Loader2,
  AlertCircleIcon,
  Clock,
  Phone,
} from "lucide-react";

interface UMKM {
  id: string;
  nama: string;
  slug?: string;
  pemilik: string;
  deskripsi: string;
  kategori: string;
  alamat: string;
  kontak?: string;
  produk?: string;
  harga?: string;
  foto?: string;
  jamBuka?: string;
  jamTutup?: string;
  isAktif: boolean;
  createdAt: string;
}

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
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
          Hapus UMKM?
        </h3>
        <p className="text-sm text-gray-600 text-center mb-6">
          Tindakan ini tidak dapat dibatalkan. UMKM akan dihapus secara
          permanen dari sistem.
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

const CreateEditModal = ({
  umkm,
  isOpen,
  onClose,
  onSave,
  isEdit = false,
}: {
  umkm?: UMKM;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<UMKM>) => void;
  isEdit?: boolean;
}) => {
  const [formData, setFormData] = useState({
    nama: "",
    slug: "",
    pemilik: "",
    deskripsi: "",
    kategori: "",
    alamat: "",
    kontak: "",
    produk: "",
    harga: "",
    foto: "",
    jamBuka: "",
    jamTutup: "",
    isAktif: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (umkm && isEdit) {
      setFormData({
        nama: umkm.nama,
        slug: umkm.slug || "",
        pemilik: umkm.pemilik,
        deskripsi: umkm.deskripsi,
        kategori: umkm.kategori,
        alamat: umkm.alamat,
        kontak: umkm.kontak || "",
        produk: umkm.produk || "",
        harga: umkm.harga || "",
        foto: umkm.foto || "",
        jamBuka: umkm.jamBuka || "",
        jamTutup: umkm.jamTutup || "",
        isAktif: umkm.isAktif,
      });
    } else {
      setFormData({
        nama: "",
        slug: "",
        pemilik: "",
        deskripsi: "",
        kategori: "",
        alamat: "",
        kontak: "",
        produk: "",
        harga: "",
        foto: "",
        jamBuka: "",
        jamTutup: "",
        isAktif: true,
      });
    }
  }, [umkm, isEdit, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-3xl w-full my-8">
        <div className="sticky top-0 bg-white p-6 border-b border-gray-200 z-10 rounded-t-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">
              {isEdit ? "Edit UMKM" : "Tambah UMKM Baru"}
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[calc(90vh-120px)] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nama UMKM <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.nama}
                onChange={(e) => {
                  const nama = e.target.value;
                  const slug = nama
                    .toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, "")
                    .trim()
                    .replace(/\s+/g, "-")
                    .replace(/-+/g, "-");
                  setFormData({ ...formData, nama, slug });
                }}
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Masukkan nama UMKM"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Slug (URL) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="contoh: warung-makan-bu-siti"
              />
              <p className="text-xs text-gray-500 mt-1">
                URL akan menjadi: /umkm/{formData.slug || "slug-anda"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nama Pemilik <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.pemilik}
                onChange={(e) =>
                  setFormData({ ...formData, pemilik: e.target.value })
                }
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Nama pemilik"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kategori <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.kategori}
                onChange={(e) =>
                  setFormData({ ...formData, kategori: e.target.value })
                }
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Pilih kategori</option>
                <option value="Makanan & Minuman">Makanan & Minuman</option>
                <option value="Kerajinan">Kerajinan</option>
                <option value="Fashion">Fashion</option>
                <option value="Pertanian">Pertanian</option>
                <option value="Jasa">Jasa</option>
                <option value="Teknologi">Teknologi</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nomor Kontak
            </label>
            <input
              type="text"
              value={formData.kontak}
              onChange={(e) =>
                setFormData({ ...formData, kontak: e.target.value })
              }
              className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="081234567890"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Deskripsi <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={formData.deskripsi}
              onChange={(e) =>
                setFormData({ ...formData, deskripsi: e.target.value })
              }
              className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              placeholder="Deskripsikan UMKM ini..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Alamat Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.alamat}
              onChange={(e) =>
                setFormData({ ...formData, alamat: e.target.value })
              }
              className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Jl. Contoh No. 123 RT/RW"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Produk/Layanan
            </label>
            <textarea
              rows={3}
              value={formData.produk}
              onChange={(e) =>
                setFormData({ ...formData, produk: e.target.value })
              }
              className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              placeholder="Daftar produk atau layanan yang ditawarkan"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Range Harga
              </label>
              <input
                type="text"
                value={formData.harga}
                onChange={(e) =>
                  setFormData({ ...formData, harga: e.target.value })
                }
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Rp 10.000 - Rp 50.000"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Jam Buka
              </label>
              <input
                type="time"
                value={formData.jamBuka}
                onChange={(e) =>
                  setFormData({ ...formData, jamBuka: e.target.value })
                }
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Jam Tutup
              </label>
              <input
                type="time"
                value={formData.jamTutup}
                onChange={(e) =>
                  setFormData({ ...formData, jamTutup: e.target.value })
                }
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              URL Foto
            </label>
            <input
              type="text"
              value={formData.foto}
              onChange={(e) =>
                setFormData({ ...formData, foto: e.target.value })
              }
              className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="https://example.com/foto.jpg atau /uploads/umkm/foto.jpg"
            />
          </div>

          <div className="flex items-center p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
            <input
              type="checkbox"
              id="isAktif"
              checked={formData.isAktif}
              onChange={(e) =>
                setFormData({ ...formData, isAktif: e.target.checked })
              }
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="isAktif"
              className="ml-3 text-sm font-medium text-gray-700"
            >
              UMKM sedang beroperasi (Aktif)
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 sticky bottom-0 bg-white">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-medium disabled:opacity-50 flex items-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isEdit ? "Memperbarui..." : "Menyimpan..."}
                </>
              ) : isEdit ? (
                "Perbarui UMKM"
              ) : (
                "Simpan UMKM"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function UMKMPageContent() {
  const router = useRouter();
  const [umkm, setUmkm] = useState<UMKM[]>([]);
  const [filteredUmkm, setFilteredUmkm] = useState<UMKM[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [kategoriFilter, setKategoriFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({ isOpen: false, id: null });
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchUmkm();
  }, []);

  useEffect(() => {
    filterUmkm();
  }, [umkm, searchTerm, kategoriFilter, statusFilter]);

  const fetchUmkm = async () => {
    try {
      setLoading(true);
      const response = await umkmApi.getAll();

      if (response.success && response.data) {
        setUmkm(response.data as UMKM[]);
      } else {
        throw new Error(response.message || "Gagal memuat data UMKM");
      }
    } catch (error: any) {
      console.error("Error fetching UMKM:", error);
      toast.error(error.message || "Gagal memuat data UMKM");
    } finally {
      setLoading(false);
    }
  };

  const filterUmkm = () => {
    let filtered = umkm;

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.pemilik.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.alamat.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (kategoriFilter !== "ALL") {
      filtered = filtered.filter((item) => item.kategori === kategoriFilter);
    }

    if (statusFilter !== "ALL") {
      const isActive = statusFilter === "AKTIF";
      filtered = filtered.filter((item) => item.isAktif === isActive);
    }

    setFilteredUmkm(filtered);
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;

    try {
      setDeleteLoading(true);

      const response = await umkmApi.delete(deleteModal.id);

      if (response.success) {
        toast.success("UMKM berhasil dihapus");
        await fetchUmkm();
        setDeleteModal({ isOpen: false, id: null });
      } else {
        throw new Error(response.message || "Gagal menghapus UMKM");
      }
    } catch (error: any) {
      console.error("Error deleting UMKM:", error);
      toast.error(error.message || "Gagal menghapus UMKM");
    } finally {
      setDeleteLoading(false);
    }
  };

  const openDetailModal = (umkm: UMKM) => {
    router.push(`/dashboard/umkm/${umkm.id}`);
  };

  const openEditModal = (umkm: UMKM) => {
    router.push(`/dashboard/umkm/edit/${umkm.id}`);
  };

  const openDeleteModal = (id: string) => {
    setDeleteModal({ isOpen: true, id });
  };

  const getImageUrl = (foto: string | null | undefined): string => {
    if (!foto) return "/assets/images/placeholder.jpg";
    if (foto.startsWith("http")) return foto;
    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://192.168.18.3:5000";
    return `${baseUrl}${foto}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat data UMKM...</p>
        </div>
      </div>
    );
  }

  const stats = {
    total: umkm.length,
    aktif: umkm.filter((u) => u.isAktif).length,
    tidakAktif: umkm.filter((u) => !u.isAktif).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen UMKM</h1>
          <p className="text-gray-600 mt-2">
            Kelola usaha mikro, kecil, dan menengah desa
          </p>
        </div>
        <button
          onClick={() => router.push("/dashboard/umkm/create")}
          className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
        >
          <Plus className="w-5 h-5 mr-2" />
          Tambah UMKM
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border-2 border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total UMKM</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stats.total}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Store className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border-2 border-green-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800">UMKM Aktif</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {stats.aktif}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border-2 border-red-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-800">Tidak Aktif</p>
              <p className="text-2xl font-bold text-red-600 mt-1">
                {stats.tidakAktif}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
        {/* Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari UMKM, pemilik, atau lokasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={kategoriFilter}
              onChange={(e) => setKategoriFilter(e.target.value)}
              className="px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-medium"
            >
              <option value="ALL">Semua Kategori</option>
              <option value="Makanan & Minuman">Makanan & Minuman</option>
              <option value="Kerajinan">Kerajinan</option>
              <option value="Fashion">Fashion</option>
              <option value="Pertanian">Pertanian</option>
              <option value="Jasa">Jasa</option>
              <option value="Teknologi">Teknologi</option>
              <option value="Lainnya">Lainnya</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-medium"
            >
              <option value="ALL">Semua Status</option>
              <option value="AKTIF">Aktif</option>
              <option value="TIDAK_AKTIF">Tidak Aktif</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUmkm.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all duration-200"
            >
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                  src={getImageUrl(item.foto)}
                  alt={item.nama}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/images/placeholder.jpg";
                  }}
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 truncate flex-1">
                    {item.nama}
                  </h3>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0 ml-2 ${
                      item.isAktif
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.isAktif ? "Aktif" : "Tutup"}
                  </span>
                </div>

                <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs rounded-full mb-3 font-medium">
                  {item.kategori}
                </span>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {item.deskripsi}
                </p>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{item.pemilik}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{item.alamat}</span>
                  </div>
                  {item.harga && (
                    <div className="flex items-center">
                      <span className="mr-2 text-gray-400 flex-shrink-0 font-medium">Rp</span>
                      <span className="truncate text-green-600 font-medium">
                        {item.harga}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openDetailModal(item)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Lihat Detail"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(item.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredUmkm.length === 0 && (
          <div className="text-center py-16">
            <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">
              Tidak ada UMKM yang ditemukan
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Coba ubah filter atau kata kunci pencarian
            </p>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={handleDelete}
        loading={deleteLoading}
      />
    </div>
  );
}