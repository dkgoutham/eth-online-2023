import MainWrapper from '@/components/wrappers/MainWrapper'
import TheSessionLogo from '@/components/layout/TheSessionLogo'
import TagLineSection from '@/components/layout/TagLineSection'
import HeaderWrapper from '@/components/wrappers/HeaderWrapper'
import SectionWrapper from '@/components/wrappers/SectionWrapper'
import GroupsSlider from '@/components/layout/GroupSlider'
import HomeConnect from '@/components/layout/HomeConnect'
import AdminActions from '@/components/layout/AdminActions'

export default async function Home() {
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
          <GroupsSlider useAccent />
        </SectionWrapper>
        <SectionWrapper>
          <HomeConnect />
          <AdminActions />
        </SectionWrapper>
      </MainWrapper>
    </>
  )
}
