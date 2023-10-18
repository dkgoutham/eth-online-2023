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
import { HDNodeWallet } from 'ethers'
import { Client } from '@xmtp/xmtp-js'

interface IUserContext {
  xmtp: Promise<Client> | undefined
  wallet: HDNodeWallet | undefined
  isConnected: boolean
  user: User | null
  connect: () => void
  disconnect: () => void
}

const ConnectContext = createContext<IUserContext>({
  xmtp: undefined,
  wallet: undefined,
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
  const { xmtp, wallet, isConnected, handleConnect } = useConnect()
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
        xmtp,
        wallet: wallet as HDNodeWallet | undefined,
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
