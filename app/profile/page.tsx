import ProfileHeroSection from '@/components/profile/HeroProfile'
import ProfileTimelineSection from '@/components/profile/TimelineSectionAceternity'
import ProfileVisiMisiSection from '@/components/profile/VisiMisiSection'
import ProfileOfficialsSection from '@/components/profile/OfficialsSection'
import Navbar from '@/components/Navbar'
import DockNavbar from '@/components/DockNavbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profil Desa | Baturaden',
  description: 'Mengenal lebih dekat Desa Baturaden - Sejarah, Visi, Misi, dan Pejabat Desa',
}

export default function ProfilePage() {
  return (
    <>
      <Navbar />
      <DockNavbar />
      <main className="min-h-screen bg-white overflow-x-hidden">
        <ProfileHeroSection />
        <ProfileTimelineSection />
        <ProfileVisiMisiSection />
        <ProfileOfficialsSection />
      </main>
      <Footer />
    </>
  )
}