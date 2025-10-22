"use client";

import { User, Mail, Phone, MapPin, Shield, Eye, Edit, Trash2 } from "lucide-react";

interface UserData {
  id: string;
  email: string;
  name: string;
  role: "VISITOR" | "WARGA" | "ADMIN";
  noTelp?: string;
  alamat?: string;
  createdAt: string;
}

interface UserTableViewProps {
  users: UserData[];
  onView: (user: UserData) => void;
  onEdit: (user: UserData) => void;
  onDelete: (id: string) => void;
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
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${config.color}`}>
      <Shield className="w-3 h-3 mr-1" />
      {config.label}
    </span>
  );
};

export default function UserTableView({ users, onView, onEdit, onDelete }: UserTableViewProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <User className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada user</h3>
        <p className="text-gray-600">Belum ada user yang terdaftar.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-6 py-4 text-left">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-semibold text-gray-700">User</span>
              </div>
            </th>
            <th className="px-6 py-4 text-left">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-semibold text-gray-700">Email</span>
              </div>
            </th>
            <th className="px-6 py-4 text-left">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-semibold text-gray-700">Role</span>
              </div>
            </th>
            <th className="px-6 py-4 text-left">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-semibold text-gray-700">Telepon</span>
              </div>
            </th>
            <th className="px-6 py-4 text-left">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-semibold text-gray-700">Alamat</span>
              </div>
            </th>
            <th className="px-6 py-4 text-center">
              <span className="text-sm font-semibold text-gray-700">Aksi</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-gray-50 transition-colors"
            >
              {/* User */}
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>
                </div>
              </td>

              {/* Email */}
              <td className="px-6 py-4">
                <p className="text-sm text-gray-900 truncate max-w-[200px]">
                  {user.email}
                </p>
              </td>

              {/* Role */}
              <td className="px-6 py-4">
                <RoleBadge role={user.role} />
              </td>

              {/* Phone */}
              <td className="px-6 py-4">
                <p className="text-sm text-gray-900">
                  {user.noTelp || "-"}
                </p>
              </td>

              {/* Address */}
              <td className="px-6 py-4">
                <p className="text-sm text-gray-900 truncate max-w-[200px]" title={user.alamat}>
                  {user.alamat || "-"}
                </p>
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex items-center justify-center space-x-2">
                  <button
                    onClick={() => onView(user)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Lihat Detail"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEdit(user)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Edit User"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Hapus User"
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
