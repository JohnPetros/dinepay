import { useCallback, useState } from 'react'

export function useDialog(onConfirm?: VoidFunction) {
  const [isOpen, seIsOpen] = useState(false)

  const open = useCallback(() => {
    seIsOpen(true)
  }, [])

  const close = useCallback(() => {
    seIsOpen(false)
  }, [])

  function handleConfirmButtonClick() {
    if (onConfirm) onConfirm()
    close()
  }

  function handleCloseButtonClick() {
    close()
  }

  return {
    isOpen,
    open,
    close,
    handleCloseButtonClick,
    handleConfirmButtonClick,
  }
}
