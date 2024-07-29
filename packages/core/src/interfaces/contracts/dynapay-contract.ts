import type { ReceiptDto } from '../../dtos'
import type { ContractResponse } from '../../responses'

export interface IDinapayContract {
  registerReceipt(receiptDto: ReceiptDto): Promise<ContractResponse<null>>
  // getReceiptByWaiter(waiterAccount: string): Promise<ContractResponse<ReceiptDTO[]>>
}
