'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ProyekPembangunan, dummyProyekPembangunan } from '@/types/pembangunan'

export default function TransparansiDanaDesa() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getStatusColor = (status: ProyekPembangunan['status']) => {
    const colors = {
      'Perencanaan': 'bg-blue-100 text-blue-700 border-blue-200',
      'Berlangsung': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'Selesai': 'bg-green-100 text-green-700 border-green-200',
      'Ditunda': 'bg-red-100 text-red-700 border-red-200'
    }
    return colors[status]
  }

  const getKategoriColor = (kategori: ProyekPembangunan['kategori']) => {
    const colors = {
      'Infrastruktur': 'bg-purple-50 text-purple-700',
      'Air Bersih': 'bg-cyan-50 text-cyan-700',
      'Pertanian': 'bg-green-50 text-green-700',
      'Pendidikan': 'bg-orange-50 text-orange-700',
      'Kesehatan': 'bg-pink-50 text-pink-700',
      'Fasilitas Umum': 'bg-indigo-50 text-indigo-700'
    }
    return colors[kategori]
  }

  return (
    <>
      <section ref={ref} className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-screen-2xl mx-auto">
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-center md:text-left">
                Transparansi<br />Dana Desa
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center"
            >
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed text-center md:text-left">
                Informasi lengkap dan transparan tentang seluruh proyek pembangunan yang sedang dan 
                akan dilaksanakan di Desa Baturaden.
              </p>
            </motion.div>
          </div>

          {/* Summary Cards - Style dari StatistikPembangunan */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12"
          >
            {/* Card 1 - Total Proyek */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group h-full"
            >
              <motion.div
                whileHover={{ 
                  y: -2,
                  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.12)'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="h-full relative rounded-xl p-6 sm:p-8 cursor-default will-change-transform bg-[#F8F8F8] shadow-md flex flex-col items-center sm:items-start text-center sm:text-left"
              >
                {/* Icon Circle - Folder/Project Icon */}
                <div className="mb-4 w-12 h-12 rounded-full bg-[#5B903A] flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                  </svg>
                </div>
                <div className="text-4xl sm:text-5xl font-bold mb-2 text-gray-900">
                  {dummyProyekPembangunan.length}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
                  Total Proyek
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-gray-600">
                  Keseluruhan proyek pembangunan desa
                </p>
              </motion.div>
            </motion.div>

            {/* Card 2 - Progress/Sedang Berlangsung */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group h-full"
            >
              <motion.div
                whileHover={{ 
                  y: -2,
                  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.12)'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="h-full relative rounded-xl p-6 sm:p-8 cursor-default will-change-transform bg-[#F8F8F8] shadow-md flex flex-col items-center sm:items-start text-center sm:text-left"
              >
                {/* Icon Circle - Chart/Progress Icon */}
                <div className="mb-4 w-12 h-12 rounded-full bg-[#5B903A] flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                  </svg>
                </div>
                <div className="text-4xl sm:text-5xl font-bold mb-2 text-gray-900">
                  {dummyProyekPembangunan.filter(p => p.status === 'Berlangsung').length}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
                  Sedang Berlangsung
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-gray-600">
                  Proyek yang sedang dikerjakan
                </p>
              </motion.div>
            </motion.div>

            {/* Card 3 - Checklist/Selesai */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group h-full"
            >
              <motion.div
                whileHover={{ 
                  y: -2,
                  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.12)'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="h-full relative rounded-xl p-6 sm:p-8 cursor-default will-change-transform bg-[#F8F8F8] shadow-md flex flex-col items-center sm:items-start text-center sm:text-left"
              >
                {/* Icon Circle - Check Circle Icon */}
                <div className="mb-4 w-12 h-12 rounded-full bg-[#5B903A] flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div className="text-4xl sm:text-5xl font-bold mb-2 text-gray-900">
                  {dummyProyekPembangunan.filter(p => p.status === 'Selesai').length}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
                  Proyek Selesai
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-gray-600">
                  Telah diselesaikan dengan baik
                </p>
              </motion.div>
            </motion.div>

            {/* Card 4 - Money/Total Anggaran */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="group h-full"
            >
              <motion.div
                whileHover={{ 
                  y: -2,
                  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.12)'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="h-full relative rounded-xl p-6 sm:p-8 cursor-default will-change-transform bg-[#F8F8F8] shadow-md flex flex-col items-center sm:items-start text-center sm:text-left"
              >
                {/* Icon Circle - Money/Wallet Icon */}
                <div className="mb-4 w-12 h-12 rounded-full bg-[#5B903A] flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                  </svg>
                </div>
                <div className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900 leading-tight">
                  {formatCurrency(dummyProyekPembangunan.reduce((sum, p) => sum + p.anggaran, 0)).replace('Rp', 'Rp ')}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
                  Total Anggaran
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-gray-600">
                  Dana pembangunan keseluruhan
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Table Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#5B903A]/5 hover:bg-[#5B903A]/5">
                    <TableHead className="font-bold text-gray-900 min-w-[200px]">
                      Nama Proyek
                    </TableHead>
                    <TableHead className="font-bold text-gray-900 min-w-[250px]">
                      Deskripsi
                    </TableHead>
                    <TableHead className="font-bold text-gray-900 min-w-[130px]">
                      Kategori
                    </TableHead>
                    <TableHead className="font-bold text-gray-900 min-w-[150px]">
                      Anggaran
                    </TableHead>
                    <TableHead className="font-bold text-gray-900 min-w-[150px]">
                      Sumber Dana
                    </TableHead>
                    <TableHead className="font-bold text-gray-900 min-w-[180px]">
                      Timeline
                    </TableHead>
                    <TableHead className="font-bold text-gray-900 min-w-[120px]">
                      Status
                    </TableHead>
                    <TableHead className="font-bold text-gray-900 min-w-[150px]">
                      Progress
                    </TableHead>
                    <TableHead className="font-bold text-gray-900 min-w-[80px] text-center">
                      Foto
                    </TableHead>
                    <TableHead className="font-bold text-gray-900 min-w-[180px]">
                      Penanggung Jawab
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyProyekPembangunan.map((proyek, index) => (
                    <motion.tr
                      key={proyek.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                      className="hover:bg-gray-50/50 transition-colors border-b border-gray-100"
                    >
                      <TableCell className="font-semibold text-gray-900">
                        {proyek.nama}
                      </TableCell>
                      <TableCell className="text-gray-600 text-sm">
                        {proyek.deskripsi}
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getKategoriColor(proyek.kategori)}`}>
                          {proyek.kategori}
                        </span>
                      </TableCell>
                      <TableCell className="font-semibold text-gray-900 text-sm">
                        {formatCurrency(proyek.anggaran)}
                      </TableCell>
                      <TableCell className="text-gray-600 text-sm">
                        {proyek.sumberDana}
                      </TableCell>
                      <TableCell className="text-gray-600 text-sm">
                        <div>{proyek.timeline.mulai}</div>
                        <div className="text-xs text-gray-500">s/d {proyek.timeline.selesai}</div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(proyek.status)}`}>
                          {proyek.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: isInView ? `${proyek.progress}%` : 0 }}
                              transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
                              className="h-full bg-[#5B903A] rounded-full"
                            />
                          </div>
                          <span className="text-xs font-semibold text-gray-700 min-w-[35px]">
                            {proyek.progress}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => setSelectedImage(proyek.foto)}
                          className="group flex items-center justify-center w-10 h-10 rounded-lg 
                                   bg-gray-100 hover:bg-[#5B903A] transition-colors duration-200"
                        >
                          <svg
                            className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                      </TableCell>
                      <TableCell className="text-gray-600 text-sm">
                        {proyek.penanggungJawab}
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm 
                         flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Image */}
              <div className="relative aspect-video w-full">
                <Image
                  src={selectedImage}
                  alt="Foto Proyek"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
