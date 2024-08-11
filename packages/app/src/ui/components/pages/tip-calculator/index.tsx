import { TipCalulatorProvider } from '@/ui/contexts/tip-calculator-context'
import { Controls } from './controls'
import { Display } from './display'
import { Link } from '../../shared/Link'

export const TipCalculatorPage = () => {
  return (
    <TipCalulatorProvider>
      <div className='pb-6'>
        <main className='grid grid-cols-1 md:grid-cols-2 gap-6 rounded-lg bg-white p-8'>
          <Controls />
          <Display />
        </main>
        <Link route='/receipts' className='block mx-auto w-max mt-6'>
          See receipts
        </Link>
      </div>
    </TipCalulatorProvider>
  )
}
