import React, { useState } from "react";
import { ethers } from "ethers";
import IPFSStorage from "./IPFSStorage.json";
import './App.css';

function App() {
  const [hash, setHash] = useState("");
  const [storedHash, setStoredHash] = useState("");

  // Function to connect wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      alert("Wallet connected!");
    } else {
      alert("Please install MetaMask!");
    }
  };

  // Function to store hash
  const storeHash = async () => {
    if (!window.ethereum) return alert("Please connect wallet");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    const contract = new ethers.Contract(contractAddress, IPFSStorage.abi, signer);

    try {
      const tx = await contract.storeHash(hash);
      await tx.wait();
      alert("Hash stored successfully!");
    } catch (err) {
      console.error(err);
      alert("Error storing hash");
    }
  };

  // Function to get stored hash
  const getHash = async () => {
    if (!window.ethereum) return alert("Please connect wallet");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    const contract = new ethers.Contract(contractAddress, IPFSStorage.abi, signer);

    try {
      const value = await contract.getHash();
      setStoredHash(value);
    } catch (err) {
      console.error(err);
      alert("Error fetching hash");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>IPFS Storage DApp</h1>
        <button onClick={connectWallet}>Connect Wallet</button>
        <div style={{ marginTop: "20px" }}>
          <input
            type="text"
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            placeholder="Enter hash"
          />
          <button onClick={storeHash}>Store Hash</button>
          <button onClick={getHash}>Get Hash</button>
        </div>
        {storedHash && (
          <p style={{ marginTop: "20px" }}>Stored Hash: {storedHash}</p>
        )}
      </header>
    </div>
  );
}

export default App;
