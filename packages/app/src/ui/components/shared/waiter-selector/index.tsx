import { type ForwardedRef, forwardRef, useImperativeHandle } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'

import { WAITERS } from '../../../constants/waiters'
import { useWaiterSelector } from './use-waiter-selector'
import type { WaiterSelectorRef } from './types'

type WaiterSelectorProps = {
  canSelectAll?: boolean
  onSelect: (waiterAccountAddress: string) => void
}

export const WaiterSelectorComponent = (
  { canSelectAll = false, onSelect }: WaiterSelectorProps,
  ref: ForwardedRef<WaiterSelectorRef>,
) => {
  const { selectedWaiter, reset, handleSelectorChange } = useWaiterSelector(
    canSelectAll,
    onSelect,
  )

  useImperativeHandle(
    ref,
    () => {
      return {
        reset,
      }
    },
    [reset],
  )

  return (
    <Listbox value='all' onChange={(id) => handleSelectorChange(id)}>
      <ListboxButton
        autoFocus
        className='p-2 rounded-lg ring ring-grayish-cyan focus:very-dark-cyan focus:outline-none'
      >
        {typeof selectedWaiter !== 'string' ? selectedWaiter.name : 'all'}
      </ListboxButton>
      <ListboxOptions
        anchor='bottom'
        transition
        className='shadow-md rounded-lg p-6 transition duration-100 ease-in bg-white data-[leave]:data-[closed]:opacity-0 focus:outline-none scrollbar scrollbar-track-rounded-full scrollbar-thumb-very-dark-cyan scrollbar-track-white'
      >
        {canSelectAll && (
          <ListboxOption
            value='all'
            onChange={() => onSelect('all')}
            className='flex items-center gap-3 rounded-lg px-2 py-4 cursor-pointer data-[focus]:bg-blue-100  '
          >
            All waiters
          </ListboxOption>
        )}
        {WAITERS.map((waiter) => (
          <ListboxOption
            key={waiter.id}
            value={waiter.id}
            onChange={() => handleSelectorChange(waiter.id.toString())}
            className='flex items-center gap-3 rounded-lg p-2 cursor-pointer data-[focus]:bg-blue-100  '
          >
            <img src={waiter.avatar} alt='' className='rounded-full size-16' />
            {waiter.name}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  )
}

export const WaiterSelector = forwardRef(WaiterSelectorComponent)
