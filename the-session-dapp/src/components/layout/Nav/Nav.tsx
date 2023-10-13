import SSLogo from './SSLogo'
import UserActions from './UserActions'
import { User } from '@/model'

interface IProps {
  user: User
}

export default function Nav({ user }: IProps) {
  return (
    <nav>
      <ul className='mx-auto mt-10 h-[3rem] w-screen max-w-[1080px] rounded-full border-[1px] border-solid border-[--black] px-[4rem] py-[0.75rem] dark:border-[--white]'>
        <SSLogo />
        <UserActions user={user} />
      </ul>
    </nav>
  )
}
