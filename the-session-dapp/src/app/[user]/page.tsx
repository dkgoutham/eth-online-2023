import MainWrapper from '@/components/wrappers/MainWrapper'

export default function User({ params }: { params: { user: string } }) {
  return (
    <MainWrapper>
      <h1>My user: {params.user}</h1>
    </MainWrapper>
  )
}
