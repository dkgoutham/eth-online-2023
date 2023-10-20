'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import { getUser } from '@/services'
import { Push } from '@/utils'
import { useConnectContext } from '@/store'
import HeaderWrapper from '@/components/wrappers/HeaderWrapper'
import Nav from '@/components/layout/Nav'
import Chat from '@/components/layout/Chat'
import MainWrapper from '@/components/wrappers/MainWrapper'
import { useCallback } from 'react'
import { User } from '@/model'

export default function GroupChat({
  params,
}: {
  params: { groupChatId: string }
}) {
  const [user, setUser] = useState<User | undefined>()
  const [push] = useState<Push>(new Push())
  const { isConnected } = useConnectContext()
  const handleGetUser = useCallback(async () => {
    const user = await getUser('1')
    setUser(user)
  }, [])
  const handleChat = useCallback(async () => {
    try {
      await push.initPush()
      await push.initSocket()
    } catch (err) {
      alert(err)
    }
  }, [])

  useEffect(() => {
    handleGetUser()
  }, [handleGetUser])

  useEffect(() => {
    if (!isConnected || !user) return
    handleChat()
  }, [handleChat, isConnected, user])

  if (!isConnected || !user) return <div>Please connect your wallet</div>

  try {
    return (
      <>
        <HeaderWrapper>
          <Nav user={user} />
        </HeaderWrapper>
        <MainWrapper>
          <div>{params.groupChatId}</div>
          <Chat />
        </MainWrapper>
      </>
    )
  } catch (err) {
    notFound()
  }
}
