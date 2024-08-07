import CharllesTraymore from '@/assets/charlles-traymore.jpg'
import EdwardCarafe from '@/assets/edward-carafe.jpg'
import PaulDecanter from '@/assets/john-decanter.jpg'

type Waiter = {
  id: number
  avatar: string
  name: string
  accountAddress: string
}

export const WAITERS: Waiter[] = [
  {
    id: 1,
    name: 'Charlles Traymore',
    avatar: CharllesTraymore,
    accountAddress: '0x31C3c9cAbE2FEF2D2cc583BF829A08CF0Dc62512',
  },
  {
    id: 2,
    name: 'Edward Carafe',
    avatar: EdwardCarafe,
    accountAddress: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
  },
  {
    id: 3,
    name: 'Paul Decanter',
    avatar: PaulDecanter,
    accountAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
  },
]
