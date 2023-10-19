import { useState, useCallback, useEffect } from 'react'
import { providers } from 'ethers'
import { getWeb3, getAddress } from '@/utils'

interface IUseConnect {
  hasWallet: boolean
  address: string | undefined
  isConnected: boolean
  signer: providers.JsonRpcSigner | undefined
  handleConnect: (connect: boolean) => void
}

export const useConnect = (): IUseConnect => {
  const [hasWallet, setHasWallet] = useState<boolean>(false)
  const [provider, setProvider] = useState<providers.Web3Provider | null>(null)
  const [signer, setSigner] = useState<providers.JsonRpcSigner | undefined>()
  const [address, setAddress] = useState<string | undefined>()
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const handleConnect = useCallback(
    async (connect: boolean) => {
      provider?.getSigner()
      setIsConnected(connect)
    },
    [provider]
  )
  const handleSetAddress = useCallback(async () => {
    const signerAddress = await signer?.getAddress()
    setAddress(signerAddress)
  }, [signer])

  useEffect(() => {
    if (window.ethereum) {
      setHasWallet(true)
      setProvider(getWeb3(window.ethereum))
    }
  }, [hasWallet])

  useEffect(() => {
    if (provider) setSigner(provider.getSigner())
  }, [provider])

  useEffect(() => {
    if (signer) handleSetAddress()
  }, [handleSetAddress, signer])

  return { hasWallet, signer, address, isConnected, handleConnect }
}
