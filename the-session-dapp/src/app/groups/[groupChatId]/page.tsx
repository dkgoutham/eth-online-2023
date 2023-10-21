'use client'

import { useState } from 'react'
import { Push } from '@/utils'
import { EthereumAddress } from '@/model'
import { useConnectContext } from '@/store'
import HeaderWrapper from '@/components/wrappers/HeaderWrapper'
import MainWrapper from '@/components/wrappers/MainWrapper'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'
import Nav from '@/components/layout/Nav'
import Chat from '@/components/layout/Chat'
import RightPillWrapper from '@/components/wrappers/RightPillWrapper'

export default function GroupChat() {
  const { isConnected, address } = useConnectContext()
  // TODO set real recipient
  const [recipient] = useState<EthereumAddress>(
    '0x110B7a43C460a9f2FB2572B22D760431BcC0F70B' as EthereumAddress
  )
  const [push, setPush] = useState<Push | null>(null)
  const [pushIsLoading, setPushIsLoading] = useState<boolean>(false)
  const startChat = async () => {
    setPushIsLoading(true)
    if (!isConnected || !address) return
    try {
      const push = new Push(recipient)
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
      {pushIsLoading ? (
        <MainWrapper>
          <Spinner />
        </MainWrapper>
      ) : !push ? (
        <MainWrapper>
          <Button onClick={startChat}>Connect Group</Button>
        </MainWrapper>
      ) : (
        <RightPillWrapper pillQuote={'welcome to the group'}>
          <Chat push={push} />
        </RightPillWrapper>
      )}
    </>
  )
}
