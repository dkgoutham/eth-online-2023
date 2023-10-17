import { notFound } from 'next/navigation'
import { getChat } from '@/services'

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
  return <div>{params.groupChatId}</div>
}
