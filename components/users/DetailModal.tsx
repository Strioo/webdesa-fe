"use client";

import { X, User, Mail, Phone, MapPin, Shield, Calendar } from "lucide-react";

interface UserData {
  id: string;
  email: string;
  name: string;
  role: "VISITOR" | "WARGA" | "ADMIN";
  noTelp?: string;
  alamat?: string;
  createdAt: string;
}

interface DetailModalProps {
  user: UserData | null;
  isOpen: boolean;
  onClose: () => void;
}

const RoleBadge = ({ role }: { role: string }) => {
  const getRoleConfig = (role: string) => {
    switch (role) {
      case "ADMIN":
        return { color: "bg-red-100 text-red-800 border-red-200", label: "Admin" };
      case "WARGA":
        return { color: "bg-blue-100 text-blue-800 border-blue-200", label: "Warga" };
      case "VISITOR":
        return { color: "bg-gray-100 text-gray-800 border-gray-200", label: "Visitor" };
      default:
        return { color: "bg-gray-100 text-gray-800 border-gray-200", label: role };
    }
  };

  const config = getRoleConfig(role);

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${config.color}`}>
      <Shield className="w-3 h-3 mr-1.5" />
      {config.label}
    </span>
  );
};

export default function DetailModal({ user, isOpen, onClose }: DetailModalProps) {
  if (!isOpen || !user) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-5 flex items-center justify-between rounded-t-xl">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Detail User</h2>
              <p className="text-blue-100 text-sm">Informasi lengkap pengguna</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* User Avatar & Role */}
          <div className="flex items-center space-x-4 pb-6 border-b">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{user.email}</p>
              <div className="mt-2">
                <RoleBadge role={user.role} />
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600 font-medium">Email</p>
                  <p className="text-sm text-gray-900 font-medium mt-1">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Role */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600 font-medium">Role</p>
                  <p className="text-sm text-gray-900 font-medium mt-1">{user.role}</p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600 font-medium">No. Telepon</p>
                  <p className="text-sm text-gray-900 font-medium mt-1">
                    {user.noTelp || "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* Created At */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600 font-medium">Terdaftar Sejak</p>
                  <p className="text-sm text-gray-900 font-medium mt-1">
                    {formatDate(user.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          {user.alamat && (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <MapPin className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600 font-medium mb-2">Alamat</p>
                  <p className="text-sm text-gray-900 leading-relaxed">{user.alamat}</p>
                </div>
              </div>
            </div>
          )}

          {/* User ID */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-xs text-blue-600 font-medium mb-1">User ID</p>
            <p className="text-xs text-blue-900 font-mono">{user.id}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t rounded-b-xl flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
