import { createContext, useRef, type ReactNode } from 'react'

import type { DialogRef } from '@/ui/components/shared/dialog/types'
import { Dialog } from '@/ui/components/shared/dialog'
import type { WalletContextValue } from './types/wallet-context-value'
import { useWalletProvider, useWalletContext } from './hooks'

export const WalletContext = createContext<WalletContextValue>({} as WalletContextValue)

type MetamaskProviderProps = {
  children: ReactNode
}

export const WalletProvider = ({ children }: MetamaskProviderProps) => {
  const metamaskWallet = window.ethereum
  const dialogRef = useRef<DialogRef>(null)
  const { hasWallet } = useWalletProvider(metamaskWallet, dialogRef)

  return (
    <WalletContext.Provider value={{ wallet: metamaskWallet }}>
      <Dialog ref={dialogRef} title='Alert' description='Metamask wallet not found.'>
        <p>You must have the metamask extension to continue using this app.</p>
      </Dialog>
      {hasWallet ? (
        children
      ) : (
        <main className='grid place-content-center h-screen'>
          <p className='font-bold text-xl text-very-dark-cyan'>
            Download Metamask extension for your browser and then go back 😁.
          </p>
        </main>
      )}
    </WalletContext.Provider>
  )
}

export { useWalletContext }
