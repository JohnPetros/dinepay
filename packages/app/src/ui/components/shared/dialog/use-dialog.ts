import { useCallback, useState } from 'react'

export function useDialog(onConfirm?: VoidFunction) {
  const [isOpen, seIsOpen] = useState(false)

  function handleButtonClick() {
    seIsOpen(false)
    if (onConfirm) onConfirm()
  }

  const open = useCallback(() => {
    seIsOpen(true)
  }, [])

  return {
    isOpen,
    open,
    handleButtonClick,
  }
}
