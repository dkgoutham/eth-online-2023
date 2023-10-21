import { notFound } from 'next/navigation'
import { getTopics } from '@/services'
import H1 from '@/components/ui/H1'
import Nav from '@/components/layout/Nav'
import RightPillWrapper from '@/components/wrappers/RightPillWrapper'
import TopicTags from '@/components/layout/TopicTags'
import HeaderWrapper from '@/components/wrappers/HeaderWrapper'
import GroupsSlider from '@/components/layout/GroupSlider'

export default async function UserLanding() {
  try {
    const topics = await getTopics(13)
    return (
      <>
        <HeaderWrapper>
          <Nav />
        </HeaderWrapper>
        <RightPillWrapper>
          <H1>find your group</H1>
          <TopicTags topics={topics} />
          <GroupsSlider />
        </RightPillWrapper>
      </>
    )
  } catch (err) {
    notFound()
  }
}
