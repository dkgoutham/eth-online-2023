import { providers, Wallet } from 'ethers'

export const createWallet = (
  provider?: providers.Web3Provider | null
): Wallet => Wallet.createRandom(provider ?? null)

export const getWeb3 = (ethereum: any) => new providers.Web3Provider(ethereum)
