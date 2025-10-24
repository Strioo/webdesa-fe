"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Grid3x3, List, AlertCircle, Building2, TrendingUp } from "lucide-react";
import { programApi } from "@/lib/api";
import CreateEditModal from "@/components/program/CreateEditModal";
import DetailModal from "@/components/program/DetailModal";
import ProgramGridView from "@/components/program/ProgramGridView";
import ProgramTableView from "@/components/program/ProgramTableView";

interface ProgramPembangunan {
  id: string;
  nama: string;
  deskripsi: string;
  kategori: string;
  anggaran?: number;
  sumberDana?: string;
  timeline?: string;
  status: string;
  progress: number;
  foto?: string;
  penanggungJawab?: string;
  createdAt: string;
}

export default function ProgramPageContent() {
  const [programs, setPrograms] = useState<ProgramPembangunan[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<ProgramPembangunan[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [kategoriFilter, setKategoriFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedProgram, setSelectedProgram] = useState<ProgramPembangunan | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<ProgramPembangunan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  useEffect(() => {
    fetchPrograms();
  }, []);

  useEffect(() => {
    filterPrograms();
  }, [programs, searchTerm, kategoriFilter, statusFilter]);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await programApi.getAll();
      console.log('Fetch programs response:', response);
      
      if (response.success && response.data) {
        setPrograms(Array.isArray(response.data) ? response.data : []);
      } else {
        setError(response.message || 'Gagal mengambil data program');
        setPrograms([]);
      }
    } catch (error: any) {
      console.error("Error fetching programs:", error);
      setError(error.message || 'Terjadi kesalahan saat mengambil data');
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  const filterPrograms = () => {
    let filtered = programs;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.kategori.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (kategoriFilter !== "ALL") {
      filtered = filtered.filter(item => item.kategori === kategoriFilter);
    }

    if (statusFilter !== "ALL") {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    setFilteredPrograms(filtered);
  };

  const handleCreate = async (data: Partial<ProgramPembangunan>) => {
    try {
      const response = await programApi.create(data);
      console.log('Create program response:', response);
      
      if (response.success) {
        await fetchPrograms();
        setIsCreateModalOpen(false);
      } else {
        alert(response.message || 'Gagal menambahkan program');
      }
    } catch (error: any) {
      console.error("Error creating program:", error);
      alert(error.message || 'Terjadi kesalahan saat menambahkan program');
    }
  };

  const handleEdit = async (data: Partial<ProgramPembangunan>) => {
    try {
      if (editingProgram) {
        const response = await programApi.update(editingProgram.id, data);
        console.log('Update program response:', response);
        
        if (response.success) {
          await fetchPrograms();
          setIsEditModalOpen(false);
          setEditingProgram(null);
        } else {
          alert(response.message || 'Gagal mengupdate program');
        }
      }
    } catch (error: any) {
      console.error("Error updating program:", error);
      alert(error.message || 'Terjadi kesalahan saat mengupdate program');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus program ini?")) {
      try {
        const response = await programApi.delete(id);
        console.log('Delete program response:', response);
        
        if (response.success) {
          await fetchPrograms();
        } else {
          alert(response.message || 'Gagal menghapus program');
        }
      } catch (error: any) {
        console.error("Error deleting program:", error);
        alert(error.message || 'Terjadi kesalahan saat menghapus program');
      }
    }
  };

  const openDetailModal = (program: ProgramPembangunan) => {
    setSelectedProgram(program);
    setIsDetailModalOpen(true);
  };

  const openEditModal = (program: ProgramPembangunan) => {
    setEditingProgram(program);
    setIsEditModalOpen(true);
  };

  const getAverageProgress = () => {
    if (programs.length === 0) return 0;
    const total = programs.reduce((sum, p) => sum + p.progress, 0);
    return Math.round(total / programs.length);
  };

  const getStatusCount = (status: string) => {
    return programs.filter(p => p.status === status).length;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data program...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Program Pembangunan</h1>
          <p className="text-gray-600 mt-2">Kelola program pembangunan desa</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Program
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
              onClick={fetchPrograms}
              className="mt-2 text-sm text-red-700 hover:text-red-800 underline"
            >
              Coba lagi
            </button>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Program</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{programs.length}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Selesai</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{getStatusCount("SELESAI")}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Dalam Proses</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{getStatusCount("PROSES")}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Building2 className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Perencanaan</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{getStatusCount("PERENCANAAN")}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 shadow-sm text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-100">Rata-rata Progress</p>
              <p className="text-2xl font-bold mt-1">{getAverageProgress()}%</p>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

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
                placeholder="Cari program..."
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
                <option value="Infrastruktur">Infrastruktur</option>
                <option value="Pendidikan">Pendidikan</option>
                <option value="Kesehatan">Kesehatan</option>
                <option value="Ekonomi">Ekonomi</option>
                <option value="Lingkungan">Lingkungan</option>
                <option value="Sosial">Sosial</option>
              </select>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="ALL">Semua Status</option>
                <option value="PERENCANAAN">Perencanaan</option>
                <option value="PROSES">Proses</option>
                <option value="SELESAI">Selesai</option>
                <option value="TUNDA">Tunda</option>
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
            <span>Total: <span className="font-semibold text-gray-900">{programs.length}</span></span>
            <span>•</span>
            <span>Ditampilkan: <span className="font-semibold text-gray-900">{filteredPrograms.length}</span></span>
            <span>•</span>
            <span>Progress: <span className="font-semibold text-purple-600">{getAverageProgress()}%</span></span>
          </div>
        </div>

        {/* Content View */}
        <div className="p-6">
          {viewMode === "grid" ? (
            <ProgramGridView
              programs={filteredPrograms}
              onView={openDetailModal}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ) : (
            <ProgramTableView
              programs={filteredPrograms}
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
        program={editingProgram || undefined}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingProgram(null);
        }}
        onSave={handleEdit}
        isEdit={true}
      />

      <DetailModal
        program={selectedProgram}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />
    </div>
  );
}