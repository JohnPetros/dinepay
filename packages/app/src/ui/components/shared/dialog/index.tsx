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
import { Icon } from '../icon'

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
  const { isOpen, open, close, handleCloseButtonClick, handleConfirmButtonClick } =
    useDialog(onConfirm)

  useImperativeHandle(
    ref,
    () => {
      return {
        open,
        close,
      }
    },
    [open, close],
  )

  return (
    <DialogContainer open={isOpen} onClose={() => {}}>
      <div className='fixed inset-0 flex w-screen items-center justify-center bg-black/70'>
        <DialogPanel className='max-w-lg w-full space-y-4 border bg-white p-6 rounded-lg'>
          <div className='flex items-center justify-between'>
            <DialogTitle className='text-2xl text-very-dark-cyan font-bold'>
              {title}
            </DialogTitle>
            <button type='button' onClick={handleCloseButtonClick}>
              <Icon name='close' className='text-lg text-grayish-cyan' />
            </button>
          </div>
          <Description className='text-very-dark-cyan text-lg font-medium'>
            {description}
          </Description>
          {children}
          <div className='flex gap-4'>
            <Button size='small' onClick={handleConfirmButtonClick}>
              Confirm
            </Button>
          </div>
        </DialogPanel>
      </div>
    </DialogContainer>
  )
}

export const Dialog = forwardRef(DialogComponent)
