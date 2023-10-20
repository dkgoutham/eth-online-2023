'use client'

import { useState, useEffect } from 'react'
import {
  getDefaultWallets,
  connectorsForWallets,
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from '@rainbow-me/rainbowkit'
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { scrollSepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { WALLET_CONNECT_ID, ACCENT_DARK, ACCENT_LIGHT } from '.'
import { useDarkMode } from '@/hooks'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [scrollSepolia],
  [publicProvider()]
)

const projectId = WALLET_CONNECT_ID

const { wallets } = getDefaultWallets({
  appName: 'The Session',
  projectId,
  chains,
})

const demoAppInfo = {
  appName: 'The Session',
}

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

interface IProps {
  children: React.ReactNode
}

export function RainbowProvider({ children }: IProps) {
  const [mounted, setMounted] = useState(false)
  const isDarkMode = useDarkMode()
  useEffect(() => setMounted(true), [])
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        theme={
          isDarkMode
            ? darkTheme({ accentColor: ACCENT_DARK })
            : lightTheme({ accentColor: ACCENT_LIGHT })
        }
        chains={chains}
        appInfo={demoAppInfo}
      >
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
