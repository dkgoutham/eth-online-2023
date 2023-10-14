import SSLogo from './SSLogo'
import UserActions from './UserActions'
import { User } from '@/model'
import { MAX_WIDTH } from '@/config'

interface IProps {
  user: User
}

export default function Nav({ user }: IProps) {
  return (
    <nav className='mb-8'>
      <ul
        className={`mx-auto mt-10 flex h-[3rem] w-full max-w-[${MAX_WIDTH}px] items-center justify-between rounded-full border-[1px] border-solid border-[--black] px-[4rem] dark:border-[--white]`}
      >
        <SSLogo />
        <UserActions user={user} />
      </ul>
    </nav>
  )
}
