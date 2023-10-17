import { useState } from 'react'

interface IUseConnect {
  isConnected: boolean
  handleConnect: (connect: boolean) => void
}

export const useConnect = (): IUseConnect => {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const handleConnect = (connect: boolean) => {
    setIsConnected(connect)
  }
  return { isConnected, handleConnect }
}
