import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'

import '../../../styles/global.css'
import { WalletProvider } from '@/ui/contexts/wallet-context'
import { Router } from './router'

const root = document.getElementById('root')

if (root)
  createRoot(root).render(
    <StrictMode>
      <WalletProvider>
        <Toaster duration={2000} richColors position='top-right' />
        <div className='font-space-mono min-h-screen bg-light-grayish-cyan'>
          <div className='max-w-[1200px] w-full mx-auto pt-12'>
            <h1 className='text-2xl text-center text-dark-grayish-cyan font-semibold'>
              DinePay
            </h1>
            <div className='mt-24'>
              <Router />
            </div>
          </div>
        </div>
      </WalletProvider>
    </StrictMode>,
  )
