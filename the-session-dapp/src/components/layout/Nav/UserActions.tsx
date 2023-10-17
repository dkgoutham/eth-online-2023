'use client'

import Badge from './Badge'
import Avatar from './Avatar'
import ConnectButton from '../ConnectButton'
import { useConnectContext } from '@/store'

export default function UserActions() {
  const { isConnected, user, disconnect } = useConnectContext()

  if (user && isConnected) {
    const { id, username, avatar, notifications } = user
    return (
      <li
        className='flex cursor-pointer items-center gap-4'
        onClick={() => disconnect()}
      >
        <span className='hidden max-w-[10ch] truncate sm:inline'>
          hi {username || id}!
        </span>
        <Avatar src={avatar} />
        {notifications > 0 && <Badge notifications={notifications} />}
      </li>
    )
  }
  return <ConnectButton />
}
