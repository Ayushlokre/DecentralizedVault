import React, { useState } from "react";
import { ethers } from "ethers";
import IPFSStorage from "./IPFSStorage.json";
import './App.css';

function App() {
  const [cid, setCid] = useState("");          // user input
  const [retrievedCid, setRetrievedCid] = useState(""); // CID fetched
  const [fileId, setFileId] = useState(0);     // which file ID to fetch

  // Connect MetaMask
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }
    await window.ethereum.request({ method: "eth_requestAccounts" });
    alert("Wallet connected!");
  };

  // Upload file CID to the blockchain
  const uploadFile = async () => {
    if (!window.ethereum) return alert("Please connect wallet");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    const contract = new ethers.Contract(contractAddress, IPFSStorage.abi, signer);

    try {
      const tx = await contract.uploadFile(cid);
      await tx.wait();
      alert("CID uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Error uploading CID");
    }
  };

  // Fetch a stored file by ID
  const fetchFile = async () => {
    if (!window.ethereum) return alert("Please connect wallet");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    const contract = new ethers.Contract(contractAddress, IPFSStorage.abi, signer);

    try {
      const [storedCid, owner, timestamp] = await contract.getFile(fileId);
      setRetrievedCid(storedCid);
      console.log("Owner:", owner, "Timestamp:", timestamp.toString());
    } catch (err) {
      console.error(err);
      alert("Error fetching file");
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
            value={cid}
            onChange={(e) => setCid(e.target.value)}
            placeholder="Enter CID"
          />
          <button onClick={uploadFile}>Upload CID</button>
        </div>

        <div style={{ marginTop: "20px" }}>
          <input
            type="number"
            value={fileId}
            onChange={(e) => setFileId(e.target.value)}
            placeholder="File ID"
          />
          <button onClick={fetchFile}>Fetch File</button>
        </div>

        {retrievedCid && (
          <p style={{ marginTop: "20px" }}>
            Retrieved CID: {retrievedCid}
          </p>
        )}
      </header>
    </div>
  );
}

export default App;
