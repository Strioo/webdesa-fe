"use client";

import { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";

interface Fasilitas {
  nama: string;
  icon: string;
}

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
  gambar?: string[];
  fasilitas?: Fasilitas[];
  latitude?: number;
  longitude?: number;
  isAktif: boolean;
  createdAt: string;
}

interface CreateEditModalProps {
  wisata?: Wisata;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Wisata>) => void;
  isEdit?: boolean;
}

const FACILITY_ICONS = [
  { value: 'parking', label: 'Parkir' },
  { value: 'restroom', label: 'Toilet' },
  { value: 'restaurant', label: 'Restoran' },
  { value: 'cafe', label: 'Kafe' },
  { value: 'store', label: 'Toko' },
  { value: 'guide', label: 'Pemandu' },
  { value: 'picnic', label: 'Area Piknik' },
  { value: 'camera', label: 'Area Foto' },
  { value: 'pavilion', label: 'Gazebo' },
];

export default function CreateEditModal({
  wisata,
  isOpen,
  onClose,
  onSave,
  isEdit = false
}: CreateEditModalProps) {
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    lokasi: "",
    kategori: "",
    harga: "",
    jamBuka: "",
    jamTutup: "",
    kontak: "",
    foto: "",
    latitude: "",
    longitude: "",
    isAktif: true
  });

  const [gambarUrls, setGambarUrls] = useState<string[]>([]);
  const [newGambarUrl, setNewGambarUrl] = useState("");
  const [fasilitas, setFasilitas] = useState<Fasilitas[]>([]);
  const [newFasilitas, setNewFasilitas] = useState({ nama: "", icon: "parking" });

  useEffect(() => {
    if (wisata && isEdit) {
      setFormData({
        nama: wisata.nama,
        deskripsi: wisata.deskripsi,
        lokasi: wisata.lokasi,
        kategori: wisata.kategori || "",
        harga: wisata.harga?.toString() || "",
        jamBuka: wisata.jamBuka || "",
        jamTutup: wisata.jamTutup || "",
        kontak: wisata.kontak || "",
        foto: wisata.foto || "",
        latitude: wisata.latitude?.toString() || "",
        longitude: wisata.longitude?.toString() || "",
        isAktif: wisata.isAktif
      });
      setGambarUrls(wisata.gambar || []);
      setFasilitas(wisata.fasilitas || []);
    } else {
      setFormData({
        nama: "",
        deskripsi: "",
        lokasi: "",
        kategori: "",
        harga: "",
        jamBuka: "",
        jamTutup: "",
        kontak: "",
        foto: "",
        latitude: "",
        longitude: "",
        isAktif: true
      });
      setGambarUrls([]);
      setFasilitas([]);
    }
  }, [wisata, isEdit, isOpen]);

  const handleAddGambar = () => {
    if (newGambarUrl.trim()) {
      setGambarUrls([...gambarUrls, newGambarUrl.trim()]);
      setNewGambarUrl("");
    }
  };

  const handleRemoveGambar = (index: number) => {
    setGambarUrls(gambarUrls.filter((_, i) => i !== index));
  };

  const handleAddFasilitas = () => {
    if (newFasilitas.nama.trim()) {
      setFasilitas([...fasilitas, newFasilitas]);
      setNewFasilitas({ nama: "", icon: "parking" });
    }
  };

  const handleRemoveFasilitas = (index: number) => {
    setFasilitas(fasilitas.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      harga: formData.harga ? parseInt(formData.harga) : undefined,
      latitude: formData.latitude ? parseFloat(formData.latitude) : undefined,
      longitude: formData.longitude ? parseFloat(formData.longitude) : undefined,
      gambar: gambarUrls,
      fasilitas: fasilitas
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {isEdit ? "Edit Wisata" : "Tambah Wisata Baru"}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Informasi Dasar</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Wisata *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Masukkan nama wisata"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori
                </label>
                <select
                  value={formData.kategori}
                  onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Pilih kategori</option>
                  <option value="Alam">Alam</option>
                  <option value="Budaya">Budaya</option>
                  <option value="Sejarah">Sejarah</option>
                  <option value="Agrowisata">Agrowisata</option>
                  <option value="Kuliner">Kuliner</option>
                  <option value="Adventure">Adventure</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi *
              </label>
              <textarea
                required
                rows={4}
                value={formData.deskripsi}
                onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Deskripsikan wisata ini..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lokasi *
              </label>
              <input
                type="text"
                required
                value={formData.lokasi}
                onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Alamat lengkap lokasi wisata"
              />
            </div>
          </div>

          {/* Price & Hours */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Harga & Jam Operasional</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Harga Tiket (Rp)
                </label>
                <input
                  type="number"
                  value={formData.harga}
                  onChange={(e) => setFormData({ ...formData, harga: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jam Buka
                </label>
                <input
                  type="time"
                  value={formData.jamBuka}
                  onChange={(e) => setFormData({ ...formData, jamBuka: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jam Tutup
                </label>
                <input
                  type="time"
                  value={formData.jamTutup}
                  onChange={(e) => setFormData({ ...formData, jamTutup: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Galeri Gambar</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foto Utama (URL)
              </label>
              <input
                type="url"
                value={formData.foto}
                onChange={(e) => setFormData({ ...formData, foto: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/foto.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gambar Tambahan
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="url"
                  value={newGambarUrl}
                  onChange={(e) => setNewGambarUrl(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/gambar.jpg"
                />
                <button
                  type="button"
                  onClick={handleAddGambar}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Tambah
                </button>
              </div>
              
              {gambarUrls.length > 0 && (
                <div className="space-y-2">
                  {gambarUrls.map((url, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <span className="flex-1 text-sm text-gray-600 truncate">{url}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveGambar(index)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Facilities */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Fasilitas</h4>
            
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newFasilitas.nama}
                onChange={(e) => setNewFasilitas({ ...newFasilitas, nama: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nama fasilitas"
              />
              <select
                value={newFasilitas.icon}
                onChange={(e) => setNewFasilitas({ ...newFasilitas, icon: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {FACILITY_ICONS.map(icon => (
                  <option key={icon.value} value={icon.value}>{icon.label}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddFasilitas}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Tambah
              </button>
            </div>
            
            {fasilitas.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {fasilitas.map((fas, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">{fas.nama}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFasilitas(index)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Location Coordinates */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Koordinat Lokasi (untuk Google Maps)</h4>
            
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="-7.3119"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="109.2394"
                />
              </div>
            </div>
          </div>

          {/* Contact & Status */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kontak
              </label>
              <input
                type="text"
                value={formData.kontak}
                onChange={(e) => setFormData({ ...formData, kontak: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nomor telepon"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Foto
              </label>
              <input
                type="url"
                value={formData.foto}
                onChange={(e) => setFormData({ ...formData, foto: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/foto.jpg"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isAktif"
              checked={formData.isAktif}
              onChange={(e) => setFormData({ ...formData, isAktif: e.target.checked })}
              className="mr-2 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isAktif" className="text-sm font-medium text-gray-700">
              Wisata Aktif
            </label>
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
}
