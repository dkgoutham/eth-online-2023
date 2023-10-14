import './connected.css'

export default function ConnectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <body className='px-6 pb-6 pt-2'>{children}</body>
}
