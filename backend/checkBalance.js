const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

async function main() {
  // Use provider to get balance
  const balance = await provider.getBalance(wallet.address);
  console.log("Wallet Address:", wallet.address);
  console.log("Wallet ETH Balance:", ethers.formatEther(balance), "ETH");
}

main();
