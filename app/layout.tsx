import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import './globals.css'
import './fx.css'
import MediaLightboxProvider from '@/components/MediaLightbox/MediaLightboxProvider'
import FxProvider from '@/components/Fx/FxProvider'
import Cursor from '@/components/Fx/Cursor'

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

// Flag motion-readiness before first paint so reveal targets never flash.
const FX_BOOT = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('fx-ready')}catch(e){}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={playfair.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: FX_BOOT }} />
        <div className="fx-progress" aria-hidden="true" />
        <MediaLightboxProvider>{children}</MediaLightboxProvider>
        <FxProvider />
        <Cursor />
      </body>
    </html>
  )
}
