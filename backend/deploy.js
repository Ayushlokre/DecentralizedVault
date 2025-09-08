const fs = require("fs");
const path = require("path");
require("dotenv").config();
const { ethers } = require("ethers");

// ---------- CONFIG ----------
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// ---------- CONTRACT JSON PATH ----------
const contractPath = path.join(__dirname, "build", "contracts", "IPFSStorage.json");

// Check if JSON exists
if (!fs.existsSync(contractPath)) {
    console.error("Error: IPFSStorage.json not found in build/contracts folder");
    process.exit(1);
}

// Read contract JSON
const contractJson = JSON.parse(fs.readFileSync(contractPath, "utf8"));

// Get ABI and bytecode
const abi = contractJson.abi;

// Truffle stores bytecode under evm.bytecode.object
const bytecode = contractJson.bytecode || contractJson.evm?.bytecode?.object;

if (!bytecode || bytecode === "0x") {
    console.error("Error: Bytecode not found in IPFSStorage.json. Please run `truffle compile` first.");
    process.exit(1);
}

// ---------- DEPLOY FUNCTION ----------
async function deploy() {
    console.log("Deploying contract...");

    const factory = new ethers.ContractFactory(abi, bytecode, wallet);

    try {
        const contract = await factory.deploy();
        await contract.waitForDeployment();

        console.log("✅ Contract deployed successfully!");
        console.log("Contract address:", contract.target);
    } catch (err) {
        console.error("Deployment failed:", err);
    }
}

deploy();
