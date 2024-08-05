type ContractResponseProps<Data> = {
  transactionHash?: string
  data?: Data
  error?: typeof Error
}

export class ContractResponse<Data> {
  private readonly _transactionHash: string | null
  private readonly _data: Data | null
  private readonly _error: typeof Error | null

  constructor(props?: ContractResponseProps<Data>) {
    this._data = props?.data ?? null
    this._transactionHash = props?.transactionHash ?? null
    this._error = props?.error ?? null
  }

  throwError() {
    if (this._error) throw new this._error()
  }

  get hasTransaction() {
    return Boolean(this._transactionHash)
  }

  get isSuccess() {
    return this._error === null
  }

  get isFailure() {
    return this._transactionHash === null && this._error !== null
  }

  get errorMessage() {
    if (this.isSuccess) throw new Error('Contract response is success')

    return String(this._error?.prototype.message)
  }

  get transactionHash() {
    if (this.isFailure) this.throwError()

    return this._transactionHash
  }

  get data(): Data {
    if (this.isFailure) this.throwError()

    return this._data as Data
  }
}
