'use client'

import { useState, useCallback } from 'react'

interface IUseConnect {
  address: string | undefined
  isConnected: boolean
  handleConnect: () => void
  handleDisconnect: () => void
}

export const useConnect = (): IUseConnect => {
  const [address, setAddress] = useState<string | undefined>()
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const handleConnect = useCallback(async () => {}, [])
  const handleDisconnect = useCallback(() => {}, [])
  const handleSetAddress = useCallback(async () => {}, [])

  return {
    address,
    isConnected,
    handleConnect,
    handleDisconnect,
  }
}
