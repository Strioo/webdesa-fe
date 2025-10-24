"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { wisataApi } from "@/lib/api";
import {
  ArrowLeft,
  Save,
  Loader2,
  MapPin,
  Clock,
  Phone,
  Image as ImageIcon,
  Tag,
  Globe,
  X
} from "lucide-react";

interface Wisata {
  id: string;
  nama: string;
  deskripsi: string;
  lokasi: string;
  kategori?: string;
  harga?: number;
  jamBuka?: string;
  jamTutup?: string;
  kontak?: string;
  foto?: string;
  latitude?: number;
  longitude?: number;
  rating?: number;
  isAktif: boolean;
  createdAt: string;
}

export default function EditWisataPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [wisata, setWisata] = useState<Wisata | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    lokasi: "",
    kategori: "",
    harga: "",
    jamBuka: "",
    jamTutup: "",
    kontak: "",
    latitude: "",
    longitude: "",
    isAktif: true
  });

  useEffect(() => {
    if (id) {
      fetchWisata();
    }
  }, [id]);

  const fetchWisata = async () => {
    try {
      setLoading(true);
      const response = await wisataApi.getById(id);
      
      if (response.success && response.data) {
        const data = response.data as Wisata;
        setWisata(data);
        setFormData({
          nama: data.nama,
          deskripsi: data.deskripsi,
          lokasi: data.lokasi,
          kategori: data.kategori || "",
          harga: data.harga?.toString() || "",
          jamBuka: data.jamBuka || "",
          jamTutup: data.jamTutup || "",
          kontak: data.kontak || "",
          latitude: data.latitude?.toString() || "",
          longitude: data.longitude?.toString() || "",
          isAktif: data.isAktif
        });
        if (data.foto) {
          setImagePreview(data.foto);
        }
      } else {
        throw new Error(response.message || "Gagal memuat data wisata");
      }
    } catch (error: any) {
      console.error("Error fetching wisata:", error);
      toast.error(error.message || "Gagal memuat data wisata");
      router.push("/dashboard/wisata");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Ukuran gambar maksimal 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("File harus berupa gambar");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nama || !formData.deskripsi || !formData.lokasi) {
      toast.error("Mohon lengkapi data wajib (Nama, Deskripsi, Lokasi)");
      return;
    }

    try {
      setSaving(true);

      const submitData = new FormData();
      submitData.append("nama", formData.nama);
      submitData.append("deskripsi", formData.deskripsi);
      submitData.append("lokasi", formData.lokasi);
      
      if (formData.kategori) submitData.append("kategori", formData.kategori);
      if (formData.harga) submitData.append("harga", formData.harga);
      if (formData.jamBuka) submitData.append("jamBuka", formData.jamBuka);
      if (formData.jamTutup) submitData.append("jamTutup", formData.jamTutup);
      if (formData.kontak) submitData.append("kontak", formData.kontak);
      if (formData.latitude) submitData.append("latitude", formData.latitude);
      if (formData.longitude) submitData.append("longitude", formData.longitude);
      submitData.append("isAktif", String(formData.isAktif));
      
      if (imageFile) {
        submitData.append("foto", imageFile);
      }

      const response = await wisataApi.update(id, submitData);

      if (response.success) {
        toast.success("Wisata berhasil diperbarui!");
        router.push("/dashboard/wisata");
      } else {
        throw new Error(response.message || "Gagal memperbarui wisata");
      }
    } catch (error: any) {
      console.error("Error updating wisata:", error);
      toast.error(error.message || "Gagal memperbarui wisata");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat data wisata...</p>
        </div>
      </div>
    );
  }

  if (!wisata) {
    return (
      <div className="text-center py-16">
        <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg font-medium">Wisata tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/dashboard/wisata")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          disabled={saving}
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Wisata</h1>
          <p className="text-gray-600 mt-1">Perbarui informasi destinasi wisata</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Image Upload */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm sticky top-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center text-lg">
              <ImageIcon className="w-5 h-5 mr-2 text-gray-600" />
              Foto Wisata
            </h3>
            
            <div className="space-y-4">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg border-2 border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview("");
                    }}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500 mb-1">Klik untuk upload foto</span>
                  <span className="text-xs text-gray-400">PNG, JPG maksimal 5MB</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              )}

              {!imageFile && wisata.foto && (
                <p className="text-xs text-gray-500 text-center">
                  Upload foto baru untuk mengubah
                </p>
              )}
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isAktif"
                  checked={formData.isAktif}
                  onChange={(e) => setFormData({ ...formData, isAktif: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="isAktif" className="text-sm font-medium text-gray-700">
                  Wisata Aktif
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Form Fields */}
        <div className="xl:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 text-lg mb-5">Informasi Dasar</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Wisata <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Contoh: Curug Cimahi"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.kategori}
                    onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Contoh: Air Terjun, Gunung, Pantai"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Deskripsikan wisata ini..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lokasi <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.lokasi}
                    onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Alamat lengkap wisata"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Operational Info */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 text-lg mb-5">Informasi Operasional</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Harga Tiket (Rp)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">Rp</span>
                  <input
                    type="number"
                    value={formData.harga}
                    onChange={(e) => setFormData({ ...formData, harga: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  No. Kontak
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.kontak}
                    onChange={(e) => setFormData({ ...formData, kontak: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="08xx-xxxx-xxxx"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jam Buka
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="time"
                    value={formData.jamBuka}
                    onChange={(e) => setFormData({ ...formData, jamBuka: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jam Tutup
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="time"
                    value={formData.jamTutup}
                    onChange={(e) => setFormData({ ...formData, jamTutup: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Coordinates */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 text-lg mb-5 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-blue-600" />
              Koordinat (Opsional)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Latitude
                </label>
                <input
                  type="number"
                  step="any"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="-6.9175"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Longitude
                </label>
                <input
                  type="number"
                  step="any"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="107.6191"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => router.push("/dashboard/wisata")}
              className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              disabled={saving}
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Simpan Perubahan</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
