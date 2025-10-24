"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { umkmApi } from "@/lib/api";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  MapPin,
  User,
  Phone,
  Clock,
  Store,
  Save,
  Loader2,
  Image as ImageIcon,
  Tag,
  Package,
  Calendar
} from "lucide-react";

interface UMKM {
  id: string;
  nama: string;
  slug?: string;
  pemilik: string;
  deskripsi: string;
  kategori: string;
  alamat: string;
  kontak?: string;
  produk?: string;
  harga?: string;
  foto?: string;
  jamBuka?: string;
  jamTutup?: string;
  isAktif: boolean;
  createdAt: string;
}

export default function DetailUMKMPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [umkm, setUmkm] = useState<UMKM | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    nama: "",
    slug: "",
    pemilik: "",
    deskripsi: "",
    kategori: "",
    alamat: "",
    kontak: "",
    produk: "",
    harga: "",
    jamBuka: "",
    jamTutup: "",
    isAktif: true,
  });
  
  // Image upload states
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (id) {
      fetchUMKM();
    }
  }, [id]);

  useEffect(() => {
    if (umkm) {
      setFormData({
        nama: umkm.nama,
        slug: umkm.slug || "",
        pemilik: umkm.pemilik,
        deskripsi: umkm.deskripsi,
        kategori: umkm.kategori,
        alamat: umkm.alamat,
        kontak: umkm.kontak || "",
        produk: umkm.produk || "",
        harga: umkm.harga || "",
        jamBuka: umkm.jamBuka || "",
        jamTutup: umkm.jamTutup || "",
        isAktif: umkm.isAktif,
      });
      
      // Set initial image preview
      if (umkm.foto) {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://192.168.18.3:5000";
        setImagePreview(umkm.foto.startsWith('http') ? umkm.foto : `${baseUrl}${umkm.foto}`);
      }
    }
  }, [umkm]);

  const fetchUMKM = async () => {
    try {
      setLoading(true);
      const response = await umkmApi.getById(id);
      
      if (response.success && response.data) {
        const data = response.data as UMKM;
        setUmkm(data);
      } else {
        throw new Error(response.message || "Gagal memuat data UMKM");
      }
    } catch (error: any) {
      console.error("Error fetching UMKM:", error);
      toast.error(error.message || "Gagal memuat data UMKM");
      router.push("/dashboard/umkm");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('File harus berupa gambar');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Ukuran file maksimal 5MB');
        return;
      }
      
      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!umkm) return;

    try {
      setSubmitting(true);
      
      // Prepare form data with image upload
      const submitData: any = { ...formData };
      
      // If there's a new image, we'll need to handle it differently
      // For now, keeping foto field as URL
      if (selectedImage) {
        // Note: Backend needs to support file upload
        // This might need modification based on your backend API
        toast.info('Image upload akan ditambahkan di backend');
      }

      const response = await umkmApi.update(umkm.id, submitData);

      if (response.success) {
        toast.success("UMKM berhasil diperbarui!");
        setIsEditing(false);
        await fetchUMKM(); // Refresh data
      } else {
        throw new Error(response.message || "Gagal memperbarui UMKM");
      }
    } catch (error: any) {
      console.error("Error updating UMKM:", error);
      toast.error(error.message || "Gagal memperbarui UMKM");
    } finally {
      setSubmitting(false);
    }
  };

  const getImageUrl = (foto: string | null | undefined): string => {
    if (!foto) return "/assets/images/placeholder.jpg";
    if (foto.startsWith("http")) return foto;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://192.168.18.3:5000";
    return `${baseUrl}${foto}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat detail UMKM...</p>
        </div>
      </div>
    );
  }

  if (!umkm) {
    return (
      <div className="text-center py-16">
        <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg font-medium">UMKM tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/dashboard/umkm")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditing ? "Edit UMKM" : "Detail UMKM"}
            </h1>
            <p className="text-gray-600 mt-1">
              {isEditing ? "Ubah informasi UMKM" : "Informasi lengkap UMKM"}
            </p>
          </div>
        </div>
        
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-semibold"
          >
            Edit UMKM
          </button>
        )}
      </div>

      {isEditing ? (
        /* Edit Mode - Form */
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Image Upload */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm sticky top-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center text-lg">
                  <ImageIcon className="w-5 h-5 mr-2 text-gray-600" />
                  Foto UMKM
                </h3>
                
                <div className="space-y-4">
                  <div className="relative group">
                    <img
                      src={imagePreview || getImageUrl(umkm.foto)}
                      alt={formData.nama}
                      className="w-full h-64 object-cover rounded-lg border-2 border-gray-300 transition-transform group-hover:scale-[1.02]"
                      onError={(e) => {
                        e.currentTarget.src = "/assets/images/placeholder.jpg";
                      }}
                    />
                    {selectedImage && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Gambar Baru
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Upload Gambar Baru
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Format: JPG, PNG. Maksimal 5MB
                    </p>
                  </div>
                  
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                    <input
                      type="checkbox"
                      id="isAktif"
                      checked={formData.isAktif}
                      onChange={(e) =>
                        setFormData({ ...formData, isAktif: e.target.checked })
                      }
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="isAktif"
                      className="ml-3 text-sm font-medium text-gray-700"
                    >
                      UMKM sedang beroperasi (Aktif)
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form Fields */}
            <div className="xl:col-span-2 space-y-6">
              <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm space-y-5">
                <h3 className="font-bold text-gray-900 text-lg pb-4 border-b border-gray-200">
                  Informasi Dasar
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nama UMKM <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nama}
                      onChange={(e) => {
                        const nama = e.target.value;
                        const slug = nama
                          .toLowerCase()
                          .replace(/[^a-z0-9\s-]/g, "")
                          .trim()
                          .replace(/\s+/g, "-")
                          .replace(/-+/g, "-");
                        setFormData({ ...formData, nama, slug });
                      }}
                      className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Masukkan nama UMKM"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Slug (URL) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="contoh: warung-makan-bu-siti"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      URL: /umkm/{formData.slug || "slug-anda"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nama Pemilik <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.pemilik}
                      onChange={(e) =>
                        setFormData({ ...formData, pemilik: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Nama pemilik"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Kategori <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.kategori}
                      onChange={(e) =>
                        setFormData({ ...formData, kategori: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="">Pilih kategori</option>
                      <option value="Makanan & Minuman">Makanan & Minuman</option>
                      <option value="Kerajinan">Kerajinan</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Pertanian">Pertanian</option>
                      <option value="Jasa">Jasa</option>
                      <option value="Teknologi">Teknologi</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Deskripsi <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.deskripsi}
                    onChange={(e) =>
                      setFormData({ ...formData, deskripsi: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    placeholder="Deskripsikan UMKM ini..."
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm space-y-5">
                <h3 className="font-bold text-gray-900 text-lg pb-4 border-b border-gray-200">
                  Kontak & Lokasi
                </h3>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Alamat Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.alamat}
                    onChange={(e) =>
                      setFormData({ ...formData, alamat: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Jl. Contoh No. 123 RT/RW"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nomor Kontak
                  </label>
                  <input
                    type="text"
                    value={formData.kontak}
                    onChange={(e) =>
                      setFormData({ ...formData, kontak: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="081234567890"
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm space-y-5">
                <h3 className="font-bold text-gray-900 text-lg pb-4 border-b border-gray-200">
                  Produk & Operasional
                </h3>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Produk/Layanan
                  </label>
                  <textarea
                    rows={3}
                    value={formData.produk}
                    onChange={(e) =>
                      setFormData({ ...formData, produk: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    placeholder="Daftar produk atau layanan yang ditawarkan"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Range Harga
                    </label>
                    <input
                      type="text"
                      value={formData.harga}
                      onChange={(e) =>
                        setFormData({ ...formData, harga: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Rp 10.000 - Rp 50.000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Jam Buka
                    </label>
                    <input
                      type="time"
                      value={formData.jamBuka}
                      onChange={(e) =>
                        setFormData({ ...formData, jamBuka: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Jam Tutup
                    </label>
                    <input
                      type="time"
                      value={formData.jamTutup}
                      onChange={(e) =>
                        setFormData({ ...formData, jamTutup: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setSelectedImage(null);
                    setImagePreview("");
                    // Reset form data
                    if (umkm) {
                      setFormData({
                        nama: umkm.nama,
                        slug: umkm.slug || "",
                        pemilik: umkm.pemilik,
                        deskripsi: umkm.deskripsi,
                        kategori: umkm.kategori,
                        alamat: umkm.alamat,
                        kontak: umkm.kontak || "",
                        produk: umkm.produk || "",
                        harga: umkm.harga || "",
                        jamBuka: umkm.jamBuka || "",
                        jamTutup: umkm.jamTutup || "",
                        isAktif: umkm.isAktif,
                      });
                    }
                  }}
                  disabled={submitting}
                  className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-semibold disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      Simpan Perubahan
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        /* View Mode - Display */
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Image & Status */}
          <div className="xl:col-span-1 space-y-6">
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center text-lg">
                <ImageIcon className="w-5 h-5 mr-2 text-gray-600" />
                Foto UMKM
              </h3>
              <img
                src={getImageUrl(umkm.foto)}
                alt={umkm.nama}
                className="w-full h-64 object-cover rounded-lg border-2 border-gray-300"
                onError={(e) => {
                  e.currentTarget.src = "/assets/images/placeholder.jpg";
                }}
              />
            </div>

            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">Status</h3>
              <span
                className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold ${
                  umkm.isAktif
                    ? "bg-green-100 text-green-800 border-2 border-green-300"
                    : "bg-red-100 text-red-800 border-2 border-red-300"
                }`}
              >
                {umkm.isAktif ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-1.5" />
                    Aktif Beroperasi
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 mr-1.5" />
                    Tidak Aktif
                  </>
                )}
              </span>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    Terdaftar sejak{" "}
                    {new Date(umkm.createdAt).toLocaleDateString("id-ID", {
                      day: 'numeric',
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="xl:col-span-2 space-y-6">
            {/* Header Card */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    {umkm.nama}
                  </h2>
                  <span className="inline-flex items-center px-4 py-1.5 bg-blue-600 text-white text-sm rounded-full font-medium">
                    <Tag className="w-3.5 h-3.5 mr-1.5" />
                    {umkm.kategori}
                  </span>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mt-4">{umkm.deskripsi}</p>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 text-lg mb-5 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Informasi Kontak
              </h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-700 p-3 bg-gray-50 rounded-lg">
                  <User className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Pemilik</p>
                    <p className="font-semibold">{umkm.pemilik}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-700 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Alamat</p>
                    <p className="font-semibold">{umkm.alamat}</p>
                  </div>
                </div>
                {umkm.kontak && (
                  <div className="flex items-center text-gray-700 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Kontak</p>
                      <p className="font-semibold">{umkm.kontak}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Operational Information */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 text-lg mb-5 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Informasi Operasional
              </h3>
              <div className="space-y-4">
                {(umkm.jamBuka || umkm.jamTutup) && (
                  <div className="flex items-center text-gray-700 p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Jam Operasional</p>
                      <p className="font-semibold">
                        {umkm.jamBuka || "00:00"} - {umkm.jamTutup || "23:59"}
                      </p>
                    </div>
                  </div>
                )}
                {umkm.harga && (
                  <div className="flex items-center text-gray-700 p-3 bg-gray-50 rounded-lg">
                    <span className="mr-3 text-blue-600 flex-shrink-0 font-bold text-lg">Rp</span>
                    <div>
                      <p className="text-xs text-gray-500">Range Harga</p>
                      <p className="font-semibold">{umkm.harga}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Products/Services */}
            {umkm.produk && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center text-lg">
                  <Package className="w-5 h-5 mr-2 text-green-600" />
                  Produk/Layanan
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {umkm.produk}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
