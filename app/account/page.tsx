"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { userApi } from "@/lib/api";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Key,
  Edit2,
  Save,
  X,
  Loader2,
  CheckCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { toast } from "sonner";

interface ProfileData {
  name: string;
  email: string;
  noTelp: string;
  alamat: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function AccountPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    noTelp: '',
    alamat: ''
  });
  
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<{
    profile?: Record<string, string>;
    password?: Record<string, string>;
  }>({});

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?from=/account');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        noTelp: user.noTelp || '',
        alamat: user.alamat || ''
      });
    }
  }, [user]);

  const validateProfile = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!profileData.name.trim()) {
      newErrors.name = 'Nama lengkap wajib diisi';
    } else if (profileData.name.trim().length < 3) {
      newErrors.name = 'Nama minimal 3 karakter';
    }
    
    if (!profileData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    if (!profileData.noTelp.trim()) {
      newErrors.noTelp = 'Nomor telepon wajib diisi';
    } else if (!/^(\+62|62|0)[0-9]{9,12}$/.test(profileData.noTelp.replace(/\s|-/g, ''))) {
      newErrors.noTelp = 'Format nomor telepon tidak valid';
    }
    
    setErrors({ ...errors, profile: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Password lama wajib diisi';
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'Password baru wajib diisi';
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'Password minimal 6 karakter';
    }
    
    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password wajib diisi';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }
    
    setErrors({ ...errors, password: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateProfile = async () => {
    if (!validateProfile() || !user) return;
    
    try {
      setLoading(true);
      
      const response = await userApi.update(user.id, {
        name: profileData.name,
        email: profileData.email,
        noTelp: profileData.noTelp,
        alamat: profileData.alamat,
        role: user.role
      });
      
      if (response.success) {
        toast.success('Profil berhasil diperbarui!');
        setIsEditingProfile(false);
        
        // Refresh auth state
        window.location.reload();
      } else {
        throw new Error(response.message || 'Gagal memperbarui profil');
      }
    } catch (error: any) {
      console.error('Update profile error:', error);
      toast.error(error.message || 'Gagal memperbarui profil');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!validatePassword() || !user) return;
    
    try {
      setLoading(true);
      
      // First verify current password by attempting login
      const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          password: passwordData.currentPassword
        })
      });
      
      if (!loginResponse.ok) {
        throw new Error('Password lama tidak sesuai');
      }
      
      // Update password
      const response = await userApi.update(user.id, {
        password: passwordData.newPassword,
        email: user.email,
        name: user.name,
        role: user.role,
        noTelp: user.noTelp,
        alamat: user.alamat
      });
      
      if (response.success) {
        toast.success('Password berhasil diperbarui!');
        setIsEditingPassword(false);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        throw new Error(response.message || 'Gagal memperbarui password');
      }
    } catch (error: any) {
      console.error('Update password error:', error);
      toast.error(error.message || 'Gagal memperbarui password');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelProfile = () => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        noTelp: user.noTelp || '',
        alamat: user.alamat || ''
      });
    }
    setIsEditingProfile(false);
    setErrors({});
  };

  const handleCancelPassword = () => {
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setIsEditingPassword(false);
    setErrors({});
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#5B903A] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat data akun...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Pengaturan Akun</h1>
            <p className="text-gray-600">Kelola informasi pribadi dan keamanan akun Anda</p>
          </div>

          <div className="space-y-6">
            {/* Profile Information Card */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="bg-gradient-to-r from-[#5B903A] to-[#4A7A2E] p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-2xl font-bold">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </div>
                  <div className="text-white">
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-sm text-white/80">
                      {user.role === 'ADMIN' ? 'Administrator' : user.role === 'WARGA' ? 'Warga Desa' : 'Pengunjung'}
                    </p>
                  </div>
                </div>
                
                {!isEditingProfile && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="px-4 py-2 bg-white text-[#5B903A] rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profil
                  </button>
                )}
              </div>

              <div className="p-6 space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    Nama Lengkap
                  </label>
                  {isEditingProfile ? (
                    <div>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#5B903A] focus:border-[#5B903A] transition-colors ${
                          errors.profile?.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Masukkan nama lengkap"
                      />
                      {errors.profile?.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.profile.name}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-900 font-medium">{user.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    Email
                  </label>
                  {isEditingProfile ? (
                    <div>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#5B903A] focus:border-[#5B903A] transition-colors ${
                          errors.profile?.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="email@example.com"
                      />
                      {errors.profile?.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.profile.email}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-900 font-medium">{user.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    Nomor Telepon
                  </label>
                  {isEditingProfile ? (
                    <div>
                      <input
                        type="tel"
                        value={profileData.noTelp}
                        onChange={(e) => setProfileData({ ...profileData, noTelp: e.target.value })}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#5B903A] focus:border-[#5B903A] transition-colors ${
                          errors.profile?.noTelp ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="08123456789"
                      />
                      {errors.profile?.noTelp && (
                        <p className="text-red-500 text-sm mt-1">{errors.profile.noTelp}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-900 font-medium">{user.noTelp || '-'}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    Alamat
                  </label>
                  {isEditingProfile ? (
                    <textarea
                      value={profileData.alamat}
                      onChange={(e) => setProfileData({ ...profileData, alamat: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B903A] focus:border-[#5B903A] transition-colors resize-none"
                      placeholder="Masukkan alamat lengkap"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{user.alamat || '-'}</p>
                  )}
                </div>

                {/* Role Badge */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-500" />
                    Role
                  </label>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#F0F7ED] text-[#5B903A] border border-[#5B903A]/20">
                    {user.role === 'ADMIN' ? 'Administrator' : user.role === 'WARGA' ? 'Warga Desa' : 'Pengunjung'}
                  </span>
                </div>

                {/* Action Buttons */}
                {isEditingProfile && (
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={handleCancelProfile}
                      disabled={loading}
                      className="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium disabled:opacity-50 flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Batal
                    </button>
                    <button
                      onClick={handleUpdateProfile}
                      disabled={loading}
                      className="px-6 py-2.5 bg-[#5B903A] text-white hover:bg-[#4A7A2E] rounded-lg transition-colors font-medium disabled:opacity-50 flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Menyimpan...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Simpan Perubahan
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Password Security Card */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Key className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-white">
                    <h2 className="text-xl font-bold">Keamanan Password</h2>
                    <p className="text-sm text-white/80">Ubah password untuk keamanan akun</p>
                  </div>
                </div>
                
                {!isEditingPassword && (
                  <button
                    onClick={() => setIsEditingPassword(true)}
                    className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Ubah Password
                  </button>
                )}
              </div>

              {isEditingPassword && (
                <div className="p-6 space-y-6">
                  {/* Current Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password Lama
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.password?.currentPassword ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Masukkan password lama"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password?.currentPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.password.currentPassword}</p>
                    )}
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password Baru
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.password?.newPassword ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Masukkan password baru (min. 6 karakter)"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password?.newPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.password.newPassword}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Konfirmasi Password Baru
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.password?.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Ulangi password baru"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password?.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.password.confirmPassword}</p>
                    )}
                  </div>

                  {/* Info Box */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">Tips Password Aman:</p>
                        <ul className="list-disc list-inside space-y-1 text-blue-700">
                          <li>Minimal 6 karakter</li>
                          <li>Kombinasi huruf besar, kecil, dan angka</li>
                          <li>Hindari menggunakan informasi pribadi</li>
                          <li>Jangan gunakan password yang sama di aplikasi lain</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={handleCancelPassword}
                      disabled={loading}
                      className="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium disabled:opacity-50 flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Batal
                    </button>
                    <button
                      onClick={handleUpdatePassword}
                      disabled={loading}
                      className="px-6 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-medium disabled:opacity-50 flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Memperbarui...
                        </>
                      ) : (
                        <>
                          <Key className="w-4 h-4" />
                          Perbarui Password
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
              
              {!isEditingPassword && (
                <div className="p-6">
                  <p className="text-gray-600 text-sm">
                    Password terakhir diubah: <span className="font-medium text-gray-900">Belum pernah</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}