import { notFound } from 'next/navigation'
import { getUser } from '@/services'
import { User } from '@/model'
import H1 from '@/components/ui/H1'
import Nav from '@/components/layout/Nav'
import FindGroupWrapper from '@/components/wrappers/FindGroupWrapper'

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
      <FindGroupWrapper>
        <H1>find your group</H1>
      </FindGroupWrapper>
    </>
  )
}
