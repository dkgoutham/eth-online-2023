'use client'

import { useEffect } from 'react'
import { useConnectContext } from '@/store'

interface IStream {
  url: string
  sender: string
  content: string
}

export default function Chat() {
  const { address } = useConnectContext()

  // TODO Add PUSH logic
  if (address) return <div className='h-32 w-32 bg-[--orange]'>{address}</div>
}
