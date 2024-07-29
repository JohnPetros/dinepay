import { forwardRef, type ForwardedRef, useImperativeHandle, type ReactNode } from 'react'
import {
  Description,
  Dialog as DialogContainer,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'

import type { DialogRef } from './types'
import { useDialog } from './use-dialog'
import { Button } from '../button'

type DialogProps = {
  title: string
  description: string
  children: ReactNode
  onConfirm?: VoidFunction
}

const DialogComponent = (
  { title, description, children, onConfirm }: DialogProps,
  ref: ForwardedRef<DialogRef>,
) => {
  const { isOpen, open, handleButtonClick } = useDialog(onConfirm)

  useImperativeHandle(
    ref,
    () => {
      return {
        open,
      }
    },
    [open],
  )

  return (
    <DialogContainer role='dialog' open={isOpen} onClose={() => {}}>
      <div className='fixed inset-0 flex w-screen items-center justify-center bg-black/70'>
        <DialogPanel className='max-w-lg w-full space-y-4 border bg-white p-6 rounded-lg'>
          <DialogTitle className='text-2xl text-very-dark-cyan font-bold'>
            {title}
          </DialogTitle>
          <Description className='text-very-dark-cyan text-lg font-medium'>
            {description}
          </Description>
          {children}
          <div className='flex gap-4'>
            <Button size='small' onClick={handleButtonClick}>
              Confirm
            </Button>
          </div>
        </DialogPanel>
      </div>
    </DialogContainer>
  )
}

export const Dialog = forwardRef(DialogComponent)
