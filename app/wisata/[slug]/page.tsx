import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import WisataDetailClientNew from './WisataDetailClient'

interface PageProps {
  params: {
    slug: string
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

// Server Component - Fetch data
export default async function WisataDetailPage({ params }: PageProps) {
  try {
    // Fetch wisata data from API using native fetch (server-side)
    const response = await fetch(`${API_BASE_URL}/wisata/slug/${params.slug}`, {
      cache: 'no-store', // Disable caching for dynamic data
    })
    
    if (!response.ok) {
      notFound()
    }

    const result = await response.json()
    
    if (!result.success || !result.data) {
      notFound()
    }

    // Pass data to client component
    return <WisataDetailClientNew wisataData={result.data} />
  } catch (error) {
    console.error('Error fetching wisata:', error)
    notFound()
  }
}
