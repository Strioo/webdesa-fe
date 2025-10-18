import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { MOCK_DESTINATIONS } from '@/lib/types'
import WisataDetailClient from './WisataDetailClient'

interface PageProps {
  params: {
    slug: string
  }
}

// Generate static params for SSG (optional)
export async function generateStaticParams() {
  return Object.keys(MOCK_DESTINATIONS).map((slug) => ({
    slug,
  }))
}

// Metadata generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const destination = MOCK_DESTINATIONS[params.slug]

  if (!destination) {
    return {
      title: 'Destinasi Tidak Ditemukan',
    }
  }

  return {
    title: `${destination.name} - Wisata Baturaden`,
    description: destination.description.substring(0, 160),
    openGraph: {
      title: destination.name,
      description: destination.description,
      images: [destination.images[0].src],
    },
  }
}

// Server Component
export default function WisataDetailPage({ params }: PageProps) {
  // Get destination data from mock
  const destination = MOCK_DESTINATIONS[params.slug]

  // 404 if destination not found
  if (!destination) {
    notFound()
  }

  // Pass data to client component
  return <WisataDetailClient destination={destination} />
}
