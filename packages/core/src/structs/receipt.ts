import type { ReceiptDto } from '../dtos'
import { PositiveNumber } from './positive-number'

type ReceiptProps = {
  bill: PositiveNumber
  tipPercentage: PositiveNumber
  numberOfPeople: PositiveNumber
  waiterAccount: string
  customerAccount: string
}

export class Receipt {
  readonly bill: PositiveNumber
  readonly tipPercentage: PositiveNumber
  readonly numberOfPeople: PositiveNumber
  readonly customerAccount: string
  readonly waiterAccount: string

  constructor(props: ReceiptProps) {
    this.bill = props.bill
    this.tipPercentage = props.tipPercentage
    this.numberOfPeople = props.numberOfPeople
    this.customerAccount = props.customerAccount
    this.waiterAccount = props.waiterAccount
  }

  static create(dto: ReceiptDto) {
    return new Receipt({
      bill: PositiveNumber.create(dto.bill, false),
      tipPercentage: PositiveNumber.create(dto.tipPercentage, false),
      numberOfPeople: PositiveNumber.create(dto.numberOfPeople, false),
      customerAccount: dto.customerAccount,
      waiterAccount: dto.waiterAccount,
    })
  }

  get dto(): ReceiptDto {
    return {
      bill: this.bill.value,
      numberOfPeople: this.numberOfPeople.value,
      tipPercentage: this.tipPercentage.value,
      waiterAccount: this.waiterAccount,
      customerAccount: this.customerAccount,
    }
  }
}
