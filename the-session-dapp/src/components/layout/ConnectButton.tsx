'use client'

import { useRouter } from 'next/navigation'
import { useConnect } from '@/hooks'
import Button from '@/components/ui/Button'

export default function ConnectButton() {
  const isConnected = useConnect()
  const { push } = useRouter()

  const connectHandler = () => {
    // TODO Add connect logic
    if (isConnected) push('/groups')
  }
  return (
    <Button onClick={connectHandler}>
      {isConnected ? 'find more groups' : 'connect'}
    </Button>
  )
}
