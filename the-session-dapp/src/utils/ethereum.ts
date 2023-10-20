import { CONTRACT_ADDRESS, CONTRACT_ABI, ADMIN_ADDRESS } from '@/config'
import { providers, Contract, ContractReceipt } from 'ethers'

/**
 * General purpose ethereum helpers
 */

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

export const createGroup = async () => {
  try {
    const { address, sessionContract } = await isAdmin()
    const isRegistered = await sessionContract!.isUserRegistered(address)
    const txHashes: string[] = []
    if (!isRegistered) {
      const receipt1: ContractReceipt =
        await sessionContract!.addGeneralUser('admin')
      const receipt2: ContractReceipt = await sessionContract!.addModerator(
        'admin',
        'admin moderator'
      )
      const receipt3: ContractReceipt = await sessionContract!.addTherapist(
        'admin',
        'anxiety',
        '0123',
        'admin therapist'
      )
      for (const receipt of [receipt1, receipt2, receipt3])
        txHashes.push(receipt.transactionHash)
    }
  } catch (err) {
    throw err
  }
}
