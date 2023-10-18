import { useState, useCallback } from 'react'
import { Client } from '@xmtp/xmtp-js'
import { createWallet, createClient } from '@/utils'
import type { HDNodeWallet, Wallet } from 'ethers'

interface IUseConnect {
  xmtp: Promise<Client>
  wallet: HDNodeWallet | Wallet
  isConnected: boolean
  handleConnect: (connect: boolean) => void
}

export const useConnect = (provider?: any): IUseConnect => {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const wallet = createWallet(provider)
  const xmtp = createClient(wallet).then((client) => client)
  const handleConnect = useCallback(async (connect: boolean) => {
    setIsConnected(connect)
  }, [])

  return { xmtp, wallet, isConnected, handleConnect }
}
