import { notFound } from 'next/navigation'
import { getUser } from '@/services'
import { User } from '@/model'
import H1 from '@/components/ui/H1'
import Nav from '@/components/layout/Nav/Nav'
import MainWrapper from '@/components/wrappers/MainWrapper'

export default async function UserLanding({
  params,
}: {
  params: { userID: string }
}) {
  let user: User
  try {
    // TODO Add auth
    user = await getUser(params.userID)
  } catch (err) {
    notFound()
  }
  return (
    <>
      <Nav user={user} />
      <MainWrapper>
        <H1>find your group {user.username}</H1>
      </MainWrapper>
    </>
  )
}
