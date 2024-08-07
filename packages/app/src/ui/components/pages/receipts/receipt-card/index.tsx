import { WAITERS } from '@/ui/constants'
import { useAmountFormatter, useDate } from '@/ui/hooks'
import { Loading } from '@/ui/components/shared/loading'
import { Info } from './info'
import { useReceiptCard } from './use-receipt-card'
import { WaiterPaymentDialog } from './waiter-payment-dialog'
import { ReceiptPaymentDialog } from './receipt-payment-dialog'

type ReceiptCardProps = {
  id: number
  waiterAccount: string
  customerAccount: string
  profitAmount: number
  tipAmount: number
  totalAmount: number
  tipPercentage: number
  createdAt: Date
  isWithdrawn: boolean
  onPay: VoidFunction
}

export function ReceiptCard({
  id,
  isWithdrawn,
  waiterAccount,
  customerAccount,
  profitAmount,
  tipAmount,
  totalAmount,
  tipPercentage,
  createdAt,
  onPay,
}: ReceiptCardProps) {
  const { isLoading, handleStartPayment, handleEndPayment } = useReceiptCard()
  const date = useDate()
  const formattedProfitAmount = useAmountFormatter(profitAmount)
  const formattedTipAmount = useAmountFormatter(tipAmount)
  const formattedTotalAmount = useAmountFormatter(totalAmount)
  const waiter = WAITERS.find((waiter) => waiter.accountAddress === waiterAccount)

  if (!waiter) return null

  return (
    <div
      data-iswithdrawn={isWithdrawn ? 'true' : 'false'}
      className='relative overflow-hidden flex items-center justify-between mx-auto p-6 shadow-lg border-l-4 hover:border-strong-cyan rounded-lg bg-white cursor-pointer hover:scale-[1.01] transition-all duration-200 data-[iswithdrawn=true]:opacity-50'
    >
      <div className='flex items-center gap-3 w-full'>
        <img
          src={waiter.avatar}
          alt=''
          className='rounded-full size-24 border-2 border-light-grayish-cyan/40'
        />
        <div className='space-y-2 w-full'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3 font-semibold'>
              <small className='text-sm text-strong-cyan'>{waiter.name}</small>
              {isWithdrawn ? (
                <span className='bg-very-dark-cyan rounded-lg ml-2 px-2 py-1 uppercase text-sm text-very-light-grayish-cyan font-medium'>
                  withdrawn!!
                </span>
              ) : (
                <span className='bg-strong-cyan rounded-lg px-2 py-1 uppercase text-sm text-very-light-grayish-cyan font-medium'>
                  new!
                </span>
              )}
            </div>
            {isLoading ? (
              <div className='absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 grid place-content-center bg-black/45'>
                <Loading />
              </div>
            ) : (
              !isWithdrawn && (
                <div className='flex items-center gap-3 w-64'>
                  <ReceiptPaymentDialog
                    receiptId={id}
                    waiterAccount={waiterAccount}
                    waiterName={waiter.name}
                    onStartPayment={handleStartPayment}
                    onEndPayment={handleEndPayment}
                    onPay={onPay}
                  />
                  <WaiterPaymentDialog
                    tipAmount={tipAmount}
                    waiterAccount={waiterAccount}
                    waiterName={waiter.name}
                    onStartPayment={handleStartPayment}
                    onEndPayment={handleEndPayment}
                    onPay={onPay}
                  />
                </div>
              )
            )}
          </div>
          <div className='flex items-center gap-6'>
            <strong className='block text-xl text-very-dark-cyan'>
              Profit: {formattedProfitAmount}
            </strong>
            <strong className='block text-xl text-very-dark-cyan'>
              Tip: {formattedTipAmount}
            </strong>
          </div>
          <dl className='flex items-center gap-4'>
            <Info label='created at' value={date.format(createdAt)} />
            <span className='size-1 bg-light-grayish-cyan rounded-full' />
            <Info label='total' value={formattedTotalAmount} />
            <span className='size-1 bg-light-grayish-cyan rounded-full' />
            <Info label='tip percentage' value={`${tipPercentage}%`} />
          </dl>
          <p className='text-grayish-cyan text-sm truncate'>
            customer: {customerAccount}
          </p>
        </div>
      </div>
    </div>
  )
}
