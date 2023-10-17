import { ConnectProvider } from '@/store'
import MainWrapper from '@/components/wrappers/MainWrapper'
import TheSessionLogo from '@/components/layout/TheSessionLogo'
import TagLineSection from '@/components/layout/TagLineSection'
import HeaderWrapper from '@/components/wrappers/HeaderWrapper'
import SectionWrapper from '@/components/wrappers/SectionWrapper'
import GroupsSlider from '@/components/layout/GroupsSlider'
import HomeConnect from '@/components/layout/HomeConnect'

export default async function Home() {
  return (
    <>
      <ConnectProvider>
        <HeaderWrapper>
          <TheSessionLogo />
        </HeaderWrapper>
        <MainWrapper className='gap-12'>
          <SectionWrapper>
            <TagLineSection />
          </SectionWrapper>
          <SectionWrapper>
            <GroupsSlider />
          </SectionWrapper>
          <SectionWrapper>
            <HomeConnect />
          </SectionWrapper>
        </MainWrapper>
      </ConnectProvider>
    </>
  )
}
