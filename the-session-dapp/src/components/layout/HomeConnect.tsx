'use client'

import { useConnectContext } from '@/store'
import Button from '../ui/Button'
import ConnectButton from '@/components/layout/ConnectButton'

export default function HomeConnect() {
  const { hasWallet, isConnected } = useConnectContext()
  if (!hasWallet)
    return (
      <>
        <Button disabled>Connect</Button>
        <p className='pt-4 text-sm'>
          you need a browser wallet to use this app
        </p>
      </>
    )
  if (!isConnected && hasWallet) return <ConnectButton />
  return <Button href='/groups'>find more groups</Button>
}
