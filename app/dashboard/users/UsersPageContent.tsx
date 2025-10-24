"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Grid3x3, List, AlertCircle, Users, Shield, UserCheck } from "lucide-react";
import { userApi } from "@/lib/api";
import CreateEditModal from "@/components/users/CreateEditModal";
import DetailModal from "@/components/users/DetailModal";
import UserGridView from "@/components/users/UserGridView";
import UserTableView from "@/components/users/UserTableView";

interface User {
  id: string;
  email: string;
  name: string;
  role: "VISITOR" | "WARGA" | "ADMIN";
  noTelp?: string;
  alamat?: string;
  createdAt: string;
}

export default function UsersPageContent() {
  // ... semua logic dari UsersPage sebelumnya, copy paste semua state dan function
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
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, roleFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await userApi.getAll();
      
      if (response.success && response.data) {
        setUsers(Array.isArray(response.data) ? response.data : []);
      } else {
        setError(response.message || 'Gagal mengambil data user');
        setUsers([]);
      }
    } catch (error: any) {
      console.error("Error fetching users:", error);
      setError(error.message || 'Terjadi kesalahan saat mengambil data');
      setUsers([]);
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
        (user.noTelp && user.noTelp.includes(searchTerm))
      );
    }

    if (roleFilter !== "ALL") {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  };

  const handleCreate = async (data: Partial<User> & { password?: string }) => {
    try {
      const response = await userApi.create(data);
      
      if (response.success) {
        await fetchUsers();
        setIsCreateModalOpen(false);
      } else {
        alert(response.message || 'Gagal menambahkan user');
      }
    } catch (error: any) {
      console.error("Error creating user:", error);
      alert(error.message || 'Terjadi kesalahan saat menambahkan user');
    }
  };

  const handleEdit = async (data: Partial<User> & { password?: string }) => {
    try {
      if (editingUser) {
        const response = await userApi.update(editingUser.id, data);
        
        if (response.success) {
          await fetchUsers();
          setIsEditModalOpen(false);
          setEditingUser(null);
        } else {
          alert(response.message || 'Gagal mengupdate user');
        }
      }
    } catch (error: any) {
      console.error("Error updating user:", error);
      alert(error.message || 'Terjadi kesalahan saat mengupdate user');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      try {
        const response = await userApi.delete(id);
        
        if (response.success) {
          await fetchUsers();
        } else {
          alert(response.message || 'Gagal menghapus user');
        }
      } catch (error: any) {
        console.error("Error deleting user:", error);
        alert(error.message || 'Terjadi kesalahan saat menghapus user');
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
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data user...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Semua JSX dari component sebelumnya - copy paste dari baris 106 sampai akhir */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen User</h1>
          <p className="text-gray-600 mt-2">Kelola pengguna sistem</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah User
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
          <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-800">Terjadi Kesalahan</h3>
            <p className="text-red-600 text-sm">{error}</p>
            <button
              onClick={fetchUsers}
              className="mt-2 text-sm text-red-700 hover:text-red-800 underline"
            >
              Coba lagi
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total User</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Admin</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{stats.admins}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Warga</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{stats.warga}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <UserCheck className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Visitor</p>
              <p className="text-2xl font-bold text-gray-600 mt-1">{stats.visitors}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg">
              <Users className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
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
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="ALL">Semua Role</option>
                <option value="ADMIN">Admin</option>
                <option value="WARGA">Warga</option>
                <option value="VISITOR">Visitor</option>
              </select>

              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "grid"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  title="Grid View"
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "table"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  title="Table View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
            <span>Total: <span className="font-semibold text-gray-900">{users.length}</span></span>
            <span>•</span>
            <span>Ditampilkan: <span className="font-semibold text-gray-900">{filteredUsers.length}</span></span>
          </div>
        </div>

        <div className="p-6">
          {viewMode === "grid" ? (
            <UserGridView
              users={filteredUsers}
              onView={openDetailModal}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ) : (
            <UserTableView
              users={filteredUsers}
              onView={openDetailModal}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          )}
        </div>
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