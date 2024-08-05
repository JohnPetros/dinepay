import type { ReceiptDto } from '../dtos'
import { PositiveNumber } from '../structs/positive-number'

type ReceiptProps = {
  id?: number
  totalAmount: PositiveNumber
  tipPercentage: PositiveNumber
  waiterAccount: string
  customerAccount: string
  isWithdrawn: boolean
  createdAt: Date
}

export class Receipt {
  readonly id: number
  private readonly props: ReceiptProps

  constructor(props: ReceiptProps) {
    this.props = props
    this.id = props.id ?? Math.floor(Math.random() * (1 - 1000 + 1)) + 1
  }

  static create(dto: ReceiptDto) {
    return new Receipt({
      id: dto.id,
      totalAmount: PositiveNumber.create(dto.totalAmount, false),
      tipPercentage: PositiveNumber.create(dto.tipPercentage, false),
      customerAccount: dto.customerAccount,
      waiterAccount: dto.waiterAccount,
      createdAt: dto.createdAt,
      isWithdrawn: dto.isWithdrawn,
    })
  }

  get profitAmount(): number {
    return this.totalAmount.value - this.tipAmount
  }

  get totalAmount(): PositiveNumber {
    return this.props.totalAmount
  }

  get billAmount(): number {
    return (this.totalAmount.value / (this.tipPercentage.value + 100)) * 100
  }

  get tipAmount(): number {
    return this.billAmount * (this.props.tipPercentage.value / 100)
  }

  get waiterAccount(): string {
    return this.props.waiterAccount
  }

  get tipPercentage(): PositiveNumber {
    return this.props.tipPercentage
  }

  get customerAccount(): string {
    return this.props.customerAccount
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get isWithdrawn(): boolean {
    return this.props.isWithdrawn
  }

  get dto(): ReceiptDto {
    return {
      totalAmount: this.props.totalAmount.value,
      tipPercentage: this.props.tipPercentage.value,
      waiterAccount: this.props.waiterAccount,
      customerAccount: this.props.customerAccount,
      createdAt: this.props.createdAt,
      isWithdrawn: this.props.isWithdrawn,
    }
  }
}
