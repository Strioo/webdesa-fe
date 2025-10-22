"use client";

import { useState, useEffect } from "react";
import { X, User, Mail, Phone, MapPin, Shield, Eye, EyeOff } from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string;
  role: "VISITOR" | "WARGA" | "ADMIN";
  noTelp?: string;
  alamat?: string;
  createdAt: string;
}

interface CreateEditModalProps {
  user?: User;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<User> & { password?: string }) => void;
  isEdit?: boolean;
}

export default function CreateEditModal({
  user,
  isOpen,
  onClose,
  onSave,
  isEdit = false
}: CreateEditModalProps) {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    role: "VISITOR" as "VISITOR" | "WARGA" | "ADMIN",
    noTelp: "",
    alamat: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user && isEdit) {
      setFormData({
        email: user.email,
        name: user.name,
        role: user.role,
        noTelp: user.noTelp || "",
        alamat: user.alamat || "",
        password: ""
      });
    } else {
      setFormData({
        email: "",
        name: "",
        role: "VISITOR",
        noTelp: "",
        alamat: "",
        password: ""
      });
    }
  }, [user, isEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email) {
      alert("Nama dan Email wajib diisi!");
      return;
    }

    if (!isEdit && !formData.password) {
      alert("Password wajib diisi untuk user baru!");
      return;
    }

    const dataToSave: any = {
      email: formData.email,
      name: formData.name,
      role: formData.role,
      noTelp: formData.noTelp || undefined,
      alamat: formData.alamat || undefined,
    };

    // Only include password if it's provided
    if (formData.password) {
      dataToSave.password = formData.password;
    }

    onSave(dataToSave);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {isEdit ? "Edit User" : "Tambah User Baru"}
              </h2>
              <p className="text-sm text-gray-600">
                {isEdit ? "Update informasi user" : "Isi form untuk menambah user baru"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="contoh@email.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password {!isEdit && <span className="text-red-500">*</span>}
              {isEdit && <span className="text-gray-500 text-xs">(Kosongkan jika tidak ingin mengubah)</span>}
            </label>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-10 pr-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={isEdit ? "Masukkan password baru (opsional)" : "Masukkan password"}
                required={!isEdit}
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {!isEdit && (
              <p className="text-xs text-gray-500 mt-1">Minimal 6 karakter</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                required
              >
                <option value="VISITOR">Visitor</option>
                <option value="WARGA">Warga</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <div className="mt-2 space-y-1 text-xs">
              <p className="text-gray-500">
                <span className="font-semibold">VISITOR:</span> Pengunjung (akses terbatas)
              </p>
              <p className="text-gray-500">
                <span className="font-semibold">WARGA:</span> Warga desa (dapat membuat laporan)
              </p>
              <p className="text-gray-500">
                <span className="font-semibold">ADMIN:</span> Administrator (akses penuh)
              </p>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              No. Telepon
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="tel"
                value={formData.noTelp}
                onChange={(e) => setFormData({ ...formData, noTelp: e.target.value })}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="08xx xxxx xxxx"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alamat
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <textarea
                value={formData.alamat}
                onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Masukkan alamat lengkap"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isEdit ? "Update User" : "Tambah User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
