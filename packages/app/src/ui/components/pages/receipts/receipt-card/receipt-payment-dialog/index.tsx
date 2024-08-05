import { useRef } from 'react'

import { Button } from '@/ui/components/shared/button'
import { Dialog } from '@/ui/components/shared/dialog'
import { useReceiptPaymentDialog } from './use-receipt-payment-dialog'
import type { DialogRef } from '@/ui/components/shared/dialog/types'

type ReceiptPaymentDialogProps = {
  receiptId: number
  waiterName: string
  waiterAccount: string
  onPay: VoidFunction
  onStartPayment: VoidFunction
  onEndPayment: VoidFunction
}

export const ReceiptPaymentDialog = ({
  receiptId,
  waiterName,
  waiterAccount,
  onPay,
  onStartPayment,
  onEndPayment,
}: ReceiptPaymentDialogProps) => {
  const dialogRef = useRef<DialogRef>(null)

  const { waiterDividend, handleButtonClick, handleDialogConfirm } =
    useReceiptPaymentDialog({
      waiterAccount,
      receiptId,
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
          Transfering {waiterDividend} of ETH to {waiterAccount}
        </p>
      </Dialog>
      <Button size='small' onClick={handleButtonClick}>
        pay receipt
      </Button>
    </>
  )
}
