'use client'

import { useConnectContext } from '@/store'
import Button from '../ui/Button'
import ConnectButton from '@/components/layout/ConnectButton'

export default function HomeConnect() {
  const { isConnected } = useConnectContext()
  if (!isConnected) return <ConnectButton />
  return <Button href='/groups'>find more groups</Button>
}
