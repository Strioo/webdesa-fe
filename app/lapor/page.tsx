import { Metadata } from 'next'
import LaporPageClient from './LaporPageClient'

export const metadata: Metadata = {
  title: 'Lapor Desa | Baturaden',
  description:
    'Sampaikan laporan atau masukan terkait pelayanan dan pembangunan Desa Baturaden secara transparan dan tepat waktu.',
  openGraph: {
    title: 'Lapor Desa | Baturaden',
    description:
      'Fitur pelaporan desa untuk kemajuan bersama. Laporan ditangani secara transparan dalam 1x24 jam.',
    type: 'website'
  }
}

export default function LaporPage() {
  return <LaporPageClient />
}
