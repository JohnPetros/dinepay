import { useRef } from 'react'

import type { DialogRef } from '@/ui/components/shared/dialog/types'
import { Button } from '@/ui/components/shared/button'
import { Dialog } from '@/ui/components/shared/dialog'
import { WaiterSelector } from '@/ui/components/shared/waiter-selector'
import { usePayamentButton } from './use-payment-button'
import { Loading } from '@/ui/components/shared/loading'

export const PayamentButton = () => {
  const dialogRef = useRef<DialogRef>(null)
  const {
    isLoading,
    tipCalulator,
    handleButtonClick,
    handleDialogConfirm,
    handleSelectWaiter,
  } = usePayamentButton(dialogRef)

  return (
    <>
      <Dialog
        ref={dialogRef}
        title='Waiter'
        description="select the waiter's wallet."
        onConfirm={handleDialogConfirm}
      >
        <div className='w-max mx-auto h-16'>
          <WaiterSelector onSelect={handleSelectWaiter} canSelectAll={false} />
        </div>
      </Dialog>
      <Button
        bg='tertiary'
        disabled={!tipCalulator.canCreateReceipt || isLoading}
        onClick={handleButtonClick}
      >
        {isLoading ? <Loading className='mx-auto' /> : 'pay'}
      </Button>
    </>
  )
}
