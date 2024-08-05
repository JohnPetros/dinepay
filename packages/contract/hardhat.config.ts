import type { HardhatUserConfig } from 'hardhat/config'
import dotenv from 'dotenv'
import '@nomicfoundation/hardhat-toolbox'

dotenv.config()

const config: HardhatUserConfig = {
  solidity: '0.8.24',
  networks: {
    sepolia: {
      url: process.env.NETWORK_URL,
      chainId: Number(process.env.CHAIN_ID),
      accounts: [String(process.env.ACCOUNT_PRIVATE_KEY)],
    },
  },
}

export default config
