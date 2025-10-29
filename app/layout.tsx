import type React from "react"
import type { Metadata } from "next"
import { Inter, Noto_Sans_Devanagari } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/lib/language-context"
import { SiteHeader } from "@/components/site-header"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
})

export const metadata: Metadata = {
  title: "Sell My Vote - Know Your Vote's Worth | Nepal Reforms",
  description:
    "Calculate the real cost of poor governance. Understand what your vote is truly worth and make informed decisions.",
  keywords: "Nepal, voting, governance, democracy, civic engagement, political awareness",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansDevanagari.variable}`}>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <SiteHeader />
          <main className="pt-16">{children}</main>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
