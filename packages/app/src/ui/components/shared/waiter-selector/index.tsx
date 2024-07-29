import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { useWaiterSelector } from './use-waiter-selector'
import { WAITERS } from '../../../constants/waiters'

type WaiterSelectorProps = {
  onSelect: (waiterAccountAddress: string) => void
}

export const WaiterSelector = ({ onSelect }: WaiterSelectorProps) => {
  const { selectedWaiter, handleSelectorChange } = useWaiterSelector(onSelect)

  return (
    <Listbox value={selectedWaiter.id} onChange={(id) => handleSelectorChange(id)}>
      <ListboxButton
        autoFocus
        className='p-3 rounded-lg ring ring-grayish-cyan focus:very-dark-cyan focus:outline-none'
      >
        {selectedWaiter.name}
      </ListboxButton>
      <ListboxOptions
        anchor='bottom'
        transition
        className='shadow-md rounded-lg p-6 transition duration-100 ease-in bg-white data-[leave]:data-[closed]:opacity-0 focus:outline-none scrollbar scrollbar-track-rounded-full scrollbar-thumb-very-dark-cyan scrollbar-track-white'
      >
        {WAITERS.map((waiter) => (
          <ListboxOption
            key={waiter.id}
            value={waiter.id}
            onChange={() => handleSelectorChange(waiter.id)}
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
