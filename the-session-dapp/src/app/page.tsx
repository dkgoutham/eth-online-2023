import MainWrapper from '@/components/wrappers/MainWrapper'
import TheSessionLogo from '@/components/layout/TheSessionLogo'
import TagLineSection from '@/components/layout/TagLineSection'
import ConnectButton from '@/components/layout/ConnectButton'
import HeaderWrapper from '@/components/wrappers/HeaderWrapper'

export default function Home() {
  return (
    <>
      <HeaderWrapper>
        <TheSessionLogo />
      </HeaderWrapper>
      <MainWrapper>
        <TagLineSection />
        <ConnectButton />
      </MainWrapper>
    </>
  )
}
