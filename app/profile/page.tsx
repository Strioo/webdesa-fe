import HeroProfile from '@/components/profile/HeroProfile'
import TimelineSection from '@/components/profile/TimelineSection'
import VisiMisiSection from '@/components/profile/VisiMisiSection'
import PejabatDesaSection from '@/components/profile/PejabatDesaSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profil Desa | Baturaden',
  description: 'Mengenal lebih dekat Desa Baturaden - Sejarah, Visi, Misi, dan Pejabat Desa',
}

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <HeroProfile />
      <TimelineSection />
      <VisiMisiSection />
      <PejabatDesaSection />
    </main>
  )
}