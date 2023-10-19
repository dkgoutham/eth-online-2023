'use client'

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from 'react'
import { useConnect } from '@/hooks'
import { getUser } from '@/services'
import { notFound } from 'next/navigation'
import { User } from '@/model'
import { providers } from 'ethers'

interface IUserContext {
  hasWallet: boolean
  signer: providers.JsonRpcSigner | undefined
  address: string | undefined
  isConnected: boolean
  user: User | null
  connect: () => void
  disconnect: () => void
}

const ConnectContext = createContext<IUserContext>({
  hasWallet: false,
  signer: undefined,
  address: undefined,
  isConnected: false,
  user: null,
  connect() {},
  disconnect() {},
})

export function useConnectContext() {
  return useContext(ConnectContext)
}

interface IProps {
  children: ReactNode
}

export function ConnectProvider({ children }: IProps) {
  const { hasWallet, signer, address, isConnected, handleConnect } =
    useConnect()
  const [user, setUser] = useState<User | null>(null)
  const connect = () => handleConnect(true)
  const disconnect = () => handleConnect(false)
  const fetchUser = async (userId: string) => {
    try {
      const user = await getUser(userId)
      setUser(user)
    } catch (err) {
      notFound()
    }
  }

  useEffect(() => {
    if (!isConnected) return
    fetchUser('1')
  }, [isConnected])

  return (
    <ConnectContext.Provider
      value={{
        hasWallet,
        signer,
        address,
        isConnected,
        user,
        connect,
        disconnect,
      }}
    >
      {children}
    </ConnectContext.Provider>
  )
}
