import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Dancing_Script } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const dancingScript = Dancing_Script({ subsets: ["latin"], variable: "--font-script" });

export const metadata: Metadata = {
  title: 'ReyThing - Film, Dizi ve Kitap Kesfedin',
  description: 'Favori film, dizi ve kitaplarinizi kesfedin, puanlayin ve takip edin. Listeler olusturun ve tavsiyelerinizi paylasin.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`font-sans antialiased min-h-screen flex flex-col ${dancingScript.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
