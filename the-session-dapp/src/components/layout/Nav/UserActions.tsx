import { User } from '@/model'
import Badge from './Badge'

interface IProps {
  user: User
}

export default function UserActions({
  user: { id, username, avatar, notifications },
}: IProps) {
  return (
    <li className='h-full'>
      <span>{username || id}</span>
      <span>
        {avatar ? (
          <img alt='User Avatar' src={avatar} />
        ) : (
          <span className='mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-800 dark:bg-gray-700 dark:text-blue-400'>
            <svg
              className='h-3 w-3'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
            </svg>
            <span className='sr-only'>Icon description</span>
          </span>
        )}
        {notifications && <Badge notifications={notifications} />}
      </span>
    </li>
  )
}
