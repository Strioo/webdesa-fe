"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { laporanApi } from "@/lib/api";
import { useRouter } from "next/navigation";
import { 
  FileText, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  Clock, 
  XCircle,
  AlertTriangle,
  Loader2,
  MessageSquare
} from "lucide-react";
import { toast } from "sonner";

interface Laporan {
  id: string;
  judul: string;
  deskripsi: string;
  kategori: string;
  status: 'PENDING' | 'PROSES' | 'SELESAI' | 'DITOLAK';
  lokasi?: string;
  foto?: string;
  tanggapan?: string;
  createdAt: string;
}

const StatusBadge = ({ status }: { status: string }) => {
  const config = {
    PENDING: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock, label: 'Menunggu' },
    PROSES: { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: AlertTriangle, label: 'Diproses' },
    SELESAI: { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle, label: 'Selesai' },
    DITOLAK: { color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle, label: 'Ditolak' }
  };

  const { color, icon: Icon, label } = config[status as keyof typeof config] || config.PENDING;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${color}`}>
      <Icon className="w-3.5 h-3.5 mr-1.5" />
      {label}
    </span>
  );
};

export default function LaporanHistoryContent() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [laporan, setLaporan] = useState<Laporan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?from=/laporan');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchLaporan();
    }
  }, [user]);

  const fetchLaporan = async () => {
    try {
      setLoading(true);
      const response = await laporanApi.getByUserId(user!.id);
      
      if (response.success && response.data) {
        setLaporan(response.data as Laporan[]);
      }
    } catch (error: any) {
      console.error('Error fetching laporan:', error);
      toast.error(error.message || 'Gagal memuat riwayat laporan');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#5B903A] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat riwayat laporan...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Riwayat Laporan</h1>
          <p className="text-gray-600">Pantau status laporan yang Anda kirimkan</p>
        </div>

        {laporan.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium mb-2">Belum ada laporan</p>
            <p className="text-gray-400 text-sm mb-6">Laporan yang Anda kirimkan akan muncul di sini</p>
            <button
              onClick={() => router.push('/lapor')}
              className="px-6 py-3 bg-[#5B903A] text-white rounded-lg hover:bg-[#4A7A2E] transition-colors"
            >
              Buat Laporan
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {laporan.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.judul}</h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">{item.deskripsi}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-1.5" />
                        {item.kategori}
                      </div>
                      {item.lokasi && (
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1.5" />
                          {item.lokasi}
                        </div>
                      )}
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1.5" />
                        {new Date(item.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <StatusBadge status={item.status} />
                </div>

                {item.tanggapan && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start">
                      <MessageSquare className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-900 mb-1">Tanggapan Admin:</p>
                        <p className="text-sm text-blue-800">{item.tanggapan}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}