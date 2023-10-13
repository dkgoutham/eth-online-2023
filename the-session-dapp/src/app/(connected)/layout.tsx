import { ReactNode } from 'react'
import './connected.css'

export default function ConnectedLayout({
  children,
}: {
  children: ReactNode
}) {
  return <body>{children}</body>
}
