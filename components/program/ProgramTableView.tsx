"use client";

import { Eye, Edit, Trash2, Building2, DollarSign } from "lucide-react";

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

interface ProgramTableViewProps {
  programs: ProgramPembangunan[];
  onView: (program: ProgramPembangunan) => void;
  onEdit: (program: ProgramPembangunan) => void;
  onDelete: (id: string) => void;
}

const StatusBadge = ({ status }: { status: string }) => {
  const configs = {
    PERENCANAAN: { color: "bg-blue-100 text-blue-800", label: "Perencanaan" },
    PROSES: { color: "bg-yellow-100 text-yellow-800", label: "Proses" },
    SELESAI: { color: "bg-green-100 text-green-800", label: "Selesai" },
    TUNDA: { color: "bg-red-100 text-red-800", label: "Tunda" }
  };
  
  const config = configs[status as keyof typeof configs] || configs.PERENCANAAN;
  
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
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
    <div className="flex items-center space-x-2 w-full">
      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(progress)}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-gray-700 w-10 text-right">{progress}%</span>
    </div>
  );
};

export default function ProgramTableView({
  programs,
  onView,
  onEdit,
  onDelete
}: ProgramTableViewProps) {
  if (programs.length === 0) {
    return (
      <div className="text-center py-12">
        <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Tidak ada program pembangunan yang ditemukan</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">
              Foto
            </th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">
              Nama Program
            </th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">
              Kategori
            </th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">
              Anggaran
            </th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">
              Progress
            </th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700 text-sm">
              Status
            </th>
            <th className="text-center py-4 px-4 font-semibold text-gray-700 text-sm">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {programs.map((program) => (
            <tr
              key={program.id}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="py-4 px-4">
                {program.foto ? (
                  <img
                    src={program.foto}
                    alt={program.nama}
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-program.jpg';
                    }}
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-purple-400" />
                  </div>
                )}
              </td>
              <td className="py-4 px-4">
                <div>
                  <p className="font-semibold text-gray-900 line-clamp-1">{program.nama}</p>
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {program.deskripsi}
                  </p>
                </div>
              </td>
              <td className="py-4 px-4">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {program.kategori}
                </span>
              </td>
              <td className="py-4 px-4">
                {program.anggaran ? (
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm font-semibold text-green-600">
                      {program.anggaran.toLocaleString('id-ID')}
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">-</span>
                )}
              </td>
              <td className="py-4 px-4">
                <div className="w-32">
                  <ProgressBar progress={program.progress} />
                </div>
              </td>
              <td className="py-4 px-4">
                <StatusBadge status={program.status} />
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center justify-center space-x-2">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
