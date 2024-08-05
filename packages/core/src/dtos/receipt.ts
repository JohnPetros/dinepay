export type ReceiptDto = {
  id?: number
  totalAmount: number
  tipPercentage: number
  customerAccount: string
  waiterAccount: string
  createdAt: Date
  isWithdrawn: boolean
}
