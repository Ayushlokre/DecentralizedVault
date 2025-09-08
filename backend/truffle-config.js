require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

const { PRIVATE_KEY, RPC_URL } = process.env;

module.exports = {
  networks: {
    // Local Ganache network using HDWalletProvider
    development: {
      provider: () => new HDWalletProvider({
        privateKeys: [PRIVATE_KEY],
        providerOrUrl: RPC_URL,  // should point to Ganache RPC (http://127.0.0.1:8545)
      }),
      network_id: "*",
      gas: 8000000,          // increase if contract is large
      gasPrice: 20000000000, // 20 Gwei
    },

    // Polygon Amoy Testnet
    amoy: {
      provider: () => new HDWalletProvider({
        privateKeys: [PRIVATE_KEY],
        providerOrUrl: RPC_URL,
      }),
      network_id: "*",
      gas: 6000000,
      gasPrice: 10000000000, // 10 Gwei
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },

  // Mocha options
  mocha: {
    timeout: 200000,
  },

  // Solidity compiler
  compilers: {
    solc: {
      version: "0.8.21", // Ensure this matches your contracts
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },

  // Truffle DB (disabled)
  db: {
    enabled: false,
  },
};
