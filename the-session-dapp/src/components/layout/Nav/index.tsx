import SSLogo from './SSLogo'
import UserActions from './UserActions'
import { User } from '@/model'

interface IProps {
  user: User
}

export default function Nav({ user }: IProps) {
  return (
    <nav className='h-[3rem] w-full'>
      <ul className='flex h-full items-center justify-between rounded-full border-[1px] border-solid border-[--black] px-[4rem] dark:border-[--white]'>
        <SSLogo />
        <UserActions user={user} />
      </ul>
    </nav>
  )
}
