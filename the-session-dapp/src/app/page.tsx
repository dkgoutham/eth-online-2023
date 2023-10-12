import MainWrapper from '@/components/wrappers/MainWrapper'
import TheSessionLogo from '@/components/layout/TheSessionLogo'
import TagLineSection from '@/components/layout/TagLineSection'
import ConnectButton from '@/components/layout/ConnectButton'

export default function Home() {
  return (
    <MainWrapper>
      <TheSessionLogo />
      <TagLineSection />
      <ConnectButton />
    </MainWrapper>
  )
}
