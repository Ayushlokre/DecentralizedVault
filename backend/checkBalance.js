const { ethers } = require("ethers");
require("dotenv").config();

// --- Config ---
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Replace this with your ERC-20 token address (e.g., test LINK)
const tokenAddress = "0x0fd9e8d3af1aaee056eb9e802c3a762a667b1904";

// Minimal ERC-20 ABI to check balance
const tokenAbi = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)"
];
const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);

(async () => {
    try {
        // Native POL balance
        const polBalance = await provider.getBalance(wallet.address);
        console.log("Wallet native POL balance:", ethers.formatEther(polBalance), "POL");

        // ERC-20 token balance
        const [decimals, symbol, tokenBalance] = await Promise.all([
            tokenContract.decimals(),
            tokenContract.symbol(),
            tokenContract.balanceOf(wallet.address)
        ]);

        // Format token balance
        const formattedTokenBalance = ethers.formatUnits(tokenBalance, decimals);
        console.log(`Wallet ${symbol} balance:`, formattedTokenBalance, symbol);

    } catch (err) {
        console.error("Error fetching balances:", err);
    }
})();
