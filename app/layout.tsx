import { Analytics } from '@vercel/analytics/next'
import { Dancing_Script, Geist, Oswald, Playfair_Display } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-web' })
const oswald = Oswald({ subsets: ['latin'], variable: '--font-document-heading', weight: ['700'] })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-document-serif' })
const dancingScript = Dancing_Script({ subsets: ['latin'], variable: '--font-document-script' })

export const metadata: Metadata = {
  title: 'Pdf',
  description: 'Create polished, print-ready Baylat Properties documents.',
  generator: 'dfran6/Baylat-Document-Generator',
  icons: {
    icon: [
      {
        url: '/logo.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/logo.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/baylat-favicon.png',
        type: 'image/png',
      },
    ],
    apple: '/app_logo2.jpg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${oswald.variable} ${playfair.variable} ${dancingScript.variable}`}>
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
