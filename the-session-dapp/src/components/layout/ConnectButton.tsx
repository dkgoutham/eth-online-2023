'use client'

import { useConnectContext } from '@/store'
import Button from '@/components/ui/Button'

export default function ConnectButton() {
  const { isConnected, connect, disconnect } = useConnectContext()

  return (
    <Button onClick={() => (isConnected ? disconnect() : connect())}>
      {isConnected ? 'disconnect' : 'connect'}
    </Button>
  )
}
