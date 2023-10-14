import { User } from '@/model'
import Badge from './Badge'
import Avatar from './Avatar'

interface IProps {
  user: User
}

export default function UserActions({
  user: { id, username, avatar, notifications },
}: IProps) {
  return (
    <li className='flex items-center gap-4'>
      <span className='hidden max-w-[10ch] truncate sm:inline'>
        hi {username || id}!
      </span>
      <Avatar src={avatar} />
      {notifications > 0 && <Badge notifications={notifications} />}
    </li>
  )
}
