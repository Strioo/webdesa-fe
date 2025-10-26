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
  Edit2,
  Save,
  X,
  Loader2
} from "lucide-react";
import { toast } from "sonner";

interface ProfileData {
  name: string;
  email: string;
  noTelp: string;
  alamat: string;
}

export default function AccountPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    noTelp: '',
    alamat: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    
    setErrors(newErrors);
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
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
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
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Masukkan nama lengkap"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-900 font-medium">{user.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
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
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="email@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-900 font-medium">{user.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
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
                          errors.noTelp ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="08123456789"
                      />
                      {errors.noTelp && (
                        <p className="text-red-500 text-sm mt-1">{errors.noTelp}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-900 font-medium">{user.noTelp || '-'}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
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
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
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
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}