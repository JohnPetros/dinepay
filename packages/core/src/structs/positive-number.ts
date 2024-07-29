export class PositiveNumber {
  private constructor(readonly value: number) {}

  static create(value: number, canBeLessThanZero = true): PositiveNumber {
    if (!canBeLessThanZero && value <= 0) {
      throw new Error("Can't be less than or equal to zero")
    }

    if (value < 0) {
      throw new Error("Can't be less than zero")
    }

    return new PositiveNumber(value)
  }

  isEqualTo(value: number): boolean {
    return value === this.value
  }

  get isZero(): boolean {
    return this.value === 0
  }

  get isOverZero() {
    return this.value > 0
  }
}
