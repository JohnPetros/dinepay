import type { ReceiptDto } from '../../dtos'
import type { ContractResponse } from '../../responses'
import type { Receipt } from '../../structs'

export interface IDinepayContract {
  getBalance(): Promise<ContractResponse<number>>
  getReceipts(): Promise<ContractResponse<ReceiptDto[]>>
  getReceiptsByWaiter(waiterAccount: string): Promise<ContractResponse<ReceiptDto[]>>
  getWaiterDividend(waiterAccount: string): Promise<ContractResponse<number>>
  registerReceipt(receipt: Receipt): Promise<ContractResponse<null>>
  payWaiterReceipt(receiptId: number): Promise<ContractResponse<null>>
  payWaiter(waiterAccount: string): Promise<ContractResponse<null>>
  payAllWaiters(): Promise<ContractResponse<null>>
  withdraw(): Promise<ContractResponse<null>>
  // getReceiptByWaiter(waiterAccount: string): Promise<ContractResponse<ReceiptDTO[]>>
}
