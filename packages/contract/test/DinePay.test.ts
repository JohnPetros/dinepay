import hre, { ethers } from 'hardhat'
import { expect } from 'chai'

describe('DinePay contract', () => {
  async function deployFixture() {
    const [ownerAccount, waiterAccount, nonExistWaiterAccount] =
      await hre.ethers.getSigners()

    const contract = await ethers.deployContract('DinePay')

    return { contract, ownerAccount, waiterAccount, nonExistWaiterAccount }
  }

  it('should register a new receipt by waiter account', async () => {
    const { contract, ownerAccount, waiterAccount, nonExistWaiterAccount } =
      await deployFixture()

    const receipt = {
      bill: 100,
      tipPercentage: 25,
      numberOfPeople: 2,
    }

    await contract.registerReceipt(
      waiterAccount,
      receipt.bill,
      receipt.tipPercentage,
      receipt.numberOfPeople,
    )

    const response = await contract.getReceiptByWaiter(waiterAccount)
    expect(response.bill).to.equal(receipt.bill)
    expect(response.tipPercentage).to.equal(receipt.tipPercentage)
    expect(response.numberOfPeople).to.equal(receipt.numberOfPeople)
    expect(response.customerAccount).to.equal(ownerAccount)

    const emptyResponse = await contract.getReceiptByWaiter(nonExistWaiterAccount)

    expect(emptyResponse.bill).to.equal(0)
    expect(emptyResponse.tipPercentage).to.equal(0)
    expect(emptyResponse.numberOfPeople).to.equal(0)
  })
})
