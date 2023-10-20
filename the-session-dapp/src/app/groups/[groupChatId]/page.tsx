import { notFound } from 'next/navigation'
import { getUser, getChat } from '@/services'
import HeaderWrapper from '@/components/wrappers/HeaderWrapper'
import Nav from '@/components/layout/Nav'
import Chat from '@/components/layout/Chat'
import MainWrapper from '@/components/wrappers/MainWrapper'

export default async function GroupChat({
  params,
}: {
  params: { groupChatId: string }
}) {
  try {
    const user = await getUser('1')
    const chat = await getChat(params.groupChatId)
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
