import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Router } from './router'
import '../../../styles/global.css'

const root = document.getElementById('root')

if (root)
  createRoot(root).render(
    <StrictMode>
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
    </StrictMode>,
  )
