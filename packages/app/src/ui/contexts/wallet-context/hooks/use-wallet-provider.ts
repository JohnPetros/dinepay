import type { DialogRef } from '@/ui/components/shared/dialog/types'
import { type RefObject, useEffect } from 'react'

export function useWalletProvider(
  metamaskWallet: string,
  dialogRef: RefObject<DialogRef>,
) {
  const hasWallet = Boolean(metamaskWallet)

  useEffect(() => {
    if (!hasWallet) {
      dialogRef.current?.open()
    }
  }, [hasWallet, dialogRef])

  return {
    hasWallet,
  }
}
