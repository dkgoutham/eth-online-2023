'use client'

import { useAccountModal } from '@rainbow-me/rainbowkit'
import Badge from './Badge'
import Avatar from './Avatar'
import ConnectButton from '../ConnectButton'
import { useConnectContext } from '@/store'

export default function UserActions() {
  const { isConnected, user } = useConnectContext()
  const { openAccountModal } = useAccountModal()

  if (user && isConnected) {
    const { id, username, avatar, notifications } = user
    return (
      <li
        className='flex cursor-pointer items-center gap-4'
        onClick={openAccountModal}
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
