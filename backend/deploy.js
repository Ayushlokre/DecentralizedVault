const fs = require("fs");
const path = require("path");
require("dotenv").config();
const { ethers } = require("ethers");

// ---------- CONFIG ----------
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// ---------- CONTRACT JSON PATH - CORRECT TRUFFLE PATH ----------
const contractPath = path.join(__dirname, "build", "contracts", "IPFSStorage.json");

// Check if JSON exists
if (!fs.existsSync(contractPath)) {
    console.error("❌ Error: IPFSStorage.json not found in build/contracts folder");
    console.log("Run these commands first:");
    console.log("1. truffle clean");
    console.log("2. truffle compile");
    process.exit(1);
}

// Read contract JSON
const contractJson = JSON.parse(fs.readFileSync(contractPath, "utf8"));

// Get ABI and bytecode from Truffle's format
const abi = contractJson.abi;
const bytecode = contractJson.bytecode;

if (!bytecode || bytecode === "0x") {
    console.error("❌ Error: Bytecode not found in IPFSStorage.json. Please run `truffle compile` first.");
    process.exit(1);
}

// Check if bytecode contains PUSH0 opcodes (0x5f)
if (bytecode.includes('5f80fd5b')) {
    console.error("❌ WARNING: Bytecode still contains PUSH0 opcodes!");
    console.log("This indicates Solidity 0.8.20+ compilation.");
    console.log("Please:");
    console.log("1. Update truffle-config.js to use Solidity 0.8.19");
    console.log("2. Run 'truffle clean' then 'truffle compile'");
    process.exit(1);
}

// ---------- DEPLOY FUNCTION ----------
async function deploy() {
    console.log("🚀 Deploying contract...");
    console.log("📝 Using account:", wallet.address);
    
    // Check balance
    const balance = await provider.getBalance(wallet.address);
    console.log("💰 Account balance:", ethers.formatEther(balance), "ETH");
    
    if (balance === 0n) {
        console.error("❌ Account has no ETH balance!");
        process.exit(1);
    }

    const factory = new ethers.ContractFactory(abi, bytecode, wallet);

    try {
        // Deploy with explicit gas settings for Ganache
        const contract = await factory.deploy({
            gasLimit: 3000000,
            gasPrice: ethers.parseUnits('20', 'gwei')
        });
        
        console.log("⏳ Waiting for deployment...");
        await contract.waitForDeployment();

        console.log("✅ Contract deployed successfully!");
        console.log("📍 Contract address:", contract.target);
        console.log("🔗 Transaction hash:", contract.deploymentTransaction()?.hash);
        
        // Update .env file with contract address
        updateEnvFile(contract.target);
        
    } catch (err) {
        console.error("❌ Deployment failed:", err.message);
        
        if (err.message.includes('invalid opcode')) {
            console.log("\n🔧 FIX: This is the PUSH0 opcode issue!");
            console.log("1. Update truffle-config.js to use Solidity 0.8.19");
            console.log("2. Run: truffle clean");
            console.log("3. Run: truffle compile");
            console.log("4. Run: node deploy.js");
        }
    }
}

// Function to update .env file
function updateEnvFile(contractAddress) {
    const envPath = path.join(__dirname, '.env');
    let envContent = '';
    
    if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8');
        
        // Update existing CONTRACT_ADDRESS or add it
        if (envContent.includes('CONTRACT_ADDRESS=')) {
            envContent = envContent.replace(/CONTRACT_ADDRESS=.*/, `CONTRACT_ADDRESS=${contractAddress}`);
        } else {
            envContent += `\nCONTRACT_ADDRESS=${contractAddress}\n`;
        }
    } else {
        envContent = `CONTRACT_ADDRESS=${contractAddress}\n`;
    }
    
    fs.writeFileSync(envPath, envContent);
    console.log("📝 Updated .env with CONTRACT_ADDRESS");
}

deploy();