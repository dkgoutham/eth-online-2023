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

interface IUserContext {
  address: string | undefined
  isConnected: boolean
  user: User | null
  connect: () => void
  disconnect: () => void
}

const ConnectContext = createContext<IUserContext>({
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
  const { address, isConnected, handleConnect, handleDisconnect } = useConnect()
  const [user, setUser] = useState<User | null>(null)
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
        address,
        isConnected,
        user,
        connect: handleConnect,
        disconnect: handleDisconnect,
      }}
    >
      {children}
    </ConnectContext.Provider>
  )
}
