import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Thorne Aesthetics | Refined Precision. Invisible Artistry.',
  description:
    'A high-end medical aesthetics practice led by Dr. Evelyn Thorne. Natural-looking results through clinical precision in Union Square, San Francisco.',
  openGraph: {
    title: 'Thorne Aesthetics | Refined Precision. Invisible Artistry.',
    description:
      'A high-end medical aesthetics practice led by Dr. Evelyn Thorne. Natural-looking results through clinical precision in Union Square, San Francisco.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Thorne Aesthetics — Refined precision. Invisible artistry.',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thorne Aesthetics | Refined Precision. Invisible Artistry.',
    description:
      'A high-end medical aesthetics practice led by Dr. Evelyn Thorne. Natural-looking results through clinical precision in Union Square, San Francisco.',
    images: ['/og-image.png'],
  },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <SpeedInsights />
      </body>
    </html>
  )
}
