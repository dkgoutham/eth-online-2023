import SSLogo from './SSLogo'
import UserActions from './UserActions'
import { User } from '@/model'

interface IProps {
  user: User
}

export default function Nav({ user }: IProps) {
  return (
    <nav>
      <ul className='mx-auto mt-10 flex h-[3rem] w-screen max-w-[1080px] items-center justify-between rounded-full border-[1px] border-solid border-[--black] px-[4rem] dark:border-[--white]'>
        <SSLogo />
        <UserActions user={user} />
      </ul>
    </nav>
  )
}
