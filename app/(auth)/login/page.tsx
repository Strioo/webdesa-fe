"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Mail, Lock, AlertCircle, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
  // ========== PRESERVE: Existing state management (NO CHANGES) ==========
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  // ========== PRESERVE: Existing handlers (NO CHANGES) ==========
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      
      if (!result.success) {
        setError(result.message || "Login gagal");
      }
      // ✅ Redirect handled by auth context based on role
    } catch (error) {
      setError("Terjadi kesalahan yang tidak terduga");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError("");
  };

  return (
    <div className="min-h-screen flex">
      {/* ==================== LEFT SIDE: FORM CONTAINER ==================== */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 py-20 sm:py-24 bg-neutral-50 relative overflow-y-auto">
        {/* Logo & Branding - Floating Top Left */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed top-8 left-6 sm:left-12 lg:left-16 xl:left-20 flex items-center gap-3 z-50"
        >
          <Image
            src="/assets/icons/logo.png"
            alt="Logo Baturaden"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
          <span className="text-xl font-semibold text-[#5B903A]">Baturaden</span>
        </motion.div>

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

        {/* Form Container - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-md w-full mx-auto"
        >
          {/* Heading - Centered */}
          <h1 className="text-4xl font-semibold text-neutral-900 leading-tight mb-3 text-center">
            Selamat Datang
          </h1>

          {/* Subtitle - Centered */}
          <p className="text-base text-neutral-600 leading-relaxed mb-10 mx-auto text-center max-w-md">
            Masuk ke Sistem Informasi Desa Baturaden untuk mengakses layanan, informasi publik, dan pelaporan warga.
          </p>

          {/* Error Alert with Shake Animation */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, x: 0 }}
                animate={{ 
                  opacity: 1, 
                  x: [0, -10, 10, -10, 10, 0],
                }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ 
                  opacity: { duration: 0.2 },
                  x: { duration: 0.4, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }
                }}
                className="mb-6"
              >
                <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span className="text-sm text-red-600">{error}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-neutral-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-11 pr-4 py-3 bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#5B903A] focus:ring-2 focus:ring-[#5B903A]/20 transition-all duration-200"
                  placeholder="johndoe@mail.com"
                  aria-label="Email address"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-neutral-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-11 pr-12 py-3 bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#5B903A] focus:ring-2 focus:ring-[#5B903A]/20 transition-all duration-200"
                  placeholder="Masukkan password Anda"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-400 hover:text-[#5B903A] transition-colors duration-200 focus:outline-none"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <motion.div
                    initial={false}
                    animate={{ rotate: showPassword ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </motion.div>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#5B903A] text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] focus-visible:ring-offset-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Memproses...</span>
                </>
              ) : (
                <span>Masuk</span>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600">
              Belum Punya Akun?{" "}
              <Link
                href="/register"
                className="font-semibold text-[#5B903A] hover:text-[#4a7530] underline-offset-4 hover:underline transition-colors duration-200"
              >
                Daftar Sekarang
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* ==================== RIGHT SIDE: IMAGE (DESKTOP ONLY) ==================== */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-6 xl:p-4 bg-neutral-50">
        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="/assets/images/image-login.png"
            alt="Pemandangan Desa Baturaden"
            fill
            className="object-cover"
            priority
            sizes="(min-width: 1024px) 50vw, 0vw"
            quality={90}
          />
        </div>
      </div>
    </div>
  );
}