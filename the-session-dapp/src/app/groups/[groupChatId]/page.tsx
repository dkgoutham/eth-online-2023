'use client'

import { useState } from 'react'
import { Push } from '@/utils'
import { useConnectContext } from '@/store'
import HeaderWrapper from '@/components/wrappers/HeaderWrapper'
import MainWrapper from '@/components/wrappers/MainWrapper'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'
import Nav from '@/components/layout/Nav'
import Chat from '@/components/layout/Chat'

export default function GroupChat() {
  const { isConnected, address } = useConnectContext()
  const [push, setPush] = useState<Push | null>(null)
  const [pushIsLoading, setPushIsLoading] = useState<boolean>(false)
  const startChat = async () => {
    setPushIsLoading(true)
    if (!isConnected || !address) return
    try {
      const push = new Push()
      await push.initPush()
      await push.initSocket(address)
      setPush(push)
    } catch (err) {
      alert(err)
    }
    setPushIsLoading(false)
  }

  if (!isConnected) return <div>Please connect your wallet</div>

  return (
    <>
      <HeaderWrapper>
        <Nav />
      </HeaderWrapper>
      <MainWrapper>
        {pushIsLoading ? (
          <Spinner />
        ) : !push ? (
          <Button onClick={startChat}>Connect Group</Button>
        ) : (
          <Chat push={push} />
        )}
      </MainWrapper>
    </>
  )
}
