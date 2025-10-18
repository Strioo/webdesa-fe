import type { Metadata } from "next";
import { Lato, Raleway } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { AnimationProvider } from "@/lib/animation";
import DockNavbar from "@/components/DockNavbar";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
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
      <body
        className={`${lato.variable} ${raleway.variable} antialiased`}
        style={{ fontFamily: 'var(--font-lato)' }}
      >
        <AnimationProvider>
          <AuthProvider>
            {children}
            <DockNavbar />
          </AuthProvider>
        </AnimationProvider>
      </body>
    </html>
  );
}
