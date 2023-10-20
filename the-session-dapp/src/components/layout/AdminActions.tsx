'use client'

import { useConnectContext } from '@/store'
import { ADMIN_ADDRESS } from '@/config'
import { addSuperUser, createTestGroup } from '@/utils'
import Button from '../ui/Button'

export default function AdminActions() {
  const { isConnected, address } = useConnectContext()
  const handleAddSuperUser = async () => {
    try {
      const hashes = await addSuperUser()
      alert(hashes?.join('\n'))
    } catch (error) {
      alert(error)
    }
  }
  const handleCreateGroup = async () => {
    try {
      const hash = await createTestGroup()
      alert(hash)
    } catch (error) {
      alert(error)
    }
  }
  if (!isConnected || ADMIN_ADDRESS !== address) return null
  return (
    <div className='mt-12 flex flex-col gap-2 rounded border-2 border-[--accent] p-16'>
      <h2 className='mb-8 text-center text-2xl font-bold'>Admin Actions</h2>
      <Button onClick={handleAddSuperUser}>Add Super User</Button>
      <Button onClick={handleCreateGroup}>Create Test Group</Button>
    </div>
  )
}
