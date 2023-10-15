import { notFound } from 'next/navigation'
import { getGroups, getUser } from '@/services'
import { User, Group } from '@/model'
import H1 from '@/components/ui/H1'
import Nav from '@/components/layout/Nav'
import FindGroupWrapper from '@/components/wrappers/FindGroupWrapper'
import GroupTags from '@/components/layout/GroupTags'
import HeaderWrapper from '@/components/wrappers/HeaderWrapper'

export default async function UserLanding({
  params,
}: {
  params: { userID: string }
}) {
  let user: User, groups: Group[]
  try {
    // TODO Add auth
    user = await getUser(params.userID)
    groups = await getGroups(25)
  } catch (err) {
    notFound()
  }
  return (
    <>
      <HeaderWrapper>
        <Nav user={user} />
      </HeaderWrapper>
      <FindGroupWrapper>
        <H1>find your group</H1>
        <GroupTags groups={groups} />
      </FindGroupWrapper>
    </>
  )
}
