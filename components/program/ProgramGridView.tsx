"use client";

import { Building2, Eye, Edit, Trash2, Calendar, DollarSign, TrendingUp, User } from "lucide-react";
import { getImageUrl, handleImageError } from "@/lib/utils";

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

const getStatusColor = (status: string) => {
  switch (status) {
    case "SELESAI":
      return "bg-green-100 text-green-800 border-green-200";
    case "PROSES":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "PERENCANAAN":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "DITUNDA":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "SELESAI":
      return "Selesai";
    case "PROSES":
      return "Dalam Proses";
    case "PERENCANAAN":
      return "Perencanaan";
    case "DITUNDA":
      return "Ditunda";
    default:
      return status;
  }
};

const getProgressColor = (progress: number) => {
  if (progress >= 80) return "bg-green-500";
  if (progress >= 50) return "bg-yellow-500";
  if (progress >= 20) return "bg-orange-500";
  return "bg-red-500";
};

export default function ProgramGridView({
  programs,
  onView,
  onEdit,
  onDelete,
}: ProgramGridViewProps) {
  if (programs.length === 0) {
    return (
      <div className="text-center py-12">
        <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Tidak ada program yang ditemukan</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {programs.map((program) => (
        <div
          key={program.id}
          className="bg-white rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 overflow-hidden group"
        >
          {/* Image */}
          <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
            <img
              src={getImageUrl(program.foto)}
              alt={program.nama}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={handleImageError}
            />
            
            {/* Status Badge */}
            <span
              className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                program.status
              )}`}
            >
              {getStatusLabel(program.status)}
            </span>

            {/* Kategori Badge */}
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-white text-gray-800 border border-gray-200">
              {program.kategori}
            </span>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Title */}
            <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 min-h-[56px]">
              {program.nama}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
              {program.deskripsi}
            </p>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-600 font-medium">Progress</span>
                <span className="text-xs font-bold text-gray-900">{program.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${getProgressColor(
                    program.progress
                  )}`}
                  style={{ width: `${program.progress}%` }}
                />
              </div>
            </div>

            {/* Info */}
            <div className="space-y-2 mb-4">
              {program.anggaran && (
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                  <span className="font-semibold text-green-700">
                    Rp {program.anggaran.toLocaleString("id-ID")}
                  </span>
                </div>
              )}

              {program.timeline && (
                <div className="flex items-start text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{program.timeline}</span>
                </div>
              )}

              {program.penanggungJawab && (
                <div className="flex items-start text-sm text-gray-600">
                  <User className="w-4 h-4 mr-2 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{program.penanggungJawab}</span>
                </div>
              )}

              {program.sumberDana && (
                <div className="flex items-start text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4 mr-2 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{program.sumberDana}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
              <button
                onClick={() => onView(program)}
                className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors text-sm font-medium"
              >
                <Eye className="w-4 h-4 mr-1.5" />
                Detail
              </button>
              <button
                onClick={() => onEdit(program)}
                className="flex items-center justify-center px-3 py-2 bg-yellow-50 text-yellow-600 hover:bg-yellow-100 rounded-lg transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(program.id)}
                className="flex items-center justify-center px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
