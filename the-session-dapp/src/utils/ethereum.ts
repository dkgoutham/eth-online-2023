import { CONTRACT_ADDRESS, CONTRACT_ABI, ADMIN_ADDRESS } from '@/config'
import { Tag, WeekDay, ShortHour, CreateGroupRequest } from '@/model'
import {
  providers,
  Contract,
  ContractReceipt,
  ContractTransaction,
  utils,
} from 'ethers'

/**
 * General purpose ethereum helpers
 */

export const getExplorerURL = (hash: string) =>
  `https://sepolia.scrollscan.com/tx/${hash}`

export const getWeb3 = (ethereum: any) => new providers.Web3Provider(ethereum)

export const getSigner = (provider: providers.Web3Provider) => {
  const errorMessage = "We couldn't connect with your wallet."
  try {
    if (!provider) throw new Error(errorMessage)
    return provider.getSigner()
  } catch (_) {
    throw new Error(errorMessage)
  }
}

export const getAddress = async (
  signer: providers.JsonRpcSigner | undefined
) => {
  try {
    if (!signer) throw new Error('No signer address found')
    return await signer.getAddress()
  } catch (err) {
    throw err
  }
}

interface IConnectContract {
  signer: providers.JsonRpcSigner | undefined
  sessionContract: Contract | undefined
}

export const connectContract = (): IConnectContract => {
  try {
    const { ethereum } = window
    if (ethereum) {
      const provider = getWeb3(ethereum)
      const signer = getSigner(provider)
      const sessionContract = new Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      )
      return { signer, sessionContract }
    } else {
      throw new Error('Please use a browser with browser wallet support.')
    }
  } catch (err) {
    throw err
  }
}

/**
 * Contract operations
 */

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

export const isAdmin = async () => {
  try {
    const { signer, sessionContract } = connectContract()
    const address = await getAddress(signer)
    const allowed = ADMIN_ADDRESS === address
    if (!allowed) throw new Error("You're not an admin")
    return { address, sessionContract }
  } catch (err) {
    throw err
  }
}

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
