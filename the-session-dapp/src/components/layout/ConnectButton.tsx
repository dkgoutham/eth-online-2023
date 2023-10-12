'use client'

import { useRouter } from 'next/navigation'
import { useConnect } from '@/hooks'
import Button from '@/components/ui/Button'

export default function ConnectButton() {
  const isConnected = useConnect()
  const { push } = useRouter()

  const connectHandler = () => {
    // TODO Add connect logic
    if (isConnected) push('/user')
  }
  return (
    <Button onClick={connectHandler}>
      {isConnected ? 'profile' : 'connect'}
    </Button>
  )
}
