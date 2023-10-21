'use client'

import { useState } from 'react'
import { Push } from '@/utils'
import Messages from './Messages'
import SendMessageButton from './SendMessageButton'

interface IProps {
  push: Push
}

export default function Chat({ push }: IProps) {
  const [message, setMessage] = useState<string>('')
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false)
  const handleSendMessage = async () => {
    setIsSendingMessage(true)
    try {
      const sent = await push.sendMessage(message)
      setIsSendingMessage(false)
      setMessage('')
    } catch (err) {
      setIsSendingMessage(false)
      alert('Ops! There was a problem sending your message')
    }
  }

  return (
    <>
      <Messages push={push} />
      <form
        className='flex w-full items-center justify-center gap-4'
        onSubmit={async (e) => {
          e.preventDefault()
          await handleSendMessage()
        }}
      >
        <textarea
          placeholder='message'
          id='message'
          className='flex h-full basis-full justify-center overflow-y-scroll rounded-[30px] border-[1px] border-[--black] dark:border-[--white] bg-[--background] px-6 py-4'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <SendMessageButton isLoading={isSendingMessage} />
      </form>
    </>
  )
}
