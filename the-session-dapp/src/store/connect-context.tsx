'use client'

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from 'react'
import { notFound } from 'next/navigation'
import { useAccount } from 'wagmi'
import { getUser } from '@/services'
import { User } from '@/model'

interface IUserContext {
  address: string | undefined
  isConnected: boolean
  user: User | null
}

const ConnectContext = createContext<IUserContext>({
  address: undefined,
  isConnected: false,
  user: null,
})

export function useConnectContext() {
  return useContext(ConnectContext)
}

interface IProps {
  children: ReactNode
}

export function ConnectProvider({ children }: IProps) {
  const { isConnected, address } = useAccount()
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
  }, [isConnected, address])

  return (
    <ConnectContext.Provider
      value={{
        address,
        isConnected,
        user,
      }}
    >
      {children}
    </ConnectContext.Provider>
  )
}
