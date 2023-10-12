'use client'

import Button from '@/components/ui/Button'

export default function ConnectButton() {
  const connectHandler = () => {
    // TODO Add connect logic
    console.log('clicked')
  }
  return <Button onClick={() => connectHandler()}>connect</Button>
}
