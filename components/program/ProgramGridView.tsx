"use client";

import { Eye, Edit, Trash2, Building2, TrendingUp, DollarSign } from "lucide-react";

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

interface ProgramGridViewProps {
  programs: ProgramPembangunan[];
  onView: (program: ProgramPembangunan) => void;
  onEdit: (program: ProgramPembangunan) => void;
  onDelete: (id: string) => void;
}

const StatusBadge = ({ status }: { status: string }) => {
  const configs = {
    PERENCANAAN: { color: "bg-blue-500", label: "Perencanaan" },
    PROSES: { color: "bg-yellow-500", label: "Proses" },
    SELESAI: { color: "bg-green-500", label: "Selesai" },
    TUNDA: { color: "bg-red-500", label: "Tunda" }
  };
  
  const config = configs[status as keyof typeof configs] || configs.PERENCANAAN;
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${config.color}`}>
      {config.label}
    </span>
  );
};

const ProgressBar = ({ progress }: { progress: number }) => {
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    if (progress >= 30) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-500">Progress</span>
        <span className="text-xs font-semibold text-gray-900">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(progress)}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default function ProgramGridView({
  programs,
  onView,
  onEdit,
  onDelete
}: ProgramGridViewProps) {
  if (programs.length === 0) {
    return (
      <div className="text-center py-12">
        <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Tidak ada program pembangunan yang ditemukan</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {programs.map((program) => (
        <div
          key={program.id}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
        >
          {/* Header with Image/Icon */}
          {program.foto ? (
            <div className="h-48 bg-gray-200 overflow-hidden relative">
              <img
                src={program.foto}
                alt={program.nama}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-program.jpg';
                }}
              />
              <div className="absolute top-3 right-3">
                <StatusBadge status={program.status} />
              </div>
            </div>
          ) : (
            <div className="h-48 bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center relative">
              <Building2 className="w-16 h-16 text-purple-300" />
              <div className="absolute top-3 right-3">
                <StatusBadge status={program.status} />
              </div>
            </div>
          )}
          
          <div className="p-5">
            {/* Program Name */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
              {program.nama}
            </h3>
            
            {/* Category Badge */}
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mb-3">
              {program.kategori}
            </span>
            
            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {program.deskripsi}
            </p>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <ProgressBar progress={program.progress} />
            </div>
            
            {/* Info */}
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              {program.anggaran && (
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-2 flex-shrink-0 text-green-600" />
                  <span className="font-semibold text-green-600">
                    Rp {program.anggaran.toLocaleString('id-ID')}
                  </span>
                </div>
              )}
              
              {program.timeline && (
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{program.timeline}</span>
                </div>
              )}
            </div>
            
            {/* Action Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onView(program)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Lihat Detail"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onEdit(program)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(program.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs text-gray-400">
                {new Date(program.createdAt).toLocaleDateString('id-ID')}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
