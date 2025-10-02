'use client'

import Image from 'next/image'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import PopulationChart from '@/components/ui/PopulationChart'

export default function Home() {
  // Data cuaca
  const [weather] = useState({
    location: 'Baturaden, Banyumas',
    temp: 22,
    tempHigh: 25,
    tempLow: 18,
    humidity: 65,
    rainfall: 2.3,
    pressure: 1012
  })

  // Data pertumbuhan penduduk
  const [populationGrowth] = useState('+1.25%')

  // Data untuk area chart (12 bulan)
  const [populationData] = useState([
    { month: 'Jan', value: 6500, date: '2024-01-01' },
    { month: 'Feb', value: 4520, date: '2024-02-01' },
    { month: 'Mar', value: 5545, date: '2024-03-01' },
    { month: 'Apr', value: 7580, date: '2024-04-01' },
    { month: 'May', value: 6610, date: '2024-05-01' },
    { month: 'Jun', value: 5650, date: '2024-06-01' },
    { month: 'Jul', value: 7685, date: '2024-07-01' },
    { month: 'Aug', value: 9720, date: '2024-08-01' },
    { month: 'Sep', value: 8760, date: '2024-09-01' },
    { month: 'Oct', value: 8795, date: '2024-10-01' },
    { month: 'Nov', value: 6830, date: '2024-11-01' },
    { month: 'Dec', value: 7870, date: '2024-12-01' }
  ])

  return (
    <div>
      <Navbar />
      <section className="relative bg-[url('/assets/images/bg-hero.png')] bg-cover bg-center h-screen w-full">
        <div className="container w-[1400px] mx-auto px-4 h-full flex items-end pb-20">
          <div className="flex flex-col md:flex-row gap-6 w-full justify-between">
            <div className="glass-card-black backdrop-blur-xs rounded-3xl w-full md:w-[30%]">
              <div className="bg-gradient-to-t from-0% to-30% from-[#ffffff7b] to-transparent rounded-3xl space-y-4 p-5">
                <Image className="mx-auto" src="/assets/icons/top-widget.svg" alt="" width={100} height={100} />

                <div className="flex items-center gap-2">
                  <Image src="/assets/icons/CalendarDots.svg" alt="Calendar" width={20} height={20} className="w-5 h-5" />
                  <p className="text-white">Agenda desa Baturaden</p>
                </div>

                {/* Weather Card */}
                <div className="bg-white rounded-3xl p-3">
                  <p className="text-black text-md opacity-90">{weather.location}</p>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex mt-5 justify-center items-center">
                        <span className="text-black text-2xl font-light my-auto">+</span>
                        <span className="text-black text-3xl font-light">{weather.temp}</span>
                        <span className="text-black text-2xl my-auto">°C</span>
                      </div>
                    </div>
                    <div className="text-black text-left my-auto">
                      <p className="text-sm">H: {weather.tempHigh}°C</p>
                      <p className="text-sm">L: {weather.tempLow}°C</p>
                    </div>
                    <Image src="/assets/icons/cloud.svg" alt="Weather" width={64} height={64} className="w-16 h-16" />
                  </div>

                  <hr className="border-[#A1A1A1]" />

                  <div className="grid grid-cols-3 gap-4 mt-2 text-black text-center">
                    <div>
                      <p className="text-xs opacity-75">Kelembaban</p>
                      <p>{weather.humidity}%</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-75">Curah Hujan</p>
                      <p>{weather.rainfall} mm</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-75">Tekanan Udara</p>
                      <p>{weather.pressure} hPa</p>
                    </div>
                  </div>
                </div>

                {/* Population Growth Card */}
                <div className="bg-white rounded-3xl pb-6 pt-3 px-3">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-black font-medium">Pertumbuhan Penduduk</p>
                    <span className="bg-[#5B903A] flex gap-1 text-white text-sm px-3 py-1 rounded-full">
                      {populationGrowth}
                      <Image src="/assets/icons/ArrowRight.png" alt="" width={16} height={16} className="w-4 h-4 invert" style={{ transform: 'rotate(-90deg)' }} />
                    </span>
                  </div>

                  {/* Population Stats */}
                  <div className="mb-2">
                    <p className="text-2xl font-bold text-[#5B903A]">{populationData[populationData.length - 1].value.toLocaleString('id-ID')}</p>
                    <p className="text-xs text-gray-500">Total Penduduk (Des 2024)</p>
                  </div>

                  {/* Area Chart Visualization */}
                  <div className="relative mt-2">
                    <PopulationChart data={populationData} color="#5B903A" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Hero Content */}
            <div className="w-full md:w-[48%] flex flex-col justify-center align-bottom">
              <div className="mb-4">
                <span className="inline-block glass-card-white backdrop-blur-xs border-white text-white px-5 py-3 rounded-full text-sm">
                  Pesona Alam Banyumas
                </span>
              </div>

              <h1 className="text-white text-4xl md:text-6xl font-semibold leading-tight mb-6">
                Baturaden, Harmoni<br />
                Alam dan Kehangatan
              </h1>

              <p className="text-[#A1A1A1] text-md md:text-lg mb-8 max-w-2xl opacity-90">
                Tempat terbaik untuk liburan keluarga, melepas penat, dan menikmati keindahan
                Banyumas yang menenangkan.
              </p>

              <button
                className="w-max bg-white hover:bg-gray-100 text-black font-medium ps-4 pe-2 py-2 rounded-full flex items-center gap-3 transition-all duration-300 hover:gap-5">
                Kunjungi Sekarang
                <div className="bg-[#5B903A] rounded-full w-12 h-12 flex items-center justify-center">
                  <Image src="/assets/icons/arrow.svg" alt="Login Icon" width={12} height={12} className="w-3 invert" />
                </div>
              </button>

            </div>
          </div>
        </div>
      </section>


    </div>
  )
}

