import { useRef } from 'react'

import { Button } from '@/ui/components/shared/button'
import { Dialog } from '@/ui/components/shared/dialog'
import type { DialogRef } from '@/ui/components/shared/dialog/types'
import { useWaiterPaymentDialog } from './use-waiter-payment-dialog'

type WaiterPaymentDialogProps = {
  waiterName: string
  tipAmount: number
  waiterAccount: string
  onStartPayment: VoidFunction
  onEndPayment: VoidFunction
  onPay: VoidFunction
}

export const WaiterPaymentDialog = ({
  waiterName,
  waiterAccount,
  tipAmount,
  onStartPayment,
  onEndPayment,
  onPay,
}: WaiterPaymentDialogProps) => {
  const dialogRef = useRef<DialogRef>(null)

  const { handleButtonClick, handleDialogConfirm } = useWaiterPaymentDialog({
    waiterAccount,
    dialogRef,
    onPay,
    onStartPayment,
    onEndPayment,
  })

  return (
    <>
      <Dialog
        ref={dialogRef}
        title={`Payment of ${waiterName}`}
        description='Are you sure about this action?'
        onConfirm={handleDialogConfirm}
      >
        <p>
          Transfering {tipAmount} of ETH to {waiterAccount}
        </p>
      </Dialog>
      <Button size='small' onClick={handleButtonClick}>
        pay waiter
      </Button>
    </>
  )
}
