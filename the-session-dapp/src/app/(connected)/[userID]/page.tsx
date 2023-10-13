import { notFound } from 'next/navigation'
import { getUser } from '@/services'
import { User } from '@/model'
import Nav from '@/components/layout/Nav/Nav'
import MainWrapper from '@/components/wrappers/MainWrapper'

export default async function UserLanding({
  params,
}: {
  params: { userID: string }
}) {
  let user: User
  try {
    user = await getUser(params.userID)
  } catch (err) {
    notFound()
  }
  return (
    <>
      <Nav user={user} />
      <MainWrapper>
        <h1>My user: {params.userID}</h1>
      </MainWrapper>
    </>
  )
}
