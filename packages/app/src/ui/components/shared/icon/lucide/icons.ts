import type { ForwardRefExoticComponent } from 'react'
import { DollarSign, type LucideProps, Users } from 'lucide-react'

export const ICONS: Record<
  IconName,
  ForwardRefExoticComponent<Omit<LucideProps, 'ref'>>
> = {
  'dollar-sign': DollarSign,
  people: Users,
}
