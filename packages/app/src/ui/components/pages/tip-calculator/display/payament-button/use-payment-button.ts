import { useState, type RefObject } from 'react'

import type { DialogRef } from '@/ui/components/shared/dialog/types'
import { WAITERS } from '@/ui/constants/waiters'
import { useTipCalculatorContext } from '@/ui/contexts/tip-calculator-context'
import { useToast } from '@/ui/hooks'
import { useWeb3 } from '@/infra/web3'

export function usePayamentButton(dialogRef: RefObject<DialogRef>) {
  const [waiterAccountAddress, setWaiterAccountAddress] = useState(
    WAITERS[0].accountAddress,
  )
  const { tipCalulator } = useTipCalculatorContext()
  const web3 = useWeb3()
  const toast = useToast()

  function handleButtonClick() {
    dialogRef.current?.open()
  }

  async function handleSelectWaiter(waiterAccountAddress: string) {
    setWaiterAccountAddress(waiterAccountAddress)
  }

  async function handleDialogConfirm() {
    const customerAccountAddress = await web3.getCustomerAccountAddress()
    const receipt = tipCalulator.createReceipt(
      customerAccountAddress,
      waiterAccountAddress,
    )

    const response = await web3.registerReceipt(receipt)

    if (response.isFailure) {
      toast.error(response.errorMessage)
      return
    }

    toast.success('Receipt sucesscfully tranfered!')
  }

  return {
    tipCalulator,
    handleSelectWaiter,
    handleButtonClick,
    handleDialogConfirm,
  }
}
