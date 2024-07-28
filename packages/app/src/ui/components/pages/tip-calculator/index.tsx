import { TipCalulatorProvider } from '@/ui/contexts/tip-calculator-context'
import { Controls } from './controls'
import { Display } from './display'

export const CalculatorPage = () => {
  return (
    <TipCalulatorProvider>
      <main className='grid grid-cols-2 gap-6 rounded-lg bg-white p-8'>
        <Controls />
        <Display />
      </main>
    </TipCalulatorProvider>
  )
}
