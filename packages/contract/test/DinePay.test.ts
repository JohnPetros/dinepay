import hre, { ethers, network } from 'hardhat'
import { expect } from 'chai'
import type { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers'
import type { DinePay } from '../typechain-types'

describe('DinePay contract', () => {
  async function deployFixture() {
    const [
      ownerAccount,
      customerAccount,
      waiterAccount1,
      waiterAccount2,
      waiterAccount3,
    ] = await hre.ethers.getSigners()

    const contract = await ethers.deployContract('DinePay')

    return {
      contract,
      ownerAccount,
      customerAccount,
      waiterAccount1,
      waiterAccount2,
      waiterAccount3,
    }
  }

  type RegisterFakeReceiptFixtureProps = {
    contract: DinePay
    customerAccount: HardhatEthersSigner
    waiterAccount: HardhatEthersSigner
    tipPercentage?: number
    totalAmount?: number
  }

  async function registerFakeReceiptFixture({
    contract,
    customerAccount,
    waiterAccount,
    tipPercentage = 25,
    totalAmount = 1,
  }: RegisterFakeReceiptFixtureProps) {
    await contract
      .connect(customerAccount)
      .registerReceipt(waiterAccount, tipPercentage, {
        value: ethers.parseEther(String(totalAmount)),
      })
  }

  it('should not register a recept with total amount equal to 0', async () => {
    const { contract, customerAccount, waiterAccount1 } = await deployFixture()

    await expect(
      registerFakeReceiptFixture({
        contract,
        customerAccount,
        waiterAccount: waiterAccount1,
        totalAmount: 0,
      }),
    ).to.rejectedWith('InvalidAmountError')
  })

  it('should not register a recept with invalid tip percentage', async () => {
    const { contract, customerAccount, waiterAccount1 } = await deployFixture()

    await expect(
      registerFakeReceiptFixture({
        contract,
        customerAccount,
        waiterAccount: waiterAccount1,
        tipPercentage: 0,
      }),
    ).to.rejectedWith('InvalidPercentageError')

    await expect(
      registerFakeReceiptFixture({
        contract,
        customerAccount,
        waiterAccount: waiterAccount1,
        tipPercentage: 101,
      }),
    ).to.rejectedWith('InvalidPercentageError')
  })

  it('should register a receipt', async () => {
    const { contract, customerAccount, waiterAccount1 } = await deployFixture()

    const totalAmount = ethers.parseEther('1')

    const receipt = {
      totalAmount,
      tipPercentage: 25,
      numberOfPeople: 2,
    }

    await contract
      .connect(customerAccount)
      .registerReceipt(waiterAccount1, receipt.tipPercentage, {
        value: receipt.totalAmount,
      })

    const receipts = await contract.getReceipts()
    expect(receipts.length).to.equal(1)
    expect(receipts[0].totalAmount).to.equal(receipt.totalAmount)
    expect(receipts[0].tipPercentage).to.equal(receipt.tipPercentage)
    expect(receipts[0].customerAccount).to.equal(customerAccount)
    expect(receipts[0].isWithdrawn).to.false
    expect(typeof receipts[0].createdAt).to.equal('bigint')
  })

  it('should get balance', async () => {
    const { contract, customerAccount, waiterAccount1 } = await deployFixture()

    let balance = await contract.getBalance()
    expect(balance).to.equal(0)

    await registerFakeReceiptFixture({
      contract,
      customerAccount,
      waiterAccount: waiterAccount1,
      totalAmount: 0.5,
    })

    balance = await contract.getBalance()
    expect(balance).to.equal(ethers.parseEther('0.5'))
  })

  it('should get receipts', async () => {
    const { contract, customerAccount, waiterAccount1, waiterAccount2 } =
      await deployFixture()

    let receipts = await contract.getReceipts()
    expect(receipts).to.have.length(0)

    await Promise.all([
      registerFakeReceiptFixture({
        contract,
        customerAccount,
        waiterAccount: waiterAccount1,
      }),
      registerFakeReceiptFixture({
        contract,
        customerAccount,
        waiterAccount: waiterAccount2,
      }),
      registerFakeReceiptFixture({
        contract,
        customerAccount,
        waiterAccount: waiterAccount1,
      }),
    ])
    receipts = await contract.getReceipts()
    expect(receipts).to.have.length(3)
  })

  it('should not get receipts by waiter if the waiter account does not exist in the contract', async () => {
    const { contract, customerAccount, waiterAccount1, waiterAccount2 } =
      await deployFixture()

    expect(contract.getReceiptsByWaiter(waiterAccount1)).to.rejectedWith(
      'no waiter account registered yet',
    )

    await registerFakeReceiptFixture({
      contract,
      customerAccount,
      waiterAccount: waiterAccount1,
    })

    expect(contract.getReceiptsByWaiter(waiterAccount2)).to.rejectedWith(
      'WaiterAccountNotFoundError',
    )
  })

  it('should get receipts by waiter', async () => {
    const { contract, customerAccount, waiterAccount1, waiterAccount2 } =
      await deployFixture()

    await registerFakeReceiptFixture({
      contract,
      customerAccount,
      waiterAccount: waiterAccount1,
    })

    await registerFakeReceiptFixture({
      contract,
      customerAccount,
      waiterAccount: waiterAccount2,
    })

    await registerFakeReceiptFixture({
      contract,
      customerAccount,
      waiterAccount: waiterAccount1,
    })

    const receipts = await contract.getReceiptsByWaiter(waiterAccount1)
    expect(receipts).to.have.length(2)
    expect(receipts[0].waiterAccount).to.equal(waiterAccount1)
    expect(receipts[1].waiterAccount).to.equal(waiterAccount1)
  })

  it('should not pay a waiter if the sender is not the owner of the contract', async () => {
    const { contract, customerAccount, waiterAccount1 } = await deployFixture()

    expect(contract.connect(customerAccount).payWaiter(waiterAccount1)).to.rejectedWith(
      'NotOwnerError',
    )
  })

  it('should not pay a waiter if the balance is equal to 0', async () => {
    const { contract, ownerAccount, waiterAccount1 } = await deployFixture()

    expect(contract.connect(ownerAccount).payWaiter(waiterAccount1)).to.rejectedWith(
      'InsufficientBalanceError',
    )
  })

  it('should not pay a waiter if there are not any receipt registered', async () => {
    const { contract, ownerAccount, waiterAccount1 } = await deployFixture()

    expect(contract.connect(ownerAccount).payWaiter(waiterAccount1)).to.rejectedWith(
      'ReceiptNotFoundError',
    )
  })

  it('should not pay a waiter if the waiter account does not exist', async () => {
    const { contract, ownerAccount, customerAccount, waiterAccount1, waiterAccount2 } =
      await deployFixture()

    await registerFakeReceiptFixture({
      contract,
      customerAccount,
      waiterAccount: waiterAccount1,
    })

    await expect(
      contract.connect(ownerAccount).payWaiter(waiterAccount2),
    ).to.rejectedWith('WaiterAccountNotFoundError')
  })

  it('should not pay a waiter for a specific receipt if the sender is not the owner', async () => {
    const { contract, customerAccount } = await deployFixture()

    await expect(
      contract.connect(customerAccount).payWaiterReceipt(1),
    ).to.revertedWithCustomError(contract, 'NotOwnerError')
  })

  it('should not pay a waiter for a specific receipt if there is no receipt registerd yet', async () => {
    const { contract } = await deployFixture()

    await expect(contract.payWaiterReceipt(1)).to.revertedWithCustomError(
      contract,
      'ReceiptNotFoundError',
    )
  })

  it('should not pay a waiter for a specific receipt that does not exist', async () => {
    const { contract, customerAccount, waiterAccount1 } = await deployFixture()

    await registerFakeReceiptFixture({
      contract,
      customerAccount,
      waiterAccount: waiterAccount1,
      totalAmount: 1,
      tipPercentage: 25,
    })

    await expect(contract.payWaiterReceipt(1)).to.revertedWithCustomError(
      contract,
      'ReceiptNotFoundError',
    )
  })

  it('should pay a waiter for a specific receipt', async () => {
    const { contract, customerAccount, waiterAccount1 } = await deployFixture()

    await registerFakeReceiptFixture({
      contract,
      customerAccount,
      waiterAccount: waiterAccount1,
      totalAmount: 1,
      tipPercentage: 25,
    })

    await registerFakeReceiptFixture({
      contract,
      customerAccount,
      waiterAccount: waiterAccount1,
      totalAmount: 1,
      tipPercentage: 50,
    })

    const oldWaiterBalance = await ethers.provider.getBalance(waiterAccount1)

    await contract.payWaiterReceipt(0)

    const newWaiterBalance = await ethers.provider.getBalance(waiterAccount1)
    expect(newWaiterBalance - oldWaiterBalance).to.equal(ethers.parseEther('0.25'))
  })

  it('should pay a waiter with their dividend calculated according to the respective tip percentage', async () => {
    const { contract, customerAccount, waiterAccount1, waiterAccount2 } =
      await deployFixture()

    await Promise.all([
      registerFakeReceiptFixture({
        contract,
        customerAccount,
        waiterAccount: waiterAccount1,
        totalAmount: 120,
        tipPercentage: 50, // tipAmount: 40
      }),
      registerFakeReceiptFixture({
        contract,
        customerAccount,
        waiterAccount: waiterAccount2,
        totalAmount: 1,
        tipPercentage: 10,
      }),
      registerFakeReceiptFixture({
        contract,
        customerAccount,
        waiterAccount: waiterAccount1,
        totalAmount: 180,
        tipPercentage: 50, // tipAmount: 60
      }),
    ])

    const oldWaiterBalance = await ethers.provider.getBalance(waiterAccount1)

    await contract.payWaiter(waiterAccount1)

    const newWaiterBalance = await ethers.provider.getBalance(waiterAccount1)
    expect(newWaiterBalance - oldWaiterBalance).to.equal(ethers.parseEther('100')) // 40 + 60
  })

  it('should reduce the balance on pay waiters', async () => {
    const { contract, ownerAccount, customerAccount, waiterAccount1, waiterAccount2 } =
      await deployFixture()

    await registerFakeReceiptFixture({
      contract,
      customerAccount,
      waiterAccount: waiterAccount1,
      totalAmount: 240,
      tipPercentage: 50, // tipAmount: 80
    })

    await registerFakeReceiptFixture({
      contract,
      customerAccount,
      waiterAccount: waiterAccount1,
      totalAmount: 240,
      tipPercentage: 50, // tipAmount: 80
    })

    await registerFakeReceiptFixture({
      contract,
      customerAccount,
      waiterAccount: waiterAccount1,
      totalAmount: 240,
      tipPercentage: 50, // tipAmount: 80
    })

    let balance = await contract.getBalance()
    expect(balance).to.equal(ethers.parseEther('720')) // 240 * 3

    await contract.connect(ownerAccount).payWaiter(waiterAccount1)

    balance = await contract.getBalance()
    expect(balance).to.equal(ethers.parseEther('480')) // 80 * 3 - 720
  })

  it('should mark the receipts with "withdrawn" if they belong to the waiter who has been paid', async () => {
    const { contract, ownerAccount, customerAccount, waiterAccount1, waiterAccount2 } =
      await deployFixture()

    await Promise.all([
      registerFakeReceiptFixture({
        contract,
        customerAccount,
        waiterAccount: waiterAccount1,
      }),
      registerFakeReceiptFixture({
        contract,
        customerAccount,
        waiterAccount: waiterAccount1,
      }),
      registerFakeReceiptFixture({
        contract,
        customerAccount,
        waiterAccount: waiterAccount2,
      }),
    ])

    let waiter1Receipts = await contract.getReceiptsByWaiter(waiterAccount1)
    let waiter2Receipts = await contract.getReceiptsByWaiter(waiterAccount2)

    expect(waiter1Receipts[0].isWithdrawn).to.false
    expect(waiter1Receipts[1].isWithdrawn).to.false
    expect(waiter2Receipts[0].isWithdrawn).to.false

    await contract.connect(ownerAccount).payWaiter(waiterAccount1)

    waiter1Receipts = await contract.getReceiptsByWaiter(waiterAccount1)
    waiter2Receipts = await contract.getReceiptsByWaiter(waiterAccount2)

    expect(waiter1Receipts[0].isWithdrawn).to.true
    expect(waiter1Receipts[1].isWithdrawn).to.true
    expect(waiter2Receipts[0].isWithdrawn).to.false
  })

  it('should pay waiters withdrawing only their respective receipts that are not already withdrawn', async () => {
    const { contract, customerAccount, waiterAccount1 } = await deployFixture()

    await registerFakeReceiptFixture({
      contract,
      customerAccount,
      waiterAccount: waiterAccount1,
    })

    await contract.payWaiter(waiterAccount1)

    const oldWaiterBalance = await ethers.provider.getBalance(waiterAccount1)

    await Promise.all([
      contract.payWaiter(waiterAccount1),
      contract.payWaiter(waiterAccount1),
      contract.payWaiter(waiterAccount1),
    ])

    const currentWaiterBalance = await ethers.provider.getBalance(waiterAccount1)

    expect(currentWaiterBalance).to.equal(oldWaiterBalance)
  })

  it('should not pay all waiters if the sender is not the contract owner', async () => {
    const { contract, customerAccount } = await deployFixture()

    await expect(contract.connect(customerAccount).payAllWaiters()).to.rejectedWith(
      'NotOwnerError',
    )
  })

  it('should not pay all waiters if all receipts are already withdrawn', async () => {
    const { contract, customerAccount, waiterAccount1, waiterAccount2 } =
      await deployFixture()

    await Promise.all([
      registerFakeReceiptFixture({
        contract,
        customerAccount,
        tipPercentage: 50,
        totalAmount: 1,
        waiterAccount: waiterAccount1,
      }),
      registerFakeReceiptFixture({
        contract,
        customerAccount,
        tipPercentage: 50,
        totalAmount: 1,
        waiterAccount: waiterAccount2,
      }),
    ])

    await contract.payAllWaiters()

    await expect(contract.payAllWaiters()).to.rejectedWith(
      'AllReceiptsAlreadyWithdrawnError',
    )
  })

  it('should pay all waiters', async () => {
    const { contract, customerAccount, waiterAccount1, waiterAccount2, waiterAccount3 } =
      await deployFixture()

    await Promise.all([
      network.provider.send('hardhat_setBalance', [waiterAccount1.address, '0x0']),
      network.provider.send('hardhat_setBalance', [waiterAccount2.address, '0x0']),
      network.provider.send('hardhat_setBalance', [waiterAccount3.address, '0x0']),
    ])

    await Promise.all([
      registerFakeReceiptFixture({
        contract,
        customerAccount,
        tipPercentage: 50,
        totalAmount: 120,
        waiterAccount: waiterAccount1,
      }),
      registerFakeReceiptFixture({
        contract,
        customerAccount,
        tipPercentage: 50,
        totalAmount: 120,
        waiterAccount: waiterAccount2,
      }),
      registerFakeReceiptFixture({
        contract,
        customerAccount,
        tipPercentage: 50,
        totalAmount: 120,
        waiterAccount: waiterAccount3,
      }),
    ])

    let contractBalance = await contract.getBalance()
    expect(contractBalance.toString()).to.equal(ethers.parseEther('360'))

    await contract.payAllWaiters()

    const [waiter1Balance, waiter2Balance, waiter3Balance] = await Promise.all([
      ethers.provider.getBalance(waiterAccount1),
      ethers.provider.getBalance(waiterAccount2),
      ethers.provider.getBalance(waiterAccount3),
    ])

    expect(waiter1Balance.toString()).to.equal(ethers.parseEther('40'))
    expect(waiter2Balance.toString()).to.equal(ethers.parseEther('40'))
    expect(waiter3Balance.toString()).to.equal(ethers.parseEther('40'))
    expect(waiter3Balance.toString()).to.equal(ethers.parseEther('40'))

    contractBalance = await contract.getBalance()
    expect(contractBalance.toString()).to.equal(ethers.parseEther('240'))
  })

  it('should withdraw only the amount that does not correspond to the all waiters dividend', async () => {
    const { contract, customerAccount, waiterAccount1 } = await deployFixture()

    await Promise.all([
      registerFakeReceiptFixture({
        contract,
        customerAccount,
        tipPercentage: 50,
        totalAmount: 120,
        waiterAccount: waiterAccount1,
      }),
    ])

    let balance = await contract.getBalance()
    expect(balance.toString()).to.equal(ethers.parseEther('120'))

    await contract.withdraw()
    balance = await contract.getBalance()
    expect(balance.toString()).to.equal(ethers.parseEther('40'))
  })
})
