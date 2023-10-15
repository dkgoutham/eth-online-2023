import { notFound } from 'next/navigation'
import { getTopics, getUser, getGroups } from '@/services'
import { User, GroupTopic, Group } from '@/model'
import H1 from '@/components/ui/H1'
import Nav from '@/components/layout/Nav'
import RightPillWrapper from '@/components/wrappers/RightPillWrapper'
import TopicTags from '@/components/layout/TopicTags'
import HeaderWrapper from '@/components/wrappers/HeaderWrapper'
import GroupsSlider from '@/components/layout/GroupsSlider'

export default async function UserLanding({
  params,
}: {
  params: { userID: string }
}) {
  let user: User, topics: GroupTopic[], groups: Group[]
  try {
    // TODO Add auth
    user = await getUser(params.userID)
    topics = await getTopics(13)
    groups = await getGroups(6)
  } catch (err) {
    notFound()
  }
  return (
    <>
      <HeaderWrapper>
        <Nav user={user} />
      </HeaderWrapper>
      <RightPillWrapper>
        <H1>find your group</H1>
        <TopicTags topics={topics} />
        <GroupsSlider groups={groups} />
      </RightPillWrapper>
    </>
  )
}
