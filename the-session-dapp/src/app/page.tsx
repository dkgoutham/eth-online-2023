import { getGroups } from '@/services'
import MainWrapper from '@/components/wrappers/MainWrapper'
import TheSessionLogo from '@/components/layout/TheSessionLogo'
import TagLineSection from '@/components/layout/TagLineSection'
import ConnectButton from '@/components/layout/ConnectButton'
import HeaderWrapper from '@/components/wrappers/HeaderWrapper'
import SectionWrapper from '@/components/wrappers/SectionWrapper'
import GroupsSlider from '@/components/layout/GroupsSlider'

export default async function Home() {
  const groups = await getGroups(5)
  return (
    <>
      <HeaderWrapper>
        <TheSessionLogo />
      </HeaderWrapper>
      <MainWrapper className='gap-12'>
        <SectionWrapper>
          <TagLineSection />
        </SectionWrapper>
        <SectionWrapper>
          <GroupsSlider groups={groups} />
        </SectionWrapper>
        <SectionWrapper>
          <ConnectButton />
        </SectionWrapper>
      </MainWrapper>
    </>
  )
}
