import { providers, Wallet } from 'ethers'

export const createWallet = (
  provider?: providers.Web3Provider | null
): Wallet => Wallet.createRandom(provider ?? null)

export const getWeb3 = (ethereum: any) => new providers.Web3Provider(ethereum)

export const getSigner = (provider: providers.Web3Provider) => {
  try {
    if (!provider) return undefined
    return provider.getSigner()
  } catch (_) {
    return undefined
  }
}

export const getAddress = async (
  signer: providers.JsonRpcSigner | undefined
) => {
  try {
    if (!signer) return undefined
    return await signer.getAddress()
  } catch (_) {
    return undefined
  }
}
