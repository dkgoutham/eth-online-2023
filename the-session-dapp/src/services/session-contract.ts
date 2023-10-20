import { ContractReceipt, ContractTransaction, utils } from 'ethers'
import { connectContract, getExplorerURL, isAdmin } from '@/utils'
import { Tag, WeekDay, ShortHour, CreateGroupRequest } from '@/model'

export const createGroup = async (req: CreateGroupRequest) => {
  try {
    const { sessionContract } = connectContract()
    const tx = await sessionContract!.createGroup(...Object.values(req))
    const receipt = await tx.wait()
    return getExplorerURL(receipt.transactionHash)
  } catch (_) {
    throw new Error('There was an error creating your group')
  }
}

/**
 * Quick operations for admins
 */

export const addSuperUser = async () => {
  try {
    const { address, sessionContract } = await isAdmin()
    const isRegistered = await sessionContract!.isUserRegistered(address)
    const txHashes: string[] = []
    if (!isRegistered) {
      const tx1: ContractTransaction = await sessionContract!.addGeneralUser(
        'admin',
        { value: utils.parseEther('0.01') }
      )
      const receipt1: ContractReceipt = await tx1.wait()
      const tx2: ContractTransaction = await sessionContract!.addModerator(
        'admin',
        'admin moderator'
      )
      const receipt2: ContractReceipt = await tx2.wait()
      const tx3: ContractTransaction = await sessionContract!.addTherapist(
        'admin',
        'anxiety',
        '0123',
        'admin therapist'
      )
      const receipt3: ContractReceipt = await tx3.wait()
      for (const receipt of [receipt1, receipt2, receipt3])
        txHashes.push(getExplorerURL(receipt.transactionHash))
      return txHashes
    } else {
      throw new Error('User is already registered')
    }
  } catch (err) {
    throw err
  }
}

export const createTestGroup = async () => {
  const groupTestData = {
    title: 'Test Group',
    tag: Tag.anxiety,
    day: 'Wednesday' as WeekDay,
    time: '3 PM' as ShortHour,
    duration: 10,
    groupDescription: 'Group created for test purposes',
  }
  try {
    await isAdmin()
    const txURL = await createGroup(groupTestData)
    return txURL
  } catch (_) {
    throw new Error('There was an error creating your group')
  }
}
