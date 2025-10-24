"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Grid3x3, List, AlertCircle } from "lucide-react";
import { wisataApi } from "@/lib/api";
import CreateEditModal from "@/components/wisata/CreateEditModal";
import DetailModal from "@/components/wisata/DetailModal";
import WisataGridView from "@/components/wisata/WisataGridView";
import WisataTableView from "@/components/wisata/WisataTableView";

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

export default function WisataPageContent() {
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
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  useEffect(() => {
    fetchWisata();
  }, []);

  useEffect(() => {
    filterWisata();
  }, [wisata, searchTerm, kategoriFilter, statusFilter]);

  const fetchWisata = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await wisataApi.getAll();
      console.log('Fetch wisata response:', response);
      
      if (response.success && response.data) {
        setWisata(Array.isArray(response.data) ? response.data : []);
      } else {
        setError(response.message || 'Gagal mengambil data wisata');
        setWisata([]);
      }
    } catch (error: any) {
      console.error("Error fetching wisata:", error);
      setError(error.message || 'Terjadi kesalahan saat mengambil data');
      setWisata([]);
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
      const response = await wisataApi.create(data);
      console.log('Create wisata response:', response);
      
      if (response.success) {
        await fetchWisata();
        setIsCreateModalOpen(false);
      } else {
        alert(response.message || 'Gagal menambahkan wisata');
      }
    } catch (error: any) {
      console.error("Error creating wisata:", error);
      alert(error.message || 'Terjadi kesalahan saat menambahkan wisata');
    }
  };

  const handleEdit = async (data: Partial<Wisata>) => {
    try {
      if (editingWisata) {
        const response = await wisataApi.update(editingWisata.id, data);
        console.log('Update wisata response:', response);
        
        if (response.success) {
          await fetchWisata();
          setIsEditModalOpen(false);
          setEditingWisata(null);
        } else {
          alert(response.message || 'Gagal mengupdate wisata');
        }
      }
    } catch (error: any) {
      console.error("Error updating wisata:", error);
      alert(error.message || 'Terjadi kesalahan saat mengupdate wisata');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus wisata ini?")) {
      try {
        const response = await wisataApi.delete(id);
        console.log('Delete wisata response:', response);
        
        if (response.success) {
          await fetchWisata();
        } else {
          alert(response.message || 'Gagal menghapus wisata');
        }
      } catch (error: any) {
        console.error("Error deleting wisata:", error);
        alert(error.message || 'Terjadi kesalahan saat menghapus wisata');
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
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data wisata...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Wisata</h1>
          <p className="text-gray-600 mt-2">Kelola destinasi wisata desa</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Wisata
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
          <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-800">Terjadi Kesalahan</h3>
            <p className="text-red-600 text-sm">{error}</p>
            <button
              onClick={fetchWisata}
              className="mt-2 text-sm text-red-700 hover:text-red-800 underline"
            >
              Coba lagi
            </button>
          </div>
        </div>
      )}

      {/* Main Content Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        {/* Filter & Search Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
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

            {/* Filters & View Toggle */}
            <div className="flex items-center space-x-3">
              <select
                value={kategoriFilter}
                onChange={(e) => setKategoriFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
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
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="ALL">Semua Status</option>
                <option value="AKTIF">Aktif</option>
                <option value="TIDAK_AKTIF">Tidak Aktif</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "grid"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  title="Grid View"
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "table"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  title="Table View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
            <span>Total: <span className="font-semibold text-gray-900">{wisata.length}</span></span>
            <span>•</span>
            <span>Ditampilkan: <span className="font-semibold text-gray-900">{filteredWisata.length}</span></span>
            <span>•</span>
            <span>Aktif: <span className="font-semibold text-green-600">{wisata.filter(w => w.isAktif).length}</span></span>
          </div>
        </div>

        {/* Content View */}
        <div className="p-6">
          {viewMode === "grid" ? (
            <WisataGridView
              wisata={filteredWisata}
              onView={openDetailModal}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ) : (
            <WisataTableView
              wisata={filteredWisata}
              onView={openDetailModal}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>

      {/* Modals */}
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