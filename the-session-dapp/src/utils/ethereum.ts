import { CONTRACT_ADDRESS, CONTRACT_ABI, ADMIN_ADDRESS } from '@/config'
import { providers, Contract } from 'ethers'

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
