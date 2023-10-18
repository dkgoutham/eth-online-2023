import '../../../../polyfills'
import { notFound } from 'next/navigation'
import { ConnectProvider } from '@/store'
import { getChat } from '@/services'
import Chat from '@/components/layout/Chat'

export default async function GroupChat({
  params,
}: {
  params: { groupChatId: string }
}) {
  try {
    const chat = await getChat(params.groupChatId)
  } catch (err) {
    notFound()
  }
  return (
    <ConnectProvider>
      <div>{params.groupChatId}</div>
      <Chat />
    </ConnectProvider>
  )
}
