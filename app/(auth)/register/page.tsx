"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Mail, Lock, User, MapPin, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "VISITOR" as "VISITOR", // ✅ Auto VISITOR only
    noTelp: "",
    alamat: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [shakeError, setShakeError] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Password tidak sama");
      setShakeError(true);
      setTimeout(() => setShakeError(false), 500);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password minimal 6 karakter");
      setShakeError(true);
      setTimeout(() => setShakeError(false), 500);
      return;
    }

    setLoading(true);

    try {
      const result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        noTelp: formData.noTelp || undefined,
        alamat: formData.alamat || undefined,
      });
      
      if (result.success) {
        setSuccess("Registrasi berhasil! Silakan login dengan akun Anda.");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(result.message || "Registrasi gagal");
        setShakeError(true);
        setTimeout(() => setShakeError(false), 500);
      }
    } catch (error) {
      setError("Terjadi kesalahan yang tidak terduga");
      setShakeError(true);
      setTimeout(() => setShakeError(false), 500);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError("");
    if (success) setSuccess("");
  };

  // Check if passwords match for real-time validation
  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;
  const passwordsDontMatch = formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword;

  return (
    <div className="min-h-screen flex bg-neutral-50">
      {/* Left Side - Form */}
      <motion.div 
        className="w-full lg:w-1/2 flex justify-center p-6 lg:p-12 relative overflow-y-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Logo - Floating Top Left */}
        <Link href="/" className="fixed top-8 left-6 sm:left-12 lg:left-16 xl:left-20 inline-flex items-center space-x-3 z-50 group">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-neutral-200 group-hover:border-[#5B903A] transition-colors">
            <Image
              src="/assets/icons/logo.png"
              alt="Logo Baturaden"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xl font-semibold text-[#5B903A]">Baturaden</span>
        </Link>

        {/* Back Button - Floating Top Right (mobile/tablet), Just Left of Image (desktop) */}
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          onClick={() => router.push('/')}
          whileHover={{ scale: 1.05, boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.95 }}
          className="fixed top-8 right-6 sm:right-12 lg:top-8 lg:left-[calc(50%-7rem)] lg:right-auto z-50 flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 hover:text-white bg-white/90 hover:bg-[#5B903A] backdrop-blur-sm border border-neutral-200 hover:border-[#5B903A] rounded-full shadow-sm transition-all duration-300 group"
          aria-label="Kembali ke beranda"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Kembali</span>
        </motion.button>

        {/* Content Container with Top Padding for Logo Space */}
        <div className="w-full max-w-xl pt-20 sm:pt-24 pb-6 my-auto">
          {/* Heading - Centered */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl lg:text-4xl font-semibold text-neutral-900 leading-tight mb-3">
              Daftar Akun Baru
            </h1>
            <p className="text-sm lg:text-base text-neutral-600 mx-auto max-w-md leading-relaxed">
              Bergabung dengan Sistem Informasi Desa Baturaden.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <motion.div 
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              aria-live="polite"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <span className="text-red-700 text-xs lg:text-sm">{error}</span>
            </motion.div>
          )}

          {/* Success Alert */}
          {success && (
            <motion.div 
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              aria-live="polite"
            >
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-green-700 text-xs lg:text-sm">{success}</span>
            </motion.div>
          )}

          {/* Form */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            animate={shakeError ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            {/* Row 1: Nama Lengkap & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Nama Lengkap */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 placeholder-neutral-400 transition-all duration-200"
                    placeholder="Wahid satrio aji"
                    aria-label="Nama Lengkap"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 placeholder-neutral-400 transition-all duration-200"
                    placeholder="johndoe@mail.com"
                    aria-label="Email"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Password & Konfirmasi Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-12 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 placeholder-neutral-400 transition-all duration-200"
                    placeholder="••••••••••"
                    aria-label="Password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer group"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    <motion.div
                      animate={{ rotate: showPassword ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-neutral-400 group-hover:text-green-600 transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-neutral-400 group-hover:text-green-600 transition-colors" />
                      )}
                    </motion.div>
                  </button>
                </div>
              </div>

              {/* Konfirmasi Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-2">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-green-500/20 placeholder-neutral-400 transition-all duration-200 ${
                      passwordsDontMatch 
                        ? 'border-red-300 focus:border-red-500' 
                        : passwordsMatch 
                        ? 'border-green-300 focus:border-green-500' 
                        : 'border-neutral-300 focus:border-green-500'
                    }`}
                    placeholder="••••••••••"
                    aria-label="Konfirmasi Password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-1">
                    {/* Password Match Indicator */}
                    {passwordsMatch && (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    )}
                    {passwordsDontMatch && (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                    {/* Toggle Button */}
                    <button
                      type="button"
                      className="cursor-pointer group"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label="Toggle confirm password visibility"
                    >
                      <motion.div
                        animate={{ rotate: showConfirmPassword ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-neutral-400 group-hover:text-green-600 transition-colors" />
                        ) : (
                          <Eye className="h-5 w-5 text-neutral-400 group-hover:text-green-600 transition-colors" />
                        )}
                      </motion.div>
                    </button>
                  </div>
                </div>
                {passwordsDontMatch && (
                  <p className="mt-1 text-xs text-red-600 flex items-center space-x-1">
                    <AlertCircle className="h-3 w-3" />
                    <span>Password tidak sama</span>
                  </p>
                )}
              </div>
            </div>

            {/* Row 3: Alamat */}
            <div>
              <label htmlFor="alamat" className="block text-sm font-medium text-neutral-700 mb-2">
                Alamat
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="alamat"
                  name="alamat"
                  type="text"
                  value={formData.alamat}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 placeholder-neutral-400 transition-all duration-200"
                  placeholder="Masukkan alamat lengkap"
                  aria-label="Alamat"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center space-x-2 py-3 px-6 rounded-full text-white font-semibold shadow-md hover:shadow-lg bg-[#5B903A] hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200"
            >
              {loading && (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              <span>{loading ? "Memproses..." : "Daftar Sekarang"}</span>
            </button>

            {/* Link to Login */}
            <div className="text-center">
              <p className="text-sm text-neutral-600">
                Sudah punya akun?{" "}
                <Link
                  href="/login"
                  className="font-medium text-[#5B903A] hover:text-green-700 underline-offset-4 hover:underline transition-colors"
                >
                  Masuk
                </Link>
              </p>
            </div>
          </motion.form>
        </div>
      </motion.div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-neutral-50 items-center justify-center p-6 xl:p-4">
        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="/assets/images/image-register.png"
            alt="Pemandangan Wisata Baturaden"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}