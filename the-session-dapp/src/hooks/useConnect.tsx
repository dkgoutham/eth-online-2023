import { useState, useCallback, useEffect } from 'react'
import { providers } from 'ethers'
import { getWeb3, getSigner, getAddress } from '@/utils'

interface IUseConnect {
  hasWallet: boolean
  address: string | undefined
  isConnected: boolean
  signer: providers.JsonRpcSigner | undefined
  handleConnect: () => void
  handleDisconnect: () => void
}

export const useConnect = (): IUseConnect => {
  const [hasWallet, setHasWallet] = useState<boolean>(false)
  const [provider, setProvider] = useState<providers.Web3Provider | null>(null)
  const [signer, setSigner] = useState<providers.JsonRpcSigner | undefined>()
  const [address, setAddress] = useState<string | undefined>()
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const handleConnect = useCallback(async () => {
    if (provider) {
      const _signer = getSigner(provider)
      const _address = await getAddress(_signer)
      if (!_address) return
      setAddress(_address)
      setIsConnected(true)
    }
  }, [provider])
  const handleDisconnect = () => {
    setIsConnected(false)
    setAddress(undefined)
    setSigner(undefined)
  }
  const handleSetAddress = useCallback(async () => {
    const signerAddress = await getAddress(signer)
    if (signerAddress) setAddress(signerAddress)
  }, [signer])

  useEffect(() => {
    if (window.ethereum) {
      setHasWallet(true)
      setProvider(getWeb3(window.ethereum))
    }
  }, [hasWallet])

  useEffect(() => {
    if (provider) {
      try {
        setSigner(getSigner(provider))
      } catch (_) {
        setSigner(undefined)
        setAddress(undefined)
        setIsConnected(false)
      }
    }
  }, [provider])

  useEffect(() => {
    if (signer) handleSetAddress()
  }, [handleSetAddress, signer])

  return {
    hasWallet,
    signer,
    address,
    isConnected,
    handleConnect,
    handleDisconnect,
  }
}
