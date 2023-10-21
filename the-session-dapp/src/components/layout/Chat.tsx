'use client'

import { useState, useEffect, useCallback } from 'react'
import { IMessageIPFS } from '@pushprotocol/restapi'
import { Push } from '@/utils'
import Button from '../ui/Button'
import Spinner from '../ui/Spinner'

interface IProps {
  push: Push
}

export default function Chat({ push }: IProps) {
  // TODO set real recipient
  const [chat, setChat] = useState<IMessageIPFS[]>([])
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false)
  const [recipient] = useState<string>(
    '0x9400aF521D90d40eCDDC69E207d442908ea3d4Ac'
  )
  const [message, setMessage] = useState<string>('')
  const handleGetMessages = useCallback(async () => {
    try {
      setIsChatLoading(true)
      const chat = await push.getChat(recipient)
      setChat(chat.reverse())
      setIsChatLoading(false)
    } catch (err) {
      setIsChatLoading(false)
      setChat([])
      alert(err)
    }
  }, [push, recipient])
  const handleSendMessage = async () => {
    const sent = await push.sendMessage(recipient, message)
    setMessage('')
  }

  useEffect(() => {
    handleGetMessages()
  }, [handleGetMessages])

  return (
    <>
      <div className='mb-12 w-full rounded-xl border-[1px] border-[--black] p-12 dark:border-[--white]'>
        {isChatLoading && <Spinner />}
        {chat.length > 0 &&
          chat.map((el: IMessageIPFS, i: number) => {
            const { messageObj } = el
            // @ts-ignore
            return <div key={`chat-message-${i}`}>{messageObj.content}</div>
          })}
      </div>
      <form
        className='flex items-center justify-center gap-2'
        onSubmit={async (e) => {
          e.preventDefault()
          await handleSendMessage()
        }}
      >
        <label htmlFor='message'>Message</label>
        <input
          id='message'
          className='rounded-full p-3 text-black'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type='submit'>Send</Button>
      </form>
    </>
  )
}
