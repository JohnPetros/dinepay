import type { RefObject } from 'react'

import { useWeb3 } from '@/infra/web3'
import { useToast } from '@/ui/hooks'
import type { DialogRef } from '@/ui/components/shared/dialog/types'

type UseWaiterPaymentDialogProps = {
  waiterAccount: string
  dialogRef: RefObject<DialogRef>
  onStartPayment: VoidFunction
  onEndPayment: VoidFunction
  onPay: VoidFunction
}

export function useWaiterPaymentDialog({
  waiterAccount,
  dialogRef,
  onPay,
  onStartPayment,
  onEndPayment,
}: UseWaiterPaymentDialogProps) {
  const web3 = useWeb3()
  const toast = useToast()

  function handleButtonClick() {
    dialogRef.current?.open()
  }

  async function handleDialogConfirm() {
    onStartPayment()
    const response = await web3.dinepayContract.payWaiter(waiterAccount)

    onEndPayment()
    dialogRef.current?.close()

    if (response.isFailure) {
      toast.error(response.errorMessage)
      return
    }

    onPay()
  }

  return {
    handleButtonClick,
    handleDialogConfirm,
  }
}
