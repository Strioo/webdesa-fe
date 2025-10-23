import ProfileHeroSection from '@/components/profile/HeroProfile'
import ProfileTimelineSection from '@/components/profile/TimelineSectionAceternity'
import ProfileVisiMisiSection from '@/components/profile/VisiMisiSection'
import ProfileOfficialsSection from '@/components/profile/OfficialsSection'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profil Desa | Baturaden',
  description: 'Mengenal lebih dekat Desa Baturaden - Sejarah, Visi, Misi, dan Pejabat Desa',
}

export default function ProfilePage() {
  return (
    <>
      <ProfileHeroSection />
      <ProfileTimelineSection />
      <ProfileVisiMisiSection />
      <ProfileOfficialsSection />
      <Footer />
    </>
  )
}