import { ethers } from 'hardhat'

async function deploy() {
  const contractFactory = await ethers.getContractFactory('DinePay')
  const contract = await contractFactory.deploy()

  await contract.waitForDeployment()
  console.log(`Contract deployed to ${contract.target}`)
}

deploy().catch((error) => {
  console.error(error)
  process.exit(1)
})
