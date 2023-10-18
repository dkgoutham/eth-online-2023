import { notFound } from 'next/navigation'
import { getTopics, getUser } from '@/services'
import { User, GroupTopic } from '@/model'
import { ConnectProvider } from '@/store'
import H1 from '@/components/ui/H1'
import Nav from '@/components/layout/Nav'
import RightPillWrapper from '@/components/wrappers/RightPillWrapper'
import TopicTags from '@/components/layout/TopicTags'
import HeaderWrapper from '@/components/wrappers/HeaderWrapper'
import GroupsSlider from '@/components/layout/GroupSlider'

export default async function UserLanding() {
  let user: User, topics: GroupTopic[]
  try {
    // TODO Add auth and getUser from endpoint
    user = await getUser('1')
    topics = await getTopics(13)
  } catch (err) {
    notFound()
  }
  return (
    <ConnectProvider>
      <HeaderWrapper>
        <Nav user={user} />
      </HeaderWrapper>
      <RightPillWrapper>
        <H1>find your group</H1>
        <TopicTags topics={topics} />
        <GroupsSlider />
      </RightPillWrapper>
    </ConnectProvider>
  )
}
