require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

const { PRIVATE_KEY, RPC_URL } = process.env;

module.exports = {
  networks: {
    // Amoly Testnet
    amoy: {
      provider: () => new HDWalletProvider({
        privateKeys: [PRIVATE_KEY],
        providerOrUrl: RPC_URL
      }),
      network_id: "*",          // Accept any network ID
      gas: 6000000,             // Gas limit
      gasPrice: 10000000000,    // 10 Gwei
      confirmations: 2,         // # of confirmations to wait between deployments
      timeoutBlocks: 200,       // # of blocks before a deployment times out
      skipDryRun: true          // Skip dry run before migrations
    },

    // Local development network (Ganache)
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
  },

  // Mocha options
  mocha: {
    timeout: 200000
  },

  // Solidity compiler
  compilers: {
    solc: {
      version: "0.8.21",        // Exact version
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  },

  // Truffle DB (disabled)
  db: {
    enabled: false
  }
};
