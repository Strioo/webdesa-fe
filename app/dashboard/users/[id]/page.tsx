"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { userApi } from "@/lib/api";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Calendar,
  Loader2,
  UserCircle,
  CheckCircle
} from "lucide-react";

interface UserData {
  id: string;
  email: string;
  name: string;
  role: "VISITOR" | "WARGA" | "ADMIN";
  noTelp?: string;
  alamat?: string;
  createdAt: string;
}

const RoleBadge = ({ role }: { role: string }) => {
  const getRoleConfig = (role: string) => {
    switch (role) {
      case "ADMIN":
        return { 
          color: "bg-red-100 text-red-800 border-2 border-red-300", 
          label: "Admin",
          icon: Shield
        };
      case "WARGA":
        return { 
          color: "bg-blue-100 text-blue-800 border-2 border-blue-300", 
          label: "Warga",
          icon: User
        };
      case "VISITOR":
        return { 
          color: "bg-gray-100 text-gray-800 border-2 border-gray-300", 
          label: "Visitor",
          icon: UserCircle
        };
      default:
        return { 
          color: "bg-gray-100 text-gray-800 border-2 border-gray-300", 
          label: role,
          icon: User
        };
    }
  };

  const config = getRoleConfig(role);
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold ${config.color}`}>
      <Icon className="w-4 h-4 mr-1.5" />
      {config.label}
    </span>
  );
};

export default function DetailUserPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await userApi.getById(id);
      
      if (response.success && response.data) {
        const data = response.data as UserData;
        setUser(data);
      } else {
        throw new Error(response.message || "Gagal memuat data user");
      }
    } catch (error: any) {
      console.error("Error fetching user:", error);
      toast.error(error.message || "Gagal memuat data user");
      router.push("/dashboard/users");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat detail user...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-16">
        <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg font-medium">User tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/dashboard/users")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Detail User</h1>
          <p className="text-gray-600 mt-1">Informasi lengkap pengguna sistem</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Avatar & Role */}
        <div className="xl:col-span-1 space-y-6">
          {/* Avatar Card */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
                <User className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center">{user.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{user.email}</p>
            </div>
          </div>

          {/* Role Card */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 text-lg">Role Pengguna</h3>
            <RoleBadge role={user.role} />
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <div>
                  <p className="text-xs text-gray-500">Terdaftar sejak</p>
                  <p className="font-medium text-gray-700">
                    {formatDate(user.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Status Card */}
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-semibold text-green-900">Status Akun</p>
                <p className="text-xs text-green-700">Aktif & Terverifikasi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="xl:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Informasi Pengguna
            </h2>
            <p className="text-gray-600">
              Detail lengkap tentang pengguna {user.name}
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 text-lg mb-5 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-blue-600" />
              Informasi Kontak
            </h3>
            <div className="space-y-4">
              <div className="flex items-center text-gray-700 p-4 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-semibold">{user.email}</p>
                </div>
              </div>
              
              {user.noTelp && (
                <div className="flex items-center text-gray-700 p-4 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">No. Telepon</p>
                    <p className="font-semibold">{user.noTelp}</p>
                  </div>
                </div>
              )}

              {user.alamat && (
                <div className="flex items-center text-gray-700 p-4 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Alamat</p>
                    <p className="font-semibold">{user.alamat}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Account Details */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 text-lg mb-5 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-purple-600" />
              Detail Akun
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-xs text-purple-700 font-semibold mb-1">User ID</p>
                <p className="text-sm font-mono text-purple-900 break-all">{user.id}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-700 font-semibold mb-1">Role</p>
                <p className="text-sm font-bold text-blue-900">{user.role}</p>
              </div>
            </div>
          </div>

          {/* Summary Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center">
              <UserCircle className="w-5 h-5 mr-2 text-indigo-600" />
              Ringkasan
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="text-xs text-gray-500 mb-1">Role</p>
                <p className="text-sm font-bold text-gray-800">{user.role}</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <p className="text-sm font-bold text-green-600">Aktif</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="text-xs text-gray-500 mb-1">Kontak</p>
                <p className="text-sm font-bold text-gray-800">
                  {user.noTelp ? "✓" : "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
