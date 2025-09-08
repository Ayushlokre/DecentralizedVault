require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

const { PRIVATE_KEY, RPC_URL } = process.env;

module.exports = {
  networks: {
    // Local Ganache network
    development: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: [PRIVATE_KEY],
          providerOrUrl: RPC_URL, // http://127.0.0.1:8545
        }),
      network_id: "*",
      gas: 8000000,
      gasPrice: 20000000000, // 20 Gwei
    },

    // Polygon Amoy Testnet
    amoy: {
      provider: () =>
        new HDWalletProvider({
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

  mocha: {
    timeout: 200000,
  },

  // Solidity compiler
  compilers: {
    solc: {
      version: "0.8.19", // use 0.8.19 to avoid PUSH0
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
        evmVersion: "london", // CHANGED from shanghai -> london
      },
    },
  },

  db: {
    enabled: false,
  },
};
