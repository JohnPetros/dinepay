import { type RefObject, useCallback, useEffect, useState } from 'react'

import { useWeb3 } from '@/infra/web3'
import { useAmountFormatter, useToast } from '@/ui/hooks'
import { Receipt } from '@dinepay/core/structs'
import type { WaiterSelectorRef } from '../../shared/waiter-selector/types'

export function useReceiptsPage(waiterSelectorRef: RefObject<WaiterSelectorRef>) {
  const web3 = useWeb3()
  const toast = useToast()
  const [receipts, setReceipts] = useState<Receipt[]>([])
  const [balance, setBalance] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const fetchBalance = useCallback(async () => {
    const response = await web3.dinepayContract.getBalance()
    if (response.isSuccess) {
      setBalance(response.data)
      return
    }
    toast.error(response.errorMessage)
  }, [web3, toast.error])

  const fetchReceipts = useCallback(async () => {
    const response = await web3.dinepayContract.getReceipts()
    setIsLoading(false)
    if (response.isSuccess) {
      console.log(response.data)
      const receipts = response.data.map(Receipt.create)
      setReceipts(receipts)
      return
    }
    toast.error(response.errorMessage)
  }, [web3, toast.error])

  async function fetchReceiptsByWaiter(waiterAccount: string) {
    const response = await web3.dinepayContract.getReceiptsByWaiter(waiterAccount)
    setIsLoading(false)
    if (response.isSuccess) {
      const receipts = response.data.map(Receipt.create)
      setReceipts(receipts)
      return
    }
    setReceipts([])
    toast.error(response.errorMessage)
  }

  async function handleSelectWaiter(waiterAccount: string) {
    setIsLoading(true)

    if (waiterAccount === 'all') {
      await fetchReceipts()
      return
    }
    await fetchReceiptsByWaiter(waiterAccount)
  }

  async function handlePayWaiter() {
    await Promise.all([fetchBalance(), fetchReceipts()])
    waiterSelectorRef.current?.reset()
  }

  async function handleWithdrawButtonClick() {
    await web3.dinepayContract.withdraw()
    await handlePayWaiter()
  }

  async function handlePayAllWaitersButtonClick() {
    await web3.dinepayContract.payAllWaiters()
    await handlePayWaiter()
  }

  useEffect(() => {
    fetchBalance()
    fetchReceipts()
  }, [fetchReceipts, fetchBalance])

  return {
    balance: useAmountFormatter(balance),
    receipts,
    isLoading,
    handleSelectWaiter,
    handlePayWaiter,
    handlePayAllWaitersButtonClick,
    handleWithdrawButtonClick,
  }
}
