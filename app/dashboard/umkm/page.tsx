"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Store,
  MapPin,
  Phone,
  Clock,
  DollarSign,
  User,
  X,
  CheckCircle,
  XCircle
} from "lucide-react";

interface UMKM {
  id: string;
  nama: string;
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

const CreateEditModal = ({
  umkm,
  isOpen,
  onClose,
  onSave,
  isEdit = false
}: {
  umkm?: UMKM;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<UMKM>) => void;
  isEdit?: boolean;
}) => {
  const [formData, setFormData] = useState({
    nama: "",
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
    isAktif: true
  });

  useEffect(() => {
    if (umkm && isEdit) {
      setFormData({
        nama: umkm.nama,
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
        isAktif: umkm.isAktif
      });
    } else {
      setFormData({
        nama: "",
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
        isAktif: true
      });
    }
  }, [umkm, isEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {isEdit ? "Edit UMKM" : "Tambah UMKM Baru"}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama UMKM *
              </label>
              <input
                type="text"
                required
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan nama UMKM"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pemilik *
              </label>
              <input
                type="text"
                required
                value={formData.pemilik}
                onChange={(e) => setFormData({ ...formData, pemilik: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nama pemilik"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi *
            </label>
            <textarea
              required
              rows={3}
              value={formData.deskripsi}
              onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Deskripsikan UMKM ini..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori *
              </label>
              <select
                required
                value={formData.kategori}
                onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kontak
              </label>
              <input
                type="text"
                value={formData.kontak}
                onChange={(e) => setFormData({ ...formData, kontak: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nomor telepon"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alamat *
            </label>
            <input
              type="text"
              required
              value={formData.alamat}
              onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Alamat lengkap UMKM"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Produk/Layanan
            </label>
            <textarea
              rows={2}
              value={formData.produk}
              onChange={(e) => setFormData({ ...formData, produk: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Daftar produk atau layanan yang ditawarkan"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Range Harga
              </label>
              <input
                type="text"
                value={formData.harga}
                onChange={(e) => setFormData({ ...formData, harga: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Rp 10.000 - Rp 50.000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jam Buka
              </label>
              <input
                type="time"
                value={formData.jamBuka}
                onChange={(e) => setFormData({ ...formData, jamBuka: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jam Tutup
              </label>
              <input
                type="time"
                value={formData.jamTutup}
                onChange={(e) => setFormData({ ...formData, jamTutup: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL Foto
            </label>
            <input
              type="url"
              value={formData.foto}
              onChange={(e) => setFormData({ ...formData, foto: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/foto.jpg"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isAktif"
              checked={formData.isAktif}
              onChange={(e) => setFormData({ ...formData, isAktif: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="isAktif" className="text-sm font-medium text-gray-700">
              UMKM Aktif
            </label>
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
              {isEdit ? "Update" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DetailModal = ({
  umkm,
  isOpen,
  onClose
}: {
  umkm: UMKM | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen || !umkm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Detail UMKM</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {umkm.foto && (
            <div>
              <img
                src={umkm.foto}
                alt={umkm.nama}
                className="w-full h-64 object-cover rounded-lg border border-gray-200"
              />
            </div>
          )}

          <div>
            <h4 className="text-2xl font-semibold text-gray-900 mb-2">{umkm.nama}</h4>
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full mb-4">
              {umkm.kategori}
            </span>
            <p className="text-gray-700 leading-relaxed">{umkm.deskripsi}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <User className="w-5 h-5 mr-3 text-gray-400" />
                <span>{umkm.pemilik}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                <span>{umkm.alamat}</span>
              </div>
              {umkm.kontak && (
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-3 text-gray-400" />
                  <span>{umkm.kontak}</span>
                </div>
              )}
              {umkm.harga && (
                <div className="flex items-center text-gray-600">
                  <DollarSign className="w-5 h-5 mr-3 text-gray-400" />
                  <span>{umkm.harga}</span>
                </div>
              )}
            </div>
            <div className="space-y-4">
              {(umkm.jamBuka || umkm.jamTutup) && (
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-3 text-gray-400" />
                  <span>
                    {umkm.jamBuka || "00:00"} - {umkm.jamTutup || "23:59"}
                  </span>
                </div>
              )}
              <div className="flex items-center">
                <span className={`px-3 py-1 rounded-full text-sm flex items-center ${
                  umkm.isAktif
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {umkm.isAktif ? (
                    <><CheckCircle className="w-4 h-4 mr-1" />Aktif</>
                  ) : (
                    <><XCircle className="w-4 h-4 mr-1" />Tidak Aktif</>
                  )}
                </span>
              </div>
            </div>
          </div>

          {umkm.produk && (
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Produk/Layanan</h5>
              <p className="text-gray-700">{umkm.produk}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function UMKMPage() {
  const [umkm, setUmkm] = useState<UMKM[]>([]);
  const [filteredUmkm, setFilteredUmkm] = useState<UMKM[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [kategoriFilter, setKategoriFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedUmkm, setSelectedUmkm] = useState<UMKM | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUmkm, setEditingUmkm] = useState<UMKM | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUmkm();
  }, []);

  useEffect(() => {
    filterUmkm();
  }, [umkm, searchTerm, kategoriFilter, statusFilter]);

  const fetchUmkm = async () => {
    try {
      setLoading(true);
      const mockData: UMKM[] = [
        {
          id: "1",
          nama: "Keripik Singkong Bu Yani",
          pemilik: "Yani Suhartini",
          deskripsi: "Usaha keripik singkong dengan berbagai varian rasa. Menggunakan singkong lokal berkualitas tinggi dan bumbu rahasia turun temurun.",
          kategori: "Makanan & Minuman",
          alamat: "Jl. Mawar No. 12 RT 02/RW 01",
          kontak: "081234567810",
          produk: "Keripik singkong original, pedas, balado, keju",
          harga: "Rp 15.000 - Rp 25.000",
          foto: "/uploads/keripik-singkong.jpg",
          jamBuka: "08:00",
          jamTutup: "20:00",
          isAktif: true,
          createdAt: "2025-10-01T08:00:00.000Z"
        },
        {
          id: "2",
          nama: "Tas Rajut Ibu Mega",
          pemilik: "Mega Sari",
          deskripsi: "Kerajinan tas rajut handmade dengan desain unik dan kualitas premium. Menerima pesanan custom sesuai keinginan pelanggan.",
          kategori: "Kerajinan",
          alamat: "Jl. Melati No. 7 RT 01/RW 02",
          kontak: "081234567811",
          produk: "Tas rajut, dompet rajut, topi rajut",
          harga: "Rp 50.000 - Rp 200.000",
          foto: "/uploads/tas-rajut.jpg",
          jamBuka: "09:00",
          jamTutup: "17:00",
          isAktif: true,
          createdAt: "2025-09-28T08:00:00.000Z"
        },
        {
          id: "3",
          nama: "Warung Nasi Gudeg Pak Tono",
          pemilik: "Tono Supriyanto",
          deskripsi: "Warung gudeg dengan cita rasa autentik Yogyakarta. Menyajikan gudeg dengan nangka muda pilihan dan bumbu yang khas.",
          kategori: "Makanan & Minuman",
          alamat: "Jl. Raya Desa No. 45",
          kontak: "081234567812",
          produk: "Nasi gudeg, ayam bakar, tahu tempe bacem",
          harga: "Rp 12.000 - Rp 25.000",
          foto: "/uploads/gudeg.jpg",
          jamBuka: "10:00",
          jamTutup: "21:00",
          isAktif: false,
          createdAt: "2025-09-25T08:00:00.000Z"
        }
      ];
      setUmkm(mockData);
    } catch (error) {
      console.error("Error fetching UMKM:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterUmkm = () => {
    let filtered = umkm;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.pemilik.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.alamat.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (kategoriFilter !== "ALL") {
      filtered = filtered.filter(item => item.kategori === kategoriFilter);
    }

    if (statusFilter !== "ALL") {
      const isActive = statusFilter === "AKTIF";
      filtered = filtered.filter(item => item.isAktif === isActive);
    }

    setFilteredUmkm(filtered);
  };

  const handleCreate = async (data: Partial<UMKM>) => {
    try {
      const newUmkm: UMKM = {
        id: Date.now().toString(),
        nama: data.nama!,
        pemilik: data.pemilik!,
        deskripsi: data.deskripsi!,
        kategori: data.kategori!,
        alamat: data.alamat!,
        kontak: data.kontak,
        produk: data.produk,
        harga: data.harga,
        foto: data.foto,
        jamBuka: data.jamBuka,
        jamTutup: data.jamTutup,
        isAktif: data.isAktif!,
        createdAt: new Date().toISOString()
      };
      setUmkm(prev => [newUmkm, ...prev]);
    } catch (error) {
      console.error("Error creating UMKM:", error);
    }
  };

  const handleEdit = async (data: Partial<UMKM>) => {
    try {
      if (editingUmkm) {
        setUmkm(prev =>
          prev.map(item =>
            item.id === editingUmkm.id
              ? { ...item, ...data }
              : item
          )
        );
        setEditingUmkm(null);
      }
    } catch (error) {
      console.error("Error updating UMKM:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus UMKM ini?")) {
      try {
        setUmkm(prev => prev.filter(item => item.id !== id));
      } catch (error) {
        console.error("Error deleting UMKM:", error);
      }
    }
  };

  const openDetailModal = (umkm: UMKM) => {
    setSelectedUmkm(umkm);
    setIsDetailModalOpen(true);
  };

  const openEditModal = (umkm: UMKM) => {
    setEditingUmkm(umkm);
    setIsEditModalOpen(true);
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
          <h1 className="text-3xl font-bold text-gray-900">Manajemen UMKM</h1>
          <p className="text-gray-600 mt-2">Kelola usaha mikro, kecil, dan menengah desa</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah UMKM
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari UMKM..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={kategoriFilter}
              onChange={(e) => setKategoriFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ALL">Semua Status</option>
              <option value="AKTIF">Aktif</option>
              <option value="TIDAK_AKTIF">Tidak Aktif</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUmkm.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              {item.foto && (
                <div className="h-48 bg-gray-200">
                  <img
                    src={item.foto}
                    alt={item.nama}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {item.nama}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.isAktif
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {item.isAktif ? "Aktif" : "Tidak Aktif"}
                  </span>
                </div>
                
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mb-2">
                  {item.kategori}
                </span>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.deskripsi}
                </p>
                
                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span className="truncate">{item.pemilik}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="truncate">{item.alamat}</span>
                  </div>
                  {item.harga && (
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span className="truncate">{item.harga}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
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
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(item.createdAt).toLocaleDateString('id-ID')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredUmkm.length === 0 && (
          <div className="text-center py-12">
            <Store className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Tidak ada UMKM yang ditemukan</p>
          </div>
        )}
      </div>

      <CreateEditModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreate}
      />

      <CreateEditModal
        umkm={editingUmkm || undefined}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingUmkm(null);
        }}
        onSave={handleEdit}
        isEdit={true}
      />

      <DetailModal
        umkm={selectedUmkm}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />
    </div>
  );
}