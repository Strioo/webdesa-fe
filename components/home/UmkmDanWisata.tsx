'use client'

import Image from 'next/image'
import Link from 'next/link'

const UmkmDanWisata = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-start mb-16">
          <div>
            <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-2">
              UMKM dan Wisata<br />Baturaden
            </h2>
          </div>
          <div className="text-gray-500 max-w-sm">
            <p className="text-base leading-relaxed">
              Mengenal lebih dekat keindahan alam dan produk lokal unggulan Baturaden, dari kuliner khas hingga destinasi wisata penuh pesona.
            </p>
          </div>
        </div>

        {/* UMKM Section - Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 w-full">
          {/* UMKM Image - Left (Lebih lebar) */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden h-[500px] shadow-xl">
            <Image
              src="/assets/images/umkm-showcase.jpg"
              alt="UMKM Baturaden"
              fill
              className="object-cover"
            />

            {/* Glass Badge - Top Right (mepet) */}
            <div className="absolute top-12 right-14 bg-gray-300/10 backdrop-blur-xs border border-gray-300/50 rounded-lg p-4 pt-2">
              <Image className="mx-auto" src="/assets/icons/top-widget.svg" alt="" width={45} height={45} />
              <div className="flex items-center gap-2 my-2">
                <span className="text-md font-medium text-white">UMKM Aktif</span>
                <div className="bg-white text-[#5B903A] text-xs px-2 py-1 rounded-full flex items-center gap-2">
                  <Image src="/assets/icons/trend-up.svg" alt="Arrow" width={12} height={12} className="w-3" />
                  +12%
                </div>
              </div>
              <p className="text-5xl font-medium text-white mb-2">120+</p>
              <p className="text-sm text-white">Terdaftar tahun ini</p>
            </div>
          </div>

          {/* UMKM Content - Right (Lebih sempit) */}
          <div className="lg:col-span-5 bg-[#F5F5F5] rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between h-[500px]">
            <div className="relative z-10">
              <p className="text-[28px] font-medium text-gray-900 leading-snug mb-4">
                Dari tangan kreatif warga Baturaden lahir produk unggulan yang penuh nilai budaya dan kualitas. Temukan beragam kuliner khas, kerajinan, hingga inovasi lokal yang siap menemani aktivitas Anda. Mari dukung UMKM desa dan tumbuh bersama!
              </p>
            </div>

            {/* Button - Mepet Bawah */}
            <div className="relative z-10">
              <Link href="/umkm">
                <button className="bg-[#5B903A] hover:bg-[#4a7a2f] text-white font-medium ps-4 pe-2 py-2 rounded-full flex items-center gap-3 transition-all duration-300 hover:gap-5 shadow-lg">
                  Belanja Sekarang
                  <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
                    <Image src="/assets/icons/arrow.svg" alt="Arrow" width={12} height={12} className="w-3" />
                  </div>
                </button>
              </Link>
            </div>

            {/* Decorative Icon Box - Bottom Right */}
            {/* Right Grid - 3x3 with overflow effect */}
            <div className="absolute -right-6 top-3/4 -translate-y-1/2 w-[300px] h-[300px]">
              <div className="grid grid-cols-3 grid-rows-3 gap-3 w-full h-full">
                {/* Row 1 */}
                <div className="bg-gradient-to-br from-50% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>
                <div className="bg-gradient-to-b from-20% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>
                <div className="bg-gradient-to-bl from-50% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>

                {/* Row 2 - Center main card */}
                <div className="bg-gradient-to-r from-40% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>
                <div className="bg-[#91B57B] rounded-lg flex items-center justify-center shadow-2xl relative z-20 scale-110">
                  <div className="bg-[#5B903A] p-3 rounded-lg">
                    <Image
                      src="/assets/icons/cube.svg"
                      alt="Cube Icon"
                      width={52}
                      height={52}
                      className="w-13 h-13"
                    />
                  </div>
                </div>
                <div className="bg-gradient-to-l from-30% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>

                {/* Row 3 */}
                <div className="bg-gradient-to-tr from-50% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>
                <div className="bg-gradient-to-t from-20% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>
                <div className="bg-gradient-to-tl from-50% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Wisata Section - Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Wisata Content - Left (Lebih sempit) */}
          <div className="lg:col-span-5 bg-[#f5f5f5] rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between h-[500px]">
            <div className="relative z-10">
              <h3 className="text-3xl font-semibold text-gray-900 leading-snug mb-4">
                Nikmati keindahan alam, kesejukan udara pegunungan, dan keramahan warga.
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">
                Dari air terjun menawan, pemandian air panas, hingga panorama hijau yang memanjangkan, Baturaden selalu punya cerita indah untuk setiap pengunjung.
              </p>
            </div>

            {/* Button - Mepet Kanan Bawah */}
            <div className="relative z-10 flex justify-end">
              <Link href="/wisata">
                <button className="bg-[#5B903A] hover:bg-[#4a7a2f] text-white font-medium ps-4 pe-2 py-2 rounded-full flex items-center gap-3 transition-all duration-300 hover:gap-5 shadow-lg">
                  Jelajahi Sekarang
                  <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
                    <Image src="/assets/icons/arrow.svg" alt="Arrow" width={12} height={12} className="w-3" />
                  </div>
                </button>
              </Link>
            </div>

            {/* Decorative Icon Box - Bottom Left */}
            {/* Right Grid - 3x3 with overflow effect */}
            <div className="absolute -left-2 top-3/4 -translate-y-1/2 w-[300px] h-[300px]">
              <div className="grid grid-cols-3 grid-rows-3 gap-3 w-full h-full">
                {/* Row 1 */}
                <div className="bg-gradient-to-br from-50% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>
                <div className="bg-gradient-to-b from-20% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>
                <div className="bg-gradient-to-bl from-50% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>

                {/* Row 2 - Center main card */}
                <div className="bg-gradient-to-r from-40% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>
                <div className="bg-[#91B57B] rounded-lg flex items-center justify-center shadow-2xl relative z-20 scale-110">
                  <div className="bg-[#5B903A] p-3 rounded-lg">
                    <Image
                      src="/assets/icons/mountain.svg"
                      alt="Mountain Icon"
                      width={52}
                      height={52}
                      className="w-13 h-13"
                    />
                  </div>
                </div>
                <div className="bg-gradient-to-l from-30% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>

                {/* Row 3 */}
                <div className="bg-gradient-to-tr from-50% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>
                <div className="bg-gradient-to-t from-20% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>
                <div className="bg-gradient-to-tl from-50% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Wisata Image - Right (Lebih lebar) */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden h-[500px] shadow-xl">
            <Image
              src="/assets/images/wisata-showcase.jpg"
              alt="Wisata Baturaden"
              fill
              className="object-cover"
            />

            {/* Glass Badge - Top Left */}
            <div className="absolute top-8 left-8 bg-gray-300/10 backdrop-blur-xs border border-gray-300/50 rounded-lg p-4 pt-2">
              <Image className="mx-auto" src="/assets/icons/top-widget.svg" alt="" width={45} height={45} />
              <div className="flex items-center gap-2 my-2">
                <span className="text-md font-medium text-white">Destinasi</span>
                <div className="bg-white text-[#5B903A] text-xs px-2 py-1 rounded-full flex items-center gap-2">
                  <Image src="/assets/icons/trend-up.svg" alt="Arrow" width={12} height={12} className="w-3" />
                  +20%
                </div>
              </div>
              <p className="text-5xl font-medium text-white mb-2">+8%</p>
              <p className="text-sm text-white">Kunjungan tahun ini</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UmkmDanWisata