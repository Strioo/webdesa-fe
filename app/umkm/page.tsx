'use client'

import { Suspense } from 'react'
import Navbar from "@/components/Navbar"
import UmkmSection from "@/components/umkm/UmkmSection"
import Footer from "@/components/Footer"
import { SectionSkeleton } from '@/components/ui/skeletons'

export default function UmkmPage() {

    return(
        <div>
            <Navbar />
            <Suspense fallback={<SectionSkeleton />}>
                <UmkmSection />
            </Suspense>
            <Footer />
        </div>
    )
}