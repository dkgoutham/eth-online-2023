'use client'

import { useState, useEffect } from 'react'

export const useConnect = (): boolean => {
  const [isConnected, setIsConnected] = useState<boolean>(false)

  useEffect(() => {
    if (!window.ethereum) return
    setIsConnected(true)
  }, [])

  return isConnected
}
