'use client'

import { useConnectContext } from '@/store'
import { ADMIN_ADDRESS } from '@/config'
import { createGroup } from '@/utils'
import Button from '../ui/Button'

export default function AdminActions() {
  const { isConnected, address } = useConnectContext()
  const handleCreateGroups = () => {
    try {
      createGroup()
    } catch (error) {
      alert(error)
    }
  }
  if (!isConnected || ADMIN_ADDRESS !== address) return null
  return (
    <div className='my-4'>
      <Button onClick={handleCreateGroups}>Create Group</Button>
    </div>
  )
}
