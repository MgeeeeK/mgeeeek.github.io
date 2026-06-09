import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair-var',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Abhi's Portfolio",
  description: 'Creative strategist, copywriter, and designer',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={playfair.variable} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  )
}
