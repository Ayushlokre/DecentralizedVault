const { ethers } = require("ethers");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

// ------------------- Load ENV -------------------
const { PRIVATE_KEY, RPC_URL, CONTRACT_ADDRESS } = process.env;
if (!PRIVATE_KEY || !RPC_URL || !CONTRACT_ADDRESS) {
    throw new Error("Please set PRIVATE_KEY, RPC_URL, and CONTRACT_ADDRESS in .env");
}

// ------------------- Load ABI -------------------
const abiPath = path.join(__dirname, "build", "contracts", "IPFSStorage.json"); // updated path
if (!fs.existsSync(abiPath)) throw new Error("ABI file not found at build/contracts/IPFSStorage.json");

const { abi } = JSON.parse(fs.readFileSync(abiPath, "utf8"));

// ------------------- Provider & Wallet -------------------
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// ------------------- Contract Instance -------------------
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

console.log("✅ Connected to contract at:", CONTRACT_ADDRESS);
console.log("👤 Using account:", wallet.address);

// ------------------- Helper Functions -------------------

// Get total files
async function getTotalFiles() {
    if (!contract.fileCount) return 0; // fallback if contract has no counter
    try {
        const total = await contract.fileCount();
        return Number(total);
    } catch {
        return 0;
    }
}


// Upload a single file (CID)
async function uploadFile(cid) {
    try {
        const feeData = await provider.getFeeData();

        const tx = await contract.uploadFile(cid, {
            gasLimit: 500_000,
            maxPriorityFeePerGas: feeData.maxPriorityFeePerGas ?? ethers.parseUnits("1", "gwei"), // fallback
        });

        await tx.wait();
        console.log("📤 File uploaded:", cid);
    } catch (err) {
        console.error("❌ Error uploading file:", err.message);
    }
}

// Get file details by ID
async function getFile(id) {
    try {
        const [cid, owner, timestamp] = await contract.getFile(id);
        console.log("📄 File details:", {
            id,
            cid,
            owner,
            timestamp: timestamp.toString(),
        });
    } catch (err) {
        console.error(`❌ Error getting file ${id}:`, err.message);
    }
}

// Delete file by ID
async function deleteFile(id) {
    try {
        const feeData = await provider.getFeeData();

        const tx = await contract.deleteFile(id, {
            gasLimit: 500_000,
            maxPriorityFeePerGas: feeData.maxPriorityFeePerGas ?? ethers.parseUnits("1", "gwei"),
        });

        await tx.wait();
        console.log("🗑 File deleted:", id);
    } catch (err) {
        console.error(`❌ Error deleting file ${id}:`, err.message);
    }
}

// ------------------- Main Example Usage -------------------
(async () => {
    // Get total files
    const total = await getTotalFiles();

    // Upload a file (replace with your real CID)
    await uploadFile("QmExampleCID123456");

    // Get updated total files
    const newTotal = await getTotalFiles();

    // Fetch all files
    for (let i = 0; i < newTotal; i++) {
        await getFile(i);
    }

    // Example: delete a file (optional)
    // await deleteFile(0);
})();
