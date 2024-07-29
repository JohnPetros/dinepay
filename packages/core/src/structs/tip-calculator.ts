import { PositiveNumber } from './positive-number'
import { Receipt } from './receipt'

type TipCalculatorProps = {
  percentage: PositiveNumber
  bill: PositiveNumber
  numberOfPeople: PositiveNumber
}

export class TipCalculator {
  readonly percentage: PositiveNumber
  readonly bill: PositiveNumber
  readonly numberOfPeople: PositiveNumber

  private constructor(props: TipCalculatorProps) {
    this.percentage = props.percentage
    this.bill = props.bill
    this.numberOfPeople = props.numberOfPeople
  }

  static create(): TipCalculator {
    return new TipCalculator({
      percentage: PositiveNumber.create(0),
      bill: PositiveNumber.create(0),
      numberOfPeople: PositiveNumber.create(0),
    })
  }

  changeBill(bill: number) {
    return this.clone({ bill: PositiveNumber.create(bill, false) })
  }

  changePercentage(percentage: number) {
    return this.clone({ percentage: PositiveNumber.create(percentage, false) })
  }

  changeNumberOfPeople(numberOfPeople: number) {
    return this.clone({ numberOfPeople: PositiveNumber.create(numberOfPeople, false) })
  }

  createReceipt(customerAccount: string, waiterAccount: string): Receipt {
    return Receipt.create({
      bill: this.bill.value,
      numberOfPeople: this.numberOfPeople.value,
      tipPercentage: this.percentage.value,
      customerAccount: customerAccount,
      waiterAccount: waiterAccount,
    })
  }

  get canCreateReceipt() {
   return this.numberOfPeople.isOverZero && this.percentage.isOverZero && this.bill.isOverZero
  }

  get tipAmount(): number {
    if (this.percentage.isZero) return 0

    return this.bill.value * (this.percentage.value / 100)
  }

  get tipAmountPerPerson(): number {
    if (this.numberOfPeople.isZero) return 0

    return this.tipAmount / this.numberOfPeople.value
  }

  get total(): number {
    return this.tipAmount + this.bill.value
  }

  get totalPerPerson(): number {
    if (this.numberOfPeople.isZero) return 0

    return this.total / this.numberOfPeople.value
  }

  private clone(props?: Partial<TipCalculatorProps>): TipCalculator {
    return new TipCalculator({
      bill: this.bill,
      percentage: this.percentage,
      numberOfPeople: this.numberOfPeople,
      ...props,
    })
  }
}
