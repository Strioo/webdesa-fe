"use client";

import { X, DollarSign, Calendar, User, TrendingUp, Building2 } from "lucide-react";

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

interface DetailModalProps {
  program: ProgramPembangunan | null;
  isOpen: boolean;
  onClose: () => void;
}

const StatusBadge = ({ status }: { status: string }) => {
  const configs = {
    PERENCANAAN: { color: "bg-blue-100 text-blue-800", label: "Perencanaan" },
    PROSES: { color: "bg-yellow-100 text-yellow-800", label: "Dalam Proses" },
    SELESAI: { color: "bg-green-100 text-green-800", label: "Selesai" },
    TUNDA: { color: "bg-red-100 text-red-800", label: "Tertunda" }
  };
  
  const config = configs[status as keyof typeof configs] || configs.PERENCANAAN;
  
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
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
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Progress</span>
        <span className="text-sm font-semibold text-gray-900">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(progress)}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default function DetailModal({ program, isOpen, onClose }: DetailModalProps) {
  if (!isOpen || !program) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Detail Program Pembangunan</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Foto */}
          {program.foto && (
            <div>
              <img
                src={program.foto}
                alt={program.nama}
                className="w-full h-64 object-cover rounded-lg border border-gray-200"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-program.jpg';
                }}
              />
            </div>
          )}

          {/* Header Info */}
          <div>
            <h4 className="text-2xl font-semibold text-gray-900 mb-2">{program.nama}</h4>
            <div className="flex items-center space-x-3 mb-4">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {program.kategori}
              </span>
              <StatusBadge status={program.status} />
            </div>
            <p className="text-gray-700 leading-relaxed">{program.deskripsi}</p>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-50 rounded-lg p-4">
            <ProgressBar progress={program.progress} />
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {program.anggaran && (
                <div className="flex items-start">
                  <DollarSign className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Anggaran</p>
                    <p className="font-medium text-gray-900">
                      Rp {program.anggaran.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
              )}

              {program.sumberDana && (
                <div className="flex items-start">
                  <Building2 className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Sumber Dana</p>
                    <p className="font-medium text-gray-900">{program.sumberDana}</p>
                  </div>
                </div>
              )}

              {program.timeline && (
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Timeline</p>
                    <p className="font-medium text-gray-900">{program.timeline}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {program.penanggungJawab && (
                <div className="flex items-start">
                  <User className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Penanggung Jawab</p>
                    <p className="font-medium text-gray-900">{program.penanggungJawab}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start">
                <TrendingUp className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Status Progres</p>
                  <p className="font-medium text-gray-900">{program.progress}% Selesai</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Dibuat pada: {new Date(program.createdAt).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
