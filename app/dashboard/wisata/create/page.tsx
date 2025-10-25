"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { wisataApi } from "@/lib/api";
import { extractCoordinatesFromMapsUrl, isValidGoogleMapsUrl, getCurrentLocation, formatCoordinates } from "@/lib/maps-utils";
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
  X,
  Link as LinkIcon,
  Navigation
} from "lucide-react";

export default function CreateWisataPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [mapsUrl, setMapsUrl] = useState("");
  const [extractingCoords, setExtractingCoords] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);

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

  const handleExtractCoordinates = async () => {
    if (!mapsUrl.trim()) {
      toast.error("Masukkan URL Google Maps terlebih dahulu");
      return;
    }

    if (!isValidGoogleMapsUrl(mapsUrl)) {
      toast.error("URL bukan link Google Maps yang valid");
      return;
    }

    try {
      setExtractingCoords(true);
      const coords = await extractCoordinatesFromMapsUrl(mapsUrl);
      
      if (coords) {
        setFormData({
          ...formData,
          latitude: coords.latitude.toString(),
          longitude: coords.longitude.toString()
        });
        toast.success(`Koordinat berhasil diambil: ${formatCoordinates(coords.latitude, coords.longitude)}`);
        setMapsUrl(""); // Clear input after success
      } else {
        toast.error("Gagal mengekstrak koordinat dari URL. Pastikan URL valid.");
      }
    } catch (error) {
      console.error("Error extracting coordinates:", error);
      toast.error("Terjadi kesalahan saat mengekstrak koordinat");
    } finally {
      setExtractingCoords(false);
    }
  };

  const handleGetCurrentLocation = async () => {
    try {
      setGettingLocation(true);
      const coords = await getCurrentLocation();
      
      if (coords) {
        setFormData({
          ...formData,
          latitude: coords.latitude.toString(),
          longitude: coords.longitude.toString()
        });
        toast.success(`Lokasi saat ini: ${formatCoordinates(coords.latitude, coords.longitude)}`);
      } else {
        toast.error("Gagal mendapatkan lokasi. Pastikan izin lokasi diaktifkan.");
      }
    } catch (error) {
      console.error("Error getting location:", error);
      toast.error("Terjadi kesalahan saat mendapatkan lokasi");
    } finally {
      setGettingLocation(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nama || !formData.deskripsi || !formData.lokasi) {
      toast.error("Mohon lengkapi data wajib (Nama, Deskripsi, Lokasi)");
      return;
    }

    try {
      setLoading(true);

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

      const response = await wisataApi.create(submitData);

      if (response.success) {
        toast.success("Wisata berhasil ditambahkan!");
        router.push("/dashboard/wisata");
      } else {
        throw new Error(response.message || "Gagal menambahkan wisata");
      }
    } catch (error: any) {
      console.error("Error creating wisata:", error);
      toast.error(error.message || "Gagal menambahkan wisata");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/dashboard/wisata")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          disabled={loading}
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tambah Wisata Baru</h1>
          <p className="text-gray-600 mt-1">Buat destinasi wisata baru untuk desa</p>
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

            {/* Google Maps URL Input */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <LinkIcon className="w-4 h-4 text-blue-600" />
                Ekstrak dari Google Maps URL
              </label>
              <p className="text-xs text-gray-600 mb-3">
                Copy-paste link Google Maps (contoh: https://maps.app.goo.gl/xxx atau https://www.google.com/maps/...)
              </p>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={mapsUrl}
                  onChange={(e) => setMapsUrl(e.target.value)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://maps.app.goo.gl/..."
                  disabled={extractingCoords}
                />
                <button
                  type="button"
                  onClick={handleExtractCoordinates}
                  disabled={extractingCoords || !mapsUrl.trim()}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                >
                  {extractingCoords ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="hidden sm:inline">Mengekstrak...</span>
                    </>
                  ) : (
                    <>
                      <Globe className="w-4 h-4" />
                      <span className="hidden sm:inline">Ekstrak</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Get Current Location */}
            <div className="mb-6">
              <button
                type="button"
                onClick={handleGetCurrentLocation}
                disabled={gettingLocation}
                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center gap-2 text-gray-700 font-medium"
              >
                {gettingLocation ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                    <span>Mendapatkan Lokasi GPS...</span>
                  </>
                ) : (
                  <>
                    <Navigation className="w-5 h-5 text-blue-600" />
                    <span>Gunakan Lokasi Saya Saat Ini</span>
                  </>
                )}
              </button>
            </div>

            {/* Manual Input */}
            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm font-medium text-gray-700 mb-4">Atau masukkan koordinat manual:</p>
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

              {/* Coordinate Preview */}
              {formData.latitude && formData.longitude && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-800 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Koordinat: {formatCoordinates(parseFloat(formData.latitude), parseFloat(formData.longitude))}
                  </p>
                  <a
                    href={`https://www.google.com/maps?q=${formData.latitude},${formData.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-700 underline mt-1 inline-block"
                  >
                    Lihat di Google Maps →
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => router.push("/dashboard/wisata")}
              className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Simpan Wisata</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
