import type { ChangeEvent } from 'react'

export function useNumberInput(onChange: (value: number) => void) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(Number(event.currentTarget.value))
  }

  return {
    handleChange,
  }
}
