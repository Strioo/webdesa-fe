"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Calendar,
  DollarSign,
  User,
  Target,
  Clock,
  TrendingUp,
  X
} from "lucide-react";

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

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "PERENCANAAN":
        return { color: "bg-yellow-100 text-yellow-800", icon: Clock };
      case "PELAKSANAAN":
        return { color: "bg-blue-100 text-blue-800", icon: TrendingUp };
      case "SELESAI":
        return { color: "bg-green-100 text-green-800", icon: Target };
      case "TUNDA":
        return { color: "bg-red-100 text-red-800", icon: X };
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

const ProgressBar = ({ progress }: { progress: number }) => {
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-blue-500";
    if (progress >= 30) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(progress)}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const CreateEditModal = ({
  program,
  isOpen,
  onClose,
  onSave,
  isEdit = false
}: {
  program?: ProgramPembangunan;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<ProgramPembangunan>) => void;
  isEdit?: boolean;
}) => {
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    kategori: "",
    anggaran: "",
    sumberDana: "",
    timeline: "",
    status: "PERENCANAAN",
    progress: 0,
    foto: "",
    penanggungJawab: ""
  });

  useEffect(() => {
    if (program && isEdit) {
      setFormData({
        nama: program.nama,
        deskripsi: program.deskripsi,
        kategori: program.kategori,
        anggaran: program.anggaran?.toString() || "",
        sumberDana: program.sumberDana || "",
        timeline: program.timeline || "",
        status: program.status,
        progress: program.progress,
        foto: program.foto || "",
        penanggungJawab: program.penanggungJawab || ""
      });
    } else {
      setFormData({
        nama: "",
        deskripsi: "",
        kategori: "",
        anggaran: "",
        sumberDana: "",
        timeline: "",
        status: "PERENCANAAN",
        progress: 0,
        foto: "",
        penanggungJawab: ""
      });
    }
  }, [program, isEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      anggaran: formData.anggaran ? parseInt(formData.anggaran) : undefined
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {isEdit ? "Edit Program" : "Tambah Program Baru"}
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
                Nama Program *
              </label>
              <input
                type="text"
                required
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan nama program"
              />
            </div>
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
                <option value="Infrastruktur">Infrastruktur</option>
                <option value="Kesehatan">Kesehatan</option>
                <option value="Pendidikan">Pendidikan</option>
                <option value="Ekonomi">Ekonomi</option>
                <option value="Pertanian">Pertanian</option>
                <option value="Lingkungan">Lingkungan</option>
                <option value="Sosial">Sosial</option>
              </select>
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
              placeholder="Deskripsikan program ini..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Anggaran (Rp)
              </label>
              <input
                type="number"
                value={formData.anggaran}
                onChange={(e) => setFormData({ ...formData, anggaran: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sumber Dana
              </label>
              <input
                type="text"
                value={formData.sumberDana}
                onChange={(e) => setFormData({ ...formData, sumberDana: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Dana Desa, APBD, dll"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timeline
              </label>
              <input
                type="text"
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Januari 2025 - Juni 2025"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Penanggung Jawab
              </label>
              <input
                type="text"
                value={formData.penanggungJawab}
                onChange={(e) => setFormData({ ...formData, penanggungJawab: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nama dinas/bagian"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="PERENCANAAN">Perencanaan</option>
                <option value="PELAKSANAAN">Pelaksanaan</option>
                <option value="SELESAI">Selesai</option>
                <option value="TUNDA">Tunda</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Progress (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) || 0 })}
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
  program,
  isOpen,
  onClose
}: {
  program: ProgramPembangunan | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen || !program) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Detail Program</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {program.foto && (
            <div>
              <img
                src={program.foto}
                alt={program.nama}
                className="w-full h-64 object-cover rounded-lg border border-gray-200"
              />
            </div>
          )}

          <div>
            <h4 className="text-2xl font-semibold text-gray-900 mb-2">{program.nama}</h4>
            <div className="flex items-center space-x-2 mb-4">
              <StatusBadge status={program.status} />
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {program.kategori}
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed">{program.deskripsi}</p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-900">Progress</span>
              <span className="text-sm font-bold text-blue-900">{program.progress}%</span>
            </div>
            <ProgressBar progress={program.progress} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {program.anggaran && (
                <div className="flex items-center text-gray-600">
                  <DollarSign className="w-5 h-5 mr-3 text-gray-400" />
                  <span>Rp {program.anggaran.toLocaleString('id-ID')}</span>
                </div>
              )}
              {program.sumberDana && (
                <div className="flex items-center text-gray-600">
                  <Target className="w-5 h-5 mr-3 text-gray-400" />
                  <span>{program.sumberDana}</span>
                </div>
              )}
              {program.penanggungJawab && (
                <div className="flex items-center text-gray-600">
                  <User className="w-5 h-5 mr-3 text-gray-400" />
                  <span>{program.penanggungJawab}</span>
                </div>
              )}
            </div>
            <div className="space-y-4">
              {program.timeline && (
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                  <span>{program.timeline}</span>
                </div>
              )}
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-3 text-gray-400" />
                <span>Dibuat: {new Date(program.createdAt).toLocaleDateString('id-ID')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProgramPage() {
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

  useEffect(() => {
    fetchPrograms();
  }, []);

  useEffect(() => {
    filterPrograms();
  }, [programs, searchTerm, kategoriFilter, statusFilter]);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const mockData: ProgramPembangunan[] = [
        {
          id: "1",
          nama: "Pembangunan Jalan Desa",
          deskripsi: "Program pembangunan jalan beraspal sepanjang 2 km untuk menghubungkan pusat desa dengan area pertanian. Diharapkan dapat meningkatkan akses transportasi bagi petani.",
          kategori: "Infrastruktur",
          anggaran: 500000000,
          sumberDana: "Dana Desa + APBD Kabupaten",
          timeline: "Januari 2025 - Juni 2025",
          status: "PELAKSANAAN",
          progress: 65,
          foto: "/uploads/pembangunan-jalan.jpg",
          penanggungJawab: "Dinas Pekerjaan Umum",
          createdAt: "2025-01-01T08:00:00.000Z"
        },
        {
          id: "2",
          nama: "Pembangunan Posyandu",
          deskripsi: "Pembangunan gedung posyandu baru dengan fasilitas lengkap untuk meningkatkan pelayanan kesehatan masyarakat, terutama ibu dan anak.",
          kategori: "Kesehatan",
          anggaran: 150000000,
          sumberDana: "Dana Desa",
          timeline: "Maret 2025 - Agustus 2025",
          status: "PELAKSANAAN",
          progress: 30,
          foto: "/uploads/posyandu.jpg",
          penanggungJawab: "Dinas Kesehatan",
          createdAt: "2025-03-01T08:00:00.000Z"
        },
        {
          id: "3",
          nama: "Program Pelatihan UMKM",
          deskripsi: "Program pelatihan keterampilan dan manajemen usaha untuk pelaku UMKM desa agar dapat mengembangkan usaha dan meningkatkan pendapatan.",
          kategori: "Ekonomi",
          anggaran: 75000000,
          sumberDana: "Dana Desa + CSR",
          timeline: "April 2025 - Oktober 2025",
          status: "PERENCANAAN",
          progress: 10,
          penanggungJawab: "Dinas Koperasi dan UMKM",
          createdAt: "2025-04-01T08:00:00.000Z"
        },
        {
          id: "4",
          nama: "Sistem Irigasi Modern",
          deskripsi: "Pembangunan sistem irigasi tetes untuk area pertanian desa. Meningkatkan efisiensi penggunaan air dan produktivitas pertanian.",
          kategori: "Pertanian",
          anggaran: 200000000,
          sumberDana: "Dana Desa + Grant International",
          timeline: "Juli 2025 - Desember 2025",
          status: "PERENCANAAN",
          progress: 5,
          penanggungJawab: "Dinas Pertanian",
          createdAt: "2025-07-01T08:00:00.000Z"
        }
      ];
      setPrograms(mockData);
    } catch (error) {
      console.error("Error fetching programs:", error);
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
        item.penanggungJawab?.toLowerCase().includes(searchTerm.toLowerCase())
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
      const newProgram: ProgramPembangunan = {
        id: Date.now().toString(),
        nama: data.nama!,
        deskripsi: data.deskripsi!,
        kategori: data.kategori!,
        anggaran: data.anggaran,
        sumberDana: data.sumberDana,
        timeline: data.timeline,
        status: data.status!,
        progress: data.progress!,
        foto: data.foto,
        penanggungJawab: data.penanggungJawab,
        createdAt: new Date().toISOString()
      };
      setPrograms(prev => [newProgram, ...prev]);
    } catch (error) {
      console.error("Error creating program:", error);
    }
  };

  const handleEdit = async (data: Partial<ProgramPembangunan>) => {
    try {
      if (editingProgram) {
        setPrograms(prev =>
          prev.map(item =>
            item.id === editingProgram.id
              ? { ...item, ...data }
              : item
          )
        );
        setEditingProgram(null);
      }
    } catch (error) {
      console.error("Error updating program:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus program ini?")) {
      try {
        setPrograms(prev => prev.filter(item => item.id !== id));
      } catch (error) {
        console.error("Error deleting program:", error);
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
          <h1 className="text-3xl font-bold text-gray-900">Program Pembangunan</h1>
          <p className="text-gray-600 mt-2">Kelola program pembangunan desa</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Program
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
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
          <div className="flex items-center space-x-3">
            <select
              value={kategoriFilter}
              onChange={(e) => setKategoriFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ALL">Semua Kategori</option>
              <option value="Infrastruktur">Infrastruktur</option>
              <option value="Kesehatan">Kesehatan</option>
              <option value="Pendidikan">Pendidikan</option>
              <option value="Ekonomi">Ekonomi</option>
              <option value="Pertanian">Pertanian</option>
              <option value="Lingkungan">Lingkungan</option>
              <option value="Sosial">Sosial</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ALL">Semua Status</option>
              <option value="PERENCANAAN">Perencanaan</option>
              <option value="PELAKSANAAN">Pelaksanaan</option>
              <option value="SELESAI">Selesai</option>
              <option value="TUNDA">Tunda</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((item) => (
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
                  <StatusBadge status={item.status} />
                </div>
                
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mb-2">
                  {item.kategori}
                </span>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.deskripsi}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium">{item.progress}%</span>
                  </div>
                  <ProgressBar progress={item.progress} />
                </div>

                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  {item.anggaran && (
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span>Rp {item.anggaran.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                  {item.timeline && (
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="truncate">{item.timeline}</span>
                    </div>
                  )}
                  {item.penanggungJawab && (
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      <span className="truncate">{item.penanggungJawab}</span>
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

        {filteredPrograms.length === 0 && (
          <div className="text-center py-12">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Tidak ada program yang ditemukan</p>
          </div>
        )}
      </div>

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