'use client'

import Button from '@/components/ui/Button'
import { useDarkMode } from '@/hooks'
import { ConnectButton as RainbowButton } from '@rainbow-me/rainbowkit'

export default function ConnectButton() {
  const isDarkmode = useDarkMode()
  return (
    <RainbowButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted
        const connected = ready && account && chain

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button onClick={openConnectModal}>Connect Wallet</Button>
                )
              }

              if (chain.unsupported) {
                return <Button onClick={openChainModal}>Wrong network</Button>
              }

              return (
                <div className='flex gap-3'>
                  <Button onClick={openChainModal}>
                    {chain.hasIcon && (
                      <div
                        className='dark:bg-orange mr-1 h-3 w-3 overflow-hidden rounded-full bg-[--blue]'
                        style={{
                          background: chain.iconBackground,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </Button>

                  <Button onClick={openAccountModal}>
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </Button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </RainbowButton.Custom>
  )
}
