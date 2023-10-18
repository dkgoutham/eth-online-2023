import { useState, useCallback } from 'react'
import { createWallet } from '@/utils'
import type { HDNodeWallet, Wallet } from 'ethers'

interface IUseConnect {
  wallet: HDNodeWallet | Wallet
  isConnected: boolean
  handleConnect: (connect: boolean) => void
}

export const useConnect = (provider?: any): IUseConnect => {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const wallet = createWallet(provider)
  const handleConnect = useCallback(async (connect: boolean) => {
    setIsConnected(connect)
  }, [])

  return { wallet, isConnected, handleConnect }
}
