'use client'

import { useCallback, useEffect, useState } from 'react'
import { useConnectContext } from '@/store'
import {
  createClient,
  startConversation,
  sendMessage,
  streamMessages,
} from '@/utils'
import { Client, Conversation } from '@xmtp/xmtp-js'
import { Wallet } from 'ethers'

interface IStream {
  url: string
  sender: string
  content: string
}

export default function Chat() {
  const { wallet } = useConnectContext()
  const [xmtp, setXmtp] = useState<Client>()
  const [conversation, setConversation] = useState<Conversation>()
  const [stream, setStream] = useState<IStream>({
    url: '',
    sender: '',
    content: '',
  })
  const getXMTP = useCallback(async (): Promise<void> => {
    const client = await createClient(wallet)
    setXmtp(client)
  }, [setXmtp, wallet])
  const getConversation = useCallback(async (xmtp: Client): Promise<void> => {
    const conversation = await startConversation(
      xmtp,
      Wallet.createRandom().address
    )
    setConversation(conversation)
  }, [])

  useEffect(() => {
    getXMTP()
  }, [getXMTP])

  useEffect(() => {
    if (xmtp) getConversation(xmtp)
  }, [getConversation, getXMTP, xmtp])

  // TODO Solve bugs
  if (conversation)
    return (
      <div
        className='h-32 w-32 bg-[--orange]'
        onClick={async () => {
          await sendMessage(conversation, 'Test message')
          const stream = await streamMessages(
            xmtp as Client,
            conversation.peerAddress
          )
          if (stream) setStream(stream)
        }}
      >
        {stream.content} {stream.sender} {stream.url}
      </div>
    )
}
