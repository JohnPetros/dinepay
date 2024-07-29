import CharllesTraymore from '@/assets/charlles-traymore.jpg'
import EdwardCarafe from '@/assets/edward-carafe.jpg'
import JohnDecanter from '@/assets/john-decanter.jpg'

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
    accountAddress: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  },
  {
    id: 2,
    name: 'Edward Carafe',
    avatar: EdwardCarafe,
    accountAddress: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
  },
  {
    id: 3,
    name: 'John Decanter',
    avatar: JohnDecanter,
    accountAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906 ',
  },
]
