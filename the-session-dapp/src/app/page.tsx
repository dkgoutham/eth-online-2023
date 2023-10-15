import MainWrapper from '@/components/wrappers/MainWrapper'
import TheSessionLogo from '@/components/layout/TheSessionLogo'
import TagLineSection from '@/components/layout/TagLineSection'
import ConnectButton from '@/components/layout/ConnectButton'
import HeaderWrapper from '@/components/wrappers/HeaderWrapper'
import SectionWrapper from '@/components/wrappers/SectionWrapper'

export default function Home() {
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
          <ConnectButton />
        </SectionWrapper>
      </MainWrapper>
    </>
  )
}
