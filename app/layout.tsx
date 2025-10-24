import type { Metadata } from "next";
import { Lato, Raleway } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { AnimationProvider } from "@/lib/animation";
import FloatingChatButton from "@/components/chatbot/FloatingChatButton";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import PageTransitionProvider from "@/components/providers/PageTransitionProvider";
import TopLoader from "@/components/ui/TopLoader";
import { ConditionalNavbar } from "@/components/providers/ConditionalNavbar";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Baturaden",
  description: "Baturaden, Harmoni Alam dan Kehangatan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Optimize page transitions and prevent white flash */}
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#ffffff" />
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Prevent white flash during navigation */
            html {
              background-color: #ffffff;
            }
            body {
              background-color: #ffffff;
            }
            /* Smooth page transitions */
            @media (prefers-reduced-motion: no-preference) {
              html {
                scroll-behavior: smooth;
              }
            }
          `
        }} />
      </head>
      <body
        className={`${lato.variable} ${raleway.variable} antialiased bg-white`}
        style={{ fontFamily: 'var(--font-lato)' }}
      >
        <AnimationProvider>
          <AuthProvider>
            <TopLoader color="#5B903A" height={3} showSpinner={false} />
            <SmoothScrollProvider />
            
            {/* Conditional Navbar - hidden on /chatbot */}
            <ConditionalNavbar />
            
            {/* Only page content transitions */}
            <PageTransitionProvider>
              {children}
            </PageTransitionProvider>
            
            {/* Floating Chat Button - shows on homepage only */}
            <FloatingChatButton />
          </AuthProvider>
        </AnimationProvider>
      </body>
    </html>
  );
}
