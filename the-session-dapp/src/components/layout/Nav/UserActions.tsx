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
      <span className='max-w-[10ch] truncate'>hi {username || id}!</span>
      <Avatar src={avatar} />
      {notifications > 0 && <Badge notifications={notifications} />}
    </li>
  )
}
