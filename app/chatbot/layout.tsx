import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chat AI Desa Baturaden',
  description: 'Chatbot AI untuk informasi dan layanan Desa Baturaden',
}

export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen w-full overflow-hidden bg-gradient-to-b from-neutral-50 to-white">
      {children}
    </div>
  )
}
