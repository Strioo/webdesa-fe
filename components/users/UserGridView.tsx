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

interface UserGridViewProps {
  users: UserData[];
  onView: (user: UserData) => void;
  onEdit: (user: UserData) => void;
  onDelete: (id: string) => void;
}

const RoleBadge = ({ role }: { role: string }) => {
  const getRoleConfig = (role: string) => {
    switch (role) {
      case "ADMIN":
        return { color: "bg-red-100 text-red-800 border-red-200", label: "Admin", icon: Shield };
      case "WARGA":
        return { color: "bg-blue-100 text-blue-800 border-blue-200", label: "Warga", icon: User };
      case "VISITOR":
        return { color: "bg-gray-100 text-gray-800 border-gray-200", label: "Visitor", icon: User };
      default:
        return { color: "bg-gray-100 text-gray-800 border-gray-200", label: role, icon: User };
    }
  };

  const config = getRoleConfig(role);
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${config.color}`}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </span>
  );
};

export default function UserGridView({ users, onView, onEdit, onDelete }: UserGridViewProps) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <div
          key={user.id}
          className="bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
        >
          {/* Card Header with Avatar */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 relative">
            <div className="flex items-start justify-between">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold shadow-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <RoleBadge role={user.role} />
            </div>
            
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full -mr-12 -mb-12"></div>
          </div>

          {/* Card Body */}
          <div className="p-6 space-y-4">
            {/* Name */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                {user.name}
              </h3>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="line-clamp-1">{user.email}</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              {user.noTelp && (
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" />
                  <span>{user.noTelp}</span>
                </div>
              )}
              {user.alamat && (
                <div className="flex items-start text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400 mt-0.5" />
                  <span className="line-clamp-2">{user.alamat}</span>
                </div>
              )}
            </div>
          </div>

          {/* Card Footer - Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end space-x-2">
            <button
              onClick={() => onView(user)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group"
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
        </div>
      ))}
    </div>
  );
}
