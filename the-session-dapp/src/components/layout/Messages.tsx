'use client'

import { useState, useEffect } from 'react'
import { Push, formatDate } from '@/utils'
import { GroupMessage } from '@/model'
import Spinner from '../ui/Spinner'

interface IProps {
  push: Push
}

export default function Messages({ push }: IProps) {
  const { messages, loadingMessages } = push
  const [chat, setChat] = useState<GroupMessage[]>([])
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false)

  useEffect(() => {
    console.log(messages)
    setChat(messages)
  }, [messages])

  useEffect(() => {
    setIsChatLoading(loadingMessages)
  }, [loadingMessages])

  // TODO Remove test message
  const welcomeMessage: GroupMessage = {
    text: 'Good evening everyone! Thank you for joining this group therapy session for anxiety :D',
    isSender: false,
    time: new Date().getTime(),
  }

  return (
    <section className='relative h-[50vh] min-h-[300px] w-full overflow-y-scroll rounded-[10vh] border-[1px] border-[--black] py-3 text-center dark:border-[--white]'>
      <div className='absolute left-0 top-0 h-[50px] w-full border-b-[1px] border-b-[--black] bg-[--background] pb-3 pt-4 text-[12px] dark:border-b-[--white]'>
        <time>{formatDate(new Date())}</time>
      </div>
      <div className='mt-[50px] flex w-full flex-col items-start gap-1 p-3'>
        {isChatLoading && <Spinner />}
        {chat.length > 0 &&
          [welcomeMessage, ...chat].map((el: GroupMessage, i: number) => {
            const classes = [
              'align-start rounded-full flex flex-col gap-[4px] p-3 text-sm',
              el.isSender ? 'bg-[--sender] self-end' : 'bg-[--recipient]',
            ].join(' ')
            return (
              <div key={`chat-message-${i}`} className={classes}>
                {el.text}
                {/* TODO Add time logic {el.time && (
                  <time className='align-end text-[10px]'>
                    {getHourAndMinutes(el.time)}
                  </time>
                )} */}
              </div>
            )
          })}
      </div>
    </section>
  )
}
