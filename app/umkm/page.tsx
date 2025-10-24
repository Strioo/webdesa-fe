'use client'

import { Suspense } from 'react'
import UmkmSection from "@/components/umkm/UmkmSection"
import Footer from "@/components/Footer"
import { SectionSkeleton } from '@/components/ui/skeletons'

export default function UmkmPage() {

    return(
        <div>
            {/* Navbar sudah ada di ConditionalNavbar (root layout) */}
            <Suspense fallback={<SectionSkeleton />}>
                <UmkmSection />
            </Suspense>
            <Footer />
        </div>
    )
}