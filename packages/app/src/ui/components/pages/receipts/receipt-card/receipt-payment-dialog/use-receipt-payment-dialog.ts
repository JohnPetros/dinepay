import { useState, type RefObject } from 'react'

import { useWeb3 } from '@/infra/web3'
import type { DialogRef } from '@/ui/components/shared/dialog/types'
import { useToast } from '@/ui/hooks'

type UseReceiptPaymentDialogProps = {
  receiptId: number
  waiterAccount: string
  dialogRef: RefObject<DialogRef>
  onStartPayment: VoidFunction
  onEndPayment: VoidFunction
  onPay: VoidFunction
}

export function useReceiptPaymentDialog({
  receiptId,
  waiterAccount,
  dialogRef,
  onPay,
  onStartPayment,
  onEndPayment,
}: UseReceiptPaymentDialogProps) {
  const [waiterDividend, setWaiterDividend] = useState(0)
  const web3 = useWeb3()
  const toast = useToast()

  async function handleButtonClick() {
    const response = await web3.dinepayContract.getWaiterDividend(waiterAccount)

    if (response.isFailure) {
      toast.error(response.errorMessage)
    }

    setWaiterDividend(response.data)
    dialogRef.current?.open()
  }

  async function handleDialogConfirm() {
    onStartPayment()
    const response = await web3.dinepayContract.payWaiterReceipt(receiptId)

    onEndPayment()
    dialogRef.current?.close()

    if (response.isFailure) {
      toast.error(response.errorMessage)
      return
    }

    onPay()
  }

  return {
    waiterDividend,
    handleButtonClick,
    handleDialogConfirm,
  }
}
