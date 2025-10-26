"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { programApi } from "@/lib/api";
import { getImageUrl, handleImageError } from "@/lib/utils";
import {
  ArrowLeft,
  Calendar,
  User,
  TrendingUp,
  Building2,
  Loader2,
  FileText,
  Tag,
  Image as ImageIcon,
  Clock
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
  const configs = {
    PERENCANAAN: { 
      color: "bg-blue-100 text-blue-800 border-2 border-blue-300", 
      label: "Perencanaan" 
    },
    PROSES: { 
      color: "bg-yellow-100 text-yellow-800 border-2 border-yellow-300", 
      label: "Dalam Proses" 
    },
    SELESAI: { 
      color: "bg-green-100 text-green-800 border-2 border-green-300", 
      label: "Selesai" 
    },
    TUNDA: { 
      color: "bg-red-100 text-red-800 border-2 border-red-300", 
      label: "Tertunda" 
    }
  };
  
  const config = configs[status as keyof typeof configs] || configs.PERENCANAAN;
  
  return (
    <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold ${config.color}`}>
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

  const getProgressBgColor = (progress: number) => {
    if (progress >= 80) return "bg-green-100";
    if (progress >= 50) return "bg-yellow-100";
    if (progress >= 30) return "bg-orange-100";
    return "bg-red-100";
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-gray-700">Progress Pembangunan</span>
        <span className="text-lg font-bold text-gray-900">{progress}%</span>
      </div>
      <div className={`w-full ${getProgressBgColor(progress)} rounded-full h-4 border-2 border-gray-300`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ${getProgressColor(progress)} flex items-center justify-end pr-2`}
          style={{ width: `${progress}%` }}
        >
          {progress > 15 && (
            <span className="text-xs font-bold text-white">{progress}%</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default function DetailProgramPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [program, setProgram] = useState<ProgramPembangunan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProgram();
    }
  }, [id]);

  const fetchProgram = async () => {
    try {
      setLoading(true);
      const response = await programApi.getById(id);
      
      if (response.success && response.data) {
        const data = response.data as ProgramPembangunan;
        setProgram(data);
      } else {
        throw new Error(response.message || "Gagal memuat data program");
      }
    } catch (error: any) {
      toast.error(error.message || "Gagal memuat data program");
      router.push("/dashboard/program");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat detail program...</p>
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="text-center py-16">
        <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg font-medium">Program tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/dashboard/program")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Detail Program Pembangunan</h1>
          <p className="text-gray-600 mt-1">Informasi lengkap program pembangunan desa</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Image & Status */}
        <div className="xl:col-span-1 space-y-6">
          {/* Image Card */}
          {program.foto && (
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center text-lg">
                <ImageIcon className="w-5 h-5 mr-2 text-gray-600" />
                Foto Program
              </h3>
              <img
                src={getImageUrl(program.foto)}
                alt={program.nama}
                className="w-full h-64 object-cover rounded-lg border-2 border-gray-300"
                onError={handleImageError}
              />
            </div>
          )}

          {/* Status Card */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 text-lg">Status Program</h3>
            <StatusBadge status={program.status} />
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  Dibuat pada{" "}
                  {new Date(program.createdAt).toLocaleDateString("id-ID", {
                    day: 'numeric',
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center text-lg">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Progress
            </h3>
            <ProgressBar progress={program.progress} />
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="xl:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {program.nama}
              </h2>
              <span className="inline-flex items-center px-4 py-1.5 bg-blue-600 text-white text-sm rounded-full font-medium">
                <Tag className="w-3.5 h-3.5 mr-1.5" />
                {program.kategori}
              </span>
            </div>
            <div className="flex items-start">
              <FileText className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm font-semibold text-blue-900 mb-2">Deskripsi</p>
                <p className="text-gray-700 leading-relaxed">{program.deskripsi}</p>
              </div>
            </div>
          </div>

          {/* Financial & Timeline Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Financial Info */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 text-lg mb-5 flex items-center">
                <span className="mr-2 text-green-600 font-bold text-xl">Rp</span>
                Informasi Keuangan
              </h3>
              <div className="space-y-4">
                {program.anggaran && (
                  <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                    <p className="text-xs text-green-700 font-semibold mb-1">Anggaran</p>
                    <p className="text-xl font-bold text-green-800">
                      Rp {program.anggaran.toLocaleString('id-ID')}
                    </p>
                  </div>
                )}
                
                {program.sumberDana && (
                  <div className="flex items-center text-gray-700 p-3 bg-gray-50 rounded-lg">
                    <Building2 className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Sumber Dana</p>
                      <p className="font-semibold">{program.sumberDana}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Timeline & PIC Info */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 text-lg mb-5 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Timeline & PIC
              </h3>
              <div className="space-y-4">
                {program.timeline && (
                  <div className="flex items-center text-gray-700 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Timeline</p>
                      <p className="font-semibold">{program.timeline}</p>
                    </div>
                  </div>
                )}
                
                {program.penanggungJawab && (
                  <div className="flex items-center text-gray-700 p-3 bg-gray-50 rounded-lg">
                    <User className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Penanggung Jawab</p>
                      <p className="font-semibold">{program.penanggungJawab}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Progress Summary Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
              Ringkasan Progress
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="text-xs text-gray-500 mb-1">Progress</p>
                <p className="text-2xl font-bold text-blue-600">{program.progress}%</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <p className="text-sm font-bold text-gray-800">{program.status}</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="text-xs text-gray-500 mb-1">Kategori</p>
                <p className="text-sm font-bold text-gray-800">{program.kategori}</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="text-xs text-gray-500 mb-1">Sisa</p>
                <p className="text-2xl font-bold text-orange-600">{100 - program.progress}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
