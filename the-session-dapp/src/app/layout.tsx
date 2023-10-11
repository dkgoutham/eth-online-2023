import './globals.css'
import type { Metadata } from 'next'
import Favicon from '@public/favicon.ico'

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
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
