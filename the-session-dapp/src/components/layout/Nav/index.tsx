import SSLogo from './SSLogo'
import UserActions from './UserActions'

export default function Nav() {
  return (
    <nav className='h-[3rem] w-full'>
      <ul className='flex h-full items-center justify-between rounded-full border-[1px] border-solid border-[--black] px-6 dark:border-[--white] sm:px-16'>
        <SSLogo />
        <UserActions />
      </ul>
    </nav>
  )
}
