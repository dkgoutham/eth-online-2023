import './globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ConnectProvider } from '@/store'
import { RainbowProvider } from '@/config'
import Favicon from '@public/favicon.ico'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Session',
  description: 'Project developed for ETHOnline 2023',
  icons: [{ rel: 'icon', url: Favicon.src }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={inter.className}>
      <body>
        <RainbowProvider>
          <ConnectProvider>{children}</ConnectProvider>
        </RainbowProvider>
      </body>
    </html>
  )
}
