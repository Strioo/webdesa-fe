"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Star,
  MapPin,
  Clock,
  Phone,
  DollarSign,
  Camera,
  X
} from "lucide-react";

interface Wisata {
  id: string;
  nama: string;
  deskripsi: string;
  lokasi: string;
  kategori?: string;
  harga?: number;
  jamBuka?: string;
  jamTutup?: string;
  kontak?: string;
  foto?: string;
  rating?: number;
  isAktif: boolean;
  createdAt: string;
}

const CreateEditModal = ({
  wisata,
  isOpen,
  onClose,
  onSave,
  isEdit = false
}: {
  wisata?: Wisata;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Wisata>) => void;
  isEdit?: boolean;
}) => {
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    lokasi: "",
    kategori: "",
    harga: "",
    jamBuka: "",
    jamTutup: "",
    kontak: "",
    foto: "",
    isAktif: true
  });

  useEffect(() => {
    if (wisata && isEdit) {
      setFormData({
        nama: wisata.nama,
        deskripsi: wisata.deskripsi,
        lokasi: wisata.lokasi,
        kategori: wisata.kategori || "",
        harga: wisata.harga?.toString() || "",
        jamBuka: wisata.jamBuka || "",
        jamTutup: wisata.jamTutup || "",
        kontak: wisata.kontak || "",
        foto: wisata.foto || "",
        isAktif: wisata.isAktif
      });
    } else {
      setFormData({
        nama: "",
        deskripsi: "",
        lokasi: "",
        kategori: "",
        harga: "",
        jamBuka: "",
        jamTutup: "",
        kontak: "",
        foto: "",
        isAktif: true
      });
    }
  }, [wisata, isEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      harga: formData.harga ? parseInt(formData.harga) : undefined
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {isEdit ? "Edit Wisata" : "Tambah Wisata Baru"}
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
                Nama Wisata *
              </label>
              <input
                type="text"
                required
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan nama wisata"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <select
                value={formData.kategori}
                onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Pilih kategori</option>
                <option value="Alam">Alam</option>
                <option value="Budaya">Budaya</option>
                <option value="Sejarah">Sejarah</option>
                <option value="Agrowisata">Agrowisata</option>
                <option value="Kuliner">Kuliner</option>
                <option value="Adventure">Adventure</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi *
            </label>
            <textarea
              required
              rows={4}
              value={formData.deskripsi}
              onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Deskripsikan wisata ini..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lokasi *
            </label>
            <input
              type="text"
              required
              value={formData.lokasi}
              onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Alamat lengkap lokasi wisata"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Harga Tiket (Rp)
              </label>
              <input
                type="number"
                value={formData.harga}
                onChange={(e) => setFormData({ ...formData, harga: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              Wisata Aktif
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
  wisata,
  isOpen,
  onClose
}: {
  wisata: Wisata | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen || !wisata) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Detail Wisata</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {wisata.foto && (
            <div>
              <img
                src={wisata.foto}
                alt={wisata.nama}
                className="w-full h-64 object-cover rounded-lg border border-gray-200"
              />
            </div>
          )}

          <div>
            <h4 className="text-2xl font-semibold text-gray-900 mb-2">{wisata.nama}</h4>
            {wisata.kategori && (
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full mb-4">
                {wisata.kategori}
              </span>
            )}
            <p className="text-gray-700 leading-relaxed">{wisata.deskripsi}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                <span>{wisata.lokasi}</span>
              </div>
              {wisata.kontak && (
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-3 text-gray-400" />
                  <span>{wisata.kontak}</span>
                </div>
              )}
              {wisata.harga && (
                <div className="flex items-center text-gray-600">
                  <DollarSign className="w-5 h-5 mr-3 text-gray-400" />
                  <span>Rp {wisata.harga.toLocaleString('id-ID')}</span>
                </div>
              )}
            </div>
            <div className="space-y-4">
              {(wisata.jamBuka || wisata.jamTutup) && (
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-3 text-gray-400" />
                  <span>
                    {wisata.jamBuka || "00:00"} - {wisata.jamTutup || "23:59"}
                  </span>
                </div>
              )}
              {wisata.rating && (
                <div className="flex items-center text-gray-600">
                  <Star className="w-5 h-5 mr-3 text-yellow-400 fill-current" />
                  <span>{wisata.rating}/5.0</span>
                </div>
              )}
              <div className="flex items-center">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  wisata.isAktif
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {wisata.isAktif ? "Aktif" : "Tidak Aktif"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function WisataPage() {
  const [wisata, setWisata] = useState<Wisata[]>([]);
  const [filteredWisata, setFilteredWisata] = useState<Wisata[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [kategoriFilter, setKategoriFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedWisata, setSelectedWisata] = useState<Wisata | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingWisata, setEditingWisata] = useState<Wisata | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWisata();
  }, []);

  useEffect(() => {
    filterWisata();
  }, [wisata, searchTerm, kategoriFilter, statusFilter]);

  const fetchWisata = async () => {
    try {
      setLoading(true);
      const mockData: Wisata[] = [
        {
          id: "1",
          nama: "Air Terjun Pelangi",
          deskripsi: "Air terjun indah dengan ketinggian 25 meter yang memberikan pemandangan spektakuler. Pada pagi hari sering terlihat pelangi di sekitar air terjun.",
          lokasi: "Bukit Hijau, 2 km dari pusat desa",
          kategori: "Alam",
          harga: 10000,
          jamBuka: "08:00",
          jamTutup: "17:00",
          kontak: "081234567800",
          foto: "/uploads/air-terjun.jpg",
          rating: 4.5,
          isAktif: true,
          createdAt: "2025-10-01T08:00:00.000Z"
        },
        {
          id: "2",
          nama: "Kebun Strawberry Suka Maju",
          deskripsi: "Kebun strawberry organik dengan konsep agrowisata. Pengunjung dapat memetik langsung strawberry segar dan belajar cara bercocok tanam.",
          lokasi: "Blok Pertanian, 1.5 km dari kantor desa",
          kategori: "Agrowisata",
          harga: 25000,
          jamBuka: "07:00",
          jamTutup: "16:00",
          kontak: "081234567801",
          foto: "/uploads/kebun-strawberry.jpg",
          rating: 4.2,
          isAktif: true,
          createdAt: "2025-09-28T08:00:00.000Z"
        },
        {
          id: "3",
          nama: "Rumah Adat Betawi",
          deskripsi: "Museum rumah adat tradisional yang masih terawat dengan baik. Menampilkan koleksi peralatan rumah tangga dan budaya tradisional.",
          lokasi: "Kampung Budaya RT 05",
          kategori: "Budaya",
          harga: 5000,
          jamBuka: "09:00",
          jamTutup: "15:00",
          kontak: "081234567802",
          foto: "/uploads/rumah-adat.jpg",
          rating: 4.0,
          isAktif: false,
          createdAt: "2025-09-25T08:00:00.000Z"
        }
      ];
      setWisata(mockData);
    } catch (error) {
      console.error("Error fetching wisata:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterWisata = () => {
    let filtered = wisata;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.lokasi.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (kategoriFilter !== "ALL") {
      filtered = filtered.filter(item => item.kategori === kategoriFilter);
    }

    if (statusFilter !== "ALL") {
      const isActive = statusFilter === "AKTIF";
      filtered = filtered.filter(item => item.isAktif === isActive);
    }

    setFilteredWisata(filtered);
  };

  const handleCreate = async (data: Partial<Wisata>) => {
    try {
      const newWisata: Wisata = {
        id: Date.now().toString(),
        nama: data.nama!,
        deskripsi: data.deskripsi!,
        lokasi: data.lokasi!,
        kategori: data.kategori,
        harga: data.harga,
        jamBuka: data.jamBuka,
        jamTutup: data.jamTutup,
        kontak: data.kontak,
        foto: data.foto,
        rating: 0,
        isAktif: data.isAktif!,
        createdAt: new Date().toISOString()
      };
      setWisata(prev => [newWisata, ...prev]);
    } catch (error) {
      console.error("Error creating wisata:", error);
    }
  };

  const handleEdit = async (data: Partial<Wisata>) => {
    try {
      if (editingWisata) {
        setWisata(prev =>
          prev.map(item =>
            item.id === editingWisata.id
              ? { ...item, ...data }
              : item
          )
        );
        setEditingWisata(null);
      }
    } catch (error) {
      console.error("Error updating wisata:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus wisata ini?")) {
      try {
        setWisata(prev => prev.filter(item => item.id !== id));
      } catch (error) {
        console.error("Error deleting wisata:", error);
      }
    }
  };

  const openDetailModal = (wisata: Wisata) => {
    setSelectedWisata(wisata);
    setIsDetailModalOpen(true);
  };

  const openEditModal = (wisata: Wisata) => {
    setEditingWisata(wisata);
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
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Wisata</h1>
          <p className="text-gray-600 mt-2">Kelola destinasi wisata desa</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Wisata
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari wisata..."
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
              <option value="Alam">Alam</option>
              <option value="Budaya">Budaya</option>
              <option value="Sejarah">Sejarah</option>
              <option value="Agrowisata">Agrowisata</option>
              <option value="Kuliner">Kuliner</option>
              <option value="Adventure">Adventure</option>
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
          {filteredWisata.map((item) => (
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
                
                {item.kategori && (
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mb-2">
                    {item.kategori}
                  </span>
                )}
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.deskripsi}
                </p>
                
                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="truncate">{item.lokasi}</span>
                  </div>
                  {item.harga && (
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span>Rp {item.harga.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                  {item.rating && (
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-2 text-yellow-400 fill-current" />
                      <span>{item.rating}/5.0</span>
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

        {filteredWisata.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Tidak ada wisata yang ditemukan</p>
          </div>
        )}
      </div>

      <CreateEditModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreate}
      />

      <CreateEditModal
        wisata={editingWisata || undefined}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingWisata(null);
        }}
        onSave={handleEdit}
        isEdit={true}
      />

      <DetailModal
        wisata={selectedWisata}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />
    </div>
  );
}