import { useRef } from 'react'
import { Button } from '../../shared/button'
import { Link } from '../../shared/Link'
import { Loading } from '../../shared/loading'
import { WaiterSelector } from '../../shared/waiter-selector'
import { ReceiptCard } from './receipt-card'
import { useReceiptsPage } from './use-receipts-page'
import type { WaiterSelectorRef } from '../../shared/waiter-selector/types'

export function ReceiptsPage() {
  const waiterSelectorRef = useRef<WaiterSelectorRef>(null)
  const {
    balance,
    receipts,
    isFetching,
    isTransactioning,
    handleSelectWaiter,
    handlePayWaiter,
    handlePayAllWaitersButtonClick,
    handleWithdrawButtonClick,
  } = useReceiptsPage(waiterSelectorRef)

  return (
    <div className='px-6 lg:px-0'>
      {isTransactioning && (
        <div className='absolute inset-0 grid place-content-center bg-black/75 z-50'>
          <Loading className='w-20 h-20' />
        </div>
      )}
      <Link route='/'>Tip calculator</Link>
      <header className='flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0 w-full mt-3 p-6 bg-white rounded-lg shadow-lg'>
        <div>
          <span className='p-1 rounded-lg bg-very-light-grayish-cyan text-grayish font-semibold uppercase'>
            Balance
          </span>
          <strong className='inline-block ml-4 text-2xl'>{balance}</strong>
        </div>
        <div className='flex flex-col md:flex-row items-center gap-3'>
          <span className='text-dark-grayish-cyan mt-3 md:mt-0'>Selected waiter:</span>
          <WaiterSelector
            ref={waiterSelectorRef}
            canSelectAll
            onSelect={handleSelectWaiter}
          />
          <div className='flex gap-3 mt-3 md:mt-0'>
            <div className='w-32'>
              <Button
                bg='tertiary'
                size='small'
                disabled={isFetching || isTransactioning}
                onClick={handleWithdrawButtonClick}
              >
                withdraw
              </Button>
            </div>
            <div className='w-40'>
              <Button
                bg='tertiary'
                size='small'
                disabled={isFetching || isTransactioning}
                onClick={handlePayAllWaitersButtonClick}
              >
                pay all waiters
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className='mt-6 pb-12'>
        {isFetching ? (
          <div className='flex items-center gap-3 mx-auto w-max mt-12'>
            <p className='text-grayish-cyan text-xl font-medium'>Please, wait...</p>
            <Loading />
          </div>
        ) : receipts.length > 0 ? (
          <ul className='space-y-4'>
            {receipts.map((receipt) => (
              <li key={receipt.id}>
                <ReceiptCard
                  id={receipt.id}
                  waiterAccount={receipt.waiterAccount}
                  profitAmount={receipt.profitAmount}
                  isWithdrawn={receipt.isWithdrawn}
                  createdAt={receipt.createdAt}
                  tipAmount={receipt.tipAmount}
                  customerAccount={receipt.customerAccount}
                  totalAmount={receipt.totalAmount.value}
                  tipPercentage={receipt.tipPercentage.value}
                  onPay={handlePayWaiter}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className='mx-auto w-max mt-3 text-dark-grayish-cyan'>No receipt found.</p>
        )}
      </main>
    </div>
  )
}
