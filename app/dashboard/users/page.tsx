"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Shield,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  X,
  UserCheck,
  UserX,
  Crown
} from "lucide-react";

interface User {
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
        return { color: "bg-red-100 text-red-800", icon: Crown, label: "Admin" };
      case "WARGA":
        return { color: "bg-blue-100 text-blue-800", icon: UserCheck, label: "Warga" };
      case "VISITOR":
        return { color: "bg-green-100 text-green-800", icon: User, label: "Visitor" };
      default:
        return { color: "bg-gray-100 text-gray-800", icon: User, label: role };
    }
  };

  const config = getRoleConfig(role);
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </span>
  );
};

const CreateEditModal = ({
  user,
  isOpen,
  onClose,
  onSave,
  isEdit = false
}: {
  user?: User;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<User>) => void;
  isEdit?: boolean;
}) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    role: "VISITOR" as "VISITOR" | "WARGA" | "ADMIN",
    noTelp: "",
    alamat: ""
  });

  useEffect(() => {
    if (user && isEdit) {
      setFormData({
        email: user.email,
        name: user.name,
        role: user.role,
        noTelp: user.noTelp || "",
        alamat: user.alamat || ""
      });
    } else {
      setFormData({
        email: "",
        name: "",
        role: "VISITOR",
        noTelp: "",
        alamat: ""
      });
    }
  }, [user, isEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {isEdit ? "Edit User" : "Tambah User Baru"}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="user@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nama lengkap"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role *
              </label>
              <select
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="VISITOR">Visitor</option>
                <option value="WARGA">Warga</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                No. Telepon
              </label>
              <input
                type="text"
                value={formData.noTelp}
                onChange={(e) => setFormData({ ...formData, noTelp: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="081234567890"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alamat
            </label>
            <textarea
              rows={3}
              value={formData.alamat}
              onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Alamat lengkap"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
            >
              {isEdit ? "Update" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DetailModal = ({
  user,
  isOpen,
  onClose
}: {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Detail User</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-blue-600" />
            </div>
            <h4 className="text-2xl font-semibold text-gray-900 mb-2">{user.name}</h4>
            <RoleBadge role={user.role} />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 mr-3 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{user.email}</p>
              </div>
            </div>

            {user.noTelp && (
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">No. Telepon</p>
                  <p className="font-medium text-gray-900">{user.noTelp}</p>
                </div>
              </div>
            )}

            {user.alamat && (
              <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 mr-3 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Alamat</p>
                  <p className="font-medium text-gray-900">{user.alamat}</p>
                </div>
              </div>
            )}

            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 mr-3 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Tanggal Daftar</p>
                <p className="font-medium text-gray-900">
                  {new Date(user.createdAt).toLocaleDateString('id-ID', {
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
      </div>
    </div>
  );
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, roleFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const mockData: User[] = [
        {
          id: "admin1",
          email: "admin@desa.id",
          name: "Administrator Desa",
          role: "ADMIN",
          noTelp: "081234567890",
          alamat: "Kantor Desa Suka Maju",
          createdAt: "2025-01-01T08:00:00.000Z"
        },
        {
          id: "user1",
          email: "budi@gmail.com",
          name: "Budi Santoso",
          role: "WARGA",
          noTelp: "081234567891",
          alamat: "Jl. Merdeka No. 10, RT 01/RW 02",
          createdAt: "2025-02-15T08:00:00.000Z"
        },
        {
          id: "user2",
          email: "siti@gmail.com",
          name: "Siti Nurhaliza",
          role: "WARGA",
          noTelp: "081234567892",
          alamat: "Jl. Pemuda No. 15, RT 02/RW 03",
          createdAt: "2025-03-10T08:00:00.000Z"
        },
        {
          id: "user3",
          email: "ahmad@gmail.com",
          name: "Ahmad Wijaya",
          role: "WARGA",
          noTelp: "081234567893",
          alamat: "Jl. Pancasila No. 8, RT 03/RW 01",
          createdAt: "2025-04-05T08:00:00.000Z"
        },
        {
          id: "user4",
          email: "tourist1@gmail.com",
          name: "Rina Setiawan",
          role: "VISITOR",
          noTelp: "081234567896",
          createdAt: "2025-09-20T08:00:00.000Z"
        },
        {
          id: "user5",
          email: "visitor2@gmail.com",
          name: "David Chen",
          role: "VISITOR",
          noTelp: "081234567897",
          createdAt: "2025-09-25T08:00:00.000Z"
        }
      ];
      setUsers(mockData);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.noTelp?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.alamat?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== "ALL") {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  };

  const handleCreate = async (data: Partial<User>) => {
    try {
      const newUser: User = {
        id: Date.now().toString(),
        email: data.email!,
        name: data.name!,
        role: data.role!,
        noTelp: data.noTelp,
        alamat: data.alamat,
        createdAt: new Date().toISOString()
      };
      setUsers(prev => [newUser, ...prev]);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleEdit = async (data: Partial<User>) => {
    try {
      if (editingUser) {
        setUsers(prev =>
          prev.map(user =>
            user.id === editingUser.id
              ? { ...user, ...data }
              : user
          )
        );
        setEditingUser(null);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      try {
        setUsers(prev => prev.filter(user => user.id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const openDetailModal = (user: User) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const getUserStats = () => {
    const total = users.length;
    const admins = users.filter(u => u.role === "ADMIN").length;
    const warga = users.filter(u => u.role === "WARGA").length;
    const visitors = users.filter(u => u.role === "VISITOR").length;

    return { total, admins, warga, visitors };
  };

  const stats = getUserStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Users</h1>
          <p className="text-gray-600 mt-2">Kelola pengguna sistem desa</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Admin</p>
              <p className="text-2xl font-bold text-red-600">{stats.admins}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <Crown className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Warga</p>
              <p className="text-2xl font-bold text-blue-600">{stats.warga}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <UserCheck className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Visitor</p>
              <p className="text-2xl font-bold text-green-600">{stats.visitors}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <UserX className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ALL">Semua Role</option>
              <option value="ADMIN">Admin</option>
              <option value="WARGA">Warga</option>
              <option value="VISITOR">Visitor</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Kontak</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Alamat</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Terdaftar</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <RoleBadge role={user.role} />
                  </td>
                  <td className="py-4 px-4">
                    {user.noTelp && (
                      <div className="flex items-center text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        <span className="text-sm">{user.noTelp}</span>
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    {user.alamat && (
                      <p className="text-sm text-gray-600 truncate max-w-xs">
                        {user.alamat}
                      </p>
                    )}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString('id-ID')}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openDetailModal(user)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Lihat Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openEditModal(user)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {user.role !== "ADMIN" && (
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Tidak ada user yang ditemukan</p>
          </div>
        )}
      </div>

      <CreateEditModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreate}
      />

      <CreateEditModal
        user={editingUser || undefined}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingUser(null);
        }}
        onSave={handleEdit}
        isEdit={true}
      />

      <DetailModal
        user={selectedUser}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />
    </div>
  );
}